# Analytics Guide

## Event taxonomy (live today)

All events fire through `track()` (`src/features/analytics/events.ts`) into
`window.dataLayer` (GTM-ready) **and** the internal event log (`/admin` →
"Events") so tracking is verifiable before any external tool exists.

| Event | Fires when |
|---|---|
| `hero_cta_click` | Hero primary CTA clicked |
| `package_view` | Packages page viewed |
| `package_cta_click` | Package primary/secondary CTA clicked (`detail.package`) |
| `service_view` | Service card clicked |
| `case_study_view` | Case study viewed |
| `contact_form_start` / `contact_form_submit` | Contact form first interaction / successful submit |
| `assessment_start` / `assessment_step_complete` / `assessment_submit` | Assessment lifecycle (`detail.step`) |
| `booking_click` | Any booking entry point clicked (`detail.location`) |
| `booking_complete` | Request-call submitted (until provider webhook exists) |
| `phone_click` / `email_click` / `social_click` | Contact/social links (render when supplied) |
| `faq_expand` | FAQ question opened |
| `recommendation_request` | "Request a Recommendation" clicked |

Rules: snake_case names; no personal data in any event; detail values are
slugs/labels only.

## Activating GA4 / GTM

1. Create a GTM container; set `VITE_GTM_ID` and add the GTM snippet to
   `index.html` (or inject via host). Events already flow to `dataLayer`.
2. In GTM, create Custom Event triggers for the names above and send to GA4.
3. Mark `assessment_submit`, `contact_form_submit`, `booking_click` as key events.
4. Verify with the internal event log side-by-side for the first week.

## Consent

The site currently collects only functional, privacy-respecting events. If
advertising cookies are ever added, add a consent banner first and gate
non-essential tags behind it.
