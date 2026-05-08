import type { MetadataRoute } from "next";
import { headers } from "next/headers";

import { faqEntries } from "@/data/texasRules";
import { getOriginFromHeaders } from "@/lib/request-url";

export const dynamic = "force-dynamic";

const staticRoutes = [
  "",
  "/texas-cottage-food-law",
  "/texas-cottage-food-permit",
  "/texas-cottage-food-permit-vs-license",
  "/texas-cottage-food-label-template",
  "/farmers-market-food-label-texas",
  "/checker/product-eligibility",
  "/checker/selling-readiness",
  "/label-generator",
  "/pricing",
  "/can-i-sell-cake-under-texas-cottage-food-law",
  "/can-i-sell-jam-under-texas-cottage-food-law",
  "/can-i-sell-cookies-under-texas-cottage-food-law",
  "/can-i-sell-brownies-under-texas-cottage-food-law",
  "/disclaimer",
  "/privacy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getOriginFromHeaders(await headers());

  return [
    ...staticRoutes.map((route) => ({
      url: `${origin}${route}`,
      lastModified: new Date(),
    })),
    ...faqEntries.map((entry) => ({
      url: `${origin}/faq/${entry.slug}`,
      lastModified: new Date(),
    })),
  ];
}
