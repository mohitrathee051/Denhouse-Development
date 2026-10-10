import { Handshake, MapPinned, ShieldCheck, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const POINTS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: MapPinned, title: "Local Knowledge", text: "Gurugram-focused guidance from a team that understands the local market." },
  { icon: ShieldCheck, title: "Transparent Process", text: "Clear information and straightforward communication at every step." },
  { icon: Handshake, title: "Personal Guidance", text: "Helpful support tailored to your property, accommodation or investment needs." },
];

export function WhyChooseUs() {
  return (
    <section className="py-20" aria-label="Why choose Den House Group">
      <div className="container-page">
        <SectionHeading eyebrow="Why Den House" title="Why Customers Choose Us" description="Building trust and creating future-focused property experiences." />
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
