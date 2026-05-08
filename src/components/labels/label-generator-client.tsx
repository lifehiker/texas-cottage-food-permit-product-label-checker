"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { REQUIRED_DISCLOSURE } from "@/data/texasRules";
import { exportLabelPdf } from "@/lib/pdf";
import { LabelPreview, type LabelState } from "@/components/labels/label-preview";
import { TemplatePicker } from "@/components/labels/template-picker";

const initialState: LabelState = {
  businessName: "",
  productName: "",
  ingredients: "",
  allergens: "",
  netWeight: "",
  addressLine: "",
  disclosure: REQUIRED_DISCLOSURE,
  templateKey: "market-classic",
};

export function LabelGeneratorClient({
  canExportPdf,
  canSave,
}: {
  canExportPdf: boolean;
  canSave: boolean;
}) {
  const [label, setLabel] = useState<LabelState>(initialState);
  const [message, setMessage] = useState<string | null>(null);

  async function saveLabel() {
    const response = await fetch("/api/labels/save", {
      method: "POST",
      body: JSON.stringify(label),
    });

    const payload = await response.json();
    setMessage(payload.message);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <Card className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium">Template</label>
          <TemplatePicker value={label.templateKey} onChange={(templateKey) => setLabel((current) => ({ ...current, templateKey }))} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Business name</label>
            <Input value={label.businessName} onChange={(event) => setLabel((current) => ({ ...current, businessName: event.target.value }))} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Product name</label>
            <Input value={label.productName} onChange={(event) => setLabel((current) => ({ ...current, productName: event.target.value }))} />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Ingredients</label>
          <Textarea value={label.ingredients} onChange={(event) => setLabel((current) => ({ ...current, ingredients: event.target.value }))} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Allergens</label>
            <Input value={label.allergens} onChange={(event) => setLabel((current) => ({ ...current, allergens: event.target.value }))} placeholder="Contains wheat, eggs, pecans" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Net weight</label>
            <Input value={label.netWeight} onChange={(event) => setLabel((current) => ({ ...current, netWeight: event.target.value }))} placeholder="8 oz (227 g)" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Address or DSHS registration number</label>
          <Input value={label.addressLine} onChange={(event) => setLabel((current) => ({ ...current, addressLine: event.target.value }))} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Disclosure</label>
          <Textarea value={label.disclosure} onChange={(event) => setLabel((current) => ({ ...current, disclosure: event.target.value }))} />
        </div>
        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={() => canExportPdf ? exportLabelPdf(label) : setMessage("PDF export is locked until you buy Label Pack or Pro.")}>
            {canExportPdf ? "Export PDF" : "Preview only"}
          </Button>
          <Button type="button" variant="outline" onClick={saveLabel} disabled={!canSave}>
            Save label
          </Button>
        </div>
        {message ? <p className="text-sm text-[var(--muted)]">{message}</p> : null}
      </Card>
      <LabelPreview label={label} />
    </div>
  );
}
