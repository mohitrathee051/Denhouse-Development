import { BedDouble } from "lucide-react";
import { PGCard } from "./PGCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { PGRoomWithImages } from "@/types/pg";

export function PGGrid({ rooms }: { rooms: PGRoomWithImages[] }) {
  if (rooms.length === 0) {
    return (
      <EmptyState
        icon={BedDouble}
        title="No PG rooms are currently available."
        description="Try changing your filters, or contact us and we'll help you find a room."
      />
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room) => (
        <PGCard key={room.id} room={room} />
      ))}
    </div>
  );
}
