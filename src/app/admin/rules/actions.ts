"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { env } from "@/lib/env";

export async function updateRuleConditions(formData: FormData) {
  const session = await auth();
  const email = session?.user?.email?.toLowerCase();
  if (!email || !env.adminEmails.includes(email)) {
    throw new Error("Unauthorized");
  }

  const id = String(formData.get("id"));
  const outcome = String(formData.get("outcome"));
  const conditionsJson = String(formData.get("conditionsJson"));

  JSON.parse(conditionsJson);

  await db.eligibilityRule.update({
    where: { id },
    data: {
      outcome,
      conditionsJson,
    },
  });

  revalidatePath("/admin/rules");
}
