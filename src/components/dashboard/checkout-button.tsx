"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export function CheckoutButton({ planKey, label }: { planKey: "label_pack_29" | "seller_pro_monthly_12" | "seller_pro_yearly_99"; label: string }) {
  const [loading, setLoading] = useState(false);

  async function startCheckout() {
    setLoading(true);
    const response = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ planKey }),
    });

    const payload = await response.json();
    if (payload.redirectUrl) {
      window.location.href = payload.redirectUrl;
      return;
    }

    setLoading(false);
  }

  return (
    <Button type="button" onClick={startCheckout}>
      {loading ? "Starting..." : label}
    </Button>
  );
}
