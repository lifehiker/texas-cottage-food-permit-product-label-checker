import Link from "next/link";

import { navLinks } from "@/data/siteContent";
import { Badge } from "@/components/ui/badge";
import { buttonClassName } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[color:rgba(248,241,231,0.82)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent)] text-lg font-black text-white">
            TX
          </div>
          <div>
            <Link href="/" className="text-sm font-black tracking-[0.18em] text-[var(--ink)] uppercase">
              Texas Cottage Food Checker
            </Link>
            <p className="text-xs text-[var(--muted)]">Eligibility, labels, and market readiness</p>
          </div>
        </div>
        <nav className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-[var(--ink-soft)] transition hover:text-[var(--ink)]">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Badge className="hidden sm:inline-flex">Texas only</Badge>
          <Link
            href="/dashboard"
            className={buttonClassName({ variant: "outline", className: "px-4 py-2.5" })}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}
