"use client";
import Link from "next/link";
import { Plus, ClipboardList } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { CreateAssignmentDialog } from "@/components/shared/CreateAssignmentDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore, useHydrated } from "@/lib/store";
import { daysUntilLabel, formatDate } from "@/lib/utils";

const STATUS_TONE: Record<string, "default" | "electric" | "gold" | "mint" | "danger"> = {
  "Not started": "default",
  Planning: "electric",
  Drafting: "electric",
  Reviewing: "gold",
  "Ready to submit": "mint",
  Submitted: "mint",
};

export default function AssignmentsPage() {
  const hydrated = useHydrated();
  const assignments = useStudyGenieStore(useShallow((s) => s.assignments));
  const courses = useStudyGenieStore(useShallow((s) => s.courses));

  if (!hydrated) return null;

  const sorted = [...assignments].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Assignment Studio"
        title="Assignments"
        description="Upload instructions, understand what's really being asked, and build toward submission without losing academic integrity."
        actions={
          <CreateAssignmentDialog
            trigger={
              <Button>
                <Plus className="h-4 w-4" /> New assignment
              </Button>
            }
          />
        }
      />

      {assignments.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No assignments tracked yet"
          description="Paste or scan an assignment's instructions and StudyGenie will extract requirements, build a checklist, and help you plan a draft."
          actionLabel="Create your first course"
          actionHref="/courses"
        />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {sorted.map((a) => {
            const course = courses.find((c) => c.id === a.courseId);
            const doneCount = a.checklist.filter((c) => c.done).length;
            return (
              <Link key={a.id} href={`/assignments/${a.id}`}>
                <Card className="h-full transition-colors hover:border-electric/40">
                  <CardContent className="flex h-full flex-col gap-2.5 p-5">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant={STATUS_TONE[a.status]}>{a.status}</Badge>
                      {a.dueDate && <Badge variant="gold">{daysUntilLabel(a.dueDate)}</Badge>}
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">{a.title}</h3>
                    <p className="text-xs text-muted-foreground">{course?.name}</p>
                    <div className="mt-auto text-xs text-muted-foreground">
                      {a.checklist.length > 0 ? `${doneCount}/${a.checklist.length} requirements checked` : "No checklist yet"} · Created {formatDate(a.createdAt)}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
