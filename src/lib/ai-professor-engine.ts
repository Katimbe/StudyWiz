// Placeholder response composer standing in for the real LLM provider call
// (OpenAI / Claude / Gemini). Every call site is already async-shaped so
// swapping in a real API client later requires no UI changes.
import type { AiProfessorModeId } from "./ai-professor-modes";
import { extractSummary, extractKeyPoints } from "./ai-engine";

export function composeAiProfessorReply({
  mode,
  question,
  materialText,
  materialTitle,
}: {
  mode: AiProfessorModeId;
  question: string;
  materialText: string | null;
  materialTitle: string | null;
}): string {
  const grounded = Boolean(materialText && materialText.trim().length > 20);
  const sourceNote = grounded
    ? `Grounded in "${materialTitle}." `
    : "No material is selected yet, so I can't ground this in your own content — upload or select a source for a more precise answer. ";

  if (!grounded && mode !== "turn-into-project") {
    return `${sourceNote}Here's a general response to "${question}": I can help once you attach a course material — until then, treat this as a starting point, not a fact-checked answer grounded in your syllabus.`;
  }

  const summary = materialText ? extractSummary(materialText) : "";
  const points = materialText ? extractKeyPoints(materialText) : [];

  switch (mode) {
    case "explain-simply":
      return `${sourceNote}In plain terms: ${summary || "your material doesn't have enough text yet to summarize — try adding more content."}`;
    case "teach-professor":
      return `${sourceNote}Formally: ${summary}\n\nKey supporting points from your material:\n${points.map((p) => `• ${p}`).join("\n")}`;
    case "socratic":
      return `${sourceNote}Before I answer — what do you think "${question}" is really asking? Consider: ${points[0] ?? "what's the core term in your material that relates to this?"} What happens if you apply that idea to your question?`;
    case "quiz-first":
      return `${sourceNote}Quick check before I explain — try answering: "${points[0] ?? question}" in your own words. Once you attempt it, ask me to check your answer.`;
    case "assignment-help":
      return `${sourceNote}Breaking down your assignment material: the core ask appears to relate to "${points[0] ?? summary}". I can help you outline a response — I won't write it for you (see "Guide Me Without Doing It For Me" in Assignment Studio).`;
    case "exam-prep":
      return `${sourceNote}Likely exam-relevant ideas from this material:\n${points.slice(0, 4).map((p) => `• ${p}`).join("\n")}\nWant a practice quiz built from these?`;
    case "coding-coach":
      return `${sourceNote}Let's reason through the logic rather than jump to code: what inputs and outputs does "${question}" involve? Start there, then we can pseudocode it together.`;
    case "translate":
      return `${sourceNote}Translation requires a target language — tell me which language, and I'll translate: "${summary}"`;
    case "summarize":
      return `${sourceNote}${summary}`;
    case "make-visual":
      return `${sourceNote}Here's a mind-map outline you could sketch:\nCentral idea → ${points[0] ?? "main concept"}\n  ├─ ${points[1] ?? "supporting idea"}\n  ├─ ${points[2] ?? "supporting idea"}\n  └─ ${points[3] ?? "supporting idea"}`;
    case "real-life":
      return `${sourceNote}A real-world parallel: think about how "${points[0] ?? summary}" shows up outside the classroom — that's usually the fastest way to make it stick.`;
    case "dont-give-answer":
      return `${sourceNote}I won't hand you the answer to "${question}" — but here's a nudge: re-read the part of your material about "${points[0] ?? "the core concept"}" and ask yourself how it connects to the question.`;
    case "step-by-step":
      return `${sourceNote}Step-by-step:\n${points.slice(0, 5).map((p, i) => `${i + 1}. ${p}`).join("\n")}`;
    case "turn-into-project":
      return `${sourceNote}A hands-on project idea based on this topic: build something that demonstrates "${points[0] ?? (summary || question)}" in practice — check the Projects tab in your course to turn this into a portfolio piece.`;
    default:
      return `${sourceNote}${summary}`;
  }
}
