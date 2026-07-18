import { site, hasBooking } from "@/config/site";

/**
 * Booking provider adapter (§26).
 * When site.bookingUrl is supplied (Calendly / Cal.com / Google Calendar), the
 * booking page links and embeds it. Until then, a request-a-call flow feeds the
 * same lead pipeline. See docs/integrations/booking.md.
 */

export const booking = {
  get isConfigured() {
    return hasBooking;
  },
  get url() {
    return site.bookingUrl;
  },
  get provider() {
    return site.bookingProvider || "external scheduler";
  },
  /** Deep-link that carries a lead reference into the scheduler. */
  urlForLead(leadId?: string) {
    if (!hasBooking) return "";
    const sep = site.bookingUrl.includes("?") ? "&" : "?";
    return leadId ? `${site.bookingUrl}${sep}lead=${encodeURIComponent(leadId)}` : site.bookingUrl;
  },
  get isEmbeddable() {
    return hasBooking && (site.bookingProvider === "calendly" || site.bookingProvider === "calcom");
  },
};
