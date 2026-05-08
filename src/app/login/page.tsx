import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { LoginForm } from "@/components/auth/login-form";
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
        <LoginForm googleEnabled={hasGoogleAuth()} />
      </div>
    </div>
  );
}
