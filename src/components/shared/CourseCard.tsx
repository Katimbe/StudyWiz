"use client";
import Link from "next/link";
import { Archive, ArrowRight, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/types";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore } from "@/lib/store";
import { courseMasteryScore, courseNextDeadline, courseRiskScore, riskLabel } from "@/lib/derived";
import { formatDate, daysUntilLabel } from "@/lib/utils";

export function CourseCard({ course }: { course: Course }) {
  const assignments = useStudyGenieStore(useShallow((s) => s.assignments.filter((a) => a.courseId === course.id)));
  const materials = useStudyGenieStore(useShallow((s) => s.materials.filter((m) => m.courseId === course.id && !m.archived)));
  const masteryTopics = useStudyGenieStore(useShallow((s) => s.masteryTopics.filter((t) => t.courseId === course.id)));
  const archiveCourse = useStudyGenieStore(useShallow((s) => s.archiveCourse));

  const mastery = courseMasteryScore(masteryTopics);
  const risk = courseRiskScore(course, assignments, mastery);
  const riskInfo = riskLabel(risk);
  const deadline = courseNextDeadline(assignments, course);

  return (
    <Card className="flex flex-col">
      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-electric">{course.subject || "General"}</div>
            <h3 className="mt-1 text-base font-semibold text-foreground">{course.name}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {course.level} {course.professor && `· ${course.professor}`} {course.school && `· ${course.school}`}
            </p>
          </div>
          <Badge variant={riskInfo.tone === "danger" ? "danger" : riskInfo.tone === "gold" ? "gold" : "mint"}>{riskInfo.label}</Badge>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-[var(--radius-sm)] border border-border bg-surface py-2">
            <div className="text-sm font-semibold text-foreground">{materials.length}</div>
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Materials</div>
          </div>
          <div className="rounded-[var(--radius-sm)] border border-border bg-surface py-2">
            <div className="text-sm font-semibold text-foreground">{assignments.length}</div>
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Assignments</div>
          </div>
          <div className="rounded-[var(--radius-sm)] border border-border bg-surface py-2">
            <div className="text-sm font-semibold text-foreground">{course.gradeGoal || "—"}</div>
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Goal</div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Mastery</span>
            <span>{mastery}%</span>
          </div>
          <Progress value={mastery} className="mt-1" />
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{deadline ? `${deadline.label} · ${daysUntilLabel(deadline.date)}` : "No upcoming deadline"}</span>
          <span>Last studied {course.lastStudiedAt ? formatDate(course.lastStudiedAt) : "never"}</span>
        </div>

        <div className="mt-auto flex items-center gap-2 pt-1">
          <Button asChild className="flex-1">
            <Link href={`/courses/${course.id}`}>
              Continue <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            title={course.archived ? "Restore course" : "Archive course"}
            onClick={() => archiveCourse(course.id, !course.archived)}
          >
            {course.archived ? <RotateCcw className="h-4 w-4" /> : <Archive className="h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
