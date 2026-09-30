import Image from "next/image";
import Link from "next/link";
import { Bath, Bed, Maximize, MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatArea, formatPrice, humanizeEnum } from "@/lib/utils/formatting";
import type { PropertyWithImages } from "@/types/property";

const statusTone = {
  AVAILABLE: "success",
  SOLD: "danger",
  RENTED: "neutral",
  UNDER_OFFER: "warning",
  COMING_SOON: "navy",
} as const;

export function PropertyCard({ property }: { property: PropertyWithImages }) {
  const mainImage = property.images.find((img) => img.isMain) ?? property.images[0];
  const area = formatArea(property.area, property.areaUnit);

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-card-hover">
      <Link href={`/real-estate/${property.slug}`} className="block">
        <div className="relative h-56 w-full overflow-hidden bg-navy-50">
          {mainImage ? (
            <Image
              src={mainImage.url}
              alt={mainImage.altText ?? property.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted">
              No image available
            </div>
          )}

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {property.featured && <Badge tone="gold">Featured</Badge>}
            <Badge tone={statusTone[property.status]}>{humanizeEnum(property.status)}</Badge>
          </div>

          <div className="absolute right-3 top-3">
            <Badge tone="navy">{property.listingType === "SALE" ? "For Sale" : "For Rent"}</Badge>
          </div>
        </div>

        <div className="space-y-3 p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading text-lg font-semibold leading-snug text-ink group-hover:text-navy">
              {property.title}
            </h3>
          </div>

          <p className="flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="h-4 w-4 shrink-0 text-gold-600" aria-hidden />
            {property.location}, {property.city}
          </p>

          <p className="font-heading text-xl font-bold text-navy">
            {formatPrice(property.price.toString(), property.priceLabel)}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-navy-100 pt-3 text-sm text-muted">
            {property.bedrooms !== null && property.bedrooms !== undefined && (
              <span className="flex items-center gap-1">
                <Bed className="h-4 w-4" aria-hidden /> {property.bedrooms} Beds
              </span>
            )}
            {property.bathrooms !== null && property.bathrooms !== undefined && (
              <span className="flex items-center gap-1">
                <Bath className="h-4 w-4" aria-hidden /> {property.bathrooms} Baths
              </span>
            )}
            {area && (
              <span className="flex items-center gap-1">
                <Maximize className="h-4 w-4" aria-hidden /> {area}
              </span>
            )}
          </div>
        </div>
      </Link>
    </Card>
  );
}
