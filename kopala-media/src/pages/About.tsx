import { Link } from "react-router-dom";
import { ArrowRight, Target, Telescope, Handshake } from "lucide-react";
import { SEO, personLd, breadcrumbLd } from "@/components/layout/SEO";
import { Breadcrumbs } from "@/components/layout/Layout";
import { Reveal, SectionHeading, CTASection } from "@/components/marketing/shared";
import { site } from "@/config/site";

const pillars = [
  { Icon: Target, title: "Mission", body: "Help businesses become more visible, responsive and operationally effective." },
  { Icon: Telescope, title: "Vision", body: "Build a trusted growth company that equips businesses with systems they can rely on." },
  { Icon: Handshake, title: "Promise", body: "Buy back time. Capture more opportunities. Strengthen the customer experience." },
];

const strengths = [
  "Strategic thinking",
  "Commercial awareness",
  "Sales & marketing experience",
  "Business development",
  "Digital systems",
  "AI & automation",
  "Customer communication",
  "Problem-solving",
  "Leadership & vision",
  "Entrepreneurship",
];

export default function About() {
  return (
    <>
      <SEO
        title="About Kopala Media — Business Transformation & Digital Systems"
        description="Kopala Media is a business transformation and digital operations company based in Northbrook, Illinois — founded by Katimbe Kabezya to make business easier to run."
        path="/about"
        jsonLd={[personLd, breadcrumbLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])]}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />

      <section className="border-b border-ivory/10 bg-gradient-to-b from-charcoal to-ink">
        <div className="container-x py-16 sm:py-20 lg:py-24">
          <p className="eyebrow">About Kopala Media</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.1] text-ivory sm:text-5xl">
            Built to make business easier to run.
          </h1>
          <p className="prose-measure mt-5 text-lg leading-relaxed text-warmgray">
            Kopala Media is a business transformation and digital operations company based in
            Northbrook, Illinois. We help small and growing service businesses improve how they are
            seen, how customers reach them, and how opportunities move from first inquiry to follow-up.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-bold text-ivory sm:text-3xl">Systems, not disconnected services</h2>
            <p className="mt-4 text-base leading-relaxed text-warmgray">
              Our work brings together strategy, websites, customer intake, CRM, automation,
              AI-assisted communication, marketing and ongoing support. Instead of selling
              disconnected services, we design practical systems around the way each client actually works.
            </p>
            <p className="mt-4 text-base leading-relaxed text-warmgray">
              Kopala Media exists to help business owners spend less time fighting disconnected
              processes and more time serving customers, leading teams and growing the business.
            </p>
            <blockquote className="mt-6 border-l-2 border-gold pl-5 font-serif text-lg italic text-ivory/90">
              “We find where the business is losing time, visibility, leads or revenue — then build
              the system that fixes it.”
            </blockquote>
            <p className="mt-6 text-base leading-relaxed text-warmgray">
              <span className="font-semibold text-ivory">Our core belief:</span> technology is not the
              product. A better-running business is.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-col gap-4">
              {pillars.map(({ Icon, title, body }) => (
                <div key={title} className="flex items-start gap-4 rounded-2xl border border-ivory/10 bg-graphite/50 p-6">
                  <Icon className="mt-0.5 h-6 w-6 shrink-0 text-gold" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-sm font-bold uppercase tracking-wider text-gold-bright">{title}</h3>
                    <p className="mt-1.5 text-base leading-relaxed text-ivory/90">{body}</p>
                  </div>
                </div>
              ))}
              <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-gold-bright">Quality without shortcuts</h3>
                <p className="mt-1.5 text-base leading-relaxed text-ivory/90">
                  {site.qualityPrinciple} Clear expectations, honest proof, and systems that are
                  usable, maintainable and valuable in daily operation.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-ivory/10 bg-charcoal section-pad">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[0.65fr_1.35fr]">
          <Reveal>
            <img
              src="/brand/katimbe-kabezya-founder.jpg"
              alt="Katimbe Kabezya, founder of Kopala Media"
              className="mx-auto w-64 rounded-2xl border border-ivory/10 object-cover shadow-card sm:w-80"
              width="640"
              height="640"
              loading="lazy"
            />
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow">Founder</p>
            <h2 className="mt-3 text-3xl font-bold text-ivory sm:text-4xl">Katimbe Kabezya</h2>
            <p className="mt-1.5 font-display text-sm uppercase tracking-wider text-gold">{site.founderRole}</p>
            <p className="mt-5 text-base leading-relaxed text-warmgray">
              Katimbe Kabezya is a strategic systems entrepreneur and business transformation leader
              with more than 13 years of experience in sales and marketing. He combines commercial
              insight with modern technology — his work spans business development, sales, marketing,
              websites, AI-assisted systems, automation, customer communication and digital operations.
            </p>
            <p className="mt-4 text-base leading-relaxed text-warmgray">
              His strength lies in understanding the real problem behind a business challenge and
              translating it into a practical system that supports growth. His work is guided by a
              clear belief: technology should make business easier to operate, improve the customer
              experience and create room for sustainable growth.
            </p>
            <div className="mt-7">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-gold">Strengths clients rely on</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {strengths.map((s) => (
                  <li key={s} className="rounded-full border border-ivory/15 bg-graphite/60 px-3.5 py-1.5 text-xs text-ivory/85">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x text-center">
          <SectionHeading
            align="center"
            eyebrow="Where we work"
            title="Locally connected, globally ambitious"
            description={`${site.serviceArea}. We work on site where it helps and remotely where it works better — the system matters more than the zip code.`}
          />
          <Reveal className="mt-8">
            <ul className="flex flex-wrap justify-center gap-3">
              {site.localAreas.map((area) => (
                <li key={area} className="rounded-full border border-ivory/15 bg-graphite/60 px-4 py-2 text-sm text-ivory/85">
                  {area}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="mt-10">
            <Link to="/process" className="btn-outline">
              See how we work <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
