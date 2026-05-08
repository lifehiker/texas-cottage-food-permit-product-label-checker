"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { EligibilityResultCard } from "@/components/checker/eligibility-result-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { EligibilityResult } from "@/lib/eligibility";

const schema = z.object({
  sellerName: z.string().optional(),
  productCategory: z.string().min(2),
  ingredients: z.string().min(2),
  shelfStable: z.boolean(),
  needsRefrigeration: z.boolean(),
  salesChannel: z.enum(["direct", "farmers_market", "pickup", "online_delivery", "other"]),
});

type FormValues = z.infer<typeof schema>;

export function ProductEligibilityForm() {
  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [saving, setSaving] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      shelfStable: true,
      needsRefrigeration: false,
      salesChannel: "farmers_market",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSaving(true);
    const response = await fetch("/api/checks/eligibility", {
      method: "POST",
      body: JSON.stringify(values),
    });
    const payload = await response.json();
    setResult(payload.result);
    setSaving(false);
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <Card>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Seller name</label>
              <Input {...register("sellerName")} placeholder="Hill Country Bakes" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Product category</label>
              <Input {...register("productCategory")} placeholder="Cookies, jam, salsa..." />
              {errors.productCategory ? <p className="text-sm text-[var(--danger-text)]">{errors.productCategory.message}</p> : null}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Ingredients</label>
            <Input {...register("ingredients")} placeholder="Flour, butter, eggs, pecans..." />
            {errors.ingredients ? <p className="text-sm text-[var(--danger-text)]">{errors.ingredients.message}</p> : null}
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="rounded-2xl border border-[var(--line)] bg-[var(--sand)] p-4 text-sm">
              <input type="checkbox" className="mr-2" {...register("shelfStable")} />
              Shelf-stable
            </label>
            <label className="rounded-2xl border border-[var(--line)] bg-[var(--sand)] p-4 text-sm">
              <input type="checkbox" className="mr-2" {...register("needsRefrigeration")} />
              Needs refrigeration
            </label>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--sand)] p-4">
              <label className="mb-2 block text-sm font-medium">Sales channel</label>
              <select {...register("salesChannel")} className="w-full bg-transparent text-sm outline-none">
                <option value="direct">Direct sale</option>
                <option value="farmers_market">Farmers market</option>
                <option value="pickup">Local pickup</option>
                <option value="online_delivery">Online order + delivery</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <Button type="submit">{saving ? "Checking..." : "Check product eligibility"}</Button>
        </form>
      </Card>
      {result ? (
        <EligibilityResultCard result={result} />
      ) : (
        <Card className="flex min-h-72 items-center justify-center text-center text-[var(--muted)]">
          Submit your product details to see the result, source links, and next-step checklist.
        </Card>
      )}
    </div>
  );
}
