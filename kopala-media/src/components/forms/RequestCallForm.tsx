import { useState } from "react";
import { Loader2 } from "lucide-react";
import { TextField, TextAreaField, ConsentField, Honeypot, ErrorSummary } from "./fields";
import { useLeadSubmit } from "./useLeadSubmit";
import { SuccessPanel } from "./SuccessPanel";
import { validateRequestCall, hasErrors, type FieldErrors } from "@/features/leads/validation";
import { track, AnalyticsEvents } from "@/features/analytics/events";
import { site } from "@/config/site";
import type { LeadInput } from "@/features/leads/types";

/** Fallback booking flow: used until a scheduling provider link is supplied. */
export function RequestCallForm() {
  const { state, submit, honeypot, setHoneypot } = useLeadSubmit("request-call");
  const [form, setForm] = useState<Partial<LeadInput>>({});
  const [errors, setErrors] = useState<FieldErrors>({});

  const set = (k: keyof LeadInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateRequestCall(form);
    setErrors(errs);
    if (hasErrors(errs)) return;
    const result = await submit({
      ...form,
      message: `Discovery call request. Preferred times: ${form.preferredDaysTimes}. ${form.message ?? ""}`.trim(),
      servicesInterested: ["Discovery Call"],
      preferredContactMethod: "Phone",
    } as LeadInput);
    if (result.phase === "success") track(AnalyticsEvents.BookingComplete, { method: "request-call" });
  };

  if (state.phase === "success" && state.lead.id) return <SuccessPanel lead={state.lead} />;
  if (state.phase === "duplicate") return <SuccessPanel lead={state.lead} variant="duplicate" />;

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-5">
      <Honeypot value={honeypot.current} onChange={setHoneypot} />
      {hasErrors(errors) && <ErrorSummary errors={errors} />}
      {state.phase === "rate-limited" && (
        <div role="alert" className="rounded-xl border border-amber-400/40 bg-amber-500/10 p-4 text-sm text-amber-200">
          We've received several requests recently from this device. Please try again in about {state.retryAfterMinutes} minutes.
        </div>
      )}
      {state.phase === "error" && (
        <div role="alert" className="rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-200">{state.message}</div>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Full name" autoComplete="name" required value={form.firstName ?? ""} onChange={set("firstName")} error={errors.firstName} />
        <TextField label="Business name" autoComplete="organization" required value={form.businessName ?? ""} onChange={set("businessName")} error={errors.businessName} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Email" type="email" autoComplete="email" required value={form.email ?? ""} onChange={set("email")} error={errors.email} />
        <TextField label="Phone" type="tel" autoComplete="tel" required value={form.phone ?? ""} onChange={set("phone")} error={errors.phone} />
      </div>
      <TextAreaField
        label="Preferred days and times"
        required
        rows={2}
        hint={`We'll confirm a specific time by reply. All times ${site.timeZone}.`}
        placeholder="e.g. Tuesday or Thursday afternoon, Central Time"
        value={form.preferredDaysTimes ?? ""}
        onChange={set("preferredDaysTimes")}
        error={errors.preferredDaysTimes}
      />
      <TextAreaField
        label="What would you like to discuss?"
        optional
        rows={3}
        value={form.message ?? ""}
        onChange={set("message")}
      />
      <ConsentField checked={form.consent ?? false} onChange={(v) => setForm((f) => ({ ...f, consent: v }))} error={errors.consent} />
      <button type="submit" disabled={state.phase === "submitting"} className="btn-gold w-full sm:w-auto sm:self-start">
        {state.phase === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          "Request My Discovery Call"
        )}
      </button>
    </form>
  );
}
