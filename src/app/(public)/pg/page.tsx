import type { Metadata } from "next";
import { Suspense } from "react";
import { PGFilters } from "@/components/pg/PGFilters";
import { PGGrid } from "@/components/pg/PGGrid";
import { Pagination } from "@/components/ui/Pagination";
import { getPGRooms } from "@/lib/data/pg";
import { buildQuery, parsePGFilters } from "@/lib/utils/search-params";

export const metadata: Metadata = {
  title: "PG Accommodation",
  description:
    "Find paying guest (PG) rooms with Den House Group. Filter by location, rent, gender, room type and amenities.",
  alternates: { canonical: "/pg" },
};

export const dynamic = "force-dynamic";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function PGPage({ searchParams }: { searchParams: SearchParams }) {
  const raw = await searchParams;
  const result = await getPGRooms(parsePGFilters(raw));

  return (
    <div className="container-page py-10">
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-ink sm:text-4xl">PG Accommodation</h1>
        <p className="mt-2 text-muted">Comfortable paying guest rooms, filtered your way.</p>
      </header>

      <Suspense fallback={null}>
        <PGFilters />
      </Suspense>

      <p className="mb-5 mt-8 text-sm text-muted" aria-live="polite">
        {result.total} {result.total === 1 ? "room" : "rooms"} found
      </p>

      <PGGrid rooms={result.items} />

      <Pagination
        page={result.page}
        totalPages={result.totalPages}
        basePath="/pg"
        buildHref={(page) => buildQuery(raw, { page: String(page) })}
      />
    </div>
  );
}
