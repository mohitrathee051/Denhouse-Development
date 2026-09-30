import "server-only";
import { getSupabaseAdminClient } from "./admin";

export const PROPERTY_IMAGES_BUCKET = "property-images";
export const PG_IMAGES_BUCKET = "pg-images";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export class ImageValidationError extends Error {}

export function assertValidImageFile(file: File) {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new ImageValidationError("Only JPEG, PNG, or WebP images are allowed.");
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new ImageValidationError("Each image must be smaller than 5 MB.");
  }
}

function safeFileName(originalName: string): string {
  const extension = originalName.split(".").pop()?.toLowerCase() ?? "jpg";
  const random = crypto.randomUUID();
  return `${random}.${extension}`;
}

/**
 * Uploads a single image to the given bucket under `<entityId>/<uuid>.ext`
 * and returns its public URL. Bucket must already exist and be public
 * (see README §11 for Supabase Storage setup).
 */
export async function uploadImageToStorage(params: {
  file: File;
  bucket: string;
  entityId: string;
}): Promise<string> {
  const { file, bucket, entityId } = params;
  assertValidImageFile(file);

  const supabase = getSupabaseAdminClient();
  const path = `${entityId}/${safeFileName(file.name)}`;

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/** Deletes an image given its full public URL. Best-effort — logs but does not throw. */
export async function deleteImageFromStorage(bucket: string, publicUrl: string): Promise<void> {
  try {
    const marker = `/storage/v1/object/public/${bucket}/`;
    const index = publicUrl.indexOf(marker);
    if (index === -1) return;

    const path = publicUrl.slice(index + marker.length);
    const supabase = getSupabaseAdminClient();
    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) {
      console.error(`Failed to delete storage object at ${path}:`, error.message);
    }
  } catch (error) {
    console.error("deleteImageFromStorage error:", error);
  }
}
