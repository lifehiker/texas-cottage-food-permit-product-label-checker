import type { Metadata } from "next";

import { ProductEligibilityForm } from "@/components/checker/product-eligibility-form";
import { Section } from "@/components/layout/section";

export const metadata: Metadata = {
  title: "Texas Product Eligibility Checker",
  description:
    "Check whether a product is likely allowed under Texas cottage food rules and see source-backed next steps.",
};

export default function ProductEligibilityPage() {
  return (
    <Section className="py-14">
      <div className="mb-8 max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">Checker</p>
        <h1 className="text-4xl font-black tracking-tight text-[var(--ink)]">Texas product eligibility checker</h1>
        <p className="text-lg leading-8 text-[var(--muted)]">
          Answer a few questions about your product type, ingredients, storage method, and selling channel to get a likely-allowed, likely-not-allowed, or manual-review result.
        </p>
      </div>
      <ProductEligibilityForm />
    </Section>
  );
}
