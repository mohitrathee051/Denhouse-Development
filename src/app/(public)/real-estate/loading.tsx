import { PropertyCardSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="container-page py-10" aria-busy="true" aria-label="Loading properties">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
