import { prisma } from "@/lib/prisma";

export async function getAllInquiries() {
  return prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      property: { select: { title: true, slug: true } },
      pgRoom: { select: { name: true, slug: true } },
    },
  });
}

export async function getInquiryById(id: string) {
  return prisma.inquiry.findUnique({
    where: { id },
    include: {
      property: { select: { title: true, slug: true } },
      pgRoom: { select: { name: true, slug: true } },
    },
  });
}
