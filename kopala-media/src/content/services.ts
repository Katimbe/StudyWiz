/**
 * Service content. The 10 capability cards power the Services index and home
 * overview; the seven entries in `servicePages` power the detail pages.
 */

export interface ServiceCapability {
  title: string;
  summary: string;
  href?: string;
}

export const capabilities: ServiceCapability[] = [
  {
    title: "Business Discovery & Digital Strategy",
    summary:
      "We examine the customer journey, daily workflow, lead process and administrative pressure before recommending what to build.",
    href: "/process",
  },
  {
    title: "Website Design & Development",
    summary:
      "Professional new websites, strategic redesigns, landing pages and mobile experiences that communicate value and guide visitors to act.",
    href: "/services/website-design",
  },
  {
    title: "Customer-Intake Systems",
    summary:
      "Forms, quote requests and structured intake that make customer information easier to capture the first time.",
    href: "/services/business-response-system",
  },
  {
    title: "CRM & Lead Management",
    summary:
      "Lead pipelines that keep every inquiry recorded, organized and moving toward a clear next step.",
    href: "/services/crm-lead-management",
  },
  {
    title: "Lead Follow-Up Automation",
    summary:
      "Automated acknowledgements, reminders and follow-up sequences so fewer opportunities go quiet.",
    href: "/services/business-automation",
  },
  {
    title: "AI-Assisted Business Systems",
    summary:
      "AI-assisted communication and workflows that acknowledge inquiries, draft responses and reduce repetitive work.",
    href: "/services/ai-assisted-systems",
  },
  {
    title: "Marketing, Branding & Content",
    summary:
      "Positioning, campaigns, content and sales messaging built around measurable goals.",
    href: "/services/marketing-content",
  },
  {
    title: "Business Automation",
    summary:
      "Email, SMS and WhatsApp workflows that connect your tools and remove repetitive administrative work.",
    href: "/services/business-automation",
  },
  {
    title: "Custom Digital Tools",
    summary:
      "Dashboards, portals, internal tools and reporting built around the way your business actually operates.",
    href: "/services/custom-digital-tools",
  },
  {
    title: "Ongoing Technical & Operational Support",
    summary:
      "Website maintenance, automation monitoring, reporting and continuous improvement after launch.",
    href: "/packages#support-plans",
  },
];

export interface ServicePage {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  problem: { heading: string; body: string; points: string[] };
  provide: { heading: string; items: { title: string; body: string }[] };
  benefit: { heading: string; body: string; outcomes: string[] };
  audience: { heading: string; body: string };
  relatedPackage: string;
  cta: { primary: string; secondary: string };
}

export const servicePages: ServicePage[] = [
  {
    slug: "website-design",
    title: "Website Design & Digital Presence",
    shortTitle: "Website Design",
    metaTitle: "Website Design & Digital Presence | Kopala Media",
    metaDescription:
      "Professional websites and strategic redesigns for service businesses — built to communicate value, work on every device, and turn visitors into inquiries.",
    headline: "A website that works as hard as you do.",
    intro:
      "Your website is often the first place a potential customer decides whether to trust you. We design and build professional websites and digital experiences that communicate your value clearly, work beautifully on every device, and guide visitors toward making contact.",
    problem: {
      heading: "The problem we solve",
      body:
        "Many capable businesses are held back by a digital presence that undersells them:",
      points: [
        "No professional website, or one that has fallen years behind the business",
        "A poor mobile experience that loses the majority of visitors who browse on phones",
        "Unclear service messaging that leaves visitors unsure what you do or why to choose you",
        "No structured way for an interested visitor to make contact or request a quote",
        "Low visibility in search, leaving the business dependent on referrals alone",
      ],
    },
    provide: {
      heading: "What Kopala Media provides",
      items: [
        {
          title: "Strategic design",
          body: "Messaging, structure and page design built around your customer's decision-making — not decoration for its own sake.",
        },
        {
          title: "Mobile-first development",
          body: "Fast, responsive pages that feel considered on a phone, a tablet and a desktop alike.",
        },
        {
          title: "Conversion pathways",
          body: "Contact forms, quote requests and booking options placed where visitors naturally decide to act.",
        },
        {
          title: "Foundational SEO & analytics",
          body: "Clean page structure, metadata and measurement so the right people can find you — and you can see what works.",
        },
      ],
    },
    benefit: {
      heading: "The operational benefit",
      body:
        "A credible, professional destination that answers questions before they're asked — and turns attention into structured inquiries your business can act on.",
      outcomes: [
        "Stronger first impression and credibility",
        "A clear path from visit to inquiry",
        "Better visibility in local search",
        "A foundation your customer-response system can build on",
      ],
    },
    audience: {
      heading: "Who this is for",
      body:
        "Owner-operated and growing service businesses whose current website — or lack of one — no longer reflects the quality of the work they deliver.",
    },
    relatedPackage: "Visibility Foundation",
    cta: { primary: "Start Your Digital Foundation", secondary: "Book a Discovery Call" },
  },
  {
    slug: "crm-lead-management",
    title: "CRM & Lead Management",
    shortTitle: "CRM & Lead Management",
    metaTitle: "CRM & Lead Management | Kopala Media",
    metaDescription:
      "Organized lead capture, pipelines and follow-up workflows so every inquiry is recorded, assigned and moved toward a clear next step.",
    headline: "Every inquiry recorded. Every follow-up accounted for.",
    intro:
      "When inquiries arrive through calls, email, web forms and social media, opportunities slip through the gaps. We set up practical CRM and lead-management systems that capture every inquiry in one place and move each one toward a clear next step.",
    problem: {
      heading: "The problem we solve",
      body:
        "Growing businesses rarely lose leads on purpose — they lose them in the gaps between disconnected channels:",
      points: [
        "Inquiries arriving across calls, email, forms and social messages with no single record",
        "Follow-up that depends on memory, sticky notes or a crowded inbox",
        "No visibility into which opportunities are new, active, stalled or won",
        "Valuable customer history existing only in the owner's head",
        "No reliable process from first inquiry to paying customer",
      ],
    },
    provide: {
      heading: "What Kopala Media provides",
      items: [
        {
          title: "CRM setup & configuration",
          body: "A right-sized CRM configured around your services and sales process — not an enterprise system you'll never use.",
        },
        {
          title: "Lead pipeline design",
          body: "Clear stages from new inquiry to won work, so nothing sits unnoticed and every lead has a next step.",
        },
        {
          title: "Intake connection",
          body: "Website forms, booking requests and inquiries flowing directly into the pipeline with source tracking.",
        },
        {
          title: "Training & documentation",
          body: "A quick-start guide and training session so the system is actually used every day.",
        },
      ],
    },
    benefit: {
      heading: "The operational benefit",
      body:
        "One organized view of every opportunity — who they are, where they came from, and what happens next.",
      outcomes: [
        "Fewer missed or forgotten inquiries",
        "Faster, more consistent follow-up",
        "Clear visibility of your sales pipeline",
        "Customer knowledge that stays with the business",
      ],
    },
    audience: {
      heading: "Who this is for",
      body:
        "Service businesses fielding inquiries across multiple channels that need one organized system instead of a patchwork of inboxes and memory.",
    },
    relatedPackage: "Business Response System",
    cta: { primary: "Build My Response System", secondary: "Book a Discovery Call" },
  },
  {
    slug: "business-automation",
    title: "Business Automation",
    shortTitle: "Business Automation",
    metaTitle: "Business Automation | Kopala Media",
    metaDescription:
      "Practical automation for service businesses — automated acknowledgements, follow-up, reminders and connected tools that buy back the owner's time.",
    headline: "Buy back the hours repetitive work is taking.",
    intro:
      "Scheduling, follow-up, reminders, reporting and repetitive communication quietly consume an owner's most valuable hours. We build practical automations that handle the repetitive work reliably — so you can focus on delivering the service and growing the business.",
    problem: {
      heading: "The problem we solve",
      body: "Administrative overload shows up in the same places across most service businesses:",
      points: [
        "Manually acknowledging every inquiry — often hours later, often after hours",
        "Follow-up that happens only when the owner finds time",
        "Appointment scheduling handled through long message chains",
        "The same information typed into multiple disconnected tools",
        "Reporting that never happens because assembling it takes too long",
      ],
    },
    provide: {
      heading: "What Kopala Media provides",
      items: [
        {
          title: "Automated acknowledgements",
          body: "Every inquiry receives an immediate, professional confirmation — even at 11pm on a Sunday.",
        },
        {
          title: "Follow-up sequences",
          body: "Timely, structured follow-up by email, SMS or WhatsApp that keeps opportunities warm without manual chasing.",
        },
        {
          title: "Connected tools",
          body: "Your website, forms, calendar, CRM and email working as one system instead of five separate ones.",
        },
        {
          title: "Reminders & reporting",
          body: "Appointment reminders, task prompts and simple performance reporting that runs itself.",
        },
      ],
    },
    benefit: {
      heading: "The operational benefit",
      body:
        "A business that responds in seconds and follows up every time — without adding hours to your week.",
      outcomes: [
        "Faster response to every inquiry",
        "Hours of repetitive work removed each week",
        "Consistent customer experience",
        "Growth no longer limited by the owner's availability",
      ],
    },
    audience: {
      heading: "Who this is for",
      body:
        "Owners who are delivering the service while also managing sales, scheduling, communication and administration — and running out of hours.",
    },
    relatedPackage: "Business Response System",
    cta: { primary: "Build My Response System", secondary: "Book a Discovery Call" },
  },
  {
    slug: "ai-assisted-systems",
    title: "AI-Assisted Business Systems",
    shortTitle: "AI-Assisted Systems",
    metaTitle: "AI-Assisted Business Systems | Kopala Media",
    metaDescription:
      "Practical AI-assisted communication for service businesses — inquiry handling, response drafting and workflow support, applied where it genuinely helps.",
    headline: "Practical AI, applied where it actually helps.",
    intro:
      "AI is most valuable when it removes specific friction — not when it's added for its own sake. We design AI-assisted communication and workflow systems that acknowledge inquiries, draft responses, organize information and support your team, always with clear human oversight.",
    problem: {
      heading: "The problem we solve",
      body: "The opportunity isn't 'AI' in the abstract — it's the specific work it can take off your plate:",
      points: [
        "Routine questions that consume the same answering time every week",
        "Inquiries that arrive outside working hours and wait until morning",
        "First drafts of quotes, responses and follow-ups written from scratch each time",
        "Customer information scattered across channels that nobody has time to organize",
        "Valuable business knowledge that exists only in the owner's head",
      ],
    },
    provide: {
      heading: "What Kopala Media provides",
      items: [
        {
          title: "AI-assisted inquiry handling",
          body: "Structured first responses to common questions, with clear handoff to you for anything that needs judgment.",
        },
        {
          title: "Response & follow-up drafting",
          body: "On-brand draft replies and follow-ups prepared for your review, cutting writing time to approval time.",
        },
        {
          title: "Knowledge capture",
          body: "Your services, pricing logic and processes documented so both people and systems can use them consistently.",
        },
        {
          title: "Human-in-the-loop design",
          body: "Automation that supports decisions rather than making them blindly — you stay in control of every customer relationship.",
        },
      ],
    },
    benefit: {
      heading: "The operational benefit",
      body:
        "Faster communication and lighter administrative load — applied carefully, measured honestly, and always under your control.",
      outcomes: [
        "Faster first response, around the clock",
        "Less time writing routine communication",
        "More consistent customer answers",
        "Systems that improve as your knowledge base grows",
      ],
    },
    audience: {
      heading: "Who this is for",
      body:
        "Businesses ready to reduce repetitive communication work — that want practical results rather than experiments.",
    },
    relatedPackage: "Growth Operations System",
    cta: { primary: "Discuss a Growth System", secondary: "Book a Discovery Call" },
  },
  {
    slug: "marketing-content",
    title: "Marketing & Content",
    shortTitle: "Marketing & Content",
    metaTitle: "Marketing & Content Systems | Kopala Media",
    metaDescription:
      "Positioning, campaigns, content and sales enablement for service businesses — marketing connected to intake, CRM and follow-up instead of operating alone.",
    headline: "Marketing connected to the system that catches it.",
    intro:
      "Marketing only pays off when the business behind it can respond. We build positioning, content and campaign support that connects directly to your intake, CRM and follow-up — so attention turns into organized opportunities, not missed messages.",
    problem: {
      heading: "The problem we solve",
      body: "Marketing underperforms for structural reasons more often than creative ones:",
      points: [
        "Unclear positioning that makes a capable business hard to understand or choose",
        "Inconsistent visibility — marketing happens only when things are quiet",
        "Campaigns that generate interest the business isn't set up to catch",
        "Sales messaging and proposals rebuilt from scratch for every opportunity",
        "No measurement connecting marketing effort to actual inquiries",
      ],
    },
    provide: {
      heading: "What Kopala Media provides",
      items: [
        {
          title: "Positioning & messaging",
          body: "Clear articulation of what you do, who it's for and why it matters — carried consistently across every channel.",
        },
        {
          title: "Content systems",
          body: "A sustainable rhythm for staying visible: website content, social presence and campaign creative that fit your capacity.",
        },
        {
          title: "Campaign support",
          body: "Lead-generation campaigns and research aimed at measurable inquiry goals, not vanity metrics.",
        },
        {
          title: "Sales enablement",
          body: "Proposals, sales messaging and follow-up systems that make every opportunity easier to close.",
        },
      ],
    },
    benefit: {
      heading: "The operational benefit",
      body:
        "Consistent visibility with a system behind it — so the interest you generate is captured, organized and followed up.",
      outcomes: [
        "Clearer, more persuasive positioning",
        "Consistent presence without feast-or-famine effort",
        "Marketing measurable against real inquiries",
        "Sales conversations that start further along",
      ],
    },
    audience: {
      heading: "Who this is for",
      body:
        "Businesses ready to invest in visibility that want their marketing connected to intake and follow-up — not operating in isolation.",
    },
    relatedPackage: "Growth Operations System",
    cta: { primary: "Discuss a Growth System", secondary: "Book a Discovery Call" },
  },
  {
    slug: "custom-digital-tools",
    title: "Custom Digital Tools",
    shortTitle: "Custom Digital Tools",
    metaTitle: "Custom Digital Tools, Dashboards & Portals | Kopala Media",
    metaDescription:
      "Custom dashboards, client portals, internal tools and reporting built around the way your business actually operates.",
    headline: "Tools shaped around your business — not the other way round.",
    intro:
      "Sometimes the right answer isn't an off-the-shelf product. We design and build custom digital tools — dashboards, client portals, internal utilities and reporting — that fit the way your business actually operates and connect to the systems you already use.",
    problem: {
      heading: "The problem we solve",
      body: "Off-the-shelf software solves generic problems. Some operational needs are specific:",
      points: [
        "Critical information spread across spreadsheets, inboxes and disconnected apps",
        "Reporting that requires hours of manual assembly — so it rarely happens",
        "Clients asking for updates your systems can't easily provide",
        "Internal processes that live in one person's head and break when they're away",
        "Software subscriptions that almost fit — and force awkward workarounds",
      ],
    },
    provide: {
      heading: "What Kopala Media provides",
      items: [
        {
          title: "Reporting dashboards",
          body: "Live views of the numbers that matter — leads, pipeline, response times, bookings — assembled automatically.",
        },
        {
          title: "Client portals",
          body: "A professional place for your customers to check status, submit information and find what they need.",
        },
        {
          title: "Internal tools",
          body: "Purpose-built utilities for the specific workflows generic software doesn't cover.",
        },
        {
          title: "Systems integration",
          body: "Your existing tools connected so information moves once, accurately, instead of being re-keyed everywhere.",
        },
      ],
    },
    benefit: {
      heading: "The operational benefit",
      body:
        "Visibility and structure where generic software runs out — built to be understandable, maintainable and valuable in daily operation.",
      outcomes: [
        "Decisions based on current, accurate information",
        "A more professional customer experience",
        "Processes documented and repeatable",
        "Fewer workarounds and less re-keying",
      ],
    },
    audience: {
      heading: "Who this is for",
      body:
        "Established businesses whose operations have outgrown generic tools — or that need systems connected in a way no single product offers.",
    },
    relatedPackage: "Growth Operations System",
    cta: { primary: "Discuss a Custom System", secondary: "Book a Discovery Call" },
  },
];

export const getServicePage = (slug: string) =>
  servicePages.find((s) => s.slug === slug);
