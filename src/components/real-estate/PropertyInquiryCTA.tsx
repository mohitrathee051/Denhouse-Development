import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { siteConfig, telHref, whatsappHref } from "@/lib/site-config";

interface PropertyInquiryCTAProps {
  title: string;
  slug: string;
  listingType: "SALE" | "RENT";
}

/**
 * Sticky on desktop, part of normal flow on mobile (the sticky wrapper only
 * applies at `lg`). Phone / WhatsApp buttons render only when real numbers are
 * configured via environment variables.
 */
export function PropertyInquiryCTA({ title, slug, listingType }: PropertyInquiryCTAProps) {
  const service = listingType === "SALE" ? "BUY_PROPERTY" : "RENT_PROPERTY";
  const enquiryHref = `/contact?service=${service}&property=${encodeURIComponent(slug)}`;

  return (
    <aside className="lg:sticky lg:top-24" aria-label="Enquire about this property">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="font-heading text-lg font-semibold text-ink">Interested in this property?</h2>
          <p className="text-sm text-muted">
            Send us an enquiry and the Den House team will get back to you about “{title}”.
          </p>
          <Button href={enquiryHref} className="w-full" size="lg">
            Enquire About This Property
          </Button>
          <Button href={`${enquiryHref}&visit=1`} variant="outline" className="w-full">
            Schedule a Visit
          </Button>
          {siteConfig.phone && (
            <Button href={telHref(siteConfig.phone)} variant="ghost" className="w-full">
              <Phone className="h-4 w-4" aria-hidden /> Call Us
            </Button>
          )}
          {siteConfig.whatsapp && (
            <Button
              href={whatsappHref(siteConfig.whatsapp, `Hi, I'm interested in "${title}".`)}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              className="w-full"
            >
              <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
            </Button>
          )}
        </CardContent>
      </Card>
    </aside>
  );
}
