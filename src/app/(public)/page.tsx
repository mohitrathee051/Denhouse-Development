import type { Metadata } from "next";
import { Suspense } from "react";
import { CTASection } from "@/components/home/CTASection";
import { FeaturedPG } from "@/components/home/FeaturedPG";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { Hero } from "@/components/home/Hero";
import { ServiceSection } from "@/components/home/ServiceSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { PropertyCardSkeleton } from "@/components/ui/Skeleton";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export const dynamic = "force-dynamic";

function SectionFallback() {
  return (
    <div className="container-page grid gap-6 py-16 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
      {Array.from({ length: 3 }, (_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.name,
    url: siteConfig.url,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <ServiceSection />
      <Suspense fallback={<SectionFallback />}>
        <FeaturedProperties />
      </Suspense>
      <WhyChooseUs />
      <Suspense fallback={<SectionFallback />}>
        <FeaturedPG />
      </Suspense>
      <CTASection />
    </>
  );
}
