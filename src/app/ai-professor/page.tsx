"use client";
import { PageHeader } from "@/components/shared/PageHeader";
import { AiProfessorChat } from "@/components/ai-professor/AiProfessorChat";
import { useHydrated } from "@/lib/store";

export default function AiProfessorPage() {
  const hydrated = useHydrated();
  if (!hydrated) return null;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="AI Professor"
        title="Your source-grounded tutor"
        description="Pick a course and material, choose how you want to be taught, and StudyGenie will ground its answers in what you've actually uploaded — flagging when it can't."
      />
      <AiProfessorChat />
    </div>
  );
}
