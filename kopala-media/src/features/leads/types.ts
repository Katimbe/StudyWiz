/** Lead data model (§25). CRM-ready; mirrors the adapter field mapping. */

export const LEAD_STATUSES = [
  "New",
  "Contacted",
  "Qualified",
  "Discovery Scheduled",
  "Proposal Sent",
  "Won",
  "Lost",
  "Nurture",
] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type LeadFormType = "contact" | "assessment" | "request-call";

export interface LeadInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  businessName?: string;
  businessType?: string;
  location?: string;
  currentWebsite?: string;
  primaryChallenge?: string;
  desiredOutcomes?: string[];
  servicesInterested?: string[];
  budgetRange?: string;
  timeline?: string;
  preferredContactMethod?: string;
  message?: string;
  // assessment extras
  howCustomersFind?: string;
  howInquiriesReceived?: string;
  responseProcess?: string;
  whoHandlesInquiries?: string;
  usesCrm?: string;
  usesBooking?: string;
  biggestOperationalChallenge?: string;
  biggestMarketingChallenge?: string;
  biggestResponseChallenge?: string;
  timeConsumingTasks?: string;
  whereLeadsLost?: string;
  whatFeelsDisconnected?: string;
  decisionStatus?: string;
  additionalInfo?: string;
  preferredDaysTimes?: string;
  // consent (required)
  consent: boolean;
}

export interface Lead extends LeadInput {
  id: string;
  formType: LeadFormType;
  leadSource: string;
  referrer?: string;
  utm: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
  };
  consentAt: string;
  status: LeadStatus;
  owner?: string;
  nextAction?: string;
  nextActionDate?: string;
  createdAt: string;
  updatedAt: string;
  history: { at: string; note: string }[];
  /** Hash of core payload — duplicate-submission detection (not PII). */
  payloadHash?: string;
}

export interface EmailLogEntry {
  id: string;
  leadId: string;
  kind: "customer-confirmation" | "internal-notification";
  to: string;
  subject: string;
  html: string;
  text: string;
  status: "queued" | "sent" | "failed";
  error?: string;
  createdAt: string;
}

export interface AnalyticsEvent {
  name: string;
  at: string;
  detail?: Record<string, string | number | boolean>;
}
