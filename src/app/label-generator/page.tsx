import type { Metadata } from "next";

import { auth } from "@/auth";
import { LabelGeneratorClient } from "@/components/labels/label-generator-client";
import { Section } from "@/components/layout/section";
import { getUserAccess } from "@/lib/entitlements";

export const metadata: Metadata = {
  title: "Texas Cottage Food Label Generator",
  description: "Build and preview Texas cottage food labels with ingredients, allergens, net weight, and required disclosure text.",
};

export default async function LabelGeneratorPage() {
  const session = await auth();
  const access = await getUserAccess(session?.user?.id);

  return (
    <Section className="py-14">
      <div className="mb-8 max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">Label generator</p>
        <h1 className="text-4xl font-black tracking-tight text-[var(--ink)]">Build a printable Texas cottage food label</h1>
        <p className="text-lg leading-8 text-[var(--muted)]">
          Preview is free. Export is unlocked with Label Pack or Texas Seller Pro. Your current access: {access.planLabel}.
        </p>
      </div>
      <LabelGeneratorClient canExportPdf={access.canExportPdf} canSave={access.canSave} />
    </Section>
  );
}
