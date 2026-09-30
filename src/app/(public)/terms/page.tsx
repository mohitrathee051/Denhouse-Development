import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using the Denhouse Group website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="container-page max-w-3xl py-12">
      <h1 className="font-heading text-3xl font-semibold text-ink">Terms of Service</h1>
      <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
        Template text — have this reviewed by a qualified professional before launch.
      </p>
      <div className="prose mt-8 max-w-none text-ink/80">
        <h2>Use of this website</h2>
        <p>Information on this site is provided for general guidance and may change without notice.</p>
        <h2>Listings</h2>
        <p>Property and PG details, prices and availability are subject to change and confirmation with Denhouse Group.</p>
        <h2>Liability</h2>
        <p>Please verify all details directly with us before making decisions.</p>
      </div>
    </div>
  );
}
