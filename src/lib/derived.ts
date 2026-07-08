import type { Assignment, Course, Flashcard, MasteryTopic, Material, Quiz } from "./types";
import { daysUntil } from "./utils";

export function courseMasteryScore(topics: MasteryTopic[]): number {
  if (topics.length === 0) return 0;
  const weights: Record<string, number> = {
    "Not started": 0,
    Seen: 15,
    Reviewed: 35,
    Practiced: 55,
    Corrected: 45,
    Applied: 75,
    Mastered: 100,
    "Due for review": 60,
  };
  const total = topics.reduce((sum, t) => sum + (weights[t.stage] ?? 0), 0);
  return Math.round(total / topics.length);
}

export function courseNextDeadline(assignments: Assignment[], course: Course): { label: string; date: string } | null {
  const candidates: { label: string; date: string }[] = [];
  for (const a of assignments) {
    if (a.dueDate) candidates.push({ label: a.title, date: a.dueDate });
  }
  for (const e of course.examDates) {
    candidates.push({ label: e.label, date: e.date });
  }
  const upcoming = candidates
    .filter((c) => {
      const d = daysUntil(c.date);
      return d !== null && d >= 0;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return upcoming[0] ?? null;
}

export function courseRiskScore(course: Course, assignments: Assignment[], mastery: number): number {
  let risk = 0;
  const nextDeadline = courseNextDeadline(assignments, course);
  if (nextDeadline) {
    const d = daysUntil(nextDeadline.date) ?? 30;
    if (d <= 2) risk += 45;
    else if (d <= 5) risk += 30;
    else if (d <= 10) risk += 15;
  }
  risk += Math.max(0, (100 - mastery) * 0.4);
  if (!course.lastStudiedAt) risk += 10;
  else {
    const daysSince = Math.abs(daysUntil(course.lastStudiedAt.slice(0, 10)) ?? 0);
    if (daysSince > 10) risk += 15;
    else if (daysSince > 5) risk += 8;
  }
  return Math.min(100, Math.round(risk));
}

export function riskLabel(score: number): { label: string; tone: "mint" | "gold" | "danger" } {
  if (score >= 60) return { label: "High risk", tone: "danger" };
  if (score >= 30) return { label: "Moderate risk", tone: "gold" };
  return { label: "On track", tone: "mint" };
}

export function flashcardsDue(cards: Flashcard[]): Flashcard[] {
  const now = Date.now();
  return cards.filter((c) => !c.dueAt || new Date(c.dueAt).getTime() <= now);
}

export function quizAccuracyTrend(quizzes: Quiz[]): number[] {
  return quizzes.flatMap((q) => q.attempts.map((a) => a.scorePct)).slice(-10);
}

export function materialsCount(materials: Material[], courseId: string) {
  return materials.filter((m) => m.courseId === courseId && !m.archived).length;
}
