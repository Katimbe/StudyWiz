"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Send, Mic, BookmarkPlus, Layers, ListChecks, CalendarPlus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore } from "@/lib/store";
import { AI_PROFESSOR_MODES, type AiProfessorModeId } from "@/lib/ai-professor-modes";
import { composeAiProfessorReply } from "@/lib/ai-professor-engine";
import { generateFlashcards, generateQuiz } from "@/lib/ai-engine";
import { uid } from "@/lib/utils";

const SUGGESTED = [
  "What's the main idea of this material?",
  "Quiz me on the key concepts.",
  "Explain this like I'm new to the subject.",
  "What might be on the exam from this?",
];

export function AiProfessorChat({ initialCourseId, initialMaterialId }: { initialCourseId?: string; initialMaterialId?: string }) {
  const courses = useStudyGenieStore(useShallow((s) => s.courses.filter((c) => !c.archived)));
  const materials = useStudyGenieStore(useShallow((s) => s.materials.filter((m) => !m.archived)));
  const aiChats = useStudyGenieStore(useShallow((s) => s.aiChats));
  const addAiChat = useStudyGenieStore(useShallow((s) => s.addAiChat));
  const updateAiChat = useStudyGenieStore(useShallow((s) => s.updateAiChat));
  const addFlashcardSet = useStudyGenieStore(useShallow((s) => s.addFlashcardSet));
  const addQuiz = useStudyGenieStore(useShallow((s) => s.addQuiz));
  const addStudyTask = useStudyGenieStore(useShallow((s) => s.addStudyTask));
  const addMaterial = useStudyGenieStore(useShallow((s) => s.addMaterial));

  const [courseId, setCourseId] = useState<string | undefined>(initialCourseId);
  const [materialId, setMaterialId] = useState<string | undefined>(initialMaterialId);
  const [mode, setMode] = useState<AiProfessorModeId>("explain-simply");
  const [goal, setGoal] = useState("");
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const courseMaterials = materials.filter((m) => !courseId || m.courseId === courseId);
  const selectedMaterial = materials.find((m) => m.id === materialId) ?? null;
  const session = aiChats.find((c) => c.courseId === (courseId ?? null) && c.materialId === (materialId ?? null) && c.mode === mode) ?? null;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [session?.messages.length]);

  function send(text: string) {
    if (!text.trim()) return;
    const sessionId = session?.id ?? addAiChat({ courseId: courseId ?? null, materialId: materialId ?? null, mode, goal, messages: [] }).id;
    const userMsg = { id: uid("msg"), role: "user" as const, content: text.trim(), mode, groundedInMaterialId: materialId ?? null, createdAt: new Date().toISOString() };
    const reply = composeAiProfessorReply({
      mode,
      question: text.trim(),
      materialText: selectedMaterial?.rawText ?? null,
      materialTitle: selectedMaterial?.title ?? null,
    });
    const assistantMsg = { id: uid("msg"), role: "assistant" as const, content: reply, mode, groundedInMaterialId: materialId ?? null, createdAt: new Date().toISOString() };
    const current = aiChats.find((c) => c.id === sessionId);
    updateAiChat(sessionId, { messages: [...(current?.messages ?? []), userMsg, assistantMsg] });
    setInput("");
  }

  function saveToNotes(content: string) {
    addMaterial({
      courseId: courseId ?? null,
      title: `AI Professor note — ${new Date().toLocaleDateString()}`,
      kind: "Other",
      source: "Blank note",
      rawText: content,
      summary: content.slice(0, 160),
      keyPoints: [],
      definitions: [],
      dates: [],
      processingStatus: "processed",
      sourceConfidence: 100,
      flashcardSetId: null,
      quizId: null,
    });
  }

  function turnIntoFlashcards(content: string) {
    if (!courseId) return;
    addFlashcardSet({ courseId, materialId: materialId ?? null, title: "From AI Professor answer", cards: generateFlashcards(content, 5) });
  }

  function turnIntoQuiz(content: string) {
    if (!courseId) return;
    addQuiz({ courseId, materialId: materialId ?? null, title: "From AI Professor answer", questions: generateQuiz(content, "AI Professor", 5) });
  }

  function addToStudyPlan(content: string) {
    if (!courseId) return;
    addStudyTask({
      courseId,
      title: content.slice(0, 60),
      topic: "AI Professor follow-up",
      date: new Date().toISOString().slice(0, 10),
      estMinutes: 20,
      why: "Generated from an AI Professor answer you wanted to revisit.",
      completed: false,
      reflection: null,
    });
  }

  const activeMode = useMemo(() => AI_PROFESSOR_MODES.find((m) => m.id === mode)!, [mode]);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Course</label>
          <Select value={courseId ?? "none"} onValueChange={(v) => { setCourseId(v === "none" ? undefined : v); setMaterialId(undefined); }}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="All courses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No course selected</SelectItem>
              {courses.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Source material</label>
          <Select value={materialId ?? "none"} onValueChange={(v) => setMaterialId(v === "none" ? undefined : v)}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="No material selected" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No material selected</SelectItem>
              {courseMaterials.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!selectedMaterial && (
            <p className="mt-1.5 flex items-start gap-1.5 text-xs text-muted-foreground">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" /> Without a source, answers won&apos;t be grounded in your own material.
            </p>
          )}
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Session goal</label>
          <Textarea value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="e.g. Understand chapter 4 before Friday's quiz" className="mt-1.5 min-h-16" />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Mode</label>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {AI_PROFESSOR_MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`focus-ring rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  mode === m.id ? "border-electric bg-electric-soft text-electric" : "border-border bg-surface text-muted-foreground hover:text-foreground"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{activeMode.hint}</p>
        </div>
      </div>

      <div className="glass flex min-h-[520px] flex-col rounded-[var(--radius-lg)]">
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
          {(!session || session.messages.length === 0) && (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <p className="max-w-sm text-sm text-muted-foreground">
                Ask about {selectedMaterial ? `"${selectedMaterial.title}"` : "your studies"} in {activeMode.label} mode.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {session?.messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-[var(--radius-md)] px-4 py-3 text-sm ${m.role === "user" ? "bg-electric text-white" : "border border-border bg-surface text-foreground"}`}>
                <p className="whitespace-pre-line">{m.content}</p>
                {m.role === "assistant" && (
                  <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border/60 pt-2.5">
                    <button onClick={() => saveToNotes(m.content)} className="flex items-center gap-1 rounded-full bg-surface-hover px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground">
                      <BookmarkPlus className="h-3 w-3" /> Save to notes
                    </button>
                    <button onClick={() => turnIntoFlashcards(m.content)} disabled={!courseId} className="flex items-center gap-1 rounded-full bg-surface-hover px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground disabled:opacity-40">
                      <Layers className="h-3 w-3" /> Flashcards
                    </button>
                    <button onClick={() => turnIntoQuiz(m.content)} disabled={!courseId} className="flex items-center gap-1 rounded-full bg-surface-hover px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground disabled:opacity-40">
                      <ListChecks className="h-3 w-3" /> Quiz
                    </button>
                    <button onClick={() => addToStudyPlan(m.content)} disabled={!courseId} className="flex items-center gap-1 rounded-full bg-surface-hover px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground disabled:opacity-40">
                      <CalendarPlus className="h-3 w-3" /> Study plan
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t border-border p-3">
          <Button variant="ghost" size="icon" title="Voice input (voice capture coming with speech-to-text integration)">
            <Mic className="h-4 w-4" />
          </Button>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder={`Ask in ${activeMode.label} mode…`}
            className="min-h-11 flex-1 resize-none"
          />
          <Button size="icon" onClick={() => send(input)}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {selectedMaterial && (
        <div className="lg:col-start-2">
          <Badge variant="electric">Source: {selectedMaterial.title}</Badge>
        </div>
      )}
    </div>
  );
}
