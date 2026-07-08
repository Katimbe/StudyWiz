"use client";
import { useState } from "react";
import { Dumbbell, Layers, ListChecks, Sparkles } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FlashcardStudy } from "@/components/practice/FlashcardStudy";
import { QuizRunner } from "@/components/practice/QuizRunner";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore, useHydrated } from "@/lib/store";
import { courseMasteryScore } from "@/lib/derived";
import { generateFlashcards, generateQuiz } from "@/lib/ai-engine";

const PRACTICE_TYPES = [
  "Flashcards",
  "Multiple choice",
  "True or false",
  "Fill in the blank",
  "Short answer",
  "Essay response",
  "Oral answer",
  "Scenario practice",
  "Coding challenge",
  "Diagram labeling",
  "Timed exam",
  "Mixed review",
  "Weak-topic drill",
  "Spaced repetition review",
  "Confidence check",
];

const AVAILABLE_TYPES = new Set(["Flashcards", "Multiple choice", "True or false", "Fill in the blank", "Short answer", "Mixed review", "Weak-topic drill", "Spaced repetition review"]);

export default function PracticePage() {
  const hydrated = useHydrated();
  const courses = useStudyGenieStore(useShallow((s) => s.courses.filter((c) => !c.archived)));
  const materials = useStudyGenieStore(useShallow((s) => s.materials));
  const flashcardSets = useStudyGenieStore(useShallow((s) => s.flashcardSets));
  const quizzes = useStudyGenieStore(useShallow((s) => s.quizzes));
  const masteryTopics = useStudyGenieStore(useShallow((s) => s.masteryTopics));
  const addFlashcardSet = useStudyGenieStore(useShallow((s) => s.addFlashcardSet));
  const addQuiz = useStudyGenieStore(useShallow((s) => s.addQuiz));

  const [courseId, setCourseId] = useState<string>("");
  const [materialId, setMaterialId] = useState<string>("");
  const [type, setType] = useState<string>("Flashcards");
  const [activeFlashcardSet, setActiveFlashcardSet] = useState<string | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);

  const dueFlashcards = flashcardSets.reduce((sum, s) => sum + s.cards.filter((c) => !c.dueAt || new Date(c.dueAt) <= new Date()).length, 0);
  const weakTopics = masteryTopics.filter((t) => t.stage === "Corrected" || (t.accuracyPct !== null && t.accuracyPct < 60));
  const accuracyTrend = quizzes.flatMap((q) => q.attempts.map((a) => ({ date: a.date.slice(5, 10), score: a.scorePct }))).slice(-12);
  const overallMastery = courses.length ? Math.round(courses.reduce((sum, c) => sum + courseMasteryScore(masteryTopics.filter((t) => t.courseId === c.id)), 0) / courses.length) : 0;

  const courseMaterials = materials.filter((m) => m.courseId === courseId && !m.archived);
  const selectedMaterial = materials.find((m) => m.id === materialId);

  const recommendedQuiz = quizzes.find((q) => weakTopics.some((t) => t.courseId === q.courseId));

  function startPractice() {
    if (!courseId) return;
    if (type === "Flashcards" || type === "Spaced repetition review") {
      const existing = flashcardSets.find((f) => f.courseId === courseId && (!materialId || f.materialId === materialId));
      if (existing) {
        setActiveFlashcardSet(existing.id);
      } else if (selectedMaterial?.rawText) {
        const created = addFlashcardSet({ courseId, materialId: materialId || null, title: `${selectedMaterial.title} — practice`, cards: generateFlashcards(selectedMaterial.rawText, 8) });
        setActiveFlashcardSet(created.id);
      }
    } else {
      const existing = quizzes.find((q) => q.courseId === courseId && (!materialId || q.materialId === materialId));
      if (existing) {
        setActiveQuiz(existing.id);
      } else if (selectedMaterial?.rawText) {
        const created = addQuiz({ courseId, materialId: materialId || null, title: `${selectedMaterial.title} — ${type}`, questions: generateQuiz(selectedMaterial.rawText, type, 6) });
        setActiveQuiz(created.id);
      }
    }
  }

  if (!hydrated) return null;

  if (courses.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader eyebrow="Practice" title="Practice Studio" description="Flashcards, quizzes, and exam-level drills built from your own material." />
        <EmptyState icon={Dumbbell} title="No courses to practice yet" description="Create a course and capture some material — StudyGenie will generate practice from it." actionLabel="Create a course" actionHref="/courses" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Practice" title="Practice Studio" description="Flashcards, quizzes, and exam-level drills built from your own material." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="text-xs text-muted-foreground">Review due today</div>
            <div className="mt-1 text-2xl font-semibold text-foreground">{dueFlashcards}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-xs text-muted-foreground">Weak topics</div>
            <div className="mt-1 text-2xl font-semibold text-foreground">{weakTopics.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-xs text-muted-foreground">Mastery score</div>
            <div className="mt-1 text-2xl font-semibold text-foreground">{overallMastery}%</div>
            <Progress value={overallMastery} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-xs text-muted-foreground">Flashcard sets</div>
            <div className="mt-1 text-2xl font-semibold text-foreground">{flashcardSets.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Accuracy trend</CardTitle>
          </CardHeader>
          <CardContent className="h-56">
            {accuracyTrend.length === 0 ? (
              <p className="text-sm text-muted-foreground">Complete a quiz to start tracking your accuracy trend.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={accuracyTrend}>
                  <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={11} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                  <Line type="monotone" dataKey="score" stroke="var(--electric)" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gold-soft to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-gold" /> Recommended
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recommendedQuiz ? (
              <>
                <p className="text-sm text-foreground">&ldquo;{recommendedQuiz.title}&rdquo; targets your weakest topics.</p>
                <Button size="sm" className="mt-3" onClick={() => setActiveQuiz(recommendedQuiz.id)}>
                  Start recommended quiz
                </Button>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No weak-topic recommendation yet — practice a few quizzes first.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Start a practice session</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Course</label>
              <Select value={courseId} onValueChange={(v) => { setCourseId(v); setMaterialId(""); }}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Choose course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Material (optional)</label>
              <Select value={materialId || "any"} onValueChange={(v) => setMaterialId(v === "any" ? "" : v)}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Any material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any material</SelectItem>
                  {courseMaterials.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Type</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRACTICE_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t} {!AVAILABLE_TYPES.has(t) ? "(coming soon)" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={startPractice} disabled={!courseId || !AVAILABLE_TYPES.has(type)}>
            <Dumbbell className="h-4 w-4" /> Start practice
          </Button>
          {courseId && !selectedMaterial && !flashcardSets.some((f) => f.courseId === courseId) && !quizzes.some((q) => q.courseId === courseId) && (
            <p className="text-xs text-muted-foreground">No existing sets for this course yet — pick a material with captured text so StudyGenie can generate one.</p>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-violet" /> Flashcard sets
            </CardTitle>
          </CardHeader>
          <CardContent>
            {flashcardSets.length === 0 ? (
              <p className="text-sm text-muted-foreground">No flashcard sets yet.</p>
            ) : (
              <ul className="space-y-2">
                {flashcardSets.slice(0, 6).map((f) => (
                  <li key={f.id} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{f.title}</span>
                    <Button size="sm" variant="outline" onClick={() => setActiveFlashcardSet(f.id)}>
                      Study
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="h-4 w-4 text-electric" /> Quizzes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {quizzes.length === 0 ? (
              <p className="text-sm text-muted-foreground">No quizzes yet.</p>
            ) : (
              <ul className="space-y-2">
                {quizzes.slice(0, 6).map((q) => (
                  <li key={q.id} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{q.title}</span>
                    <div className="flex items-center gap-2">
                      {q.attempts.length > 0 && <Badge variant="mint">{q.attempts[q.attempts.length - 1].scorePct}%</Badge>}
                      <Button size="sm" variant="outline" onClick={() => setActiveQuiz(q.id)}>
                        Start
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!activeFlashcardSet} onOpenChange={(o) => !o && setActiveFlashcardSet(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{flashcardSets.find((f) => f.id === activeFlashcardSet)?.title}</DialogTitle>
          </DialogHeader>
          {activeFlashcardSet && (
            <FlashcardStudy set={flashcardSets.find((f) => f.id === activeFlashcardSet)!} onDone={() => setActiveFlashcardSet(null)} />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!activeQuiz} onOpenChange={(o) => !o && setActiveQuiz(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{quizzes.find((q) => q.id === activeQuiz)?.title}</DialogTitle>
          </DialogHeader>
          {activeQuiz && <QuizRunner quiz={quizzes.find((q) => q.id === activeQuiz)!} onDone={() => setActiveQuiz(null)} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
