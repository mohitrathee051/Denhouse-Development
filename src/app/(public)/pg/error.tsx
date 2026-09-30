"use client";

import { ErrorState } from "@/components/ui/ErrorState";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-page py-16">
      <ErrorState title="Unable to load PG rooms." description="Please try again." onRetry={reset} />
    </div>
  );
}
