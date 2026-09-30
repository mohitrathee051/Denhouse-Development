import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-page py-16">
      <EmptyState
        title="PG room not found."
        description="This listing may have been removed."
        action={<Button href="/pg">Browse PG Rooms</Button>}
      />
    </div>
  );
}
