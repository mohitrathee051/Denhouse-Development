import { Handshake, MapPinned, ShieldCheck, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const POINTS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: MapPinned, title: "Local Knowledge", text: "Placeholder copy — describe your local market expertise here." },
  { icon: ShieldCheck, title: "Transparent Process", text: "Placeholder copy — describe how you keep dealings clear and honest." },
  { icon: Handshake, title: "Personal Guidance", text: "Placeholder copy — describe the support customers receive." },
];

export function WhyChooseUs() {
  return (
    <section className="py-20" aria-label="Why choose Denhouse Group">
      <div className="container-page">
        <SectionHeading eyebrow="Why Denhouse" title="Why Customers Choose Us" description="Sample content — replace with real company information." />
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {POINTS.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-card border border-navy-100 bg-white p-6">
              <Icon className="h-6 w-6 text-gold-600" aria-hidden />
              <h3 className="mt-4 font-heading text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
