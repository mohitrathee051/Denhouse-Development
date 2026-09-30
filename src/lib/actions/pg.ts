"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { pgFormSchema, pgUpdateSchema } from "@/lib/validations/pg";
import { generateUniqueSlug } from "@/lib/utils/slug";
import { isPGSlugTaken } from "@/lib/data/pg";
import { requireAdminSession } from "./require-admin";
import { deleteImageFromStorage, PG_IMAGES_BUCKET } from "@/lib/supabase/storage";

export interface PGActionState {
  error?: string;
  success?: boolean;
  fieldErrors?: Record<string, string>;
}

function parseFormData(formData: FormData) {
  return {
    name: formData.get("name"),
    description: formData.get("description"),
    location: formData.get("location"),
    city: formData.get("city"),
    monthlyRent: formData.get("monthlyRent"),
    securityDeposit: formData.get("securityDeposit") || undefined,
    roomType: formData.get("roomType"),
    gender: formData.get("gender"),
    ac: formData.get("ac") === "on" || formData.get("ac") === "true",
    wifi: formData.get("wifi") === "on" || formData.get("wifi") === "true",
    food: formData.get("food") === "on" || formData.get("food") === "true",
    laundry: formData.get("laundry") === "on" || formData.get("laundry") === "true",
    parking: formData.get("parking") === "on" || formData.get("parking") === "true",
    housekeeping: formData.get("housekeeping") === "on" || formData.get("housekeeping") === "true",
    availability: formData.get("availability"),
    featured: formData.get("featured") === "on" || formData.get("featured") === "true",
  };
}

function flatten(error: { flatten: () => { fieldErrors: Record<string, string[] | undefined> } }) {
  const { fieldErrors } = error.flatten();
  const result: Record<string, string> = {};
  for (const [key, messages] of Object.entries(fieldErrors)) {
    if (messages && messages[0]) result[key] = messages[0];
  }
  return result;
}

export async function createPGRoom(
  _prevState: PGActionState,
  formData: FormData,
): Promise<PGActionState> {
  await requireAdminSession();

  const parsed = pgFormSchema.safeParse(parseFormData(formData));
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: flatten(parsed.error) };
  }

  const slug = await generateUniqueSlug(`${parsed.data.name}-${parsed.data.city}`, (candidate) =>
    isPGSlugTaken(candidate),
  );

  const pgRoom = await prisma.pGRoom.create({ data: { ...parsed.data, slug } });

  revalidatePath("/admin/pg");
  revalidatePath("/pg");
  redirect(`/admin/pg/${pgRoom.id}/edit?created=1`);
}

export async function updatePGRoom(
  _prevState: PGActionState,
  formData: FormData,
): Promise<PGActionState> {
  await requireAdminSession();

  const id = String(formData.get("id") ?? "");
  const parsed = pgUpdateSchema.safeParse({ ...parseFormData(formData), id });
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields.", fieldErrors: flatten(parsed.error) };
  }

  const { id: pgRoomId, ...data } = parsed.data;

  await prisma.pGRoom.update({ where: { id: pgRoomId }, data });

  revalidatePath("/admin/pg");
  revalidatePath(`/admin/pg/${pgRoomId}/edit`);
  revalidatePath("/pg");
  return { success: true };
}

export async function deletePGRoom(id: string): Promise<void> {
  await requireAdminSession();

  const pgRoom = await prisma.pGRoom.findUnique({ where: { id }, include: { images: true } });
  if (!pgRoom) return;

  await Promise.all(
    pgRoom.images.map((image) => deleteImageFromStorage(PG_IMAGES_BUCKET, image.url)),
  );

  await prisma.pGRoom.delete({ where: { id } });

  revalidatePath("/admin/pg");
  revalidatePath("/pg");
}

export async function togglePGFeatured(id: string, featured: boolean): Promise<void> {
  await requireAdminSession();
  await prisma.pGRoom.update({ where: { id }, data: { featured } });
  revalidatePath("/admin/pg");
  revalidatePath("/pg");
}

export async function setPGAvailability(
  id: string,
  availability: "AVAILABLE" | "FULL" | "COMING_SOON",
): Promise<void> {
  await requireAdminSession();
  await prisma.pGRoom.update({ where: { id }, data: { availability } });
  revalidatePath("/admin/pg");
  revalidatePath("/pg");
}

export async function removePGImage(imageId: string): Promise<void> {
  await requireAdminSession();

  const image = await prisma.pGImage.findUnique({ where: { id: imageId } });
  if (!image) return;

  await deleteImageFromStorage(PG_IMAGES_BUCKET, image.url);
  await prisma.pGImage.delete({ where: { id: imageId } });

  revalidatePath(`/admin/pg/${image.pgRoomId}/edit`);
}

export async function setMainPGImage(imageId: string, pgRoomId: string): Promise<void> {
  await requireAdminSession();

  await prisma.$transaction([
    prisma.pGImage.updateMany({ where: { pgRoomId }, data: { isMain: false } }),
    prisma.pGImage.update({ where: { id: imageId }, data: { isMain: true } }),
  ]);

  revalidatePath(`/admin/pg/${pgRoomId}/edit`);
}
