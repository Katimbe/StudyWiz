"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { NextBestAction } from "@/components/shared/NextBestAction";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore } from "@/lib/store";
import { courseMasteryScore, courseNextDeadline, courseRiskScore } from "@/lib/derived";
import { formatDate, daysUntilLabel } from "@/lib/utils";
import type { Course } from "@/lib/types";

export function OverviewTab({ course }: { course: Course }) {
  const materials = useStudyGenieStore(useShallow((s) => s.materials.filter((m) => m.courseId === course.id && !m.archived)));
  const assignments = useStudyGenieStore(useShallow((s) => s.assignments.filter((a) => a.courseId === course.id)));
  const masteryTopics = useStudyGenieStore(useShallow((s) => s.masteryTopics.filter((t) => t.courseId === course.id)));
  const flashcardSets = useStudyGenieStore(useShallow((s) => s.flashcardSets.filter((f) => f.courseId === course.id)));
  const quizzes = useStudyGenieStore(useShallow((s) => s.quizzes.filter((q) => q.courseId === course.id)));
  const studyTasks = useStudyGenieStore(useShallow((s) => s.studyTasks.filter((t) => t.courseId === course.id)));

  const mastery = courseMasteryScore(masteryTopics);
  const risk = courseRiskScore(course, assignments, mastery);
  const deadline = courseNextDeadline(assignments, course);
  const weakest = [...masteryTopics].sort((a, b) => (a.accuracyPct ?? 100) - (b.accuracyPct ?? 100))[0];
  const dueCards = flashcardSets.reduce((sum, f) => sum + f.cards.filter((c) => !c.dueAt || new Date(c.dueAt) <= new Date()).length, 0);
  const recentUpload = materials[0];
  const completedTasks = studyTasks.filter((t) => t.completed).length;
  const consistency = studyTasks.length ? Math.round((completedTasks / studyTasks.length) * 100) : 0;

  return (
    <div className="space-y-4">
      <NextBestAction
        title={weakest ? `Practice "${weakest.name}"` : materials.length === 0 ? "Add your first material" : "Generate a practice set"}
        reason={weakest ? "This is your weakest tracked topic in this course right now." : materials.length === 0 ? "This course has no materials yet — capture a syllabus or notes to get started." : "Turn a material into flashcards or a quiz to start building mastery data."}
        actionLabel={weakest ? "Go to Practice" : "Go to Capture"}
        href={weakest ? `/practice` : `/capture?course=${course.id}`}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <div className="text-xs text-muted-foreground">Upcoming deadline</div>
            <div className="mt-1 text-base font-semibold text-foreground">{deadline ? deadline.label : "None set"}</div>
            {deadline && <div className="text-xs text-muted-foreground">{daysUntilLabel(deadline.date)}</div>}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-xs text-muted-foreground">Weakest topic</div>
            <div className="mt-1 text-base font-semibold text-foreground">{weakest?.name ?? "None tracked yet"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-xs text-muted-foreground">Review due</div>
            <div className="mt-1 text-base font-semibold text-foreground">{dueCards} cards</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-xs text-muted-foreground">Recent upload</div>
            <div className="mt-1 truncate text-base font-semibold text-foreground">{recentUpload?.title ?? "None yet"}</div>
            {recentUpload && <div className="text-xs text-muted-foreground">{formatDate(recentUpload.createdAt)}</div>}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-xs text-muted-foreground">Recommended practice</div>
            <div className="mt-1 text-base font-semibold text-foreground">{quizzes.length > 0 ? quizzes[0].title : "None generated yet"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-xs text-muted-foreground">Assignment readiness</div>
            <div className="mt-1 text-base font-semibold text-foreground">
              {assignments.length === 0 ? "No assignments" : `${assignments.filter((a) => a.status === "Ready to submit" || a.status === "Submitted").length}/${assignments.length} ready`}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Exam readiness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Mastery</span>
              <span className="font-medium text-foreground">{mastery}%</span>
            </div>
            <Progress value={mastery} className="mt-1.5" />
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Risk</span>
              <Badge variant={risk >= 60 ? "danger" : risk >= 30 ? "gold" : "mint"}>{risk}/100</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Study consistency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tasks completed</span>
              <span className="font-medium text-foreground">{completedTasks}/{studyTasks.length}</span>
            </div>
            <Progress value={consistency} className="mt-1.5" />
            <Link href={`/courses/${course.id}?tab=study-plan`} className="mt-3 inline-block text-xs text-electric hover:underline">
              View study plan →
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
