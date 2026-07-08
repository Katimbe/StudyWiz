"use client";
import { useState } from "react";
import { NotebookPen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/shared/EmptyState";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore } from "@/lib/store";
import { extractSummary } from "@/lib/ai-engine";
import { formatDate } from "@/lib/utils";
import type { Course } from "@/lib/types";

export function SmartNotesTab({ course }: { course: Course }) {
  const notes = useStudyGenieStore(useShallow((s) => s.materials.filter((m) => m.courseId === course.id && ["Lecture notes", "Study guide", "Other", "Handwritten notes"].includes(m.kind) && !m.archived)));
  const addMaterial = useStudyGenieStore(useShallow((s) => s.addMaterial));
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  function save() {
    if (!text.trim()) return;
    addMaterial({
      courseId: course.id,
      title: title.trim() || "Untitled note",
      kind: "Other",
      source: "Blank note",
      rawText: text,
      summary: extractSummary(text),
      keyPoints: [],
      definitions: [],
      dates: [],
      processingStatus: "processed",
      sourceConfidence: 100,
      flashcardSetId: null,
      quizId: null,
    });
    setTitle("");
    setText("");
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Quick note</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Note title" />
          <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a smart note — StudyGenie will summarize it automatically." className="min-h-28" />
          <Button size="sm" onClick={save} disabled={!text.trim()}>
            Save note
          </Button>
        </CardContent>
      </Card>

      {notes.length === 0 ? (
        <EmptyState icon={NotebookPen} title="No smart notes yet" description="Write your first note above, or capture handwritten/lecture notes from the Capture Center." />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {notes.map((n) => (
            <Card key={n.id}>
              <CardContent className="space-y-1.5 p-4">
                <div className="text-sm font-semibold text-foreground">{n.title}</div>
                <p className="line-clamp-3 text-xs text-muted-foreground">{n.summary || n.rawText}</p>
                <div className="text-[11px] text-muted-foreground">{formatDate(n.createdAt)}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
