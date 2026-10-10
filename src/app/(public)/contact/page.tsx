import type { Metadata } from "next";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { inquiryServiceEnum } from "@/lib/validations/contact";
import { siteConfig, telHref, whatsappHref } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Den House Group about buying, selling, renting or PG accommodation.",
  alternates: { canonical: "/contact" },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ContactPage({ searchParams }: { searchParams: SearchParams }) {
  const raw = await searchParams;
  const serviceParam = typeof raw.service === "string" ? raw.service : undefined;
  const parsedService = inquiryServiceEnum.safeParse(serviceParam);
  const property = typeof raw.property === "string" ? raw.property : undefined;
  const pg = typeof raw.pg === "string" ? raw.pg : undefined;
  const visit = raw.visit === "1";

  const reference = property ?? pg;
  const subject = reference ? `${visit ? "Site visit request" : "Enquiry"}: ${reference}` : "";

  return (
    <div className="container-page py-12">
      <header className="mb-10 max-w-2xl">
        <h1 className="font-heading text-3xl font-semibold text-ink sm:text-4xl">Contact Den House</h1>
        <p className="mt-2 text-muted">
          Tell us what you&apos;re looking for and we&apos;ll get back to you.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6 sm:p-8">
              <ContactForm
                defaultService={parsedService.success ? parsedService.data : undefined}
                defaultSubject={subject}
              />
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-4" aria-label="Contact details">
          <Card>
            <CardContent className="space-y-4 text-sm">
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden />
                <span className="text-muted">{siteConfig.address}</span>
              </p>
              <p className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden />
                <span className="text-muted">Serving Gurugram and surrounding areas.</span>
              </p>
              {siteConfig.phone && (
                <Button href={telHref(siteConfig.phone)} variant="outline" className="w-full">
                  <Phone className="h-4 w-4" aria-hidden /> Call Us
                </Button>
              )}
              {siteConfig.whatsapp && (
                <Button href={whatsappHref(siteConfig.whatsapp)} target="_blank" rel="noopener noreferrer" variant="outline" className="w-full">
                  <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
                </Button>
              )}
              {siteConfig.email && (
                <Button href={`mailto:${siteConfig.email}`} variant="outline" className="w-full">
                  <span aria-hidden>✉</span> Email Us
                </Button>
              )}
              {!siteConfig.phone && !siteConfig.whatsapp && (
                <p className="text-xs text-muted">
                  Phone and WhatsApp buttons appear once contact numbers are configured.
                </p>
              )}
            </CardContent>
          </Card>
          <div
            className="flex h-56 items-center justify-center rounded-card border border-dashed border-navy-100 bg-white text-sm text-muted"
            role="img"
            aria-label="Map placeholder"
          >
            Map placeholder
          </div>
        </aside>
      </div>
    </div>
  );
}
