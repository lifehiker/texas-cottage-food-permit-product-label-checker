import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Can I Sell Cookies Under Texas Cottage Food Law?",
  description: "Cookie-specific Texas cottage food guidance with product and label workflow links.",
};

export default function CookiesPage() {
  return (
    <Section className="py-14">
      <Card className="prose-copy mx-auto max-w-4xl">
        <h1 className="text-4xl font-black tracking-tight text-[var(--ink)]">Can I sell cookies under Texas cottage food law?</h1>
        <p>
          In most cases, yes. Shelf-stable cookies are one of the cleanest fits for the cottage food path. The main issues are fillings or toppings that require refrigeration and complete allergen disclosure.
        </p>
      </Card>
    </Section>
  );
}
