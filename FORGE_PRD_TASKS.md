# FORGE PRD Tasks

Last updated: 2026-05-08 (standalone deployment verification)

Status legend: `[x]` complete, `[-]` in progress, `[ ]` pending

## Foundation

- [x] Review `PRD.md` and `BUILD_INSTRUCTIONS.md` end-to-end and map requirements to implementation.
- [x] Confirm Next.js 15 deployment-safe patterns from current installed package behavior and build constraints.
- [x] Verify project structure, shared UI system, global styling, SEO metadata baseline, and environment guards.
- [x] Verify Docker/build configuration for standalone Next.js deployment.
- [x] Align the package start command with Next.js standalone output so `npm start` matches production runtime behavior.

## Data Model

- [x] Verify Prisma schema covers users, products, eligibility checks, readiness checklists, saved labels, templates, subscriptions, leads, analytics, and admin rules.
- [x] Verify seed/dev database support for local development and safe fallback operation without external services.
- [x] Verify data persistence paths used by all authenticated workflows.

## Auth

- [x] Verify NextAuth v5 credentials sign-in flow.
- [x] Verify optional Google OAuth path is guarded when credentials are missing.
- [x] Fix host/origin trust behavior for production and proxy deployments, including internal auth base URL handling for containerized runtime requests.
- [x] Verify protected routes: dashboard, label save, checkout, admin rules.

## Core User-Facing Pages

- [x] Home landing page `/`
- [x] Law explainer `/texas-cottage-food-law`
- [x] Permit/license explainer `/texas-cottage-food-permit`
- [x] Label template page `/texas-cottage-food-label-template`
- [x] Farmers market page `/farmers-market-food-label-texas`
- [x] Product long-tail pages for jam, cookies, brownies
- [x] FAQ route `/faq/[slug]`
- [x] Pricing page `/pricing`
- [x] Login page `/login`
- [x] Dashboard `/dashboard`
- [x] Legal/disclaimer pages `/terms`, `/privacy`, `/disclaimer`

## Core Workflows

- [x] Product eligibility checker UI and API flow.
- [x] Selling-readiness checklist UI and API flow.
- [x] Label generator UI with Texas disclosure text, preview, and export gating.
- [x] Saved products and saved labels workflow for authenticated users.
- [x] Template library with 3–5 layouts.
- [x] Rule citations and plain-English “why” explanations throughout outputs.

## API / Server Paths

- [x] Auth route `/api/auth/[...nextauth]`
- [x] Eligibility API `/api/checks/eligibility`
- [x] Readiness API `/api/checks/readiness`
- [x] Label save API `/api/labels/save`
- [x] Lead capture API `/api/leads`
- [x] Checkout API `/api/checkout`
- [x] Stripe webhook API `/api/webhooks/stripe`
- [x] Admin rules API `/api/admin/rules/[id]`

## Integrations And Safe Fallbacks

- [x] Stripe checkout and entitlement handling, with graceful fallback when keys are absent.
- [x] Resend email capture / transactional path, with graceful fallback when key is absent.
- [x] Analytics/event capture with local-safe persistence.
- [x] PDF label export path without network dependency at build time.

## Marketing / SEO

- [x] Verify route metadata, sitemap, and robots.
- [x] Verify keyword-focused copy and CTA flow across core landing pages.
- [x] Verify FAQ/schema support where implemented.

## Deployment

- [x] Remove fragile patterns that can break across deployments, especially stale server-action posts and route-handler redirects tied to previous builds.
- [x] Ensure no `next/font/google` or other build-time network fetches are used.
- [x] Ensure external SDKs are lazy or env-guarded and not initialized unsafely at module scope.
- [x] Fix Dockerfile COPY/runtime issues and keep only paths that exist.
- [x] Fix the standalone runtime contract for both `npm start` and Docker `CMD`.
- [x] Test `npm run build`.
- [ ] Test `docker build .` if Docker is available. Blocked in this workspace by Docker daemon permission error on `/var/run/docker.sock`.

## QA And Verification

- [x] Start the dev server successfully.
- [x] Start the standalone production server successfully.
- [x] Smoke-test primary routes.
- [x] Test forms, navigation, save flows, and checkout fallback behavior.
- [x] Review UI polish and responsive behavior for the main user journeys via rendered HTML structure and live route output in the terminal environment, including cleanup of invalid nested interactive CTA markup.
- [x] Create `FORGE_COMPLETION_AUDIT.md` mapping PRD requirements to implementation.
- [x] Create `HUMAN_INPUT_NEEDED.md` for any true external credential requirements.
