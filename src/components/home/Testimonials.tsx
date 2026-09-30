import { SectionHeading } from "@/components/ui/SectionHeading";

export interface Testimonial {
  name: string;
  quote: string;
}

/**
 * Intentionally renders nothing until REAL, verified testimonials are
 * supplied. No testimonials are invented for this site.
 */
export function Testimonials({ testimonials = [] }: { testimonials?: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-20" aria-label="Customer testimonials">
      <div className="container-page">
        <SectionHeading title="What Our Customers Say" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-card border border-navy-100 bg-white p-6">
              <blockquote className="text-sm text-ink/80">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-ink">{t.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
