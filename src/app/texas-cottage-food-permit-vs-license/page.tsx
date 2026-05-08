import type { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/components/layout/section";
import { buttonClassName } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Texas Cottage Food Permit vs License",
  description:
    "Clear up Texas cottage food permit, license, registration, and food handler training confusion in plain English.",
};

export default function PermitVsLicensePage() {
  return (
    <Section className="py-14">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="prose-copy rounded-[32px] border border-[var(--line)] bg-white/90 p-8 shadow-[0_24px_60px_rgba(69,41,18,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
            Permit vs license
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-[var(--ink)]">
            Texas cottage food permit vs license: what sellers actually need
          </h1>
          <p>
            For the standard direct-to-consumer Texas cottage food path, the common confusion is that people search for
            a permit or license when the real answer is usually narrower. Texas guidance says local health entities may
            not require a cottage food operator to obtain a permit or pay a fee just to produce or sell directly to
            consumers or cottage food vendors.
          </p>
          <p>
            That does not mean every product or sales setup is friction-free. Food handler training still matters, and
            newer registration paths can apply when a seller moves into time and temperature control for safety foods or
            specific vendor structures.
          </p>
          <ul>
            <li>Most classic shelf-stable cottage foods do not follow a normal local permit workflow.</li>
            <li>Food handler training remains part of the operator compliance path.</li>
            <li>Some products and newer sales structures can trigger registration requirements.</li>
            <li>Labeling requirements apply even when a permit does not.</li>
          </ul>
          <p>
            Use the eligibility checker when the product itself is the question. Use the readiness checker when the
            sales setup is the question.
          </p>
        </article>
        <Card className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--ink)]">Choose the next workflow</h2>
          <p className="text-sm leading-7 text-[var(--muted)]">
            Check product fit first, then generate the seller checklist that covers training, labels, and market prep.
          </p>
          <Link href="/checker/product-eligibility" className={buttonClassName({ className: "w-full" })}>
            Check a product
          </Link>
          <Link
            href="/checker/selling-readiness"
            className={buttonClassName({ variant: "outline", className: "w-full" })}
          >
            Build readiness checklist
          </Link>
        </Card>
      </div>
    </Section>
  );
}
