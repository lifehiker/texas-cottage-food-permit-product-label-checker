import type { Metadata } from "next";

import { CheckoutButton } from "@/components/dashboard/checkout-button";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { pricingTiers } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Free preview, one-time label pack, or recurring Texas Seller Pro plan.",
};

export default function PricingPage() {
  return (
    <Section className="py-14">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">Pricing</p>
        <h1 className="text-4xl font-black tracking-tight text-[var(--ink)]">Pay for output, not boilerplate</h1>
        <p className="text-lg leading-8 text-[var(--muted)]">
          Start free, buy a one-time label pack when one product is ready, or keep an archive with Texas Seller Pro.
        </p>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {pricingTiers.map((tier) => (
          <Card key={tier.name} className="flex flex-col justify-between gap-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">{tier.name}</p>
              <h2 className="mt-3 text-4xl font-black text-[var(--ink)]">{tier.price}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{tier.description}</p>
              <ul className="mt-5 space-y-2 text-sm leading-7 text-[var(--ink-soft)]">
                {tier.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
            </div>
            {tier.name === "Free" ? (
              <Button variant="outline">Included</Button>
            ) : tier.name === "Label Pack" ? (
              <CheckoutButton planKey="label_pack_29" label={tier.cta} />
            ) : tier.price === "$12/mo" ? (
              <CheckoutButton planKey="seller_pro_monthly_12" label={tier.cta} />
            ) : (
              <CheckoutButton planKey="seller_pro_yearly_99" label={tier.cta} />
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
}
