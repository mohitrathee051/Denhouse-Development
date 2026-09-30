"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BedDouble, Building2, Inbox, LayoutDashboard, Menu, Settings, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const ITEMS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/properties", label: "Properties", icon: Building2 },
  { href: "/admin/pg", label: "PG Rooms", icon: BedDouble },
  { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Admin" className="flex flex-col gap-1 p-3">
      {ITEMS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white/75 hover:bg-white/10 hover:text-white",
              active && "bg-white/15 text-white",
            )}
          >
            <Icon className="h-4 w-4" aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="hidden w-60 shrink-0 bg-navy md:block">
        <div className="px-5 py-5 font-heading text-lg font-bold text-white">
          Denhouse <span className="text-gold">Admin</span>
        </div>
        <NavList />
      </aside>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open admin menu"
        className="fixed left-3 top-3 z-30 rounded-md bg-navy p-2 text-white md:hidden"
      >
        <Menu className="h-5 w-5" aria-hidden />
      </button>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true" aria-label="Admin menu">
          <div className="absolute inset-0 bg-navy/50" onClick={() => setOpen(false)} aria-hidden />
          <div className="relative h-full w-64 bg-navy">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close admin menu"
              className="absolute right-3 top-3 rounded-md p-1.5 text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
            <div className="px-5 py-5 font-heading text-lg font-bold text-white">Denhouse Admin</div>
            <NavList onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
