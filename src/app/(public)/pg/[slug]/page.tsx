import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PGDetails } from "@/components/pg/PGDetails";
import { PGGallery } from "@/components/pg/PGGallery";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { getPGRoomBySlug } from "@/lib/data/pg";
import { formatPrice } from "@/lib/utils/formatting";
import { siteConfig, telHref } from "@/lib/site-config";
import { Phone } from "lucide-react";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const room = await getPGRoomBySlug(slug);
  if (!room) return { title: "PG room not found" };

  const description = `${room.name} in ${room.location}, ${room.city} — ${formatPrice(room.monthlyRent.toString(), "/month")}. ${room.description.slice(0, 120)}`;
  const image = room.images[0]?.url;

  return {
    title: `${room.name} — PG in ${room.city}`,
    description,
    alternates: { canonical: `/pg/${room.slug}` },
    openGraph: { title: room.name, description, images: image ? [{ url: image }] : undefined },
    twitter: { card: "summary_large_image", title: room.name, description, images: image ? [image] : undefined },
  };
}

export default async function PGDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const room = await getPGRoomBySlug(slug);
  if (!room) notFound();

  const enquiryHref = `/contact?service=PG_INQUIRY&pg=${encodeURIComponent(room.slug)}`;

  return (
    <div className="container-page py-10">
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <PGGallery images={room.images} title={room.name} />
          <PGDetails room={room} />
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Enquire about this PG room">
          <Card>
            <CardContent className="space-y-4">
              <h2 className="font-heading text-lg font-semibold text-ink">Interested in this room?</h2>
              <Button href={enquiryHref} size="lg" className="w-full">
                Enquire Now
              </Button>
              {siteConfig.phone && (
                <Button href={telHref(siteConfig.phone)} variant="ghost" className="w-full">
                  <Phone className="h-4 w-4" aria-hidden /> Call Us
                </Button>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
