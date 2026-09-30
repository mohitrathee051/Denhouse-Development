import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { PGTable } from "@/components/admin/PGTable";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { getAllPGRoomsForAdmin } from "@/lib/data/pg";

export const metadata: Metadata = { title: "PG Rooms" };

export default async function AdminPGPage() {
  const rooms = await getAllPGRoomsForAdmin();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-heading text-2xl font-semibold text-ink">PG Rooms</h1>
        <Button href="/admin/pg/new"><Plus className="h-4 w-4" aria-hidden /> Add PG Room</Button>
      </div>
      {rooms.length === 0 ? (
        <EmptyState title="No PG rooms yet." description="Click “Add PG Room” to create your first listing." />
      ) : (
        <PGTable rooms={rooms} />
      )}
    </div>
  );
}
