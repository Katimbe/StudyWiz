import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { TextField, TextAreaField, SelectField, ConsentField, Honeypot, ErrorSummary, ChecklistField } from "./fields";
import { useLeadSubmit } from "./useLeadSubmit";
import { SuccessPanel } from "./SuccessPanel";
import { validateAssessmentStep, hasErrors, type FieldErrors } from "@/features/leads/validation";
import { track, AnalyticsEvents } from "@/features/analytics/events";
import type { LeadInput } from "@/features/leads/types";

const STORAGE_KEY = "km.assessment.draft.v1";

const STEPS = [
  "Business information",
  "Current customer journey",
  "Business challenges",
  "Desired outcomes",
  "Project details",
  "Review & consent",
] as const;

const outcomeOptions = [
  "Improve visibility",
  "Generate more inquiries",
  "Respond faster",
  "Organize leads",
  "Automate follow-up",
  "Improve booking",
  "Reduce administrative work",
  "Improve marketing",
  "Build a custom system",
  "Other",
];

const serviceOptions = [
  "Business Response System",
  "Website Design",
  "CRM & Lead Management",
  "Business Automation",
  "AI-Assisted Systems",
  "Marketing & Content",
  "Custom Digital Tools",
  "Ongoing Support",
];

const budgetOptions = [
  "Under $2,500",
  "$2,500–$4,499",
  "$4,500–$7,499",
  "$7,500–$15,000",
  "$15,000+",
  "Not sure yet",
].map((v) => ({ value: v, label: v }));

const timelineOptions = ["As soon as possible", "Within 1–2 months", "Within 3–6 months", "Exploring options"].map((v) => ({ value: v, label: v }));
const yesNoUnsure = ["Yes", "No", "Not sure"].map((v) => ({ value: v, label: v }));
const contactMethodOptions = ["Email", "Phone", "Video call", "Either email or phone"].map((v) => ({ value: v, label: v }));

function loadDraft(): Partial<LeadInput> {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function AssessmentForm() {
  const { state, submit, honeypot, setHoneypot } = useLeadSubmit("assessment");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Partial<LeadInput>>(() => loadDraft());
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    track(AnalyticsEvents.AssessmentStart);
  }, []);

  const set = (k: keyof LeadInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const setVal = (k: keyof LeadInput, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const next = () => {
    const errs = validateAssessmentStep(step, form);
    setErrors(errs);
    if (hasErrors(errs)) return;
    track(AnalyticsEvents.AssessmentStepComplete, { step });
    setStep((s) => Math.min(6, s + 1));
    document.getElementById("assessment-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const back = () => {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  };

  const onSubmit = async () => {
    const errs = validateAssessmentStep(6, form);
    setErrors(errs);
    if (hasErrors(errs)) return;
    const result = await submit(form as LeadInput);
    if (result.phase === "success") {
      track(AnalyticsEvents.AssessmentSubmit);
      sessionStorage.removeItem(STORAGE_KEY);
    }
  };

  const reviewRows = useMemo(
    () =>
      (
        [
          ["Name", `${form.firstName ?? ""} ${form.lastName ?? ""}`.trim()],
          ["Business", form.businessName],
          ["Email", form.email],
          ["Phone", form.phone],
          ["Location", form.location],
          ["Business type", form.businessType],
          ["Current website", form.currentWebsite],
          ["Customers find you via", form.howCustomersFind],
          ["Inquiries arrive via", form.howInquiriesReceived],
          ["Handled by", form.whoHandlesInquiries],
          ["Uses a CRM", form.usesCrm],
          ["Uses booking software", form.usesBooking],
          ["Operational challenge", form.biggestOperationalChallenge],
          ["Response challenge", form.biggestResponseChallenge],
          ["Desired outcomes", form.desiredOutcomes?.join(", ")],
          ["Services of interest", form.servicesInterested?.join(", ")],
          ["Budget range", form.budgetRange],
          ["Timeline", form.timeline],
          ["Preferred contact", form.preferredContactMethod],
        ] as [string, string | undefined][]
      ).filter(([, v]) => v),
    [form],
  );

  if (state.phase === "success" && state.lead.id) return <SuccessPanel lead={state.lead} variant="assessment" />;
  if (state.phase === "duplicate") return <SuccessPanel lead={state.lead} variant="duplicate" />;

  return (
    <div id="assessment-top" className="relative">
      {/* Progress */}
      <ol aria-label="Assessment progress" className="mb-10 flex flex-wrap items-center gap-2">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const done = n < step;
          const active = n === step;
          return (
            <li key={label} className="flex items-center gap-2">
              <span
                aria-current={active ? "step" : undefined}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border font-display text-xs font-bold",
                  active
                    ? "border-gold bg-gold text-ink"
                    : done
                      ? "border-gold/50 bg-gold/15 text-gold-bright"
                      : "border-ivory/20 text-warmgray",
                )}
              >
                {n}
              </span>
              <span className={cn("hidden text-xs lg:inline", active ? "text-ivory" : "text-warmgray/70")}>{label}</span>
              {n < STEPS.length && <span aria-hidden="true" className="h-px w-4 bg-ivory/15 sm:w-6" />}
            </li>
          );
        })}
      </ol>
      <p className="sr-only" aria-live="polite">
        Step {step} of 6: {STEPS[step - 1]}
      </p>

      <div className="rounded-2xl border border-ivory/10 bg-graphite/50 p-6 sm:p-10">
        <Honeypot value={honeypot.current} onChange={setHoneypot} />
        <h2 className="font-display text-xl font-bold text-ivory sm:text-2xl">
          Step {step}: {STEPS[step - 1]}
        </h2>
        <div className="mt-6 flex flex-col gap-5">
          {hasErrors(errors) && <ErrorSummary errors={errors} />}

          {step === 1 && (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField label="First name" autoComplete="given-name" required value={form.firstName ?? ""} onChange={set("firstName")} error={errors.firstName} />
                <TextField label="Last name" autoComplete="family-name" required value={form.lastName ?? ""} onChange={set("lastName")} error={errors.lastName} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField label="Business name" autoComplete="organization" required value={form.businessName ?? ""} onChange={set("businessName")} error={errors.businessName} />
                <TextField label="Business type" placeholder="e.g. electrical services, photography" required value={form.businessType ?? ""} onChange={set("businessType")} error={errors.businessType} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField label="Email" type="email" autoComplete="email" required value={form.email ?? ""} onChange={set("email")} error={errors.email} />
                <TextField label="Phone" type="tel" autoComplete="tel" optional value={form.phone ?? ""} onChange={set("phone")} error={errors.phone} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField label="Location" placeholder="City, State" required value={form.location ?? ""} onChange={set("location")} error={errors.location} />
                <TextField label="Current website" type="url" inputMode="url" optional placeholder="https://" value={form.currentWebsite ?? ""} onChange={set("currentWebsite")} error={errors.currentWebsite} />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <TextAreaField label="How do customers currently find your business?" placeholder="e.g. referrals, Google, social media…" required value={form.howCustomersFind ?? ""} onChange={set("howCustomersFind")} error={errors.howCustomersFind} />
              <TextAreaField label="How do inquiries reach you today?" placeholder="e.g. phone calls, email, website form, Instagram DMs…" required value={form.howInquiriesReceived ?? ""} onChange={set("howInquiriesReceived")} error={errors.howInquiriesReceived} />
              <TextAreaField label="What does your typical response process look like?" optional hint="How quickly do you usually respond, and what happens next?" value={form.responseProcess ?? ""} onChange={set("responseProcess")} />
              <div className="grid gap-5 sm:grid-cols-3">
                <SelectField label="Who handles inquiries?" options={["Just me", "Me and a partner", "A small team", "An office/admin person", "Nobody consistently"].map((v) => ({ value: v, label: v }))} placeholder="Select…" value={form.whoHandlesInquiries ?? ""} onChange={set("whoHandlesInquiries")} error={errors.whoHandlesInquiries} />
                <SelectField label="Do you use a CRM?" options={yesNoUnsure} placeholder="Select…" value={form.usesCrm ?? ""} onChange={set("usesCrm")} error={errors.usesCrm} />
                <SelectField label="Do you use booking software?" options={yesNoUnsure} placeholder="Select…" value={form.usesBooking ?? ""} onChange={set("usesBooking")} error={errors.usesBooking} />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <TextAreaField label="What is your biggest operational challenge?" required value={form.biggestOperationalChallenge ?? ""} onChange={set("biggestOperationalChallenge")} error={errors.biggestOperationalChallenge} />
              <TextAreaField label="What is your biggest marketing challenge?" optional value={form.biggestMarketingChallenge ?? ""} onChange={set("biggestMarketingChallenge")} />
              <TextAreaField label="What is your biggest customer-response challenge?" required value={form.biggestResponseChallenge ?? ""} onChange={set("biggestResponseChallenge")} error={errors.biggestResponseChallenge} />
              <TextAreaField label="Which tasks consume the most of your time?" optional value={form.timeConsumingTasks ?? ""} onChange={set("timeConsumingTasks")} />
              <TextAreaField label="Where do you suspect leads are being lost?" optional value={form.whereLeadsLost ?? ""} onChange={set("whereLeadsLost")} />
              <TextAreaField label="What currently feels disconnected in your business?" optional value={form.whatFeelsDisconnected ?? ""} onChange={set("whatFeelsDisconnected")} />
            </>
          )}

          {step === 4 && (
            <ChecklistField
              label="What outcomes do you want? Select all that apply."
              options={outcomeOptions}
              values={form.desiredOutcomes ?? []}
              onChange={(v) => setVal("desiredOutcomes", v)}
              error={errors.desiredOutcomes}
            />
          )}

          {step === 5 && (
            <>
              <ChecklistField
                label="Which services are you interested in?"
                options={serviceOptions}
                values={form.servicesInterested ?? []}
                onChange={(v) => setVal("servicesInterested", v)}
                error={errors.servicesInterested}
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <SelectField label="Budget range" options={budgetOptions} placeholder="Select…" value={form.budgetRange ?? ""} onChange={set("budgetRange")} error={errors.budgetRange} />
                <SelectField label="Desired timeline" options={timelineOptions} placeholder="Select…" value={form.timeline ?? ""} onChange={set("timeline")} error={errors.timeline} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <SelectField label="Where are you in the decision?" options={["Ready to start", "Comparing options", "Researching for later"].map((v) => ({ value: v, label: v }))} placeholder="Select…" value={form.decisionStatus ?? ""} onChange={set("decisionStatus")} optional />
                <SelectField label="Preferred contact method" options={contactMethodOptions} placeholder="Select…" value={form.preferredContactMethod ?? ""} onChange={set("preferredContactMethod")} error={errors.preferredContactMethod} />
              </div>
              <TextAreaField label="Anything else we should know?" optional value={form.additionalInfo ?? ""} onChange={set("additionalInfo")} />
            </>
          )}

          {step === 6 && (
            <>
              <div className="rounded-xl border border-ivory/10 bg-charcoal p-5">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-gold">Review your answers</h3>
                <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {reviewRows.map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-xs uppercase tracking-wider text-warmgray">{k}</dt>
                      <dd className="mt-0.5 text-sm text-ivory/90">{v}</dd>
                    </div>
                  ))}
                </dl>
                <button type="button" onClick={() => setStep(1)} className="mt-4 text-sm text-gold underline underline-offset-2 hover:text-gold-bright">
                  Edit answers
                </button>
              </div>
              <ConsentField checked={form.consent ?? false} onChange={(v) => setVal("consent", v)} error={errors.consent} />
              {state.phase === "rate-limited" && (
                <div role="alert" className="rounded-xl border border-amber-400/40 bg-amber-500/10 p-4 text-sm text-amber-200">
                  We've received several submissions recently from this device. Please try again in about {state.retryAfterMinutes} minutes.
                </div>
              )}
              {state.phase === "error" && (
                <div role="alert" className="rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-200">
                  {state.message}
                </div>
              )}
            </>
          )}
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-between gap-4 border-t border-ivory/10 pt-6">
          <button type="button" onClick={back} disabled={step === 1 || state.phase === "submitting"} className="btn-outline !px-4 !py-2.5 disabled:invisible">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
          </button>
          {step < 6 ? (
            <button type="button" onClick={next} className="btn-gold !px-5 !py-2.5">
              Continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <button type="button" onClick={onSubmit} disabled={state.phase === "submitting"} className="btn-gold !px-5 !py-2.5">
              {state.phase === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Submitting…
                </>
              ) : (
                "Submit Assessment"
              )}
            </button>
          )}
        </div>
        <p className="mt-4 text-xs text-warmgray/70">
          Your progress is saved on this device if you need to step away. Submitting does not commit you to anything — it starts a conversation.
        </p>
      </div>
    </div>
  );
}
