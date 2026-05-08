import Link from "next/link";

import { footerLinks } from "@/data/siteContent";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-white/70">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
            Texas Cottage Food Checker
          </p>
          <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
            Built for Texas home bakers, jam makers, candy sellers, and other cottage food operators who need a clear answer before they print labels or show up at market.
          </p>
        </div>
        <div className="flex flex-wrap items-start gap-4 lg:justify-end">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)]">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
