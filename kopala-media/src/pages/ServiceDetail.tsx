import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { SEO, serviceLd, breadcrumbLd } from "@/components/layout/SEO";
import { Breadcrumbs } from "@/components/layout/Layout";
import { Reveal, CTASection } from "@/components/marketing/shared";
import { getServicePage } from "@/content/services";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = slug ? getServicePage(slug) : undefined;
  if (!service) return <Navigate to="/services" replace />;

  return (
    <>
      <SEO
        title={service.metaTitle}
        description={service.metaDescription}
        path={`/services/${service.slug}`}
        jsonLd={[
          serviceLd(service.title, service.metaDescription, `/services/${service.slug}`),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.shortTitle, path: `/services/${service.slug}` },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.shortTitle },
        ]}
      />

      <section className="border-b border-ivory/10 bg-gradient-to-b from-charcoal to-ink">
        <div className="container-x py-16 sm:py-20">
          <p className="eyebrow">{service.shortTitle}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.1] text-ivory sm:text-5xl">
            {service.headline}
          </h1>
          <p className="prose-measure mt-5 text-lg leading-relaxed text-warmgray">{service.intro}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/book" className="btn-gold">
              {service.cta.secondary} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/assessment" className="btn-outline">Take the Business Assessment</Link>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-bold text-ivory sm:text-3xl">{service.problem.heading}</h2>
            <p className="mt-4 text-base leading-relaxed text-warmgray">{service.problem.body}</p>
            <ul className="mt-6 flex flex-col gap-3">
              {service.problem.points.map((point) => (
                <li key={point} className="flex items-start gap-3 rounded-xl border border-ivory/10 bg-graphite/40 px-4 py-3 text-sm leading-relaxed text-ivory/85">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="text-2xl font-bold text-ivory sm:text-3xl">{service.provide.heading}</h2>
            <div className="mt-6 grid gap-4">
              {service.provide.items.map((item) => (
                <div key={item.title} className="rounded-2xl border border-ivory/10 bg-graphite/50 p-6">
                  <h3 className="font-display text-base font-semibold text-gold-bright">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-warmgray">{item.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-ivory/10 bg-charcoal section-pad">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-bold text-ivory sm:text-3xl">{service.benefit.heading}</h2>
            <p className="mt-4 text-base leading-relaxed text-warmgray">{service.benefit.body}</p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {service.benefit.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-2.5 text-sm text-ivory/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" /> {outcome}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-gold/30 bg-graphite/60 p-8">
              <h2 className="text-2xl font-bold text-ivory">{service.audience.heading}</h2>
              <p className="mt-4 text-base leading-relaxed text-warmgray">{service.audience.body}</p>
              <div className="gold-rule mt-6" />
              <p className="mt-6 text-sm text-warmgray">
                <span className="font-semibold text-ivory">Commonly delivered within:</span>{" "}
                {service.relatedPackage}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link to="/packages" className="btn-gold !px-5 !py-2.5">View Packages</Link>
                <Link to="/book" className="btn-outline !px-5 !py-2.5">Book a Discovery Call</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title={`Ready to talk about ${service.shortTitle.toLowerCase()}?`}
        description="Book a Discovery Call and we'll map this service to your business situation — honestly, including when a smaller scope is the right answer."
      />
    </>
  );
}
