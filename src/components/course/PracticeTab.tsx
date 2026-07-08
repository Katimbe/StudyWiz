"use client";
import { useState } from "react";
import { Dumbbell, Layers, ListChecks } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EmptyState } from "@/components/shared/EmptyState";
import { FlashcardStudy } from "@/components/practice/FlashcardStudy";
import { QuizRunner } from "@/components/practice/QuizRunner";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore } from "@/lib/store";
import { generateFlashcards, generateQuiz } from "@/lib/ai-engine";
import type { Course } from "@/lib/types";

export function PracticeTab({ course }: { course: Course }) {
  const materials = useStudyGenieStore(useShallow((s) => s.materials.filter((m) => m.courseId === course.id && m.rawText.trim().length > 0)));
  const flashcardSets = useStudyGenieStore(useShallow((s) => s.flashcardSets.filter((f) => f.courseId === course.id)));
  const quizzes = useStudyGenieStore(useShallow((s) => s.quizzes.filter((q) => q.courseId === course.id)));
  const addFlashcardSet = useStudyGenieStore(useShallow((s) => s.addFlashcardSet));
  const addQuiz = useStudyGenieStore(useShallow((s) => s.addQuiz));

  const [materialId, setMaterialId] = useState("");
  const [activeSet, setActiveSet] = useState<string | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);

  const material = materials.find((m) => m.id === materialId);

  function generateFromMaterial(kind: "flashcards" | "quiz") {
    if (!material) return;
    if (kind === "flashcards") {
      const set = addFlashcardSet({ courseId: course.id, materialId: material.id, title: material.title, cards: generateFlashcards(material.rawText, 8) });
      setActiveSet(set.id);
    } else {
      const quiz = addQuiz({ courseId: course.id, materialId: material.id, title: material.title, questions: generateQuiz(material.rawText, material.kind, 6) });
      setActiveQuiz(quiz.id);
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Generate practice from a material</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {materials.length === 0 ? (
            <p className="text-sm text-muted-foreground">Add a material with text content first.</p>
          ) : (
            <>
              <Select value={materialId} onValueChange={setMaterialId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a material" />
                </SelectTrigger>
                <SelectContent>
                  {materials.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button size="sm" disabled={!material} onClick={() => generateFromMaterial("flashcards")}>
                  <Layers className="h-4 w-4" /> Generate flashcards
                </Button>
                <Button size="sm" variant="outline" disabled={!material} onClick={() => generateFromMaterial("quiz")}>
                  <ListChecks className="h-4 w-4" /> Generate quiz
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {flashcardSets.length === 0 && quizzes.length === 0 ? (
        <EmptyState icon={Dumbbell} title="No practice sets yet" description="Generate flashcards or a quiz from any material above to start practicing." />
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Flashcard sets</CardTitle>
            </CardHeader>
            <CardContent>
              {flashcardSets.length === 0 ? (
                <p className="text-sm text-muted-foreground">None yet.</p>
              ) : (
                <ul className="space-y-2">
                  {flashcardSets.map((f) => (
                    <li key={f.id} className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{f.title}</span>
                      <Button size="sm" variant="outline" onClick={() => setActiveSet(f.id)}>
                        Study
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              {quizzes.length === 0 ? (
                <p className="text-sm text-muted-foreground">None yet.</p>
              ) : (
                <ul className="space-y-2">
                  {quizzes.map((q) => (
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
      )}

      <Dialog open={!!activeSet} onOpenChange={(o) => !o && setActiveSet(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{flashcardSets.find((f) => f.id === activeSet)?.title}</DialogTitle>
          </DialogHeader>
          {activeSet && <FlashcardStudy set={flashcardSets.find((f) => f.id === activeSet)!} onDone={() => setActiveSet(null)} />}
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
