import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SEO, breadcrumbLd } from "@/components/layout/SEO";
import { Breadcrumbs } from "@/components/layout/Layout";
import { Reveal, SectionHeading, CTASection, PageHero } from "@/components/marketing/shared";
import { processStages } from "@/content/process";
import { paymentStructure, engagementTerms } from "@/content/packages";

export default function Process() {
  return (
    <>
      <SEO
        title="How We Work — The Kopala Media Method | Kopala Media"
        description="Seven stages from discovery to measurable improvement: Discover, Diagnose, Design, Build, Test, Launch, Improve — with clear deliverables at every stage."
        path="/process"
        jsonLd={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Process", path: "/process" }])}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Process" }]} />
      <PageHero
        eyebrow="The method"
        title="From discovery to measurable improvement."
        description="The simplest system capable of producing meaningful value — built through seven stages, each with clear deliverables so you always know what happens next."
      >
        <Link to="/book" className="btn-gold">
          Start with a Discovery Call <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </PageHero>

      <section className="section-pad">
        <div className="container-x">
          <ol className="relative flex flex-col gap-8 before:absolute before:bottom-8 before:left-[27px] before:top-8 before:w-px before:bg-ivory/10 lg:before:left-1/2">
            {processStages.map((stage, i) => (
              <Reveal key={stage.number}>
                <li className={`relative grid gap-6 pl-16 lg:grid-cols-2 lg:gap-16 lg:pl-0 ${i % 2 === 1 ? "lg:text-right" : ""}`}>
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/40 bg-charcoal font-display text-lg font-bold text-gold-bright lg:left-1/2 lg:-translate-x-1/2"
                  >
                    {stage.number}
                  </span>
                  <div className={i % 2 === 1 ? "lg:order-2 lg:pl-16 lg:text-left" : "lg:pr-16"}>
                    <h2 className="font-display text-2xl font-bold text-ivory">{stage.name}</h2>
                    <p className="mt-2 text-base leading-relaxed text-warmgray">{stage.summary}</p>
                  </div>
                  <div className={i % 2 === 1 ? "lg:order-1 lg:pr-16" : "lg:pl-16"}>
                    <div className="rounded-2xl border border-ivory/10 bg-graphite/50 p-5 lg:text-left">
                      <h3 className="font-display text-xs font-bold uppercase tracking-wider text-gold">
                        What you receive
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ivory/85">{stage.clientReceives}</p>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-ivory/10 bg-charcoal section-pad">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Expectations"
              title="Clear scope. Clear payments."
            />
            <ul className="mt-6 flex flex-col gap-4">
              {paymentStructure.map((p) => (
                <li key={p.share} className="flex items-center gap-4 rounded-xl border border-ivory/10 bg-graphite/50 px-5 py-4">
                  <span className="font-display text-2xl font-bold text-gold-bright">{p.share}</span>
                  <span className="text-sm text-warmgray">{p.when}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading eyebrow="Working together" title="What you can count on" />
            <ul className="mt-6 flex flex-col gap-3">
              {[
                ...engagementTerms,
                "Defined scope, payment stages, deadlines, revision limits and approval points — in writing.",
                "Honest proof: no fabricated testimonials, performance claims or completed actions.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm leading-relaxed text-warmgray">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Every system starts with stage one: Discover."
        description="Book a Discovery Call — or complete the Business Assessment and we'll arrive already understanding your situation."
      />
    </>
  );
}
