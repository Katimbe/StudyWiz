import { Link } from "react-router-dom";
import { ArrowRight, Check, X } from "lucide-react";
import { SEO, serviceLd, breadcrumbLd, faqLd } from "@/components/layout/SEO";
import { Breadcrumbs } from "@/components/layout/Layout";
import { Reveal, SectionHeading, CTASection, FAQAccordion } from "@/components/marketing/shared";
import { SystemFlowDiagram } from "@/components/marketing/SystemFlowDiagram";
import { brsFaqs } from "@/content/faqs";
import { paymentStructure } from "@/content/packages";

const included = [
  "Business discovery session & current-system review",
  "New website or redesign — up to seven core pages, mobile-responsive",
  "Advanced customer-intake / quote-request forms",
  "Automated email acknowledgement for every inquiry",
  "CRM setup with lead-status & follow-up workflow",
  "Owner lead notifications",
  "Appointment booking where appropriate",
  "Follow-up automation",
  "Foundational SEO, analytics, tracking & reporting",
  "Training session & quick-start guide",
  "Two consolidated revision rounds",
  "30 days of post-launch support",
];

const notIncluded = [
  "Domain, hosting and software subscriptions (separate unless stated in writing)",
  "SMS / WhatsApp messaging fees and advertising spend",
  "Paid advertising management (available through monthly plans)",
  "Full brand identity design (available as an add-on)",
  "Ongoing content production (available through monthly plans)",
];

const clientProvides = [
  "Access to any existing website, domain and business tools",
  "Logo and brand assets, if available",
  "Service, pricing and offering information",
  "About one hour for the workflow assessment",
  "Timely feedback at the two revision points",
];

const addOns = [
  ["Brand & Content", "Brand identity, website copy, social-media setup, ongoing content and campaign creative."],
  ["Advanced Automation", "WhatsApp, SMS, voice assistants, AI communication, multi-step workflows and re-engagement systems."],
  ["Data & Operations", "Advanced CRM integration, dashboards, reporting, internal tools and client portals."],
  ["Creative Production", "Photography, video and visual-production support through approved creative partners."],
];

export default function BusinessResponseSystem() {
  return (
    <>
      <SEO
        title="The Business Response System — Flagship Offer | Kopala Media"
        description="A connected website and customer-response system: intake, CRM, booking, automated acknowledgement and follow-up — for service businesses losing opportunities to slow response. Starting at $4,500."
        path="/services/business-response-system"
        jsonLd={[
          serviceLd(
            "Business Response System",
            "A connected website and customer-response system: intake, CRM, booking, automated acknowledgement and follow-up for service businesses.",
            "/services/business-response-system",
          ),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Business Response System", path: "/services/business-response-system" },
          ]),
          faqLd(brsFaqs),
        ]}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Business Response System" },
        ]}
      />

      <section className="border-b border-ivory/10 bg-gradient-to-b from-charcoal to-ink">
        <div className="container-x py-16 sm:py-20 lg:py-24">
          <span className="rounded-full bg-gold px-3.5 py-1 font-display text-xs font-bold uppercase tracking-wider text-ink">
            Flagship Offer
          </span>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.1] text-ivory sm:text-5xl">
            The Business Response System
          </h1>
          <p className="prose-measure mt-5 text-lg leading-relaxed text-warmgray">
            A connected website and customer-response system for service businesses that need better
            visibility, faster follow-up, and less administrative work. One system from first click
            to tracked follow-up — starting at <span className="font-semibold text-gold-bright">$4,500</span>.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/book" className="btn-gold">
              Build My Response System <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/assessment" className="btn-outline">Take the Business Assessment</Link>
          </div>
        </div>
      </section>

      {/* Who it's for + problems solved */}
      <section className="section-pad">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-bold text-ivory sm:text-3xl">Who it's designed for</h2>
            <p className="mt-4 text-base leading-relaxed text-warmgray">
              Owner-operated and growing service businesses where the owner is delivering the service
              while also managing sales, inquiries, scheduling, customer communication, follow-up and
              administration — and where inquiries arrive through disconnected channels with no
              organized response process.
            </p>
            <h3 className="mt-8 font-display text-lg font-semibold text-ivory">The problems it solves</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                "Missed calls and unanswered inquiries",
                "Social-media messages going cold",
                "Slow email response and inconsistent follow-up",
                "No CRM, no lead pipeline, no organized intake",
                "Repetitive administrative work consuming the owner's hours",
                "Growth limited by the owner's personal availability",
              ].map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm leading-relaxed text-ivory/85">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-ivory/10 bg-graphite/50 p-8">
              <h2 className="text-2xl font-bold text-ivory">Implementation timeline</h2>
              <ol className="mt-6 flex flex-col gap-5">
                {[
                  ["Days 1–2", "Discovery session & workflow assessment. Current systems reviewed, scope confirmed."],
                  ["Days 3–5", "Website live for your review."],
                  ["Days 7–14", "Full system completed: intake, CRM, booking, automation, tracking — tested across devices."],
                  ["Launch", "Training session, quick-start guide, and 30 days of post-launch support begin."],
                ].map(([when, what]) => (
                  <li key={when} className="flex gap-4">
                    <span className="w-20 shrink-0 font-display text-sm font-bold text-gold-bright">{when}</span>
                    <p className="text-sm leading-relaxed text-warmgray">{what}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-xs text-warmgray/70">
                Timeline begins once content and access are in hand.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How the system works */}
      <section className="border-y border-ivory/10 bg-charcoal section-pad">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="How it works"
            title="From first click to tracked follow-up"
            description="Every stage is connected — no inquiry falls between systems."
          />
          <Reveal className="mt-12">
            <SystemFlowDiagram />
          </Reveal>
        </div>
      </section>

      {/* What's included / not included */}
      <section className="section-pad">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-gold/30 bg-graphite/60 p-8">
              <h2 className="font-display text-xl font-bold text-ivory">What's included</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ivory/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="h-full rounded-2xl border border-ivory/10 bg-graphite/40 p-8">
              <h2 className="font-display text-xl font-bold text-ivory">What's not included</h2>
              <p className="mt-2 text-sm text-warmgray">So there are no surprises later:</p>
              <ul className="mt-5 flex flex-col gap-3">
                {notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-warmgray">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-warmgray/60" aria-hidden="true" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing + payment structure + client provides */}
      <section className="border-y border-ivory/10 bg-charcoal section-pad">
        <div className="container-x grid gap-8 lg:grid-cols-3">
          <Reveal>
            <div className="h-full rounded-2xl border border-gold/40 bg-graphite/70 p-8 shadow-gold">
              <h2 className="font-display text-xl font-bold text-ivory">Investment</h2>
              <p className="mt-3 text-xs uppercase tracking-wider text-warmgray">Starting at</p>
              <p className="font-display text-5xl font-bold text-gold-bright">$4,500</p>
              <p className="mt-4 text-sm leading-relaxed text-warmgray">
                Final investment is based on scope, platform, integrations, content and
                implementation complexity — confirmed in a written proposal before work begins.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full rounded-2xl border border-ivory/10 bg-graphite/50 p-8">
              <h2 className="font-display text-xl font-bold text-ivory">Payment structure</h2>
              <ul className="mt-5 flex flex-col gap-4">
                {paymentStructure.map((p) => (
                  <li key={p.share} className="flex items-center gap-4">
                    <span className="font-display text-2xl font-bold text-gold-bright">{p.share}</span>
                    <span className="text-sm text-warmgray">{p.when}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-warmgray/70">
                Two consolidated revision rounds included; new pages, features or direction changes are additional scope.
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="h-full rounded-2xl border border-ivory/10 bg-graphite/50 p-8">
              <h2 className="font-display text-xl font-bold text-ivory">What you provide</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {clientProvides.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-warmgray">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* After launch + add-ons */}
      <section className="section-pad">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <h2 className="text-2xl font-bold text-ivory sm:text-3xl">What happens after launch</h2>
              <p className="mt-4 text-base leading-relaxed text-warmgray">
                You receive a training session and quick-start guide, and 30 days of post-launch
                support covers defects and minor configuration adjustments. From there, monthly
                plans — Systems Care, Growth Operations or Managed Growth — keep the system
                maintained, monitored and improving. <Link to="/packages#support-plans" className="text-gold underline underline-offset-2 hover:text-gold-bright">See support plans</Link>.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="text-2xl font-bold text-ivory sm:text-3xl">Optional add-ons</h2>
              <p className="mt-2 text-sm text-warmgray">Add only what the business actually needs.</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {addOns.map(([title, body]) => (
                  <div key={title} className="rounded-xl border border-ivory/10 bg-graphite/50 p-5">
                    <h3 className="font-display text-sm font-semibold text-gold-bright">{title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-warmgray">{body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-16">
            <h2 className="text-2xl font-bold text-ivory sm:text-3xl">Common questions about the system</h2>
            <div className="mt-6 max-w-3xl">
              <FAQAccordion faqs={brsFaqs} />
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Ready to stop losing the inquiries you already get?"
        description="Book a Discovery Call. We'll review how your business handles inquiries today and map exactly what your Business Response System would look like."
        primaryLabel="Build My Response System"
      />
    </>
  );
}
