import { Card } from "@/components/ui/card";

type LabelRow = {
  id: string;
  templateKey: string;
  createdAt: Date;
};

export function SavedLabelsTable({ labels }: { labels: LabelRow[] }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-[var(--line)] px-6 py-4">
        <h2 className="text-lg font-semibold text-[var(--ink)]">Saved labels</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--sand)] text-[var(--ink-soft)]">
            <tr>
              <th className="px-6 py-3 font-medium">Template</th>
              <th className="px-6 py-3 font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {labels.length ? (
              labels.map((label) => (
                <tr key={label.id} className="border-t border-[var(--line)]">
                  <td className="px-6 py-4">{label.templateKey}</td>
                  <td className="px-6 py-4">{label.createdAt.toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-6 text-[var(--muted)]" colSpan={2}>
                  No saved labels yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
