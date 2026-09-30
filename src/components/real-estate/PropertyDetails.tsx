import { Badge } from "@/components/ui/Badge";
import { formatArea, formatPrice, humanizeEnum } from "@/lib/utils/formatting";
import type { PropertyWithImages } from "@/types/property";
import { MapPin } from "lucide-react";

const statusTone = {
  AVAILABLE: "success",
  SOLD: "danger",
  RENTED: "neutral",
  UNDER_OFFER: "warning",
  COMING_SOON: "navy",
} as const;

interface SpecRow {
  label: string;
  value: string | null;
}

export function PropertyHeader({ property }: { property: PropertyWithImages }) {
  return (
    <header className="mb-6">
      <div className="mb-3 flex flex-wrap gap-2">
        {property.featured && <Badge tone="gold">Featured</Badge>}
        <Badge tone={statusTone[property.status]}>{humanizeEnum(property.status)}</Badge>
        <Badge tone="navy">{property.listingType === "SALE" ? "For Sale" : "For Rent"}</Badge>
        <Badge tone="neutral">{humanizeEnum(property.propertyType)}</Badge>
      </div>
      <h1 className="font-heading text-3xl font-semibold text-ink sm:text-4xl">{property.title}</h1>
      <p className="mt-2 flex items-center gap-1.5 text-muted">
        <MapPin className="h-4 w-4 text-gold-600" aria-hidden />
        {[property.address, property.location, property.city, property.state, property.pincode]
          .filter(Boolean)
          .join(", ")}
      </p>
      <p className="mt-4 font-heading text-3xl font-bold text-navy">
        {formatPrice(property.price.toString(), property.priceLabel)}
      </p>
    </header>
  );
}

export function PropertySpecifications({ property }: { property: PropertyWithImages }) {
  const rows: SpecRow[] = [
    { label: "Property Type", value: humanizeEnum(property.propertyType) },
    { label: "Purpose", value: property.listingType === "SALE" ? "Sale" : "Rent" },
    { label: "Bedrooms", value: property.bedrooms?.toString() ?? null },
    { label: "Bathrooms", value: property.bathrooms?.toString() ?? null },
    { label: "Balconies", value: property.balconies?.toString() ?? null },
    { label: "Area", value: formatArea(property.area, property.areaUnit) },
    { label: "Year Built", value: property.yearBuilt?.toString() ?? null },
    { label: "Furnishing", value: property.furnishing ? humanizeEnum(property.furnishing) : null },
    { label: "Parking", value: property.parking ? "Available" : "Not available" },
  ];

  const visible = rows.filter((row): row is { label: string; value: string } => row.value !== null);

  return (
    <section aria-labelledby="specs-heading">
      <h2 id="specs-heading" className="mb-4 font-heading text-xl font-semibold text-ink">
        Specifications
      </h2>
      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {visible.map((row) => (
          <div key={row.label} className="rounded-md border border-navy-100 bg-white p-3">
            <dt className="text-xs uppercase tracking-wide text-muted">{row.label}</dt>
            <dd className="mt-1 text-sm font-semibold text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function PropertyDescription({ description }: { description: string }) {
  return (
    <section aria-labelledby="description-heading">
      <h2 id="description-heading" className="mb-4 font-heading text-xl font-semibold text-ink">
        Description
      </h2>
      <p className="whitespace-pre-line leading-relaxed text-ink/80">{description}</p>
    </section>
  );
}

export function PropertyLocation({ property }: { property: PropertyWithImages }) {
  const query = encodeURIComponent(
    property.latitude !== null && property.longitude !== null
      ? `${property.latitude},${property.longitude}`
      : `${property.location}, ${property.city}, ${property.state}`,
  );

  return (
    <section aria-labelledby="location-heading">
      <h2 id="location-heading" className="mb-4 font-heading text-xl font-semibold text-ink">
        Location
      </h2>
      <div className="rounded-card border border-navy-100 bg-white p-5 text-sm text-muted">
        <p>
          {property.location}, {property.city}, {property.state}
        </p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${query}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block font-semibold text-navy underline underline-offset-4 hover:text-gold-600"
        >
          View on Google Maps
        </a>
      </div>
    </section>
  );
}
