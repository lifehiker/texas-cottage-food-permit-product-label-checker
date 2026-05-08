import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import { trackServerEvent } from "@/lib/analytics";
import { sendTransactionalEmail } from "@/lib/resend";

const schema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  source: z.string().default("site"),
});

export async function POST(request: Request) {
  const payload = schema.parse(await request.json());

  await db.emailLead.upsert({
    where: { email: payload.email.toLowerCase() },
    create: {
      email: payload.email.toLowerCase(),
      name: payload.name,
      source: payload.source,
    },
    update: {
      name: payload.name,
      source: payload.source,
    },
  });

  await sendTransactionalEmail({
    to: payload.email,
    subject: "Your Texas cottage food checklist",
    html: "<p>Thanks for signing up. Your saved checklist and product updates will arrive here when configured.</p>",
  });

  await trackServerEvent("email_captured", {
    source: payload.source,
    email: payload.email.toLowerCase(),
  });

  return NextResponse.json({ ok: true });
}
