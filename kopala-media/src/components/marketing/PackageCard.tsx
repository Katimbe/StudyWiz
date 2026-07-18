import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Package } from "@/content/packages";
import { track, AnalyticsEvents } from "@/features/analytics/events";

export function PackageCard({ pkg, onView }: { pkg: Package; onView?: () => void }) {
  const secondaryHref =
    pkg.secondaryCta === "Request a Recommendation" ? "/assessment" : "/book";
  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-2xl border p-7 transition-colors sm:p-8",
        pkg.featured
          ? "border-gold/50 bg-graphite shadow-gold"
          : "border-ivory/10 bg-graphite/60 hover:border-ivory/25",
      )}
      onMouseEnter={onView}
    >
      {pkg.label && (
        <span className="absolute -top-3.5 left-7 rounded-full bg-gold px-3.5 py-1 font-display text-xs font-bold uppercase tracking-wider text-ink">
          {pkg.label}
        </span>
      )}
      <h3 className="font-display text-xl font-bold text-ivory">{pkg.name}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-warmgray">{pkg.purpose}</p>
      <p className="mt-5">
        <span className="text-xs uppercase tracking-wider text-warmgray">Starting at</span>
        <span className="ml-2 font-display text-3xl font-bold text-gold-bright">{pkg.price}</span>
      </p>
      <ul className="mt-6 flex flex-1 flex-col gap-2.5">
        {pkg.deliverables.map((d) => (
          <li key={d} className="flex items-start gap-2.5 text-sm text-ivory/85">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            {d}
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-3">
        <Link
          to={pkg.featured ? "/services/business-response-system" : "/book"}
          onClick={() => track(AnalyticsEvents.PackageCtaClick, { package: pkg.id, cta: "primary" })}
          className={cn("w-full text-center", pkg.featured ? "btn-gold" : "btn-outline")}
        >
          {pkg.primaryCta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link
          to={secondaryHref}
          onClick={() =>
            track(
              pkg.secondaryCta === "Request a Recommendation"
                ? AnalyticsEvents.RecommendationRequest
                : AnalyticsEvents.PackageCtaClick,
              { package: pkg.id, cta: "secondary" },
            )
          }
          className="text-center font-display text-sm font-medium text-warmgray transition-colors hover:text-gold-bright"
        >
          {pkg.secondaryCta} →
        </Link>
      </div>
    </article>
  );
}
