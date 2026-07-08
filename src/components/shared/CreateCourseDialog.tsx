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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore } from "@/lib/store";
import type { EducationLevel, LearningStyle } from "@/lib/types";
import { uid } from "@/lib/utils";

const LEVELS: EducationLevel[] = ["High School", "College", "University", "Adult Learner", "Online Program"];
const STYLES: LearningStyle[] = ["Visual", "Reading/Writing", "Auditory", "Hands-on", "Mixed"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function CreateCourseDialog({ trigger }: { trigger: React.ReactNode }) {
  const router = useRouter();
  const addCourse = useStudyGenieStore(useShallow((s) => s.addCourse));
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState<EducationLevel>("College");
  const [professor, setProfessor] = useState("");
  const [school, setSchool] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [meetingDays, setMeetingDays] = useState<string[]>([]);
  const [gradeGoal, setGradeGoal] = useState("A");
  const [difficulty, setDifficulty] = useState(3);
  const [confidence, setConfidence] = useState(3);
  const [learningStyle, setLearningStyle] = useState<LearningStyle>("Mixed");
  const [examLabel, setExamLabel] = useState("");
  const [examDate, setExamDate] = useState("");

  function toggleDay(d: string) {
    setMeetingDays((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));
  }

  function handleCreate() {
    if (!name.trim()) return;
    const course = addCourse({
      name: name.trim(),
      subject: subject.trim() || "General",
      level,
      school: school.trim(),
      professor: professor.trim(),
      startDate: startDate || null,
      endDate: endDate || null,
      meetingDays,
      gradeGoal,
      examDates: examLabel && examDate ? [{ id: uid("exam"), label: examLabel, date: examDate }] : [],
      assignmentTypes: [],
      difficulty,
      confidence,
      learningStyle,
    });
    setOpen(false);
    router.push(`/courses/${course.id}`);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Create a course</DialogTitle>
          <DialogDescription>Set this up once — StudyGenie uses it to plan your studying and track deadlines.</DialogDescription>
        </DialogHeader>

        <div className="grid max-h-[60vh] gap-4 overflow-y-auto pr-1">
          <div>
            <Label htmlFor="course-name">Course name *</Label>
            <Input id="course-name" className="mt-1.5" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Organic Chemistry II" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Subject category</Label>
              <Input className="mt-1.5" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Chemistry" />
            </div>
            <div>
              <Label>Education level</Label>
              <Select value={level} onValueChange={(v) => setLevel(v as EducationLevel)}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LEVELS.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Professor / teacher</Label>
              <Input className="mt-1.5" value={professor} onChange={(e) => setProfessor(e.target.value)} placeholder="Name" />
            </div>
            <div>
              <Label>School / institution</Label>
              <Input className="mt-1.5" value={school} onChange={(e) => setSchool(e.target.value)} placeholder="Name" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Start date</Label>
              <Input type="date" className="mt-1.5" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div>
              <Label>End date</Label>
              <Input type="date" className="mt-1.5" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>

          <div>
            <Label>Meeting days</Label>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {DAYS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggleDay(d)}
                  className={`focus-ring rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    meetingDays.includes(d) ? "border-electric bg-electric-soft text-electric" : "border-border bg-surface text-muted-foreground"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Grade goal</Label>
              <Input className="mt-1.5" value={gradeGoal} onChange={(e) => setGradeGoal(e.target.value)} placeholder="e.g. A-" />
            </div>
            <div>
              <Label>Preferred learning style</Label>
              <Select value={learningStyle} onValueChange={(v) => setLearningStyle(v as LearningStyle)}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STYLES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Difficulty level (1-5)</Label>
              <Input type="number" min={1} max={5} className="mt-1.5" value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))} />
            </div>
            <div>
              <Label>Confidence level (1-5)</Label>
              <Input type="number" min={1} max={5} className="mt-1.5" value={confidence} onChange={(e) => setConfidence(Number(e.target.value))} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Exam / key date label</Label>
              <Input className="mt-1.5" value={examLabel} onChange={(e) => setExamLabel(e.target.value)} placeholder="e.g. Midterm" />
            </div>
            <div>
              <Label>Exam date</Label>
              <Input type="date" className="mt-1.5" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!name.trim()}>
            Create course
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
