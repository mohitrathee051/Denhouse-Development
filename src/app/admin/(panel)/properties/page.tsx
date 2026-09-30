import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { PropertyTable } from "@/components/admin/PropertyTable";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { getAllPropertiesForAdmin } from "@/lib/data/properties";

export const metadata: Metadata = { title: "Properties" };

export default async function AdminPropertiesPage() {
  const properties = await getAllPropertiesForAdmin();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-heading text-2xl font-semibold text-ink">Properties</h1>
        <Button href="/admin/properties/new"><Plus className="h-4 w-4" aria-hidden /> Add Property</Button>
      </div>
      {properties.length === 0 ? (
        <EmptyState title="No properties yet." description="Click “Add Property” to create your first listing." />
      ) : (
        <PropertyTable properties={properties} />
      )}
    </div>
  );
}
