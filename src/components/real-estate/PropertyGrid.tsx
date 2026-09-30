import { Home } from "lucide-react";
import { PropertyCard } from "./PropertyCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { PropertyWithImages } from "@/types/property";

export function PropertyGrid({ properties }: { properties: PropertyWithImages[] }) {
  if (properties.length === 0) {
    return (
      <EmptyState
        icon={Home}
        title="No properties found."
        description="Try adjusting your filters — for example, a wider budget range or a different location."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
