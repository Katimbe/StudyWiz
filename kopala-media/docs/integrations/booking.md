# Booking Guide

## Current behavior

`/book` runs a **request-a-call flow**: preferred days/times + timezone
(America/Chicago) → creates a lead in the pipeline → customer receives the
standard confirmation → Kopala Media is notified and confirms a time manually.
The assessment success screen also deep-links to booking. Booking is never
forced — an assessment can be submitted without booking.

## Activating a live scheduler

1. Create the booking page with your provider (Calendly, Cal.com, or Google
   Calendar appointment schedules). Suggested settings: 30-minute "Business
   Discovery Call", video or phone, buffer times, email confirmation +
   reschedule/cancel links (provider handles these).
2. In `src/config/site.ts` set:
   ```ts
   bookingUrl: "https://calendly.com/your-link/discovery-call",
   bookingProvider: "calendly", // or "calcom" | "google"
   ```
3. Redeploy. `/book` now offers the scheduler; success screens link directly
   into it with the lead reference appended (`?lead=<id>`) so bookings connect
   to lead records.

## Tracking

`booking_click` fires on every scheduler link; `booking_complete` fires on
request-call submissions. Provider-side webhook → lead-status update
("Discovery Scheduled") is the documented next iteration once the provider is
chosen.

## Owner must supply

- Provider choice + booking link
- Availability rules and meeting preferences (video/phone, duration, buffers)
