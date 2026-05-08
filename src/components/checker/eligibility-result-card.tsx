import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { EligibilityResult } from "@/lib/eligibility";

const tone = {
  allowed: "bg-[var(--success-bg)] text-[var(--success-text)]",
  manual_review: "bg-[var(--warn-bg)] text-[var(--warn-text)]",
  not_allowed: "bg-[var(--danger-bg)] text-[var(--danger-text)]",
};

export function EligibilityResultCard({ result }: { result: EligibilityResult }) {
  return (
    <Card className="space-y-5">
      <div className={cn("inline-flex rounded-full px-4 py-2 text-sm font-semibold", tone[result.status])}>
        {result.title}
      </div>
      <p className="text-base leading-8 text-[var(--ink-soft)]">{result.explanation}</p>
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">Next steps</h3>
        <ul className="space-y-2 text-sm leading-7 text-[var(--ink-soft)]">
          {result.nextSteps.map((step) => (
            <li key={step} className="rounded-2xl bg-[var(--sand)] px-4 py-3">
              {step}
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">Sources</h3>
        <ul className="space-y-2 text-sm text-[var(--ink-soft)]">
          {result.citations.map((citation) => (
            <li key={citation.url}>
              <a href={citation.url} target="_blank" rel="noreferrer" className="underline">
                {citation.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
