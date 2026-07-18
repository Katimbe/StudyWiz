import { Link } from "react-router-dom";
import { Linkedin, Instagram, Facebook, Youtube, Mail, Phone } from "lucide-react";
import { site, hasContactEmail, hasPhone } from "@/config/site";
import { footerNav } from "@/content/navigation";
import { track, AnalyticsEvents } from "@/features/analytics/events";

const socialIcons = [
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
  { key: "instagram", label: "Instagram", Icon: Instagram },
  { key: "facebook", label: "Facebook", Icon: Facebook },
  { key: "youtube", label: "YouTube", Icon: Youtube },
] as const;

export function Footer() {
  const socials = socialIcons.filter((s) => site.social[s.key]);
  return (
    <footer className="border-t border-ivory/10 bg-charcoal">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-3" aria-label="Kopala Media — home">
            <img src="/brand/kopala-media-logo-sm.png" alt="" className="h-11 w-11 rounded-sm object-cover" width="44" height="44" />
            <span className="font-display text-lg font-bold tracking-[0.18em] text-ivory">
              KOPALA<span className="text-gold"> MEDIA</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-warmgray">
            {site.positioning} Websites, customer-response systems, CRM, automation, marketing and
            AI-assisted tools for growing service businesses.
          </p>
          <p className="mt-4 text-xs leading-relaxed text-warmgray/80">{site.serviceArea}</p>
          <div className="mt-5 flex flex-col gap-2 text-sm">
            {hasContactEmail && (
              <a
                href={`mailto:${site.email}`}
                onClick={() => track(AnalyticsEvents.EmailClick, { location: "footer" })}
                className="inline-flex items-center gap-2 text-ivory/85 transition-colors hover:text-gold-bright"
              >
                <Mail className="h-4 w-4 text-gold" aria-hidden="true" /> {site.email}
              </a>
            )}
            {hasPhone && (
              <a
                href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                onClick={() => track(AnalyticsEvents.PhoneClick, { location: "footer" })}
                className="inline-flex items-center gap-2 text-ivory/85 transition-colors hover:text-gold-bright"
              >
                <Phone className="h-4 w-4 text-gold" aria-hidden="true" /> {site.phone}
              </a>
            )}
          </div>
          {socials.length > 0 && (
            <div className="mt-5 flex gap-3">
              {socials.map(({ key, label, Icon }) => (
                <a
                  key={key}
                  href={site.social[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Kopala Media on ${label}`}
                  onClick={() => track(AnalyticsEvents.SocialClick, { network: key })}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ivory/15 text-ivory/80 transition-colors hover:border-gold hover:text-gold-bright"
                >
                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </div>

        <nav aria-label="Services" className="flex flex-col gap-2.5">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-gold">Services</h2>
          {footerNav.services.map((l) => (
            <Link key={l.href + l.label} to={l.href} className="text-sm text-ivory/75 transition-colors hover:text-gold-bright">
              {l.label}
            </Link>
          ))}
        </nav>
        <nav aria-label="Company" className="flex flex-col gap-2.5">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-gold">Company</h2>
          {footerNav.company.map((l) => (
            <Link key={l.href + l.label} to={l.href} className="text-sm text-ivory/75 transition-colors hover:text-gold-bright">
              {l.label}
            </Link>
          ))}
        </nav>
        <nav aria-label="Get started" className="flex flex-col gap-2.5">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-gold">Get Started</h2>
          {footerNav.getStarted.map((l) => (
            <Link key={l.href + l.label} to={l.href} className="text-sm text-ivory/75 transition-colors hover:text-gold-bright">
              {l.label}
            </Link>
          ))}
          <Link to="/book" className="btn-gold mt-3 !px-4 !py-2 text-center">
            Book a Discovery Call
          </Link>
        </nav>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-warmgray/80 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {footerNav.legal.map((l) => (
              <Link key={l.href} to={l.href} className="transition-colors hover:text-gold-bright">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
