function normalizeOriginUrl(value?: string) {
  if (!value) {
    return "http://localhost:3000";
  }

  try {
    const url = new URL(value);
    return url.origin;
  } catch {
    return "http://localhost:3000";
  }
}

function normalizeAuthUrl(value?: string) {
  if (!value) {
    return undefined;
  }

  try {
    const url = new URL(value);
    if (url.pathname === "/" || !url.pathname) {
      url.pathname = "/api/auth";
    }

    return url.toString().replace(/\/$/, "");
  } catch {
    return undefined;
  }
}

function defaultInternalAuthUrl() {
  const port = process.env.PORT || "3000";
  return `http://127.0.0.1:${port}/api/auth`;
}

const env = {
  appUrl: normalizeOriginUrl(
    process.env.NEXT_PUBLIC_APP_URL || process.env.AUTH_URL || process.env.NEXTAUTH_URL,
  ),
  authUrl: normalizeAuthUrl(
    process.env.AUTH_URL || process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL,
  ),
  internalAuthUrl:
    normalizeAuthUrl(process.env.AUTH_INTERNAL_URL || process.env.NEXTAUTH_URL_INTERNAL) ||
    defaultInternalAuthUrl(),
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
