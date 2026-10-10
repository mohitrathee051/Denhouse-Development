import type { Metadata } from "next";
import { GalleryGrid, type GalleryItem } from "@/components/home/GalleryGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from Den House Group real estate, PG accommodation and more.",
  alternates: { canonical: "/gallery" },
};

const CATEGORIES = ["Real Estate", "PG", "Office", "Properties", "Lifestyle"];
const HEIGHTS = [600, 800, 700, 900, 650];

/** SAMPLE placeholder photography (picsum.photos) — replace with real photos. */
const ITEMS: GalleryItem[] = CATEGORIES.flatMap((category, categoryIndex) =>
  Array.from({ length: 3 }, (_, i) => ({
    id: `${categoryIndex}-${i}`,
    src: `https://picsum.photos/seed/denhouse-gallery-${categoryIndex}-${i}/800/${HEIGHTS[(categoryIndex + i) % HEIGHTS.length]}`,
    alt: `Sample ${category} photo ${i + 1}`,
    category,
    height: HEIGHTS[(categoryIndex + i) % HEIGHTS.length] ?? 700,
  })),
);

export default function GalleryPage() {
  return (
    <div className="container-page py-12">
      <SectionHeading eyebrow="Gallery" title="Our Gallery" />
      <p className="mb-8 mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
        Sample placeholder photography — replace with real Den House Group images.
      </p>
      <GalleryGrid items={ITEMS} categories={CATEGORIES} />
    </div>
  );
}
