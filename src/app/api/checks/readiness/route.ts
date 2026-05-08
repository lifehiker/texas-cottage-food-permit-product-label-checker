import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { trackServerEvent } from "@/lib/analytics";
import { db } from "@/lib/db";
import { buildReadinessChecklist } from "@/lib/readiness";

const schema = z.object({
  sellerName: z.string().optional().default("Seller"),
  salesChannels: z.array(z.string()).default([]),
  packagingReady: z.boolean().default(false),
  labelReady: z.boolean().default(false),
  marketIntent: z.boolean().default(false),
});

export async function POST(request: Request) {
  const session = await auth();
  const payload = schema.parse(await request.json());
  await trackServerEvent("checker_started", { type: "readiness" });
  const result = buildReadinessChecklist(payload);

  await db.readinessChecklist.create({
    data: {
      userId: session?.user?.id,
      sellerName: payload.sellerName,
      salesChannelsJson: JSON.stringify(payload.salesChannels),
      packagingReady: payload.packagingReady,
      labelReady: payload.labelReady,
      marketIntent: payload.marketIntent,
      checklistItemsJson: JSON.stringify(result.items),
      summary: result.summary,
    },
  });

  await trackServerEvent("checker_completed", {
    type: "readiness",
    incompleteCount: result.items.filter((item) => item.status === "incomplete").length,
  });

  return NextResponse.json(result);
}
