export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const serviceNavChildren: NavItem[] = [
  { label: "Business Response System", href: "/services/business-response-system" },
  { label: "Website Design", href: "/services/website-design" },
  { label: "CRM & Lead Management", href: "/services/crm-lead-management" },
  { label: "Business Automation", href: "/services/business-automation" },
  { label: "AI-Assisted Systems", href: "/services/ai-assisted-systems" },
  { label: "Marketing & Content", href: "/services/marketing-content" },
  { label: "Custom Digital Tools", href: "/services/custom-digital-tools" },
];

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", children: serviceNavChildren },
  { label: "Packages", href: "/packages" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  services: [
    { label: "Business Response System", href: "/services/business-response-system" },
    { label: "Website Design", href: "/services/website-design" },
    { label: "CRM & Lead Management", href: "/services/crm-lead-management" },
    { label: "Business Automation", href: "/services/business-automation" },
    { label: "AI-Assisted Systems", href: "/services/ai-assisted-systems" },
    { label: "All Services", href: "/services" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Process", href: "/process" },
    { label: "Work", href: "/work" },
    { label: "Industries", href: "/industries" },
    { label: "Packages", href: "/packages" },
    { label: "FAQ", href: "/faq" },
  ],
  getStarted: [
    { label: "Book a Discovery Call", href: "/book" },
    { label: "Business Assessment", href: "/assessment" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Accessibility", href: "/accessibility" },
  ],
};
