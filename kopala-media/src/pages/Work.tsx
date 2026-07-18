import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { SEO, breadcrumbLd } from "@/components/layout/SEO";
import { Breadcrumbs } from "@/components/layout/Layout";
import { Reveal, CTASection, PageHero } from "@/components/marketing/shared";
import { caseStudies } from "@/content/caseStudies";
import { track, AnalyticsEvents } from "@/features/analytics/events";

export default function Work() {
  return (
    <>
      <SEO
        title="Client Work & Case Studies | Kopala Media"
        description="Verified Kopala Media client work: Chipiliro Khonje Photography and Fix It Chichi — live websites with structured inquiry paths. Real delivery, honestly classified."
        path="/work"
        jsonLd={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }])}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Work" }]} />
      <PageHero
        eyebrow="Verified work"
        title="Projects that have shipped."
        description="Real client work, classified accurately — live projects, not prototypes. We publish performance claims only when reliable evidence exists."
      />

      <section className="section-pad">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 80}>
              <Link
                to={`/work/${cs.slug}`}
                onClick={() => track(AnalyticsEvents.CaseStudyView, { project: cs.slug })}
                className="group flex h-full flex-col rounded-2xl border border-ivory/10 bg-graphite/50 p-8 transition-colors hover:border-gold/40 sm:p-10"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-wider text-warmgray">{cs.industry}</p>
                  <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-bright">
                    {cs.status}
                  </span>
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold text-ivory group-hover:text-gold-bright sm:text-3xl">
                  {cs.name}
                </h2>
                <p className="mt-4 flex-1 text-base leading-relaxed text-warmgray">{cs.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {cs.verifiedOutcomes.slice(0, 4).map((o) => (
                    <li key={o} className="rounded-full border border-ivory/15 px-3 py-1 text-xs text-ivory/75">
                      {o}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-1 font-display text-sm font-semibold text-gold">
                  Read the case study <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12">
          <p className="prose-measure mx-auto text-center text-sm leading-relaxed text-warmgray">
            Screenshots, live links and client testimonials are published as they are verified and
            approved by each client. We don't publish invented metrics — delivered outcomes are listed
            on each case study.
          </p>
        </Reveal>
      </section>

      <CTASection
        title="Want your business to be the next case study?"
        description="Every project starts with understanding where your business is losing time and opportunities."
      />
    </>
  );
}
