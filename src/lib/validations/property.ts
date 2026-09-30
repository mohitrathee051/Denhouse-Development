import { z } from "zod";

export const propertyCategoryEnum = z.enum(["RESIDENTIAL", "COMMERCIAL", "LAND"]);

export const propertyTypeEnum = z.enum([
  "APARTMENT",
  "FLAT",
  "VILLA",
  "INDEPENDENT_HOUSE",
  "BUILDER_FLOOR",
  "STUDIO",
  "OFFICE",
  "SHOP",
  "SHOWROOM",
  "WAREHOUSE",
  "COMMERCIAL_BUILDING",
  "RESIDENTIAL_PLOT",
  "COMMERCIAL_PLOT",
  "AGRICULTURAL_LAND",
]);

export const listingTypeEnum = z.enum(["SALE", "RENT"]);
export const propertyStatusEnum = z.enum([
  "AVAILABLE",
  "SOLD",
  "RENTED",
  "UNDER_OFFER",
  "COMING_SOON",
]);
export const furnishingEnum = z.enum(["UNFURNISHED", "SEMI_FURNISHED", "FULLY_FURNISHED"]);
export const areaUnitEnum = z.enum(["SQFT", "SQYD", "ACRE"]);

/**
 * Shared create/update schema. `id` is added only on the update variant.
 * Numeric fields arrive from `<input type="number">` as strings, so we
 * coerce them — this schema is used both client-side (RHF resolver) and
 * server-side (Server Action re-validation), which must both accept the
 * same FormData-shaped input.
 */
export const propertyFormSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(200),
  description: z.string().trim().min(20, "Description must be at least 20 characters"),

  category: propertyCategoryEnum,
  propertyType: propertyTypeEnum,
  listingType: listingTypeEnum,
  status: propertyStatusEnum.default("AVAILABLE"),

  price: z.coerce.number().positive("Price must be greater than 0"),
  priceLabel: z.string().trim().max(50).optional().or(z.literal("")),

  location: z.string().trim().min(2, "Location is required"),
  city: z.string().trim().min(2, "City is required"),
  state: z.string().trim().min(2, "State is required"),
  pincode: z.string().trim().max(10).optional().or(z.literal("")),
  address: z.string().trim().max(300).optional().or(z.literal("")),
  latitude: z.coerce.number().min(-90).max(90).optional(),
  longitude: z.coerce.number().min(-180).max(180).optional(),

  bedrooms: z.coerce.number().int().min(0).max(50).optional(),
  bathrooms: z.coerce.number().int().min(0).max(50).optional(),
  balconies: z.coerce.number().int().min(0).max(20).optional(),
  area: z.coerce.number().positive().optional(),
  areaUnit: areaUnitEnum.optional(),
  yearBuilt: z.coerce
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 5)
    .optional(),
  furnishing: furnishingEnum.optional(),
  parking: z.coerce.boolean().default(false),
  amenities: z.array(z.string().trim().min(1)).default([]),

  featured: z.coerce.boolean().default(false),
});

export type PropertyFormValues = z.infer<typeof propertyFormSchema>;

export const propertyUpdateSchema = propertyFormSchema.extend({
  id: z.string().cuid(),
});

export type PropertyUpdateValues = z.infer<typeof propertyUpdateSchema>;
