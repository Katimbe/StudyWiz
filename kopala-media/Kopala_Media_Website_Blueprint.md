# Kopala Media — Official Website & Business-Response Platform
## Master Blueprint, Asset Inventory & Implementation Plan
**Prepared:** July 2026 · **Status:** Approved direction — implementation proceeding per Section 53 ("proceed with implementation unless a genuinely required owner decision prevents safe progress")

---

## 1. Executive Summary

Kopala Media needs a premium, conversion-focused digital platform that demonstrates the same standard of systems thinking it sells. The platform has one primary job — turn qualified visitors into **Business Discovery Calls** — supported by secondary conversions (Business Assessment, package exploration, case-study views, contact).

The build delivers 25 public pages, a flagship Business Response System page, three service packages with starting prices, a six-step Business Assessment, a working contact form, a structured lead pipeline with status management, customer-confirmation and internal-notification email workflows (adapter-based, activated by credentials), a booking workflow with provider adapter and fallback, full SEO/structured data, WCAG 2.2 AA accessibility practices, and a complete documentation set.

No existing code or prior website was found in the project workspace, so this is a greenfield build. All supplied brand documents were reviewed and treated as the source of truth.

## 2. Understanding of Kopala Media

- **What it is:** A digital transformation and business-growth systems company based in Northbrook, Illinois — not a web-design shop, not a marketing agency, not a freelance developer.
- **What it does:** Studies how a business operates, finds where time, leads, opportunities, and revenue leak, then builds practical connected systems (website + intake + CRM + booking + follow-up + automation + AI-assisted communication) that fix the leak.
- **Promise:** "We identify where your business is losing time and opportunities, then build the digital system that helps fix it."
- **Quality principle:** "When a client's budget cannot support the requested scope, we reduce the scope, not the standard."
- **Founder:** Katimbe Kabezya — strategic systems entrepreneur, 13+ years in sales and marketing.
- **Positioning line:** "Kopala Media builds the systems behind business growth."
- **Verified proof:** Two live client projects — Chipiliro Khonje Photography (live photography website + inquiry pathway) and Fix It Chichi (paid, live electrical & maintenance website). No metrics, testimonials, or links were supplied, so none are claimed.
- **Pricing (confirmed across both documents):** Visibility Foundation $2,500+ · Business Response System (flagship) $4,500+ · Growth Operations System $7,500+ · Monthly: Systems Care $450–$750 · Growth Operations $1,000–$1,750 · Managed Growth $2,500–$5,000+ · Payment structure 50/30/20.

## 3. Website Goals

1. Establish professional credibility for a young but real company.
2. Explain clearly what Kopala Media does and how it differs from agencies/freelancers.
3. Present packages and starting prices transparently.
4. Convert: primary = Book a Discovery Call; secondary = Business Assessment, recommendation request, package exploration, case-study views, contact.
5. Run the lead operation the site advocates: structured intake → validation → storage → instant acknowledgement → owner notification → booking option → status pipeline.
6. Support future CRM, email, SMS, WhatsApp, analytics, and AI integrations through clean adapter boundaries.
7. Support local search visibility (Northbrook, Evanston, Glenview, Skokie, Deerfield, Wheeling, Chicago North Shore) and future Kopala Group expansion.

## 4. Confirmed Requirements (traceability)

| Requirement | Source | Where delivered |
|---|---|---|
| 25 required pages incl. flagship BRS page | Master prompt §9, §18 | Sitemap §9 below |
| Home page 17-section order | §11 | Home page build |
| Hero copy, CTAs, trust line | §12 | Home hero |
| Problem journey (lost vs. fixed) | §13 | Home problem section |
| 10 service categories | §15 | Services index + 6 detail pages + BRS page |
| 3 packages + 3 monthly plans + pricing notices | §16–17 | Packages page, home, BRS page |
| 7-stage method (Discover→Improve) | §19 | Process page |
| Founder profile, no invented credentials | §20 | About + Home founder section |
| 2 verified case studies, no invented metrics | §21 | Work + 2 case-study pages |
| Industries page with per-industry detail | §22 | Industries page |
| Contact form fields + behavior | §23 | Contact page |
| 6-step Business Assessment | §24 | Assessment page |
| Lead workflow, statuses, fields | §25 | Lead engine + admin dashboard |
| Booking requirements | §26 | Booking page + adapter |
| Email workflows | §27 | Email adapter + templates |
| CMS/content plan | §28 | Typed content layer (`src/content/`) |
| Technical architecture, repo structure | §29–30 | §8 below + repo |
| Full functionality directive (no fake buttons) | §32 | Build + fallbacks |
| Responsive, a11y, motion, SEO, local SEO, analytics, performance, security, privacy, testing, error handling, content standards, integrity, footer, 404, admin, docs, process | §33–50 | Corresponding plans §21–28 |

**Resolved conflicts in source material:**
- Prompt §16 says flagship website is "up to seven pages"; pitch deck says "up to five core pages". The **company profile (latest, 2026) says seven** → seven is used.
- Prompt §19 describes a 7-stage method; pitch deck shows 6 stages. The prompt's 7-stage version (Discover, Diagnose, Design, Build, Test, Launch, Improve) is the canonical public method; deck stages map cleanly onto it.
- Prompt §12 alternative headline vs. recommended headline: recommended headline is used as H1; "We build the systems behind business growth" is used as the eyebrow/positioning line.

## 5. Asset Inventory

| # | File | Content | Status | Intended use | Conflicts / gaps |
|---|---|---|---|---|---|
| 1 | `Kopala_Media_Company_Profile_2026.docx` | Full company profile: about, problem, services, packages, retainers, method, proof, founder, differentiators | ✅ Approved (source of truth) | Copy foundation for all pages | None |
| 2 | `Kopala_Media_Company_Profile_2026-1.docx` | Byte-identical duplicate of #1 (md5 match) | ✅ Duplicate | Backup only | None |
| 3 | `Kopala_Media_Pitch_Deck-3.pptx` | 11-slide deck: offer, audiences, flagship detail, packages, retainers, payment terms, process, projects, founder | ✅ Approved | Copy cross-check; payment structure (50/30/20); timelines (site review 3–5 days, full build 7–14) | 6-stage process vs. 7-stage (resolved, §4) |
| 4 | Logo (embedded in #1/#3, `image1.png`) | 1536×1536 gold antelope + camera-lens "O" + "KOPALA MEDIA" wordmark on black | ✅ Approved — "use my actual logo" (user instruction, prior session) | Header, footer, favicon, OG image, hero brand mark | Black background is opaque → site header/footer use near-black so it blends seamlessly; a transparent variant would be better long-term |
| 5 | `129979.png` | Professional founder headshot (navy suit, neutral background) | ✅ Approved | About page + home founder section | Needs owner's confirmation this is the preferred public photo |
| 6 | Master prompt (pasted spec) | Complete build specification | ✅ Governing spec | This blueprint + build | — |

**Not supplied (see §6 and the consolidated Missing Items list):** case-study screenshots, case-study live URLs, client testimonials, contact email/phone, booking link, social profiles, domain name, Google Business Profile, legal entity details, email/CRM/SMS credentials, analytics IDs.

## 6. Missing Information (summary — full consolidated list delivered separately)

1. Official contact email + phone (+ whether phone should be public).
2. Domain name / production URL (needed for canonical URLs, sitemap absolute URLs, OG tags).
3. Booking provider + link (Calendly / Cal.com / Google Calendar).
4. Transactional email provider + sender address (Resend / SendGrid / Gmail API) — activates real confirmation + notification emails.
5. Case-study live URLs, screenshots (desktop + mobile), and any genuine testimonials.
6. Social-media profile URLs.
7. Business entity/legal details for Privacy Policy & Terms (registered name, address for privacy inquiries).
8. CRM choice (HubSpot or other) + credentials — or confirm built-in lead pipeline as system of record for now.
9. Analytics IDs (GA4, GTM, Search Console verification).
10. SMS/WhatsApp activation decision (Twilio credentials; triggers SMS Terms page activation).
11. Confirmation the supplied headshot is the approved public photo; optional transparent-background logo variant.

**Fallback behavior built meanwhile:** all of the above are configuration values (`src/config/site.ts` + environment placeholders). Forms, lead storage, email templates, booking flow, and admin dashboard are fully functional without them; emails are queued/logged with a documented activation path, and booking falls back to a request-a-call form.

## 7. Assumptions

1. The 2026 Company Profile is the latest approved document and wins all copy conflicts.
2. React + TypeScript + Vite + Tailwind (the environment's supported stack) is the "strongest practical architecture supported by the development environment" per §29 — delivering the same component model, tokens, and structure the Next.js preference describes, with a documented migration path.
3. Contact email shown publicly is withheld until supplied; contact page routes through the form.
4. "Starting at" pricing with scope conditions is displayed exactly as approved in both documents.
5. No testimonials are published until genuine ones are supplied.
6. Legal pages are published as clearly-dated drafts marked for owner/professional review (per §41).
7. Service area statement: "Northbrook, Illinois · Serving the North Shore, Chicagoland and select remote clients" (per company profile).
8. The platform's native lead pipeline (with CSV/JSON export) is the system of record until a CRM is chosen — the CRM adapter boundary is built and documented.

## 8. Recommended Technical Stack

- **Frontend:** React 18 + TypeScript + Vite, react-router (code-split lazy routes), Tailwind CSS with a documented token layer, shadcn/ui primitives (Radix — accessible by default), lucide-react icons, react-helmet-async for per-route metadata.
- **Lead backend (current environment):** typed lead engine in `src/features/leads/` — schema validation, honeypot + time-trap spam checks, client rate limiting, duplicate detection, localStorage persistence with export (CSV/JSON), event log. Designed as a repository interface so a serverless API/Supabase/Postgres backend swaps in without touching UI.
- **Email:** provider-adapter (`email/provider.ts`) with Resend/SendGrid/Gmail implementations stubbed behind env vars; fully-written HTML + text templates for customer confirmation and internal notification; queue + failure log.
- **Booking:** provider-adapter (`booking/provider.ts`) supporting Calendly/Cal.com/Google Calendar embed/link via config; automatic fallback to request-a-call form that feeds the same lead pipeline.
- **CRM:** adapter interface (`crm/adapter.ts`) with HubSpot-ready mapping of the full lead field set; disabled until credentials.
- **Analytics:** consent-aware event dispatcher (`analytics/events.ts`) with the §38 event taxonomy, pushing to `dataLayer` (GTM-ready) + internal event log.
- **Why this stack:** satisfies §29's intent (TypeScript, accessible components, design tokens, minimal client JS via route-level code splitting, clean integration boundaries) inside this environment's supported toolchain; migration path to Next.js is documented in `docs/architecture/`.

## 9. Sitemap

```
/                              Home
/about                         About Kopala Media + founder
/services                      Services overview (10 capabilities)
/services/business-response-system   Flagship: Business Response System
/services/website-design       Website Design & Digital Presence
/services/crm-lead-management  CRM & Lead Management
/services/business-automation  Business Automation
/services/ai-assisted-systems  AI-Assisted Business Systems
/services/marketing-content    Marketing & Content
/services/custom-digital-tools Custom Digital Tools
/packages                      Service Packages + Monthly Support Plans
/industries                    Industries served
/work                          Case studies index
/work/chipiliro-khonje-photography   Case study 1
/work/fix-it-chichi                  Case study 2
/process                       How We Work (7-stage method)
/assessment                    Business Assessment (6 steps)
/book                          Book a Discovery Call
/contact                       Contact
/faq                           Frequently Asked Questions
/privacy                       Privacy Policy (draft for review)
/terms                         Terms of Use (draft for review)
/sms-terms                     SMS Terms & Consent (inactive until SMS enabled)
/accessibility                 Accessibility Statement
/admin                         Lead pipeline dashboard (passphrase-gated)
*                              Custom 404
```
Future (documented, not built as thin pages): Resources/Insights, per-city and per-industry landing pages, client portal, support center.

## 10. Navigation Structure

- **Announcement/credibility bar:** positioning line + service area.
- **Desktop nav:** Home · Services (dropdown: 6 service pages + flagship) · Packages · Work · Process · About · Contact — plus gold CTA button "Book a Discovery Call".
- **Mobile nav:** full-screen sheet, large tap targets, CTA pinned, ESC/close support, focus trap + return, no deep nesting (Services group expands inline, one level).
- **Sticky header** with backdrop blur; shrinks on scroll; skip-navigation link before it.
- **Footer:** logo, one-line description, Services / Company / Get started link columns, legal row, service-area line, copyright, social icons only when URLs are supplied.

## 11. Customer Journeys

**Journey A — Ready buyer (primary):** Ad/referral/search → Home hero (5-second clarity) → Packages or BRS page → Book a Discovery Call → confirmation + what-to-expect → (booking provider or request-call) → lead status: Discovery Scheduled.

**Journey B — Researcher:** Search ("why am I losing leads" / local query) → Home or service page → problem section (self-recognition) → Work/case studies (proof) → FAQ → Business Assessment → instant confirmation → booking option on success screen → status: New → Qualified.

**Journey C — Package comparer:** Packages page → comparison table → "Request a Recommendation" → short assessment → personalized follow-up → Discovery Call.

**Journey D — Existing-client/support:** Footer/nav → Contact (service: ongoing support) → lead record tagged Support → response SLA set in confirmation.

**Journey E — Lost visitor:** broken link → branded 404 → routed to Home/Services/Assessment/Contact.

Every journey ends in one of three captured states: booked call, submitted assessment/contact (lead record created), or informed exit (retargetable via analytics events).

## 12. Page-by-Page Content Architecture

Each page answers the six §44 questions (what / who / problem / outcome / trust / next step). Highlights:

- **Home:** 17 sections in the exact §11 order; hero H1 "Build a business that responds, follows up, and grows — even when you're busy"; problem journey visual (lost vs. fixed pipeline); outcomes grid; services overview; flagship feature band; 3 package cards; 7-stage method strip; industries strip; verified work (2 real projects, honest "live website" outcomes); founder intro with headshot; why-Kopala (6 differentiators from profile); FAQ preview; final CTA; footer.
- **About:** company story (from profile §01), mission/vision/promise, quality principle, full founder profile (§20 wording, no invented credentials), how we work summary, CTA.
- **Services index:** 10 capability cards (problem → provide → benefit → who → next step).
- **6 service detail pages:** shared template: hero, the problem, what we provide, operational benefit, who it's for, related package, FAQ, CTA. Unique copy per service — no duplication.
- **Business Response System (flagship):** who it's for, problems solved, animated system-flow diagram (prospect → website → inquiry → acknowledgement → pipeline → notification → follow-up → scheduled → tracked), full inclusions, what's not included, timeline (review in 3–5 business days; full build 7–14 once content/access received), starting $4,500, 50/30/20 payment structure, client-provides list, after-launch, add-ons, FAQ, dual CTA.
- **Packages:** 3 package cards (starting-at pricing, deliverables, dual CTAs) + comparison table + 3 monthly plans + pricing notices (scope conditions; third-party fees separate).
- **Industries:** 10 industry blocks each with challenge / response gap / recommended system / possible automation / suitable package / CTA.
- **Work + 2 case studies:** verified delivered outcomes only (live site, professional presence, mobile accessibility, structured inquiry path); screenshots/link slots render only when supplied.
- **Process:** 7 stages with what-the-client-receives per stage; payment milestones; revision policy.
- **Assessment:** 6 steps per §24 incl. review screen, consent, budget ranges, UTM capture, success screen with booking option.
- **Book:** booking provider embed when configured; otherwise request-a-call form + what happens next; timezone note (America/Chicago).
- **Contact:** §23 field set, validation, states, fallback mailto only after email is supplied.
- **FAQ:** ~14 questions across fit, pricing, process, timelines, technology, support.
- **Legal ×4:** dated drafts marked for review; SMS Terms published but marked "applies only when SMS messaging is activated".
- **404:** §47 message + 5 recovery links.

## 13. Design-System Direction

Premium dark editorial system matching the black/gold logo:

- **Color tokens:** `ink #0B0B0D` (page bg), `charcoal #141418`, `graphite #1C1C22` (surfaces), `gold #C9A227` (primary accent, used sparingly), `gold-bright #E3C766` (hover/highlight), `copper #A97C50` (secondary accent), `ivory #F5F1E8` (primary text), `warm-gray #A8A29A` (secondary text), `cream #F7F3EC` (light section bg, inverted sections), semantic success/warning/error tuned for ≥4.5:1 contrast on dark.
- **Typography:** Space Grotesk (display/headings) + Inter (body); fluid `clamp()` scale; body ≥16px; line-height 1.6–1.75; measure ≈65ch; optional serif accent (Source Serif 4) for one quote style only.
- **Spacing/radius/shadow:** 4px base scale, section rhythm 96–128px desktop / 64–80px mobile; radius 12/16/24px; low-elevation warm-tinted shadows; hairline `ivory/8%` borders.
- **Containers:** 1280px max, 768px prose; breakpoints 480/768/1024/1280/1536.
- **Motion:** 150–300ms ease-out reveals, transform/opacity only, full `prefers-reduced-motion` disable.
- **Buttons:** primary = gold fill / ink text; secondary = ivory outline; ghost; all with hover/focus/active/disabled/loading states and visible focus rings.
- **Forms:** dark surface fields, labeled, error text + summary, focus ring gold, success panel.
- **Cards:** graphite surface, hairline border, subtle top-edge gold rule on hover.
- **Logo usage:** unmodified supplied PNG; on near-black header the black logo background blends; never recolored or redrawn.

## 14. Component Architecture

Layout: `AnnouncementBar, Header, DesktopNav, MobileNav, Footer, SkipLink, Breadcrumbs, SEO (per-route meta+JSON-LD)`.
Marketing: `Hero, SectionHeading, ProblemJourney, OutcomeGrid, ServiceCard, PackageCard, ComparisonTable, ProcessTimeline, IndustryCard, CaseStudyCard, FounderProfile, FAQAccordion, CTASection, SystemFlowDiagram, TestimonialSlot (renders only with real data), LogoWall (unused until real logos), StatBand (unused until verified stats)`.
Forms: `ContactForm, AssessmentForm (6-step), FormProgress, FieldError, ErrorSummary, SuccessPanel, BookingSection, RequestCallForm, ConsentCheckbox`.
Feature modules: `leads/` (schema, store, statuses, export), `email/` (provider + templates), `booking/` (provider), `analytics/` (events), `admin/` (dashboard, auth gate).
All interactive components implement the §31 state matrix; shadcn/Radix supplies dialog/sheet/accordion/select/checkbox accessibility.

## 15. Lead Data Model

All §25 fields implemented as a typed schema: `id, firstName, lastName, email, phone?, businessName, businessType?, location?, currentWebsite?, primaryChallenge?, desiredOutcome[]?, servicesInterested[], budgetRange?, timeline?, preferredContactMethod, message?, leadSource, referrer?, utm{source,medium,campaign,content}?, consentAt, status(New|Contacted|Qualified|Discovery Scheduled|Proposal Sent|Won|Lost|Nurture), owner?, nextAction?, nextActionDate?, formType(contact|assessment|request-call|support), createdAt, updatedAt` + internal `history[]` audit trail and `emailLog[]`.

## 16. Form Workflow

Visitor submits → honeypot/time-trap check → schema validation (client + server-equivalent validation layer) → rate-limit check (per-browser window) → duplicate detection (email + payload hash within 24h → polite "already received" state) → lead persisted → confirmation email queued (adapter) → internal notification queued → analytics conversion event → success screen with booking option → status New in admin pipeline. Failure at any step: specific error, retry-safe (input preserved), logged without sensitive data, fallback contact shown. **No submission is ever silently discarded.**

## 17. Email Workflow

Two fully-written templates (HTML + plain text, brand-styled):
- **Customer confirmation:** name + business name, what happens next, realistic response window (1–2 business days), booking link when appropriate, privacy link, no exaggerated promises.
- **Internal notification:** all §27 fields + timestamp + lead record reference.
Adapter activates on env credentials (Resend default); until then, messages render to the email log (viewable/exportable in admin) so the workflow is testable end-to-end. Failures are caught, logged sans PII, and surfaced in admin with retry.

## 18. Booking Workflow

Config-driven: when `bookingUrl` is supplied, /book embeds/links the provider with timezone clarity (America/Chicago), and the assessment success screen deep-links to it with the lead record reference. Until supplied: /book shows a request-a-call form (preferred days/times + timezone) that creates a `Discovery-requested` lead and explains the manual scheduling step — documented in `docs/integrations/booking.md`. Reschedule/cancel handled by provider once active; never forced (assessment can be submitted without booking).

## 19. CRM Integration Plan

`crm/adapter.ts` defines `upsertLead()`, `updateStatus()`, `logActivity()` against a provider interface; HubSpot field mapping table included in docs; adapter no-ops to internal store until credentials. Statuses mirror §25 so a later CRM sync is a mapping exercise, not a data migration. Not tightly coupled to any vendor.

## 20. CMS Plan

Typed content layer: `src/content/` holds `services.ts, packages.ts, industries.ts, caseStudies.ts, faqs.ts, process.ts, legal.ts, site.ts` — every editable business fact (prices, deliverables, contact info, CTAs, socials) lives there, not nested in components (§28). Editing guide in `docs/content/`. A future headless CMS (Sanity/Contentful) can replace the layer by implementing the same exported types — documented.

## 21. SEO Plan

Unique title + description per route; canonical URLs (domain placeholder until supplied); `sitemap.xml` + `robots.txt` in `public/`; OG/Twitter meta + branded OG image (logo on brand background); semantic heading hierarchy; breadcrumbs with `BreadcrumbList`; JSON-LD: `Organization`, `WebSite`, `Service` (per service page), `Person` (founder), `FAQPage` (FAQ page only). `LocalBusiness` withheld until address/phone verified (§36). Clean slugs, descriptive image filenames/alt, internal-link mesh between services ↔ packages ↔ case studies ↔ assessment. No fake ratings/reviews/locations. Redirect plan documented for future migrations.

## 22. Local SEO Plan

Genuine local layer: service-area statements woven into Home, About, Contact, footer ("Northbrook, Illinois · Serving the North Shore, Chicagoland and select remote clients"); an honest "Local focus" block explaining who is served and remote/hybrid delivery; no city-name stuffing and no thin per-city pages until each has unique content (roadmap). Google Business Profile preparation steps documented; NAP consistency begins once official contact details are supplied.

## 23. Accessibility Plan (WCAG 2.2 AA practices)

Semantic HTML first, ARIA only where needed; skip link; logical heading order; visible gold focus rings; labeled forms with error summaries + inline errors; Radix-based accordion/dialog/sheet (keyboard + screen-reader correct); status announcements via `aria-live`; contrast-verified palette (gold on ink ≥ 4.5:1 for large text/buttons, ivory on ink 15:1); touch targets ≥44px; reduced-motion support; accessible mobile nav with focus management; alt text on all imagery. Checklist in `docs/accessibility/`.

## 24. Security Plan

Honeypot + minimum-fill-time spam checks; per-browser rate limiting; input sanitization/escaping; strict schema validation; duplicate-submission protection; no secrets in client bundle (env template + documented server-side activation path); CSP/security-headers guide for deployment; least-privilege guidance for future DB; consent timestamp recorded with every lead; logs scrub PII; dependency audit step; data-retention guidance in docs. Admin dashboard gated by owner-set passphrase (documented as interim control until server auth exists).

## 25. Analytics Plan

Consent-aware dispatcher; documented event taxonomy implementing §38: `hero_cta_click, package_view, package_cta_click, service_view, case_study_view, contact_form_start/submit, assessment_start/step_complete/submit, booking_click/complete, phone_click, email_click, social_click, faq_expand` (+ `recommendation_request`). Naming spec + GTM/GA4 activation in `docs/analytics/`. No personal data in events; internal event log doubles as a pre-GA verification tool.

## 26. Testing Plan

`tsc --noEmit` type check; production `vite build`; unit tests for validation/lead-engine (Vitest); manual E2E script executing the §42 critical path (mobile open → understand offer → BRS page → assessment → invalid-input errors → submit → confirmation → notification in admin → booking option → event recorded → status change); responsive matrix (360/390/428/768/1024/1280/1536); keyboard-only pass; broken-link crawl of built site; metadata/JSON-LD validation; reduced-motion pass. Only actually-run results are reported.

## 27. Implementation Sequence

1. Blueprint (this document) → 2. Asset prep (logo/headshot optimization, favicon, OG image) → 3. Tokens + global styles → 4. Layout/navigation/footer → 5. Content layer → 6. Public pages → 7. Forms → 8. Lead engine + admin → 9. Email adapter/templates → 10. Booking adapter → 11. CRM adapter → 12. Analytics → 13. SEO/structured data/sitemap → 14. Accessibility pass → 15. Responsive pass → 16. Security controls → 17. Tests → 18. Defect fixes → 19. Production build → 20. Documentation + missing-items list.

## 28. Risks and Solutions

| Risk | Mitigation |
|---|---|
| No backend in this environment (forms need somewhere to send) | Lead engine + adapters make UI/backend swappable; serverless endpoint spec documented; nothing fake |
| No email credentials | Fully-built templates + queue/log; one-env-var activation; documented |
| No booking link | Provider adapter + request-a-call fallback feeding the same pipeline |
| No case-study screenshots/links/testimonials | Honest "verified delivered outcomes" presentation; slots activate when supplied; nothing invented |
| Logo has opaque black background | Near-black header/footer blend; transparent variant requested in missing-items |
| Scope breadth vs. quality | Content-driven architecture; shared page templates; tokens prevent drift |
| Legal pages | Dated drafts explicitly marked for owner/professional review |
| LocalBusiness schema temptation | Withheld until NAP verified |

## 29. Acceptance Criteria

Mirrors §52 exactly: all pages exist and navigate; logo used unmodified; brand consistent; forms validate and submit; leads processed, stored, exportable; confirmations + internal notifications run through the email workflow (log until credentials); booking works via provider or documented fallback; every button acts; no broken links; no fake testimonials/claims/placeholders in production copy; unique metadata; sitemap + robots; valid JSON-LD; focus states; reduced motion; no secrets; documented analytics; tests actually run; deployment/rollback/maintenance docs present. Result reported honestly below (Testing Summary in delivery note).

## 30. Files Created / Changed

- `Kopala_Media_Website_Blueprint.md` (this document)
- `Kopala_Media_Missing_Items.md` (consolidated owner-supply list)
- `app/` — full web application: `src/config/site.ts`, `src/content/*.ts` (8 content modules), `src/components/{layout,marketing,forms,ui}/**`, `src/features/{leads,email,booking,crm,analytics,admin}/**`, `src/pages/**` (25 routes), `public/{sitemap.xml,robots.txt,brand/*,og/*}`, `docs/**` (architecture, deployment, content, integrations, analytics, accessibility, SEO, testing, maintenance, roadmap), `.env.example`, `README.md`

## 31. Items Requiring Owner Approval

Only these pause activation (none pause the build — all have working fallbacks):
1. Official public contact email/phone. 2. Domain name. 3. Booking provider + link. 4. Email provider credentials (paid). 5. CRM selection (paid). 6. SMS/WhatsApp activation (paid, legal consent). 7. Analytics IDs. 8. Approval of headshot + request for transparent logo variant. 9. Legal review of Privacy/Terms drafts. 10. Publication of any testimonial or case-study link (must be genuine).
