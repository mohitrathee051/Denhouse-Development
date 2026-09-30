import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import type { PGFilterParams, PGRoomWithImages } from "@/types/pg";
import type { PaginatedResult } from "@/types/property";

const DEFAULT_PAGE_SIZE = 9;

function buildWhere(filters: PGFilterParams): Prisma.PGRoomWhereInput {
  const where: Prisma.PGRoomWhereInput = {};

  if (filters.city) where.city = { equals: filters.city, mode: "insensitive" };
  if (filters.location) {
    where.OR = [
      { location: { contains: filters.location, mode: "insensitive" } },
      { city: { contains: filters.location, mode: "insensitive" } },
    ];
  }
  if (filters.gender) where.gender = filters.gender;
  if (filters.roomType) where.roomType = filters.roomType;
  if (filters.availability) where.availability = filters.availability;
  if (filters.featured !== undefined) where.featured = filters.featured;
  if (filters.ac !== undefined) where.ac = filters.ac;
  if (filters.wifi !== undefined) where.wifi = filters.wifi;
  if (filters.food !== undefined) where.food = filters.food;
  if (filters.maxRent !== undefined) where.monthlyRent = { lte: filters.maxRent };

  return where;
}

export async function getPGRooms(
  filters: PGFilterParams = {},
): Promise<PaginatedResult<PGRoomWithImages>> {
  const page = Math.max(filters.page ?? 1, 1);
  const pageSize = filters.pageSize ?? DEFAULT_PAGE_SIZE;
  const where = buildWhere(filters);

  const [items, total] = await Promise.all([
    prisma.pGRoom.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { images: { orderBy: { sortOrder: "asc" } } },
    }),
    prisma.pGRoom.count({ where }),
  ]);

  return {
    items,
    total,
    page,
    pageSize,
    totalPages: Math.max(Math.ceil(total / pageSize), 1),
  };
}

export async function getFeaturedPGRooms(limit = 3): Promise<PGRoomWithImages[]> {
  return prisma.pGRoom.findMany({
    where: { featured: true, availability: "AVAILABLE" },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function getPGRoomBySlug(slug: string): Promise<PGRoomWithImages | null> {
  return prisma.pGRoom.findUnique({
    where: { slug },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function isPGSlugTaken(slug: string, excludeId?: string): Promise<boolean> {
  const existing = await prisma.pGRoom.findUnique({ where: { slug } });
  if (!existing) return false;
  return existing.id !== excludeId;
}

export async function getAllPGRoomsForAdmin() {
  return prisma.pGRoom.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: { orderBy: { sortOrder: "asc" }, take: 1 } },
  });
}

export async function getPGRoomById(id: string): Promise<PGRoomWithImages | null> {
  return prisma.pGRoom.findUnique({
    where: { id },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
}
