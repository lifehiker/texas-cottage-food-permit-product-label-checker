import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Can I Sell Jam Under Texas Cottage Food Law?",
  description: "Jam-specific Texas cottage food guidance with a path into the checker and label generator.",
};

export default function JamPage() {
  return (
    <Section className="py-14">
      <Card className="prose-copy mx-auto max-w-4xl">
        <h1 className="text-4xl font-black tracking-tight text-[var(--ink)]">Can I sell jam under Texas cottage food law?</h1>
        <p>
          Usually yes, if the jam is shelf-stable and produced from a recognized safe recipe source. Keep batch records, label the product clearly, and watch for recipe variations that shift the acidity or storage profile.
        </p>
      </Card>
    </Section>
  );
}
