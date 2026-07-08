"use client";
import { Plus, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { CourseCard } from "@/components/shared/CourseCard";
import { CreateCourseDialog } from "@/components/shared/CreateCourseDialog";
import { Button } from "@/components/ui/button";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore, useHydrated } from "@/lib/store";

export default function CoursesPage() {
  const hydrated = useHydrated();
  const courses = useStudyGenieStore(useShallow((s) => s.courses.filter((c) => !c.archived)));

  if (!hydrated) return null;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Courses"
        title="Your courses"
        description="Every course is its own workspace — materials, notes, practice, assignments, and a study plan built around it."
        actions={
          <CreateCourseDialog
            trigger={
              <Button>
                <Plus className="h-4 w-4" /> New course
              </Button>
            }
          />
        }
      />

      {courses.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No courses yet"
          description="Create your first course to start building your workspace — materials, practice, and a study plan will all live here."
          secondaryLabel="Or capture material first"
          secondaryHref="/capture"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      )}
    </div>
  );
}
