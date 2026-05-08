"use client";

import { FormEvent, useState, useTransition } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function LoginForm({ googleEnabled }: { googleEnabled: boolean }) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleCredentialsSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => {
      setError(null);
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/session/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider: "credentials",
          email: String(formData.get("email") || ""),
          name: String(formData.get("name") || ""),
          redirectTo: "/dashboard",
        }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.redirectUrl) {
        setError(payload.message || "Sign-in failed. Check the email address and try again.");
        return;
      }

      window.location.href = payload.redirectUrl;
    });
  }

  function handleGoogleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => {
      setError(null);
      const response = await fetch("/api/session/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider: "google",
          redirectTo: "/dashboard",
        }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.redirectUrl) {
        setError(payload.message || "Google sign-in is not available right now.");
        return;
      }

      window.location.href = payload.redirectUrl;
    });
  }

  return (
    <Card className="space-y-5">
      <form onSubmit={handleCredentialsSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--ink)]">Name</label>
          <Input name="name" placeholder="Texas Seller" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--ink)]">Email</label>
          <Input name="email" type="email" required placeholder="seller@example.com" />
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Signing in..." : "Continue with email"}
        </Button>
      </form>
      {googleEnabled ? (
        <form onSubmit={handleGoogleSubmit}>
          <Button type="submit" variant="outline" className="w-full" disabled={isPending}>
            Continue with Google
          </Button>
        </form>
      ) : null}
      <p className="text-xs text-[var(--muted)]">
        By continuing, you agree to the <Link href="/terms" className="underline">terms</Link> and{" "}
        <Link href="/privacy" className="underline">privacy policy</Link>.
      </p>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </Card>
  );
}
