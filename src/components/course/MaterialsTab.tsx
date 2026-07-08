"use client";
import Link from "next/link";
import { FileStack, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import type { Course } from "@/lib/types";

export function MaterialsTab({ course }: { course: Course }) {
  const materials = useStudyGenieStore(useShallow((s) => s.materials.filter((m) => m.courseId === course.id && !m.archived)));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{materials.length} material{materials.length === 1 ? "" : "s"} in this course.</p>
        <Button asChild size="sm">
          <Link href={`/capture?course=${course.id}`}>
            <Plus className="h-4 w-4" /> Add material
          </Link>
        </Button>
      </div>
      {materials.length === 0 ? (
        <EmptyState icon={FileStack} title="No materials yet" description="Scan, upload, or paste your first material for this course." actionLabel="Capture material" actionHref={`/capture?course=${course.id}`} />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {materials.map((m) => (
            <Card key={m.id}>
              <CardContent className="space-y-2 p-4">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="electric">{m.kind}</Badge>
                  <Badge>{m.source}</Badge>
                </div>
                <div className="text-sm font-semibold text-foreground">{m.title}</div>
                {m.summary && <p className="line-clamp-2 text-xs text-muted-foreground">{m.summary}</p>}
                <div className="text-[11px] text-muted-foreground">{formatDate(m.createdAt)}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
