# Lead Management & Admin Operations

## The dashboard — `/admin`

Passphrase-gated (set `adminPassphrase` in `src/config/site.ts` — **change the
default before launch**). Three views:

1. **Leads** — every submission (contact, assessment, request-call) with full
   detail, UTM/referrer data, consent timestamp, and history. Update status,
   set next actions, delete records.
2. **Email log** — every confirmation/notification rendered, with delivery
   status once email is connected.
3. **Events** — analytics event stream recorded on this device.

> Storage is per-browser today. Use the browser on the device you check
> regularly, and export CSV/JSON weekly (buttons in the dashboard header) until
> a server backend is connected (docs/architecture/overview.md).

## Recommended operating rhythm

- **Daily:** new leads → contact within 1 business day (the confirmation email
  promises 1–2) → set status `Contacted`, log next action.
- **After each discovery call:** status → `Qualified` / `Discovery Scheduled` /
  `Proposal Sent`.
- **Weekly:** export CSV backup; review events for CTA performance.
- **Monthly:** review `Nurture` list for re-engagement.

## Lead statuses

New → Contacted → Qualified → Discovery Scheduled → Proposal Sent → Won / Lost ·
(Nurture for not-now leads).

## Server upgrade path

Set `VITE_LEADS_ENDPOINT` and swap the store's read/write functions for API
calls (contract in `store.ts`). Add server-side auth at that point; the
passphrase gate is an interim control only.
