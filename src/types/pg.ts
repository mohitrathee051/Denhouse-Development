import type { Availability, PGGender, PGImage, PGRoom, PGRoomType } from "@prisma/client";

export type { Availability, PGGender, PGRoomType };

export type PGRoomWithImages = PGRoom & {
  images: PGImage[];
};

export type PGCardData = Pick<
  PGRoom,
  | "id"
  | "name"
  | "slug"
  | "location"
  | "city"
  | "monthlyRent"
  | "roomType"
  | "gender"
  | "ac"
  | "wifi"
  | "food"
  | "availability"
  | "featured"
> & {
  images: Pick<PGImage, "url" | "altText">[];
};

export interface PGFilterParams {
  city?: string;
  location?: string;
  gender?: PGGender;
  roomType?: PGRoomType;
  maxRent?: number;
  ac?: boolean;
  wifi?: boolean;
  food?: boolean;
  availability?: Availability;
  featured?: boolean;
  page?: number;
  pageSize?: number;
}
