import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { trackServerEvent } from "@/lib/analytics";
import { db } from "@/lib/db";
import { getOriginFromHeaders } from "@/lib/request-url";
import { getStripe } from "@/lib/stripe";

const schema = z.object({
  planKey: z.enum(["label_pack_29", "seller_pro_monthly_12", "seller_pro_yearly_99"]),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ message: "Sign in before checkout." }, { status: 401 });
  }

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Invalid checkout payload.",
        issues: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const { planKey } = parsed.data;
  const origin = getOriginFromHeaders(await headers());
  await trackServerEvent("checkout_started", {
    userId: session.user.id,
    planKey,
  });
  const stripe = getStripe();

  if (!stripe) {
    await db.subscription.create({
      data: {
        userId: session.user.id,
        status: "active",
        planKey,
      },
    });

    await trackServerEvent("purchase_completed", {
      userId: session.user.id,
      planKey,
      mode: "mock",
    });

    return NextResponse.json({
      mode: "mock",
      redirectUrl: `${origin}/dashboard?purchase=mock-success`,
    });
  }

  const priceLookup: Record<string, string | undefined> = {
    label_pack_29: process.env.STRIPE_PRICE_LABEL_PACK,
    seller_pro_monthly_12: process.env.STRIPE_PRICE_PRO_MONTHLY,
    seller_pro_yearly_99: process.env.STRIPE_PRICE_PRO_YEARLY,
  };

  const price = priceLookup[planKey];
  if (!price) {
    return NextResponse.json({ message: "Stripe price id missing." }, { status: 400 });
  }

  const sessionResponse = await stripe.checkout.sessions.create({
    mode: planKey === "label_pack_29" ? "payment" : "subscription",
    customer_email: session.user.email,
    line_items: [{ price, quantity: 1 }],
    success_url: `${origin}/dashboard?purchase=success`,
    cancel_url: `${origin}/pricing?purchase=cancelled`,
    metadata: {
      userId: session.user.id,
      planKey,
    },
  });

  return NextResponse.json({ mode: "stripe", redirectUrl: sessionResponse.url });
}
