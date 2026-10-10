import Image from "next/image";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";

const PURPOSE = [
  { value: "SALE", label: "Buy" },
  { value: "RENT", label: "Rent" },
];

const TYPES = [
  { value: "", label: "Any type" },
  { value: "RESIDENTIAL", label: "Residential" },
  { value: "COMMERCIAL", label: "Commercial" },
  { value: "LAND", label: "Plot" },
  { value: "VILLA", label: "Villa" },
  { value: "APARTMENT", label: "Apartment" },
  { value: "INDEPENDENT_HOUSE", label: "Independent House" },
];

const BUDGET = [
  { value: "", label: "Any budget" },
  { value: "2500000", label: "Up to ₹25 Lakh" },
  { value: "5000000", label: "Up to ₹50 Lakh" },
  { value: "10000000", label: "Up to ₹1 Crore" },
  { value: "25000000", label: "Up to ₹2.5 Crore" },
];

/**
 * Server component: the search is a plain GET form to /real-estate, so it
 * works without client JavaScript and feeds the database-backed listing page.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      <Image
        src="https://picsum.photos/seed/denhouse-hero/1920/1080"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover opacity-30"
      />
      <div className="container-page py-20 sm:py-28">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">Den House Group · Real Estate</p>
        <h1 className="max-w-3xl font-heading text-4xl font-semibold leading-tight text-white sm:text-6xl">
          Find a Place to Call Home.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-white/80">
          Buy, sell or rent residential and commercial properties with a local team that guides you at every step.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/real-estate" variant="gold" size="lg">Explore Properties</Button>
          <Button href="/contact" variant="outline-white" size="lg">Contact Us</Button>
        </div>

        <form
          action="/real-estate"
          method="get"
          aria-label="Search properties"
          className="mt-12 grid gap-4 rounded-card bg-white p-5 text-ink shadow-card-hover sm:grid-cols-2 lg:grid-cols-5 lg:items-end"
        >
          <Input name="location" label="Location" placeholder="City or area" />
          <Select name="listingType" label="Purpose" options={PURPOSE} defaultValue="SALE" />
          <Select name="propertyType" label="Property Type" options={TYPES} defaultValue="" />
          <Select name="maxPrice" label="Budget" options={BUDGET} defaultValue="" />
          <Button type="submit" size="lg" className="w-full">
            <Search className="h-4 w-4" aria-hidden /> Find Properties
          </Button>
        </form>
      </div>
    </section>
  );
}
