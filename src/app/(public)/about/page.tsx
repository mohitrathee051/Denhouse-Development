import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Denhouse Group, a real estate company that also offers PG accommodation.",
  alternates: { canonical: "/about" },
};

const PLACEHOLDER = "Placeholder — replace with real Denhouse Group copy.";

const SECTIONS = [
  { id: "who", title: "Who We Are", body: "Denhouse Group is a real estate company that also offers PG (paying guest) accommodation." },
  { id: "story", title: "Our Story", body: PLACEHOLDER },
  { id: "mission", title: "Mission", body: PLACEHOLDER },
  { id: "vision", title: "Vision", body: PLACEHOLDER },
  { id: "approach", title: "Our Approach", body: PLACEHOLDER },
  { id: "trust", title: "Why Customers Trust Us", body: PLACEHOLDER },
];

export default function AboutPage() {
  return (
    <div className="container-page py-12">
      <SectionHeading eyebrow="About" title="About Denhouse Group" />
      <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
        Content marked “Placeholder” needs to be replaced with real company information.
      </p>

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
          We also run PG accommodation for students and working professionals.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/real-estate" variant="gold">View Properties</Button>
          <Button href="/pg" variant="outline-white">Explore PG</Button>
        </div>
      </section>
    </div>
  );
}
