"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LeadCaptureForm({ source = "site" }: { source?: string }) {
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("saving");
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        name: formData.get("name"),
        source,
      }),
    });

    setState(response.ok ? "saved" : "error");
  }

  return (
    <form
      onSubmit={submit}
      className="grid gap-3 rounded-[28px] border border-[var(--line)] bg-white p-5 shadow-[0_20px_40px_rgba(69,41,18,0.08)] md:grid-cols-[1fr_1fr_auto]"
    >
      <Input name="name" placeholder="Your name" />
      <Input name="email" type="email" placeholder="Email for the free label checklist" required />
      <Button type="submit" className="w-full md:w-auto">
        {state === "saving" ? "Saving..." : state === "saved" ? "Saved" : "Get the checklist"}
      </Button>
      <p className="md:col-span-3 text-xs text-[var(--muted)]">
        {state === "error"
          ? "Lead capture failed. You can still use the checker without email."
          : "We store your email for checklist delivery and product updates. No spam templates."}
      </p>
    </form>
  );
}
