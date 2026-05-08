# FORGE Completion Audit

## Foundation

- Next.js 15 App Router scaffold with standalone output: [next.config.ts](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/next.config.ts:1)
- Shared visual shell, nav, footer, and custom styling: [src/app/layout.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/layout.tsx:1), [src/app/globals.css](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/globals.css:1), [src/components/layout/site-header.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/components/layout/site-header.tsx:1), [src/components/layout/site-footer.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/components/layout/site-footer.tsx:1)
- Deployment env template for zero-config plus optional integrations: [.env.example](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/.env.example:1)

## Data Model

- Prisma schema for users, auth, products, checks, labels, subscriptions, and leads: [prisma/schema.prisma](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/prisma/schema.prisma:1)
- Seeded rule and label-template records: [prisma/seed.ts](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/prisma/seed.ts:1), [src/data/texasRules.ts](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/data/texasRules.ts:1)

## Auth

- Auth.js / NextAuth setup with local credentials fallback, trusted reverse-proxy host handling, normalized public `/api/auth` URLs, and internal loopback auth URL support for containerized runtime requests: [src/auth.ts](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/auth.ts:1), [src/lib/env.ts](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/lib/env.ts:1), [src/app/api/auth/[...nextauth]/route.ts](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/api/auth/[...nextauth]/route.ts:1), [src/app/login/page.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/login/page.tsx:1), [src/components/auth/login-form.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/components/auth/login-form.tsx:1), [src/components/auth/sign-out-button.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/components/auth/sign-out-button.tsx:1), [src/app/api/session/login/route.ts](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/api/session/login/route.ts:1), [src/app/api/session/logout/route.ts](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/api/session/logout/route.ts:1)

## Core Workflows

- Eligibility rules engine and current-source citations: [src/lib/eligibility.ts](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/lib/eligibility.ts:1)
- Eligibility checker page, form, and persistence: [src/app/checker/product-eligibility/page.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/checker/product-eligibility/page.tsx:1), [src/components/checker/product-eligibility-form.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/components/checker/product-eligibility-form.tsx:1), [src/app/api/checks/eligibility/route.ts](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/api/checks/eligibility/route.ts:1)
- Selling-readiness checklist logic and persistence: [src/lib/readiness.ts](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/lib/readiness.ts:1), [src/app/checker/selling-readiness/page.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/checker/selling-readiness/page.tsx:1), [src/app/api/checks/readiness/route.ts](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/api/checks/readiness/route.ts:1)
- Label generator, templates, preview, PDF export, and saved labels: [src/app/label-generator/page.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/label-generator/page.tsx:1), [src/components/labels/label-generator-client.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/components/labels/label-generator-client.tsx:1), [src/components/labels/template-picker.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/components/labels/template-picker.tsx:1), [src/lib/pdf.ts](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/lib/pdf.ts:1), [src/app/api/labels/save/route.ts](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/api/labels/save/route.ts:1)
- Entitlements for free, one-time, and subscription access: [src/lib/entitlements.ts](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/lib/entitlements.ts:1)

## Billing, Email, And Storage Fallbacks

- Stripe lazy init and guarded checkout/webhook paths, including request-host-aware redirects instead of bind-host URLs: [src/lib/stripe.ts](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/lib/stripe.ts:1), [src/app/api/checkout/route.ts](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/api/checkout/route.ts:1), [src/app/api/webhooks/stripe/route.ts](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/api/webhooks/stripe/route.ts:1)
- Resend lazy init and fallback delivery handling: [src/lib/resend.ts](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/lib/resend.ts:1), [src/app/api/leads/route.ts](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/api/leads/route.ts:1)
- Local SQLite persistence and Prisma client: [src/lib/db.ts](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/lib/db.ts:1), [prisma/dev.db](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/prisma/dev.db:1)

## User-Facing Pages

- Landing page: [src/app/page.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/page.tsx:1)
- Law explainer: [src/app/texas-cottage-food-law/page.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/texas-cottage-food-law/page.tsx:1)
- Permit explainer: [src/app/texas-cottage-food-permit/page.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/texas-cottage-food-permit/page.tsx:1)
- Label template explainer: [src/app/texas-cottage-food-label-template/page.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/texas-cottage-food-label-template/page.tsx:1)
- Farmers market page: [src/app/farmers-market-food-label-texas/page.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/farmers-market-food-label-texas/page.tsx:1)
- Product long-tail pages: [src/app/can-i-sell-jam-under-texas-cottage-food-law/page.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/can-i-sell-jam-under-texas-cottage-food-law/page.tsx:1), [src/app/can-i-sell-cookies-under-texas-cottage-food-law/page.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/can-i-sell-cookies-under-texas-cottage-food-law/page.tsx:1), [src/app/can-i-sell-brownies-under-texas-cottage-food-law/page.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/can-i-sell-brownies-under-texas-cottage-food-law/page.tsx:1)
- FAQ routes: [src/app/faq/[slug]/page.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/faq/[slug]/page.tsx:1)
- Pricing page: [src/app/pricing/page.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/pricing/page.tsx:1)
- Dashboard: [src/app/dashboard/page.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/dashboard/page.tsx:1)
- Legal pages: [src/app/disclaimer/page.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/disclaimer/page.tsx:1), [src/app/privacy/page.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/privacy/page.tsx:1), [src/app/terms/page.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/terms/page.tsx:1)

## Admin

- Protected rules viewer with admin-email guard and route-based updates that avoid server-action deployment drift and use route-handler redirects instead of App Router redirect throws: [src/app/admin/rules/page.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/admin/rules/page.tsx:1), [src/app/api/admin/rules/[id]/route.ts](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/api/admin/rules/[id]/route.ts:1)

## SEO

- Metadata, sitemap, robots, and FAQ schema with live host-derived canonical origin handling that ignores unroutable bind hosts like `0.0.0.0`: [src/app/layout.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/layout.tsx:1), [src/app/sitemap.ts](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/sitemap.ts:1), [src/app/robots.ts](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/robots.ts:1), [src/lib/request-url.ts](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/lib/request-url.ts:1), [src/components/seo/faq-schema.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/components/seo/faq-schema.tsx:1)

## Deployment

- Production Docker image for standalone Next.js output with `npm ci --ignore-scripts`, Prisma generate/build separation, SQLite `/data/app.db` runtime init, full `node_modules` copy for Prisma CLI, explicit `AUTH_TRUST_HOST` runtime support, and `NEXTAUTH_URL_INTERNAL` loopback auth requests for containerized deployments: [Dockerfile](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/Dockerfile:1), [.dockerignore](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/.dockerignore:1), [prisma/schema.prisma](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/prisma/schema.prisma:1), [.env.example](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/.env.example:1)

## UI Polish

- Primary CTA links now reuse button styling without invalid nested interactive elements, which keeps the marketing and dashboard routes browser-safe while preserving the existing visual language: [src/components/ui/button.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/components/ui/button.tsx:1), [src/components/layout/site-header.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/components/layout/site-header.tsx:1), [src/app/page.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/page.tsx:1), [src/app/dashboard/page.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/dashboard/page.tsx:1), [src/app/texas-cottage-food-law/page.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/texas-cottage-food-law/page.tsx:1), [src/app/texas-cottage-food-label-template/page.tsx](/opt/forge-builds/texas-cottage-food-permit-product-label-checker/src/app/texas-cottage-food-label-template/page.tsx:1)

## Intentionally Deferred External-Credential Items

- Live Google OAuth requires `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`. The app still runs because local credentials sign-in is enabled.
- Public canonical auth URLs in some proxy setups are safest when `AUTH_URL` or `NEXTAUTH_URL` is set to the production `/api/auth` origin. The app still runs without it because local credentials sign-in and internal loopback auth requests work, but explicit env configuration is recommended for production auth callbacks.
- Live Stripe checkout and webhooks require Stripe secrets and price IDs. The app still runs because checkout falls back to local mock plan activation.
- Live email delivery requires Resend credentials. The app still runs because lead capture persists locally and email sending degrades safely.
- `docker build .` could not be executed end-to-end in this workspace because the Docker daemon socket was not accessible. The Dockerfile itself was updated to match the verified standalone/Prisma deployment contract.
