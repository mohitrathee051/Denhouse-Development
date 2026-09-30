"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const GENDER = [
  { value: "", label: "Any" },
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "UNISEX", label: "Unisex" },
];
const ROOM_TYPE = [
  { value: "", label: "Any" },
  { value: "SINGLE", label: "Single" },
  { value: "DOUBLE_SHARING", label: "Double Sharing" },
  { value: "TRIPLE_SHARING", label: "Triple Sharing" },
  { value: "OTHER", label: "Other" },
];
const AVAILABILITY = [
  { value: "", label: "Any" },
  { value: "AVAILABLE", label: "Available" },
  { value: "FULL", label: "Full" },
  { value: "COMING_SOON", label: "Coming Soon" },
];

const AMENITY_FILTERS = [
  { name: "ac", label: "AC" },
  { name: "wifi", label: "WiFi" },
  { name: "food", label: "Food" },
] as const;

export function PGFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    for (const [key, value] of new FormData(event.currentTarget).entries()) {
      if (typeof value === "string" && value.trim() !== "") params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="PG filters"
      className="rounded-card border border-navy-100 bg-white p-5 shadow-card"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Input name="location" label="Location" placeholder="e.g. Sector 13" defaultValue={searchParams.get("location") ?? ""} />
        <Input name="maxRent" type="number" min={0} label="Max Monthly Rent" placeholder="₹" defaultValue={searchParams.get("maxRent") ?? ""} />
        <Select name="gender" label="Gender" options={GENDER} defaultValue={searchParams.get("gender") ?? ""} />
        <Select name="roomType" label="Room Type" options={ROOM_TYPE} defaultValue={searchParams.get("roomType") ?? ""} />
        <Select name="availability" label="Availability" options={AVAILABILITY} defaultValue={searchParams.get("availability") ?? ""} />
        <fieldset className="sm:col-span-2 lg:col-span-2">
          <legend className="mb-1.5 text-sm font-medium text-ink">Amenities</legend>
          <div className="flex flex-wrap gap-4 pt-2">
            {AMENITY_FILTERS.map((amenity) => (
              <label key={amenity.name} className="flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  name={amenity.name}
                  value="true"
                  defaultChecked={searchParams.get(amenity.name) === "true"}
                  className="h-4 w-4 rounded border-navy-100 text-navy focus:ring-gold"
                />
                {amenity.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="mt-5 flex gap-3">
        <Button type="submit">Search PG</Button>
        <Button type="button" variant="outline" onClick={() => router.push(pathname)}>
          Clear
        </Button>
      </div>
    </form>
  );
}
