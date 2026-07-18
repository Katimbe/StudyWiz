import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SEO, breadcrumbLd } from "@/components/layout/SEO";
import { Breadcrumbs } from "@/components/layout/Layout";
import { Reveal, CTASection, PageHero } from "@/components/marketing/shared";
import { industries } from "@/content/industries";
import { site } from "@/config/site";

export default function Industries() {
  return (
    <>
      <SEO
        title="Industries We Serve — Service Business Systems | Kopala Media"
        description="Kopala Media adapts customer-response systems for contractors, property maintenance, electricians, photographers, consultants, care services and other inquiry-driven businesses."
        path="/industries"
        jsonLd={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }])}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Industries" }]} />
      <PageHero
        eyebrow="Industries"
        title="Different businesses lose opportunities in different ways."
        description="We don't pretend every industry has identical needs. Here's how the systems adapt to the way each kind of business actually works."
      />

      <section className="section-pad">
        <div className="container-x flex flex-col gap-8">
          {industries.map((ind, i) => (
            <Reveal key={ind.id} delay={Math.min(i * 40, 200)}>
              <article className="rounded-2xl border border-ivory/10 bg-graphite/50 p-7 sm:p-9">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <h2 className="font-display text-2xl font-bold text-ivory">{ind.name}</h2>
                  <span className="rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-xs font-semibold text-gold-bright">
                    Typical fit: {ind.package}
                  </span>
                </div>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <h3 className="font-display text-xs font-bold uppercase tracking-wider text-gold">Common challenge</h3>
                    <p className="mt-2 text-sm leading-relaxed text-warmgray">{ind.challenge}</p>
                  </div>
                  <div>
                    <h3 className="font-display text-xs font-bold uppercase tracking-wider text-gold">The response gap</h3>
                    <p className="mt-2 text-sm leading-relaxed text-warmgray">{ind.responseGap}</p>
                  </div>
                  <div>
                    <h3 className="font-display text-xs font-bold uppercase tracking-wider text-gold">Recommended system</h3>
                    <p className="mt-2 text-sm leading-relaxed text-warmgray">{ind.recommendedSystem}</p>
                  </div>
                  <div>
                    <h3 className="font-display text-xs font-bold uppercase tracking-wider text-gold">Possible automation</h3>
                    <p className="mt-2 text-sm leading-relaxed text-warmgray">{ind.automation}</p>
                  </div>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to="/assessment" className="btn-gold !px-4 !py-2 text-xs">
                    Assess my business <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                  <Link to="/packages" className="btn-outline !px-4 !py-2 text-xs">
                    See {ind.package}
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-ivory/10 bg-charcoal py-14">
        <div className="container-x text-center">
          <p className="prose-measure mx-auto text-base leading-relaxed text-warmgray">
            <span className="font-semibold text-ivory">Where we work:</span> {site.serviceArea}.
            Don't see your industry? If your business fields inquiries across calls, email, web and
            social — the system thinking applies.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
