import { Link } from "react-router-dom";
import { SEO } from "@/components/layout/SEO";

export default function NotFound() {
  return (
    <section className="section-pad">
      <SEO
        title="Page Not Found | Kopala Media"
        description="This page may have moved. Find your way back to Kopala Media's services, packages, assessment or contact."
        noindex
      />
      <div className="container-x max-w-2xl text-center">
        <p className="font-display text-7xl font-bold text-gold/40">404</p>
        <h1 className="mt-4 text-3xl font-bold text-ivory sm:text-4xl">
          This page may have moved, but your next opportunity does not have to.
        </h1>
        <p className="prose-measure mx-auto mt-4 text-base leading-relaxed text-warmgray">
          The page you're looking for isn't here. One of these will get you back on track:
        </p>
        <nav aria-label="Recovery links" className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <Link to="/" className="btn-gold w-full sm:w-auto">Home</Link>
          <Link to="/services" className="btn-outline w-full sm:w-auto">Services</Link>
          <Link to="/packages" className="btn-outline w-full sm:w-auto">Packages</Link>
          <Link to="/assessment" className="btn-outline w-full sm:w-auto">Business Assessment</Link>
          <Link to="/contact" className="btn-outline w-full sm:w-auto">Contact</Link>
        </nav>
      </div>
    </section>
  );
}
