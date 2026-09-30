import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Denhouse Group | Real Estate & PG Accommodation",
    template: "%s | Denhouse Group",
  },
  description:
    "Denhouse Group helps you buy, sell, and rent residential and commercial properties, and offers quality PG (paying guest) accommodation.",
  openGraph: {
    type: "website",
    siteName: "Denhouse Group",
    title: "Denhouse Group | Real Estate & PG Accommodation",
    description:
      "Denhouse Group helps you buy, sell, and rent residential and commercial properties, and offers quality PG (paying guest) accommodation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Denhouse Group | Real Estate & PG Accommodation",
    description:
      "Denhouse Group helps you buy, sell, and rent residential and commercial properties, and offers quality PG (paying guest) accommodation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
