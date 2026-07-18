/** The Kopala Media seven-stage method. */

export interface ProcessStage {
  number: string;
  name: string;
  summary: string;
  clientReceives: string;
}

export const processStages: ProcessStage[] = [
  {
    number: "01",
    name: "Discover",
    summary:
      "Understand the business, customer, workflow, tools, and current challenges.",
    clientReceives:
      "A structured discovery session and a clear picture of how your business actually operates today.",
  },
  {
    number: "02",
    name: "Diagnose",
    summary:
      "Identify where time, leads, customer opportunities, and revenue are being lost.",
    clientReceives:
      "A plain-language diagnosis separating urgent problems from optional improvements.",
  },
  {
    number: "03",
    name: "Design",
    summary:
      "Plan the customer journey, website, CRM, workflow, messaging, and automation.",
    clientReceives:
      "A defined solution: scope, timeline, success criteria and payment stages — approved before anything is built.",
  },
  {
    number: "04",
    name: "Build",
    summary:
      "Develop and connect the approved digital systems.",
    clientReceives:
      "The approved website, intake, CRM and automation — built and connected, with progress you can review.",
  },
  {
    number: "05",
    name: "Test",
    summary:
      "Verify forms, messages, booking, CRM, automation, accessibility, and mobile responsiveness.",
    clientReceives:
      "A validated system tested across devices and workflows against clear acceptance criteria.",
  },
  {
    number: "06",
    name: "Launch",
    summary:
      "Deploy the system, complete handoff, and train the client.",
    clientReceives:
      "Go-live, a training session, and a quick-start guide so the system is usable from day one.",
  },
  {
    number: "07",
    name: "Improve",
    summary:
      "Monitor performance, maintain the system, and recommend improvements.",
    clientReceives:
      "Post-launch support, performance review, and honest recommendations based on evidence.",
  },
];
