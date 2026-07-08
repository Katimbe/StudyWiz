"use client";
import { useEffect, useRef, useState } from "react";
import { Timer, Play, Pause, Plus, Check, MessageCircleHeart } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore, useHydrated } from "@/lib/store";
import { uid } from "@/lib/utils";

const MODES = {
  "Quick Start": 10 * 60,
  Pomodoro: 25 * 60,
  "Deep Work": 50 * 60,
} as const;

type ModeName = keyof typeof MODES;

const ACCOUNTABILITY_MESSAGES = [
  "Small steps compound — you don't need to finish everything, just start.",
  "You've got this. One micro-step at a time.",
  "Distraction happens — log it and come right back.",
  "Future-you will thank present-you for these next few minutes.",
];

export default function FocusRoomPage() {
  const hydrated = useHydrated();
  const studyTasks = useStudyGenieStore(useShallow((s) => s.studyTasks.filter((t) => !t.completed)));
  const addFocusSession = useStudyGenieStore(useShallow((s) => s.addFocusSession));
  const updateFocusSession = useStudyGenieStore(useShallow((s) => s.updateFocusSession));
  const updateStudyTask = useStudyGenieStore(useShallow((s) => s.updateStudyTask));

  const [phase, setPhase] = useState<"setup" | "steps" | "running" | "reflect">("setup");
  const [taskId, setTaskId] = useState<string>("");
  const [customTask, setCustomTask] = useState("");
  const [microSteps, setMicroSteps] = useState<{ id: string; label: string; done: boolean }[]>([]);
  const [newStep, setNewStep] = useState("");
  const [mode, setMode] = useState<ModeName>("Pomodoro");
  const [secondsLeft, setSecondsLeft] = useState<number>(MODES.Pomodoro);
  const [running, setRunning] = useState(false);
  const [distractions, setDistractions] = useState<string[]>([]);
  const [distractionInput, setDistractionInput] = useState("");
  const [pauseReason, setPauseReason] = useState("");
  const [showPausePrompt, setShowPausePrompt] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [coachMsg, setCoachMsg] = useState(ACCOUNTABILITY_MESSAGES[0]);
  const [reflection, setReflection] = useState({ completedText: "", stillConfused: "", nextAction: "" });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const taskLabel = taskId ? studyTasks.find((t) => t.id === taskId)?.title ?? "" : customTask;

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            setRunning(false);
            setPhase("reflect");
            return 0;
          }
          return s - 1;
        });
      }, 1000);
      const msgInterval = setInterval(() => setCoachMsg(ACCOUNTABILITY_MESSAGES[Math.floor(Math.random() * ACCOUNTABILITY_MESSAGES.length)]), 45000);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        clearInterval(msgInterval);
      };
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  function addMicroStep() {
    if (!newStep.trim()) return;
    setMicroSteps((s) => [...s, { id: uid("step"), label: newStep.trim(), done: false }]);
    setNewStep("");
  }

  function startSession() {
    setSecondsLeft(MODES[mode]);
    const session = addFocusSession({
      taskLabel,
      mode,
      startedAt: new Date().toISOString(),
      durationSec: MODES[mode],
      microSteps,
      distractionLog: [],
      completed: false,
      reflection: null,
    });
    setSessionId(session.id);
    setPhase("running");
    setRunning(true);
  }

  function logDistraction() {
    if (!distractionInput.trim()) return;
    setDistractions((d) => [...d, distractionInput.trim()]);
    setDistractionInput("");
  }

  function pause() {
    setRunning(false);
    setShowPausePrompt(true);
  }

  function resume() {
    setShowPausePrompt(false);
    setRunning(true);
  }

  function toggleStep(id: string) {
    setMicroSteps((steps) => steps.map((s) => (s.id === id ? { ...s, done: !s.done } : s)));
  }

  function finishSession() {
    if (sessionId) {
      updateFocusSession(sessionId, { completed: true, distractionLog: distractions, reflection });
    }
    if (taskId) updateStudyTask(taskId, { completed: true, reflection: reflection.completedText });
    setPhase("setup");
    setTaskId("");
    setCustomTask("");
    setMicroSteps([]);
    setDistractions([]);
    setPauseReason("");
    setReflection({ completedText: "", stillConfused: "", nextAction: "" });
    setSessionId(null);
  }

  if (!hydrated) return null;

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Focus Room" title="Focus Room" description="Beat procrastination with a task, a timer, and an honest reflection at the end." />

      {phase === "setup" && (
        <Card className="mx-auto max-w-xl">
          <CardHeader>
            <CardTitle>Choose your task</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {studyTasks.length > 0 && (
              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">From your study plan</label>
                <Select value={taskId} onValueChange={(v) => { setTaskId(v); setCustomTask(""); }}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Pick a pending task" />
                  </SelectTrigger>
                  <SelectContent>
                    {studyTasks.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Or type a task</label>
              <Input className="mt-1.5" value={customTask} onChange={(e) => { setCustomTask(e.target.value); setTaskId(""); }} placeholder="e.g. Read chapter 4 and take notes" />
            </div>
            <Button className="w-full" disabled={!taskLabel.trim()} onClick={() => setPhase("steps")}>
              Continue
            </Button>
          </CardContent>
        </Card>
      )}

      {phase === "steps" && (
        <Card className="mx-auto max-w-xl">
          <CardHeader>
            <CardTitle>Break &ldquo;{taskLabel}&rdquo; into micro-steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input value={newStep} onChange={(e) => setNewStep(e.target.value)} placeholder="e.g. Read pages 40-45" onKeyDown={(e) => e.key === "Enter" && addMicroStep()} />
              <Button variant="outline" onClick={addMicroStep}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {microSteps.length > 0 && (
              <ul className="space-y-1.5">
                {microSteps.map((s) => (
                  <li key={s.id} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="h-3.5 w-3.5 text-mint" /> {s.label}
                  </li>
                ))}
              </ul>
            )}
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Mode</label>
              <div className="mt-1.5 grid grid-cols-3 gap-2">
                {(Object.keys(MODES) as ModeName[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`focus-ring rounded-[var(--radius-sm)] border px-3 py-2.5 text-center text-xs font-medium transition-colors ${
                      mode === m ? "border-electric bg-electric-soft text-electric" : "border-border bg-surface text-muted-foreground"
                    }`}
                  >
                    {m}
                    <div className="mt-0.5 text-[10px] opacity-70">{MODES[m] / 60} min</div>
                  </button>
                ))}
              </div>
            </div>
            <Button className="w-full" onClick={startSession}>
              <Timer className="h-4 w-4" /> Start focus session
            </Button>
          </CardContent>
        </Card>
      )}

      {phase === "running" && (
        <div className="mx-auto max-w-xl space-y-4">
          <Card>
            <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
              <Badge variant="electric">{mode}</Badge>
              <div className="text-lg font-medium text-foreground">{taskLabel}</div>
              <div className="text-6xl font-semibold tabular-nums text-foreground">
                {mm}:{ss}
              </div>
              <div className="flex gap-3">
                {running ? (
                  <Button variant="outline" onClick={pause}>
                    <Pause className="h-4 w-4" /> Pause
                  </Button>
                ) : showPausePrompt ? null : (
                  <Button onClick={() => setRunning(true)}>
                    <Play className="h-4 w-4" /> Resume
                  </Button>
                )}
                <Button variant="subtle" onClick={() => { setRunning(false); setPhase("reflect"); }}>
                  End session
                </Button>
              </div>
            </CardContent>
          </Card>

          {showPausePrompt && (
            <Card className="border-gold/30">
              <CardContent className="space-y-3 p-5">
                <div className="text-sm font-medium text-foreground">What pulled your focus?</div>
                <Input value={pauseReason} onChange={(e) => setPauseReason(e.target.value)} placeholder="e.g. Phone notification, hungry, distracted" />
                <Button
                  size="sm"
                  onClick={() => {
                    if (pauseReason.trim()) setDistractions((d) => [...d, pauseReason.trim()]);
                    setPauseReason("");
                    resume();
                  }}
                >
                  Log it &amp; resume
                </Button>
              </CardContent>
            </Card>
          )}

          {microSteps.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Micro-steps</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {microSteps.map((s) => (
                    <li key={s.id} className="flex items-center gap-2">
                      <input type="checkbox" checked={s.done} onChange={() => toggleStep(s.id)} className="h-4 w-4 accent-[var(--electric)]" />
                      <span className={`text-sm ${s.done ? "text-muted-foreground line-through" : "text-foreground"}`}>{s.label}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <Card className="bg-gradient-to-br from-violet-soft to-transparent">
            <CardContent className="flex items-center gap-3 p-4">
              <MessageCircleHeart className="h-5 w-5 shrink-0 text-violet" />
              <p className="text-sm text-foreground">{coachMsg}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Distraction log</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input value={distractionInput} onChange={(e) => setDistractionInput(e.target.value)} placeholder="Log a distraction without leaving the session" onKeyDown={(e) => e.key === "Enter" && logDistraction()} />
                <Button variant="outline" onClick={logDistraction}>
                  Log
                </Button>
              </div>
              {distractions.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {distractions.map((d, i) => (
                    <Badge key={i} variant="danger">
                      {d}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {phase === "reflect" && (
        <Card className="mx-auto max-w-xl">
          <CardHeader>
            <CardTitle>End-of-session reflection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">What did I complete?</label>
              <Textarea className="mt-1.5" value={reflection.completedText} onChange={(e) => setReflection((r) => ({ ...r, completedText: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">What do I still not understand?</label>
              <Textarea className="mt-1.5" value={reflection.stillConfused} onChange={(e) => setReflection((r) => ({ ...r, stillConfused: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Next recommended action</label>
              <Textarea className="mt-1.5" value={reflection.nextAction} onChange={(e) => setReflection((r) => ({ ...r, nextAction: e.target.value }))} placeholder="e.g. Ask AI Professor about this, or review flashcards tomorrow" />
            </div>
            <Button className="w-full" onClick={finishSession}>
              Save session &amp; update progress
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
