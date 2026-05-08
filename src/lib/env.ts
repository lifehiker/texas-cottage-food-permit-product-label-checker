const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  authSecret: process.env.AUTH_SECRET || "dev-local-secret-change-me",
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  resendApiKey: process.env.RESEND_API_KEY,
  resendFrom: process.env.RESEND_FROM || "Texas Cottage Food Checker <onboarding@example.com>",
  adminEmails: (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean),
};

export function hasGoogleAuth() {
  return Boolean(env.googleClientId && env.googleClientSecret);
}

export function hasStripe() {
  return Boolean(env.stripeSecretKey);
}

export function hasResend() {
  return Boolean(env.resendApiKey);
}

export { env };
