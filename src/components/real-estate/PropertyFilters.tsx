"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, type FormEvent } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/utils/cn";

const LISTING_TYPE_OPTIONS = [
  { value: "", label: "Any" },
  { value: "SALE", label: "Buy" },
  { value: "RENT", label: "Rent" },
];

const CATEGORY_OPTIONS = [
  { value: "", label: "Any" },
  { value: "RESIDENTIAL", label: "Residential" },
  { value: "COMMERCIAL", label: "Commercial" },
  { value: "LAND", label: "Plot / Land" },
];

const PROPERTY_TYPE_OPTIONS = [
  { value: "", label: "Any" },
  { value: "APARTMENT", label: "Apartment" },
  { value: "FLAT", label: "Flat" },
  { value: "VILLA", label: "Villa" },
  { value: "INDEPENDENT_HOUSE", label: "Independent House" },
  { value: "BUILDER_FLOOR", label: "Builder Floor" },
  { value: "STUDIO", label: "Studio" },
  { value: "OFFICE", label: "Office" },
  { value: "SHOP", label: "Shop" },
  { value: "SHOWROOM", label: "Showroom" },
  { value: "WAREHOUSE", label: "Warehouse" },
  { value: "COMMERCIAL_BUILDING", label: "Commercial Building" },
  { value: "RESIDENTIAL_PLOT", label: "Residential Plot" },
  { value: "COMMERCIAL_PLOT", label: "Commercial Plot" },
  { value: "AGRICULTURAL_LAND", label: "Agricultural Land" },
];

export function PropertyFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      if (typeof value === "string" && value.trim() !== "") {
        params.set(key, value);
      }
    }

    router.push(`${pathname}?${params.toString()}`);
    setMobileOpen(false);
  }

  function handleClear() {
    router.push(pathname);
    setMobileOpen(false);
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Select
        name="listingType"
        label="Purpose"
        options={LISTING_TYPE_OPTIONS}
        defaultValue={searchParams.get("listingType") ?? ""}
      />
      <Select
        name="category"
        label="Category"
        options={CATEGORY_OPTIONS}
        defaultValue={searchParams.get("category") ?? ""}
      />
      <Select
        name="propertyType"
        label="Property Type"
        options={PROPERTY_TYPE_OPTIONS}
        defaultValue={searchParams.get("propertyType") ?? ""}
      />
      <Input
        name="city"
        label="City"
        placeholder="e.g. Karnal"
        defaultValue={searchParams.get("city") ?? ""}
      />
      <Input
        name="location"
        label="Location / Area"
        placeholder="e.g. Model Town"
        defaultValue={searchParams.get("location") ?? ""}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          name="minPrice"
          type="number"
          min={0}
          label="Min Price"
          placeholder="₹"
          defaultValue={searchParams.get("minPrice") ?? ""}
        />
        <Input
          name="maxPrice"
          type="number"
          min={0}
          label="Max Price"
          placeholder="₹"
          defaultValue={searchParams.get("maxPrice") ?? ""}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          name="bedrooms"
          type="number"
          min={0}
          label="Min Bedrooms"
          defaultValue={searchParams.get("bedrooms") ?? ""}
        />
        <Input
          name="bathrooms"
          type="number"
          min={0}
          label="Min Bathrooms"
          defaultValue={searchParams.get("bathrooms") ?? ""}
        />
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-ink">
        <input
          type="checkbox"
          name="featured"
          value="true"
          defaultChecked={searchParams.get("featured") === "true"}
          className="h-4 w-4 rounded border-navy-100 text-navy focus:ring-gold"
        />
        Featured only
      </label>

      <div className="flex gap-3">
        <Button type="submit" className="w-full">
          Apply Filters
        </Button>
        <Button type="button" variant="outline" onClick={handleClear}>
          Clear
        </Button>
      </div>
    </form>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block lg:w-72 lg:shrink-0" aria-label="Property filters">
        <div className="sticky top-24 rounded-card border border-navy-100 bg-white p-5 shadow-card">
          <h2 className="mb-4 font-heading text-lg font-semibold text-ink">Filters</h2>
          {formContent}
        </div>
      </aside>

      {/* Mobile trigger */}
      <div className="mb-4 lg:hidden">
        <Button variant="outline" onClick={() => setMobileOpen(true)} className="w-full">
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          Filters
        </Button>
      </div>

      {/* Mobile collapsible panel */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-navy/40 lg:hidden",
          mobileOpen ? "block" : "hidden",
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      >
        <div
          className="ml-auto h-full w-80 max-w-[90vw] overflow-y-auto bg-white p-5"
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Property filters"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-ink">Filters</h2>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close filters"
              className="rounded-md p-1.5 text-muted hover:bg-navy-50"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          {formContent}
        </div>
      </div>
    </>
  );
}
