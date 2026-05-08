import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ReadinessItem } from "@/lib/readiness";

const styles = {
  ready: "bg-[var(--success-bg)] text-[var(--success-text)]",
  incomplete: "bg-[var(--danger-bg)] text-[var(--danger-text)]",
  recommended: "bg-[var(--warn-bg)] text-[var(--warn-text)]",
};

export function ReadinessResults({
  summary,
  items,
}: {
  summary: string;
  items: ReadinessItem[];
}) {
  return (
    <Card className="space-y-5">
      <p className="text-base leading-8 text-[var(--ink)]">{summary}</p>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.title} className="rounded-[24px] border border-[var(--line)] p-4">
            <div className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]", styles[item.status])}>
              {item.status.replace("_", " ")}
            </div>
            <h3 className="mt-3 text-lg font-semibold text-[var(--ink)]">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-[var(--ink-soft)]">{item.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
