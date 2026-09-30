import { BedDouble, Building2, CheckCircle2, Inbox, Star, Tag, type LucideIcon } from "lucide-react";
import type { DashboardStats as Stats } from "@/lib/data/dashboard";

export function DashboardStats({ stats }: { stats: Stats }) {
  const items: { label: string; value: number; icon: LucideIcon }[] = [
    { label: "Total Properties", value: stats.totalProperties, icon: Building2 },
    { label: "Available Properties", value: stats.availableProperties, icon: CheckCircle2 },
    { label: "Sold Properties", value: stats.soldProperties, icon: Tag },
    { label: "Featured Properties", value: stats.featuredProperties, icon: Star },
    { label: "Total PG Rooms", value: stats.totalPGRooms, icon: BedDouble },
    { label: "Available PG Rooms", value: stats.availablePGRooms, icon: CheckCircle2 },
  ];

  return (
    <dl className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {items.map(({ label, value, icon: Icon }) => (
        <div key={label} className="rounded-card border border-navy-100 bg-white p-4 shadow-card">
          <div className="flex items-center justify-between">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">{label}</dt>
            <Icon className="h-4 w-4 text-gold-600" aria-hidden />
          </div>
          <dd className="mt-2 font-heading text-3xl font-semibold text-ink">{value}</dd>
        </div>
      ))}
      <div className="col-span-2 flex items-center gap-3 rounded-card border border-navy-100 bg-white p-4 shadow-card lg:col-span-3">
        <Inbox className="h-4 w-4 text-gold-600" aria-hidden />
        <p className="text-sm text-muted">
          Database inquiries: <span className="font-semibold text-ink">{stats.newInquiries}</span> new
          <span className="ml-1">(contact form messages are delivered to your email via Formspree)</span>
        </p>
      </div>
    </dl>
  );
}
