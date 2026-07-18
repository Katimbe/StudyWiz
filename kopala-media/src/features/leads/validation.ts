import type { LeadInput } from "./types";

/** Shared validation layer — used client-side now, mirrors the server-side
 *  rules a deployed endpoint must re-apply (see docs/architecture/). */

export type FieldErrors = Partial<Record<string, string>>;

export const isEmail = (v: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export const isPhone = (v: string) =>
  v.trim() === "" || /^[+()\-.\s\d]{7,20}$/.test(v.trim());

export const isUrl = (v: string) => {
  if (v.trim() === "") return true;
  try {
    const u = new URL(v.startsWith("http") ? v : `https://${v}`);
    return u.hostname.includes(".");
  } catch {
    return false;
  }
};

const req = (v: string | undefined) => (v && v.trim().length > 0 ? undefined : "This field is required.");

export function validateContact(input: Partial<LeadInput>): FieldErrors {
  const e: FieldErrors = {};
  e.firstName = req(input.firstName) ?? (input.firstName!.trim().length < 2 ? "Please enter your name." : undefined);
  e.email = req(input.email) ?? (!isEmail(input.email!) ? "Please enter a valid email address." : undefined);
  e.message = req(input.message) ?? (input.message!.trim().length < 10 ? "Please tell us a little more (at least 10 characters)." : undefined);
  if (input.phone && !isPhone(input.phone)) e.phone = "Please enter a valid phone number.";
  if (input.currentWebsite && !isUrl(input.currentWebsite)) e.currentWebsite = "Please enter a valid website address.";
  if (!input.consent) e.consent = "Please confirm you're happy for us to contact you about your inquiry.";
  return strip(e);
}

export function validateAssessmentStep(step: number, input: Partial<LeadInput>): FieldErrors {
  const e: FieldErrors = {};
  if (step === 1) {
    e.firstName = req(input.firstName);
    e.lastName = req(input.lastName);
    e.businessName = req(input.businessName);
    e.email = req(input.email) ?? (!isEmail(input.email ?? "") ? "Please enter a valid email address." : undefined);
    e.location = req(input.location);
    e.businessType = req(input.businessType);
    if (input.phone && !isPhone(input.phone)) e.phone = "Please enter a valid phone number.";
    if (input.currentWebsite && !isUrl(input.currentWebsite)) e.currentWebsite = "Please enter a valid website address.";
  }
  if (step === 2) {
    e.howCustomersFind = req(input.howCustomersFind);
    e.howInquiriesReceived = req(input.howInquiriesReceived);
    e.whoHandlesInquiries = req(input.whoHandlesInquiries);
    e.usesCrm = req(input.usesCrm);
    e.usesBooking = req(input.usesBooking);
  }
  if (step === 3) {
    e.biggestOperationalChallenge = req(input.biggestOperationalChallenge);
    e.biggestResponseChallenge = req(input.biggestResponseChallenge);
  }
  if (step === 4) {
    if (!input.desiredOutcomes || input.desiredOutcomes.length === 0)
      e.desiredOutcomes = "Please select at least one outcome.";
  }
  if (step === 5) {
    if (!input.servicesInterested || input.servicesInterested.length === 0)
      e.servicesInterested = "Please select at least one service.";
    e.budgetRange = req(input.budgetRange);
    e.timeline = req(input.timeline);
    e.preferredContactMethod = req(input.preferredContactMethod);
  }
  if (step === 6) {
    if (!input.consent) e.consent = "Please confirm you're happy for us to contact you about your assessment.";
  }
  return strip(e);
}

export function validateRequestCall(input: Partial<LeadInput>): FieldErrors {
  const e: FieldErrors = {};
  e.firstName = req(input.firstName);
  e.businessName = req(input.businessName);
  e.email = req(input.email) ?? (!isEmail(input.email ?? "") ? "Please enter a valid email address." : undefined);
  e.phone = req(input.phone) ?? (!isPhone(input.phone ?? "") ? "Please enter a valid phone number." : undefined);
  e.preferredDaysTimes = req(input.preferredDaysTimes);
  if (!input.consent) e.consent = "Please confirm you're happy for us to contact you.";
  return strip(e);
}

function strip(e: FieldErrors): FieldErrors {
  return Object.fromEntries(Object.entries(e).filter(([, v]) => v !== undefined));
}

export const hasErrors = (e: FieldErrors) => Object.keys(e).length > 0;
