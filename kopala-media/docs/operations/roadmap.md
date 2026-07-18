# Roadmap & Known Limitations

## Activation queue (waiting on owner items — see Missing Items list)

1. Contact email/phone → appear in header CTA area, contact page, footer.
2. Domain → canonical URLs, sitemap, OG tags, Search Console.
3. Booking link → live scheduler on /book + success screens.
4. Email endpoint → live confirmation + notification delivery.
5. CRM choice → adapter activation (mapping ready).
6. GA4/GTM → analytics activation (events already flowing).
7. SMS/WhatsApp → activates SMS Terms page + consent checkboxes on forms.
8. Case-study links/screenshots/testimonials → publish on case-study pages.
9. Transparent-background logo variant → header/footer refinement.
10. Legal review → finalize Privacy/Terms drafts.

## Product roadmap

- **Phase 2 (after activation):** serverless lead endpoint + Supabase/Postgres
  storage, authenticated admin, booking webhook → status sync, Turnstile.
- **Phase 3:** Resources/Insights hub, per-city and per-industry pages (unique
  content each), newsletter with double opt-in.
- **Phase 4:** Client portal, support center, Kopala Group ecosystem expansion.

## Known limitations (current build)

- Lead storage is per-browser (documented upgrade path).
- Admin passphrase is an interim control, not server auth.
- Deep-route direct loads need host SPA fallback + `base: '/'` (deployment doc).
- No server-rendered HTML (SPA); SEO-critical content is client-rendered — fine
  for modern crawlers, with Next.js migration documented if SSR is ever required.
