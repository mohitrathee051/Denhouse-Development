import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyGallery } from "@/components/real-estate/PropertyGallery";
import {
  PropertyDescription,
  PropertyHeader,
  PropertyLocation,
  PropertySpecifications,
} from "@/components/real-estate/PropertyDetails";
import { PropertyAmenities } from "@/components/real-estate/PropertyAmenities";
import { PropertyInquiryCTA } from "@/components/real-estate/PropertyInquiryCTA";
import { RelatedProperties } from "@/components/real-estate/RelatedProperties";
import { getPropertyBySlug, getRelatedProperties } from "@/lib/data/properties";
import { formatPrice } from "@/lib/utils/formatting";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return { title: "Property not found" };

  const price = formatPrice(property.price.toString(), property.priceLabel);
  const description = `${property.title} in ${property.location}, ${property.city} — ${price}. ${property.description.slice(0, 120)}`;
  const image = property.images[0]?.url;

  return {
    title: `${property.title} in ${property.city}`,
    description,
    alternates: { canonical: `/real-estate/${property.slug}` },
    openGraph: {
      title: property.title,
      description,
      type: "website",
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: property.title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function PropertyDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const related = await getRelatedProperties(property);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `${siteConfig.url}/real-estate/${property.slug}`,
    image: property.images.map((image) => image.url),
    offers: {
      "@type": "Offer",
      price: property.price.toString(),
      priceCurrency: "INR",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: property.city,
      addressRegion: property.state,
      postalCode: property.pincode ?? undefined,
      addressCountry: "IN",
    },
  };

  return (
    <div className="container-page py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <PropertyGallery images={property.images} title={property.title} />
          <PropertyHeader property={property} />
          <PropertySpecifications property={property} />
          <PropertyDescription description={property.description} />
          <PropertyAmenities amenities={property.amenities} />
          <PropertyLocation property={property} />
        </div>
        <div>
          <PropertyInquiryCTA
            title={property.title}
            slug={property.slug}
            listingType={property.listingType}
          />
        </div>
      </div>
      <RelatedProperties properties={related} />
    </div>
  );
}
