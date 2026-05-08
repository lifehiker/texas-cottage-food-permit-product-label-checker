import Link from "next/link";
import { redirect } from "next/navigation";

import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { hasGoogleAuth } from "@/lib/env";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 items-center px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">Account access</p>
          <h1 className="max-w-xl text-4xl font-black tracking-tight text-[var(--ink)]">
            Save product checks, keep reusable label records, and unlock exports.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-[var(--muted)]">
            Local demo sign-in works without external credentials. Google sign-in appears automatically when OAuth values are configured.
          </p>
        </div>
        <Card className="space-y-5">
          <form
            action={async (formData) => {
              "use server";
              await signIn("credentials", {
                email: String(formData.get("email") || ""),
                name: String(formData.get("name") || ""),
                redirectTo: "/dashboard",
              });
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--ink)]">Name</label>
              <Input name="name" placeholder="Texas Seller" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--ink)]">Email</label>
              <Input name="email" type="email" required placeholder="seller@example.com" />
            </div>
            <Button type="submit" className="w-full">
              Continue with email
            </Button>
          </form>
          {hasGoogleAuth() ? (
            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/dashboard" });
              }}
            >
              <Button type="submit" variant="outline" className="w-full">
                Continue with Google
              </Button>
            </form>
          ) : null}
          <p className="text-xs text-[var(--muted)]">
            By continuing, you agree to the <Link href="/terms" className="underline">terms</Link> and <Link href="/privacy" className="underline">privacy policy</Link>.
          </p>
        </Card>
      </div>
    </div>
  );
}
