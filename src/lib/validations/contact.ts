import { z } from "zod";

export const inquiryServiceEnum = z.enum([
  "BUY_PROPERTY",
  "SELL_PROPERTY",
  "RENT_PROPERTY",
  "PG_INQUIRY",
  "GENERAL_INQUIRY",
]);

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,15}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  subject: z.string().trim().max(150).optional().or(z.literal("")),
  service: inquiryServiceEnum,
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const serviceOptions: { value: z.infer<typeof inquiryServiceEnum>; label: string }[] = [
  { value: "BUY_PROPERTY", label: "Buy a Property" },
  { value: "SELL_PROPERTY", label: "Sell a Property" },
  { value: "RENT_PROPERTY", label: "Rent a Property" },
  { value: "PG_INQUIRY", label: "PG Inquiry" },
  { value: "GENERAL_INQUIRY", label: "General Inquiry" },
];
