import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Settings" };

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-navy-100 py-3 last:border-0 sm:flex-row sm:justify-between">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-sm font-medium text-ink">{value}</dd>
    </div>
  );
}

export default async function AdminSettingsPage() {
  const session = await auth();

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-heading text-2xl font-semibold text-ink">Settings</h1>
      <section className="rounded-card border border-navy-100 bg-white p-5 shadow-card" aria-labelledby="account">
        <h2 id="account" className="mb-2 font-heading text-lg font-semibold text-ink">Your account</h2>
        <dl>
          <Row label="Email" value={session?.user?.email ?? "—"} />
          <Row label="Role" value={session?.user?.role ?? "—"} />
        </dl>
      </section>
      <section className="rounded-card border border-navy-100 bg-white p-5 shadow-card" aria-labelledby="site">
        <h2 id="site" className="mb-2 font-heading text-lg font-semibold text-ink">Website contact details</h2>
        <p className="mb-2 text-xs text-muted">
          These come from environment variables (see README). Change them in your Vercel project settings.
        </p>
        <dl>
          <Row label="Phone" value={siteConfig.phone || "Not set"} />
          <Row label="WhatsApp" value={siteConfig.whatsapp || "Not set"} />
          <Row label="Email" value={siteConfig.email || "Not set"} />
        </dl>
      </section>
    </div>
  );
}
