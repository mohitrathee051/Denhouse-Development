import { z } from "zod";
import type { PropertyFilterParams } from "@/types/property";
import type { PGFilterParams } from "@/types/pg";

type RawParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  const v = Array.isArray(value) ? value[0] : value;
  return v && v.trim() !== "" ? v.trim() : undefined;
}

const optionalNumber = z.coerce.number().nonnegative().optional();

/** Parses untrusted URL query params into a validated filter object. */
export function parsePropertyFilters(raw: RawParams): PropertyFilterParams {
  const parsed = z
    .object({
      listingType: z.enum(["SALE", "RENT"]).optional(),
      category: z.enum(["RESIDENTIAL", "COMMERCIAL", "LAND"]).optional(),
      propertyType: z.string().optional(),
      city: z.string().max(100).optional(),
      location: z.string().max(100).optional(),
      minPrice: optionalNumber,
      maxPrice: optionalNumber,
      bedrooms: optionalNumber,
      bathrooms: optionalNumber,
      minArea: optionalNumber,
      featured: z.enum(["true"]).optional(),
      status: z.enum(["AVAILABLE", "SOLD", "RENTED", "UNDER_OFFER", "COMING_SOON"]).optional(),
      sort: z.enum(["newest", "price-asc", "price-desc"]).optional(),
      page: z.coerce.number().int().min(1).optional(),
    })
    .safeParse({
      listingType: first(raw.listingType),
      category: first(raw.category),
      propertyType: first(raw.propertyType),
      city: first(raw.city),
      location: first(raw.location),
      minPrice: first(raw.minPrice),
      maxPrice: first(raw.maxPrice),
      bedrooms: first(raw.bedrooms),
      bathrooms: first(raw.bathrooms),
      minArea: first(raw.minArea),
      featured: first(raw.featured),
      status: first(raw.status),
      sort: first(raw.sort),
      page: first(raw.page),
    });

  if (!parsed.success) return {};
  const { featured, propertyType, ...rest } = parsed.data;
  // The homepage search offers broad groups (Residential / Commercial / Plot)
  // alongside specific types, all through one "propertyType" field.
  const isCategory = propertyType === "RESIDENTIAL" || propertyType === "COMMERCIAL" || propertyType === "LAND";
  return {
    ...rest,
    category: isCategory ? propertyType : rest.category,
    propertyType: isCategory ? undefined : (propertyType as PropertyFilterParams["propertyType"]),
    featured: featured === "true" ? true : undefined,
  };
}

export function parsePGFilters(raw: RawParams): PGFilterParams {
  const bool = z.enum(["true"]).optional();
  const parsed = z
    .object({
      city: z.string().max(100).optional(),
      location: z.string().max(100).optional(),
      gender: z.enum(["MALE", "FEMALE", "UNISEX"]).optional(),
      roomType: z.enum(["SINGLE", "DOUBLE_SHARING", "TRIPLE_SHARING", "OTHER"]).optional(),
      maxRent: optionalNumber,
      ac: bool,
      wifi: bool,
      food: bool,
      availability: z.enum(["AVAILABLE", "FULL", "COMING_SOON"]).optional(),
      page: z.coerce.number().int().min(1).optional(),
    })
    .safeParse({
      city: first(raw.city),
      location: first(raw.location),
      gender: first(raw.gender),
      roomType: first(raw.roomType),
      maxRent: first(raw.maxRent),
      ac: first(raw.ac),
      wifi: first(raw.wifi),
      food: first(raw.food),
      availability: first(raw.availability),
      page: first(raw.page),
    });

  if (!parsed.success) return {};
  const { ac, wifi, food, ...rest } = parsed.data;
  return {
    ...rest,
    ac: ac ? true : undefined,
    wifi: wifi ? true : undefined,
    food: food ? true : undefined,
  };
}

/** Rebuilds a query string from raw params, overriding selected keys. */
export function buildQuery(raw: RawParams, overrides: Record<string, string | undefined>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(raw)) {
    const v = first(value);
    if (v !== undefined) params.set(key, v);
  }
  for (const [key, value] of Object.entries(overrides)) {
    if (value === undefined) params.delete(key);
    else params.set(key, value);
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}
