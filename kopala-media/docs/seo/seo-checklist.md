# SEO Checklist

## Implemented

- [x] Unique title + meta description per route (`src/components/layout/SEO.tsx`)
- [x] Canonical URLs (domain placeholder until confirmed — `src/config/site.ts`)
- [x] `public/sitemap.xml` (23 URLs) + `public/robots.txt` (admin disallowed)
- [x] Open Graph + Twitter meta, branded OG image (`public/og/`)
- [x] JSON-LD: Organization, WebSite, Person, Service (per service page),
      BreadcrumbList, FAQPage (FAQ/home/BRS)
- [x] Semantic heading hierarchy, breadcrumbs, descriptive alt text
- [x] Internal-link mesh: services ↔ packages ↔ case studies ↔ assessment ↔ book
- [x] Route-level code splitting; ~108 kB gz main bundle
- [x] Branded, useful 404 (`noindex`)
- [x] Local layer: Northbrook/North Shore/Chicagoland woven into home, about,
      contact, footer + Organization `areaServed` — no city stuffing

## Deliberately withheld (per content-integrity rules)

- `LocalBusiness` schema — add only when address/phone are verified
- Ratings/reviews schema — add only with genuine, verifiable reviews
- Per-city pages — roadmap items; build only with unique content each

## At launch

1. Set the real domain in `site.ts`, `sitemap.xml`, `robots.txt`.
2. Verify Google Search Console; submit sitemap.
3. Create/verify Google Business Profile (Northbrook) and keep NAP identical
   everywhere (name, address, phone once supplied).
4. Request indexing for home, /packages, /services/business-response-system.
5. Quarterly: review Search Console queries; expand FAQ with real questions.

## Roadmap (only when each has unique value)

Resources/Insights articles · Northbrook & Evanston service pages ·
photography/contractor/property-maintenance system pages.
