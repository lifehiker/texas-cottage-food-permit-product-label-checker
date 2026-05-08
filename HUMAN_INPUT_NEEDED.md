# HUMAN INPUT Needed

The app runs locally and in fallback mode without external credentials. Provide the following only if you want live production integrations instead of safe fallback behavior.

## Required for production security

- `AUTH_SECRET`
  - Generate a long random secret and set it in the deployment environment.
  - This should replace the Dockerfile placeholder value.

- `NEXT_PUBLIC_APP_URL`
  - Set this to the public base URL of the deployed app, for example `https://your-domain.com`.

## Optional live auth

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
  - Needed only if you want Google OAuth sign-in.
  - Without these, the app still supports the built-in email credentials sign-in flow.

## Optional live payments

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_LABEL_PACK`
- `STRIPE_PRICE_PRO_MONTHLY`
- `STRIPE_PRICE_PRO_YEARLY`
  - Needed only for real Stripe checkout and webhook fulfillment.
  - Without these, checkout uses the app's mock success fallback so the product remains testable.

## Optional live email delivery

- `RESEND_API_KEY`
- `RESEND_FROM`
  - Needed only for real transactional email sending.
  - Without these, lead capture still works and email send attempts fall back safely.

## Optional admin access

- `ADMIN_EMAILS`
  - Comma-separated list of email addresses allowed to access `/admin/rules`.

## Environment note

- Docker is installed in this environment, but `docker build .` could not be executed here because access to `/var/run/docker.sock` is denied. No additional app credential is needed for that; it is a machine permission issue.
