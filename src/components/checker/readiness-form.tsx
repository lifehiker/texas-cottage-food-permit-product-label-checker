"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { ReadinessResults } from "@/components/checker/readiness-results";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { ReadinessItem } from "@/lib/readiness";

type ReadinessResponse = {
  summary: string;
  items: ReadinessItem[];
};

type FormValues = {
  sellerName: string;
  salesChannels: string[];
  packagingReady: boolean;
  labelReady: boolean;
  marketIntent: boolean;
};

export function ReadinessForm() {
  const [result, setResult] = useState<ReadinessResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      salesChannels: ["farmers_market"],
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSaving(true);
    setError(null);
    const response = await fetch("/api/checks/readiness", {
      method: "POST",
      body: JSON.stringify(values),
    });
    const payload = await response.json();

    if (!response.ok) {
      setResult(null);
      setError(payload.message || "Readiness checklist failed.");
      setSaving(false);
      return;
    }

    setResult(payload);
    setSaving(false);
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <Card>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Seller name</label>
            <Input {...register("sellerName")} placeholder="West Texas Sweets" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { value: "farmers_market", label: "Farmers market" },
              { value: "pickup", label: "Local pickup" },
              { value: "online", label: "Online order + delivery" },
              { value: "events", label: "Pop-ups / events" },
            ].map((channel) => (
              <label key={channel.value} className="rounded-2xl border border-[var(--line)] bg-[var(--sand)] p-4 text-sm">
                <input type="checkbox" value={channel.value} className="mr-2" {...register("salesChannels")} />
                {channel.label}
              </label>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="rounded-2xl border border-[var(--line)] bg-[var(--sand)] p-4 text-sm">
              <input type="checkbox" className="mr-2" {...register("packagingReady")} />
              Packaging ready
            </label>
            <label className="rounded-2xl border border-[var(--line)] bg-[var(--sand)] p-4 text-sm">
              <input type="checkbox" className="mr-2" {...register("labelReady")} />
              Label ready
            </label>
            <label className="rounded-2xl border border-[var(--line)] bg-[var(--sand)] p-4 text-sm">
              <input type="checkbox" className="mr-2" {...register("marketIntent")} />
              Selling soon
            </label>
          </div>
          <Button type="submit">{saving ? "Building..." : "Build my readiness checklist"}</Button>
        </form>
      </Card>
      {error ? (
        <Card className="flex min-h-72 items-center justify-center text-center text-[var(--danger-text)]">
          {error}
        </Card>
      ) : result ? (
        <ReadinessResults summary={result.summary} items={result.items} />
      ) : (
        <Card className="flex min-h-72 items-center justify-center text-center text-[var(--muted)]">
          Answer a few setup questions to generate your personalized checklist.
        </Card>
      )}
    </div>
  );
}
