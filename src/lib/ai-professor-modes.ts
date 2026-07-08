export const AI_PROFESSOR_MODES = [
  { id: "explain-simply", label: "Explain Simply", hint: "Plain-language explanation, no jargon." },
  { id: "teach-professor", label: "Teach Like a Professor", hint: "Formal, structured, academic tone." },
  { id: "socratic", label: "Socratic Mode", hint: "Answers with guiding questions, not direct answers." },
  { id: "quiz-first", label: "Quiz Me First", hint: "Tests you before explaining." },
  { id: "assignment-help", label: "Assignment Help Mode", hint: "Breaks down what's being asked." },
  { id: "exam-prep", label: "Exam Prep Mode", hint: "Focused on likely exam content." },
  { id: "coding-coach", label: "Coding Coach", hint: "Walks through logic, not full solutions." },
  { id: "translate", label: "Translate This", hint: "Translates the material to another language." },
  { id: "summarize", label: "Summarize This", hint: "Condenses the material." },
  { id: "make-visual", label: "Make It Visual", hint: "Describes a diagram or mind map." },
  { id: "real-life", label: "Real-Life Application", hint: "Connects concept to real scenarios." },
  { id: "dont-give-answer", label: "Don't Give Me the Answer", hint: "Coaches you toward it yourself." },
  { id: "step-by-step", label: "Step-by-Step Breakdown", hint: "Numbered breakdown of the concept." },
  { id: "turn-into-project", label: "Turn This Into a Project", hint: "Suggests a hands-on project." },
] as const;

export type AiProfessorModeId = (typeof AI_PROFESSOR_MODES)[number]["id"];
