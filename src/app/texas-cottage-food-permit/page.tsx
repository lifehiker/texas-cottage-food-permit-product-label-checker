import type { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/components/layout/section";
import { buttonClassName } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Texas Cottage Food Permit",
  description: "Clarify permit, license, food handler training, and new registration confusion for Texas cottage food sellers.",
};

export default function TexasPermitPage() {
  return (
    <Section className="py-14">
      <div className="mx-auto max-w-4xl space-y-6">
        <Card className="prose-copy">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">Permit confusion</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-[var(--ink)]">Do you need a permit, license, or training in Texas?</h1>
          <p>
            The short answer is that a standard Texas cottage food operation is generally not supposed to be forced into a local permit or fee just to produce or sell directly to consumers. That is the source of most search confusion around “permit” and “license.”
          </p>
          <p>
            The details changed in September 2025. Texas DSHS now requires registration for some newer scenarios, including certain TCS foods and some cottage food vendor arrangements. So “no permit” is not the whole story anymore.
          </p>
          <ul>
            <li>No local license or permit requirement for the standard direct-sale cottage food path.</li>
            <li>Food handler training is still part of the operator requirements.</li>
            <li>TCS foods and vendor/wholesale structures can trigger registration and extra labeling rules.</li>
          </ul>
          <p>
            If you want the fuller explanation, read the{" "}
            <Link href="/texas-cottage-food-permit-vs-license" className="underline">
              Texas cottage food permit vs license breakdown
            </Link>
            .
          </p>
        </Card>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/texas-cottage-food-permit-vs-license" className={buttonClassName({ className: "w-full" })}>
            Read permit vs license guide
          </Link>
          <Link
            href="/checker/selling-readiness"
            className={buttonClassName({ variant: "outline", className: "w-full" })}
          >
            Start readiness checklist
          </Link>
        </div>
      </div>
    </Section>
  );
}
