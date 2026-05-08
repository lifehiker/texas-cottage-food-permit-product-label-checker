# FORGE PRD Tasks

Last updated: 2026-05-08

This checklist maps the PRD into implementation work in dependency order and tracks completion status.

## Foundation

- [x] Confirm tech stack and runtime shape: Next.js 15 App Router, TypeScript, Tailwind, Prisma, NextAuth, Stripe, Resend, Docker.
- [x] Confirm Next.js production config uses `output: "standalone"`.
- [x] Verify no `next/font/google` usage.
- [x] Verify third-party SDKs are lazy-initialized with missing-env guards.
- [x] Harden Docker image for production build/runtime and confirm it only copies paths that exist.
- [x] Verify local build and production-style start commands.

## Data Model

- [x] User model for auth and role tracking.
- [x] Account / session / verification token models for NextAuth.
- [x] Product persistence for saved product records.
- [x] Eligibility check persistence.
- [x] Readiness checklist persistence.
- [x] Saved label persistence.
- [x] Subscription persistence for paid access.
- [x] Email lead persistence.
- [x] Analytics event persistence.
- [x] Eligibility rule config persistence.
- [x] Label template persistence.
- [x] Seed script for rules and templates.

## Auth

- [x] NextAuth configuration with Prisma adapter.
- [x] Safe fallback auth path when Google OAuth credentials are unavailable.
- [x] Login page and local email sign-in flow.
- [x] Logout flow.
- [x] Session enrichment with user id/role.
- [x] Auth-gated dashboard experience.

## Core Workflows

- [x] Product eligibility engine with allowed / not allowed / manual review outputs.
- [x] Eligibility API route with validation, persistence, citations, and usage limits.
- [x] Eligibility checker page and interactive form.
- [x] Selling-readiness engine with checklist items and summary.
- [x] Readiness API route with validation, persistence, and usage limits.
- [x] Selling-readiness page and interactive form.
- [x] Label generator UI with required Texas disclosure prefilled.
- [x] Label preview.
- [x] PDF export path for entitled users.
- [x] Label save API path for entitled users.
- [x] Template library with 3-5 layouts.
- [x] Citations / plain-English why explanations in checker outputs.

## Secondary Workflows

- [x] Saved products view in dashboard.
- [x] Saved labels view in dashboard.
- [x] Entitlement logic for free / one-time / subscription access.
- [x] Free-tier usage limiting for anonymous and signed-in users.
- [x] Lead capture form and API.
- [x] Transactional email integration with safe local fallback when Resend is unavailable.
- [x] Stripe checkout integration with safe mock fallback when Stripe is unavailable.
- [x] Stripe webhook route with guarded behavior.
- [x] Admin rules page for internal rule configuration.
- [x] Admin rules update API.

## User-Facing Pages

- [x] Home page.
- [x] Pricing page.
- [x] Login page.
- [x] Dashboard page.
- [x] Product eligibility checker page.
- [x] Selling-readiness checker page.
- [x] Label generator page.
- [x] Texas cottage food law page.
- [x] Texas cottage food permit page.
- [x] Texas cottage food label template page.
- [x] Farmers market food label Texas page.
- [x] Jam long-tail page.
- [x] Cookies long-tail page.
- [x] Brownies long-tail page.
- [x] Cake long-tail page.
- [x] Permit-vs-license explainer landing page.
- [x] FAQ dynamic page.
- [x] Disclaimer page.
- [x] Privacy page.
- [x] Terms page.

## Marketing / SEO

- [x] Metadata on major pages.
- [x] Sitemap route.
- [x] Robots route.
- [x] FAQ schema support.
- [x] Texas-specific positioning and CTA structure on landing pages.
- [x] Confirm internal linking for newly added PRD pages.

## Billing / Email / Storage / Integrations

- [x] Database storage via Prisma + SQLite safe default.
- [x] Stripe integration with no-credential fallback.
- [x] Resend integration with no-credential fallback.
- [x] Auth with no-credential fallback using Credentials provider.
- [x] No required network dependency during build.
- [x] Document any optional production credentials in `HUMAN_INPUT_NEEDED.md` if still needed.

## Docker / Deploy

- [x] Dockerfile exists.
- [x] Dockerfile avoids copying nonexistent paths.
- [x] Dockerfile supports standalone Next.js output cleanly.
- [x] Docker runtime applies Prisma schema before startup.
- [ ] Test `docker build .` if Docker is available.
  Blocked here by Docker daemon permissions: `permission denied while trying to connect to the docker API at unix:///var/run/docker.sock`.

## QA / Verification

- [x] Re-read PRD and BUILD_INSTRUCTIONS after major implementation fixes.
- [x] Run `npm run build`.
- [x] Start the app locally and smoke-test primary routes.
- [x] Smoke-test interactive APIs and key workflows.
- [x] Review UI output for professionalism and consistency from code/runtime inspection.
- [x] Create `FORGE_COMPLETION_AUDIT.md` mapping major PRD requirements to concrete implementation files.
- [ ] Output `FORGE_BUILD_COMPLETE` only after all non-external requirements are verified.

## Current Assessment

- Core product workflows, persistence, auth fallback, pricing, SEO routes, and required marketing pages are implemented.
- The deployment risk in the original Dockerfile was fixed by removing the nonexistent `public/` copy and starting the standalone server directly.
- Build passes, the dev server starts, primary routes return `200`, and the key API flows were smoke-tested successfully.
- The only remaining verification gap in this environment is `docker build .`, which is blocked by missing access to the local Docker daemon rather than by application code.
