import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, humanizeEnum } from "@/lib/utils/formatting";
import type { PGRoomWithImages } from "@/types/pg";
import { MapPin } from "lucide-react";

const AMENITIES: { key: "ac" | "wifi" | "food" | "laundry" | "parking" | "housekeeping"; label: string }[] = [
  { key: "ac", label: "Air Conditioning" },
  { key: "wifi", label: "WiFi" },
  { key: "food", label: "Food Included" },
  { key: "laundry", label: "Laundry" },
  { key: "parking", label: "Parking" },
  { key: "housekeeping", label: "Housekeeping" },
];

export function PGDetails({ room }: { room: PGRoomWithImages }) {
  return (
    <div className="space-y-8">
      <header>
        <div className="mb-3 flex flex-wrap gap-2">
          {room.featured && <Badge tone="gold">Featured</Badge>}
          <Badge tone={room.availability === "AVAILABLE" ? "success" : room.availability === "FULL" ? "danger" : "navy"}>
            {humanizeEnum(room.availability)}
          </Badge>
          <Badge tone="neutral">{humanizeEnum(room.roomType)}</Badge>
          <Badge tone="neutral">{humanizeEnum(room.gender)}</Badge>
        </div>
        <h1 className="font-heading text-3xl font-semibold text-ink sm:text-4xl">{room.name}</h1>
        <p className="mt-2 flex items-center gap-1.5 text-muted">
          <MapPin className="h-4 w-4 text-gold-600" aria-hidden />
          {room.location}, {room.city}
        </p>
        <p className="mt-4 font-heading text-3xl font-bold text-navy">
          {formatPrice(room.monthlyRent.toString(), "/month")}
        </p>
        {room.securityDeposit !== null && (
          <p className="mt-1 text-sm text-muted">
            Security deposit: {formatPrice(room.securityDeposit.toString())}
          </p>
        )}
      </header>

      <section aria-labelledby="pg-amenities">
        <h2 id="pg-amenities" className="mb-4 font-heading text-xl font-semibold text-ink">Amenities</h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {AMENITIES.map(({ key, label }) => (
            <li key={key} className="flex items-center gap-2 text-sm text-ink">
              {room[key] ? (
                <Check className="h-4 w-4 text-gold-600" aria-hidden />
              ) : (
                <X className="h-4 w-4 text-muted" aria-hidden />
              )}
              <span className={room[key] ? "" : "text-muted"}>
                {label}
                <span className="sr-only">{room[key] ? " (included)" : " (not included)"}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="pg-description">
        <h2 id="pg-description" className="mb-4 font-heading text-xl font-semibold text-ink">About this room</h2>
        <p className="whitespace-pre-line leading-relaxed text-ink/80">{room.description}</p>
      </section>
    </div>
  );
}
