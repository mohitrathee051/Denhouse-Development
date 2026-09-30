import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

const STATIC_ROUTES = ["", "/about", "/real-estate", "/pg", "/gallery", "/contact", "/privacy", "/terms"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));

  try {
    const [properties, rooms] = await Promise.all([
      prisma.property.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.pGRoom.findMany({ select: { slug: true, updatedAt: true } }),
    ]);
    return [
      ...staticEntries,
      ...properties.map((p) => ({ url: `${base}/real-estate/${p.slug}`, lastModified: p.updatedAt })),
      ...rooms.map((r) => ({ url: `${base}/pg/${r.slug}`, lastModified: r.updatedAt })),
    ];
  } catch (error) {
    console.error("Sitemap: database unavailable, returning static routes only.", error);
    return staticEntries;
  }
}
