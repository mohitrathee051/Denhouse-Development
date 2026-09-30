import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Pencil } from "lucide-react";
import { DeleteButton, FeaturedToggle, StatusSelect } from "./RowControls";
import { deleteProperty, setPropertyStatus, togglePropertyFeatured } from "@/lib/actions/properties";
import { formatPrice, humanizeEnum } from "@/lib/utils/formatting";
import type { Property, PropertyImage } from "@prisma/client";

const STATUS_OPTIONS = [
  { value: "AVAILABLE", label: "Available" },
  { value: "SOLD", label: "Sold" },
  { value: "RENTED", label: "Rented" },
  { value: "UNDER_OFFER", label: "Under Offer" },
  { value: "COMING_SOON", label: "Coming Soon" },
] as const;

type Row = Property & { images: Pick<PropertyImage, "url" | "altText">[] };

export function PropertyTable({ properties, compact = false }: { properties: Row[]; compact?: boolean }) {
  return (
    <div className="overflow-x-auto rounded-card border border-navy-100 bg-white shadow-card">
      <table className="min-w-full divide-y divide-navy-100 text-sm">
        <thead className="bg-navy-50 text-left text-xs uppercase tracking-wide text-muted">
          <tr>
            <th scope="col" className="px-4 py-3">Property</th>
            <th scope="col" className="px-4 py-3">Price</th>
            <th scope="col" className="px-4 py-3">Status</th>
            {!compact && <th scope="col" className="px-4 py-3">Featured</th>}
            {!compact && <th scope="col" className="px-4 py-3 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-100">
          {properties.map((property) => {
            const image = property.images[0];
            return (
              <tr key={property.id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded bg-navy-50">
                      {image && <Image src={image.url} alt="" fill sizes="64px" className="object-cover" />}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-ink">{property.title}</p>
                      <p className="text-xs text-muted">
                        {property.location}, {property.city} · {humanizeEnum(property.propertyType)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {formatPrice(property.price.toString(), property.priceLabel)}
                </td>
                <td className="px-4 py-3">
                  {compact ? (
                    humanizeEnum(property.status)
                  ) : (
                    <StatusSelect
                      label={`Status for ${property.title}`}
                      value={property.status}
                      options={[...STATUS_OPTIONS]}
                      action={setPropertyStatus.bind(null, property.id)}
                    />
                  )}
                </td>
                {!compact && (
                  <td className="px-4 py-3">
                    <FeaturedToggle
                      itemName={property.title}
                      featured={property.featured}
                      action={togglePropertyFeatured.bind(null, property.id)}
                    />
                  </td>
                )}
                {!compact && (
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/real-estate/${property.slug}`} target="_blank" aria-label={`View ${property.title} on site`} className="rounded-md p-2 text-muted hover:bg-navy-50">
                        <ExternalLink className="h-4 w-4" aria-hidden />
                      </Link>
                      <Link href={`/admin/properties/${property.id}/edit`} aria-label={`Edit ${property.title}`} className="rounded-md p-2 text-navy hover:bg-navy-50">
                        <Pencil className="h-4 w-4" aria-hidden />
                      </Link>
                      <DeleteButton itemName={property.title} action={deleteProperty.bind(null, property.id)} />
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
