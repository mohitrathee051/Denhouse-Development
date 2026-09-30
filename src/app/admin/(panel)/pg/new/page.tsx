import type { Metadata } from "next";
import { PGForm } from "@/components/forms/PGForm";

export const metadata: Metadata = { title: "Add PG Room" };

export default function NewPGPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="font-heading text-2xl font-semibold text-ink">Add PG Room</h1>
      <PGForm />
    </div>
  );
}
