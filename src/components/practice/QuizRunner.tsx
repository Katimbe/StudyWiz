"use client";
import { useState } from "react";
import { Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import type { Quiz } from "@/lib/types";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function QuizRunner({ quiz, onDone }: { quiz: Quiz; onDone?: () => void }) {
  const recordQuizAttempt = useStudyGenieStore(useShallow((s) => s.recordQuizAttempt));
  const upsertMasteryTopic = useStudyGenieStore(useShallow((s) => s.upsertMasteryTopic));
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [freeText, setFreeText] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [selfMarked, setSelfMarked] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [missedTopics, setMissedTopics] = useState<string[]>([]);

  const q = quiz.questions[index];
  const finished = index >= quiz.questions.length;

  function submitOption(optId: string) {
    setSelectedOption(optId);
    setRevealed(true);
    const opt = q.options?.find((o) => o.id === optId);
    const correct = !!opt?.correct;
    trackResult(correct);
  }

  function submitSelfMark(correct: boolean) {
    setSelfMarked(correct);
    setRevealed(true);
    trackResult(correct);
  }

  function trackResult(correct: boolean) {
    if (correct) setCorrectCount((c) => c + 1);
    else setMissedTopics((t) => Array.from(new Set([...t, q.topic])));
    upsertMasteryTopic(quiz.courseId, q.topic, { stage: correct ? "Practiced" : "Corrected", lastReviewedAt: new Date().toISOString(), accuracyPct: correct ? 80 : 40 });
  }

  function next() {
    if (index + 1 >= quiz.questions.length) {
      const pct = Math.round((correctCount / quiz.questions.length) * 100);
      recordQuizAttempt(quiz.id, pct, missedTopics);
    }
    setIndex((i) => i + 1);
    setSelectedOption(null);
    setFreeText("");
    setRevealed(false);
    setSelfMarked(null);
  }

  if (quiz.questions.length === 0) {
    return <p className="text-sm text-muted-foreground">This quiz has no questions yet.</p>;
  }

  if (finished) {
    const pct = Math.round((correctCount / quiz.questions.length) * 100);
    return (
      <div className="mx-auto max-w-lg space-y-5 py-8 text-center">
        <div className="text-4xl font-semibold text-foreground">{pct}%</div>
        <p className="text-sm text-muted-foreground">
          {correctCount}/{quiz.questions.length} correct
        </p>
        <div className="rounded-[var(--radius-md)] border border-border bg-surface p-4 text-left">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Recovery plan</div>
          {missedTopics.length === 0 ? (
            <p className="mt-2 text-sm text-foreground">Strong round — no missed topics. Keep this material in spaced review rotation.</p>
          ) : (
            <ul className="mt-2 list-inside list-disc text-sm text-foreground">
              {missedTopics.map((t) => (
                <li key={t}>Review &ldquo;{t}&rdquo; again — scheduled for your next study session.</li>
              ))}
            </ul>
          )}
        </div>
        <Button onClick={onDone}>Done</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Question {index + 1} of {quiz.questions.length}
        </span>
        <Badge>{q.difficulty}</Badge>
      </div>
      <Progress value={(index / quiz.questions.length) * 100} />
      <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6">
        <p className="text-base font-medium text-foreground">{q.prompt}</p>

        {q.options ? (
          <div className="mt-4 space-y-2">
            {q.options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              const showState = revealed && (isSelected || opt.correct);
              return (
                <button
                  key={opt.id}
                  disabled={revealed}
                  onClick={() => submitOption(opt.id)}
                  className={cn(
                    "focus-ring flex w-full items-center justify-between rounded-[var(--radius-sm)] border px-4 py-3 text-left text-sm transition-colors",
                    !revealed && "border-border bg-background hover:border-electric/50",
                    showState && opt.correct && "border-mint bg-mint-soft text-mint",
                    showState && !opt.correct && isSelected && "border-danger bg-danger-soft text-danger",
                  )}
                >
                  <span>{opt.text}</span>
                  {showState && (opt.correct ? <Check className="h-4 w-4" /> : isSelected ? <X className="h-4 w-4" /> : null)}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            <Textarea value={freeText} onChange={(e) => setFreeText(e.target.value)} placeholder="Type your answer…" className="min-h-24" disabled={revealed} />
            {!revealed && (
              <Button size="sm" onClick={() => setRevealed(true)} disabled={!freeText.trim()}>
                Check answer
              </Button>
            )}
          </div>
        )}

        {revealed && (
          <div className="mt-4 space-y-3 border-t border-border pt-4">
            {q.correctAnswer && !q.options && (
              <div className="text-sm">
                <span className="font-semibold text-foreground">Model answer: </span>
                <span className="text-muted-foreground">{q.correctAnswer}</span>
              </div>
            )}
            <p className="text-sm text-muted-foreground">{q.explanation}</p>
            {q.options?.filter((o) => !o.correct && o.whyWrong).map((o) => (
              <p key={o.id} className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Why &ldquo;{o.text}&rdquo; is wrong:</span> {o.whyWrong}
              </p>
            ))}
            {!q.options && selfMarked === null && (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => submitSelfMark(false)}>
                  I got it wrong
                </Button>
                <Button size="sm" onClick={() => submitSelfMark(true)}>
                  I got it right
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {revealed && (selectedOption || selfMarked !== null) && (
        <div className="flex justify-end">
          <Button onClick={next}>
            {index + 1 >= quiz.questions.length ? "See results" : "Next question"} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
