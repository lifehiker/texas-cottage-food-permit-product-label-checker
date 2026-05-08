"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export function CheckoutButton({ planKey, label }: { planKey: "label_pack_29" | "seller_pro_monthly_12" | "seller_pro_yearly_99"; label: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function startCheckout() {
    setLoading(true);
    setMessage(null);
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ planKey }),
    });

    const payload = await response.json();
    if (payload.redirectUrl) {
      window.location.href = payload.redirectUrl;
      return;
    }

    setMessage(payload.message || "Unable to start checkout.");
    setLoading(false);
  }

  return (
    <div className="space-y-2">
      <Button type="button" onClick={startCheckout}>
        {loading ? "Starting..." : label}
      </Button>
      {message ? <p className="text-sm text-[var(--danger-text)]">{message}</p> : null}
    </div>
  );
}
