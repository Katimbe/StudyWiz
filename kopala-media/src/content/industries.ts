/** Industries served — each with its distinct operational reality (§22). */

export interface Industry {
  id: string;
  name: string;
  challenge: string;
  responseGap: string;
  recommendedSystem: string;
  automation: string;
  package: string;
}

export const industries: Industry[] = [
  {
    id: "contractors",
    name: "Contractors & Remodelers",
    challenge:
      "Quote requests arrive while crews are on site, and detailed estimates take hours the owner doesn't have in the evening.",
    responseGap:
      "A homeowner comparing three contractors usually hires the one who responds first with something professional.",
    recommendedSystem:
      "A professional website with structured quote-request intake, a lead pipeline for open estimates, and booking for site visits.",
    automation:
      "Instant quote-request acknowledgement, estimate follow-up sequences, and appointment reminders.",
    package: "Business Response System",
  },
  {
    id: "property-maintenance",
    name: "Property-Maintenance Companies",
    challenge:
      "Recurring clients, one-off jobs and seasonal demand all arrive through different channels with no single schedule or record.",
    responseGap:
      "Missed calls during jobs become missed contracts — especially for recurring commercial work.",
    recommendedSystem:
      "Customer intake connected to a CRM with service history, plus a maintenance-request pathway for existing clients.",
    automation:
      "Request acknowledgements, seasonal re-engagement campaigns, and follow-up on open quotes.",
    package: "Business Response System",
  },
  {
    id: "electricians",
    name: "Electricians & Home Services",
    challenge:
      "Urgent and routine work arrive through the same channels, and the person doing the work is also the person answering the phone.",
    responseGap:
      "Urgent jobs go to whoever answers; routine quotes go to whoever follows up.",
    recommendedSystem:
      "A clear service website with triaged intake (urgent vs. planned work), booking, and a lead pipeline.",
    automation:
      "Immediate acknowledgement with expectation-setting, urgent-request alerts, and quote follow-up.",
    package: "Business Response System",
  },
  {
    id: "photographers",
    name: "Photographers & Creative Professionals",
    challenge:
      "The work is visual and personal, but inquiries often arrive through DMs and get lost between platforms.",
    responseGap:
      "Slow or scattered replies cost bookings in a market where clients enquire with several photographers at once.",
    recommendedSystem:
      "A portfolio-led website with structured inquiry and booking-request intake — as delivered for Chipiliro Khonje Photography.",
    automation:
      "Inquiry acknowledgement with package information, booking follow-up, and pre-session reminders.",
    package: "Visibility Foundation",
  },
  {
    id: "consultants",
    name: "Consultants & Professional Services",
    challenge:
      "Credibility is the product — yet the website, intake and follow-up often lag behind the expertise being sold.",
    responseGap:
      "A slow or generic response to an inquiry undercuts the premium positioning the work depends on.",
    recommendedSystem:
      "A polished digital presence with discovery-call booking, structured intake, and proposal follow-up workflows.",
    automation:
      "Booking confirmations, pre-call questionnaires, and proposal follow-up sequences.",
    package: "Growth Operations System",
  },
  {
    id: "care-services",
    name: "Care-Service Businesses",
    challenge:
      "Inquiries come from families making sensitive, time-pressured decisions and expecting a careful, human response.",
    responseGap:
      "An unanswered inquiry isn't just a lost lead — it's a family that needed help and moved on.",
    recommendedSystem:
      "A trust-led website with gentle, structured intake and a carefully managed follow-up pipeline.",
    automation:
      "Immediate warm acknowledgement, scheduled callbacks, and follow-up that respects the decision process.",
    package: "Business Response System",
  },
  {
    id: "local-service",
    name: "Local Service Companies",
    challenge:
      "Referrals built the business, but growth past a point requires being findable — and being easy to contact.",
    responseGap:
      "Customers who can't find a professional website or a clear way to enquire often don't enquire at all.",
    recommendedSystem:
      "A professional website with local search foundations, contact and quote intake, and basic booking.",
    automation:
      "Inquiry acknowledgement, review-request follow-up, and simple reporting on where inquiries come from.",
    package: "Visibility Foundation",
  },
  {
    id: "professional-services",
    name: "Professional Service Providers",
    challenge:
      "Client work fills the week; business development, follow-up and marketing happen in the gaps — or not at all.",
    responseGap:
      "Inconsistent follow-up means a pipeline that alternates between too much work and not enough.",
    recommendedSystem:
      "CRM with a clear pipeline, connected intake, and marketing support that runs on a system rather than spare time.",
    automation:
      "Lead nurture sequences, re-engagement of past clients, and monthly performance reporting.",
    package: "Growth Operations System",
  },
  {
    id: "software-companies",
    name: "Small Software Companies",
    challenge:
      "Strong product, thin operations: demo requests, support questions and sales inquiries share one inbox.",
    responseGap:
      "Slow demo follow-up quietly caps growth no matter how good the product is.",
    recommendedSystem:
      "Structured demo and inquiry intake, CRM pipeline with qualification, and reporting on conversion.",
    automation:
      "Demo scheduling, qualified-lead routing, and onboarding email sequences.",
    package: "Growth Operations System",
  },
  {
    id: "agencies-creative",
    name: "Agencies & Creative Studios",
    challenge:
      "Client delivery consumes capacity; the studio's own presence, intake and follow-up get the leftover hours.",
    responseGap:
      "The cobbler's-children problem: excellent work for clients, an outdated shopfront for yourself.",
    recommendedSystem:
      "A presence that matches the work, structured project intake, and a pipeline for new business.",
    automation:
      "Intake acknowledgement, scoping questionnaires, and proposal follow-up.",
    package: "Visibility Foundation",
  },
];
