"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { ConfirmDialog } from "./ConfirmDialog";

export function DeleteButton({
  itemName,
  action,
}: {
  itemName: string;
  action: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function confirm() {
    startTransition(async () => {
      try {
        await action();
        setOpen(false);
      } catch {
        setError("Could not delete. Please try again.");
      }
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setError(null);
          setOpen(true);
        }}
        aria-label={`Delete ${itemName}`}
        className="rounded-md p-2 text-red-600 hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" aria-hidden />
      </button>
      <ConfirmDialog
        open={open}
        title="Delete permanently?"
        message={`“${itemName}” and all of its images will be permanently deleted. This cannot be undone.${error ? ` ${error}` : ""}`}
        pending={pending}
        onConfirm={confirm}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}

export function StatusSelect<T extends string>({
  label,
  value,
  options,
  action,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  action: (value: T) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      aria-label={label}
      defaultValue={value}
      disabled={pending}
      onChange={(event) => {
        const next = event.target.value as T;
        startTransition(async () => {
          await action(next);
        });
      }}
      className="rounded-md border border-navy-100 bg-white px-2 py-1.5 text-xs text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:opacity-50"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function FeaturedToggle({
  itemName,
  featured,
  action,
}: {
  itemName: string;
  featured: boolean;
  action: (featured: boolean) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <label className="inline-flex items-center gap-2 text-xs text-ink">
      <input
        type="checkbox"
        defaultChecked={featured}
        disabled={pending}
        onChange={(event) => {
          const next = event.target.checked;
          startTransition(async () => {
            await action(next);
          });
        }}
        className="h-4 w-4 rounded border-navy-100 text-navy focus:ring-gold"
        aria-label={`Feature ${itemName}`}
      />
      Featured
    </label>
  );
}
