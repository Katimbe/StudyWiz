"use client";
import { Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AiProfessorChat } from "@/components/ai-professor/AiProfessorChat";
import { OverviewTab } from "@/components/course/OverviewTab";
import { MaterialsTab } from "@/components/course/MaterialsTab";
import { SmartNotesTab } from "@/components/course/SmartNotesTab";
import { PracticeTab } from "@/components/course/PracticeTab";
import { AssignmentsTab } from "@/components/course/AssignmentsTab";
import { LecturesTab } from "@/components/course/LecturesTab";
import { StudyPlanTab } from "@/components/course/StudyPlanTab";
import { ProgressTab } from "@/components/course/ProgressTab";
import { ProjectsTab } from "@/components/course/ProjectsTab";
import { CourseSettingsTab } from "@/components/course/CourseSettingsTab";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore, useHydrated } from "@/lib/store";
import { courseMasteryScore, courseNextDeadline, courseRiskScore } from "@/lib/derived";
import { daysUntilLabel, formatDate } from "@/lib/utils";

function CourseDashboardContent() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hydrated = useHydrated();
  const course = useStudyGenieStore(useShallow((s) => s.courses.find((c) => c.id === params.id)));
  const assignments = useStudyGenieStore(useShallow((s) => s.assignments.filter((a) => a.courseId === params.id)));
  const masteryTopics = useStudyGenieStore(useShallow((s) => s.masteryTopics.filter((t) => t.courseId === params.id)));
  const touchCourse = useStudyGenieStore(useShallow((s) => s.touchCourse));

  if (!hydrated) return null;

  if (!course) {
    return (
      <div className="py-16 text-center text-sm text-muted-foreground">
        Course not found. <Button variant="link" onClick={() => router.push("/courses")}>Back to courses</Button>
      </div>
    );
  }

  const mastery = courseMasteryScore(masteryTopics);
  const risk = courseRiskScore(course, assignments, mastery);
  const deadline = courseNextDeadline(assignments, course);

  return (
    <div className="space-y-6">
      <button onClick={() => router.push("/courses")} className="focus-ring flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All courses
      </button>

      <PageHeader
        eyebrow={course.subject || "Course"}
        title={course.name}
        description={`${course.professor ? `${course.professor} · ` : ""}${course.school ? `${course.school} · ` : ""}${course.level}`}
        actions={
          <>
            <Badge variant={risk >= 60 ? "danger" : risk >= 30 ? "gold" : "mint"}>Risk {risk}/100</Badge>
            <Badge variant="electric">{mastery}% mastered</Badge>
            {deadline && <Badge variant="gold">{deadline.label} · {daysUntilLabel(deadline.date)}</Badge>}
            <Button onClick={() => touchCourse(course.id)}>Continue studying</Button>
          </>
        }
      />
      {course.lastStudiedAt && <p className="-mt-4 text-xs text-muted-foreground">Last studied {formatDate(course.lastStudiedAt)}</p>}

      <Tabs defaultValue={searchParams.get("tab") ?? "overview"}>
        <TabsList className="flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="smart-notes">Smart Notes</TabsTrigger>
          <TabsTrigger value="ai-professor">AI Professor</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="lectures">Lectures</TabsTrigger>
          <TabsTrigger value="study-plan">Study Plan</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab course={course} />
        </TabsContent>
        <TabsContent value="materials">
          <MaterialsTab course={course} />
        </TabsContent>
        <TabsContent value="smart-notes">
          <SmartNotesTab course={course} />
        </TabsContent>
        <TabsContent value="ai-professor">
          <AiProfessorChat initialCourseId={course.id} />
        </TabsContent>
        <TabsContent value="practice">
          <PracticeTab course={course} />
        </TabsContent>
        <TabsContent value="assignments">
          <AssignmentsTab course={course} />
        </TabsContent>
        <TabsContent value="lectures">
          <LecturesTab course={course} />
        </TabsContent>
        <TabsContent value="study-plan">
          <StudyPlanTab course={course} />
        </TabsContent>
        <TabsContent value="progress">
          <ProgressTab course={course} />
        </TabsContent>
        <TabsContent value="projects">
          <ProjectsTab course={course} />
        </TabsContent>
        <TabsContent value="settings">
          <CourseSettingsTab course={course} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function CourseDashboardPage() {
  return (
    <Suspense fallback={null}>
      <CourseDashboardContent />
    </Suspense>
  );
}
