"use client";
import Link from "next/link";
import {
  BookOpen,
  Upload,
  ScanLine,
  ClipboardPaste,
  Mic,
  FolderInput,
  GraduationCap,
  ArrowRight,
  AlertTriangle,
  BrainCircuit,
  CalendarClock,
  Timer,
  Sparkles,
  Activity,
  Plus,
} from "lucide-react";
import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore, useHydrated } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CreateCourseDialog } from "@/components/shared/CreateCourseDialog";
import { NextBestAction } from "@/components/shared/NextBestAction";
import { courseMasteryScore, courseNextDeadline, courseRiskScore, riskLabel } from "@/lib/derived";
import { daysUntilLabel, formatDate } from "@/lib/utils";

const ZERO_ACTIONS = [
  { label: "Create your first course", icon: BookOpen, href: "#create-course" },
  { label: "Upload a syllabus", icon: Upload, href: "/capture?intent=syllabus" },
  { label: "Scan a textbook page", icon: ScanLine, href: "/capture?intent=scan" },
  { label: "Paste notes", icon: ClipboardPaste, href: "/capture?intent=paste" },
  { label: "Record a lecture", icon: Mic, href: "/capture?intent=record" },
  { label: "Import from Google Drive", icon: FolderInput, href: "/capture?intent=drive" },
  { label: "Try AI Professor", icon: GraduationCap, href: "/ai-professor" },
];

export default function HomePage() {
  const hydrated = useHydrated();
  const profile = useStudyGenieStore(useShallow((s) => s.profile));
  const courses = useStudyGenieStore(useShallow((s) => s.courses.filter((c) => !c.archived)));
  const assignments = useStudyGenieStore(useShallow((s) => s.assignments));
  const materials = useStudyGenieStore(useShallow((s) => s.materials));
  const masteryTopics = useStudyGenieStore(useShallow((s) => s.masteryTopics));
  const studyTasks = useStudyGenieStore(useShallow((s) => s.studyTasks));
  const flashcardSets = useStudyGenieStore(useShallow((s) => s.flashcardSets));

  const greetingWord = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  const courseStats = useMemo(
    () =>
      courses.map((c) => {
        const cAssignments = assignments.filter((a) => a.courseId === c.id);
        const cTopics = masteryTopics.filter((t) => t.courseId === c.id);
        const mastery = courseMasteryScore(cTopics);
        const risk = courseRiskScore(c, cAssignments, mastery);
        const deadline = courseNextDeadline(cAssignments, c);
        return {
          course: c,
          mastery,
          risk,
          deadline,
          weakTopics: cTopics.filter((t) => t.stage === "Not started" || t.stage === "Corrected" || (t.accuracyPct !== null && t.accuracyPct < 60)),
        };
      }),
    [courses, assignments, masteryTopics],
  );

  const todayTasks = studyTasks.filter((t) => t.date === new Date().toISOString().slice(0, 10) && !t.completed);
  const upcomingDeadlines = courseStats
    .filter((c) => c.deadline)
    .sort((a, b) => new Date(a.deadline!.date).getTime() - new Date(b.deadline!.date).getTime())
    .slice(0, 4);
  const highestRiskCourse = [...courseStats].sort((a, b) => b.risk - a.risk)[0];
  const dueFlashcards = flashcardSets.reduce((sum, s) => sum + s.cards.filter((c) => !c.dueAt || new Date(c.dueAt) <= new Date()).length, 0);
  const weakTopics = courseStats.flatMap((c) => c.weakTopics.map((t) => ({ ...t, courseName: c.course.name })));
  const recentActivity = materials.slice(0, 5);

  if (!hydrated) return null;

  if (courses.length === 0) {
    return (
      <div className="mx-auto max-w-3xl py-8 sm:py-16">
        <div className="glass animate-fade-up rounded-[var(--radius-xl)] p-8 text-center sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-electric to-violet shadow-[0_8px_32px_-8px_rgba(79,141,255,0.6)]">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">Welcome to StudyGenie</h1>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground sm:text-base">
            Start from zero by creating your first course, uploading a syllabus, scanning a page, pasting notes, or recording a lecture.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 text-left sm:grid-cols-2">
            {ZERO_ACTIONS.map((action) =>
              action.href === "#create-course" ? (
                <CreateCourseDialog
                  key={action.label}
                  trigger={
                    <button className="focus-ring group flex items-center gap-3 rounded-[var(--radius-md)] border border-border bg-surface p-4 text-left transition-colors hover:border-electric/50 hover:bg-surface-hover">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-electric-soft">
                        <action.icon className="h-5 w-5 text-electric" />
                      </span>
                      <span className="flex-1 text-sm font-medium text-foreground">{action.label}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </button>
                  }
                />
              ) : (
                <Link
                  key={action.label}
                  href={action.href}
                  className="focus-ring group flex items-center gap-3 rounded-[var(--radius-md)] border border-border bg-surface p-4 text-left transition-colors hover:border-electric/50 hover:bg-surface-hover"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-electric-soft">
                    <action.icon className="h-5 w-5 text-electric" />
                  </span>
                  <span className="flex-1 text-sm font-medium text-foreground">{action.label}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">
          {greetingWord}
          {profile.name ? `, ${profile.name.split(" ")[0]}` : ""}
        </div>
        <h1 className="mt-1.5 text-2xl font-semibold tracking-tight sm:text-3xl">Here&apos;s where things stand today.</h1>
      </div>

      <NextBestAction
        title={
          highestRiskCourse && highestRiskCourse.risk >= 30
            ? `Focus on ${highestRiskCourse.course.name}`
            : todayTasks[0]
              ? todayTasks[0].title
              : "Capture your next piece of material"
        }
        reason={
          highestRiskCourse && highestRiskCourse.risk >= 30
            ? `This course has the highest risk score (${highestRiskCourse.risk}/100) — a deadline or weak mastery needs attention.`
            : todayTasks[0]
              ? todayTasks[0].why
              : "You don't have anything queued for today yet — add a course material to generate a study plan."
        }
        actionLabel={highestRiskCourse ? "Open course" : "Go to Capture"}
        href={highestRiskCourse ? `/courses/${highestRiskCourse.course.id}` : "/capture"}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Today&apos;s Mission</CardTitle>
            <Badge variant="electric">{todayTasks.length} tasks</Badge>
          </CardHeader>
          <CardContent>
            {todayTasks.length === 0 ? (
              <p className="text-sm text-muted-foreground">No study tasks scheduled for today yet. Build a study plan from any course to fill this in.</p>
            ) : (
              <ul className="space-y-2.5">
                {todayTasks.map((t) => (
                  <li key={t.id} className="flex items-center justify-between rounded-[var(--radius-md)] border border-border bg-surface px-3.5 py-3">
                    <div>
                      <div className="text-sm font-medium text-foreground">{t.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {t.topic} · {t.estMinutes} min
                      </div>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/courses/${t.courseId}?tab=study-plan`}>Start</Link>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Capture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full justify-start">
              <Link href="/capture?intent=scan">
                <ScanLine className="h-4 w-4" /> Scan a page
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/capture?intent=paste">
                <ClipboardPaste className="h-4 w-4" /> Paste notes
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/capture?intent=record">
                <Mic className="h-4 w-4" /> Record lecture
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {upcomingDeadlines.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nothing due yet. Add assignment or exam dates in your course settings.</p>
            ) : (
              <ul className="space-y-2.5">
                {upcomingDeadlines.map(({ course, deadline }) => (
                  <li key={course.id} className="flex items-center justify-between text-sm">
                    <div>
                      <div className="font-medium text-foreground">{deadline!.label}</div>
                      <div className="text-xs text-muted-foreground">{course.name}</div>
                    </div>
                    <Badge variant="gold">{daysUntilLabel(deadline!.date)}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Course Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-3">
            {courseStats.slice(0, 4).map(({ course, risk }) => {
              const r = riskLabel(risk);
              return (
                <div key={course.id}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{course.name}</span>
                    <Badge variant={r.tone === "danger" ? "danger" : r.tone === "gold" ? "gold" : "mint"}>{r.label}</Badge>
                  </div>
                  <Progress
                    value={risk}
                    className="mt-1.5"
                    indicatorClassName={r.tone === "danger" ? "from-danger to-danger" : r.tone === "gold" ? "from-gold to-gold" : "from-mint to-mint"}
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Review Due Today</CardTitle>
            <BrainCircuit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-col items-start gap-3">
            <div className="text-3xl font-semibold text-foreground">{dueFlashcards}</div>
            <p className="text-sm text-muted-foreground">flashcards are due for spaced repetition review.</p>
            <Button asChild size="sm" variant="outline">
              <Link href="/practice">Review now</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weak Topics</CardTitle>
          </CardHeader>
          <CardContent>
            {weakTopics.length === 0 ? (
              <p className="text-sm text-muted-foreground">No weak topics detected yet — practice a few quizzes to build your mastery map.</p>
            ) : (
              <ul className="space-y-2">
                {weakTopics.slice(0, 5).map((t) => (
                  <li key={t.id} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">
                      {t.name} <span className="text-xs text-muted-foreground">— {t.courseName}</span>
                    </span>
                    <Badge variant="danger">{t.stage}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assignment Status</CardTitle>
          </CardHeader>
          <CardContent>
            {assignments.length === 0 ? (
              <p className="text-sm text-muted-foreground">No assignments tracked yet. Upload instructions in Assignment Studio to get a requirements checklist.</p>
            ) : (
              <ul className="space-y-2">
                {assignments.slice(0, 5).map((a) => (
                  <li key={a.id} className="flex items-center justify-between text-sm">
                    <Link href={`/assignments/${a.id}`} className="font-medium text-foreground hover:text-electric">
                      {a.title}
                    </Link>
                    <Badge>{a.status}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Exam Readiness</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {courseStats.length === 0 && <p className="text-sm text-muted-foreground">No courses yet.</p>}
            {courseStats.map(({ course, mastery }) => (
              <div key={course.id}>
                <div className="flex items-center justify-between text-sm">
                  <Link href={`/courses/${course.id}`} className="font-medium text-foreground hover:text-electric">
                    {course.name}
                  </Link>
                  <span className="text-xs text-muted-foreground">{mastery}% mastered</span>
                </div>
                <Progress value={mastery} className="mt-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-between bg-gradient-to-br from-violet-soft to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-violet" /> AI Coach
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground">
              {highestRiskCourse
                ? `${highestRiskCourse.course.name} needs attention — start with a 25-minute focus block on your weakest topic.`
                : "Add a course and upload your first material — I'll build a study plan around your deadlines."}
            </p>
            <Button asChild size="sm" variant="violet" className="mt-4">
              <Link href="/focus">
                <Timer className="h-4 w-4" /> Start focus session
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle>Recent Activity</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {recentActivity.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing captured yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {recentActivity.map((m) => (
                <li key={m.id} className="flex items-center justify-between py-2.5 text-sm">
                  <div>
                    <div className="font-medium text-foreground">{m.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {m.kind} · {formatDate(m.createdAt)}
                    </div>
                  </div>
                  <Badge>{m.processingStatus}</Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <CreateCourseDialog
          trigger={
            <Button variant="outline">
              <Plus className="h-4 w-4" /> Add another course
            </Button>
          }
        />
      </div>
    </div>
  );
}
