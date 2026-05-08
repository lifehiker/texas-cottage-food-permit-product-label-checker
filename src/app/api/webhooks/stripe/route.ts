import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { trackServerEvent } from "@/lib/analytics";
import { env } from "@/lib/env";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe || !env.stripeWebhookSecret) {
    return NextResponse.json({ ok: true, mode: "noop" });
  }

  const requestHeaders = await headers();
  const signature = requestHeaders.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ message: "Missing signature." }, { status: 400 });
  }

  const body = await request.text();
  const event = stripe.webhooks.constructEvent(body, signature, env.stripeWebhookSecret);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.userId;
    const planKey = session.metadata?.planKey;

    if (userId && planKey) {
      await db.subscription.create({
        data: {
          userId,
          status: "active",
          planKey,
          stripeSessionId: session.id,
          stripeCustomerId: typeof session.customer === "string" ? session.customer : null,
        },
      });
      await trackServerEvent("purchase_completed", {
        userId,
        planKey,
        mode: "stripe",
      });
    }
  }

  return NextResponse.json({ ok: true });
}
