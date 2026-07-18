import { SEO, breadcrumbLd, faqLd } from "@/components/layout/SEO";
import { Breadcrumbs } from "@/components/layout/Layout";
import { Reveal, CTASection, PageHero } from "@/components/marketing/shared";
import { FAQAccordion } from "@/components/marketing/shared";
import { allFaqs } from "@/content/faqs";

export default function Faq() {
  return (
    <>
      <SEO
        title="Frequently Asked Questions | Kopala Media"
        description="Straight answers about Kopala Media's services, packages, pricing, timelines, payment structure, revisions and how we work with service businesses."
        path="/faq"
        jsonLd={[
          faqLd(allFaqs),
          breadcrumbLd([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]),
        ]}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions."
        description="Straight answers about fit, pricing, timelines and how we work. Anything else — ask us directly."
      />
      <section className="section-pad">
        <div className="container-x max-w-3xl">
          <Reveal>
            <FAQAccordion faqs={allFaqs} />
          </Reveal>
        </div>
      </section>
      <CTASection
        title="Have a question we didn't answer?"
        description="Send a message or book a Discovery Call — we respond personally within 1–2 business days."
        primaryLabel="Book a Discovery Call"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
