import { NextResponse } from "next/server";
import { z } from "zod";

import { signIn } from "@/auth";
import { hasGoogleAuth } from "@/lib/env";
import { toRelativeAppRedirect } from "@/lib/request-url";

const schema = z.discriminatedUnion("provider", [
  z.object({
    provider: z.literal("credentials"),
    email: z.string().email(),
    name: z.string().optional(),
    redirectTo: z.string().default("/dashboard"),
  }),
  z.object({
    provider: z.literal("google"),
    redirectTo: z.string().default("/dashboard"),
  }),
]);

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Invalid login payload.",
        issues: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const payload = parsed.data;
  if (payload.provider === "google" && !hasGoogleAuth()) {
    return NextResponse.json(
      { message: "Google sign-in is not configured for this deployment." },
      { status: 400 },
    );
  }

  const redirectUrl =
    payload.provider === "credentials"
      ? await signIn("credentials", {
          email: payload.email,
          name: payload.name,
          redirect: false,
          redirectTo: payload.redirectTo,
        })
      : await signIn("google", {
          redirect: false,
          redirectTo: payload.redirectTo,
        });

  return NextResponse.json({
    redirectUrl: toRelativeAppRedirect(redirectUrl, payload.redirectTo),
  });
}
