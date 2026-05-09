import { db } from "@/lib/db";
import { labelTemplates, texasRules } from "@/data/texasRules";

export async function ensureAdminSeedData() {
  const [ruleCount, templateCount] = await Promise.all([
    db.eligibilityRule.count(),
    db.labelTemplate.count(),
  ]);

  if (ruleCount === 0) {
    await db.$transaction(
      texasRules.map((rule) =>
        db.eligibilityRule.create({
          data: {
            slug: rule.slug,
            category: rule.category,
            conditionsJson: JSON.stringify(rule.conditions),
            outcome: rule.outcome,
            explanationMd: rule.explanation,
            sourceUrl: rule.sourceUrl,
          },
        }),
      ),
    );
  }

  if (templateCount === 0) {
    await db.$transaction(
      labelTemplates.map((template) =>
        db.labelTemplate.create({
          data: {
            key: template.key,
            name: template.name,
            description: template.description,
            layoutJson: JSON.stringify(template),
          },
        }),
      ),
    );
  }
}
