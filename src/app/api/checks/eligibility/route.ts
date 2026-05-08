import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { evaluateEligibility } from "@/lib/eligibility";
import { trackServerEvent } from "@/lib/analytics";
import { getUserAccess } from "@/lib/entitlements";
import { getAnonymousUsage, getUserUsage, incrementAnonymousUsage } from "@/lib/usage-limits";
import { parseCsvLine } from "@/lib/utils";

const schema = z.object({
  sellerName: z.string().optional(),
  productCategory: z.string().min(2),
  ingredients: z.string().min(2),
  shelfStable: z.boolean(),
  needsRefrigeration: z.boolean(),
  salesChannel: z.enum(["direct", "farmers_market", "pickup", "online_delivery", "other"]),
});

export async function POST(request: Request) {
  const session = await auth();
  const access = await getUserAccess(session?.user?.id);
  const cookieStore = await cookies();
  const usage = session?.user?.id
    ? access.hasUnlimitedCheckers
      ? null
      : await getUserUsage(session.user.id, "eligibility")
    : getAnonymousUsage(cookieStore, "eligibility");

  if (usage && !usage.allowed) {
    return NextResponse.json(
      {
        message: `Free users can run ${usage.limit} eligibility checks per month. Upgrade to continue.`,
      },
      { status: 403 },
    );
  }

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Invalid eligibility payload.",
        issues: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const payload = parsed.data;
  await trackServerEvent("checker_started", {
    type: "eligibility",
    category: payload.productCategory,
  });
  const result = evaluateEligibility({
    ...payload,
    ingredients: parseCsvLine(payload.ingredients),
  });

  const eligibilityCheck = await db.eligibilityCheck.create({
    data: {
      userId: access.canSave ? session?.user?.id : null,
      sellerName: payload.sellerName,
      productCategory: payload.productCategory,
      ingredientsJson: JSON.stringify(parseCsvLine(payload.ingredients)),
      shelfStable: payload.shelfStable,
      needsRefrigeration: payload.needsRefrigeration,
      salesChannel: payload.salesChannel,
      resultStatus: result.status,
      resultTitle: result.title,
      resultExplanation: result.explanation,
      nextStepsJson: JSON.stringify(result.nextSteps),
      citationsJson: JSON.stringify(result.citations),
    },
  });

  if (session?.user?.id && access.canSave) {
    await db.product.create({
      data: {
        userId: session.user.id,
        name: payload.productCategory,
        category: payload.productCategory.toLowerCase(),
        ingredientsJson: JSON.stringify(parseCsvLine(payload.ingredients)),
        shelfStable: payload.shelfStable,
        resultStatus: result.status,
        notes: result.explanation,
      },
    });
  }

  await trackServerEvent("checker_completed", {
    type: "eligibility",
    category: payload.productCategory,
    status: result.status,
    eligibilityCheckId: eligibilityCheck.id,
  });

  const response = NextResponse.json({ result });
  if (!session?.user?.id) {
    incrementAnonymousUsage(cookieStore, response.cookies, "eligibility");
  }

  return response;
}
