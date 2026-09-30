import { PropertyCard } from "./PropertyCard";
import type { PropertyWithImages } from "@/types/property";

export function RelatedProperties({ properties }: { properties: PropertyWithImages[] }) {
  if (properties.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="mt-16">
      <h2 id="related-heading" className="mb-6 font-heading text-2xl font-semibold text-ink">
        Related Properties
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}
