"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  ImageValidationError,
  PG_IMAGES_BUCKET,
  PROPERTY_IMAGES_BUCKET,
  uploadImageToStorage,
} from "@/lib/supabase/storage";
import { requireAdminSession } from "./require-admin";

export interface UploadActionState {
  error?: string;
  success?: boolean;
}

function extractFiles(formData: FormData): File[] {
  return formData.getAll("files").filter((entry): entry is File => entry instanceof File && entry.size > 0);
}

export async function uploadPropertyImages(
  propertyId: string,
  formData: FormData,
): Promise<UploadActionState> {
  await requireAdminSession();
  const files = extractFiles(formData);
  if (files.length === 0) return { error: "Please choose at least one image." };

  try {
    const existingCount = await prisma.propertyImage.count({ where: { propertyId } });

    for (const [index, file] of files.entries()) {
      const url = await uploadImageToStorage({ file, bucket: PROPERTY_IMAGES_BUCKET, entityId: propertyId });
      await prisma.propertyImage.create({
        data: {
          propertyId,
          url,
          altText: file.name,
          sortOrder: existingCount + index,
          isMain: existingCount === 0 && index === 0,
        },
      });
    }

    revalidatePath(`/admin/properties/${propertyId}/edit`);
    revalidatePath("/real-estate");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    if (error instanceof ImageValidationError) return { error: error.message };
    console.error("uploadPropertyImages error:", error);
    return { error: "Image upload failed. Please try again." };
  }
}

export async function uploadPGImages(pgRoomId: string, formData: FormData): Promise<UploadActionState> {
  await requireAdminSession();
  const files = extractFiles(formData);
  if (files.length === 0) return { error: "Please choose at least one image." };

  try {
    const existingCount = await prisma.pGImage.count({ where: { pgRoomId } });

    for (const [index, file] of files.entries()) {
      const url = await uploadImageToStorage({ file, bucket: PG_IMAGES_BUCKET, entityId: pgRoomId });
      await prisma.pGImage.create({
        data: {
          pgRoomId,
          url,
          altText: file.name,
          sortOrder: existingCount + index,
          isMain: existingCount === 0 && index === 0,
        },
      });
    }

    revalidatePath(`/admin/pg/${pgRoomId}/edit`);
    revalidatePath("/pg");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    if (error instanceof ImageValidationError) return { error: error.message };
    console.error("uploadPGImages error:", error);
    return { error: "Image upload failed. Please try again." };
  }
}
