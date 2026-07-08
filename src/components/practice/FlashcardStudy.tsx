"use client";
import { useState } from "react";
import { RotateCw, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { FlashcardSet } from "@/lib/types";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore } from "@/lib/store";
import { nextMasteryStage } from "@/lib/ai-engine";

function addDays(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

export function FlashcardStudy({ set, onDone }: { set: FlashcardSet; onDone?: () => void }) {
  const updateFlashcardSet = useStudyGenieStore(useShallow((s) => s.updateFlashcardSet));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState<{ got: number; missed: number }>({ got: 0, missed: 0 });

  const card = set.cards[index];
  const finished = index >= set.cards.length;

  function grade(correct: boolean) {
    const stage = nextMasteryStage(card.mastery, correct);
    const interval = { "Not started": 1, Seen: 1, Reviewed: 2, Practiced: 4, Corrected: 1, Applied: 7, Mastered: 14, "Due for review": 3 }[stage] ?? 1;
    const updatedCards = set.cards.map((c) => (c.id === card.id ? { ...c, mastery: stage, dueAt: addDays(interval) } : c));
    updateFlashcardSet(set.id, { cards: updatedCards });
    setResults((r) => (correct ? { ...r, got: r.got + 1 } : { ...r, missed: r.missed + 1 }));
    setFlipped(false);
    setIndex((i) => i + 1);
  }

  if (set.cards.length === 0) {
    return <p className="text-sm text-muted-foreground">This set has no cards yet.</p>;
  }

  if (finished) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <div className="text-3xl font-semibold text-foreground">
          {results.got}/{set.cards.length}
        </div>
        <p className="text-sm text-muted-foreground">Cards reviewed. Missed cards were rescheduled sooner for spaced repetition.</p>
        <Button onClick={onDone}>Done</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <Progress value={(index / set.cards.length) * 100} />
      <button
        onClick={() => setFlipped((f) => !f)}
        className="focus-ring flex min-h-64 w-full flex-col items-center justify-center gap-4 rounded-[var(--radius-lg)] border border-border bg-surface p-8 text-center"
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{flipped ? "Answer" : "Question"}</span>
        <span className="text-lg font-medium text-foreground">{flipped ? card.back : card.front}</span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <RotateCw className="h-3 w-3" /> Tap to flip
        </span>
      </button>
      {flipped && (
        <div className="flex justify-center gap-3">
          <Button variant="danger" onClick={() => grade(false)}>
            <X className="h-4 w-4" /> Still learning
          </Button>
          <Button variant="primary" onClick={() => grade(true)}>
            <Check className="h-4 w-4" /> Got it
          </Button>
        </div>
      )}
    </div>
  );
}
