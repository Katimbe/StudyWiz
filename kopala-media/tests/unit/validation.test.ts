import { describe, it, expect } from "vitest";
import {
  isEmail, isPhone, isUrl, validateContact, validateAssessmentStep,
  validateRequestCall, hasErrors,
} from "../../src/features/leads/validation";

describe("field validators", () => {
  it("accepts and rejects emails correctly", () => {
    expect(isEmail("owner@business.com")).toBe(true);
    expect(isEmail("not-an-email")).toBe(false);
    expect(isEmail("a@b")).toBe(false);
  });
  it("accepts optional phone formats", () => {
    expect(isPhone("")).toBe(true);
    expect(isPhone("+1 (847) 555-0100")).toBe(true);
    expect(isPhone("call me maybe")).toBe(false);
  });
  it("accepts urls with or without protocol", () => {
    expect(isUrl("")).toBe(true);
    expect(isUrl("example.com")).toBe(true);
    expect(isUrl("https://example.com/page")).toBe(true);
    expect(isUrl("not a url at all")).toBe(false);
  });
});

describe("contact form validation", () => {
  it("requires name, email, message and consent", () => {
    const errs = validateContact({});
    expect(errs.firstName).toBeTruthy();
    expect(errs.email).toBeTruthy();
    expect(errs.message).toBeTruthy();
    expect(errs.consent).toBeTruthy();
    expect(hasErrors(errs)).toBe(true);
  });
  it("passes a complete valid submission", () => {
    const errs = validateContact({
      firstName: "Test",
      email: "t@example.com",
      message: "We need help responding to inquiries faster.",
      consent: true,
    });
    expect(hasErrors(errs)).toBe(false);
  });
  it("rejects invalid email and short message", () => {
    const errs = validateContact({
      firstName: "Test", email: "bad", message: "short", consent: true,
    });
    expect(errs.email).toBeTruthy();
    expect(errs.message).toBeTruthy();
  });
});

describe("assessment step validation", () => {
  it("step 1 requires core business info", () => {
    const errs = validateAssessmentStep(1, {});
    expect(Object.keys(errs).length).toBeGreaterThan(3);
  });
  it("step 4 requires at least one outcome", () => {
    expect(validateAssessmentStep(4, {}).desiredOutcomes).toBeTruthy();
    expect(hasErrors(validateAssessmentStep(4, { desiredOutcomes: ["Respond faster"] }))).toBe(false);
  });
  it("step 5 requires services, budget, timeline, contact method", () => {
    const errs = validateAssessmentStep(5, {});
    expect(errs.servicesInterested).toBeTruthy();
    expect(errs.budgetRange).toBeTruthy();
    expect(errs.timeline).toBeTruthy();
    expect(errs.preferredContactMethod).toBeTruthy();
  });
  it("step 6 requires consent", () => {
    expect(validateAssessmentStep(6, {}).consent).toBeTruthy();
    expect(hasErrors(validateAssessmentStep(6, { consent: true }))).toBe(false);
  });
});

describe("request-call validation", () => {
  it("requires contact details and preferred times", () => {
    const errs = validateRequestCall({});
    expect(errs.preferredDaysTimes).toBeTruthy();
    expect(hasErrors(errs)).toBe(true);
  });
});
