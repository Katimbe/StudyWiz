import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { SEO, breadcrumbLd } from "@/components/layout/SEO";
import { Breadcrumbs } from "@/components/layout/Layout";
import { Reveal, SectionHeading, CTASection, PageHero } from "@/components/marketing/shared";
import { PackageCard } from "@/components/marketing/PackageCard";
import { packages, supportPlans, pricingNotice, supportPricingNotice, paymentStructure, engagementTerms } from "@/content/packages";
import { track, AnalyticsEvents } from "@/features/analytics/events";
import { useEffect } from "react";

const compareRows: { label: string; values: [string, string, string] }[] = [
  { label: "Best for", values: ["A credible presence & reliable contact", "Organized intake, faster response & follow-up", "Connected marketing, communication & automation"] },
  { label: "Website", values: ["Up to 5 pages", "Up to 7 pages", "Up to 10 pages or funnel"] },
  { label: "Intake forms", values: ["Contact / quote form", "Advanced intake form", "Multiple intake workflows"] },
  { label: "Automated acknowledgement", values: ["Basic email response", "Included", "Email, SMS or WhatsApp"] },
  { label: "CRM & lead pipeline", values: ["—", "Included", "Advanced configuration"] },
  { label: "Booking", values: ["Basic setup", "Integrated", "Integrated"] },
  { label: "Follow-up automation", values: ["—", "Included", "Included + lead qualification"] },
  { label: "AI-assisted communication", values: ["—", "—", "Included"] },
  { label: "Reporting", values: ["Basic analytics", "Tracking & reporting", "Reporting dashboard"] },
  { label: "Training", values: ["—", "Session + quick-start guide", "Team documentation & training"] },
  { label: "Revision rounds", values: ["Two", "Two", "Two"] },
  { label: "Post-launch support", values: ["14 days", "30 days", "60 days"] },
  { label: "Starting at", values: ["$2,500", "$4,500", "$7,500"] },
];

export default function Packages() {
  useEffect(() => {
    track(AnalyticsEvents.PackageView, { page: "packages" });
  }, []);

  return (
    <>
      <SEO
        title="Service Packages & Pricing — Starting at $2,500 | Kopala Media"
        description="Three clear starting points: Visibility Foundation from $2,500, Business Response System from $4,500, Growth Operations System from $7,500 — plus monthly support plans from $450/month."
        path="/packages"
        jsonLd={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Packages", path: "/packages" }])}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Packages" }]} />
      <PageHero
        eyebrow="Packages"
        title="Three clear starting points — every project scoped to fit."
        description="Transparent starting prices, defined deliverables, and a quality principle that never changes: when a budget cannot support the requested scope, we reduce the scope — not the standard."
      >
        <Link to="/assessment" className="btn-gold">
          Request a Recommendation <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link to="/book" className="btn-outline">Book a Discovery Call</Link>
      </PageHero>

      <section className="section-pad">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-3">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 80} className="h-full">
                <PackageCard pkg={pkg} />
              </Reveal>
            ))}
          </div>
          <p className="prose-measure mx-auto mt-10 text-center text-sm leading-relaxed text-warmgray">
            {pricingNotice}
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="border-y border-ivory/10 bg-charcoal section-pad">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="Compare" title="Side by side" />
          <Reveal className="mt-12 overflow-x-auto rounded-2xl border border-ivory/10">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-graphite">
                  <th scope="col" className="px-5 py-4 font-display text-ivory"></th>
                  {packages.map((p) => (
                    <th key={p.id} scope="col" className="px-5 py-4 font-display text-ivory">
                      {p.name}
                      {p.label && <span className="ml-2 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold uppercase text-ink">{p.label}</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, ri) => (
                  <tr key={row.label} className={ri % 2 === 0 ? "bg-charcoal" : "bg-graphite/40"}>
                    <th scope="row" className="px-5 py-3.5 font-medium text-ivory/90">{row.label}</th>
                    {row.values.map((v, vi) => (
                      <td key={vi} className={`px-5 py-3.5 ${row.label === "Starting at" ? "font-display font-bold text-gold-bright" : "text-warmgray"}`}>
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* Monthly support plans */}
      <section id="support-plans" className="section-pad scroll-mt-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Ongoing partnership"
            title="Support that keeps the system working"
            description="Monthly plans for after launch — maintenance, monitoring, reporting and continuous improvement."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {supportPlans.map((plan, i) => (
              <Reveal key={plan.id} delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-ivory/10 bg-graphite/50 p-7">
                  <h3 className="font-display text-lg font-bold text-ivory">{plan.name}</h3>
                  <p className="mt-2 font-display text-2xl font-bold text-gold-bright">{plan.price}</p>
                  <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-ivory/85">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" /> {item}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="btn-outline mt-7 w-full text-center">
                    Ask about {plan.name}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="prose-measure mx-auto mt-8 text-center text-sm leading-relaxed text-warmgray">
            {supportPricingNotice}
          </p>
        </div>
      </section>

      {/* Payment & terms */}
      <section className="border-t border-ivory/10 bg-charcoal section-pad">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-bold text-ivory">Clear scope. Clear payments. Clear expectations.</h2>
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
            <h2 className="text-2xl font-bold text-ivory">Engagement terms</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {engagementTerms.map((term) => (
                <li key={term} className="flex items-start gap-3 text-sm leading-relaxed text-warmgray">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" /> {term}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl border border-gold/30 bg-gold/5 p-4 text-sm italic text-ivory/85">
              Quality principle: when a budget cannot support the requested scope, we reduce the
              scope — never the standard.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Not sure which package fits?"
        description="Complete the Business Assessment and we'll recommend the right starting point — including when a smaller scope is the honest answer."
        primaryLabel="Request a Recommendation"
        primaryHref="/assessment"
      />
    </>
  );
}
