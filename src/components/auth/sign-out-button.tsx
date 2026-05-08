"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  function handleSignOut() {
    startTransition(async () => {
      const response = await fetch("/api/session/logout", {
        method: "POST",
      });
      const payload = await response.json();
      window.location.href = payload.redirectUrl || "/";
    });
  }

  return (
    <Button type="button" variant="outline" onClick={handleSignOut} disabled={isPending}>
      {isPending ? "Signing out..." : "Sign out"}
    </Button>
  );
}
