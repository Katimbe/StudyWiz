import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

/** Visual journey diagrams: the broken journey vs. the Kopala system journey. */

export function JourneyComparison() {
  const broken = [
    "Inquiry arrives",
    "Response is delayed",
    "Follow-up is forgotten",
    "Opportunity is lost",
  ];
  const fixed = [
    "Inquiry arrives",
    "Customer receives confirmation",
    "Lead is recorded",
    "Owner is notified",
    "Follow-up begins",
    "Next step is scheduled",
  ];
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-red-500/20 bg-graphite/40 p-6 sm:p-8">
        <p className="font-display text-sm font-semibold uppercase tracking-wider text-red-400">
          Without a system
        </p>
        <ol className="mt-5 flex flex-col gap-0">
          {broken.map((step, i) => (
            <li key={step} className="relative flex items-center gap-3 pb-5 last:pb-0">
              {i < broken.length - 1 && (
                <span aria-hidden="true" className="absolute left-[13px] top-7 h-full w-px bg-red-500/20" />
              )}
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-red-500/40 bg-ink">
                <X className="h-3.5 w-3.5 text-red-400" aria-hidden="true" />
              </span>
              <span className="text-sm text-ivory/75">{step}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="rounded-2xl border border-gold/30 bg-graphite/60 p-6 shadow-gold sm:p-8">
        <p className="font-display text-sm font-semibold uppercase tracking-wider text-gold">
          With a Kopala Media system
        </p>
        <ol className="mt-5 flex flex-col gap-0">
          {fixed.map((step, i) => (
            <li key={step} className="relative flex items-center gap-3 pb-4 last:pb-0">
              {i < fixed.length - 1 && (
                <span aria-hidden="true" className="absolute left-[13px] top-7 h-full w-px bg-gold/30" />
              )}
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-ink">
                <Check className="h-3.5 w-3.5 text-gold-bright" aria-hidden="true" />
              </span>
              <span className="text-sm text-ivory/90">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/** Horizontal system-flow diagram for the flagship page. */
export function SystemFlowDiagram({ className }: { className?: string }) {
  const steps = [
    "Prospect finds the business",
    "Visits the website",
    "Completes an inquiry",
    "Receives immediate acknowledgement",
    "Lead enters an organized pipeline",
    "Owner receives notification",
    "Follow-up begins",
    "Consultation is scheduled",
    "Next action is tracked",
  ];
  return (
    <div className={cn("rounded-2xl border border-ivory/10 bg-graphite/50 p-6 sm:p-10", className)}>
      <ol className="grid gap-4 sm:grid-cols-3">
        {steps.map((step, i) => (
          <li
            key={step}
            className="relative rounded-xl border border-ivory/10 bg-charcoal p-4 sm:p-5"
          >
            <span className="font-display text-2xl font-bold text-gold/60">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 text-sm leading-snug text-ivory/90">{step}</p>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="absolute -right-3 top-1/2 hidden h-px w-3 bg-gold/40 sm:block" />
            )}
          </li>
        ))}
      </ol>
      <p className="mt-6 text-center text-xs uppercase tracking-[0.2em] text-warmgray">
        One connected system — from first click to tracked follow-up
      </p>
    </div>
  );
}
