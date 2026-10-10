import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Den House Group, a real estate company that also offers PG accommodation.",
  alternates: { canonical: "/about" },
};

const SECTIONS = [
  { id: "who", title: "Who We Are", body: "Den House Group is a Gurugram-based real estate company offering property services and quality PG accommodation." },
  { id: "story", title: "Our Story", body: "Established in 2026, we are building a trusted local platform for property discovery, accommodation and guidance." },
  { id: "mission", title: "Mission", body: "To make property decisions clearer, more transparent and more human for every customer." },
  { id: "vision", title: "Vision", body: "To create a dependable real estate and accommodation brand for Gurugram and the communities around it." },
  { id: "approach", title: "Our Approach", body: "We listen first, share clear information and support customers through each step of their property journey." },
  { id: "trust", title: "Why Customers Trust Us", body: "Our promise is simple: building trust and creating future-focused relationships through honest service." },
];

export default function AboutPage() {
  return (
    <div className="container-page py-12">
      <SectionHeading eyebrow="About" title="About Den House Group" description={siteConfig.tagline} />

      <div className="mt-6 grid gap-4 rounded-card border border-navy-100 bg-white p-6 text-sm sm:grid-cols-2 lg:grid-cols-3">
        <div><span className="text-muted">Legal name</span><p className="mt-1 font-semibold text-ink">{siteConfig.legalName}</p></div>
        <div><span className="text-muted">CIN</span><p className="mt-1 font-semibold text-ink">{siteConfig.cin}</p></div>
        <div><span className="text-muted">Established</span><p className="mt-1 font-semibold text-ink">{siteConfig.established}</p></div>
        <div><span className="text-muted">Business type</span><p className="mt-1 font-semibold text-ink">{siteConfig.type}</p></div>
        <div><span className="text-muted">Location</span><p className="mt-1 font-semibold text-ink">{siteConfig.city}</p></div>
        <div><span className="text-muted">Languages</span><p className="mt-1 font-semibold text-ink">{siteConfig.languages.join(", ")}</p></div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {SECTIONS.map((section) => (
          <section key={section.id} aria-labelledby={section.id} className="rounded-card border border-navy-100 bg-white p-6">
            <h2 id={section.id} className="font-heading text-xl font-semibold text-ink">{section.title}</h2>
            <p className="mt-3 text-muted">{section.body}</p>
          </section>
        ))}
      </div>

      <section aria-labelledby="services" className="mt-12 rounded-card bg-navy p-8 text-white">
        <h2 id="services" className="font-heading text-2xl font-semibold text-white">Real Estate + PG Services</h2>
        <p className="mt-3 max-w-2xl text-white/80">
          Real estate is our primary business — buying, selling and renting residential and commercial property.
          We also provide PG accommodation for students and working professionals in and around Gurugram.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/real-estate" variant="gold">View Properties</Button>
          <Button href="/pg" variant="outline-white">Explore PG</Button>
        </div>
      </section>
    </div>
  );
}
