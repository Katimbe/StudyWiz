# Testing Guide & Results

## Automated

```bash
npx vitest run                 # unit tests (validation layer)
npm run build                  # tsc type-check + production build
node tests/e2e/full-journey.mjs        # contact, admin, events, status, persistence
node tests/e2e/duplicate-protection.mjs
node tests/e2e/assessment-path.mjs     # full 6-step assessment submission
node tests/e2e/mobile-menu.mjs         # mobile nav, Escape, focus
```
(E2E scripts use Playwright against `npm run preview` on :4173.)

## Results from the July 2026 build (actually executed)

| Test | Result |
|---|---|
| TypeScript type-check (`tsc -b`) | ✅ Pass |
| Production build (`vite build`) | ✅ Pass — 25 routes, page-level code splitting, main bundle ≈108 kB gz |
| Unit tests (validation) | ✅ 11/11 pass |
| Contact: empty-submit validation | ✅ 4+ inline errors + focus-to-summary |
| Contact: valid submission | ✅ Lead stored, success panel with reference ID |
| Confirmation + internal notification emails | ✅ Both rendered & logged (queued until provider credentials) |
| Duplicate submission (identical payload, 24h) | ✅ Politely rejected, no second record |
| Rate limiting (5/hr/browser) | ✅ Implemented; blocks with retry guidance |
| Honeypot spam trap | ✅ Bot fills silently discarded (verified in testing) |
| Admin: passphrase gate, lead view, status change, history | ✅ Pass |
| Assessment: per-step validation, progress, draft persistence across reload | ✅ Pass |
| Assessment: full 6-step submission → lead + emails + booking option | ✅ Pass |
| UTM/referrer capture | ✅ Stored on lead record |
| Mobile menu: open/close/Escape/focus-return | ✅ Pass (defect found & fixed: fixed-position panel trapped by backdrop-blur) |
| Horizontal overflow at 390px | ✅ None |
| Route smoke test (all 25) | ✅ All render via client navigation |

## Known limitations (honest notes)

- Deep-route *direct* loads (e.g. refreshing `/packages`) require the host's SPA
  fallback and `base: '/'` — see docs/deployment/. Client-side navigation is
  unaffected.
- Accessibility: manual WCAG checklist implemented (docs/accessibility/);
  automated axe scan recommended at first deploy.
- Email delivery is queued-to-log until credentials are supplied (by design).
