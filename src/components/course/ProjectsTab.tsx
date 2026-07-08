"use client";
import { useState } from "react";
import { Rocket, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/EmptyState";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore } from "@/lib/store";
import { uid } from "@/lib/utils";
import type { Course } from "@/lib/types";

const SUGGESTIONS: Record<string, string[]> = {
  default: ["Build a study guide website for this course's key topics", "Create a teaching video explaining the hardest concept to a beginner"],
};

export function ProjectsTab({ course }: { course: Course }) {
  const projects = useStudyGenieStore(useShallow((s) => s.projects.filter((p) => p.courseId === course.id)));
  const addProject = useStudyGenieStore(useShallow((s) => s.addProject));
  const updateProject = useStudyGenieStore(useShallow((s) => s.updateProject));
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");

  const suggestions = SUGGESTIONS.default;

  function createProject(presetTitle?: string) {
    const finalTitle = presetTitle ?? title;
    if (!finalTitle.trim()) return;
    addProject({
      courseId: course.id,
      title: finalTitle.trim(),
      description: presetTitle ? "A portfolio-ready project suggested based on this course." : description,
      steps: [
        { id: uid("step"), label: "Define the scope", done: false },
        { id: uid("step"), label: "Gather source material", done: false },
        { id: uid("step"), label: "Build the first draft", done: false },
        { id: uid("step"), label: "Review and polish", done: false },
      ],
      skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
      status: "Idea",
      reflection: "",
    });
    setTitle("");
    setDescription("");
    setSkills("");
    setShowForm(false);
  }

  function toggleStep(projectId: string, stepId: string) {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;
    updateProject(projectId, { steps: project.steps.map((s) => (s.id === stepId ? { ...s, done: !s.done } : s)) });
  }

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-mint-soft to-transparent">
        <CardContent className="space-y-3 p-5">
          <div className="text-sm font-semibold text-foreground">Suggested projects</div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <Button key={s} size="sm" variant="outline" onClick={() => createProject(s)}>
                {s}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{projects.length} project{projects.length === 1 ? "" : "s"}.</p>
        <Button size="sm" onClick={() => setShowForm((s) => !s)}>
          <Plus className="h-4 w-4" /> New project
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardContent className="space-y-3 p-4">
            <Input placeholder="Project title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea placeholder="What will you build?" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Input placeholder="Skills learned (comma separated)" value={skills} onChange={(e) => setSkills(e.target.value)} />
            <Button onClick={() => createProject()}>Create project</Button>
          </CardContent>
        </Card>
      )}

      {projects.length === 0 ? (
        <EmptyState icon={Rocket} title="No projects yet" description="Turn what you're learning into a real, portfolio-worthy project." />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {projects.map((p) => (
            <Card key={p.id}>
              <CardContent className="space-y-2.5 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-foreground">{p.title}</div>
                  <Badge>{p.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{p.description}</p>
                <ul className="space-y-1.5">
                  {p.steps.map((s) => (
                    <li key={s.id} className="flex items-center gap-2 text-xs">
                      <input type="checkbox" checked={s.done} onChange={() => toggleStep(p.id, s.id)} className="h-3.5 w-3.5 accent-[var(--electric)]" />
                      <span className={s.done ? "text-muted-foreground line-through" : "text-foreground"}>{s.label}</span>
                    </li>
                  ))}
                </ul>
                {p.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {p.skills.map((s) => (
                      <Badge key={s} variant="violet">
                        {s}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
