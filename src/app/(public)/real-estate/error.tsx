"use client";

import { ErrorState } from "@/components/ui/ErrorState";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-page py-16">
      <ErrorState
        title="Unable to load properties."
        description="Please try again in a moment."
        onRetry={reset}
      />
    </div>
  );
}
