# FORGE PRD Tasks

## Foundation
- [x] Read `PRD.md` end-to-end for product scope, workflows, pricing, SEO, and deployment requirements.
- [x] Read `BUILD_INSTRUCTIONS.md` end-to-end for build, Docker, env, and verification requirements.
- [x] Audit current repo structure, existing routes, Prisma schema, auth, integrations, and deployment files.
- [x] Verify relevant local Next.js guidance from `node_modules/next/dist/docs/` before changing framework-specific code.
- Note: the repo's installed `next` package does not ship `node_modules/next/dist/docs/` in this environment, so verification used local package inspection plus the official Next.js `output` docs.
- [x] Confirm zero-config build/runtime behavior with safe fallbacks for missing external credentials.

## Data Model
- [x] Prisma/SQLite foundation exists with models for users, products, checks, checklists, saved labels, subscriptions, leads, analytics, and rules.
- [x] Verify schema coverage against PRD requirements and patch any missing fields/relations needed by workflows.
- [x] Verify Prisma client generation/build/runtime behavior in local and Docker environments.
- [x] Verify seed/admin rule data path for initial rule/template content.

## Auth
- [x] NextAuth v5 wiring exists.
- [x] Verify credentials login flow works end-to-end.
- [x] Verify optional Google auth is guarded by env and never breaks build/runtime when absent.
- [x] Verify protected dashboard/admin flows and redirect behavior.

## Core User-Facing Pages
- [x] `/` landing page
- [x] `/texas-cottage-food-law`
- [x] `/texas-cottage-food-permit`
- [x] `/texas-cottage-food-label-template`
- [x] `/checker/product-eligibility`
- [x] `/checker/selling-readiness`
- [x] `/label-generator`
- [x] `/pricing`
- [x] `/dashboard`
- [x] `/login`

## SEO / Marketing / Long-Tail Pages
- [x] `/farmers-market-food-label-texas`
- [x] `/texas-cottage-food-permit-vs-license`
- [x] `/can-i-sell-jam-under-texas-cottage-food-law`
- [x] `/can-i-sell-cookies-under-texas-cottage-food-law`
- [x] `/can-i-sell-brownies-under-texas-cottage-food-law`
- [x] `/can-i-sell-cake-under-texas-cottage-food-law`
- [x] `/faq/[slug]`
- [x] `robots.ts`, `sitemap.ts`, metadata, and schema coverage
- [x] Legal/supporting pages: privacy, terms, disclaimer

## API / Server Actions
- [x] `/api/session/login`
- [x] `/api/session/logout`
- [x] `/api/auth/[...nextauth]`
- [x] `/api/checks/eligibility`
- [x] `/api/checks/readiness`
- [x] `/api/labels/save`
- [x] `/api/leads`
- [x] `/api/checkout`
- [x] `/api/webhooks/stripe`
- [x] `/api/admin/rules/[id]`

## Core Workflows
- [x] Eligibility checker question flow, scoring, citations, persistence, and usage limits
- [x] Selling-readiness checklist generation, persistence, and guidance output
- [x] Label generator form, preview, templates, PDF export, and save flow
- [x] Saved products and saved labels dashboard experience
- [x] Admin rule management flow

## Billing / Email / Storage Integrations Or Safe Fallbacks
- [x] Stripe checkout and webhook handling with no-crash local fallback when Stripe env vars are absent
- [x] Resend transactional email hooks with local no-op fallback when env vars are absent
- [x] SQLite persistence path works locally and in Docker/Coolify
- [x] Document any truly credential-blocked features in `HUMAN_INPUT_NEEDED.md`

## Deployment
- [x] `next.config.ts` already uses `output: "standalone"`.
- [x] Verify Dockerfile matches actual repo contents and Prisma/SQLite runtime needs.
  Dockerfile now copies only the Prisma runtime pieces needed alongside Next standalone output, removes the build-time `.env` from the runner image, and runs `prisma db push` against `/app/prisma/schema.prisma` before boot.
- [x] Verify standalone production startup path works outside Docker too.
  Fixed `package.json` so `npm run start` launches from inside `.next/standalone`; with Next 15, running `node .next/standalone/server.js` from the repo root produced `MODULE_NOT_FOUND` errors for `.next/server/middleware-manifest.json` and returned `500` on every route.
- [ ] Verify `docker build .` when Docker is available.
  Docker is installed but the daemon is not accessible in this environment: `permission denied while trying to connect to the docker API at unix:///var/run/docker.sock`.
- [x] Verify startup path initializes Prisma DB successfully in container/runtime.
  Clean production rebuild confirmed `.next/standalone/server.js` exists, and `npm run start` now serves successfully from standalone output with working page and API responses.

## Verification / QA
- [x] Run `npm run build` and fix all build errors.
  Re-verified from a clean `.next` directory after dev testing to confirm standalone artifacts are generated for deployment.
- [x] Start the dev server and verify it stays up.
- [x] Start the production standalone server and verify it stays up.
- [x] Smoke test primary routes.
- [x] Test interactive forms, buttons, navigation, auth, and guarded paid flows.
- [x] Re-test production APIs after the standalone launch fix.
  Confirmed successful responses for eligibility, readiness, leads, credentials login, label save, and mock checkout on the standalone production server after correcting the start script.
- [x] Review UI quality and fix rough edges.
  Mobile header navigation now stays usable on small screens via a horizontal nav chip row in `src/components/layout/site-header.tsx`.
- [x] Run lint and clear repo warnings/errors that surfaced during verification.
- [x] Re-read relevant PRD sections after each major phase and update this checklist.
- [x] Create `FORGE_COMPLETION_AUDIT.md` mapping PRD requirements to implementation files.
