import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface PaginationProps {
  page: number;
  totalPages: number;
  basePath: string;
  /** Returns the query string (with leading ?) for a given page number. */
  buildHref: (page: number) => string;
}

export function Pagination({ page, totalPages, basePath, buildHref }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  );

  const linkClass =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-md border border-navy-100 bg-white px-3 text-sm font-medium text-ink hover:bg-navy-50";

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
      {page > 1 && (
        <Link href={`${basePath}${buildHref(page - 1)}`} className={linkClass} aria-label="Previous page">
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </Link>
      )}
      {pages.map((p, index) => {
        const previous = pages[index - 1];
        return (
          <span key={p} className="flex items-center gap-2">
            {previous !== undefined && p - previous > 1 && <span className="text-muted">…</span>}
            <Link
              href={`${basePath}${buildHref(p)}`}
              aria-current={p === page ? "page" : undefined}
              className={cn(linkClass, p === page && "border-navy bg-navy text-white hover:bg-navy")}
            >
              {p}
            </Link>
          </span>
        );
      })}
      {page < totalPages && (
        <Link href={`${basePath}${buildHref(page + 1)}`} className={linkClass} aria-label="Next page">
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Link>
      )}
    </nav>
  );
}
