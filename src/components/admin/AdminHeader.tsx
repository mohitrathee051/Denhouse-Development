import { LogOut } from "lucide-react";
import { logoutAction } from "@/lib/actions/auth-actions";

export function AdminHeader({ email }: { email: string }) {
  return (
    <header className="flex items-center justify-end gap-4 border-b border-navy-100 bg-white px-4 py-3 pl-14 md:pl-6">
      <span className="hidden text-sm text-muted sm:inline">{email}</span>
      <form action={logoutAction}>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md border border-navy-100 px-3 py-1.5 text-sm font-medium text-ink hover:bg-navy-50"
        >
          <LogOut className="h-4 w-4" aria-hidden /> Sign out
        </button>
      </form>
    </header>
  );
}
