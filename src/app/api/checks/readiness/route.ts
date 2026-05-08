import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { trackServerEvent } from "@/lib/analytics";
import { db } from "@/lib/db";
import { getUserAccess } from "@/lib/entitlements";
import { buildReadinessChecklist } from "@/lib/readiness";
import { getAnonymousUsage, getUserUsage, incrementAnonymousUsage } from "@/lib/usage-limits";

const schema = z.object({
  sellerName: z.string().optional().default("Seller"),
  salesChannels: z.array(z.string()).default([]),
  packagingReady: z.boolean().default(false),
  labelReady: z.boolean().default(false),
  marketIntent: z.boolean().default(false),
});

export async function POST(request: Request) {
  const session = await auth();
  const access = await getUserAccess(session?.user?.id);
  const cookieStore = await cookies();
  const usage = session?.user?.id
    ? access.hasUnlimitedCheckers
      ? null
      : await getUserUsage(session.user.id, "readiness")
    : getAnonymousUsage(cookieStore, "readiness");

  if (usage && !usage.allowed) {
    return NextResponse.json(
      {
        message: `Free users can generate ${usage.limit} readiness checklist per month. Upgrade to continue.`,
      },
      { status: 403 },
    );
  }

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Invalid readiness payload.",
        issues: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const payload = parsed.data;
  await trackServerEvent("checker_started", { type: "readiness" });
  const result = buildReadinessChecklist(payload);

  await db.readinessChecklist.create({
    data: {
      userId: access.canSave ? session?.user?.id : null,
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

  const response = NextResponse.json(result);
  if (!session?.user?.id) {
    incrementAnonymousUsage(cookieStore, response.cookies, "readiness");
  }

  return response;
}
