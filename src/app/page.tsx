import Link from "next/link";

import { LeadCaptureForm } from "@/components/forms/lead-capture-form";
import { Section } from "@/components/layout/section";
import { FaqSchema } from "@/components/seo/faq-schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { citationLinks, faqSchemaData, homeHighlights, trustStats } from "@/data/siteContent";

export default function HomePage() {
  return (
    <>
      <FaqSchema items={faqSchemaData} />
      <Section className="py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <Badge>Texas-only workflow</Badge>
            <h1 className="max-w-3xl text-5xl font-black tracking-[-0.04em] text-[var(--ink)] sm:text-6xl">
              Check if you can sell it, know what to do next, and print the label.
            </h1>
            <p className="max-w-2xl text-lg leading-9 text-[var(--ink-soft)]">
              Built for Texas home bakers, jam makers, candy sellers, and first-time market vendors who need a practical compliance answer before launch day.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/checker/product-eligibility">
                <Button>Start the free checker</Button>
              </Link>
              <Link href="/label-generator">
                <Button variant="outline">Open label generator</Button>
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {trustStats.map((item) => (
                <Card key={item.value} className="p-4">
                  <p className="text-lg font-black text-[var(--ink)]">{item.value}</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{item.label}</p>
                </Card>
              ))}
            </div>
          </div>
          <Card className="space-y-4 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(247,235,220,0.98))]">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">What the app gives you</p>
            {homeHighlights.map((item) => (
              <Link key={item.href} href={item.href} className="block rounded-[24px] border border-[var(--line)] bg-white px-5 py-4 transition hover:bg-[var(--sand)]">
                <h2 className="text-lg font-semibold text-[var(--ink)]">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
              </Link>
            ))}
          </Card>
        </div>
      </Section>

      <Section className="pb-12">
        <LeadCaptureForm source="home-hero" />
      </Section>

      <Section className="grid gap-6 py-10 lg:grid-cols-2">
        <Card className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">Why sellers use it</p>
          <p className="text-base leading-8 text-[var(--ink-soft)]">
            The problem is not lack of information. It is translating scattered rules into an answer you can act on today: yes or no on the product, what steps are still missing, and what exact label text belongs on the package.
          </p>
        </Card>
        <Card className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">Current source anchors</p>
          <ul className="space-y-2 text-sm leading-7 text-[var(--ink-soft)]">
            {citationLinks.map((link) => (
              <li key={link.url}>
                <a href={link.url} target="_blank" rel="noreferrer" className="underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </Section>
    </>
  );
}
