"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { propertyFormSchema, propertyUpdateSchema } from "@/lib/validations/property";
import { generateUniqueSlug } from "@/lib/utils/slug";
import { isPropertySlugTaken } from "@/lib/data/properties";
import { requireAdminSession } from "./require-admin";
import { deleteImageFromStorage, PROPERTY_IMAGES_BUCKET } from "@/lib/supabase/storage";

export interface PropertyActionState {
  error?: string;
  success?: boolean;
  fieldErrors?: Record<string, string>;
}

function parseFormData(formData: FormData) {
  const amenitiesRaw = formData.get("amenities");
  const amenities =
    typeof amenitiesRaw === "string" && amenitiesRaw.trim().length > 0
      ? amenitiesRaw
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

  return {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    propertyType: formData.get("propertyType"),
    listingType: formData.get("listingType"),
    status: formData.get("status"),
    price: formData.get("price"),
    priceLabel: formData.get("priceLabel") ?? "",
    location: formData.get("location"),
    city: formData.get("city"),
    state: formData.get("state"),
    pincode: formData.get("pincode") ?? "",
    address: formData.get("address") ?? "",
    latitude: formData.get("latitude") || undefined,
    longitude: formData.get("longitude") || undefined,
    bedrooms: formData.get("bedrooms") || undefined,
    bathrooms: formData.get("bathrooms") || undefined,
    balconies: formData.get("balconies") || undefined,
    area: formData.get("area") || undefined,
    areaUnit: formData.get("areaUnit") || undefined,
    yearBuilt: formData.get("yearBuilt") || undefined,
    furnishing: formData.get("furnishing") || undefined,
    parking: formData.get("parking") === "on" || formData.get("parking") === "true",
    amenities,
    featured: formData.get("featured") === "on" || formData.get("featured") === "true",
  };
}

export async function createProperty(
  _prevState: PropertyActionState,
  formData: FormData,
): Promise<PropertyActionState> {
  await requireAdminSession();

  const parsed = propertyFormSchema.safeParse(parseFormData(formData));
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: flatten(parsed.error) };
  }

  const slug = await generateUniqueSlug(
    `${parsed.data.title}-${parsed.data.city}`,
    (candidate) => isPropertySlugTaken(candidate),
  );

  const property = await prisma.property.create({
    data: { ...parsed.data, slug },
  });

  revalidatePath("/admin/properties");
  revalidatePath("/real-estate");
  redirect(`/admin/properties/${property.id}/edit?created=1`);
}

export async function updateProperty(
  _prevState: PropertyActionState,
  formData: FormData,
): Promise<PropertyActionState> {
  await requireAdminSession();

  const id = String(formData.get("id") ?? "");
  const parsed = propertyUpdateSchema.safeParse({ ...parseFormData(formData), id });
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: flatten(parsed.error) };
  }

  const { id: propertyId, ...data } = parsed.data;

  await prisma.property.update({
    where: { id: propertyId },
    data,
  });

  revalidatePath("/admin/properties");
  revalidatePath(`/admin/properties/${propertyId}/edit`);
  revalidatePath("/real-estate");
  return { success: true };
}

export async function deleteProperty(id: string): Promise<void> {
  await requireAdminSession();

  const property = await prisma.property.findUnique({
    where: { id },
    include: { images: true },
  });
  if (!property) return;

  await Promise.all(
    property.images.map((image) => deleteImageFromStorage(PROPERTY_IMAGES_BUCKET, image.url)),
  );

  await prisma.property.delete({ where: { id } });

  revalidatePath("/admin/properties");
  revalidatePath("/real-estate");
}

export async function togglePropertyFeatured(id: string, featured: boolean): Promise<void> {
  await requireAdminSession();
  await prisma.property.update({ where: { id }, data: { featured } });
  revalidatePath("/admin/properties");
  revalidatePath("/real-estate");
}

export async function setPropertyStatus(
  id: string,
  status: "AVAILABLE" | "SOLD" | "RENTED" | "UNDER_OFFER" | "COMING_SOON",
): Promise<void> {
  await requireAdminSession();
  await prisma.property.update({ where: { id }, data: { status } });
  revalidatePath("/admin/properties");
  revalidatePath("/real-estate");
}

export async function removePropertyImage(imageId: string): Promise<void> {
  await requireAdminSession();

  const image = await prisma.propertyImage.findUnique({ where: { id: imageId } });
  if (!image) return;

  await deleteImageFromStorage(PROPERTY_IMAGES_BUCKET, image.url);
  await prisma.propertyImage.delete({ where: { id: imageId } });

  revalidatePath(`/admin/properties/${image.propertyId}/edit`);
}

export async function setMainPropertyImage(imageId: string, propertyId: string): Promise<void> {
  await requireAdminSession();

  await prisma.$transaction([
    prisma.propertyImage.updateMany({
      where: { propertyId },
      data: { isMain: false },
    }),
    prisma.propertyImage.update({ where: { id: imageId }, data: { isMain: true } }),
  ]);

  revalidatePath(`/admin/properties/${propertyId}/edit`);
}

// Small local helper — keeps this file free of an extra import for a
// one-line usage of Zod's error shape.
function flatten(error: { flatten: () => { fieldErrors: Record<string, string[] | undefined> } }) {
  const { fieldErrors } = error.flatten();
  const result: Record<string, string> = {};
  for (const [key, messages] of Object.entries(fieldErrors)) {
    if (messages && messages[0]) result[key] = messages[0];
  }
  return result;
}
