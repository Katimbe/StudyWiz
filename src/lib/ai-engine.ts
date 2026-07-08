// Local heuristic stand-in for the real AI provider layer (OpenAI / Claude / Gemini).
// Swap these functions for real API calls once a provider key is connected —
// every call site already treats results as async so the wiring won't change.
import { uid } from "./utils";
import type { Flashcard, QuizQuestion, MasteryStage } from "./types";

const STOPWORDS = new Set([
  "the","a","an","is","are","was","were","be","been","of","in","on","for","to","and","or","with","that","this",
  "it","as","by","at","from","but","not","which","their","they","its","into","also","can","will","may","these",
  "those","such","than","then","so","if","when","while","about","over","under","between",
]);

function splitSentences(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 12);
}

export function extractSummary(text: string): string {
  const sentences = splitSentences(text);
  if (sentences.length === 0) return "Not enough text to summarize yet.";
  const count = Math.min(3, Math.max(1, Math.ceil(sentences.length / 6)));
  return sentences.slice(0, count).join(" ");
}

export function extractKeyPoints(text: string): string[] {
  const sentences = splitSentences(text);
  return sentences.slice(0, Math.min(6, sentences.length)).map((s) => s.replace(/^[-•\d.)\s]+/, ""));
}

export function extractDefinitions(text: string): { term: string; definition: string }[] {
  const lines = text.split(/\n|(?<=[.!?])\s+/).map((l) => l.trim()).filter(Boolean);
  const defs: { term: string; definition: string }[] = [];
  const patterns = [/^(.{2,40}?)\s+is defined as\s+(.+)$/i, /^(.{2,40}?)\s+means\s+(.+)$/i, /^(.{2,40}?):\s+(.+)$/, /^(.{2,40}?)\s+is\s+(a|an|the)\s+(.+)$/i];
  for (const line of lines) {
    for (const p of patterns) {
      const m = line.match(p);
      if (m) {
        const term = m[1].trim();
        const definition = m.length > 3 ? `${m[2]} ${m[3]}`.trim() : m[2].trim();
        if (term.split(" ").length <= 6) defs.push({ term, definition });
        break;
      }
    }
    if (defs.length >= 8) break;
  }
  return defs;
}

export function extractDates(text: string): string[] {
  const regex = /\b((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{1,2}(?:st|nd|rd|th)?(?:,?\s+\d{4})?|\d{1,2}\/\d{1,2}\/\d{2,4})\b/gi;
  const found = text.match(regex) || [];
  return Array.from(new Set(found)).slice(0, 10);
}

function keywordCandidates(text: string): string[] {
  const words = text
    .replace(/[^a-zA-Z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 4 && !STOPWORDS.has(w.toLowerCase()));
  const freq = new Map<string, number>();
  for (const w of words) {
    const key = w.toLowerCase();
    freq.set(key, (freq.get(key) || 0) + 1);
  }
  return Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([w]) => w)
    .slice(0, 20);
}

export function generateFlashcards(text: string, count = 8): Flashcard[] {
  const sentences = splitSentences(text);
  const keywords = keywordCandidates(text);
  const cards: Flashcard[] = [];

  const defs = extractDefinitions(text);
  for (const d of defs) {
    cards.push({ id: uid("card"), front: `What is ${d.term}?`, back: d.definition, mastery: "Not started", dueAt: null });
  }

  for (const sentence of sentences) {
    if (cards.length >= count) break;
    const kw = keywords.find((k) => sentence.toLowerCase().includes(k));
    if (kw) {
      const blanked = sentence.replace(new RegExp(kw, "i"), "ـــ");
      cards.push({ id: uid("card"), front: `Fill in the blank: "${blanked}"`, back: sentence, mastery: "Not started", dueAt: null });
    }
  }

  let i = 0;
  while (cards.length < count && sentences[i]) {
    cards.push({ id: uid("card"), front: `Explain in your own words: "${sentences[i].slice(0, 70)}${sentences[i].length > 70 ? "…" : ""}"`, back: sentences[i], mastery: "Not started", dueAt: null });
    i++;
  }

  return cards.slice(0, count);
}

export function generateQuiz(text: string, topic: string, count = 6): QuizQuestion[] {
  const sentences = splitSentences(text);
  const keywords = keywordCandidates(text);
  const questions: QuizQuestion[] = [];
  const difficulties: QuizQuestion["difficulty"][] = ["Recall", "Understanding", "Application", "Analysis"];

  sentences.forEach((sentence, idx) => {
    if (questions.length >= count) return;
    const kw = keywords.find((k) => sentence.toLowerCase().includes(k));
    if (!kw) return;
    const distractors = keywords.filter((k) => k !== kw).slice(idx % keywords.length, idx % keywords.length + 3);
    while (distractors.length < 3) distractors.push(`related-concept-${distractors.length + 1}`);

    const options = [kw, ...distractors].map((opt, oi) => ({
      id: uid("opt"),
      text: opt,
      correct: oi === 0,
      whyWrong: oi === 0 ? undefined : `"${opt}" is a related term from the material but does not fit this specific statement — re-read the passage discussing "${kw}" to see the distinction.`,
    }));
    // shuffle deterministically
    const shuffled = [...options].sort(() => 0.5 - ((idx * 37) % 100) / 100);

    questions.push({
      id: uid("q"),
      type: "multiple-choice",
      prompt: `Based on your material, which term best completes this idea: "${sentence.replace(new RegExp(kw, "i"), "____")}"`,
      options: shuffled,
      explanation: `The correct term is "${kw}" — it's the concept your uploaded material directly associates with this statement.`,
      difficulty: difficulties[idx % difficulties.length],
      topic,
    });
  });

  let i = 0;
  while (questions.length < count && sentences[i]) {
    questions.push({
      id: uid("q"),
      type: "true-false",
      prompt: `True or False: "${sentences[i]}"`,
      options: [
        { id: uid("opt"), text: "True", correct: true },
        { id: uid("opt"), text: "False", correct: false, whyWrong: "This statement comes directly from your uploaded material, so it is accurate as written." },
      ],
      explanation: "This statement is taken directly from your source material.",
      difficulty: "Recall",
      topic,
    });
    i++;
  }

  return questions.slice(0, count);
}

export function estimateConfidence(text: string): number {
  const len = text.trim().length;
  if (len < 20) return 40;
  if (len < 200) return 70;
  return 92;
}

export function nextMasteryStage(current: MasteryStage, correct: boolean): MasteryStage {
  const order: MasteryStage[] = ["Not started", "Seen", "Reviewed", "Practiced", "Corrected", "Applied", "Mastered"];
  const idx = order.indexOf(current === "Due for review" ? "Practiced" : current);
  if (!correct) return "Corrected";
  const next = order[Math.min(order.length - 1, idx + 1)];
  return next;
}
