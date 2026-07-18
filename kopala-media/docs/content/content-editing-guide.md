# Content Editing Guide

**Rule:** never edit page components to change business facts. Everything
editable lives in `src/config/site.ts` and `src/content/`.

| To change… | Edit |
|---|---|
| Contact email, phone, socials, booking link, domain, admin passphrase | `src/config/site.ts` |
| Service descriptions & detail pages | `src/content/services.ts` |
| Packages, prices, support plans, payment terms | `src/content/packages.ts` |
| Industries | `src/content/industries.ts` |
| Case studies (add screenshots/links/testimonials) | `src/content/caseStudies.ts` |
| FAQs (home / all / BRS) | `src/content/faqs.ts` |
| The 7-stage method | `src/content/process.ts` |
| Navigation & footer links | `src/content/navigation.ts` |
| Legal pages | `src/pages/Legal.tsx` (marked drafts — review before final) |

## Adding a case-study screenshot, link, or testimonial

In `src/content/caseStudies.ts`, set `liveUrl` and/or `testimonial` on the
entry — the page renders them automatically. **Only publish real, approved
material.** Screenshots go in `public/brand/` or a new `public/case-studies/`
folder with descriptive filenames and alt text.

## Adding a new service page

Add an entry to `servicePages` in `src/content/services.ts` — the route, SEO,
breadcrumbs and CTAs generate automatically.

## Adding a new page

Create `src/pages/MyPage.tsx`, add a lazy route in `src/App.tsx`, add it to
navigation and `public/sitemap.xml`.

## Copy standards (from the brand brief)

- Lead with business value before technical features.
- No invented testimonials, metrics, clients, or claims — ever.
- Prices are "starting at"; scope conditions stay visible.
- Avoid clichés ("unlock your potential", "cutting-edge", "one-stop shop"…).
