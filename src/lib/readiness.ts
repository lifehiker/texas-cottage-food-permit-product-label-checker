export type ReadinessInput = {
  sellerName: string;
  salesChannels: string[];
  packagingReady: boolean;
  labelReady: boolean;
  marketIntent: boolean;
};

export type ReadinessItem = {
  status: "ready" | "incomplete" | "recommended";
  title: string;
  description: string;
};

export function buildReadinessChecklist(input: ReadinessInput) {
  const items: ReadinessItem[] = [
    {
      status: input.packagingReady ? "ready" : "incomplete",
      title: "Packaging that prevents contamination",
      description: input.packagingReady
        ? "You marked packaging as ready."
        : "Select bags, boxes, jars, or tamper-resistant packaging before your next sale.",
    },
    {
      status: input.labelReady ? "ready" : "incomplete",
      title: "Texas-compliant label details",
      description: input.labelReady
        ? "Your label details are in place."
        : "Finish ingredients, allergens, net quantity, and the required private-residence disclosure.",
    },
    {
      status: "recommended",
      title: "Food handler training",
      description:
        "Texas DSHS says cottage food operators must complete accredited food handler training or hold an equivalent food manager certification where applicable.",
    },
  ];

  if (input.marketIntent) {
    items.push({
      status: "recommended",
      title: "Farmers market day setup",
      description:
        "Bring extra labels, a product list, ingredient backups, and a printed explanation for direct-sale questions.",
    });
  }

  if (input.salesChannels.includes("online")) {
    items.push({
      status: "recommended",
      title: "Online order flow",
      description:
        "Display complete label information online before taking payment and plan for personal delivery.",
    });
  }

  const incompleteCount = items.filter((item) => item.status === "incomplete").length;
  const summary =
    incompleteCount === 0
      ? `${input.sellerName || "Seller"}, you look close to market-ready. Use the label generator to finalize print files.`
      : `${input.sellerName || "Seller"}, you have ${incompleteCount} core item${incompleteCount === 1 ? "" : "s"} to finish before selling with confidence.`;

  return { items, summary };
}
