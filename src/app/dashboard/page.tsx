import Link from "next/link";

import { auth } from "@/auth";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { CheckoutButton } from "@/components/dashboard/checkout-button";
import { SavedLabelsTable } from "@/components/dashboard/saved-labels-table";
import { SavedProductsTable } from "@/components/dashboard/saved-products-table";
import { Section } from "@/components/layout/section";
import { buttonClassName } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { db } from "@/lib/db";
import { getUserAccess } from "@/lib/entitlements";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    return (
      <Section className="py-16">
        <Card className="mx-auto max-w-2xl space-y-4 text-center">
          <h1 className="text-3xl font-black">Sign in to save products and labels</h1>
          <p className="text-[var(--muted)]">Use local email sign-in if Google OAuth is not configured yet.</p>
          <div className="flex justify-center gap-3">
            <Link href="/login" className={buttonClassName({})}>
              Sign in
            </Link>
            <Link href="/pricing" className={buttonClassName({ variant: "outline" })}>
              See plans
            </Link>
          </div>
        </Card>
      </Section>
    );
  }

  const [products, labels, checks, subscriptions, access] = await Promise.all([
    db.product.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: "desc" }, take: 10 }),
    db.savedLabel.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: "desc" }, take: 10 }),
    db.eligibilityCheck.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: "desc" }, take: 5 }),
    db.subscription.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: "desc" }, take: 5 }),
    getUserAccess(session.user.id),
  ]);

  return (
    <Section className="space-y-8 py-14">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">Dashboard</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-[var(--ink)]">
            {session.user.name || session.user.email}
          </h1>
          <p className="mt-2 text-lg text-[var(--muted)]">Current plan: {access.planLabel}</p>
        </div>
        <SignOutButton />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="space-y-3">
          <h2 className="text-lg font-semibold">Recent checks</h2>
          <ul className="space-y-2 text-sm text-[var(--ink-soft)]">
            {checks.length ? (
              checks.map((check) => <li key={check.id}>{check.productCategory}: {check.resultStatus}</li>)
            ) : (
              <li>No checks yet.</li>
            )}
          </ul>
        </Card>
        <Card className="space-y-3">
          <h2 className="text-lg font-semibold">Billing</h2>
          <ul className="space-y-2 text-sm text-[var(--ink-soft)]">
            {subscriptions.length ? (
              subscriptions.map((subscription) => (
                <li key={subscription.id}>{subscription.planKey} · {subscription.status}</li>
              ))
            ) : (
              <li>No purchases yet.</li>
            )}
          </ul>
        </Card>
        <Card className="space-y-4">
          <h2 className="text-lg font-semibold">Upgrade access</h2>
          <CheckoutButton planKey="label_pack_29" label="Buy Label Pack" />
          <CheckoutButton planKey="seller_pro_monthly_12" label="Start Pro monthly" />
          <CheckoutButton planKey="seller_pro_yearly_99" label="Start Pro yearly" />
        </Card>
      </div>

      <SavedProductsTable products={products} />
      <SavedLabelsTable labels={labels} />
    </Section>
  );
}
