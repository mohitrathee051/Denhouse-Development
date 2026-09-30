import { PropertyGallery } from "@/components/real-estate/PropertyGallery";

interface PGGalleryProps {
  images: { id: string; url: string; altText: string | null }[];
  title: string;
}

/** PG rooms share the same gallery/lightbox behaviour as properties. */
export function PGGallery({ images, title }: PGGalleryProps) {
  return <PropertyGallery images={images} title={title} />;
}
