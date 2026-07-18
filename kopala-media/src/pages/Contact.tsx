import { MapPin, Clock, CalendarDays, ClipboardList, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO, breadcrumbLd } from "@/components/layout/SEO";
import { Breadcrumbs } from "@/components/layout/Layout";
import { Reveal } from "@/components/marketing/shared";
import { ContactForm } from "@/components/forms/ContactForm";
import { site, hasContactEmail, hasPhone } from "@/config/site";
import { track, AnalyticsEvents } from "@/features/analytics/events";

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Kopala Media — Northbrook, Illinois"
        description="Contact Kopala Media about websites, customer-response systems, CRM, automation or ongoing support. Based in Northbrook, Illinois, serving the North Shore, Chicagoland and remote clients."
        path="/contact"
        jsonLd={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <section className="border-b border-ivory/10 bg-gradient-to-b from-charcoal to-ink">
        <div className="container-x py-14 sm:py-16">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.1] text-ivory sm:text-5xl">
            Tell us what's not working.
          </h1>
          <p className="prose-measure mt-5 text-lg leading-relaxed text-warmgray">
            Whether it's visibility, response time, scattered leads or administrative overload —
            send a message and we'll respond personally within 1–2 business days.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_0.75fr]">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={120}>
            <aside className="flex flex-col gap-5">
              <div className="rounded-2xl border border-ivory/10 bg-graphite/50 p-6">
                <h2 className="font-display text-base font-semibold text-ivory">Other ways to start</h2>
                <div className="mt-4 flex flex-col gap-3">
                  <Link
                    to="/book"
                    onClick={() => track(AnalyticsEvents.BookingClick, { location: "contact-sidebar" })}
                    className="flex items-center gap-3 rounded-xl border border-ivory/10 bg-charcoal px-4 py-3.5 transition-colors hover:border-gold/40"
                  >
                    <CalendarDays className="h-5 w-5 text-gold" aria-hidden="true" />
                    <div>
                      <p className="font-display text-sm font-semibold text-ivory">Book a Discovery Call</p>
                      <p className="text-xs text-warmgray">30 focused minutes about your business</p>
                    </div>
                  </Link>
                  <Link
                    to="/assessment"
                    className="flex items-center gap-3 rounded-xl border border-ivory/10 bg-charcoal px-4 py-3.5 transition-colors hover:border-gold/40"
                  >
                    <ClipboardList className="h-5 w-5 text-gold" aria-hidden="true" />
                    <div>
                      <p className="font-display text-sm font-semibold text-ivory">Business Assessment</p>
                      <p className="text-xs text-warmgray">Six steps, honest recommendation</p>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-ivory/10 bg-graphite/50 p-6">
                <h2 className="font-display text-base font-semibold text-ivory">Details</h2>
                <ul className="mt-4 flex flex-col gap-3 text-sm text-warmgray">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    <span>{site.serviceArea}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    <span>Response within 1–2 business days · {site.timeZone}</span>
                  </li>
                  {hasContactEmail && (
                    <li className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                      <a
                        href={`mailto:${site.email}`}
                        onClick={() => track(AnalyticsEvents.EmailClick, { location: "contact" })}
                        className="text-ivory/85 hover:text-gold-bright"
                      >
                        {site.email}
                      </a>
                    </li>
                  )}
                  {hasPhone && (
                    <li className="flex items-start gap-3">
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                      <a
                        href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                        onClick={() => track(AnalyticsEvents.PhoneClick, { location: "contact" })}
                        className="text-ivory/85 hover:text-gold-bright"
                      >
                        {site.phone}
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6">
                <p className="text-sm leading-relaxed text-ivory/85">
                  “When a client's budget cannot support the requested scope, we reduce the scope,
                  not the standard.”
                </p>
                <p className="mt-2 text-xs text-warmgray">— The Kopala Media quality principle</p>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
