import {
  REQUIRED_DISCLOSURE,
  TEXAS_DSHS_COTTAGE_FOOD_URL,
  TEXAS_DSHS_LABELING_URL,
  faqEntries,
} from "@/data/texasRules";

export const navLinks = [
  { href: "/texas-cottage-food-law", label: "Law" },
  { href: "/texas-cottage-food-permit", label: "Permit" },
  { href: "/checker/product-eligibility", label: "Eligibility" },
  { href: "/checker/selling-readiness", label: "Readiness" },
  { href: "/label-generator", label: "Label Generator" },
  { href: "/pricing", label: "Pricing" },
];

export const trustStats = [
  { value: "Texas-only", label: "Built around current DSHS cottage food guidance" },
  { value: "3 outputs", label: "Eligibility answer, readiness checklist, compliant label" },
  { value: "4 templates", label: "Print-ready starter label layouts for common formats" },
];

export const citationLinks = [
  { label: "Texas DSHS cottage food production", url: TEXAS_DSHS_COTTAGE_FOOD_URL },
  { label: "Texas DSHS labeling requirements", url: TEXAS_DSHS_LABELING_URL },
];

export const footerLinks = [
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/faq/do-i-need-a-food-handler-card-for-texas-cottage-food-sales", label: "FAQ" },
];

export const homeHighlights = [
  {
    title: "Product eligibility checker",
    description:
      "Answer a short guided flow and get an allowed, not allowed, or manual-review result with current-source citations.",
    href: "/checker/product-eligibility",
  },
  {
    title: "Selling-readiness checklist",
    description:
      "Generate a seller-specific action list for labels, training, direct-sale rules, and market prep.",
    href: "/checker/selling-readiness",
  },
  {
    title: "Texas label generator",
    description:
      "Build a printable label with ingredients, allergens, net weight, address or registration number, and required disclosure text.",
    href: "/label-generator",
  },
];

export const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    description: "For testing one product idea before your first market.",
    features: ["3 eligibility checks/month", "1 readiness checklist", "label preview", "no PDF export or saved records"],
    cta: "Start Free",
  },
  {
    name: "Label Pack",
    price: "$29",
    description: "One-time export for a product you are ready to sell now.",
    features: ["1 export-enabled product", "editable template", "30 days of revisions", "product checklist included"],
    cta: "Buy Label Pack",
  },
  {
    name: "Texas Seller Pro",
    price: "$12/mo",
    description: "For sellers managing multiple products and repeat market prep.",
    features: ["unlimited saved products", "unlimited label exports", "ingredient/allergen reuse", "update alerts and archive"],
    cta: "Go Pro",
  },
];

export const labelChecklistPdfBullets = [
  "Product common name",
  "Business name",
  "Address or DSHS registration number",
  "Ingredients in descending order by weight",
  "Allergen declaration",
  "Net quantity in the bottom third of the label",
  REQUIRED_DISCLOSURE,
];

export const faqSchemaData = faqEntries.map((entry) => ({
  question: entry.question,
  answer: entry.answer,
}));
