"use client";
import { useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore, useHydrated } from "@/lib/store";
import { courseMasteryScore, courseRiskScore, courseNextDeadline } from "@/lib/derived";
import type { MasteryStage } from "@/lib/types";

const STAGES: MasteryStage[] = ["Not started", "Seen", "Reviewed", "Practiced", "Corrected", "Applied", "Mastered", "Due for review"];

export default function ProgressPage() {
  const hydrated = useHydrated();
  const courses = useStudyGenieStore(useShallow((s) => s.courses.filter((c) => !c.archived)));
  const assignments = useStudyGenieStore(useShallow((s) => s.assignments));
  const masteryTopics = useStudyGenieStore(useShallow((s) => s.masteryTopics));
  const focusSessions = useStudyGenieStore(useShallow((s) => s.focusSessions));
  const studyTasks = useStudyGenieStore(useShallow((s) => s.studyTasks));
  const materials = useStudyGenieStore(useShallow((s) => s.materials));

  const courseStats = useMemo(
    () =>
      courses.map((c) => {
        const topics = masteryTopics.filter((t) => t.courseId === c.id);
        const mastery = courseMasteryScore(topics);
        const risk = courseRiskScore(c, assignments.filter((a) => a.courseId === c.id), mastery);
        return { course: c, mastery, risk, topics };
      }),
    [courses, masteryTopics, assignments],
  );

  const overallMastery = courseStats.length ? Math.round(courseStats.reduce((s, c) => s + c.mastery, 0) / courseStats.length) : 0;
  const weakTopics = masteryTopics.filter((t) => t.stage === "Corrected" || (t.accuracyPct !== null && t.accuracyPct < 60));
  const upcomingRisk = [...courseStats].sort((a, b) => b.risk - a.risk).filter((c) => c.risk >= 30);

  const last14Days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const key = d.toISOString().slice(0, 10);
    const sessions = focusSessions.filter((f) => f.startedAt.slice(0, 10) === key).length;
    const tasksDone = studyTasks.filter((t) => t.date === key && t.completed).length;
    return { date: key.slice(5), activity: sessions + tasksDone };
  });

  const consistencyDays = last14Days.filter((d) => d.activity > 0).length;

  if (!hydrated) return null;

  if (courses.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader eyebrow="Progress" title="Progress" description="A full picture of your mastery, consistency, and readiness across every course." />
        <EmptyState icon={TrendingUp} title="Nothing to track yet" description="Create a course and start practicing — your mastery map and readiness scores build automatically." actionLabel="Create a course" actionHref="/courses" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Progress" title="Progress" description="A full picture of your mastery, consistency, and readiness across every course." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="text-xs text-muted-foreground">Overall mastery</div>
            <div className="mt-1 text-2xl font-semibold text-foreground">{overallMastery}%</div>
            <Progress value={overallMastery} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-xs text-muted-foreground">Study consistency</div>
            <div className="mt-1 text-2xl font-semibold text-foreground">{consistencyDays}/14</div>
            <div className="text-xs text-muted-foreground">active days</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-xs text-muted-foreground">Materials processed</div>
            <div className="mt-1 text-2xl font-semibold text-foreground">{materials.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-xs text-muted-foreground">Weak topics</div>
            <div className="mt-1 text-2xl font-semibold text-foreground">{weakTopics.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course comparison</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={courseStats.map((c) => ({ name: c.course.name.slice(0, 14), mastery: c.mastery, risk: c.risk }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="mastery" fill="var(--electric)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="risk" fill="var(--danger)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Mastery map</CardTitle>
          </CardHeader>
          <CardContent>
            {masteryTopics.length === 0 ? (
              <p className="text-sm text-muted-foreground">Practice a few quizzes to populate your mastery map.</p>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {STAGES.map((stage) => {
                  const count = masteryTopics.filter((t) => t.stage === stage).length;
                  return (
                    <div key={stage} className="rounded-[var(--radius-sm)] border border-border bg-surface p-3 text-center">
                      <div className="text-lg font-semibold text-foreground">{count}</div>
                      <div className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">{stage}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming risk</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingRisk.length === 0 ? (
              <p className="text-sm text-muted-foreground">No courses are currently at risk. Nice work staying ahead.</p>
            ) : (
              <ul className="space-y-3">
                {upcomingRisk.map(({ course, risk }) => {
                  const deadline = courseNextDeadline(assignments.filter((a) => a.courseId === course.id), course);
                  return (
                    <li key={course.id}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">{course.name}</span>
                        <Badge variant="danger">{risk}/100</Badge>
                      </div>
                      {deadline && <p className="text-xs text-muted-foreground">Next: {deadline.label}</p>}
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-foreground">
          {overallMastery < 50 && <p>• Your overall mastery is below 50% — prioritize practice over new material for the next few sessions.</p>}
          {weakTopics.length > 0 && <p>• Run a weak-topic drill in Practice Studio on: {weakTopics.slice(0, 3).map((t) => t.name).join(", ")}.</p>}
          {consistencyDays < 7 && <p>• You&apos;ve studied {consistencyDays} of the last 14 days — a short daily Focus Room session builds consistency fastest.</p>}
          {upcomingRisk.length > 0 && <p>• {upcomingRisk[0].course.name} has the highest risk score — open its Study Plan tab to catch up.</p>}
          {overallMastery >= 50 && weakTopics.length === 0 && consistencyDays >= 7 && upcomingRisk.length === 0 && <p>You&apos;re on track across every course — keep the current rhythm going.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
