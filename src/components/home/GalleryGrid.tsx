"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  height: number;
}

export function GalleryGrid({ items, categories }: { items: GalleryItem[]; categories: string[] }) {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visible = active === "All" ? items : items.filter((item) => item.category === active);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) dialog.showModal();
    if (!selected && dialog.open) dialog.close();
  }, [selected]);

  return (
    <div>
      <div role="group" aria-label="Filter gallery by category" className="mb-8 flex flex-wrap gap-2">
        {["All", ...categories].map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            aria-pressed={active === category}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium",
              active === category
                ? "border-navy bg-navy text-white"
                : "border-navy-100 bg-white text-ink hover:bg-navy-50",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {visible.map((item) => (
          <li key={item.id} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => setSelected(item)}
              aria-label={`Open image: ${item.alt}`}
              className="block w-full overflow-hidden rounded-card"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={800}
                height={item.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setSelected(null)}
        aria-label={selected?.alt ?? "Image preview"}
        className="w-full max-w-4xl rounded-card bg-navy p-2 backdrop:bg-navy/80"
        onClick={(event) => {
          if (event.target === dialogRef.current) setSelected(null);
        }}
      >
        {selected && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close image preview"
              className="absolute right-2 top-2 z-10 rounded-md bg-white/90 p-2 text-navy hover:bg-white"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
            <Image
              src={selected.src}
              alt={selected.alt}
              width={1200}
              height={800}
              sizes="100vw"
              className="h-auto max-h-[80vh] w-full object-contain"
            />
          </div>
        )}
      </dialog>
    </div>
  );
}
