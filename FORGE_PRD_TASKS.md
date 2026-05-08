# FORGE PRD Tasks

Status legend: `[ ]` pending, `[~]` in progress, `[x]` complete

## Phase 1: Foundation

- [x] Read `PRD.md` end-to-end
- [x] Read `BUILD_INSTRUCTIONS.md` end-to-end
- [x] Scaffold Next.js 15 app with TypeScript, App Router, Tailwind, ESLint, standalone build config
- [x] Establish shared design system, layout, navigation, typography, and responsive shell
- [x] Add core utilities, environment helpers, and safe server/client boundaries
- [x] Configure local-safe persistence approach and Prisma setup
- [x] Add seed pipeline for rules/templates/demo data

## Phase 2: Data Model And Auth

- [x] Implement Prisma schema for:
- [x] `User`
- [x] `Account`
- [x] `Session`
- [x] `VerificationToken`
- [x] `Product`
- [x] `EligibilityRule`
- [x] `EligibilityCheck`
- [x] `ReadinessChecklist`
- [x] `LabelTemplate`
- [x] `SavedLabel`
- [x] `Subscription`
- [x] `EmailLead`
- [x] Create Prisma client singleton and DB access helpers
- [x] Add auth with NextAuth/Auth.js
- [x] Add Google OAuth when credentials are present
- [x] Add safe fallback auth path when Google credentials are absent
- [x] Protect dashboard/admin routes
- [x] Implement entitlement helpers for free, one-time, and subscription access

## Phase 3: Core Workflows

- [x] Seed Texas rules and common product categories
- [x] Build product eligibility rules engine
- [x] Build `/checker/product-eligibility` UI
- [x] Persist eligibility checks
- [x] Show citations, explanation, result status, and next steps
- [x] Build selling-readiness logic
- [x] Build `/checker/selling-readiness` UI
- [x] Persist readiness checklist results
- [x] Build label generator data model and validation
- [x] Build `/label-generator` UI
- [x] Add 3-5 printable label templates
- [x] Add live label preview
- [x] Implement PDF export
- [x] Gate PDF export by entitlements
- [x] Support saved products and saved labels for authenticated users

## Phase 4: Secondary Workflows And Integrations

- [x] Implement Stripe checkout server path
- [x] Implement Stripe webhook handling
- [x] Add billing UI with safe fallback when Stripe credentials are absent
- [x] Implement Resend email server path
- [x] Add lead capture and email signup persistence
- [x] Add safe fallback when Resend credentials are absent
- [x] Build dashboard with:
- [x] saved products
- [x] saved labels
- [x] recent checks
- [x] billing summary
- [x] Build admin rules page with protected access
- [x] Add analytics/event tracking abstraction with no-credential fallback

## Phase 5: Marketing, SEO, And Content

- [x] Build landing page `/`
- [x] Build `/texas-cottage-food-law`
- [x] Build `/texas-cottage-food-permit`
- [x] Build `/texas-cottage-food-label-template`
- [x] Build `/farmers-market-food-label-texas`
- [x] Build `/can-i-sell-jam-under-texas-cottage-food-law`
- [x] Build `/can-i-sell-cookies-under-texas-cottage-food-law`
- [x] Build additional long-tail product page(s) to support PRD
- [x] Build FAQ route(s)
- [x] Build pricing/monetization presentation
- [x] Build legal/trust pages:
- [x] `/disclaimer`
- [x] `/privacy`
- [x] `/terms`
- [x] Add metadata for each page
- [x] Add sitemap
- [x] Add robots
- [x] Add structured data / FAQ schema where relevant
- [x] Add internal links and SEO CTAs across content pages

## Phase 6: Deployment And Ops

- [x] Set `output: "standalone"` in Next config
- [x] Create production-ready `Dockerfile`
- [x] Add env examples / deployment guidance as needed
- [x] Ensure build does not depend on network resources
- [x] Ensure server paths guard missing external credentials cleanly

## Phase 7: Verification

- [x] Re-read relevant PRD sections after each major phase and update this file
- [x] Run `npm run build`
- [x] Fix all build/type/runtime issues
- [x] Start dev server successfully
- [x] Smoke test primary routes
- [x] Test interactive forms, buttons, and navigation
- [x] Review UI polish and responsiveness
- [ ] Test Docker build if Docker is available
- [x] Create `HUMAN_INPUT_NEEDED.md` for true credential requirements only
- [x] Create `FORGE_COMPLETION_AUDIT.md` mapping requirements to implementation
- [x] Output `FORGE_BUILD_COMPLETE` only after all non-external requirements are done
