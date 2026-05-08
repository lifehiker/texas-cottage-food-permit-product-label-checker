import type { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/components/layout/section";
import { buttonClassName } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TEXAS_DSHS_COTTAGE_FOOD_URL } from "@/data/texasRules";

export const metadata: Metadata = {
  title: "Texas Cottage Food Law",
  description: "Plain-English Texas cottage food law summary with links into the eligibility checker and label generator.",
};

export default function TexasLawPage() {
  return (
    <Section className="py-14">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="prose-copy rounded-[32px] border border-[var(--line)] bg-white/90 p-8 shadow-[0_24px_60px_rgba(69,41,18,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">Law overview</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-[var(--ink)]">Texas cottage food law, translated into seller language</h1>
          <p>
            Texas DSHS now allows a broader set of foods than older summaries suggest, including some time and temperature control for safety foods with extra registration and handling rules. The easiest path is still the shelf-stable category: baked goods, candy, jams, jellies, granola, and similar products.
          </p>
          <p>
            Direct sale remains central. DSHS also states that local health entities may not require a cottage food operator to obtain a permit or pay a fee to produce or sell directly to consumers or cottage food vendors.
          </p>
          <ul>
            <li>Excluded products include meat, poultry, seafood, ice products, low-acid canned goods, CBD/THC products, and raw milk products.</li>
            <li>Operators must complete accredited food handler training or hold an equivalent recognized certification where applicable.</li>
            <li>Labels must include the business name, product name, ingredients, allergens, address or registration number, and the private-residence disclosure.</li>
          </ul>
          <p>
            Official source: <a href={TEXAS_DSHS_COTTAGE_FOOD_URL} target="_blank" rel="noreferrer" className="underline">Texas DSHS cottage food production</a>.
          </p>
        </article>
        <Card className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--ink)]">Turn the law into action</h2>
          <p className="text-sm leading-7 text-[var(--muted)]">
            Use the checker for a product-specific result, then build the matching label and market checklist.
          </p>
          <Link href="/checker/product-eligibility" className={buttonClassName({ className: "w-full" })}>
            Check my product
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
