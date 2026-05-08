import { Card } from "@/components/ui/card";
import { REQUIRED_DISCLOSURE } from "@/data/texasRules";

export type LabelState = {
  businessName: string;
  productName: string;
  ingredients: string;
  allergens: string;
  netWeight: string;
  addressLine: string;
  disclosure: string;
  templateKey: string;
};

export function LabelPreview({ label }: { label: LabelState }) {
  return (
    <Card className="space-y-4">
      <div className="rounded-[24px] border border-dashed border-[var(--line)] bg-[var(--sand)] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">{label.templateKey.replace("-", " ")}</p>
        <h3 className="mt-3 text-2xl font-black text-[var(--ink)]">{label.productName || "Your product name"}</h3>
        <p className="mt-2 text-sm font-medium text-[var(--ink-soft)]">{label.businessName || "Business name"}</p>
        <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">
          <strong>Ingredients:</strong> {label.ingredients || "List ingredients in descending order by weight."}
        </p>
        <p className="mt-2 text-sm leading-7 text-[var(--ink-soft)]">
          <strong>Allergens:</strong> {label.allergens || "Declare milk, eggs, wheat, tree nuts, peanuts, soy, sesame, fish, or shellfish if present."}
        </p>
        <p className="mt-2 text-sm leading-7 text-[var(--ink-soft)]">
          <strong>Address / ID:</strong> {label.addressLine || "Street address or registered identification number"}
        </p>
        <div className="mt-4 flex items-end justify-between gap-4">
          <p className="text-sm font-semibold text-[var(--ink)]">Net Wt. {label.netWeight || "8 oz (227 g)"}</p>
          <p className="max-w-[14rem] text-right text-[11px] leading-5 text-[var(--muted)]">
            {label.disclosure || REQUIRED_DISCLOSURE}
          </p>
        </div>
      </div>
    </Card>
  );
}
