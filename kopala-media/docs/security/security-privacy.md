# Security & Privacy Controls

## Implemented

- **Validation:** strict schema validation on every field, client-side now with
  a documented server-side mirror (re-apply all rules at any future endpoint).
- **Spam protection:** honeypot field + minimum fill-time (1.5s) trap. Bot
  submissions are discarded without storage.
- **Rate limiting:** 5 submissions/hour per browser with clear retry messaging.
- **Duplicate protection:** SHA-256 payload hash + email, 24h window.
- **Double-submit guard:** in-flight submission lock.
- **Secrets:** none in the client bundle. `.env.example` documents what belongs
  server-side only (Resend/HubSpot/Twilio keys).
- **Consent recording:** timestamped consent on every lead.
- **Logging hygiene:** email failures logged without message contents; no PII
  in analytics events.
- **Output encoding:** all email template variables HTML-escaped; React escapes
  rendered content by default.
- **Admin:** passphrase gate (interim), session-scoped unlock, noindex.
- **Headers:** recommended CSP/security header set documented in
  docs/deployment/.

## At server upgrade (required)

Server-side re-validation · endpoint rate limiting · CAPTCHA option (Turnstile)
· authenticated admin · least-privilege DB keys · audit log.

## Data retention guidance

Leads exist to be acted on, not hoarded. Recommended: export monthly, delete
`Lost`/stale leads after 12 months, delete on request (dashboard supports
per-lead deletion). Privacy Policy covers collection, use, retention, and
contact for requests.

## Dependency hygiene

Run `npm audit` before each deploy; pin major versions; review Radix/Tailwind
updates quarterly.
