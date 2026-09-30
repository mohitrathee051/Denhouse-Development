import { prisma } from "@/lib/prisma";

export interface DashboardStats {
  totalProperties: number;
  availableProperties: number;
  soldProperties: number;
  totalPGRooms: number;
  availablePGRooms: number;
  featuredProperties: number;
  newInquiries: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [
    totalProperties,
    availableProperties,
    soldProperties,
    totalPGRooms,
    availablePGRooms,
    featuredProperties,
    newInquiries,
  ] = await Promise.all([
    prisma.property.count(),
    prisma.property.count({ where: { status: "AVAILABLE" } }),
    prisma.property.count({ where: { status: "SOLD" } }),
    prisma.pGRoom.count(),
    prisma.pGRoom.count({ where: { availability: "AVAILABLE" } }),
    prisma.property.count({ where: { featured: true } }),
    prisma.inquiry.count({ where: { status: "NEW" } }),
  ]);

  return {
    totalProperties,
    availableProperties,
    soldProperties,
    totalPGRooms,
    availablePGRooms,
    featuredProperties,
    newInquiries,
  };
}

export async function getRecentProperties(limit = 5) {
  return prisma.property.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { images: { take: 1, orderBy: { sortOrder: "asc" } } },
  });
}

export async function getRecentPGRooms(limit = 5) {
  return prisma.pGRoom.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { images: { take: 1, orderBy: { sortOrder: "asc" } } },
  });
}
