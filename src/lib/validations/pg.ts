import { z } from "zod";

export const pgGenderEnum = z.enum(["MALE", "FEMALE", "UNISEX"]);
export const pgRoomTypeEnum = z.enum(["SINGLE", "DOUBLE_SHARING", "TRIPLE_SHARING", "OTHER"]);
export const availabilityEnum = z.enum(["AVAILABLE", "FULL", "COMING_SOON"]);

export const pgFormSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters").max(200),
  description: z.string().trim().min(20, "Description must be at least 20 characters"),

  location: z.string().trim().min(2, "Location is required"),
  city: z.string().trim().min(2, "City is required"),

  monthlyRent: z.coerce.number().positive("Monthly rent must be greater than 0"),
  securityDeposit: z.coerce.number().min(0).optional(),

  roomType: pgRoomTypeEnum,
  gender: pgGenderEnum,

  ac: z.coerce.boolean().default(false),
  wifi: z.coerce.boolean().default(false),
  food: z.coerce.boolean().default(false),
  laundry: z.coerce.boolean().default(false),
  parking: z.coerce.boolean().default(false),
  housekeeping: z.coerce.boolean().default(false),

  availability: availabilityEnum.default("AVAILABLE"),
  featured: z.coerce.boolean().default(false),
});

export type PGFormValues = z.infer<typeof pgFormSchema>;

export const pgUpdateSchema = pgFormSchema.extend({
  id: z.string().cuid(),
});

export type PGUpdateValues = z.infer<typeof pgUpdateSchema>;
