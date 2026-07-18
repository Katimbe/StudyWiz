import { useState } from "react";
import { Loader2 } from "lucide-react";
import { TextField, TextAreaField, SelectField, ConsentField, Honeypot, ErrorSummary } from "./fields";
import { useLeadSubmit } from "./useLeadSubmit";
import { SuccessPanel } from "./SuccessPanel";
import { validateContact, hasErrors, type FieldErrors } from "@/features/leads/validation";
import { track, AnalyticsEvents } from "@/features/analytics/events";
import type { LeadInput } from "@/features/leads/types";

const serviceOptions = [
  { value: "Business Response System", label: "Business Response System (flagship)" },
  { value: "Website Design", label: "Website Design & Digital Presence" },
  { value: "CRM & Lead Management", label: "CRM & Lead Management" },
  { value: "Business Automation", label: "Business Automation" },
  { value: "AI-Assisted Systems", label: "AI-Assisted Business Systems" },
  { value: "Marketing & Content", label: "Marketing & Content" },
  { value: "Custom Digital Tools", label: "Custom Digital Tools" },
  { value: "Ongoing Support", label: "Ongoing Support" },
  { value: "Not sure yet", label: "Not sure yet — advise me" },
];

const contactMethodOptions = [
  { value: "Email", label: "Email" },
  { value: "Phone", label: "Phone" },
  { value: "Either", label: "Either is fine" },
];

export function ContactForm() {
  const { state, submit, honeypot, setHoneypot } = useLeadSubmit("contact");
  const [form, setForm] = useState<Partial<LeadInput>>({ preferredContactMethod: "Email" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [started, setStarted] = useState(false);

  const set = (k: keyof LeadInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!started) {
      setStarted(true);
      track(AnalyticsEvents.ContactFormStart);
    }
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateContact(form);
    setErrors(errs);
    if (hasErrors(errs)) return;
    const result = await submit(form as LeadInput);
    if (result.phase === "success") track(AnalyticsEvents.ContactFormSubmit);
  };

  if (state.phase === "success" && state.lead.id) return <SuccessPanel lead={state.lead} />;
  if (state.phase === "duplicate") return <SuccessPanel lead={state.lead} variant="duplicate" />;

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-5">
      <Honeypot value={honeypot.current} onChange={setHoneypot} />
      {hasErrors(errors) && <ErrorSummary errors={errors} />}
      {state.phase === "rate-limited" && (
        <div role="alert" className="rounded-xl border border-amber-400/40 bg-amber-500/10 p-4 text-sm text-amber-200">
          We've received several submissions recently from this device. Please try again in about{" "}
          {state.retryAfterMinutes} minutes — or book a Discovery Call directly.
        </div>
      )}
      {state.phase === "error" && (
        <div role="alert" className="rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-200">
          {state.message}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Full name" autoComplete="name" required value={form.firstName ?? ""} onChange={set("firstName")} error={errors.firstName} />
        <TextField label="Business name" autoComplete="organization" optional value={form.businessName ?? ""} onChange={set("businessName")} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Email" type="email" autoComplete="email" required value={form.email ?? ""} onChange={set("email")} error={errors.email} />
        <TextField label="Phone" type="tel" autoComplete="tel" optional value={form.phone ?? ""} onChange={set("phone")} error={errors.phone} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Current website" type="url" inputMode="url" optional placeholder="https://" value={form.currentWebsite ?? ""} onChange={set("currentWebsite")} error={errors.currentWebsite} />
        <SelectField
          label="Service of interest"
          options={serviceOptions}
          placeholder="Select a service…"
          value={form.servicesInterested?.[0] ?? ""}
          onChange={(e) => setForm((f) => ({ ...f, servicesInterested: e.target.value ? [e.target.value] : [] }))}
        />
      </div>
      <SelectField
        label="Preferred contact method"
        options={contactMethodOptions}
        value={form.preferredContactMethod ?? "Email"}
        onChange={(e) => setForm((f) => ({ ...f, preferredContactMethod: e.target.value }))}
      />
      <TextAreaField
        label="How can we help?"
        required
        rows={5}
        hint="A sentence or two about your business and what's not working is plenty."
        value={form.message ?? ""}
        onChange={set("message")}
        error={errors.message}
      />
      <ConsentField
        checked={form.consent ?? false}
        onChange={(v) => setForm((f) => ({ ...f, consent: v }))}
        error={errors.consent}
      />
      <button type="submit" disabled={state.phase === "submitting"} className="btn-gold w-full sm:w-auto sm:self-start">
        {state.phase === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          "Send Message"
        )}
      </button>
      <p className="text-xs text-warmgray/70">
        We respond personally within 1–2 business days. Your information is never shared or sold.
      </p>
    </form>
  );
}
