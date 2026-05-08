import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FaqSchema } from "@/components/seo/faq-schema";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { faqEntries } from "@/data/texasRules";

export function generateStaticParams() {
  return faqEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = faqEntries.find((item) => item.slug === slug);
  if (!entry) {
    return {};
  }

  return {
    title: entry.question,
    description: entry.answer,
  };
}

export default async function FaqPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = faqEntries.find((item) => item.slug === slug);
  if (!entry) {
    notFound();
  }

  return (
    <Section className="py-14">
      <FaqSchema items={[{ question: entry.question, answer: entry.answer }]} />
      <Card className="prose-copy mx-auto max-w-4xl">
        <h1 className="text-4xl font-black tracking-tight text-[var(--ink)]">{entry.question}</h1>
        <p>{entry.answer}</p>
      </Card>
    </Section>
  );
}
