"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, Trash2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "./ConfirmDialog";
import type { UploadActionState } from "@/lib/actions/upload";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024;
const MAX_FILES = 3;

export interface ExistingImage {
  id: string;
  url: string;
  altText: string | null;
  isMain: boolean;
}

interface ImageUploaderProps {
  entityId: string;
  images: ExistingImage[];
  uploadAction: (entityId: string, formData: FormData) => Promise<UploadActionState>;
  removeAction: (imageId: string) => Promise<void>;
  setMainAction: (imageId: string, entityId: string) => Promise<void>;
}

interface Selected {
  file: File;
  previewUrl: string;
}

export function ImageUploader({ entityId, images, uploadAction, removeAction, setMainAction }: ImageUploaderProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<Selected[]>([]);
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);
  const [toRemove, setToRemove] = useState<ExistingImage | null>(null);
  const [pending, startTransition] = useTransition();

  // Release object URLs when previews change or the component unmounts.
  useEffect(() => {
    return () => selected.forEach((item) => URL.revokeObjectURL(item.previewUrl));
  }, [selected]);

  function onFilesChosen(fileList: FileList | null) {
    setMessage(null);
    if (!fileList) return;
    const accepted: Selected[] = [];
    for (const file of Array.from(fileList).slice(0, MAX_FILES)) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setMessage({ tone: "error", text: `“${file.name}” is not a JPEG, PNG or WebP image.` });
        continue;
      }
      if (file.size > MAX_BYTES) {
        setMessage({ tone: "error", text: `“${file.name}” is larger than 5 MB.` });
        continue;
      }
      accepted.push({ file, previewUrl: URL.createObjectURL(file) });
    }
    if (fileList.length > MAX_FILES) {
      setMessage({ tone: "error", text: `Please choose no more than ${MAX_FILES} images at a time.` });
    }
    setSelected(accepted);
  }

  function upload() {
    if (selected.length === 0) return;
    const formData = new FormData();
    selected.forEach((item) => formData.append("files", item.file));

    startTransition(async () => {
      const result = await uploadAction(entityId, formData);
      if (result.error) {
        setMessage({ tone: "error", text: result.error });
        return;
      }
      setSelected([]);
      if (inputRef.current) inputRef.current.value = "";
      setMessage({ tone: "success", text: "Images uploaded." });
      router.refresh();
    });
  }

  function confirmRemove() {
    if (!toRemove) return;
    const image = toRemove;
    startTransition(async () => {
      try {
        await removeAction(image.id);
        setMessage({ tone: "success", text: "Image removed." });
      } catch {
        setMessage({ tone: "error", text: "Could not remove the image." });
      }
      setToRemove(null);
    });
  }

  function makeMain(image: ExistingImage) {
    startTransition(async () => {
      try {
        await setMainAction(image.id, entityId);
        setMessage({ tone: "success", text: "Main image updated." });
      } catch {
        setMessage({ tone: "error", text: "Could not update the main image." });
      }
    });
  }

  return (
    <div className="space-y-4">
      {message && (
        <div
          role={message.tone === "error" ? "alert" : "status"}
          className={`rounded-md border p-3 text-sm ${
            message.tone === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {images.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((image) => (
            <li key={image.id} className="overflow-hidden rounded-card border border-navy-100 bg-white">
              <div className="relative h-28 w-full bg-navy-50">
                <Image src={image.url} alt={image.altText ?? ""} fill sizes="200px" className="object-cover" />
                {image.isMain && (
                  <span className="absolute left-2 top-2 rounded-full bg-gold px-2 py-0.5 text-xs font-semibold text-navy">
                    Main image
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between p-2">
                <button
                  type="button"
                  disabled={image.isMain || pending}
                  onClick={() => makeMain(image)}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-navy hover:bg-navy-50 disabled:opacity-40"
                >
                  <Star className="h-3.5 w-3.5" aria-hidden /> Set as main
                </button>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => setToRemove(image)}
                  aria-label={`Remove image ${image.altText ?? ""}`}
                  className="rounded-md p-1.5 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted">No images uploaded yet.</p>
      )}

      <div className="rounded-card border border-dashed border-navy-100 bg-white p-4">
        <label htmlFor={`images-${entityId}`} className="mb-2 block text-sm font-medium text-ink">
          Add images <span className="font-normal text-muted">(JPEG, PNG or WebP, up to 5 MB each; 3 at a time)</span>
        </label>
        <input
          id={`images-${entityId}`}
          ref={inputRef}
          type="file"
          multiple
          accept={ALLOWED_TYPES.join(",")}
          onChange={(event) => onFilesChosen(event.target.files)}
          className="block w-full text-sm text-muted file:mr-3 file:rounded-md file:border-0 file:bg-navy file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-navy-600"
        />

        {selected.length > 0 && (
          <>
            <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {selected.map((item) => (
                <li key={item.previewUrl} className="relative h-20 overflow-hidden rounded-md bg-navy-50">
                  <Image src={item.previewUrl} alt={`Preview of ${item.file.name}`} fill unoptimized sizes="120px" className="object-cover" />
                </li>
              ))}
            </ul>
            <Button onClick={upload} disabled={pending} className="mt-4">
              <UploadCloud className="h-4 w-4" aria-hidden />
              {pending ? "Uploading…" : `Upload ${selected.length} ${selected.length === 1 ? "image" : "images"}`}
            </Button>
          </>
        )}
      </div>

      <ConfirmDialog
        open={toRemove !== null}
        title="Remove this image?"
        message="The image will be permanently deleted from this listing."
        confirmLabel="Remove"
        pending={pending}
        onConfirm={confirmRemove}
        onCancel={() => setToRemove(null)}
      />
    </div>
  );
}
