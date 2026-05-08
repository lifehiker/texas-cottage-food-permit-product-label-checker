import { Resend } from "resend";

import { env, hasResend } from "@/lib/env";

let resendInstance: Resend | null = null;

function getResend() {
  if (!hasResend()) {
    return null;
  }

  if (!resendInstance) {
    resendInstance = new Resend(env.resendApiKey);
  }

  return resendInstance;
}

export async function sendTransactionalEmail(args: {
  to: string;
  subject: string;
  html: string;
}) {
  const resend = getResend();
  if (!resend) {
    return { delivered: false, mode: "local-fallback" as const };
  }

  await resend.emails.send({
    from: env.resendFrom,
    to: args.to,
    subject: args.subject,
    html: args.html,
  });

  return { delivered: true, mode: "resend" as const };
}
