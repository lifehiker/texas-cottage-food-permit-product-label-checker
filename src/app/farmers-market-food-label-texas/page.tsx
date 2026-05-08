import type { Metadata } from "next";

import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Farmers Market Food Label Texas",
  description: "Farmers market prep and label requirements for Texas cottage food sellers.",
};

export default function FarmersMarketPage() {
  return (
    <Section className="py-14">
      <Card className="prose-copy mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">Farmers market prep</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-[var(--ink)]">Texas farmers market label prep</h1>
        <p>
          For farmers market sellers, the label is not the only thing that matters. You also need packaging, ingredient backups, a clean display process, and a fast answer when a shopper asks whether the product contains nuts, dairy, or wheat.
        </p>
        <ul>
          <li>Bring pre-labeled products whenever possible.</li>
          <li>Keep ingredient and allergen details accessible at the booth.</li>
          <li>Use the readiness checklist to catch missing prep items before market day.</li>
        </ul>
      </Card>
    </Section>
  );
}
