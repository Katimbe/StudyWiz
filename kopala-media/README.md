# Kopala Media — Official Website & Business-Response Platform

Premium, conversion-focused website and customer-response platform for Kopala Media —
a digital transformation and business-growth systems company based in Northbrook, Illinois.

**Stack:** React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui (Radix) · react-router · react-helmet-async

## Quick start

```bash
npm install
npm run dev      # local development (http://localhost:3000)
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build locally
npx vitest run   # unit tests
```

## What's inside

| Area | Where | Notes |
|---|---|---|
| Business config | `src/config/site.ts` | **Start here.** Contact info, booking URL, socials, domain |
| Editable content | `src/content/` | Services, packages, industries, case studies, FAQs, process |
| Pages (25 routes) | `src/pages/` | See `src/App.tsx` for the route map |
| Forms | `src/components/forms/` | Contact, 6-step Business Assessment, request-a-call |
| Lead engine | `src/features/leads/` | Validation, spam/rate-limit, duplicates, storage, CSV export |
| Email workflow | `src/features/email/` | Templates + provider adapter (log until credentials) |
| Booking | `src/features/booking/` | Provider adapter with request-a-call fallback |
| CRM adapter | `src/features/crm/` | Vendor-neutral boundary (HubSpot-ready) |
| Analytics | `src/features/analytics/` | dataLayer + internal event log |
| Lead dashboard | `/admin` | Passphrase in `site.ts` (`adminPassphrase`) — change it |
| Docs | `docs/` | Architecture, deployment, integrations, operations, checklists |

## Before going live (owner checklist)

1. Fill in `src/config/site.ts`: email, phone, domain (`site.url`), booking URL, social links.
2. Change `adminPassphrase` in `site.ts`.
3. Update `public/sitemap.xml` and `public/robots.txt` with the real domain.
4. Set `base: '/'` in `vite.config.ts` for root-domain hosting (see `docs/deployment/`).
5. Connect email delivery (`.env.example` + `docs/integrations/email.md`).
6. Review the legal pages (marked as drafts) with a professional.

Full activation instructions: **`Kopala_Media_Missing_Items.md`** (delivered with this project)
and **`docs/`**.
