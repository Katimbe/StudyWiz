/**
 * Verified client work. Only verified delivered outcomes are published.
 * Screenshots, live URLs and testimonials render when supplied by the owner —
 * see docs/content/ for how to add them. Nothing here is invented (§21, §45).
 */

export interface CaseStudy {
  slug: string;
  name: string;
  industry: string;
  status: string;
  summary: string;
  challenge: string;
  delivered: string[];
  verifiedOutcomes: string[];
  liveUrl?: string; // TODO(OWNER): supply verified public link
  testimonial?: { quote: string; attribution: string }; // TODO(OWNER): supply genuine testimonial
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "chipiliro-khonje-photography",
    name: "Chipiliro Khonje Photography",
    industry: "Photography",
    status: "Live and in use",
    summary:
      "A live photography website that improved professional visibility and created a structured way for prospective clients to view the photographer's work and submit inquiries.",
    challenge:
      "A professional photographer needed a credible online destination where potential clients could discover services, view the work, and make inquiries — instead of relying on scattered social-media messages.",
    delivered: [
      "Professional photography website, live and in use",
      "Service presentation that communicates the offer clearly",
      "Gallery presentation for viewing the photographer's work",
      "Structured inquiry pathway for prospective clients",
      "Mobile-accessible experience across devices",
    ],
    verifiedOutcomes: [
      "Live website",
      "Professional digital presence",
      "Mobile accessibility",
      "Structured inquiry path",
      "Clear service presentation",
      "Stronger credibility",
    ],
  },
  {
    slug: "fix-it-chichi",
    name: "Fix It Chichi",
    industry: "Electrical & Maintenance Services",
    status: "Paid, live client work",
    summary:
      "A live service-business website that gives customers a professional destination for understanding the company's services and requesting assistance.",
    challenge:
      "An electrical and maintenance services business needed customers to be able to find it, understand its services, and request assistance through a professional channel rather than word of mouth alone.",
    delivered: [
      "Professional service-business website, live and in use",
      "Clear services section explaining the offer",
      "Contact and request-service flow for customers",
      "Mobile-accessible experience across devices",
    ],
    verifiedOutcomes: [
      "Live website",
      "Professional digital presence",
      "Mobile accessibility",
      "Structured request-service path",
      "Clear service presentation",
      "Stronger credibility",
    ],
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);
