# Travel_ISL — Sequential Product and Commercial Launch Plan

**Owner decisions confirmed October 8, 2026**

- Public brand: **Travel_ISL**, not Targum.
- Offer: **US$8 per month**, automatically renewing, cancel anytime.
- Cancellation stops the next renewal; access continues through the already-paid billing period.
- Payments: Stripe. The former one-time payment and Zelle proposals are superseded. Do not publish the previously provided Zelle email as a payment or support address.
- Navigation: practical, free outbound Google Maps links for transit/walking and Waze links for driving. No in-site live bus/ETA service.
- Distribution: prepare copy for an owner-arranged Ynet campaign. No Ynet endorsement or partnership is established by this plan.
- Destination: a durable production website, not a temporary Sandbox port URL. No custom domain has been selected or bought.

## 1. Bounded scope and current state

This revision adds a commercial launch track to the supplied `Israel_App_Strict_Build_Plan.pdf`. Preserve the original phases **0–8**, their numbering, and the rule that only one phase may be implemented at a time. Phases **9–14** follow them. A passed original Phase 8 is a **demo milestone**, not permission to sell simulated features.

At the time this plan was written, `main` contains Phase 0 and Phase 1. Phase 1 accessibility refinement is open as PR #3. No Phase 2 implementation is visible on `main`. Another developer may be working on it elsewhere; do not assume unpublished work is complete or overwrite it.

**This change is documentation only.** Files touched: `plan.md`, `docs/travel-isl-launch-copy.md`, and `AGENTS.md`. No checkout, account infrastructure, domain, billing service, or publication is enabled by this revision.

### Scope of the launch track

Public brand and truthful sales pages; convenient destination handoffs; sourced travel guidance; production account and entitlement handling; Stripe recurring checkout and self-service cancellation; permanent HTTPS deployment; owner-ready advertising copy.

### Explicitly out of scope

Paid routing/maps APIs; embedded live map or in-site bus schedules; guaranteed arrival times; ticket sales; real OCR/AI scanning; emergency dispatch; a route safety classifier; automatic safety alerts; a bus-number blacklist; guarantees against traffic tickets; domain purchases; publishing ads on Ynet; automatic migration of browser demo premium states into paid accounts. No additional paid service is provisioned without a documented cost/fit comparison and owner approval where required.

## 2. Product truth and purchase boundaries

Original phases 2–6 are local prototypes. Phase 2's Create Account/Sign In button selects a local demo state; it does not authenticate a buyer. Phase 4 returns a simulated scanner result. Phase 5 includes static Shabbat data. Phase 6 uses local event data and non-ticketing buttons.

These limitations must remain visible. The local premium state **never** authorizes commercial access. A checkout return URL, localStorage flag, or browser-supplied price is not proof of payment.

Proposed launch access split: public sales pages, current safety-source links, and limited guest preview remain free; paid account access covers the completed curated travel toolkit. Exactly which screens are paywalled must be listed on the pricing page before launch. The simulated scanner is excluded from the paid promise and labeled demo if retained. Static Shabbat times and local sample events cannot be marketed as current information. Do not promise unlimited arbitrary-text translation: the original translator supports a finite offline phrase dictionary.

Monthly payment buys access to the disclosed release, not a claim of continuously updated real-time travel intelligence. Do not promise lifetime availability. Refund/tax and seller disclosures remain launch decisions for the owner; cancel-anytime is not an invented automatic refund promise.

## 3. Technology and service choices

Keep Next.js App Router, TypeScript, Tailwind v4, lucide-react, and pinned Bun. Do not replace the stack or add a library merely for style.

### Stripe integration comparison

| Option | Fit | Costs and limitations | Decision |
| --- | --- | --- | --- |
| Stripe subscription Payment Link | Fast hosted checkout; useful for a manually fulfilled offer | Payment/Billing transaction fees; a link alone does not secure app access or implement account recovery | Not sufficient as the complete buying system |
| Server-created Stripe Checkout + hosted customer portal | Links buyer identity, subscriptions, secure fulfillment and cancellation | Payment/Billing fees; requires server routes and durable account/entitlement records | Recommended implementation for Phase 13 |
| Custom embedded Stripe Elements | More on-site visual control | Same underlying fees; larger implementation/security and maintenance scope | Not needed for first release |

Stripe's US pricing page currently lists **2.9% + 30¢ per successful card charge** and pay-as-you-go Billing lists **0.7% of Billing volume**. These are illustrative US standard rates, not a quote for the owner's account; country, card type, currency, taxes and chosen products may change fees. Use pay-as-you-go rather than a fixed monthly Stripe Billing contract. Do not add a paid custom Stripe portal domain. Verify merchant eligibility and actual pricing during Phase 12 before activating live payments.

### Navigation comparison

| Option | Fit | Cost/constraint | Decision |
| --- | --- | --- | --- |
| Google Maps universal URLs + Waze HTTPS deep links | Cross-platform directions handoff; maps provider handles routes | No API key or routing API subscription for these links; third-party app/network required | Approved |
| In-site map/directions provider APIs | Embedded routing, possible ETAs | Keys, provider terms, usage costs and maintenance | Excluded |
| Self-hosted routing engine + public transit feeds | Potential local control | Infrastructure, feed licensing/freshness and operational work; not reliably live for free | Excluded |

No geocoding API is needed: pass a destination query; the traveler confirms the matching place in the external service. Do not claim Travel_ISL computed a route.

### Permanent hosting options

Evaluate **Manus-managed hosting**, the existing **Vercel connector/repository deployment**, and another suitable commercial-use host at Phase 14. Compare recurring host/database charges, commercial-use terms, region, backups, secrets, webhook availability and recovery. A provider's personal/hobby tier is not assumed eligible for commercial sales. Prefer the existing repository and a supported durable deployment rather than duplicating the site. No host tier with a fixed recurring charge is selected by this plan. A provider subdomain is acceptable for the first durable release; custom-domain selection and any purchase remain separate.

## 4. Project structure

Existing: `src/app/` holds routes, global styling and metadata; `src/components/` contains the four-view shell and local demo components; `public/` contains static assets.

Proposed modules, created only in their owning phase:

- `src/app/(marketing)/`: public home/pricing/help/legal routes, using Next's server-rendered/static HTML.
- `src/components/marketing/`: brand header, honest feature sections and CTA components.
- `src/components/navigation/`: destination form, mode selection and saved destinations.
- `src/lib/navigation-links.ts`: encoded, allowlisted Google Maps/Waze URL builders.
- `src/data/travel-tips.ts`: curated entries with source URLs, applicability and review date; no unsourced live claims.
- `src/lib/auth/`: production session and account integration, separate from the original demo flow.
- `src/lib/billing/`: server-only Stripe integration, centralized product/price mapping, entitlement logic and reconciliation.
- `src/app/api/checkout/`, `src/app/api/billing-portal/`, `src/app/api/stripe/webhook/`: authenticated checkout/portal creation and verified event processing.
- `src/app/account/` and `src/app/payments/`: account status, paid-through date, cancellation and purchase history.
- `docs/travel-isl-launch-copy.md`: advertising and landing-page copy drafts, not public endorsements.
- `plan.md`: this single source for changed implementation/design decisions. Original PDF remains the reference for phases 0–8.

## 5. Design and brand

**Movement:** refined mobile travel editorial, retaining the original Apple-inspired rounded/glass interface rather than replacing it.

**Principles:** destination-first clarity; transparent price and limitations; readable safety guidance; fewer, larger choices instead of dense dashboards.

**Palette:** Mediterranean blue anchors navigation and primary actions; warm off-white improves reading; deep navy provides contrast. Reserve amber/red for actual caution information, not decoration. Signature color: Mediterranean blue `#1766D6`.

**Layout:** a compact editorial landing page with alternating story/feature bands; the travel tool uses one destination field and a prominent transport-mode switch. Do not crowd an existing four-tab bar with tiny new buttons. Add a clear Get Around entry from Tools and the app header in Phase 10.

**Signature elements:** a folded-route line, pill-shaped mode control, and a single visually prominent price card with the recurring disclosure adjacent to its CTA.

**Interaction:** deliberate, labeled handoffs such as “Open transit directions in Google Maps”; visible external-link cues; progressive disclosure for detailed tips. Never silently request location.

**Animation:** 150–220ms opacity/transform transitions, no decorative parallax or looping safety icons; respect reduced-motion settings; retain tactile press feedback where appropriate.

**Typography:** existing Geist for body and headings, generous line height; Hebrew output uses `dir="rtl"` and suitable fallback coverage. Maintain readable mobile sizes and visible keyboard focus.

**Brand essence:** Travel_ISL brings curated travel essentials and familiar navigation tools together for visitors to Israel. Personality: practical, reassuring, transparent.

**Voice:** specific benefits, not “perfect,” “safest,” or exaggerated AI claims. Examples: “Your Israel essentials, one simple place.” / “$8/month. Cancel anytime. Keep access through your paid period.”

**Wordmark:** preserve the literal `Travel_ISL` name; pair a compact route-shaped ISL mark with the wordmark. No national/government/news outlet logo implying affiliation. Logo assets are prepared in Phase 9.

## 6. Strict sequence

For every phase: inspect latest repository state, change only that phase, run relevant checks, report files/completed requirements/evidence/issues/PASS or FAIL, then stop for owner approval. Feature branch → PR → designated lead merge. No automatic merging or future-phase implementation.

### Original phases 0–8 — unchanged prototype track

0 initialization → 1 shell/navigation → 2 local demo session → 3 local gender-aware phrase translator → 4 simulated premium scanner → 5 compass/static Jewish tools → 6 local sample events → 7 assembly → 8 demo production verification.

Use the original PDF's full requirements. The old product name is internal only until Phase 9. Phase 8 does not mean subscription readiness.

### Phase 9 — Travel_ISL identity and honest public sales pages

Rename user-facing branding/metadata to Travel_ISL without rewriting completed features. Add public home, pricing and feature explanation pages. Clearly show **$8/month, auto-renews, cancel anytime; access continues until the paid period ends**. Until billing is operational, CTAs say coming soon or show an explicitly labeled preview—not a working purchase promise. Use the supplied copy as a draft, remove unbuilt feature claims, disclose all demo/static limits, and keep public safety links accessible.

Provide initial HTML with route-specific metadata; add actual canonical/social URLs only after a real production origin exists. Add privacy/terms/support page structure, but no invented legal entity, address or support mailbox. Checkpoint: brand consistent; claims match implemented behavior; price/disclosures agree; no misleading live checkout or Ynet endorsement.

### Phase 10 — Free practical Get Around interface

Implement destination plus optional origin, with Transit/Walk/Drive modes. Google Maps directions use `api=1`, an encoded destination and `travelmode=transit` or `walking`. Driving opens the Waze HTTPS destination search; coordinate navigation is used only when trusted coordinates exist. Let the external provider resolve ambiguity.

Provide empty/error states, destination confirmation reminder, external-app notice and copy-address fallback. Optional recent/favorite destinations stay on the device with a clear reset; do not store location on a server. Request device location only through an explicit user action, with denial fallback. Offline text/tips may remain readable; new external routing requires connectivity. Checkpoint: valid encoded URLs, usable mobile form, mode-correct handoffs and no invented route/ETA.

### Phase 11 — Sourced Israel travel and transport tips

Add searchable, concise guidance cards: transport planning/validation, schedule checks around Shabbat/holidays, driving/parking, restricted areas and current advisory links. Each consequential tip has an authoritative source, review date and applicability; recheck sources when implementing and before launch. Do not publish a frozen list of routes/buses to avoid or identify safety by passengers' identity.

For restricted-entry/red warning signs: explain that Israeli citizens, including dual nationals, are generally prohibited from Area A; foreign travelers' permissions and rental/insurance restrictions can differ. Never characterize every red road sign as an Area A sign. Tell users to follow the actual posted restriction and official instructions rather than blindly follow routing. Use a correctly sourced sign reference if displaying an image.

Recommend Waze as a navigation aid, **not a way to evade tickets or a guarantee of legality/safety**. Drivers must follow posted laws and restrictions. Bus guidance should identify practical reasons not to board: wrong direction/destination, service not operating, restricted itinerary, official closure/advisory—not an unsupported universal blacklist. No page declares a place or bus safe in real time.

Checkpoint: every safety/legal claim sourced and qualified; review dates visible; official advisories accessible; no absolute safety/ticket guarantee.

### Phase 12 — Production account and durable access foundation

Replace commercial reliance on local demo premium with real authenticated identities and server-authoritative records. Compare supported auth/storage options and hosting fit/cost before provisioning. Prefer supported managed infrastructure when suitable; a recurring-cost tier requires the relevant owner approval. Define minimal user, Stripe-customer/subscription linkage, paid-through/access state and processed-event records with additive migrations. No card data or raw payment payloads in application storage.

Keep demo state isolated and never migrate it as paid entitlement. Add sign-in/out and recovery, owner-only administration, privacy-safe sessions and account view. App access must be checked server-side where protected; all paid-state responses are private/no-store. Checkpoint: forged local premium grants no paid access, sessions recover properly, cross-account records remain isolated, durable records survive redeploy.

### Phase 13 — Stripe $8/month and cancel-anytime lifecycle

Use a centralized **USD 800 cents, monthly** Stripe price and Checkout `mode="subscription"`; no trial, annual plan, subscription upsell or undisclosed charge. The signed-in buyer is linked on the server; prohibit duplicate active subscriptions. Display recurring charge and cancellation terms before checkout. Price/quantity come from server configuration, not browser parameters.

Verify webhook signatures over exact bytes, store processed event IDs, and reconcile entitlement from verified Stripe subscription/payment state. Handle completion, delayed processing, failed renewal, cancellation scheduled and period ended; grant only through verified paid-through dates, not unearned future periods. Renewals must be synchronized even if callbacks are delayed. Confirm the chosen integration's subscribed events and use supported verified reconciliation where invoice events are unavailable.

Provide Manage subscription through the authenticated Stripe customer portal with **end-of-period cancellation**, visible access-until date, update-payment option and invoice/payment history. Cancel stops future renewals and does not prematurely remove paid access. Show confirmation, canceled-return versus processing states and recovery for webhook failures. A failed renewal does not invent a paid extension; any grace period would need explicit policy. Do not silently resume a canceled subscription.

Run in Stripe test mode first; test duplicate webhook delivery, refresh/relogin, cancel-at-period-end, paid-period expiration, failure and account isolation. Do not submit live charges in testing. Checkpoint: verified recurring lifecycle and cancellation behavior match the owner's exact offer; all unresolved live merchant/tax/refund disclosures recorded.

### Phase 14 — Permanent HTTPS site and commercial launch

Select commercially eligible permanent hosting using the comparison above, configure production secrets securely, persist accounts/entitlements, and deploy accepted repository code. A Sandbox port link is not permanent. Use a durable platform domain first unless the owner supplies a custom domain. No domain payment or Ynet ad placement is performed by this phase without its own authorized payload.

Set real production-origin metadata, sitemap/robots, social previews, and appropriate noindex for account/payment pages. Verify raw public HTML, health/unknown route handling, HTTPS, recovery, rollback, logs, database backup and Stripe callbacks. Payment mode must visibly remain test until the owner completes merchant onboarding/live key setup and approves the exact commercial release. Publish a clearly labeled preview before that if useful; do not take subscriptions for missing/demo features.

Before live launch obtain seller legal identity/contact, refund and tax disclosure, final paid-feature list and final site content approval. Final deliverable is the verified durable production URL plus operating handoff; no fabricated permanence guarantee. Checkpoint: deployed SHA confirmed; HTTPS and callbacks verified; cancellation accessible; honest product disclosures; no launch blocker hidden.

## 7. Evidence and maintenance

Reference sources accessed October 8, 2026; revalidate for implementation:

- [Stripe Checkout](https://docs.stripe.com/payments/checkout), [Payment Links](https://docs.stripe.com/payment-links), [Billing pricing](https://stripe.com/billing/pricing), [end-of-period cancellation](https://docs.stripe.com/billing/subscriptions/cancel).
- [Google Maps URL guide — no API key required](https://developers.google.com/maps/documentation/urls/guide).
- [Waze HTTPS deep links](https://developers.google.com/waze/deeplinks).
- [US State Department Israel/West Bank/Gaza information](https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/IsraeltheWestBankandGaza.html). Advisory and citizenship rules are context-dependent; source pages can contain older sub-sections, so do not treat an access date as proof that every statement is current.
- [Israel Ministry of Transport and Road Safety](https://www.gov.il/en/departments/ministry_of_transport_and_road_safety/govil-landing-page).

Next implementation remains the next approved original phase; this roadmap does not authorize skipping to Phase 9. The existing automated review watch covers Phase 2–8 commits, not automatic building or release of the new commercial phases.
