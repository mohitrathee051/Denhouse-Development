import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-navy-100 bg-navy text-white">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="font-heading text-xl font-bold">
            Denhouse<span className="text-gold"> Group</span>
          </span>
          <p className="mt-3 max-w-xs text-sm text-white/70">
            A premium real estate company also offering quality PG
            accommodation. Content on this site marked &ldquo;sample&rdquo; is
            placeholder copy pending real company information.
          </p>
        </div>

        <nav aria-label="Real estate">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold">
            Real Estate
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/real-estate?listingType=SALE" className="hover:text-white">Buy a Property</Link></li>
            <li><Link href="/real-estate?listingType=RENT" className="hover:text-white">Rent a Property</Link></li>
            <li><Link href="/contact?service=SELL_PROPERTY" className="hover:text-white">Sell a Property</Link></li>
            <li><Link href="/real-estate" className="hover:text-white">All Listings</Link></li>
          </ul>
        </nav>

        <nav aria-label="Company">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold">
            Company
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/pg" className="hover:text-white">PG Accommodation</Link></li>
            <li><Link href="/gallery" className="hover:text-white">Gallery</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
          </ul>
        </nav>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold">
            Contact <span className="font-normal normal-case text-white/50">(sample)</span>
          </h3>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
              <span>Address placeholder — Karnal, Haryana, India</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden />
              <span>+91 00000 00000 (placeholder)</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden />
              <span>info@denhousegroup.example (placeholder)</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/60 sm:flex-row">
          <p>© {year} Denhouse Group. All rights reserved.</p>
          <p>Business hours placeholder: Mon–Sat, 10:00 AM – 7:00 PM</p>
        </div>
      </div>
    </footer>
  );
}
