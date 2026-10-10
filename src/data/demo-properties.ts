/**
 * SAMPLE / DEMO DATA — NOT REAL DEN HOUSE GROUP LISTINGS.
 *
 * This file exists purely so the site has realistic-looking content during
 * development and design review. It is consumed by `prisma/seed.ts` to
 * populate the database. Replace or remove entirely once real listings are
 * entered through the admin panel.
 *
 * Images are placeholder photography from Lorem Picsum (picsum.photos), a
 * public placeholder-image service — not real Den House Group photography.
 */

export interface DemoPropertyImage {
  url: string;
  altText: string;
  isMain?: boolean;
}

export interface DemoProperty {
  title: string;
  description: string;
  price: number;
  priceLabel?: string;
  category: "RESIDENTIAL" | "COMMERCIAL" | "LAND";
  propertyType:
    | "APARTMENT"
    | "FLAT"
    | "VILLA"
    | "INDEPENDENT_HOUSE"
    | "BUILDER_FLOOR"
    | "STUDIO"
    | "OFFICE"
    | "SHOP"
    | "SHOWROOM"
    | "WAREHOUSE"
    | "COMMERCIAL_BUILDING"
    | "RESIDENTIAL_PLOT"
    | "COMMERCIAL_PLOT"
    | "AGRICULTURAL_LAND";
  listingType: "SALE" | "RENT";
  status: "AVAILABLE" | "SOLD" | "RENTED" | "UNDER_OFFER" | "COMING_SOON";
  location: string;
  city: string;
  state: string;
  pincode?: string;
  address?: string;
  bedrooms?: number;
  bathrooms?: number;
  balconies?: number;
  area?: number;
  areaUnit?: "SQFT" | "SQYD" | "ACRE";
  yearBuilt?: number;
  furnishing?: "UNFURNISHED" | "SEMI_FURNISHED" | "FULLY_FURNISHED";
  parking?: boolean;
  amenities?: string[];
  featured?: boolean;
  images: DemoPropertyImage[];
}

export const demoProperties: DemoProperty[] = [
  {
    title: "3 BHK Independent House",
    description:
      "A spacious, sample 3 BHK independent house with a private lawn and covered parking. Demo listing used to illustrate the property detail layout — replace with real Den House Group inventory.",
    price: 8_500_000,
    category: "RESIDENTIAL",
    propertyType: "INDEPENDENT_HOUSE",
    listingType: "SALE",
    status: "AVAILABLE",
    location: "Model Town",
    city: "Karnal",
    state: "Haryana",
    pincode: "132001",
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    area: 2200,
    areaUnit: "SQFT",
    yearBuilt: 2019,
    furnishing: "SEMI_FURNISHED",
    parking: true,
    amenities: ["Private Lawn", "Covered Parking", "24x7 Water Supply", "Power Backup"],
    featured: true,
    images: [
      { url: "https://picsum.photos/seed/denhouse-prop-1a/1200/800", altText: "Front exterior of the independent house", isMain: true },
      { url: "https://picsum.photos/seed/denhouse-prop-1b/1200/800", altText: "Living room" },
      { url: "https://picsum.photos/seed/denhouse-prop-1c/1200/800", altText: "Kitchen" },
    ],
  },
  {
    title: "2 BHK Apartment, Sector 7",
    description:
      "Sample second-floor apartment in a gated society, close to schools and markets. Demo content for design/testing purposes only.",
    price: 4_200_000,
    category: "RESIDENTIAL",
    propertyType: "APARTMENT",
    listingType: "SALE",
    status: "AVAILABLE",
    location: "Sector 7",
    city: "Karnal",
    state: "Haryana",
    bedrooms: 2,
    bathrooms: 2,
    balconies: 1,
    area: 1150,
    areaUnit: "SQFT",
    yearBuilt: 2021,
    furnishing: "UNFURNISHED",
    parking: true,
    amenities: ["Gated Society", "Lift", "Children's Play Area", "24x7 Security"],
    featured: true,
    images: [
      { url: "https://picsum.photos/seed/denhouse-prop-2a/1200/800", altText: "Apartment building exterior", isMain: true },
      { url: "https://picsum.photos/seed/denhouse-prop-2b/1200/800", altText: "Bedroom" },
    ],
  },
  {
    title: "Premium Villa with Garden",
    description:
      "A sample premium villa with a landscaped garden and a modular kitchen, intended to showcase the top end of the catalog. Not an actual Den House Group listing.",
    price: 21_000_000,
    category: "RESIDENTIAL",
    propertyType: "VILLA",
    listingType: "SALE",
    status: "AVAILABLE",
    location: "Urban Estate",
    city: "Karnal",
    state: "Haryana",
    bedrooms: 4,
    bathrooms: 4,
    balconies: 3,
    area: 3800,
    areaUnit: "SQFT",
    yearBuilt: 2022,
    furnishing: "FULLY_FURNISHED",
    parking: true,
    amenities: ["Landscaped Garden", "Modular Kitchen", "Home Theatre Room", "Servant Quarter"],
    featured: true,
    images: [
      { url: "https://picsum.photos/seed/denhouse-prop-3a/1200/800", altText: "Villa exterior with garden", isMain: true },
      { url: "https://picsum.photos/seed/denhouse-prop-3b/1200/800", altText: "Living area" },
      { url: "https://picsum.photos/seed/denhouse-prop-3c/1200/800", altText: "Master bedroom" },
    ],
  },
  {
    title: "2 BHK Flat for Rent",
    description:
      "Sample semi-furnished flat available for rent, ideal for a small family. Demo data for the rental listing flow.",
    price: 15_000,
    priceLabel: "/month",
    category: "RESIDENTIAL",
    propertyType: "FLAT",
    listingType: "RENT",
    status: "AVAILABLE",
    location: "Kunjpura Road",
    city: "Karnal",
    state: "Haryana",
    bedrooms: 2,
    bathrooms: 2,
    area: 950,
    areaUnit: "SQFT",
    furnishing: "SEMI_FURNISHED",
    parking: true,
    amenities: ["Balcony", "Modular Kitchen"],
    images: [
      { url: "https://picsum.photos/seed/denhouse-prop-4a/1200/800", altText: "Flat exterior", isMain: true },
      { url: "https://picsum.photos/seed/denhouse-prop-4b/1200/800", altText: "Dining area" },
    ],
  },
  {
    title: "Commercial Office Space",
    description:
      "Sample ready-to-move office space on the main road, suited for a small business or startup. Illustrative only.",
    price: 6_500_000,
    category: "COMMERCIAL",
    propertyType: "OFFICE",
    listingType: "SALE",
    status: "AVAILABLE",
    location: "GT Road",
    city: "Karnal",
    state: "Haryana",
    area: 1800,
    areaUnit: "SQFT",
    furnishing: "SEMI_FURNISHED",
    parking: true,
    amenities: ["Main Road Frontage", "Parking", "Pantry Area"],
    featured: true,
    images: [
      { url: "https://picsum.photos/seed/denhouse-prop-5a/1200/800", altText: "Office building exterior", isMain: true },
      { url: "https://picsum.photos/seed/denhouse-prop-5b/1200/800", altText: "Open office floor" },
    ],
  },
  {
    title: "Retail Shop, Main Market",
    description:
      "Sample ground-floor shop in a busy market area, suitable for retail. Demo listing.",
    price: 35_000,
    priceLabel: "/month",
    category: "COMMERCIAL",
    propertyType: "SHOP",
    listingType: "RENT",
    status: "AVAILABLE",
    location: "Main Market",
    city: "Karnal",
    state: "Haryana",
    area: 400,
    areaUnit: "SQFT",
    parking: false,
    amenities: ["High Footfall Area", "Shutter Front"],
    images: [
      { url: "https://picsum.photos/seed/denhouse-prop-6a/1200/800", altText: "Shopfront", isMain: true },
    ],
  },
  {
    title: "Residential Plot, Sector 32",
    description:
      "Sample corner residential plot in a developing sector, clear title assumed for demo purposes. Not a verified real listing.",
    price: 5_800_000,
    category: "LAND",
    propertyType: "RESIDENTIAL_PLOT",
    listingType: "SALE",
    status: "AVAILABLE",
    location: "Sector 32",
    city: "Karnal",
    state: "Haryana",
    area: 200,
    areaUnit: "SQYD",
    amenities: ["Corner Plot", "Wide Road Access"],
    images: [
      { url: "https://picsum.photos/seed/denhouse-prop-7a/1200/800", altText: "Vacant residential plot", isMain: true },
    ],
  },
  {
    title: "Builder Floor, Model Town",
    description:
      "Sample independent first-floor builder unit with private staircase access. Demo/sample listing content.",
    price: 5_200_000,
    category: "RESIDENTIAL",
    propertyType: "BUILDER_FLOOR",
    listingType: "SALE",
    status: "UNDER_OFFER",
    location: "Model Town",
    city: "Karnal",
    state: "Haryana",
    bedrooms: 3,
    bathrooms: 2,
    balconies: 1,
    area: 1400,
    areaUnit: "SQFT",
    yearBuilt: 2020,
    furnishing: "UNFURNISHED",
    parking: true,
    amenities: ["Private Entrance", "Terrace Access"],
    images: [
      { url: "https://picsum.photos/seed/denhouse-prop-8a/1200/800", altText: "Builder floor exterior", isMain: true },
      { url: "https://picsum.photos/seed/denhouse-prop-8b/1200/800", altText: "Hall" },
    ],
  },
];
