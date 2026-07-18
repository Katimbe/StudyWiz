# Architecture Overview

## Shape

A React + TypeScript single-page application (Vite build) with route-level code
splitting. The stack was chosen per the brief's direction ("strongest practical
architecture supported by the development environment"): it delivers the same
component model, typed design tokens, accessible primitives, and clean
integration boundaries a Next.js build would — inside this environment's
supported toolchain.

## Layers

```
src/
  config/site.ts        All owner-editable business facts (CMS root)
  content/              Typed content modules (services, packages, industries,
                        case studies, FAQs, process, navigation)
  components/
    layout/             Header, nav, footer, breadcrumbs, SEO (meta + JSON-LD)
    marketing/          Reusable section components
    forms/              Field primitives + the 3 working forms
    ui/                 shadcn/ui (Radix) primitives
  features/
    leads/              Lead model, validation, store, spam/rate-limit, export
    email/              Templates + provider adapter
    booking/            Provider adapter (+ request-a-call fallback)
    crm/                Vendor-neutral CRM adapter boundary
    analytics/          Event dispatcher (dataLayer + internal log)
  pages/                One module per route
```

## Integration boundaries

Every external system sits behind an adapter so providers can change without
touching UI code:

- **Email** — `features/email/provider.ts` posts to `VITE_EMAIL_ENDPOINT` when
  set; until then messages render into the email log (visible in `/admin`).
- **Booking** — `features/booking/provider.ts` reads `site.bookingUrl`; fallback
  is the request-a-call form feeding the same lead pipeline.
- **CRM** — `features/crm/adapter.ts` interface with a no-op internal
  implementation active and a HubSpot-ready stub.
- **Lead storage** — `features/leads/store.ts` is a repository interface over
  localStorage today; swap the read/write functions for `fetch` calls to a
  serverless endpoint (`VITE_LEADS_ENDPOINT`) or Supabase without changing
  components.

## Why localStorage (for now)

Zero-infrastructure lead capture that is fully testable end-to-end, exportable
(CSV/JSON), and honest: nothing is silently discarded, and the upgrade path to a
server backend is one file. The lead schema is CRM-ready (mirrors the §25 field
list) so a later sync is a mapping exercise, not a migration.

## Migration path to Next.js

Content modules, components, feature adapters and validation are framework-
agnostic TypeScript/React. Moving means: copy `src/content`, `src/features`,
`src/components` into a Next app, convert pages to route files, and replace
`react-helmet-async` with Next `metadata`. Estimated effort: 1–2 days.
