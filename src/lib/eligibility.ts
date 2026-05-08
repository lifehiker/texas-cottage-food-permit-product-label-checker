import {
  prohibitedIngredients,
  TEXAS_DSHS_COTTAGE_FOOD_URL,
  TEXAS_DSHS_LABELING_URL,
  texasRules,
  type RuleOutcome,
} from "@/data/texasRules";
import { parseCsvLine } from "@/lib/utils";

export type EligibilityInput = {
  productCategory: string;
  ingredients: string[] | string;
  shelfStable: boolean;
  needsRefrigeration: boolean;
  salesChannel: "direct" | "farmers_market" | "pickup" | "online_delivery" | "other";
};

export type EligibilityResult = {
  status: RuleOutcome;
  title: string;
  explanation: string;
  citations: { label: string; url: string }[];
  nextSteps: string[];
};

export function evaluateEligibility(input: EligibilityInput): EligibilityResult {
  const category = input.productCategory.toLowerCase().trim();
  const ingredients = Array.isArray(input.ingredients)
    ? input.ingredients.map((item) => item.toLowerCase())
    : parseCsvLine(input.ingredients.toLowerCase());

  const blockedIngredient = prohibitedIngredients.find((item) =>
    ingredients.some((ingredient) => ingredient.includes(item)),
  );

  if (blockedIngredient) {
    return {
      status: "not_allowed",
      title: "Likely not allowed as entered",
      explanation: `Texas DSHS excludes products containing ${blockedIngredient} from the common cottage food path.`,
      citations: [{ label: "Texas DSHS cottage food exclusions", url: TEXAS_DSHS_COTTAGE_FOOD_URL }],
      nextSteps: [
        "Remove the prohibited ingredient and rerun the check if you offer a different version.",
        "If this is a separate licensed product line, confirm the correct regulatory path outside cottage food rules.",
      ],
    };
  }

  if (input.needsRefrigeration && !input.shelfStable) {
    return {
      status: "manual_review",
      title: "Needs a temperature-control review",
      explanation:
        "Texas now allows some time and temperature control for safety foods, but those products trigger additional registration, labeling, and handling requirements.",
      citations: [
        { label: "Texas DSHS TCS requirements", url: TEXAS_DSHS_COTTAGE_FOOD_URL },
        { label: "Texas DSHS labeling guidance", url: TEXAS_DSHS_LABELING_URL },
      ],
      nextSteps: [
        "Confirm whether the recipe is a time and temperature control for safety food.",
        "Plan to register with DSHS if you sell a TCS product.",
        "Include the made-on date and safe-handling statement on the label.",
      ],
    };
  }

  const matchedRule =
    texasRules.find((rule) => rule.category === category) ||
    texasRules.find((rule) => category.includes(rule.category));

  if (!matchedRule) {
    return {
      status: "manual_review",
      title: "Needs manual review",
      explanation:
        "This product category is not in the starter rules library yet. The safest path is to compare the recipe and storage method against current DSHS guidance.",
      citations: [{ label: "Texas DSHS cottage food production", url: TEXAS_DSHS_COTTAGE_FOOD_URL }],
      nextSteps: [
        "Check whether the product is shelf-stable.",
        "Confirm it avoids excluded ingredients and excluded product classes.",
        "Use the official determination path for acidified, fermented, or uncertain recipes.",
      ],
    };
  }

  if (matchedRule.conditions.shelfStableOnly && !input.shelfStable) {
    return {
      status: "manual_review",
      title: "Category may be allowed, but this version needs review",
      explanation:
        "The category is commonly allowed when shelf-stable, but the version you entered does not look shelf-stable.",
      citations: [{ label: "Texas DSHS food safety guidance", url: TEXAS_DSHS_COTTAGE_FOOD_URL }],
      nextSteps: [
        "Review whether the product can safely remain shelf-stable.",
        "If it is a TCS item, follow the TCS registration and labeling path instead.",
      ],
    };
  }

  const titles: Record<RuleOutcome, string> = {
    allowed: "Likely allowed under the cottage food path",
    not_allowed: "Likely not allowed under the standard cottage food path",
    manual_review: "Needs recipe-level review",
  };

  const nextSteps = [
    "Confirm the final ingredient list and allergen disclosure before printing labels.",
    "Package the food in a way that prevents contamination.",
    "Keep a copy of the DSHS source guidance with your product records.",
  ];

  if (input.salesChannel === "online_delivery") {
    nextSteps.unshift(
      "Before taking payment online, post complete label information on your website and personally deliver the product.",
    );
  }

  if (matchedRule.conditions.manualReviewNotes) {
    nextSteps.unshift(...matchedRule.conditions.manualReviewNotes);
  }

  return {
    status: matchedRule.outcome,
    title: titles[matchedRule.outcome],
    explanation: matchedRule.explanation,
    citations: [
      { label: "Texas DSHS cottage food production", url: matchedRule.sourceUrl },
      { label: "Texas DSHS food labeling", url: TEXAS_DSHS_LABELING_URL },
    ],
    nextSteps,
  };
}
