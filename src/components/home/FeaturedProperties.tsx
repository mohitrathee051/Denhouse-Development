import { PropertyGrid } from "@/components/real-estate/PropertyGrid";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedProperties } from "@/lib/data/properties";

export async function FeaturedProperties() {
  const properties = await getFeaturedProperties(6);

  return (
    <section className="py-20" aria-label="Featured properties">
      <div className="container-page">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Handpicked" title="Featured Properties" />
          <Button href="/real-estate" variant="outline">View All Properties</Button>
        </div>
        <PropertyGrid properties={properties} />
        <p className="mt-6 text-xs text-muted">
          Listings shown during development are sample data, not real Denhouse Group inventory.
        </p>
      </div>
    </section>
  );
}
