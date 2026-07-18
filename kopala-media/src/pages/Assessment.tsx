import { SEO, breadcrumbLd } from "@/components/layout/SEO";
import { Breadcrumbs } from "@/components/layout/Layout";
import { AssessmentForm } from "@/components/forms/AssessmentForm";
import { Clock, ShieldCheck, CalendarCheck } from "lucide-react";

export default function Assessment() {
  return (
    <>
      <SEO
        title="Business Assessment — Find Where You're Losing Time & Opportunities | Kopala Media"
        description="A structured six-step assessment of how your business handles visibility, inquiries, follow-up and administration — with a recommendation on the right system, from Kopala Media."
        path="/assessment"
        jsonLd={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Business Assessment", path: "/assessment" }])}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Business Assessment" }]} />

      <section className="border-b border-ivory/10 bg-gradient-to-b from-charcoal to-ink">
        <div className="container-x py-14 sm:py-16">
          <p className="eyebrow">Business Assessment</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.1] text-ivory sm:text-5xl">
            Find out where your business is losing time and opportunities.
          </h1>
          <p className="prose-measure mt-5 text-lg leading-relaxed text-warmgray">
            Six short steps about how your business operates today. We review every assessment
            personally and respond within 1–2 business days with an honest recommendation — including
            when a smaller scope is the right answer.
          </p>
          <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm text-warmgray">
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gold" aria-hidden="true" /> About 4–5 minutes
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-gold" aria-hidden="true" /> Private — never shared or sold
            </li>
            <li className="flex items-center gap-2">
              <CalendarCheck className="h-4 w-4 text-gold" aria-hidden="true" /> Booking optional at the end
            </li>
          </ul>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x max-w-4xl">
          <AssessmentForm />
        </div>
      </section>
    </>
  );
}
