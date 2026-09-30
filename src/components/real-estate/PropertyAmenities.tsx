import { Check } from "lucide-react";

export function PropertyAmenities({ amenities }: { amenities: string[] }) {
  if (amenities.length === 0) return null;

  return (
    <section aria-labelledby="amenities-heading">
      <h2 id="amenities-heading" className="mb-4 font-heading text-xl font-semibold text-ink">
        Amenities
      </h2>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {amenities.map((amenity) => (
          <li key={amenity} className="flex items-center gap-2 text-sm text-ink">
            <Check className="h-4 w-4 shrink-0 text-gold-600" aria-hidden />
            {amenity}
          </li>
        ))}
      </ul>
    </section>
  );
}
