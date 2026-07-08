"use client";
import { useState } from "react";
import { Archive as ArchiveIcon, RotateCcw, Trash2, Search, Copy, Download } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore, useHydrated } from "@/lib/store";
import { formatDate } from "@/lib/utils";

export default function ArchivePage() {
  const hydrated = useHydrated();
  const courses = useStudyGenieStore(useShallow((s) => s.courses.filter((c) => c.archived)));
  const materials = useStudyGenieStore(useShallow((s) => s.materials));
  const assignments = useStudyGenieStore(useShallow((s) => s.assignments));
  const archiveCourse = useStudyGenieStore(useShallow((s) => s.archiveCourse));
  const deleteCourse = useStudyGenieStore(useShallow((s) => s.deleteCourse));
  const addCourse = useStudyGenieStore(useShallow((s) => s.addCourse));
  const [query, setQuery] = useState("");

  if (!hydrated) return null;

  const filtered = courses.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  function duplicate(courseId: string) {
    const c = courses.find((x) => x.id === courseId);
    if (!c) return;
    addCourse({
      name: `${c.name} (copy)`,
      subject: c.subject,
      level: c.level,
      school: c.school,
      professor: c.professor,
      startDate: c.startDate,
      endDate: c.endDate,
      meetingDays: c.meetingDays,
      gradeGoal: c.gradeGoal,
      examDates: [],
      assignmentTypes: c.assignmentTypes,
      difficulty: c.difficulty,
      confidence: c.confidence,
      learningStyle: c.learningStyle,
    });
  }

  function exportCourse(courseId: string) {
    const c = courses.find((x) => x.id === courseId);
    if (!c) return;
    const data = {
      course: c,
      materials: materials.filter((m) => m.courseId === courseId),
      assignments: assignments.filter((a) => a.courseId === courseId),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${c.name.replace(/\s+/g, "-").toLowerCase()}-export.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Archive" title="Archive" description="Archived courses keep every material, note, flashcard, quiz, and study plan — restore anytime." />

      {courses.length > 0 && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search archive…" />
        </div>
      )}

      {courses.length === 0 ? (
        <EmptyState icon={ArchiveIcon} title="Archive is empty" description="Courses you archive from the Courses page will appear here, fully preserved and restorable." actionLabel="View courses" actionHref="/courses" />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((c) => {
            const cMaterials = materials.filter((m) => m.courseId === c.id);
            const cAssignments = assignments.filter((a) => a.courseId === c.id);
            return (
              <Card key={c.id}>
                <CardContent className="space-y-3 p-5">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{c.name}</h3>
                    <p className="text-xs text-muted-foreground">Archived · {formatDate(c.createdAt)}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge>{cMaterials.length} materials</Badge>
                    <Badge>{cAssignments.length} assignments</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Button size="sm" onClick={() => archiveCourse(c.id, false)}>
                      <RotateCcw className="h-3.5 w-3.5" /> Restore
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => duplicate(c.id)}>
                      <Copy className="h-3.5 w-3.5" /> Duplicate
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => exportCourse(c.id)}>
                      <Download className="h-3.5 w-3.5" /> Export
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => deleteCourse(c.id)}>
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
