import type { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/components/layout/section";
import { buttonClassName } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { labelChecklistPdfBullets } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "Texas Cottage Food Label Template",
  description: "Understand Texas cottage food label requirements and launch into the printable label generator.",
};

export default function TexasLabelTemplatePage() {
  return (
    <Section className="py-14">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">Label requirements</p>
          <h1 className="text-4xl font-black tracking-tight text-[var(--ink)]">Texas cottage food label template checklist</h1>
          <ul className="space-y-2 text-sm leading-7 text-[var(--ink-soft)]">
            {labelChecklistPdfBullets.map((item) => (
              <li key={item} className="rounded-2xl bg-[var(--sand)] px-4 py-3">{item}</li>
            ))}
          </ul>
        </Card>
        <Card className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--ink)]">Generate instead of formatting from scratch</h2>
          <p className="text-sm leading-7 text-[var(--muted)]">
            Use one of the built-in layouts and preview all required text before exporting.
          </p>
          <Link href="/label-generator" className={buttonClassName({ className: "w-full" })}>
            Open label generator
          </Link>
        </Card>
      </div>
    </Section>
  );
}
