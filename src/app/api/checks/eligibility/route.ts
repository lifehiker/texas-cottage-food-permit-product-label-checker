import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { evaluateEligibility } from "@/lib/eligibility";
import { trackServerEvent } from "@/lib/analytics";
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
  const payload = schema.parse(await request.json());
  await trackServerEvent("checker_started", {
    type: "eligibility",
    category: payload.productCategory,
  });
  const result = evaluateEligibility({
    ...payload,
    ingredients: parseCsvLine(payload.ingredients),
  });

  await db.eligibilityCheck.create({
    data: {
      userId: session?.user?.id,
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

  if (session?.user?.id) {
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
  });

  return NextResponse.json({ result });
}
