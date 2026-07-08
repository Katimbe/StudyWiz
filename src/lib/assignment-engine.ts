// Heuristic assignment parser — stands in for an LLM extraction call.
function sentences(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function extractAssignmentInfo(instructions: string, rubricText: string | null) {
  const lines = sentences(instructions);
  const asks = lines.filter((l) => /\b(explain|analyze|discuss|describe|compare|evaluate|argue|summarize|design|create|write|solve|calculate)\b/i.test(l)).slice(0, 5);
  const mustSubmit = lines.filter((l) => /\b(submit|upload|attach|turn in|include a|provide a)\b/i.test(l)).slice(0, 5);
  const requirements = lines.filter((l) => /\b(must|should|required|at least|no more than|need to)\b/i.test(l)).slice(0, 6);

  const rubricCategories = rubricText
    ? Array.from(
        new Set(
          rubricText
            .split(/\n|(?<=[.!?])\s+/)
            .map((l) => l.trim())
            .filter((l) => l.length > 0 && l.length < 60 && /[a-zA-Z]/.test(l))
            .slice(0, 8),
        ),
      )
    : [];

  const missing: string[] = [];
  if (!/\bdue\b|\bdeadline\b/i.test(instructions)) missing.push("No due date mentioned in the instructions — confirm with your professor or syllabus.");
  if (!/\bword|\bpage/i.test(instructions)) missing.push("No length requirement detected — verify expected word/page count.");
  if (!rubricText) missing.push("No rubric uploaded yet — add one for a category-by-category breakdown.");
  if (asks.length === 0) missing.push("Couldn't clearly identify the core task — consider re-reading or rephrasing the instructions.");

  return { asks, mustSubmit, requirements, rubricCategories, missing };
}

export function suggestOutline(asks: string[]): string {
  if (asks.length === 0) return "1. Introduction\n2. Body — address the assignment's core question\n3. Conclusion\n4. References (if required)";
  return [
    "1. Introduction — restate the assignment's core question in your own words",
    ...asks.map((a, i) => `${i + 2}. Address: "${a}"`),
    `${asks.length + 2}. Conclusion — tie your points back to the original ask`,
    `${asks.length + 3}. References / citations (if required)`,
  ].join("\n");
}

export function generateFeedback(draftText: string, requiredWordCount: number | null, rubricCategories: string[], guideMode: boolean): string[] {
  const wordCount = draftText.trim().split(/\s+/).filter(Boolean).length;
  const feedback: string[] = [];

  if (draftText.trim().length === 0) {
    return ["Start drafting in the workspace below — even a rough outline gives me something to react to."];
  }

  if (requiredWordCount) {
    const diff = wordCount - requiredWordCount;
    if (Math.abs(diff) > requiredWordCount * 0.15) {
      feedback.push(
        guideMode
          ? `Your draft is ${diff > 0 ? "longer" : "shorter"} than the ${requiredWordCount}-word target (currently ${wordCount}). Which section could you ${diff > 0 ? "tighten" : "expand with more evidence"}?`
          : `Draft is ${diff > 0 ? "over" : "under"} the ${requiredWordCount}-word target by about ${Math.abs(diff)} words.`,
      );
    } else {
      feedback.push(`Length looks on target (${wordCount} words vs. ${requiredWordCount} required).`);
    }
  }

  for (const cat of rubricCategories.slice(0, 4)) {
    const mentioned = draftText.toLowerCase().includes(cat.toLowerCase().split(" ")[0]);
    feedback.push(
      mentioned
        ? `Your draft appears to touch on the rubric category "${cat}".`
        : guideMode
          ? `Where in your draft does it address the rubric category "${cat}"? If nowhere yet, that's worth adding.`
          : `The rubric category "${cat}" doesn't appear to be addressed yet.`,
    );
  }

  return feedback;
}

export function guidingQuestions(asks: string[]): string[] {
  if (asks.length === 0) {
    return ["What is this assignment really asking you to do?", "What would your professor consider a complete answer?"];
  }
  return asks.map((a) => `What evidence or example from your course material best supports: "${a}"?`);
}
