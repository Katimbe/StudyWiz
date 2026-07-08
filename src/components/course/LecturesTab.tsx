"use client";
import { useState } from "react";
import { Mic, Plus, Layers, ListChecks, BookOpenCheck, Lightbulb, HelpCircle, Star, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/EmptyState";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore } from "@/lib/store";
import { extractSummary, generateFlashcards, generateQuiz } from "@/lib/ai-engine";
import { uid } from "@/lib/utils";
import type { Course, LectureHighlight } from "@/lib/types";

const HIGHLIGHT_TYPES: { id: LectureHighlight["type"]; label: string; icon: typeof Lightbulb }[] = [
  { id: "key-point", label: "Key point", icon: Lightbulb },
  { id: "definition", label: "Definition", icon: BookOpenCheck },
  { id: "example", label: "Example", icon: HelpCircle },
  { id: "emphasis", label: "Emphasis", icon: Star },
  { id: "possible-exam", label: "Possible exam Q", icon: AlertCircle },
  { id: "confusion", label: "I'm confused", icon: HelpCircle },
];

export function LecturesTab({ course }: { course: Course }) {
  const lectures = useStudyGenieStore(useShallow((s) => s.lectures.filter((l) => l.courseId === course.id)));
  const addLecture = useStudyGenieStore(useShallow((s) => s.addLecture));
  const updateLecture = useStudyGenieStore(useShallow((s) => s.updateLecture));
  const addFlashcardSet = useStudyGenieStore(useShallow((s) => s.addFlashcardSet));
  const addQuiz = useStudyGenieStore(useShallow((s) => s.addQuiz));

  const [recording, setRecording] = useState(false);
  const [showRecorder, setShowRecorder] = useState(false);
  const [title, setTitle] = useState("");
  const [transcript, setTranscript] = useState("");
  const [notes, setNotes] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [highlights, setHighlights] = useState<LectureHighlight[]>([]);

  function tick() {
    setSeconds((s) => s + 1);
  }

  function start() {
    setRecording(true);
    const id = setInterval(tick, 1000);
    (window as unknown as { __lectureTimer?: ReturnType<typeof setInterval> }).__lectureTimer = id;
  }
  function stop() {
    setRecording(false);
    const id = (window as unknown as { __lectureTimer?: ReturnType<typeof setInterval> }).__lectureTimer;
    if (id) clearInterval(id);
  }

  function addHighlight(type: LectureHighlight["type"]) {
    setHighlights((h) => [...h, { id: uid("hl"), timestampSec: seconds, type, text: transcript.slice(-80) || notes.slice(-80) || "(marked)" }]);
  }

  function saveLecture() {
    const combined = `${transcript}\n${notes}`;
    const lecture = addLecture({
      courseId: course.id,
      title: title.trim() || "Untitled lecture",
      transcript,
      manualNotes: notes,
      highlights,
      durationSec: seconds,
      flashcardSetId: null,
      quizId: null,
    });
    if (combined.trim()) {
      const set = addFlashcardSet({ courseId: course.id, materialId: null, title: `${lecture.title} — flashcards`, cards: generateFlashcards(combined, 8) });
      const quiz = addQuiz({ courseId: course.id, materialId: null, title: `${lecture.title} — quiz`, questions: generateQuiz(combined, "Lecture", 6) });
      updateLecture(lecture.id, { flashcardSetId: set.id, quizId: quiz.id });
    }
    setShowRecorder(false);
    setTitle("");
    setTranscript("");
    setNotes("");
    setSeconds(0);
    setHighlights([]);
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  if (showRecorder) {
    return (
      <div className="space-y-4">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Lecture title" />
        <Card>
          <CardContent className="flex items-center justify-center gap-4 p-6">
            <div className="text-3xl font-semibold tabular-nums text-foreground">
              {mm}:{ss}
            </div>
            <Button variant={recording ? "danger" : "primary"} onClick={recording ? stop : start}>
              <Mic className="h-4 w-4" /> {recording ? "Stop" : "Start recording"}
            </Button>
          </CardContent>
        </Card>
        <div className="flex flex-wrap gap-2">
          {HIGHLIGHT_TYPES.map((h) => (
            <button key={h.id} onClick={() => addHighlight(h.id)} className="focus-ring flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground">
              <h.icon className="h-3.5 w-3.5" /> {h.label}
            </button>
          ))}
        </div>
        {highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {highlights.map((h) => (
              <Badge key={h.id} variant="violet">
                {Math.floor(h.timestampSec / 60)}:{String(h.timestampSec % 60).padStart(2, "0")} · {h.type}
              </Badge>
            ))}
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Live transcript</label>
            <Textarea className="mt-1.5 min-h-40" value={transcript} onChange={(e) => setTranscript(e.target.value)} placeholder="Once speech-to-text is connected, this fills automatically. Type for now." />
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Manual notes</label>
            <Textarea className="mt-1.5 min-h-40" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add your own notes alongside the transcript." />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={saveLecture}>Save lecture &amp; generate study tools</Button>
          <Button variant="outline" onClick={() => setShowRecorder(false)}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{lectures.length} lecture{lectures.length === 1 ? "" : "s"} recorded.</p>
        <Button size="sm" onClick={() => setShowRecorder(true)}>
          <Plus className="h-4 w-4" /> Record lecture
        </Button>
      </div>
      {lectures.length === 0 ? (
        <EmptyState icon={Mic} title="No lectures recorded yet" description="Record a lecture to get a transcript, AI-enhanced notes, and auto-generated flashcards and quizzes." actionLabel="Record lecture" onAction={() => setShowRecorder(true)} />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {lectures.map((l) => (
            <Card key={l.id}>
              <CardContent className="space-y-2 p-4">
                <div className="text-sm font-semibold text-foreground">{l.title}</div>
                <p className="line-clamp-2 text-xs text-muted-foreground">{extractSummary(l.transcript + " " + l.manualNotes)}</p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge>{l.highlights.length} highlights</Badge>
                  {l.flashcardSetId && (
                    <Badge variant="violet">
                      <Layers className="h-3 w-3" /> Flashcards
                    </Badge>
                  )}
                  {l.quizId && (
                    <Badge variant="gold">
                      <ListChecks className="h-3 w-3" /> Quiz
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
