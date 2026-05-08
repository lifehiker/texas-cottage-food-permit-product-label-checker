export const TEXAS_DSHS_COTTAGE_FOOD_URL =
  "https://www.dshs.texas.gov/retail-food-establishments/texas-cottage-food-production";

export const TEXAS_DSHS_LABELING_URL =
  "https://www.dshs.texas.gov/food-manufacturers-wholesalers-warehouses/labeling-food-manufacturers-wholesalers-warehouses";

export const REQUIRED_DISCLOSURE =
  "THIS PRODUCT WAS PRODUCED IN A PRIVATE RESIDENCE THAT IS NOT SUBJECT TO GOVERNMENTAL LICENSING OR INSPECTION.";

export type RuleOutcome = "allowed" | "not_allowed" | "manual_review";

export type TexasRule = {
  slug: string;
  category: string;
  conditions: {
    shelfStableOnly?: boolean;
    prohibitedIngredients?: string[];
    manualReviewNotes?: string[];
  };
  outcome: RuleOutcome;
  explanation: string;
  sourceUrl: string;
};

export const texasRules: TexasRule[] = [
  {
    slug: "cookies",
    category: "cookies",
    conditions: { shelfStableOnly: true },
    outcome: "allowed",
    explanation:
      "Shelf-stable baked goods such as cookies are generally a strong fit for Texas cottage food workflows. Refrigerated fillings or meat additions change the analysis.",
    sourceUrl: TEXAS_DSHS_COTTAGE_FOOD_URL,
  },
  {
    slug: "cakes",
    category: "cakes",
    conditions: { shelfStableOnly: true },
    outcome: "allowed",
    explanation:
      "Cakes and cupcakes can fit cottage food rules when they remain shelf-stable. Cream cheese frostings, custards, or chilled fillings push the product into temperature-control concerns.",
    sourceUrl: TEXAS_DSHS_COTTAGE_FOOD_URL,
  },
  {
    slug: "brownies",
    category: "brownies",
    conditions: { shelfStableOnly: true },
    outcome: "allowed",
    explanation:
      "Brownies are typically allowed when they are shelf-stable and do not include prohibited meat, seafood, or cannabinoid ingredients.",
    sourceUrl: TEXAS_DSHS_COTTAGE_FOOD_URL,
  },
  {
    slug: "bread",
    category: "bread",
    conditions: { shelfStableOnly: true },
    outcome: "allowed",
    explanation:
      "Bread is usually an allowed category if it is shelf-stable and packaged to prevent contamination.",
    sourceUrl: TEXAS_DSHS_COTTAGE_FOOD_URL,
  },
  {
    slug: "jam",
    category: "jam",
    conditions: { shelfStableOnly: true },
    outcome: "allowed",
    explanation:
      "Jam and jelly are common cottage food products. The safer path is to use recognized home-preservation recipes and keep documentation for your batch process.",
    sourceUrl: TEXAS_DSHS_COTTAGE_FOOD_URL,
  },
  {
    slug: "jelly",
    category: "jelly",
    conditions: { shelfStableOnly: true },
    outcome: "allowed",
    explanation:
      "Jelly is usually suitable when made shelf-stable and packaged correctly. Recipe source matters for higher-risk preserved foods.",
    sourceUrl: TEXAS_DSHS_COTTAGE_FOOD_URL,
  },
  {
    slug: "candy",
    category: "candy",
    conditions: { shelfStableOnly: true },
    outcome: "allowed",
    explanation:
      "Candy is commonly allowed when it remains shelf-stable and avoids prohibited ingredients.",
    sourceUrl: TEXAS_DSHS_COTTAGE_FOOD_URL,
  },
  {
    slug: "granola",
    category: "granola",
    conditions: { shelfStableOnly: true },
    outcome: "allowed",
    explanation:
      "Granola is a common shelf-stable product. Confirm allergen labeling and ingredient order carefully.",
    sourceUrl: TEXAS_DSHS_COTTAGE_FOOD_URL,
  },
  {
    slug: "popcorn",
    category: "popcorn",
    conditions: { shelfStableOnly: true },
    outcome: "allowed",
    explanation:
      "Plain or flavored popcorn is typically allowed when it is shelf-stable and labeled correctly.",
    sourceUrl: TEXAS_DSHS_COTTAGE_FOOD_URL,
  },
  {
    slug: "pickles",
    category: "pickles",
    conditions: {
      manualReviewNotes: [
        "Use an approved recipe source or process authority.",
        "Track a batch identifier for pickled products.",
      ],
    },
    outcome: "manual_review",
    explanation:
      "Pickled and acidified foods need extra care in Texas. The state specifically points operators to approved recipe sources or an official determination path.",
    sourceUrl: TEXAS_DSHS_COTTAGE_FOOD_URL,
  },
  {
    slug: "salsa",
    category: "salsa",
    conditions: {
      manualReviewNotes: [
        "Many salsa products are acidified or temperature-sensitive.",
        "Use the official determination path when recipe safety is uncertain.",
      ],
    },
    outcome: "manual_review",
    explanation:
      "Salsa often needs recipe-level review because acidity and shelf stability vary widely.",
    sourceUrl: TEXAS_DSHS_COTTAGE_FOOD_URL,
  },
  {
    slug: "cheesecake",
    category: "cheesecake",
    conditions: { shelfStableOnly: false },
    outcome: "not_allowed",
    explanation:
      "Cheesecake generally requires temperature control, which means it should not be treated as a simple shelf-stable cottage food product.",
    sourceUrl: TEXAS_DSHS_COTTAGE_FOOD_URL,
  },
  {
    slug: "cream-pie",
    category: "cream pie",
    conditions: { shelfStableOnly: false },
    outcome: "not_allowed",
    explanation:
      "Cream pies are usually refrigerated products and fall outside the easiest low-risk cottage food path.",
    sourceUrl: TEXAS_DSHS_COTTAGE_FOOD_URL,
  },
];

export const prohibitedIngredients = [
  "meat",
  "chicken",
  "beef",
  "pork",
  "seafood",
  "fish",
  "shellfish",
  "raw milk",
  "cbd",
  "thc",
];

export const labelTemplates = [
  {
    key: "market-classic",
    name: "Market Classic",
    description: "Dense information layout for 3x4 and 4x6 sticker stock.",
  },
  {
    key: "bakery-soft",
    name: "Bakery Soft",
    description: "Warm type hierarchy for cookies, breads, and brownies.",
  },
  {
    key: "jar-band",
    name: "Jar Band",
    description: "Horizontal layout that works well for jam and jelly jars.",
  },
  {
    key: "minimal-block",
    name: "Minimal Block",
    description: "Simple compliance-first label with strong readability.",
  },
];

export const faqEntries = [
  {
    slug: "do-i-need-a-food-handler-card-for-texas-cottage-food-sales",
    question: "Do I need a food handler card for Texas cottage food sales?",
    answer:
      "Texas DSHS states that a cottage food operator must complete an accredited basic food safety education or training program for food handlers. If you already hold an accredited food manager certification, DSHS recognizes that where applicable.",
  },
  {
    slug: "texas-cottage-food-permit-vs-license",
    question: "Do I need a permit or license to sell cottage foods in Texas?",
    answer:
      "Texas DSHS says local health entities may not require a cottage food operation to obtain a permit or pay a fee to produce or sell directly to consumers or cottage food vendors. Some newer registration paths apply to TCS foods and certain vendor structures, so details matter.",
  },
  {
    slug: "texas-cottage-food-disclaimer-label",
    question: "What disclaimer belongs on a Texas cottage food label?",
    answer:
      "Texas requires the private-residence disclosure on the label. This app inserts that disclosure by default in the label generator so sellers do not need to remember it manually.",
  },
];
