/**
 * Central business configuration — the single place to update company facts.
 * Everything here is owner-editable. See docs/content/content-editing-guide.md.
 *
 * Items marked TODO(OWNER) are awaiting supplied information; the site is built
 * to work without them and activates features automatically once provided.
 */

export const site = {
  name: "Kopala Media",
  legalName: "Kopala Media", // TODO(OWNER): registered legal entity name, if different
  founder: "Katimbe Kabezya",
  founderRole: "Founder & Strategic Systems Entrepreneur",
  positioning: "Kopala Media builds the systems behind business growth.",
  promise:
    "We identify where your business is losing time and opportunities, then build the digital system that helps fix it.",
  qualityPrinciple:
    "When a client's budget cannot support the requested scope, we reduce the scope, not the standard.",
  description:
    "Kopala Media is a digital transformation and business-growth systems company that helps small and medium-sized businesses become more visible, operate more efficiently, capture more customer opportunities, and reduce administrative workload.",

  // Contact — TODO(OWNER): supply official contact details
  email: "", // e.g. hello@kopalamedia.com — shown publicly only when set
  phone: "", // e.g. +1 (847) 555-0100 — shown publicly only when set

  // Location & service area
  city: "Northbrook",
  state: "Illinois",
  serviceArea:
    "Northbrook, Illinois · Serving the North Shore, Chicagoland and select remote clients",
  localAreas: [
    "Northbrook",
    "Evanston",
    "Glenview",
    "Skokie",
    "Deerfield",
    "Wheeling",
    "Chicago and surrounding areas",
    "Remote clients across the United States",
  ],
  timeZone: "America/Chicago (Central Time)",

  // Production URL — TODO(OWNER): set when domain is confirmed (used for
  // canonical URLs, sitemap and Open Graph tags)
  url: "https://www.kopalamedia.com",

  // Booking — TODO(OWNER): supply provider link to activate the live scheduler
  // (Calendly / Cal.com / Google Calendar appointment page). Until set, the
  // /book page uses a request-a-call flow that feeds the same lead pipeline.
  bookingUrl: "",
  bookingProvider: "" as "" | "calendly" | "calcom" | "google",

  // Social — TODO(OWNER): supply profile URLs; icons render only when set
  social: {
    linkedin: "",
    instagram: "",
    facebook: "",
    x: "",
    youtube: "",
  },

  // Email delivery (server-side activation — see .env.example and
  // docs/integrations/email.md). Until activated, messages are captured in the
  // email log inside the lead dashboard so the workflow is fully testable.
  emailNotificationsTo: "", // internal lead notification recipient

  // Analytics — TODO(OWNER): GA4 / GTM IDs; events already fire to dataLayer
  gtmId: "",

  // Admin dashboard passphrase — owner sets this to open /admin.
  // Interim control until server-side auth exists (see docs/operations/).
  adminPassphrase: "kopala-admin",
} as const;

export const hasContactEmail = site.email.length > 0;
export const hasPhone = site.phone.length > 0;
export const hasBooking = site.bookingUrl.length > 0;
