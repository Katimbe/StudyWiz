"use client";
import { useState } from "react";
import Link from "next/link";
import { CalendarDays, Plus, Timer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/EmptyState";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore } from "@/lib/store";
import { daysUntilLabel, formatDate } from "@/lib/utils";
import type { Course } from "@/lib/types";

const VIEWS = ["Today", "Week", "Month", "Exam countdown", "Assignment countdown", "Recovery plan"] as const;

export function StudyPlanTab({ course }: { course: Course }) {
  const studyTasks = useStudyGenieStore(useShallow((s) => s.studyTasks.filter((t) => t.courseId === course.id)));
  const assignments = useStudyGenieStore(useShallow((s) => s.assignments.filter((a) => a.courseId === course.id)));
  const addStudyTask = useStudyGenieStore(useShallow((s) => s.addStudyTask));
  const updateStudyTask = useStudyGenieStore(useShallow((s) => s.updateStudyTask));

  const [view, setView] = useState<(typeof VIEWS)[number]>("Today");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", topic: "", date: new Date().toISOString().slice(0, 10), estMinutes: 30, why: "" });

  function addTask() {
    if (!form.title.trim()) return;
    addStudyTask({ courseId: course.id, title: form.title, topic: form.topic, date: form.date, estMinutes: form.estMinutes, why: form.why || "You scheduled this to stay on track.", completed: false, reflection: null });
    setForm({ title: "", topic: "", date: new Date().toISOString().slice(0, 10), estMinutes: 30, why: "" });
    setShowForm(false);
  }

  const today = new Date().toISOString().slice(0, 10);
  const inRange = (days: number) => {
    const now = new Date();
    const end = new Date();
    end.setDate(now.getDate() + days);
    return studyTasks.filter((t) => new Date(t.date) >= new Date(today) && new Date(t.date) <= end);
  };

  const overdue = studyTasks.filter((t) => !t.completed && t.date < today);

  const visibleTasks = view === "Today" ? studyTasks.filter((t) => t.date === today) : view === "Week" ? inRange(7) : view === "Month" ? inRange(30) : overdue;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {VIEWS.map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`focus-ring rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                view === v ? "border-electric bg-electric-soft text-electric" : "border-border bg-surface text-muted-foreground"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
        <Button size="sm" onClick={() => setShowForm((s) => !s)}>
          <Plus className="h-4 w-4" /> Add task
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardContent className="grid gap-3 p-4 sm:grid-cols-2">
            <Input placeholder="Task title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            <Input placeholder="Topic" value={form.topic} onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))} />
            <Input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
            <Input type="number" placeholder="Minutes" value={form.estMinutes} onChange={(e) => setForm((f) => ({ ...f, estMinutes: Number(e.target.value) }))} />
            <Textarea className="sm:col-span-2" placeholder="Why this matters" value={form.why} onChange={(e) => setForm((f) => ({ ...f, why: e.target.value }))} />
            <Button className="sm:col-span-2" onClick={addTask}>
              Save task
            </Button>
          </CardContent>
        </Card>
      )}

      {view === "Exam countdown" ? (
        course.examDates.length === 0 ? (
          <p className="text-sm text-muted-foreground">No exam dates set — add them in the course Settings tab.</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {course.examDates.map((e) => (
              <Card key={e.id}>
                <CardContent className="p-4">
                  <div className="text-sm font-semibold text-foreground">{e.label}</div>
                  <Badge variant="gold" className="mt-1.5">
                    {daysUntilLabel(e.date)}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      ) : view === "Assignment countdown" ? (
        assignments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No assignments tracked for this course yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {assignments.map((a) => (
              <Card key={a.id}>
                <CardContent className="p-4">
                  <div className="text-sm font-semibold text-foreground">{a.title}</div>
                  <Badge variant="gold" className="mt-1.5">
                    {a.dueDate ? daysUntilLabel(a.dueDate) : "No due date"}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      ) : visibleTasks.length === 0 ? (
        <EmptyState icon={CalendarDays} title="Nothing scheduled" description="Add a study task to build your plan for this range." actionLabel="Add task" onAction={() => setShowForm(true)} />
      ) : (
        <ul className="space-y-2.5">
          {visibleTasks.map((t) => (
            <li key={t.id}>
              <Card>
                <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className={`text-sm font-medium ${t.completed ? "text-muted-foreground line-through" : "text-foreground"}`}>{t.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.topic} · {t.estMinutes} min · {formatDate(t.date)}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{t.why}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!t.completed && (
                      <Button asChild size="sm" variant="outline">
                        <Link href="/focus">
                          <Timer className="h-3.5 w-3.5" /> Start
                        </Link>
                      </Button>
                    )}
                    <Button size="sm" variant={t.completed ? "outline" : "primary"} onClick={() => updateStudyTask(t.id, { completed: !t.completed })}>
                      {t.completed ? "Reopen" : "Mark complete"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
