import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, MapPin } from "lucide-react";
import { mainNav } from "@/content/navigation";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { track, AnalyticsEvents } from "@/features/analytics/events";

export function AnnouncementBar() {
  return (
    <div className="bg-charcoal border-b border-ivory/10">
      <div className="container-x flex items-center justify-center gap-2 py-2 text-center">
        <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
        <p className="text-xs text-warmgray">
          <span className="text-ivory/90">{site.positioning}</span>
          <span className="mx-2 text-ivory/30" aria-hidden="true">·</span>
          {site.serviceArea}
        </p>
      </div>
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // close menus on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: sync menu state to route
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  // close dropdown on outside click / escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        if (mobileOpen) {
          setMobileOpen(false);
          menuButtonRef.current?.focus();
        }
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-ivory/10 bg-ink/90 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="Kopala Media — home">
          <img
            src="/brand/kopala-media-logo-sm.png"
            alt=""
            className="h-10 w-10 rounded-sm object-cover lg:h-11 lg:w-11"
            width="44"
            height="44"
          />
          <span className="font-display text-lg font-bold tracking-[0.18em] text-ivory">
            KOPALA<span className="text-gold"> MEDIA</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) =>
            item.children ? (
              <div key={item.label} className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  onClick={() => setServicesOpen((v) => !v)}
                  className={cn(
                    "flex items-center gap-1 rounded-md px-3 py-2 font-display text-sm font-medium transition-colors hover:text-gold-bright",
                    location.pathname.startsWith("/services") ? "text-gold" : "text-ivory/85",
                  )}
                >
                  {item.label}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")} aria-hidden="true" />
                </button>
                {servicesOpen && (
                  <div className="absolute left-0 top-full mt-1 w-72 rounded-xl border border-ivory/10 bg-charcoal p-2 shadow-card">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.href}
                        to={child.href}
                        className={({ isActive }) =>
                          cn(
                            "block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-graphite hover:text-gold-bright",
                            isActive ? "text-gold" : "text-ivory/85",
                          )
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === "/"}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-2 font-display text-sm font-medium transition-colors hover:text-gold-bright",
                    isActive ? "text-gold" : "text-ivory/85",
                  )
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/book"
            onClick={() => track(AnalyticsEvents.BookingClick, { location: "header" })}
            className="btn-gold hidden !px-5 !py-2.5 sm:inline-flex"
          >
            Book a Discovery Call
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ivory transition-colors hover:text-gold lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          ref={mobileRef}
          className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-4rem)] overflow-y-auto border-t border-ivory/10 bg-ink lg:hidden"
          role="dialog"
          aria-label="Mobile navigation"
        >
          <nav aria-label="Mobile" className="container-x flex flex-col gap-1 py-6">
            {mainNav.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    type="button"
                    aria-expanded={mobileServicesOpen}
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    className="flex w-full items-center justify-between rounded-lg px-4 py-3.5 font-display text-lg font-medium text-ivory"
                  >
                    {item.label}
                    <ChevronDown className={cn("h-5 w-5 transition-transform", mobileServicesOpen && "rotate-180")} aria-hidden="true" />
                  </button>
                  {mobileServicesOpen && (
                    <div className="mb-2 ml-4 flex flex-col border-l border-ivory/15 pl-4">
                      <NavLink to="/services" className="rounded-md px-3 py-2.5 text-base text-ivory/85">
                        All Services
                      </NavLink>
                      {item.children.map((child) => (
                        <NavLink key={child.href} to={child.href} className="rounded-md px-3 py-2.5 text-base text-ivory/85">
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === "/"}
                  className={({ isActive }) =>
                    cn(
                      "rounded-lg px-4 py-3.5 font-display text-lg font-medium",
                      isActive ? "text-gold" : "text-ivory",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
            <div className="mt-4 flex flex-col gap-3 border-t border-ivory/10 px-4 pt-6">
              <Link
                to="/book"
                onClick={() => track(AnalyticsEvents.BookingClick, { location: "mobile-nav" })}
                className="btn-gold w-full"
              >
                Book a Discovery Call
              </Link>
              <Link to="/assessment" className="btn-outline w-full">
                Take the Business Assessment
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
