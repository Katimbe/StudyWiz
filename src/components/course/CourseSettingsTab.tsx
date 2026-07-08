"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Archive, RotateCcw, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore } from "@/lib/store";
import type { Course, EducationLevel, LearningStyle } from "@/lib/types";

const LEVELS: EducationLevel[] = ["High School", "College", "University", "Adult Learner", "Online Program"];
const STYLES: LearningStyle[] = ["Visual", "Reading/Writing", "Auditory", "Hands-on", "Mixed"];

export function CourseSettingsTab({ course }: { course: Course }) {
  const router = useRouter();
  const updateCourse = useStudyGenieStore(useShallow((s) => s.updateCourse));
  const archiveCourse = useStudyGenieStore(useShallow((s) => s.archiveCourse));
  const deleteCourse = useStudyGenieStore(useShallow((s) => s.deleteCourse));
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Course details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Course name</Label>
            <Input className="mt-1.5" value={course.name} onChange={(e) => updateCourse(course.id, { name: e.target.value })} />
          </div>
          <div>
            <Label>Subject</Label>
            <Input className="mt-1.5" value={course.subject} onChange={(e) => updateCourse(course.id, { subject: e.target.value })} />
          </div>
          <div>
            <Label>Professor / teacher</Label>
            <Input className="mt-1.5" value={course.professor} onChange={(e) => updateCourse(course.id, { professor: e.target.value })} />
          </div>
          <div>
            <Label>School / institution</Label>
            <Input className="mt-1.5" value={course.school} onChange={(e) => updateCourse(course.id, { school: e.target.value })} />
          </div>
          <div>
            <Label>Education level</Label>
            <Select value={course.level} onValueChange={(v) => updateCourse(course.id, { level: v as EducationLevel })}>
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
          <div>
            <Label>Learning style</Label>
            <Select value={course.learningStyle} onValueChange={(v) => updateCourse(course.id, { learningStyle: v as LearningStyle })}>
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STYLES.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Grade goal</Label>
            <Input className="mt-1.5" value={course.gradeGoal} onChange={(e) => updateCourse(course.id, { gradeGoal: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Start date</Label>
              <Input type="date" className="mt-1.5" value={course.startDate ?? ""} onChange={(e) => updateCourse(course.id, { startDate: e.target.value || null })} />
            </div>
            <div>
              <Label>End date</Label>
              <Input type="date" className="mt-1.5" value={course.endDate ?? ""} onChange={(e) => updateCourse(course.id, { endDate: e.target.value || null })} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-danger/30">
        <CardHeader>
          <CardTitle>Danger zone</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => archiveCourse(course.id, !course.archived)}>
            {course.archived ? <RotateCcw className="h-4 w-4" /> : <Archive className="h-4 w-4" />}
            {course.archived ? "Restore course" : "Archive course"}
          </Button>
          {confirmDelete ? (
            <>
              <Button variant="danger" onClick={() => { deleteCourse(course.id); router.push("/courses"); }}>
                Confirm delete
              </Button>
              <Button variant="ghost" onClick={() => setConfirmDelete(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="danger" onClick={() => setConfirmDelete(true)}>
              <Trash2 className="h-4 w-4" /> Delete course
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
