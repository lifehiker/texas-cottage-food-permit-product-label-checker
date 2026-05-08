import { Card } from "@/components/ui/card";

type ProductRow = {
  id: string;
  name: string;
  category: string;
  resultStatus: string;
  createdAt: Date;
};

export function SavedProductsTable({ products }: { products: ProductRow[] }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-[var(--line)] px-6 py-4">
        <h2 className="text-lg font-semibold text-[var(--ink)]">Saved products</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--sand)] text-[var(--ink-soft)]">
            <tr>
              <th className="px-6 py-3 font-medium">Product</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Result</th>
              <th className="px-6 py-3 font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {products.length ? (
              products.map((product) => (
                <tr key={product.id} className="border-t border-[var(--line)]">
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4 capitalize">{product.category}</td>
                  <td className="px-6 py-4">{product.resultStatus}</td>
                  <td className="px-6 py-4">{product.createdAt.toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-6 text-[var(--muted)]" colSpan={4}>
                  No saved products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
