"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore } from "@/lib/store";
import { extractAssignmentInfo, suggestOutline } from "@/lib/assignment-engine";

const SUBMISSION_TYPES = ["Written paper", "Presentation", "Code project", "Lab report", "Online quiz", "Group project", "Other"];

export function CreateAssignmentDialog({ trigger, defaultCourseId }: { trigger: React.ReactNode; defaultCourseId?: string }) {
  const router = useRouter();
  const courses = useStudyGenieStore(useShallow((s) => s.courses.filter((c) => !c.archived)));
  const addAssignment = useStudyGenieStore(useShallow((s) => s.addAssignment));
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState(defaultCourseId ?? "");
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [rubricText, setRubricText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [wordCount, setWordCount] = useState("");
  const [submissionType, setSubmissionType] = useState(SUBMISSION_TYPES[0]);
  const [requiredSources, setRequiredSources] = useState("");

  function handleCreate() {
    if (!courseId || !title.trim()) return;
    const extracted = extractAssignmentInfo(instructions, rubricText || null);
    const checklist = [...extracted.mustSubmit, ...extracted.requirements].map((label, i) => ({ id: `chk_${i}`, label, done: false }));
    const assignment = addAssignment({
      courseId,
      title: title.trim(),
      instructions,
      rubricText: rubricText || null,
      dueDate: dueDate || null,
      wordCount: wordCount ? Number(wordCount) : null,
      submissionType,
      requiredSources: requiredSources ? Number(requiredSources) : null,
      extracted,
      checklist,
      outline: suggestOutline(extracted.asks),
      researchNotes: "",
      draftText: "",
      aiFeedback: [],
      status: "Not started",
    });
    setOpen(false);
    router.push(`/assignments/${assignment.id}`);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>New assignment</DialogTitle>
          <DialogDescription>Paste the instructions and StudyGenie will extract what&apos;s really being asked.</DialogDescription>
        </DialogHeader>
        <div className="grid max-h-[60vh] gap-4 overflow-y-auto pr-1">
          <div>
            <Label>Course *</Label>
            <Select value={courseId} onValueChange={setCourseId}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Choose course" />
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
          <div>
            <Label>Assignment title *</Label>
            <Input className="mt-1.5" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Essay 2: Industrial Revolution" />
          </div>
          <div>
            <Label>Instructions (pasted or scanned)</Label>
            <Textarea className="mt-1.5 min-h-32" value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Paste the assignment prompt…" />
          </div>
          <div>
            <Label>Rubric text (optional)</Label>
            <Textarea className="mt-1.5 min-h-20" value={rubricText} onChange={(e) => setRubricText(e.target.value)} placeholder="Paste rubric categories, one per line…" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Due date</Label>
              <Input type="date" className="mt-1.5" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
            <div>
              <Label>Submission type</Label>
              <Select value={submissionType} onValueChange={setSubmissionType}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUBMISSION_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Word count target</Label>
              <Input type="number" className="mt-1.5" value={wordCount} onChange={(e) => setWordCount(e.target.value)} placeholder="e.g. 1500" />
            </div>
            <div>
              <Label>Required sources</Label>
              <Input type="number" className="mt-1.5" value={requiredSources} onChange={(e) => setRequiredSources(e.target.value)} placeholder="e.g. 4" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!courseId || !title.trim()}>
            Create assignment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
