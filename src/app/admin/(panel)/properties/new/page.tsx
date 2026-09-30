import type { Metadata } from "next";
import { PropertyForm } from "@/components/forms/PropertyForm";

export const metadata: Metadata = { title: "Add Property" };

export default function NewPropertyPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="font-heading text-2xl font-semibold text-ink">Add Property</h1>
      <PropertyForm />
    </div>
  );
}
