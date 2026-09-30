const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/**
 * Formats a price for display. Accepts number, string, or Prisma's Decimal
 * (which stringifies safely via `.toString()` / `Number()`).
 */
export function formatPrice(value: number | string, priceLabel?: string | null): string {
  const numeric = typeof value === "string" ? Number(value) : value;
  const formatted = inrFormatter.format(numeric);
  return priceLabel ? `${formatted} ${priceLabel}` : formatted;
}

export function formatArea(area?: number | null, unit?: string | null): string | null {
  if (area === null || area === undefined) return null;
  const unitLabel: Record<string, string> = {
    SQFT: "sq ft",
    SQYD: "sq yd",
    ACRE: "acre",
  };
  const label = unit ? unitLabel[unit] ?? unit.toLowerCase() : "sq ft";
  return `${new Intl.NumberFormat("en-IN").format(area)} ${label}`;
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

/** Human-readable label from a SCREAMING_SNAKE_CASE enum value. */
export function humanizeEnum(value: string): string {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
