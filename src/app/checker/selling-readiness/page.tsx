import type { Metadata } from "next";

import { ReadinessForm } from "@/components/checker/readiness-form";
import { Section } from "@/components/layout/section";

export const metadata: Metadata = {
  title: "Texas Selling Readiness Checklist",
  description: "Generate a personalized checklist for labels, training, direct-sale rules, and market prep in Texas.",
};

export default function SellingReadinessPage() {
  return (
    <Section className="py-14">
      <div className="mb-8 max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">Checklist</p>
        <h1 className="text-4xl font-black tracking-tight text-[var(--ink)]">Selling-readiness checklist</h1>
        <p className="text-lg leading-8 text-[var(--muted)]">
          Build a practical pre-launch checklist for labels, packaging, training reminders, direct-sale constraints, and farmers market prep.
        </p>
      </div>
      <ReadinessForm />
    </Section>
  );
}
