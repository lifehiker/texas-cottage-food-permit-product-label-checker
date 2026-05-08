import { auth } from "@/auth";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { db } from "@/lib/db";
import { env } from "@/lib/env";
import { notFound } from "next/navigation";

export default async function AdminRulesPage() {
  const session = await auth();
  const email = session?.user?.email?.toLowerCase();
  if (!email || !env.adminEmails.includes(email)) {
    notFound();
  }

  const rules = await db.eligibilityRule.findMany({ orderBy: { category: "asc" } });

  return (
    <Section className="space-y-6 py-14">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">Admin</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-[var(--ink)]">Rule config</h1>
      </div>
      {rules.map((rule) => (
        <Card key={rule.id} className="space-y-2">
          <h2 className="text-xl font-semibold">{rule.category}</h2>
          <form action={`/api/admin/rules/${rule.id}`} method="post" className="space-y-3">
            <label className="block space-y-2 text-sm text-[var(--ink-soft)]">
              <span>Outcome</span>
              <input
                name="outcome"
                defaultValue={rule.outcome}
                className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--ink)]"
              />
            </label>
            <label className="block space-y-2 text-sm text-[var(--ink-soft)]">
              <span>Conditions JSON</span>
              <textarea
                name="conditionsJson"
                defaultValue={JSON.stringify(JSON.parse(rule.conditionsJson), null, 2)}
                className="min-h-40 w-full rounded-2xl border border-[var(--line)] bg-[var(--sand)] px-4 py-3 font-mono text-xs leading-6 text-[var(--ink-soft)]"
              />
            </label>
            <Button type="submit">Save rule</Button>
          </form>
        </Card>
      ))}
    </Section>
  );
}
