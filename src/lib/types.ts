export type EducationLevel = "High School" | "College" | "University" | "Adult Learner" | "Online Program";

export type LearningStyle = "Visual" | "Reading/Writing" | "Auditory" | "Hands-on" | "Mixed";

export interface Course {
  id: string;
  name: string;
  subject: string;
  level: EducationLevel;
  school: string;
  professor: string;
  startDate: string | null;
  endDate: string | null;
  meetingDays: string[];
  gradeGoal: string;
  examDates: { id: string; label: string; date: string }[];
  assignmentTypes: string[];
  difficulty: number; // 1-5
  confidence: number; // 1-5
  learningStyle: LearningStyle;
  archived: boolean;
  createdAt: string;
  lastStudiedAt: string | null;
}

export type MaterialKind =
  | "Syllabus"
  | "Textbook page"
  | "Lecture notes"
  | "Assignment instructions"
  | "Rubric"
  | "Study guide"
  | "Homework question"
  | "Research article"
  | "Class slides"
  | "Handwritten notes"
  | "Code"
  | "Diagram"
  | "Exam review"
  | "Other";

export type MaterialSource =
  | "Scan"
  | "PDF"
  | "DOCX"
  | "PPTX"
  | "Image"
  | "Audio"
  | "Video"
  | "Pasted text"
  | "YouTube transcript"
  | "Google Drive"
  | "Lecture recording"
  | "Blank note";

export interface Material {
  id: string;
  courseId: string | null; // null = Library Inbox
  title: string;
  kind: MaterialKind;
  source: MaterialSource;
  rawText: string;
  summary: string | null;
  keyPoints: string[];
  definitions: { term: string; definition: string }[];
  dates: string[];
  processingStatus: "queued" | "processing" | "processed";
  sourceConfidence: number; // 0-100, OCR/legibility confidence
  createdAt: string;
  archived: boolean;
  flashcardSetId: string | null;
  quizId: string | null;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  mastery: MasteryStage;
  dueAt: string | null;
}

export interface FlashcardSet {
  id: string;
  courseId: string;
  materialId: string | null;
  title: string;
  cards: Flashcard[];
  createdAt: string;
}

export type QuestionType = "multiple-choice" | "true-false" | "fill-blank" | "short-answer";
export type QuestionDifficulty = "Recall" | "Understanding" | "Application" | "Analysis" | "Creation" | "Exam-level";

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  options?: { id: string; text: string; correct: boolean; whyWrong?: string }[];
  correctAnswer?: string;
  explanation: string;
  difficulty: QuestionDifficulty;
  topic: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  materialId: string | null;
  title: string;
  questions: QuizQuestion[];
  attempts: { id: string; date: string; scorePct: number; missedTopics: string[] }[];
  createdAt: string;
}

export interface AssignmentChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  instructions: string;
  rubricText: string | null;
  dueDate: string | null;
  wordCount: number | null;
  submissionType: string;
  requiredSources: number | null;
  extracted: {
    asks: string[];
    mustSubmit: string[];
    requirements: string[];
    rubricCategories: string[];
    missing: string[];
  } | null;
  checklist: AssignmentChecklistItem[];
  outline: string;
  researchNotes: string;
  draftText: string;
  aiFeedback: string[];
  status: "Not started" | "Planning" | "Drafting" | "Reviewing" | "Ready to submit" | "Submitted";
  createdAt: string;
}

export interface LectureHighlight {
  id: string;
  timestampSec: number;
  type: "key-point" | "definition" | "example" | "emphasis" | "possible-exam" | "confusion";
  text: string;
}

export interface Lecture {
  id: string;
  courseId: string;
  title: string;
  transcript: string;
  manualNotes: string;
  highlights: LectureHighlight[];
  durationSec: number;
  createdAt: string;
  flashcardSetId: string | null;
  quizId: string | null;
}

export type MasteryStage =
  | "Not started"
  | "Seen"
  | "Reviewed"
  | "Practiced"
  | "Corrected"
  | "Applied"
  | "Mastered"
  | "Due for review";

export interface MasteryTopic {
  id: string;
  courseId: string;
  name: string;
  stage: MasteryStage;
  lastReviewedAt: string | null;
  accuracyPct: number | null;
}

export interface StudyTask {
  id: string;
  courseId: string;
  title: string;
  topic: string;
  date: string; // ISO date
  estMinutes: number;
  why: string;
  completed: boolean;
  reflection: string | null;
}

export interface FocusSession {
  id: string;
  taskLabel: string;
  mode: "Pomodoro" | "Deep Work" | "Quick Start";
  startedAt: string;
  durationSec: number;
  microSteps: { id: string; label: string; done: boolean }[];
  distractionLog: string[];
  completed: boolean;
  reflection: { completedText: string; stillConfused: string; nextAction: string } | null;
}

export interface Project {
  id: string;
  courseId: string;
  title: string;
  description: string;
  steps: { id: string; label: string; done: boolean }[];
  skills: string[];
  status: "Idea" | "In progress" | "Complete";
  reflection: string;
}

export interface AiChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  mode: string;
  groundedInMaterialId: string | null;
  createdAt: string;
}

export interface AiChatSession {
  id: string;
  courseId: string | null;
  materialId: string | null;
  mode: string;
  goal: string;
  messages: AiChatMessage[];
  createdAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
  learningStyle: LearningStyle;
  studyAvailability: string[];
  theme: "dark" | "light";
  language: string;
  aiModel: "OpenAI GPT" | "Claude" | "Google Gemini";
  plan: "Free" | "Student Plus" | "Pro Student" | "School Plan" | "Tutor/Teacher Plan";
}
