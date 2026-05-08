import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { env } from "@/lib/env";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  const email = session?.user?.email?.toLowerCase();

  if (!email || !env.adminEmails.includes(email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const outcome = String(formData.get("outcome") || "");
  const conditionsJson = String(formData.get("conditionsJson") || "");

  try {
    JSON.parse(conditionsJson);
  } catch {
    return NextResponse.json({ error: "Conditions JSON must be valid JSON." }, { status: 400 });
  }

  const { id } = await params;

  await db.eligibilityRule.update({
    where: { id },
    data: {
      outcome,
      conditionsJson,
    },
  });

  redirect("/admin/rules?updated=1");
}
