"use client";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { EmptyState } from "@/components/shared/EmptyState";
import { TrendingUp } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore } from "@/lib/store";
import { courseMasteryScore } from "@/lib/derived";
import type { Course } from "@/lib/types";

const STAGE_TONE: Record<string, "default" | "electric" | "gold" | "mint" | "danger"> = {
  "Not started": "default",
  Seen: "electric",
  Reviewed: "electric",
  Practiced: "gold",
  Corrected: "danger",
  Applied: "gold",
  Mastered: "mint",
  "Due for review": "gold",
};

export function ProgressTab({ course }: { course: Course }) {
  const masteryTopics = useStudyGenieStore(useShallow((s) => s.masteryTopics.filter((t) => t.courseId === course.id)));
  const quizzes = useStudyGenieStore(useShallow((s) => s.quizzes.filter((q) => q.courseId === course.id)));

  const mastery = courseMasteryScore(masteryTopics);
  const accuracyTrend = quizzes.flatMap((q) => q.attempts.map((a) => ({ date: a.date.slice(5, 10), score: a.scorePct }))).slice(-12);

  if (masteryTopics.length === 0) {
    return <EmptyState icon={TrendingUp} title="No mastery data yet" description="Practice a quiz to start building this course's mastery map." />;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Course mastery</span>
            <span className="font-semibold text-foreground">{mastery}%</span>
          </div>
          <Progress value={mastery} className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Accuracy trend</CardTitle>
        </CardHeader>
        <CardContent className="h-48">
          {accuracyTrend.length === 0 ? (
            <p className="text-sm text-muted-foreground">No quiz attempts yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={accuracyTrend}>
                <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} domain={[0, 100]} />
                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="score" stroke="var(--electric)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-border">
            {masteryTopics.map((t) => (
              <li key={t.id} className="flex items-center justify-between py-2.5 text-sm">
                <span className="text-foreground">{t.name}</span>
                <Badge variant={STAGE_TONE[t.stage]}>{t.stage}</Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
