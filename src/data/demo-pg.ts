/**
 * SAMPLE / DEMO DATA — NOT REAL DENHOUSE GROUP PG LISTINGS.
 * See the note in `demo-properties.ts`; the same rules apply here.
 */

export interface DemoPGImage {
  url: string;
  altText: string;
  isMain?: boolean;
}

export interface DemoPG {
  name: string;
  description: string;
  location: string;
  city: string;
  monthlyRent: number;
  securityDeposit?: number;
  roomType: "SINGLE" | "DOUBLE_SHARING" | "TRIPLE_SHARING" | "OTHER";
  gender: "MALE" | "FEMALE" | "UNISEX";
  ac?: boolean;
  wifi?: boolean;
  food?: boolean;
  laundry?: boolean;
  parking?: boolean;
  housekeeping?: boolean;
  availability?: "AVAILABLE" | "FULL" | "COMING_SOON";
  featured?: boolean;
  images: DemoPGImage[];
}

export const demoPGRooms: DemoPG[] = [
  {
    name: "Premium Single Room, Near Bus Stand",
    description:
      "Sample single-occupancy PG room with AC and daily housekeeping, close to the main bus stand. Demo content only.",
    location: "Near Bus Stand",
    city: "Karnal",
    monthlyRent: 9500,
    securityDeposit: 10000,
    roomType: "SINGLE",
    gender: "MALE",
    ac: true,
    wifi: true,
    food: true,
    laundry: true,
    parking: true,
    housekeeping: true,
    availability: "AVAILABLE",
    featured: true,
    images: [
      { url: "https://picsum.photos/seed/denhouse-pg-1a/1200/800", altText: "Single PG room interior", isMain: true },
      { url: "https://picsum.photos/seed/denhouse-pg-1b/1200/800", altText: "Common dining area" },
    ],
  },
  {
    name: "Double Sharing PG, Sector 13",
    description:
      "Sample double-sharing PG accommodation for working women with meals included. Demo/sample listing.",
    location: "Sector 13",
    city: "Karnal",
    monthlyRent: 7000,
    securityDeposit: 7000,
    roomType: "DOUBLE_SHARING",
    gender: "FEMALE",
    ac: false,
    wifi: true,
    food: true,
    laundry: true,
    parking: false,
    housekeeping: true,
    availability: "AVAILABLE",
    featured: true,
    images: [
      { url: "https://picsum.photos/seed/denhouse-pg-2a/1200/800", altText: "Double sharing PG room", isMain: true },
    ],
  },
  {
    name: "Unisex Co-living PG, City Centre",
    description:
      "Sample unisex PG in a co-living format with shared common areas and WiFi. Illustrative demo data.",
    location: "City Centre",
    city: "Karnal",
    monthlyRent: 8500,
    securityDeposit: 8500,
    roomType: "TRIPLE_SHARING",
    gender: "UNISEX",
    ac: true,
    wifi: true,
    food: false,
    laundry: false,
    parking: true,
    housekeeping: true,
    availability: "AVAILABLE",
    images: [
      { url: "https://picsum.photos/seed/denhouse-pg-3a/1200/800", altText: "Co-living common area", isMain: true },
      { url: "https://picsum.photos/seed/denhouse-pg-3b/1200/800", altText: "Triple sharing room" },
    ],
  },
  {
    name: "Budget Single Room PG",
    description: "Sample no-frills single room PG, budget-friendly, near the railway station. Demo data.",
    location: "Near Railway Station",
    city: "Karnal",
    monthlyRent: 5500,
    roomType: "SINGLE",
    gender: "MALE",
    ac: false,
    wifi: false,
    food: false,
    laundry: false,
    parking: false,
    housekeeping: false,
    availability: "FULL",
    images: [
      { url: "https://picsum.photos/seed/denhouse-pg-4a/1200/800", altText: "Budget PG room", isMain: true },
    ],
  },
];
