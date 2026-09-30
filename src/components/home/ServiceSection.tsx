import { Building2, Home, KeyRound, TrendingUp, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  cta: string;
  href: string;
}

const SERVICES: Service[] = [
  { icon: Home, title: "Buy a Property", description: "Find residential and commercial properties that fit your needs and budget.", cta: "Find Properties", href: "/real-estate?listingType=SALE" },
  { icon: Building2, title: "Sell a Property", description: "List your property with us and reach genuine buyers.", cta: "List Your Property", href: "/contact?service=SELL_PROPERTY" },
  { icon: KeyRound, title: "Rent a Property", description: "Discover homes and commercial spaces available for rent.", cta: "View Rentals", href: "/real-estate?listingType=RENT" },
  { icon: TrendingUp, title: "Property Investment", description: "Explore property opportunities with investment potential.", cta: "Enquire Now", href: "/contact?service=GENERAL_INQUIRY" },
];

export function ServiceSection() {
  return (
    <section className="bg-white py-20" aria-labelledby="services-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="What we do"
          title="Real Estate Services"
          description="Whether you're buying, selling, renting or investing, Denhouse Group is here to help."
        />
        <div id="services-heading" className="sr-only">Real estate services</div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, description, cta, href }) => (
            <Card key={title} className="flex flex-col">
              <CardContent className="flex flex-1 flex-col gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-navy text-gold">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="font-heading text-lg font-semibold text-ink">{title}</h3>
                <p className="flex-1 text-sm text-muted">{description}</p>
                <Button href={href} variant="outline" size="sm" className="self-start">{cta}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
