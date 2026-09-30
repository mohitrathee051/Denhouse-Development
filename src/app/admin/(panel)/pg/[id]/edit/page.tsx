import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { PGForm } from "@/components/forms/PGForm";
import { FormBanner } from "@/components/forms/FormParts";
import { removePGImage, setMainPGImage } from "@/lib/actions/pg";
import { uploadPGImages } from "@/lib/actions/upload";
import { getPGRoomById } from "@/lib/data/pg";

export const metadata: Metadata = { title: "Edit PG Room" };

type Params = Promise<{ id: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function EditPGPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const { id } = await params;
  const raw = await searchParams;
  const room = await getPGRoomById(id);
  if (!room) notFound();

  return (
    <div className="max-w-4xl space-y-8">
      <h1 className="font-heading text-2xl font-semibold text-ink">Edit PG Room</h1>
      {raw.created === "1" && (
        <FormBanner tone="success">PG room created. You can now upload images below.</FormBanner>
      )}
      <PGForm
        room={{
          ...room,
          monthlyRent: room.monthlyRent.toString(),
          securityDeposit: room.securityDeposit?.toString() ?? null,
        }}
      />
      <section aria-labelledby="images-heading" className="rounded-card border border-navy-100 bg-white p-5 shadow-card sm:p-6">
        <h2 id="images-heading" className="mb-4 font-heading text-lg font-semibold text-ink">Images</h2>
        <ImageUploader
          entityId={room.id}
          images={room.images}
          uploadAction={uploadPGImages}
          removeAction={removePGImage}
          setMainAction={setMainPGImage}
        />
      </section>
    </div>
  );
}
