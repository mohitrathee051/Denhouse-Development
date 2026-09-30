import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import type { PaginatedResult, PropertyFilterParams, PropertyWithImages } from "@/types/property";

const DEFAULT_PAGE_SIZE = 9;

function buildWhere(filters: PropertyFilterParams): Prisma.PropertyWhereInput {
  const where: Prisma.PropertyWhereInput = {};

  if (filters.listingType) where.listingType = filters.listingType;
  if (filters.category) where.category = filters.category;
  if (filters.propertyType) where.propertyType = filters.propertyType;
  if (filters.status) where.status = filters.status;
  if (filters.featured !== undefined) where.featured = filters.featured;
  if (filters.city) where.city = { equals: filters.city, mode: "insensitive" };
  if (filters.location) {
    where.OR = [
      { location: { contains: filters.location, mode: "insensitive" } },
      { city: { contains: filters.location, mode: "insensitive" } },
    ];
  }
  if (filters.bedrooms !== undefined) where.bedrooms = { gte: filters.bedrooms };
  if (filters.bathrooms !== undefined) where.bathrooms = { gte: filters.bathrooms };
  if (filters.minArea !== undefined) where.area = { gte: filters.minArea };

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    where.price = {
      ...(filters.minPrice !== undefined ? { gte: filters.minPrice } : {}),
      ...(filters.maxPrice !== undefined ? { lte: filters.maxPrice } : {}),
    };
  }

  return where;
}

function buildOrderBy(sort?: PropertyFilterParams["sort"]): Prisma.PropertyOrderByWithRelationInput {
  switch (sort) {
    case "price-asc":
      return { price: "asc" };
    case "price-desc":
      return { price: "desc" };
    case "newest":
    default:
      return { createdAt: "desc" };
  }
}

export async function getProperties(
  filters: PropertyFilterParams = {},
): Promise<PaginatedResult<PropertyWithImages>> {
  const page = Math.max(filters.page ?? 1, 1);
  const pageSize = filters.pageSize ?? DEFAULT_PAGE_SIZE;
  const where = buildWhere(filters);
  const orderBy = buildOrderBy(filters.sort);

  const [items, total] = await Promise.all([
    prisma.property.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { images: { orderBy: { sortOrder: "asc" } } },
    }),
    prisma.property.count({ where }),
  ]);

  return {
    items,
    total,
    page,
    pageSize,
    totalPages: Math.max(Math.ceil(total / pageSize), 1),
  };
}

export async function getFeaturedProperties(limit = 6): Promise<PropertyWithImages[]> {
  return prisma.property.findMany({
    where: { featured: true, status: "AVAILABLE" },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function getPropertyBySlug(slug: string): Promise<PropertyWithImages | null> {
  return prisma.property.findUnique({
    where: { slug },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function getRelatedProperties(
  property: Pick<PropertyWithImages, "id" | "city" | "propertyType">,
  limit = 3,
): Promise<PropertyWithImages[]> {
  return prisma.property.findMany({
    where: {
      id: { not: property.id },
      OR: [{ city: property.city }, { propertyType: property.propertyType }],
    },
    take: limit,
    orderBy: { createdAt: "desc" },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function isPropertySlugTaken(slug: string, excludeId?: string): Promise<boolean> {
  const existing = await prisma.property.findUnique({ where: { slug } });
  if (!existing) return false;
  return existing.id !== excludeId;
}

export async function getAllPropertiesForAdmin() {
  return prisma.property.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: { orderBy: { sortOrder: "asc" }, take: 1 } },
  });
}

export async function getPropertyById(id: string): Promise<PropertyWithImages | null> {
  return prisma.property.findUnique({
    where: { id },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
}
