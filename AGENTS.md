# AGENTS.md — Targum (israel-travel-kit-)

## Stack
- Next.js (App Router) + TypeScript, `src/` directory, import alias `@/*`
- Tailwind CSS v4 (configured via `@import "tailwindcss"` in `src/app/globals.css`)
- lucide-react for icons
- Package manager: bun (lockfile: `bun.lock`, committed)
- Offline-first. No paid APIs, no databases, no extra libraries.

## Build rules
- Work on ONE phase at a time, per the owner's strict sequential build plan.
- Never skip, combine, or pre-build phases.
- Never add features, APIs, libraries, or databases that are not requested.
- Inspect the existing project structure before changing anything.
- After every phase, run the app / build and test that phase manually.
- If something fails, debug only the current phase.

## UI rules
- Mobile-first and responsive.
- Premium Apple-inspired: `rounded-2xl` / `rounded-3xl` corners, glassmorphism where requested, subtle borders and shadows, smooth transitions, `active:scale-95` tactile button feedback, accessible contrast, usable keyboard focus states.

## Phase report format (required at the end of every phase)

```
PHASE: [number and name]

Files changed:
- [file]

Completed requirements:
- [requirement]

Tests performed:
- [test]

Checkpoint:
- PASS or FAIL

Remaining issues:
- [issue or "None"]

Next action:
- If PASS: wait for approval before continuing.
- If FAIL: continue debugging only this phase.
```

## Workflow
- Feature branch per phase → PR → team lead reviews and merges.
- Branch naming: `phase-<n>-<slug>` (e.g. `phase-0-init`).

## Owner-approved commercial roadmap (October 8, 2026)
- Read `plan.md` before commercial work. Original phases 0–8 stay sequential and are a demo track; appended phases 9–14 cover the Travel_ISL launch.
- Public brand: **Travel_ISL**. Offer: **US$8/month**, auto-renewing, cancel anytime, with access through the paid period. The one-time/Zelle proposal is superseded.
- Free practical navigation uses outbound Google Maps/Waze URLs; do not add live routing APIs or unsupported bus safety blacklists.
- The original local premium selection is not payment proof. Never sell simulated scanner results, static times, or sample events as live functionality.
- The no-service/no-database baseline above governs phases 0–8. Later production services are permitted only in their owning approved phase, with cost/fit review and required owner approval before provisioning recurring-cost tiers.
- Do not deploy a paid product before production identity, verified Stripe subscriptions/cancellation, durable access records, truthful disclosures and permanent hosting are complete.
- This roadmap does not authorize skipping phases, merging PRs automatically, publishing advertisements, or purchasing a domain.
