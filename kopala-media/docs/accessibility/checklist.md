# Accessibility Checklist (WCAG 2.2 AA practices)

## Implemented

- [x] Semantic HTML: header/nav/main/footer, one h1 per page, logical heading order
- [x] Skip-navigation link (visible on focus)
- [x] Keyboard operability throughout; Escape closes menus/dropdowns; focus returns to trigger
- [x] Visible gold focus rings (`:focus-visible`)
- [x] Forms: every field labeled, `aria-invalid` + `aria-describedby` wiring,
      inline errors, role="alert" error summaries that receive focus
- [x] Multi-step form: progress as an ordered list with `aria-current="step"`,
      screen-reader step announcements (`aria-live`)
- [x] Success/empty/status states announced (`role="status"` / `aria-live`)
- [x] Radix primitives (accordion, checkbox, select) — keyboard + SR correct
- [x] Contrast: ivory on ink ≈ 15:1; gold on ink ≥ 4.5:1 for large/bold text;
      warm-gray secondary text ≥ 4.5:1 at 14px+
- [x] Touch targets ≥ 44px (nav, buttons, menu items)
- [x] `prefers-reduced-motion`: all reveals/animations disabled
- [x] Meaningful alt text; decorative images empty-alt; icons `aria-hidden`
- [x] No horizontal overflow at 360px+; readable type (16px+ body)
- [x] Honeypot hidden from AT (`aria-hidden`, tabindex -1)

## Test recipe (run each release)

1. Keyboard-only pass: home → assessment → submit with errors → fix → submit.
2. Screen-reader spot check (VoiceOver/NVDA): header nav, form errors, success panel.
3. Reduced-motion OS setting on: confirm no reveals/parallax.
4. Zoom to 200% at 1280px: no overlap or clipped content.
5. Mobile (390px): menu, forms, touch targets.

## Known limitations

- Third-party embeds (scheduler, when activated) must be evaluated when added.
- The admin dashboard is functional-accessible but optimized for desktop use.
