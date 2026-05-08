"use client";

import { labelTemplates } from "@/data/texasRules";
import { cn } from "@/lib/utils";

export function TemplatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {labelTemplates.map((template) => (
        <button
          type="button"
          key={template.key}
          onClick={() => onChange(template.key)}
          className={cn(
            "rounded-[24px] border p-4 text-left transition",
            value === template.key
              ? "border-[var(--accent)] bg-[var(--sand-2)]"
              : "border-[var(--line)] bg-white hover:bg-[var(--sand)]",
          )}
        >
          <div className="text-sm font-semibold text-[var(--ink)]">{template.name}</div>
          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{template.description}</p>
        </button>
      ))}
    </div>
  );
}
