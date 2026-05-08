import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Can I Sell Brownies Under Texas Cottage Food Law?",
  description: "Brownie-specific Texas cottage food guidance for search-driven sellers.",
};

export default function BrowniesPage() {
  return (
    <Section className="py-14">
      <Card className="prose-copy mx-auto max-w-4xl">
        <h1 className="text-4xl font-black tracking-tight text-[var(--ink)]">Can I sell brownies under Texas cottage food law?</h1>
        <p>
          Brownies are commonly treated like other shelf-stable baked goods. The product becomes less straightforward when toppings or fillings make it temperature-sensitive.
        </p>
      </Card>
    </Section>
  );
}
