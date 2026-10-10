/**
 * Central place for business contact details. All values come from optional
 * environment variables so NOTHING is invented — when unset, the UI hides the
 * call / WhatsApp actions and falls back to the contact form.
 */
export const siteConfig = {
  name: "Den House Group",
  legalName: "DEN HOUSE GROUP PRIVATE LIMITED",
  tagline: "BUILDING TRUST · CREATING FUTURE",
  type: "Real Estate",
  established: "2026",
  address: "Sec. 33, Islampur, Near J.M.D. Garden, Gurugram, Haryana – 122001, India",
  city: "Gurugram, Haryana – 122001, India",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+91 80767 99469",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918076799469",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "denhousegroup@gmail.com",
  cin: "U68200HR2026PTC145992",
  languages: ["Hindi", "English"],
} as const;

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export function whatsappHref(number: string, message?: string): string {
  const digits = number.replace(/\D/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}
