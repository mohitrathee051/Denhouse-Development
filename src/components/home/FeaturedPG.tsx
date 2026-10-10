import { PGGrid } from "@/components/pg/PGGrid";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedPGRooms } from "@/lib/data/pg";

export async function FeaturedPG() {
  const rooms = await getFeaturedPGRooms(3);

  return (
    <section className="bg-white py-16" aria-label="Featured PG rooms">
      <div className="container-page">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Also from Den House"
            title="PG Accommodation"
            description="Comfortable paying guest rooms for students and professionals."
          />
          <Button href="/pg" variant="outline">Browse PG Rooms</Button>
        </div>
        <PGGrid rooms={rooms} />
      </div>
    </section>
  );
}
