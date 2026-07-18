import { Link } from "react-router-dom";
import {
  ArrowRight, Eye, Zap, FolderKanban, BellOff, Clock, HeartHandshake,
  Megaphone, Repeat2, CalendarCheck, LineChart, TrendingUp, Check, ChevronRight,
} from "lucide-react";
import { SEO, organizationLd, websiteLd, personLd, faqLd } from "@/components/layout/SEO";
import { Reveal, SectionHeading, CTASection, FAQAccordion } from "@/components/marketing/shared";
import { JourneyComparison } from "@/components/marketing/SystemFlowDiagram";
import { PackageCard } from "@/components/marketing/PackageCard";
import { capabilities } from "@/content/services";
import { packages } from "@/content/packages";
import { processStages } from "@/content/process";
import { industries } from "@/content/industries";
import { caseStudies } from "@/content/caseStudies";
import { homeFaqs } from "@/content/faqs";
import { site } from "@/config/site";
import { track, AnalyticsEvents } from "@/features/analytics/events";

const outcomes = [
  { Icon: Eye, label: "Stronger visibility" },
  { Icon: Zap, label: "Faster customer response" },
  { Icon: FolderKanban, label: "Better-organized leads" },
  { Icon: BellOff, label: "Fewer missed opportunities" },
  { Icon: Clock, label: "Reduced administrative work" },
  { Icon: HeartHandshake, label: "Improved customer experience" },
  { Icon: Megaphone, label: "Clearer marketing" },
  { Icon: Repeat2, label: "More consistent follow-up" },
  { Icon: CalendarCheck, label: "Better booking & scheduling" },
  { Icon: LineChart, label: "Stronger operational structure" },
  { Icon: TrendingUp, label: "Readiness for growth" },
];

const whyPoints = [
  {
    title: "Business before tools",
    body: "We begin with the commercial problem, customer journey and operating pressure — not a favorite platform.",
  },
  {
    title: "One connected partner",
    body: "Strategy, marketing, websites, customer systems and automation designed as one coherent solution.",
  },
  {
    title: "Founder-led direction",
    body: "Direct strategic involvement, clear decisions and accountability from discovery through launch.",
  },
  {
    title: "Flexible implementation",
    body: "We improve suitable existing systems, or recommend a simpler setup when current tools are holding the business back.",
  },
  {
    title: "Real delivery experience",
    body: "Live, paid client work already shipped — and a repeatable system built around that proven capability.",
  },
  {
    title: "Integrity that protects trust",
    body: "Honest proof, clear scope and reliable delivery standards. Long-term credibility matters more than a quick sale.",
  },
];

export default function Home() {
  return (
    <>
      <SEO
        title="Kopala Media — Business Growth Systems, Websites, CRM & Automation"
        description="Kopala Media connects your website, customer intake, CRM, booking, follow-up, marketing and automation into one practical system — so your business responds, follows up and grows, even when you're busy."
        path="/"
        jsonLd={[organizationLd, websiteLd, personLd, faqLd(homeFaqs)]}
      />

      {/* 3. Hero */}
      <section className="relative overflow-hidden border-b border-ivory/10 bg-gradient-to-b from-charcoal via-ink to-ink">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            background:
              "radial-gradient(600px 320px at 85% 10%, rgba(201,162,39,0.14), transparent 60%), radial-gradient(500px 300px at 10% 90%, rgba(169,124,80,0.10), transparent 60%)",
          }}
        />
        <div className="container-x relative grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:py-32">
          <div>
            <p className="eyebrow">We build the systems behind business growth</p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] text-ivory sm:text-5xl lg:text-[3.5rem]">
              Build a business that responds, follows up, and grows —{" "}
              <span className="text-gold-gradient">even when you are busy.</span>
            </h1>
            <p className="prose-measure mt-6 text-lg leading-relaxed text-warmgray">
              Kopala Media connects your website, customer intake, CRM, booking, follow-up, marketing
              and automation into one practical system designed to save time and capture more opportunities.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/book"
                onClick={() => track(AnalyticsEvents.HeroCtaClick, { cta: "book" })}
                className="btn-gold"
              >
                Book a Discovery Call <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/services" className="btn-outline">
                Explore Our Systems
              </Link>
            </div>
            <p className="mt-7 text-sm text-warmgray/80">
              Websites, customer-response systems, CRM, automation, marketing, and AI-assisted tools
              for growing service businesses.
            </p>
          </div>
          <Reveal className="hidden lg:block" delay={150}>
            <div className="relative rounded-2xl border border-ivory/10 bg-graphite/50 p-6 shadow-card">
              <div className="flex items-center justify-between border-b border-ivory/10 pb-4">
                <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Business Response System
                </p>
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-ivory/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ivory/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
                </span>
              </div>
              <ul className="mt-5 flex flex-col gap-3.5">
                {[
                  ["New inquiry received", "Website form · just now", true],
                  ["Confirmation sent to customer", "Automated · just now", true],
                  ["Lead added to pipeline", "Status: New", true],
                  ["Owner notified", "Email · just now", true],
                  ["Follow-up scheduled", "Tomorrow, 9:00 AM CT", false],
                ].map(([title, sub, done]) => (
                  <li key={title as string} className="flex items-center gap-3.5 rounded-xl border border-ivory/10 bg-charcoal/80 px-4 py-3">
                    <span
                      className={
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full " +
                        (done ? "bg-gold/15 text-gold-bright" : "border border-ivory/20 text-warmgray")
                      }
                    >
                      {done ? <Check className="h-4 w-4" aria-hidden="true" /> : <Clock className="h-4 w-4" aria-hidden="true" />}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-ivory">{title as string}</p>
                      <p className="text-xs text-warmgray">{sub as string}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-center text-[11px] uppercase tracking-[0.18em] text-warmgray/70">
                What your customer experience could look like
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Customer problem recognition */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            eyebrow="The real problem"
            title="Your business should not depend on you manually managing every inquiry."
            description="Most owner-operated businesses are not short on talent. They are short on systems. The owner delivers the service, answers the messages, schedules the appointments, follows up with leads, manages social media, updates the website and handles the administration — and opportunities quietly slip away in between."
          />
          <Reveal className="mt-12">
            <JourneyComparison />
          </Reveal>
        </div>
      </section>

      {/* 5. Core solution explanation */}
      <section className="border-y border-ivory/10 bg-charcoal section-pad">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">The Kopala Media approach</p>
            <h2 className="mt-3 text-3xl font-bold text-ivory sm:text-4xl">
              Not a website company. Not a marketing agency. A systems partner.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-warmgray sm:text-lg">
              We study how your business currently operates, identify where time, leads, customer
              opportunities and revenue are being lost, and build practical digital systems that
              improve performance — combining strategy, sales insight, marketing, technology,
              automation, AI and customer experience around your actual business problem.
            </p>
            <blockquote className="mt-6 border-l-2 border-gold pl-5 font-serif text-lg italic text-ivory/90">
              “We identify where your business is losing time and opportunities, then build the
              digital system that helps fix it.”
            </blockquote>
          </Reveal>
          <Reveal delay={120}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {[
                ["Buy back time", "Automation handles the repetitive work you do after hours."],
                ["Respond faster", "Every inquiry acknowledged immediately, around the clock."],
                ["Organize opportunities", "One pipeline for every lead, from first contact to won work."],
                ["Grow sustainably", "Systems that support growth instead of limiting it."],
              ].map(([title, body]) => (
                <li key={title} className="rounded-2xl border border-ivory/10 bg-graphite/60 p-5">
                  <h3 className="font-display text-base font-semibold text-gold-bright">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-warmgray">{body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 6. Business outcomes */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Outcomes"
            title="What a connected system changes"
            description="Honest, operational outcomes — the things you will actually notice week to week."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {outcomes.map(({ Icon, label }, i) => (
              <Reveal key={label} delay={i * 40}>
                <div className="flex h-full items-center gap-3 rounded-xl border border-ivory/10 bg-graphite/50 px-4 py-4 transition-colors hover:border-gold/40">
                  <Icon className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                  <span className="text-sm font-medium text-ivory/90">{label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Services overview */}
      <section className="border-y border-ivory/10 bg-charcoal section-pad">
        <div className="container-x">
          <SectionHeading
            eyebrow="Capabilities"
            title="Connected services, designed around the outcome"
            description="Everything under one roof — each capability strengthens the others."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap, i) => (
              <Reveal key={cap.title} delay={(i % 3) * 60}>
                <Link
                  to={cap.href ?? "/services"}
                  onClick={() => track(AnalyticsEvents.ServiceView, { service: cap.title })}
                  className="group flex h-full flex-col rounded-2xl border border-ivory/10 bg-graphite/60 p-6 transition-colors hover:border-gold/40"
                >
                  <h3 className="font-display text-lg font-semibold text-ivory group-hover:text-gold-bright">
                    {cap.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-warmgray">{cap.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold">
                    Learn more <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Flagship Business Response System */}
      <section className="section-pad">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Flagship offer</p>
            <h2 className="mt-3 text-3xl font-bold text-ivory sm:text-4xl">The Business Response System</h2>
            <p className="mt-5 text-base leading-relaxed text-warmgray sm:text-lg">
              A connected website and customer-response system for service businesses that need better
              visibility, faster follow-up and less administrative work. Prospect finds you → completes
              an inquiry → receives immediate acknowledgement → lead enters an organized pipeline →
              you're notified → follow-up begins → next step is scheduled.
            </p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {[
                "Workflow assessment",
                "Up to seven-page website",
                "Advanced intake forms",
                "CRM & lead pipeline",
                "Booking integration",
                "Follow-up automation",
                "Tracking & reporting",
                "Training & 30-day support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ivory/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link to="/services/business-response-system" className="btn-gold">
                Build My Response System <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/book" className="btn-outline">Book a Discovery Call</Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-gold/30 bg-graphite/60 p-8 shadow-gold">
              <p className="text-xs uppercase tracking-wider text-warmgray">Starting at</p>
              <p className="mt-1 font-display text-5xl font-bold text-gold-bright">$4,500</p>
              <p className="mt-3 text-sm leading-relaxed text-warmgray">
                Website live for review in 3–5 business days. Full website + automation build in
                7–14, once content and access are in hand.
              </p>
              <div className="gold-rule mt-6" />
              <p className="mt-6 text-sm text-ivory/80">
                “Most businesses don't need more marketing. They need to stop losing the inquiries
                they already get.”
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9. Three service packages */}
      <section className="border-y border-ivory/10 bg-charcoal section-pad">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Packages"
            title="Three clear starting points — every project scoped to fit"
            description="Transparent starting prices. Final investment is confirmed in a written proposal based on scope, integrations, content and complexity."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 80} className="h-full">
                <PackageCard pkg={pkg} />
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center">
            <Link to="/packages" className="font-display text-sm font-semibold text-gold hover:text-gold-bright">
              Compare packages and monthly support plans →
            </Link>
          </p>
        </div>
      </section>

      {/* 10. How Kopala Media works */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            eyebrow="The method"
            title="From discovery to measurable improvement"
            description="Seven stages, each with clear deliverables — so you always know what happens next."
          />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processStages.map((stage, i) => (
              <Reveal key={stage.number} delay={(i % 4) * 60}>
                <li className="h-full rounded-2xl border border-ivory/10 bg-graphite/50 p-6">
                  <span className="font-display text-3xl font-bold text-gold/50">{stage.number}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-ivory">{stage.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-warmgray">{stage.summary}</p>
                </li>
              </Reveal>
            ))}
            <Reveal delay={180}>
              <li className="flex h-full flex-col justify-center rounded-2xl border border-gold/40 bg-gold/10 p-6">
                <h3 className="font-display text-lg font-semibold text-gold-bright">See the full process</h3>
                <p className="mt-2 text-sm text-warmgray">What you receive at every stage, payment milestones and revision policy.</p>
                <Link to="/process" className="mt-4 inline-flex items-center gap-1 font-display text-sm font-semibold text-gold hover:text-gold-bright">
                  How we work <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            </Reveal>
          </ol>
        </div>
      </section>

      {/* 11. Industries served */}
      <section className="border-y border-ivory/10 bg-charcoal section-pad">
        <div className="container-x">
          <SectionHeading
            eyebrow="Who we serve"
            title="Built for businesses where every inquiry matters"
            description="We work best with businesses that already deliver a valuable service but need stronger visibility, organization and customer-response systems."
          />
          <div className="mt-10 flex flex-wrap gap-3">
            {industries.map((ind) => (
              <Link
                key={ind.id}
                to="/industries"
                className="rounded-full border border-ivory/15 bg-graphite/60 px-4 py-2 text-sm text-ivory/85 transition-colors hover:border-gold/50 hover:text-gold-bright"
              >
                {ind.name}
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-warmgray">
            <span className="font-semibold text-ivory/85">Initial focus:</span> Northbrook, Evanston &amp;
            the North Shore — with reach across the U.S. when the fit is right.
          </p>
        </div>
      </section>

      {/* 12. Verified work */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            eyebrow="Verified work"
            title="Projects that have shipped"
            description="Real client work, classified accurately — live projects, not prototypes. Performance claims are used only when evidence exists."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {caseStudies.map((cs, i) => (
              <Reveal key={cs.slug} delay={i * 80}>
                <Link
                  to={`/work/${cs.slug}`}
                  onClick={() => track(AnalyticsEvents.CaseStudyView, { project: cs.slug })}
                  className="group flex h-full flex-col rounded-2xl border border-ivory/10 bg-graphite/60 p-7 transition-colors hover:border-gold/40 sm:p-8"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-wider text-warmgray">{cs.industry}</p>
                    <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-bright">
                      {cs.status}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold text-ivory group-hover:text-gold-bright">
                    {cs.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-warmgray">{cs.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-1 font-display text-sm font-semibold text-gold">
                    View case study <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Founder introduction */}
      <section className="border-y border-ivory/10 bg-charcoal section-pad">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <img
              src="/brand/katimbe-kabezya-founder.jpg"
              alt="Katimbe Kabezya, founder of Kopala Media"
              className="mx-auto w-64 rounded-2xl border border-ivory/10 object-cover shadow-card sm:w-72"
              width="576"
              height="576"
              loading="lazy"
            />
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow">Founder-led</p>
            <h2 className="mt-3 text-3xl font-bold text-ivory sm:text-4xl">Katimbe Kabezya</h2>
            <p className="mt-1.5 font-display text-sm uppercase tracking-wider text-gold">
              {site.founderRole}
            </p>
            <p className="mt-5 text-base leading-relaxed text-warmgray sm:text-lg">
              A strategic systems entrepreneur and business transformation leader with more than 13
              years of experience in sales and marketing. He combines strategy, sales, marketing, AI
              and automation to help companies become more visible, more efficient, and better
              prepared for growth.
            </p>
            <blockquote className="mt-6 border-l-2 border-gold pl-5 font-serif text-lg italic text-ivory/90">
              “A good solution should help the client win, protect the quality of the work, and make
              the business stronger after we leave.”
            </blockquote>
            <Link to="/about" className="mt-7 inline-flex items-center gap-1 font-display text-sm font-semibold text-gold hover:text-gold-bright">
              More about Kopala Media <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 14. Why choose Kopala Media */}
      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why Kopala Media"
            title="Business-first thinking. Modern execution."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyPoints.map((point, i) => (
              <Reveal key={point.title} delay={(i % 3) * 60}>
                <div className="h-full rounded-2xl border border-ivory/10 bg-graphite/50 p-6">
                  <span className="font-display text-sm font-bold text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-ivory">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-warmgray">{point.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 15. FAQ */}
      <section className="border-y border-ivory/10 bg-charcoal section-pad">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Questions"
            title="Frequently asked questions"
            description="Straight answers about fit, pricing, timelines and how we work."
          />
          <Reveal>
            <FAQAccordion faqs={homeFaqs} />
            <p className="mt-6">
              <Link to="/faq" className="font-display text-sm font-semibold text-gold hover:text-gold-bright">
                View all questions →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 16. Final CTA (17. footer is global) */}
      <CTASection
        title="Your business should not depend on you doing everything."
        description="Let's build the professional presence, customer-response system and operating rhythm that help the business grow — without adding more pressure to the owner."
      />
    </>
  );
}
