import { Link } from "react-router-dom";
import { CheckCircle2, CalendarDays, ArrowRight } from "lucide-react";
import { booking } from "@/features/booking/provider";
import { track, AnalyticsEvents } from "@/features/analytics/events";
import type { Lead } from "@/features/leads/types";

export function SuccessPanel({
  lead,
  variant = "contact",
}: {
  lead: Lead;
  variant?: "contact" | "assessment" | "duplicate";
}) {
  const firstName = lead.firstName;
  const isDuplicate = variant === "duplicate";
  return (
    <div className="rounded-2xl border border-gold/40 bg-graphite/70 p-8 text-center shadow-gold sm:p-12" role="status" aria-live="polite">
      <CheckCircle2 className="mx-auto h-12 w-12 text-gold-bright" aria-hidden="true" />
      <h2 className="mt-5 font-display text-2xl font-bold text-ivory sm:text-3xl">
        {isDuplicate
          ? `We've already got your ${lead.formType === "assessment" ? "assessment" : "message"}, ${firstName}.`
          : `Thank you, ${firstName} — we've received it.`}
      </h2>
      <p className="prose-measure mx-auto mt-4 text-base leading-relaxed text-warmgray">
        {isDuplicate
          ? "A matching submission from this email address arrived within the last 24 hours, so we've kept your original rather than creating a duplicate. We'll be in touch within 1–2 business days."
          : lead.formType === "assessment"
            ? "Your Business Assessment is with us. We review every assessment personally and will respond within 1–2 business days — a confirmation is on its way to your inbox."
            : "Your message is with us. We review every inquiry personally and will respond within 1–2 business days — a confirmation is on its way to your inbox."}
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        {booking.isConfigured ? (
          <a
            href={booking.urlForLead(lead.id)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track(AnalyticsEvents.BookingClick, { location: "success-panel" })}
            className="btn-gold w-full sm:w-auto"
          >
            <CalendarDays className="h-4 w-4" aria-hidden="true" /> Book your Discovery Call now
          </a>
        ) : (
          <Link
            to="/book"
            onClick={() => track(AnalyticsEvents.BookingClick, { location: "success-panel" })}
            className="btn-gold w-full sm:w-auto"
          >
            <CalendarDays className="h-4 w-4" aria-hidden="true" /> Book your Discovery Call
          </Link>
        )}
        <Link to="/" className="btn-outline w-full sm:w-auto">
          Back to home <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <p className="mt-6 text-xs text-warmgray/70">
        Reference: <span className="font-mono">{lead.id}</span>
      </p>
    </div>
  );
}
