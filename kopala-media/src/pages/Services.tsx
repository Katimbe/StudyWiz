import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { SEO, breadcrumbLd } from "@/components/layout/SEO";
import { Breadcrumbs } from "@/components/layout/Layout";
import { Reveal, SectionHeading, CTASection, PageHero } from "@/components/marketing/shared";
import { capabilities, servicePages } from "@/content/services";
import { track, AnalyticsEvents } from "@/features/analytics/events";

export default function Services() {
  return (
    <>
      <SEO
        title="Services — Websites, CRM, Automation & AI Systems | Kopala Media"
        description="Connected capabilities from Kopala Media: discovery & strategy, websites, customer intake, CRM, automation, AI-assisted systems, marketing, custom tools and ongoing support."
        path="/services"
        jsonLd={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
      <PageHero
        eyebrow="Services"
        title="Everything under one roof — connected capabilities, not isolated purchases."
        description="Each service answers a specific operational problem. Together they form the system behind a business that responds, follows up and grows."
      >
        <Link to="/book" className="btn-gold">
          Book a Discovery Call <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </PageHero>

      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            eyebrow="Flagship"
            title="Start with the system, or start with a piece of it"
            description="The Business Response System combines the capabilities below into one connected build. Individual services are available when that's the right scope."
          />
          <Reveal className="mt-10">
            <Link
              to="/services/business-response-system"
              className="group flex flex-col justify-between gap-6 rounded-2xl border border-gold/40 bg-graphite/70 p-8 shadow-gold transition-colors hover:border-gold sm:flex-row sm:items-center"
            >
              <div>
                <span className="rounded-full bg-gold px-3 py-1 font-display text-xs font-bold uppercase tracking-wider text-ink">
                  Flagship Offer
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold text-ivory group-hover:text-gold-bright">
                  The Business Response System
                </h3>
                <p className="prose-measure mt-2 text-sm leading-relaxed text-warmgray sm:text-base">
                  Website + advanced intake + CRM + booking + automated follow-up — the complete
                  customer-response engine, starting at $4,500.
                </p>
              </div>
              <span className="btn-gold shrink-0">Explore the system <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap, i) => (
              <Reveal key={cap.title} delay={(i % 3) * 50}>
                <Link
                  to={cap.href ?? "/services"}
                  onClick={() => track(AnalyticsEvents.ServiceView, { service: cap.title })}
                  className="group flex h-full flex-col rounded-2xl border border-ivory/10 bg-graphite/50 p-6 transition-colors hover:border-gold/40"
                >
                  <h3 className="font-display text-lg font-semibold text-ivory group-hover:text-gold-bright">{cap.title}</h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-warmgray">{cap.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold">
                    Learn more <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Service detail page directory */}
          <div className="mt-16">
            <h2 className="font-display text-xl font-bold text-ivory">Service guides</h2>
            <p className="mt-2 text-sm text-warmgray">
              Detailed guides: the problem, what we provide, the operational benefit, and who each service is for.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {servicePages.map((sp) => (
                <li key={sp.slug}>
                  <Link
                    to={`/services/${sp.slug}`}
                    className="flex items-center justify-between rounded-xl border border-ivory/10 bg-graphite/40 px-5 py-4 transition-colors hover:border-gold/40"
                  >
                    <span className="font-display text-sm font-semibold text-ivory">{sp.title}</span>
                    <ChevronRight className="h-4 w-4 text-gold" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        title="Not sure which service fits?"
        description="The Business Assessment maps your situation to the right starting point — or book a Discovery Call and we'll work it out together."
      />
    </>
  );
}
