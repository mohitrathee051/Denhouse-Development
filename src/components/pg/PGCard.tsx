import Image from "next/image";
import Link from "next/link";
import { MapPin, Snowflake, Utensils, Wifi } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, humanizeEnum } from "@/lib/utils/formatting";
import type { PGRoomWithImages } from "@/types/pg";

const availabilityTone = { AVAILABLE: "success", FULL: "danger", COMING_SOON: "navy" } as const;

export function PGCard({ room }: { room: PGRoomWithImages }) {
  const mainImage = room.images.find((img) => img.isMain) ?? room.images[0];

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-card-hover">
      <Link href={`/pg/${room.slug}`} className="block">
        <div className="relative h-48 w-full overflow-hidden bg-navy-50">
          {mainImage ? (
            <Image
              src={mainImage.url}
              alt={mainImage.altText ?? room.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted">No image available</div>
          )}
          <div className="absolute left-3 top-3 flex gap-2">
            {room.featured && <Badge tone="gold">Featured</Badge>}
            <Badge tone={availabilityTone[room.availability]}>{humanizeEnum(room.availability)}</Badge>
          </div>
        </div>
        <div className="space-y-2.5 p-5">
          <h3 className="font-heading text-lg font-semibold leading-snug text-ink">{room.name}</h3>
          <p className="flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="h-4 w-4 shrink-0 text-gold-600" aria-hidden />
            {room.location}, {room.city}
          </p>
          <p className="font-heading text-lg font-bold text-navy">
            {formatPrice(room.monthlyRent.toString(), "/month")}
          </p>
          <div className="flex flex-wrap items-center gap-2 border-t border-navy-100 pt-3 text-xs text-muted">
            <Badge tone="neutral">{humanizeEnum(room.roomType)}</Badge>
            <Badge tone="neutral">{humanizeEnum(room.gender)}</Badge>
            {room.ac && <span className="flex items-center gap-1"><Snowflake className="h-3.5 w-3.5" aria-hidden /> AC</span>}
            {room.wifi && <span className="flex items-center gap-1"><Wifi className="h-3.5 w-3.5" aria-hidden /> WiFi</span>}
            {room.food && <span className="flex items-center gap-1"><Utensils className="h-3.5 w-3.5" aria-hidden /> Food</span>}
          </div>
        </div>
      </Link>
    </Card>
  );
}
