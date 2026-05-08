import type { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/components/layout/section";
import { buttonClassName } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Can I Sell Cake Under Texas Cottage Food Law?",
  description:
    "Cake-specific Texas cottage food guidance with shelf-stability notes, labeling reminders, and direct links into the checker.",
};

export default function CakePage() {
  return (
    <Section className="py-14">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="prose-copy">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">Cake guidance</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-[var(--ink)]">
            Can I sell cake under Texas cottage food law?
          </h1>
          <p>
            Usually yes, if the cake stays shelf-stable. Plain layer cakes, loaf cakes, snack cakes, and cupcakes
            often fit the Texas cottage food path more cleanly than products with cream cheese frosting, custard,
            whipped toppings, or chilled fillings.
          </p>
          <p>
            The two questions that matter most are whether the finished product needs temperature control and whether
            the label clearly lists ingredients and allergens. If the answer on shelf stability is uncertain, use the
            checker and treat the result as a manual review case instead of guessing.
          </p>
          <ul>
            <li>Shelf-stable cakes are often workable.</li>
            <li>Refrigerated fillings or frostings change the analysis quickly.</li>
            <li>Labels still need ingredients, allergens, net weight, seller details, and the Texas disclosure.</li>
          </ul>
        </Card>
        <Card className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--ink)]">Turn this into a product decision</h2>
          <p className="text-sm leading-7 text-[var(--muted)]">
            Run the guided eligibility flow for the exact cake you plan to sell, then generate a matching label.
          </p>
          <Link href="/checker/product-eligibility" className={buttonClassName({ className: "w-full" })}>
            Check my cake
          </Link>
          <Link
            href="/label-generator"
            className={buttonClassName({ variant: "outline", className: "w-full" })}
          >
            Build my label
          </Link>
        </Card>
      </div>
    </Section>
  );
}
