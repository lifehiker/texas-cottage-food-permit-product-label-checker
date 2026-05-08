import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { trackServerEvent } from "@/lib/analytics";
import { db } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { env } from "@/lib/env";

const schema = z.object({
  planKey: z.enum(["label_pack_29", "seller_pro_monthly_12", "seller_pro_yearly_99"]),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ message: "Sign in before checkout." }, { status: 401 });
  }

  const { planKey } = schema.parse(await request.json());
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
      redirectUrl: `${env.appUrl}/dashboard?purchase=mock-success`,
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
    success_url: `${env.appUrl}/dashboard?purchase=success`,
    cancel_url: `${env.appUrl}/pricing?purchase=cancelled`,
    metadata: {
      userId: session.user.id,
      planKey,
    },
  });

  return NextResponse.json({ mode: "stripe", redirectUrl: sessionResponse.url });
}
