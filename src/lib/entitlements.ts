import { db } from "@/lib/db";

export type AccessState = {
  canExportPdf: boolean;
  canSave: boolean;
  hasUnlimitedCheckers: boolean;
  planLabel: string;
  notes: string[];
};

export async function getUserAccess(userId?: string | null): Promise<AccessState> {
  if (!userId) {
    return {
      canExportPdf: false,
      canSave: false,
      hasUnlimitedCheckers: false,
      planLabel: "Free",
      notes: ["Sign in to save records or unlock paid exports."],
    };
  }

  const subscriptions = await db.subscription.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  const activeSub = subscriptions.find((item) => item.status === "active");
  if (activeSub?.planKey === "seller_pro_monthly_12" || activeSub?.planKey === "seller_pro_yearly_99") {
    return {
      canExportPdf: true,
      canSave: true,
      hasUnlimitedCheckers: true,
      planLabel: "Texas Seller Pro",
      notes: ["Unlimited saved records and exports are enabled."],
    };
  }

  const labelPack = subscriptions.find(
    (item) => item.status === "active" && item.planKey === "label_pack_29",
  );

  if (labelPack) {
    return {
      canExportPdf: true,
      canSave: true,
      hasUnlimitedCheckers: true,
      planLabel: "Label Pack",
      notes: ["You can export for the purchased product window and keep related records."],
    };
  }

  return {
    canExportPdf: false,
    canSave: false,
    hasUnlimitedCheckers: false,
    planLabel: "Free",
    notes: ["Preview is available. PDF export and saved records require Label Pack or Pro."],
  };
}
