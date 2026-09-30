import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { PropertyForm } from "@/components/forms/PropertyForm";
import { FormBanner } from "@/components/forms/FormParts";
import { removePropertyImage, setMainPropertyImage } from "@/lib/actions/properties";
import { uploadPropertyImages } from "@/lib/actions/upload";
import { getPropertyById } from "@/lib/data/properties";

export const metadata: Metadata = { title: "Edit Property" };

type Params = Promise<{ id: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function EditPropertyPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const { id } = await params;
  const raw = await searchParams;
  const property = await getPropertyById(id);
  if (!property) notFound();

  return (
    <div className="max-w-4xl space-y-8">
      <h1 className="font-heading text-2xl font-semibold text-ink">Edit Property</h1>
      {raw.created === "1" && (
        <FormBanner tone="success">Property created. You can now upload images below.</FormBanner>
      )}
      <PropertyForm property={{ ...property, price: property.price.toString() }} />
      <section aria-labelledby="images-heading" className="rounded-card border border-navy-100 bg-white p-5 shadow-card sm:p-6">
        <h2 id="images-heading" className="mb-4 font-heading text-lg font-semibold text-ink">Images</h2>
        <ImageUploader
          entityId={property.id}
          images={property.images}
          uploadAction={uploadPropertyImages}
          removeAction={removePropertyImage}
          setMainAction={setMainPropertyImage}
        />
      </section>
    </div>
  );
}
