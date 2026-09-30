"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "./Button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong.",
  description = "Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-3 rounded-card border border-red-200 bg-red-50 px-6 py-14 text-center"
    >
      <AlertTriangle className="h-10 w-10 text-red-600" aria-hidden />
      <h2 className="font-heading text-lg font-semibold text-ink">{title}</h2>
      <p className="max-w-sm text-sm text-muted">{description}</p>
      {onRetry && <Button onClick={onRetry}>Try again</Button>}
    </div>
  );
}
