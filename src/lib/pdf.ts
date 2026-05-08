"use client";

import { jsPDF } from "jspdf";

type LabelPayload = {
  businessName: string;
  productName: string;
  ingredients: string;
  allergens: string;
  netWeight: string;
  addressLine: string;
  disclosure: string;
  templateKey: string;
};

export function exportLabelPdf(payload: LabelPayload) {
  const doc = new jsPDF({
    orientation: payload.templateKey === "jar-band" ? "landscape" : "portrait",
    unit: "in",
    format: payload.templateKey === "jar-band" ? [2, 6] : [4, 3],
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(payload.productName, 0.25, 0.45);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(payload.businessName, 0.25, 0.75);
  doc.text(`Ingredients: ${payload.ingredients}`, 0.25, 1.1, { maxWidth: 3.45 });
  doc.text(`Allergens: ${payload.allergens || "None declared"}`, 0.25, 1.75, { maxWidth: 3.45 });
  doc.text(`Net Wt. ${payload.netWeight}`, 0.25, 2.25);
  doc.text(payload.addressLine, 0.25, 2.55, { maxWidth: 3.45 });
  doc.setFontSize(8);
  doc.text(payload.disclosure, 0.25, 2.85, { maxWidth: 3.45 });
  doc.save(`${payload.productName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-label.pdf`);
}
