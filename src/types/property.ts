import type {
  AreaUnit,
  Furnishing,
  ListingType,
  Property,
  PropertyCategory,
  PropertyImage,
  PropertyStatus,
  PropertyType,
} from "@prisma/client";

export type { AreaUnit, Furnishing, ListingType, PropertyCategory, PropertyStatus, PropertyType };

export type PropertyWithImages = Property & {
  images: PropertyImage[];
};

export type PropertyCardData = Pick<
  Property,
  | "id"
  | "title"
  | "slug"
  | "price"
  | "priceLabel"
  | "location"
  | "city"
  | "propertyType"
  | "listingType"
  | "status"
  | "bedrooms"
  | "bathrooms"
  | "area"
  | "areaUnit"
  | "featured"
> & {
  images: Pick<PropertyImage, "url" | "altText">[];
};

/** Query params accepted by /real-estate and by `getProperties()`. */
export interface PropertyFilterParams {
  listingType?: ListingType;
  category?: PropertyCategory;
  propertyType?: PropertyType;
  city?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minArea?: number;
  featured?: boolean;
  status?: PropertyStatus;
  sort?: "newest" | "price-asc" | "price-desc";
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
