import { Link } from "react-router-dom";
import { CalendarDays, Clock, MessageSquare, Video } from "lucide-react";
import { SEO, breadcrumbLd } from "@/components/layout/SEO";
import { Breadcrumbs } from "@/components/layout/Layout";
import { Reveal } from "@/components/marketing/shared";
import { RequestCallForm } from "@/components/forms/RequestCallForm";
import { booking } from "@/features/booking/provider";
import { site } from "@/config/site";
import { track, AnalyticsEvents } from "@/features/analytics/events";

const expectations = [
  {
    Icon: MessageSquare,
    title: "A real conversation, not a pitch",
    body: "We ask about how your business operates — inquiries, follow-up, scheduling, administration — and listen for where opportunities leak.",
  },
  {
    Icon: Clock,
    title: "30 focused minutes",
    body: "Enough time to understand your situation and outline the system that would help. If we're not the right fit, we'll say so.",
  },
  {
    Icon: Video,
    title: "Clear next steps",
    body: "You leave with an honest recommendation — scope, starting price and timeline — whether or not we end up working together.",
  },
];

export default function Book() {
  return (
    <>
      <SEO
        title="Book a Business Discovery Call | Kopala Media"
        description="Book a Discovery Call with Kopala Media — a focused 30-minute conversation about where your business is losing time and opportunities, and the system that would fix it."
        path="/book"
        jsonLd={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Book a Discovery Call", path: "/book" }])}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Book a Discovery Call" }]} />

      <section className="border-b border-ivory/10 bg-gradient-to-b from-charcoal to-ink">
        <div className="container-x py-14 sm:py-16">
          <p className="eyebrow">Book a Discovery Call</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.1] text-ivory sm:text-5xl">
            Thirty minutes that could change how your business runs.
          </h1>
          <p className="prose-measure mt-5 text-lg leading-relaxed text-warmgray">
            A focused conversation about how your business operates, where time and opportunities are
            being lost, and the system that would help — with an honest recommendation at the end.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_0.9fr]">
          <Reveal>
            <h2 className="font-display text-xl font-bold text-ivory">What to expect</h2>
            <div className="mt-6 flex flex-col gap-5">
              {expectations.map(({ Icon, title, body }) => (
                <div key={title} className="flex items-start gap-4 rounded-2xl border border-ivory/10 bg-graphite/50 p-5">
                  <Icon className="mt-0.5 h-6 w-6 shrink-0 text-gold" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-base font-semibold text-ivory">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-warmgray">{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-ivory/10 bg-graphite/40 p-6">
              <h2 className="font-display text-base font-semibold text-ivory">Prefer to start with the assessment?</h2>
              <p className="mt-2 text-sm leading-relaxed text-warmgray">
                Complete the Business Assessment first and we'll arrive at the call already
                understanding your situation. You can book afterward — or skip the call entirely.
              </p>
              <Link to="/assessment" className="btn-outline mt-4 !px-4 !py-2 text-xs">
                Take the Business Assessment
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-2xl border border-gold/30 bg-graphite/60 p-7 shadow-gold sm:p-9">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-6 w-6 text-gold" aria-hidden="true" />
                <h2 className="font-display text-xl font-bold text-ivory">
                  {booking.isConfigured ? "Choose your time" : "Request your call"}
                </h2>
              </div>
              {booking.isConfigured ? (
                <div className="mt-6">
                  <p className="text-sm leading-relaxed text-warmgray">
                    Pick a time that suits you. All times shown in your local timezone; we meet by
                    video call or phone. You'll receive an email confirmation with rescheduling and
                    cancellation options.
                  </p>
                  <a
                    href={booking.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track(AnalyticsEvents.BookingClick, { location: "book-page" })}
                    className="btn-gold mt-6 w-full"
                  >
                    Open the scheduler
                  </a>
                  <p className="mt-4 text-xs text-warmgray/70">
                    Trouble with the scheduler? <Link to="/contact" className="text-gold underline underline-offset-2">Contact us</Link> and we'll book you manually.
                  </p>
                </div>
              ) : (
                <div className="mt-6">
                  <p className="text-sm leading-relaxed text-warmgray">
                    Tell us when suits you and we'll confirm a specific time by reply — usually the
                    same business day. All times {site.timeZone}.
                  </p>
                  <div className="mt-6">
                    <RequestCallForm />
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
