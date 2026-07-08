"use client";
import { useMemo, useState } from "react";
import {
  Library as LibraryIcon,
  FileText,
  ScanLine,
  NotebookPen,
  Mic,
  Video,
  AudioLines,
  Image as ImageIcon,
  ScrollText,
  ClipboardList,
  FileCheck2,
  Archive as ArchiveIcon,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore, useHydrated } from "@/lib/store";
import type { Material } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const CATEGORIES: { id: string; label: string; icon: typeof FileText; filter: (m: Material) => boolean }[] = [
  { id: "all", label: "All materials", icon: LibraryIcon, filter: () => true },
  { id: "pdfs", label: "PDFs", icon: FileText, filter: (m) => m.source === "PDF" },
  { id: "scans", label: "Scans", icon: ScanLine, filter: (m) => m.source === "Scan" },
  { id: "notes", label: "Notes", icon: NotebookPen, filter: (m) => ["Lecture notes", "Handwritten notes", "Study guide", "Other"].includes(m.kind) },
  { id: "lectures", label: "Lectures", icon: Mic, filter: (m) => m.source === "Lecture recording" },
  { id: "videos", label: "Videos", icon: Video, filter: (m) => m.source === "Video" },
  { id: "audio", label: "Audio", icon: AudioLines, filter: (m) => m.source === "Audio" },
  { id: "images", label: "Images", icon: ImageIcon, filter: (m) => m.source === "Image" },
  { id: "syllabi", label: "Syllabi", icon: ScrollText, filter: (m) => m.kind === "Syllabus" },
  { id: "assignments", label: "Assignments", icon: ClipboardList, filter: (m) => m.kind === "Assignment instructions" },
  { id: "rubrics", label: "Rubrics", icon: FileCheck2, filter: (m) => m.kind === "Rubric" },
  { id: "archived", label: "Archived", icon: ArchiveIcon, filter: (m) => m.archived },
];

export default function LibraryPage() {
  const hydrated = useHydrated();
  const materials = useStudyGenieStore(useShallow((s) => s.materials));
  const courses = useStudyGenieStore(useShallow((s) => s.courses));
  const flashcardSets = useStudyGenieStore(useShallow((s) => s.flashcardSets));
  const quizzes = useStudyGenieStore(useShallow((s) => s.quizzes));
  const assignments = useStudyGenieStore(useShallow((s) => s.assignments));
  const moveMaterialToCourse = useStudyGenieStore(useShallow((s) => s.moveMaterialToCourse));
  const archiveMaterial = useStudyGenieStore(useShallow((s) => s.archiveMaterial));
  const deleteMaterial = useStudyGenieStore(useShallow((s) => s.deleteMaterial));

  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<Material | null>(null);

  const activeCategory = CATEGORIES.find((c) => c.id === category)!;
  const visible = useMemo(() => {
    const base = category === "archived" ? materials : materials.filter((m) => !m.archived);
    return base.filter(activeCategory.filter).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [materials, activeCategory, category]);

  if (!hydrated) return null;

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Library" title="Your material library" description="Every scan, upload, and note lives here — organized, searchable, and ready to turn into study tools." />

      <div className="flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`focus-ring flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors ${
              category === c.id ? "border-electric bg-electric-soft text-electric" : "border-border bg-surface text-muted-foreground hover:text-foreground"
            }`}
          >
            <c.icon className="h-3.5 w-3.5" /> {c.label}
          </button>
        ))}
      </div>

      {materials.length === 0 ? (
        <EmptyState
          icon={LibraryIcon}
          title="Your library is empty"
          description="Capture your first material — a scan, upload, or pasted note — and it will show up here automatically."
          actionLabel="Go to Capture"
          actionHref="/capture"
        />
      ) : visible.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nothing in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((m) => {
            const course = courses.find((c) => c.id === m.courseId);
            return (
              <button key={m.id} onClick={() => setSelected(m)} className="text-left">
                <Card className="h-full transition-colors hover:border-electric/40">
                  <CardContent className="flex h-full flex-col gap-2 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="electric">{m.kind}</Badge>
                      <Badge variant={m.processingStatus === "processed" ? "mint" : "default"}>{m.processingStatus}</Badge>
                    </div>
                    <div className="text-sm font-semibold text-foreground">{m.title}</div>
                    {m.summary && <p className="line-clamp-2 text-xs text-muted-foreground">{m.summary}</p>}
                    <div className="mt-auto flex items-center justify-between pt-2 text-[11px] text-muted-foreground">
                      <span>{course ? course.name : "Library Inbox"}</span>
                      <span>{formatDate(m.createdAt)}</span>
                    </div>
                  </CardContent>
                </Card>
              </button>
            );
          })}
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.title}</DialogTitle>
                <DialogDescription>
                  {selected.kind} · {selected.source}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-muted-foreground">Course</div>
                    <div className="mt-0.5 font-medium text-foreground">{courses.find((c) => c.id === selected.courseId)?.name ?? "Library Inbox"}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Date added</div>
                    <div className="mt-0.5 font-medium text-foreground">{formatDate(selected.createdAt)}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Source confidence</div>
                    <div className="mt-0.5 font-medium text-foreground">{selected.sourceConfidence}%</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Processing status</div>
                    <div className="mt-0.5 font-medium text-foreground">{selected.processingStatus}</div>
                  </div>
                </div>
                {selected.summary && (
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">AI summary</div>
                    <p className="mt-1 text-foreground">{selected.summary}</p>
                  </div>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {flashcardSets.filter((f) => f.materialId === selected.id).map((f) => (
                    <Badge key={f.id} variant="violet">{f.cards.length} flashcards</Badge>
                  ))}
                  {quizzes.filter((q) => q.materialId === selected.id).map((q) => (
                    <Badge key={q.id} variant="gold">{q.questions.length}-question quiz</Badge>
                  ))}
                  {assignments.filter((a) => a.courseId === selected.courseId).length > 0 && selected.kind === "Assignment instructions" && (
                    <Badge>Linked assignment</Badge>
                  )}
                </div>

                {courses.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Move to course</div>
                    <Select value={selected.courseId ?? "inbox"} onValueChange={(v) => moveMaterialToCourse(selected.id, v)}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="danger" onClick={() => { deleteMaterial(selected.id); setSelected(null); }}>
                  Delete
                </Button>
                <Button variant="outline" onClick={() => { archiveMaterial(selected.id, !selected.archived); setSelected(null); }}>
                  {selected.archived ? "Restore" : "Archive"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
