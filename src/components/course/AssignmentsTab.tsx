"use client";
import Link from "next/link";
import { ClipboardList, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import { CreateAssignmentDialog } from "@/components/shared/CreateAssignmentDialog";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore } from "@/lib/store";
import { daysUntilLabel } from "@/lib/utils";
import type { Course } from "@/lib/types";

export function AssignmentsTab({ course }: { course: Course }) {
  const assignments = useStudyGenieStore(useShallow((s) => s.assignments.filter((a) => a.courseId === course.id)));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{assignments.length} assignment{assignments.length === 1 ? "" : "s"}.</p>
        <CreateAssignmentDialog
          defaultCourseId={course.id}
          trigger={
            <Button size="sm">
              <Plus className="h-4 w-4" /> New assignment
            </Button>
          }
        />
      </div>
      {assignments.length === 0 ? (
        <EmptyState icon={ClipboardList} title="No assignments yet" description="Paste or scan an assignment's instructions to get a requirements checklist and rubric breakdown." />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {assignments.map((a) => (
            <Link key={a.id} href={`/assignments/${a.id}`}>
              <Card className="h-full transition-colors hover:border-electric/40">
                <CardContent className="space-y-2 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="electric">{a.status}</Badge>
                    {a.dueDate && <Badge variant="gold">{daysUntilLabel(a.dueDate)}</Badge>}
                  </div>
                  <div className="text-sm font-semibold text-foreground">{a.title}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
