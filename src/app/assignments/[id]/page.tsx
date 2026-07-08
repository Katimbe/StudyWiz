"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore, useHydrated } from "@/lib/store";
import { generateFeedback } from "@/lib/assignment-engine";
import { daysUntilLabel, formatDate } from "@/lib/utils";
import type { Assignment } from "@/lib/types";

const STATUSES: Assignment["status"][] = ["Not started", "Planning", "Drafting", "Reviewing", "Ready to submit", "Submitted"];

export default function AssignmentStudioPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const hydrated = useHydrated();
  const assignment = useStudyGenieStore(useShallow((s) => s.assignments.find((a) => a.id === params.id)));
  const course = useStudyGenieStore(useShallow((s) => s.courses.find((c) => c.id === assignment?.courseId)));
  const updateAssignment = useStudyGenieStore(useShallow((s) => s.updateAssignment));
  const deleteAssignment = useStudyGenieStore(useShallow((s) => s.deleteAssignment));
  const [guideMode, setGuideMode] = useState(true);

  if (!hydrated) return null;
  if (!assignment) {
    return (
      <div className="py-16 text-center text-sm text-muted-foreground">
        Assignment not found. <Button variant="link" onClick={() => router.push("/assignments")}>Back to assignments</Button>
      </div>
    );
  }

  function toggleChecklist(id: string) {
    updateAssignment(assignment!.id, {
      checklist: assignment!.checklist.map((c) => (c.id === id ? { ...c, done: !c.done } : c)),
    });
  }

  function runFeedback() {
    const feedback = generateFeedback(assignment!.draftText, assignment!.wordCount, assignment!.extracted?.rubricCategories ?? [], guideMode);
    updateAssignment(assignment!.id, { aiFeedback: feedback });
  }

  const submissionChecklist = [
    { label: "All rubric categories addressed", done: (assignment.extracted?.rubricCategories.length ?? 0) === 0 },
    { label: "Word count within target", done: assignment.wordCount ? Math.abs(assignment.draftText.trim().split(/\s+/).filter(Boolean).length - assignment.wordCount) < assignment.wordCount * 0.1 : true },
    { label: "Requirements checklist complete", done: assignment.checklist.every((c) => c.done) },
    { label: "Draft reviewed for citations", done: false },
  ];

  return (
    <div className="space-y-6">
      <button onClick={() => router.push("/assignments")} className="focus-ring flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All assignments
      </button>

      <PageHeader
        eyebrow={course?.name ?? "Assignment"}
        title={assignment.title}
        description={assignment.dueDate ? `Due ${formatDate(assignment.dueDate)} · ${daysUntilLabel(assignment.dueDate)}` : "No due date set"}
        actions={
          <>
            <Select value={assignment.status} onValueChange={(v) => updateAssignment(assignment.id, { status: v as Assignment["status"] })}>
              <SelectTrigger className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="danger" size="icon" onClick={() => { deleteAssignment(assignment.id); router.push("/assignments"); }}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        }
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="rubric">Rubric</TabsTrigger>
          <TabsTrigger value="outline">Outline</TabsTrigger>
          <TabsTrigger value="research">Research Notes</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="feedback">AI Feedback</TabsTrigger>
          <TabsTrigger value="submission">Submission</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>What&apos;s being asked</CardTitle>
              </CardHeader>
              <CardContent>
                {assignment.extracted && assignment.extracted.asks.length > 0 ? (
                  <ul className="list-inside list-disc space-y-1.5 text-sm text-foreground">
                    {assignment.extracted.asks.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">Add instructions text to extract the core ask.</p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>What must be submitted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-xs text-muted-foreground">Submission type</div>
                    <div className="font-medium text-foreground">{assignment.submissionType}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Word count</div>
                    <div className="font-medium text-foreground">{assignment.wordCount ?? "Not specified"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Required sources</div>
                    <div className="font-medium text-foreground">{assignment.requiredSources ?? "Not specified"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Due date</div>
                    <div className="font-medium text-foreground">{assignment.dueDate ? formatDate(assignment.dueDate) : "Not set"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {assignment.extracted && assignment.extracted.missing.length > 0 && (
              <Card className="lg:col-span-2 border-gold/30">
                <CardHeader>
                  <CardTitle>Missing information</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
                    {assignment.extracted.missing.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="requirements">
          <Card>
            <CardHeader>
              <CardTitle>Requirements checklist</CardTitle>
            </CardHeader>
            <CardContent>
              {assignment.checklist.length === 0 ? (
                <p className="text-sm text-muted-foreground">No requirements detected — edit the assignment instructions to extract more.</p>
              ) : (
                <ul className="space-y-2.5">
                  {assignment.checklist.map((c) => (
                    <li key={c.id} className="flex items-start gap-3">
                      <Checkbox checked={c.done} onCheckedChange={() => toggleChecklist(c.id)} className="mt-0.5" />
                      <span className={`text-sm ${c.done ? "text-muted-foreground line-through" : "text-foreground"}`}>{c.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rubric">
          <Card>
            <CardHeader>
              <CardTitle>Rubric breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              {!assignment.extracted || assignment.extracted.rubricCategories.length === 0 ? (
                <p className="text-sm text-muted-foreground">No rubric uploaded yet. Edit this assignment to add rubric text.</p>
              ) : (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {assignment.extracted.rubricCategories.map((r, i) => (
                    <div key={i} className="rounded-[var(--radius-sm)] border border-border bg-surface p-3 text-sm text-foreground">
                      {r}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outline">
          <Card>
            <CardHeader>
              <CardTitle>Suggested outline</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea className="min-h-56" value={assignment.outline} onChange={(e) => updateAssignment(assignment.id, { outline: e.target.value })} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="research">
          <Card>
            <CardHeader>
              <CardTitle>Research notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                className="min-h-56"
                value={assignment.researchNotes}
                onChange={(e) => updateAssignment(assignment.id, { researchNotes: e.target.value })}
                placeholder="Collect quotes, sources, and evidence here before drafting."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="draft">
          <Card>
            <CardHeader>
              <CardTitle>Draft workspace</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea className="min-h-72" value={assignment.draftText} onChange={(e) => updateAssignment(assignment.id, { draftText: e.target.value })} placeholder="Write your draft here…" />
              <p className="mt-2 text-xs text-muted-foreground">{assignment.draftText.trim().split(/\s+/).filter(Boolean).length} words</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>AI Feedback</CardTitle>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                Guide Me Without Doing It For Me
                <Switch checked={guideMode} onCheckedChange={setGuideMode} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-muted-foreground">
                {guideMode
                  ? "Feedback comes as questions and nudges — StudyGenie won't write your assignment for you."
                  : "Direct feedback mode — still won't write content for you, but will be more blunt about gaps."}
              </p>
              <Button size="sm" onClick={runFeedback}>
                <Sparkles className="h-4 w-4" /> Get feedback on my draft
              </Button>
              {assignment.aiFeedback.length > 0 && (
                <ul className="space-y-2 rounded-[var(--radius-md)] border border-border bg-surface p-4 text-sm text-foreground">
                  {assignment.aiFeedback.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              )}
              <div className="rounded-[var(--radius-md)] border border-border bg-surface p-4 text-xs text-muted-foreground">
                <strong className="text-foreground">Citation Helper &amp; plagiarism-safe writing:</strong> keep a running Research Notes list of every source you use (see the Research Notes tab), and always paraphrase in your own words before pasting into your draft — the point of this tool is to strengthen your understanding, not replace your writing.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submission">
          <Card>
            <CardHeader>
              <CardTitle>Final submission checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5 text-sm">
                {submissionChecklist.map((c, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Badge variant={c.done ? "mint" : "default"}>{c.done ? "Ready" : "Check"}</Badge>
                    {c.label}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
