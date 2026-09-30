import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { PGTable } from "@/components/admin/PGTable";
import { PropertyTable } from "@/components/admin/PropertyTable";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { getDashboardStats, getRecentPGRooms, getRecentProperties } from "@/lib/data/dashboard";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const [stats, properties, rooms] = await Promise.all([
    getDashboardStats(),
    getRecentProperties(5),
    getRecentPGRooms(5),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-heading text-2xl font-semibold text-ink">Dashboard</h1>
        <div className="flex gap-2">
          <Button href="/admin/properties/new"><Plus className="h-4 w-4" aria-hidden /> Add Property</Button>
          <Button href="/admin/pg/new" variant="outline"><Plus className="h-4 w-4" aria-hidden /> Add PG Room</Button>
        </div>
      </div>

      <DashboardStats stats={stats} />

      <section aria-labelledby="recent-properties">
        <div className="mb-3 flex items-center justify-between">
          <h2 id="recent-properties" className="font-heading text-lg font-semibold text-ink">Recent Properties</h2>
          <Link href="/admin/properties" className="text-sm font-medium text-navy underline underline-offset-4">View all</Link>
        </div>
        {properties.length === 0 ? (
          <EmptyState title="No properties yet." description="Add your first property to get started." />
        ) : (
          <PropertyTable properties={properties} compact />
        )}
      </section>

      <section aria-labelledby="recent-pg">
        <div className="mb-3 flex items-center justify-between">
          <h2 id="recent-pg" className="font-heading text-lg font-semibold text-ink">Recent PG Listings</h2>
          <Link href="/admin/pg" className="text-sm font-medium text-navy underline underline-offset-4">View all</Link>
        </div>
        {rooms.length === 0 ? (
          <EmptyState title="No PG rooms yet." description="Add your first PG room to get started." />
        ) : (
          <PGTable rooms={rooms} compact />
        )}
      </section>
    </div>
  );
}
