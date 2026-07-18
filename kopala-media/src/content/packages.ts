/** Service packages and monthly support plans — pricing per approved 2026 company profile. */

export interface Package {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  label?: string;
  purpose: string;
  deliverables: string[];
  primaryCta: string;
  secondaryCta: string;
  featured?: boolean;
}

export const packages: Package[] = [
  {
    id: "visibility-foundation",
    name: "Visibility Foundation",
    price: "$2,500",
    priceNote: "starting investment",
    purpose:
      "For businesses that need a professional digital presence and a reliable way for customers to make contact.",
    deliverables: [
      "Discovery session",
      "Up to five-page website or redesign",
      "Mobile optimization",
      "Contact or quote form",
      "Automated email response",
      "Basic booking setup",
      "Basic SEO and analytics",
      "Two revision rounds",
      "Fourteen days of post-launch support",
    ],
    primaryCta: "Start Your Digital Foundation",
    secondaryCta: "Request a Recommendation",
  },
  {
    id: "business-response-system",
    name: "Business Response System",
    price: "$4,500",
    priceNote: "starting investment",
    label: "Flagship Offer",
    purpose:
      "For businesses that need better lead capture, faster response, organized follow-up, and reduced administrative workload.",
    deliverables: [
      "Workflow assessment",
      "Up to seven-page website or redesign",
      "Advanced customer-intake form",
      "Automated email acknowledgement",
      "CRM setup",
      "Lead pipeline",
      "Booking integration",
      "Follow-up automation",
      "Tracking and reporting",
      "Training session & quick-start guide",
      "Two revision rounds",
      "Thirty days of post-launch support",
    ],
    primaryCta: "Build My Response System",
    secondaryCta: "Book a Discovery Call",
    featured: true,
  },
  {
    id: "growth-operations-system",
    name: "Growth Operations System",
    price: "$7,500",
    priceNote: "starting investment",
    purpose:
      "For established businesses that need connected marketing, customer communication, CRM, follow-up, reporting, and automation.",
    deliverables: [
      "Marketing and sales audit",
      "Advanced website or funnel (up to ten pages)",
      "CRM configuration",
      "Multiple intake workflows",
      "Email, SMS, or WhatsApp automation",
      "Lead qualification",
      "AI-assisted communication",
      "Reporting dashboard",
      "Team documentation and training",
      "Two revision rounds",
      "Sixty days of post-launch support",
    ],
    primaryCta: "Discuss a Growth System",
    secondaryCta: "Book a Discovery Call",
  },
];

export const pricingNotice =
  "Final pricing depends on project scope, integrations, content requirements, timeline, and system complexity. Third-party software, messaging and advertising fees are separate unless stated in the proposal.";

export interface SupportPlan {
  id: string;
  name: string;
  price: string;
  includes: string[];
}

export const supportPlans: SupportPlan[] = [
  {
    id: "systems-care",
    name: "Systems Care",
    price: "$450–$750 / month",
    includes: [
      "Website maintenance",
      "Automation monitoring",
      "Minor updates",
      "Monthly system check",
      "Technical support",
    ],
  },
  {
    id: "growth-operations",
    name: "Growth Operations",
    price: "$1,000–$1,750 / month",
    includes: [
      "Everything in Systems Care",
      "Lead-pipeline review",
      "Follow-up optimization",
      "Monthly reporting",
      "Strategy meeting",
    ],
  },
  {
    id: "managed-growth",
    name: "Managed Growth",
    price: "$2,500–$5,000+ / month",
    includes: [
      "Lead and campaign support",
      "Social-content support",
      "Customer re-engagement",
      "Conversion optimization",
      "Priority strategy and support",
    ],
  },
];

export const supportPricingNotice =
  "Final monthly pricing depends on workload, lead volume, communication channels, integrations, and response expectations.";

export const paymentStructure = [
  { share: "50%", when: "Upfront, to begin the project" },
  { share: "30%", when: "After design and workflow approval" },
  { share: "20%", when: "Before launch" },
];

export const engagementTerms = [
  "Two consolidated revision rounds included; new pages, features, or direction changes are additional scope.",
  "Post-launch support covers defects and minor configuration adjustments for the period stated in each package.",
  "Email is the standard project channel; standard support during business hours, emergency options available.",
  "Domains, hosting, subscriptions, and API usage are separate unless included in writing.",
];
