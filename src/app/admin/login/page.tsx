import type { Metadata } from "next";
import { LoginForm } from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function AdminLoginPage({ searchParams }: { searchParams: SearchParams }) {
  const raw = await searchParams;
  const requested = typeof raw.callbackUrl === "string" ? raw.callbackUrl : "";
  // Only allow same-site admin paths to prevent open redirects.
  const callbackUrl = requested.startsWith("/admin") && !requested.startsWith("//") ? requested : "/admin/dashboard";

  return (
    <main className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="w-full max-w-sm rounded-card bg-white p-8 shadow-card-hover">
        <h1 className="font-heading text-2xl font-semibold text-ink">Admin sign in</h1>
        <p className="mb-6 mt-1 text-sm text-muted">Denhouse Group management panel</p>
        <LoginForm callbackUrl={callbackUrl} />
      </div>
    </main>
  );
}
