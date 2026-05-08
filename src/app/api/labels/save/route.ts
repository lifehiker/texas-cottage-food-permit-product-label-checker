import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { trackServerEvent } from "@/lib/analytics";
import { db } from "@/lib/db";
import { getUserAccess } from "@/lib/entitlements";

const schema = z.object({
  businessName: z.string(),
  productName: z.string(),
  ingredients: z.string(),
  allergens: z.string(),
  netWeight: z.string(),
  addressLine: z.string(),
  disclosure: z.string(),
  templateKey: z.string(),
});

export async function POST(request: Request) {
  const session = await auth();
  const access = await getUserAccess(session?.user?.id);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Sign in to save labels." }, { status: 401 });
  }

  if (!access.canSave) {
    return NextResponse.json({ message: "Saving is not available on the current plan." }, { status: 403 });
  }

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Invalid label payload.",
        issues: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const payload = parsed.data;

  await db.savedLabel.create({
    data: {
      userId: session.user.id,
      templateKey: payload.templateKey,
      labelJson: JSON.stringify(payload),
    },
  });

  await trackServerEvent("label_previewed", {
    templateKey: payload.templateKey,
    saved: true,
    userId: session.user.id,
  });

  return NextResponse.json({ message: "Label saved to your dashboard." });
}
