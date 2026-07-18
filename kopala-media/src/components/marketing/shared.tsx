import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { track, AnalyticsEvents } from "@/features/analytics/events";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Faq } from "@/content/faqs";

/** Scroll-reveal wrapper — subtle, respects reduced motion (index.css). */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-bold text-ivory sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-warmgray sm:text-lg">{description}</p>}
      {align === "center" && <div className="gold-rule mx-auto mt-6" />}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-ivory/10 bg-gradient-to-b from-charcoal to-ink">
      <div className="container-x py-16 sm:py-20 lg:py-24">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.1] text-ivory sm:text-5xl">{title}</h1>
        <p className="prose-measure mt-5 text-lg leading-relaxed text-warmgray">{description}</p>
        {children && <div className="mt-8 flex flex-wrap gap-4">{children}</div>}
      </div>
    </section>
  );
}

export function CTASection({
  title = "Let's find where your business is losing time and opportunities.",
  description = "Book a Business Discovery Call — a focused conversation about how your business operates and the system that would help it grow.",
  primaryLabel = "Book a Discovery Call",
  primaryHref = "/book",
  secondaryLabel = "Take the Business Assessment",
  secondaryHref = "/assessment",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="border-t border-ivory/10 bg-gradient-to-b from-ink to-charcoal">
      <div className="container-x section-pad text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-3xl font-bold text-ivory sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-warmgray sm:text-lg">{description}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to={primaryHref}
              onClick={() => track(AnalyticsEvents.BookingClick, { location: "cta-section" })}
              className="btn-gold w-full sm:w-auto"
            >
              {primaryLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to={secondaryHref} className="btn-outline w-full sm:w-auto">
              {secondaryLabel}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FAQAccordion({ faqs, headingId }: { faqs: Faq[]; headingId?: string }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, i) => (
        <AccordionItem key={i} value={`faq-${i}`} className="border-ivory/10">
          <AccordionTrigger
            aria-describedby={headingId}
            onClick={() => track(AnalyticsEvents.FaqExpand, { question: faq.question.slice(0, 60) })}
            className="text-left font-display text-base font-medium text-ivory hover:text-gold-bright hover:no-underline sm:text-lg"
          >
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed text-warmgray">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
