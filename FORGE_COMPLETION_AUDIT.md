# FORGE Completion Audit

Last updated: 2026-05-09

This audit maps the major PRD requirements to concrete implementation files, routes, and behaviors.

## Foundation and deploy

- Standalone Next.js output
  - `next.config.ts`
  - `package.json`

- Production Docker runtime with Prisma schema sync on startup
  - `Dockerfile`
  - Includes standalone output, `.next/static`, `public/`, Prisma files, targeted Prisma runtime dependencies, removal of build-time `.env`, and runtime DB push on container start

- Prisma schema and seed data
  - `prisma/schema.prisma`
  - `prisma/seed.ts`

## Data model

- Auth and user records
  - `prisma/schema.prisma`
  - Models: `User`, `Account`, `Session`, `VerificationToken`

- Product, checks, labels, subscriptions, admin rules, leads, analytics
  - `prisma/schema.prisma`
  - Models: `Product`, `EligibilityRule`, `EligibilityCheck`, `ReadinessChecklist`, `LabelTemplate`, `SavedLabel`, `Subscription`, `EmailLead`, `AnalyticsEvent`

## Auth

- NextAuth v5 configuration with Prisma adapter and credential fallback
  - `src/auth.ts`
  - `src/types/next-auth.d.ts`

- Login and logout flows
  - Route: `/login`
  - API: `/api/session/login`
  - API: `/api/session/logout`
  - Files:
    - `src/app/login/page.tsx`
    - `src/components/auth/login-form.tsx`
    - `src/components/auth/sign-out-button.tsx`
    - `src/app/api/session/login/route.ts`
    - `src/app/api/session/logout/route.ts`

## Core workflows

- Product eligibility checker
  - Route: `/checker/product-eligibility`
  - API: `/api/checks/eligibility`
  - Logic:
    - `src/lib/eligibility.ts`
    - `src/data/texasRules.ts`
  - UI:
    - `src/app/checker/product-eligibility/page.tsx`
    - `src/components/checker/product-eligibility-form.tsx`
    - `src/components/checker/eligibility-result-card.tsx`

- Selling-readiness checklist
  - Route: `/checker/selling-readiness`
  - API: `/api/checks/readiness`
  - Logic:
    - `src/lib/readiness.ts`
  - UI:
    - `src/app/checker/selling-readiness/page.tsx`
    - `src/components/checker/readiness-form.tsx`
    - `src/components/checker/readiness-results.tsx`

- Texas label generator with PDF export and save path
  - Route: `/label-generator`
  - API: `/api/labels/save`
  - Files:
    - `src/app/label-generator/page.tsx`
    - `src/components/labels/label-generator-client.tsx`
    - `src/components/labels/label-preview.tsx`
    - `src/components/labels/template-picker.tsx`
    - `src/lib/pdf.ts`
    - `src/data/texasRules.ts`

- Citations and plain-English why explanations
  - `src/lib/eligibility.ts`
  - `src/data/texasRules.ts`
  - `src/components/checker/eligibility-result-card.tsx`

## Secondary workflows

- Dashboard with saved products, saved labels, recent checks, billing summary
  - Route: `/dashboard`
  - Files:
    - `src/app/dashboard/page.tsx`
    - `src/components/dashboard/saved-products-table.tsx`
    - `src/components/dashboard/saved-labels-table.tsx`
    - `src/components/dashboard/checkout-button.tsx`

- Usage limits and entitlement logic
  - `src/lib/usage-limits.ts`
  - `src/lib/entitlements.ts`

- Lead capture
  - API: `/api/leads`
  - UI:
    - `src/components/forms/lead-capture-form.tsx`
  - Files:
    - `src/app/api/leads/route.ts`

- Billing
  - API: `/api/checkout`
  - API: `/api/webhooks/stripe`
  - Files:
    - `src/app/api/checkout/route.ts`
    - `src/app/api/webhooks/stripe/route.ts`
    - `src/lib/stripe.ts`

- Email
  - `src/lib/resend.ts`
  - `src/app/api/leads/route.ts`

- Admin rule config
  - Route: `/admin/rules`
  - API: `/api/admin/rules/[id]`
  - Files:
    - `src/app/admin/rules/page.tsx`
    - `src/app/api/admin/rules/[id]/route.ts`

## Marketing and SEO pages

- Home
  - Route: `/`
  - `src/app/page.tsx`

- Law / permit / label explainer pages
  - Routes:
    - `/texas-cottage-food-law`
    - `/texas-cottage-food-permit`
    - `/texas-cottage-food-permit-vs-license`
    - `/texas-cottage-food-label-template`
    - `/farmers-market-food-label-texas`
  - Files:
    - `src/app/texas-cottage-food-law/page.tsx`
    - `src/app/texas-cottage-food-permit/page.tsx`
    - `src/app/texas-cottage-food-permit-vs-license/page.tsx`
    - `src/app/texas-cottage-food-label-template/page.tsx`
    - `src/app/farmers-market-food-label-texas/page.tsx`

- Long-tail product pages
  - Routes:
    - `/can-i-sell-jam-under-texas-cottage-food-law`
    - `/can-i-sell-cookies-under-texas-cottage-food-law`
    - `/can-i-sell-brownies-under-texas-cottage-food-law`
    - `/can-i-sell-cake-under-texas-cottage-food-law`
  - Files:
    - `src/app/can-i-sell-jam-under-texas-cottage-food-law/page.tsx`
    - `src/app/can-i-sell-cookies-under-texas-cottage-food-law/page.tsx`
    - `src/app/can-i-sell-brownies-under-texas-cottage-food-law/page.tsx`
    - `src/app/can-i-sell-cake-under-texas-cottage-food-law/page.tsx`

- FAQ and legal pages
  - Routes:
    - `/faq/[slug]`
    - `/disclaimer`
    - `/privacy`
    - `/terms`
  - Files:
    - `src/app/faq/[slug]/page.tsx`
    - `src/app/disclaimer/page.tsx`
    - `src/app/privacy/page.tsx`
    - `src/app/terms/page.tsx`

- Site-wide metadata and SEO plumbing
  - `src/app/layout.tsx`
  - `src/app/sitemap.ts`
  - `src/app/robots.ts`
  - `src/components/seo/faq-schema.tsx`
  - `src/data/siteContent.ts`

- Responsive header navigation for mobile and desktop
  - `src/components/layout/site-header.tsx`

## Safe fallbacks for unavailable external services

- No Google OAuth credentials
  - Fallback: credentials-based sign-in remains available
  - File: `src/auth.ts`

- No Stripe credentials
  - Fallback: checkout creates a mock active subscription path for testing
  - File: `src/app/api/checkout/route.ts`

- No Resend credentials
  - Fallback: email send returns `local-fallback` without breaking lead capture
  - File: `src/lib/resend.ts`

- No network dependency during build
  - Confirmed by code review of font usage and lazy SDK init
  - Files:
    - `src/app/globals.css`
    - `src/lib/stripe.ts`
    - `src/lib/resend.ts`

## Verification completed

- `npm run lint`
  - Passed cleanly after fixing the anonymous default export warning in `eslint.config.mjs`

- `npm run build`
  - Passed successfully from a clean `.next` directory
  - Confirmed standalone output exists at `.next/standalone/server.js`
  - Re-ran successfully after Dockerfile hardening changes

- Dev server smoke test
  - `npm run dev` started successfully
  - Verified it serves correctly on `http://127.0.0.1:3001`
  - Verified `200` responses for primary routes:
    - `/`
    - `/texas-cottage-food-law`
    - `/texas-cottage-food-permit`
    - `/texas-cottage-food-permit-vs-license`
    - `/texas-cottage-food-label-template`
    - `/checker/product-eligibility`
    - `/checker/selling-readiness`
    - `/label-generator`
    - `/pricing`
    - `/dashboard`
    - long-tail and FAQ routes
    - confirmed FAQ slug: `/faq/do-i-need-a-food-handler-card-for-texas-cottage-food-sales`

- Interactive API smoke tests
  - Eligibility API returned an allowed result for a cookie test payload
  - Readiness API returned checklist items and summary for a market test payload
  - Leads API returned `{"ok":true}`
  - Save-label and checkout endpoints correctly returned `401` when unauthenticated
  - Credentials login created a valid session cookie
  - Mock checkout returned a dashboard redirect for an authenticated user when Stripe keys were absent
  - Save-label succeeded for an authenticated user with mocked paid access

- Production server smoke test
  - `npm run start` launched successfully from `.next/standalone/server.js`
  - Verified `200` on `/`
  - Verified `200` on `/checker/product-eligibility`, `/checker/selling-readiness`, `/label-generator`, and `/dashboard`
  - Re-verified on a fresh process using `PORT=3002 npm run start`
  - Verified production API responses for eligibility, lead capture, login, mock checkout, and label save

## Intentionally deferred external-credential items

- Live Google OAuth sign-in
  - Deferred only until `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are provided
  - App still runs because credentials sign-in is built in

- Live Stripe checkout and webhook fulfillment
  - Deferred only until Stripe keys and price ids are provided
  - App still runs because checkout has a mock success fallback

- Live transactional email delivery through Resend
  - Deferred only until Resend credentials are provided
  - App still runs because lead capture and server paths degrade safely

- `docker build .` execution in this environment
  - Blocked by Docker daemon permissions, not by application code
  - Error seen: `permission denied while trying to connect to the docker API at unix:///var/run/docker.sock`
