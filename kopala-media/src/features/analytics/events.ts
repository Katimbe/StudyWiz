import { appendEvent } from "../leads/store";

/**
 * Consent-aware analytics dispatcher (§38).
 * Pushes to the GTM dataLayer when present and records to the internal event
 * log (viewable in /admin) so conversion tracking is verifiable before GA4/GTM
 * IDs are supplied. No personal data is included in events.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export const AnalyticsEvents = {
  HeroCtaClick: "hero_cta_click",
  PackageView: "package_view",
  PackageCtaClick: "package_cta_click",
  ServiceView: "service_view",
  CaseStudyView: "case_study_view",
  ContactFormStart: "contact_form_start",
  ContactFormSubmit: "contact_form_submit",
  AssessmentStart: "assessment_start",
  AssessmentStepComplete: "assessment_step_complete",
  AssessmentSubmit: "assessment_submit",
  BookingClick: "booking_click",
  BookingComplete: "booking_complete",
  PhoneClick: "phone_click",
  EmailClick: "email_click",
  SocialClick: "social_click",
  FaqExpand: "faq_expand",
  RecommendationRequest: "recommendation_request",
} as const;

export function track(
  name: string,
  detail?: Record<string, string | number | boolean>,
) {
  const payload = { event: name, ...detail };
  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(payload);
  } catch {
    /* dataLayer unavailable */
  }
  appendEvent({ name, at: new Date().toISOString(), detail });
}
