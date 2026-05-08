import { PrismaClient } from "@prisma/client";

import { labelTemplates, texasRules } from "../src/data/texasRules";

const prisma = new PrismaClient();

async function main() {
  for (const rule of texasRules) {
    await prisma.eligibilityRule.upsert({
      where: { slug: rule.slug },
      create: {
        slug: rule.slug,
        category: rule.category,
        conditionsJson: JSON.stringify(rule.conditions),
        outcome: rule.outcome,
        explanationMd: rule.explanation,
        sourceUrl: rule.sourceUrl,
      },
      update: {
        category: rule.category,
        conditionsJson: JSON.stringify(rule.conditions),
        outcome: rule.outcome,
        explanationMd: rule.explanation,
        sourceUrl: rule.sourceUrl,
      },
    });
  }

  for (const template of labelTemplates) {
    await prisma.labelTemplate.upsert({
      where: { key: template.key },
      create: {
        key: template.key,
        name: template.name,
        description: template.description,
        layoutJson: JSON.stringify(template),
      },
      update: {
        name: template.name,
        description: template.description,
        layoutJson: JSON.stringify(template),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
