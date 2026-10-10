import type { Metadata } from "next";
import { Suspense } from "react";
import { PropertyFilters } from "@/components/real-estate/PropertyFilters";
import { PropertyGrid } from "@/components/real-estate/PropertyGrid";
import { Pagination } from "@/components/ui/Pagination";
import { SortSelect } from "@/components/ui/SortSelect";
import { getProperties } from "@/lib/data/properties";
import { buildQuery, parsePropertyFilters } from "@/lib/utils/search-params";

export const metadata: Metadata = {
  title: "Properties for Sale & Rent",
  description:
    "Browse residential, commercial and plot listings from Den House Group. Filter by location, budget, bedrooms and more.",
  alternates: { canonical: "/real-estate" },
};

export const dynamic = "force-dynamic";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function RealEstatePage({ searchParams }: { searchParams: SearchParams }) {
  const raw = await searchParams;
  const filters = parsePropertyFilters(raw);
  const result = await getProperties(filters);

  return (
    <div className="container-page py-10">
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-ink sm:text-4xl">
          Properties for Sale &amp; Rent
        </h1>
        <p className="mt-2 text-muted">
          Explore listings and filter by what matters to you.
        </p>
      </header>

      <div className="flex flex-col gap-8 lg:flex-row">
        <Suspense fallback={null}>
          <PropertyFilters />
        </Suspense>

        <section className="min-w-0 flex-1" aria-label="Property results">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted" aria-live="polite">
              {result.total} {result.total === 1 ? "property" : "properties"} found
            </p>
            <Suspense fallback={null}>
              <SortSelect />
            </Suspense>
          </div>

          <PropertyGrid properties={result.items} />

          <Pagination
            page={result.page}
            totalPages={result.totalPages}
            basePath="/real-estate"
            buildHref={(page) => buildQuery(raw, { page: String(page) })}
          />
        </section>
      </div>
    </div>
  );
}
