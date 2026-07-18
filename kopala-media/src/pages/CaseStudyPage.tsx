import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, Check, ExternalLink } from "lucide-react";
import { SEO, breadcrumbLd } from "@/components/layout/SEO";
import { Breadcrumbs } from "@/components/layout/Layout";
import { Reveal, CTASection } from "@/components/marketing/shared";
import { getCaseStudy } from "@/content/caseStudies";
import { useEffect } from "react";
import { track, AnalyticsEvents } from "@/features/analytics/events";

export default function CaseStudyPage() {
  const { slug } = useParams();
  const cs = slug ? getCaseStudy(slug) : undefined;

  useEffect(() => {
    if (cs) track(AnalyticsEvents.CaseStudyView, { project: cs.slug });
  }, [cs]);

  if (!cs) return <Navigate to="/work" replace />;

  return (
    <>
      <SEO
        title={`${cs.name} — Case Study | Kopala Media`}
        description={cs.summary}
        path={`/work/${cs.slug}`}
        jsonLd={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: cs.name, path: `/work/${cs.slug}` },
        ])}
      />
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: cs.name }]}
      />

      <section className="border-b border-ivory/10 bg-gradient-to-b from-charcoal to-ink">
        <div className="container-x py-16 sm:py-20">
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow">{cs.industry}</p>
            <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-bright">
              {cs.status}
            </span>
          </div>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.1] text-ivory sm:text-5xl">{cs.name}</h1>
          <p className="prose-measure mt-5 text-lg leading-relaxed text-warmgray">{cs.summary}</p>
          {cs.liveUrl && (
            <a
              href={cs.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mt-7 inline-flex"
            >
              Visit the live website <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-bold text-ivory">The situation</h2>
            <p className="mt-4 text-base leading-relaxed text-warmgray">{cs.challenge}</p>
            <h2 className="mt-10 text-2xl font-bold text-ivory">What was delivered</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {cs.delivered.map((d) => (
                <li key={d} className="flex items-start gap-3 rounded-xl border border-ivory/10 bg-graphite/40 px-4 py-3 text-sm text-ivory/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" /> {d}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-gold/30 bg-graphite/60 p-8">
              <h2 className="text-2xl font-bold text-ivory">Verified outcomes</h2>
              <p className="mt-2 text-sm text-warmgray">
                What we can honestly confirm — we don't publish invented metrics.
              </p>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {cs.verifiedOutcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2.5 text-sm text-ivory/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" /> {o}
                  </li>
                ))}
              </ul>
              {cs.testimonial ? (
                <blockquote className="mt-8 border-l-2 border-gold pl-5">
                  <p className="font-serif text-lg italic text-ivory/90">“{cs.testimonial.quote}”</p>
                  <cite className="mt-2 block text-sm not-italic text-warmgray">— {cs.testimonial.attribution}</cite>
                </blockquote>
              ) : (
                <p className="mt-8 rounded-xl border border-ivory/10 bg-charcoal p-4 text-sm text-warmgray">
                  Client testimonial, screenshots and the live link are published here once approved
                  by the client.
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Want a result like this for your business?"
        description="Start with a Discovery Call — we'll map where your business is losing opportunities and what a system would look like."
        primaryLabel="Book a Discovery Call"
        secondaryLabel="Take the Business Assessment"
      />
      <div className="container-x pb-14 text-center">
        <Link to="/work" className="font-display text-sm font-semibold text-gold hover:text-gold-bright">
          ← Back to all work
        </Link>
        <span className="mx-3 text-ivory/30">·</span>
        <Link to="/packages" className="inline-flex items-center gap-1 font-display text-sm font-semibold text-gold hover:text-gold-bright">
          See packages <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </>
  );
}
