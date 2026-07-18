import { useEffect } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnnouncementBar, Header } from "./Header";
import { Footer } from "./Footer";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export function Layout({ bare = false }: { bare?: boolean }) {
  return (
    <HelmetProvider>
      <ScrollToTop />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to main content
      </a>
      {!bare && <AnnouncementBar />}
      {!bare && <Header />}
      <main id="main-content">
        <Outlet />
      </main>
      {!bare && <Footer />}
    </HelmetProvider>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container-x pt-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-warmgray">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true" className="text-ivory/30">/</span>}
            {item.href ? (
              <Link to={item.href} className="transition-colors hover:text-gold-bright">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ivory/80">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
