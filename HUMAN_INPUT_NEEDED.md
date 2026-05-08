# HUMAN INPUT NEEDED

The app runs locally without third-party credentials by using:
- local email sign-in instead of Google OAuth
- mock checkout activation instead of live Stripe
- local lead capture persistence instead of live Resend delivery

For production-grade external integrations, provide:

## Google OAuth

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

Steps:
1. Create an OAuth client in Google Cloud Console.
2. Add the production callback URL: `/api/auth/callback/google`
3. Set both env vars in the deployment environment.

## Stripe

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_LABEL_PACK`
- `STRIPE_PRICE_PRO_MONTHLY`
- `STRIPE_PRICE_PRO_YEARLY`

Steps:
1. Create one-time and subscription products in Stripe.
2. Copy each Price ID into the matching env var.
3. Configure the webhook endpoint `/api/webhooks/stripe`.

## Resend

- `RESEND_API_KEY`
- `RESEND_FROM`

Steps:
1. Create and verify a sender domain in Resend.
2. Set the API key and verified sender address.

## Production App Settings

- `AUTH_SECRET`
- `AUTH_URL` or `NEXTAUTH_URL`
- `AUTH_INTERNAL_URL` or `NEXTAUTH_URL_INTERNAL` (optional but recommended for containerized proxy deployments)
- `NEXT_PUBLIC_APP_URL`
- `ADMIN_EMAILS`
- `DATABASE_URL`

Recommended production database:
- keep SQLite for a single-container deployment, using the baked-in `/data/app.db` path
- if you later move to multi-instance deployment, you will need an explicit database migration plan because the current app is implemented for SQLite

`AUTH_URL` / `NEXTAUTH_URL` guidance:
1. Set it to your public auth base, for example `https://your-domain.com/api/auth`.
2. Keep `NEXT_PUBLIC_APP_URL` aligned with the same public site origin.
3. For Docker or reverse-proxy deployments, set `AUTH_INTERNAL_URL` to the container loopback auth base, for example `http://127.0.0.1:3000/api/auth`, if your platform does not already provide a safe internal auth URL.
4. This prevents auth callback URLs from depending on internal bind hosts in some reverse-proxy deployments.
