import { NextResponse } from "next/server";

import { signOut } from "@/auth";
import { toRelativeAppRedirect } from "@/lib/request-url";

export async function POST() {
  const redirectUrl = await signOut({
    redirect: false,
    redirectTo: "/",
  });

  return NextResponse.json({ redirectUrl: toRelativeAppRedirect(redirectUrl, "/") });
}
