import type { MetadataRoute } from "next";
import { headers } from "next/headers";

import { getOriginFromHeaders } from "@/lib/request-url";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const origin = getOriginFromHeaders(await headers());

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${origin}/sitemap.xml`,
  };
}
