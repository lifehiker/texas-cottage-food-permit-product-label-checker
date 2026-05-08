import type { MetadataRoute } from "next";

import { env } from "@/lib/env";
import { faqEntries } from "@/data/texasRules";

const staticRoutes = [
  "",
  "/texas-cottage-food-law",
  "/texas-cottage-food-permit",
  "/texas-cottage-food-label-template",
  "/farmers-market-food-label-texas",
  "/checker/product-eligibility",
  "/checker/selling-readiness",
  "/label-generator",
  "/pricing",
  "/can-i-sell-jam-under-texas-cottage-food-law",
  "/can-i-sell-cookies-under-texas-cottage-food-law",
  "/can-i-sell-brownies-under-texas-cottage-food-law",
  "/disclaimer",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((route) => ({
      url: `${env.appUrl}${route}`,
      lastModified: new Date(),
    })),
    ...faqEntries.map((entry) => ({
      url: `${env.appUrl}/faq/${entry.slug}`,
      lastModified: new Date(),
    })),
  ];
}
