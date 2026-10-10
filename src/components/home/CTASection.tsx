import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="bg-navy py-16 text-white" aria-label="Contact call to action">
      <div className="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="font-heading text-3xl font-semibold text-white">Ready to find your next property?</h2>
          <p className="mt-2 text-white/70">Talk to the Den House team about buying, selling or renting.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href="/real-estate" variant="gold" size="lg">Find Properties</Button>
          <Button href="/contact" variant="outline-white" size="lg">Contact Den House</Button>
        </div>
      </div>
    </section>
  );
}
