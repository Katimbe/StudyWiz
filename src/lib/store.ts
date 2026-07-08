"use client";

import { useShallow } from "zustand/react/shallow";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { uid } from "./utils";
import type {
  Course,
  Material,
  FlashcardSet,
  Quiz,
  Assignment,
  Lecture,
  MasteryTopic,
  StudyTask,
  FocusSession,
  Project,
  AiChatSession,
  UserProfile,
} from "./types";

interface StudyGenieState {
  hydrated: boolean;
  profile: UserProfile;
  courses: Course[];
  materials: Material[];
  flashcardSets: FlashcardSet[];
  quizzes: Quiz[];
  assignments: Assignment[];
  lectures: Lecture[];
  masteryTopics: MasteryTopic[];
  studyTasks: StudyTask[];
  focusSessions: FocusSession[];
  projects: Project[];
  aiChats: AiChatSession[];

  setHydrated: () => void;
  updateProfile: (patch: Partial<UserProfile>) => void;

  addCourse: (course: Omit<Course, "id" | "createdAt" | "archived" | "lastStudiedAt">) => Course;
  updateCourse: (id: string, patch: Partial<Course>) => void;
  archiveCourse: (id: string, archived: boolean) => void;
  deleteCourse: (id: string) => void;
  touchCourse: (id: string) => void;

  addMaterial: (m: Omit<Material, "id" | "createdAt" | "archived">) => Material;
  updateMaterial: (id: string, patch: Partial<Material>) => void;
  archiveMaterial: (id: string, archived: boolean) => void;
  deleteMaterial: (id: string) => void;
  moveMaterialToCourse: (id: string, courseId: string) => void;

  addFlashcardSet: (s: Omit<FlashcardSet, "id" | "createdAt">) => FlashcardSet;
  updateFlashcardSet: (id: string, patch: Partial<FlashcardSet>) => void;

  addQuiz: (q: Omit<Quiz, "id" | "createdAt" | "attempts">) => Quiz;
  recordQuizAttempt: (id: string, scorePct: number, missedTopics: string[]) => void;

  addAssignment: (a: Omit<Assignment, "id" | "createdAt">) => Assignment;
  updateAssignment: (id: string, patch: Partial<Assignment>) => void;
  deleteAssignment: (id: string) => void;

  addLecture: (l: Omit<Lecture, "id" | "createdAt">) => Lecture;
  updateLecture: (id: string, patch: Partial<Lecture>) => void;

  upsertMasteryTopic: (courseId: string, name: string, patch: Partial<MasteryTopic>) => void;

  addStudyTask: (t: Omit<StudyTask, "id">) => StudyTask;
  updateStudyTask: (id: string, patch: Partial<StudyTask>) => void;
  deleteStudyTask: (id: string) => void;

  addFocusSession: (f: Omit<FocusSession, "id">) => FocusSession;
  updateFocusSession: (id: string, patch: Partial<FocusSession>) => void;

  addProject: (p: Omit<Project, "id">) => Project;
  updateProject: (id: string, patch: Partial<Project>) => void;

  addAiChat: (c: Omit<AiChatSession, "id" | "createdAt">) => AiChatSession;
  updateAiChat: (id: string, patch: Partial<AiChatSession>) => void;

  resetAll: () => void;
}

const defaultProfile: UserProfile = {
  name: "",
  email: "",
  learningStyle: "Mixed",
  studyAvailability: [],
  theme: "dark",
  language: "English",
  aiModel: "Claude",
  plan: "Free",
};

export const useStudyGenieStore = create<StudyGenieState>()(
  persist(
    (set) => ({
      hydrated: false,
      profile: defaultProfile,
      courses: [],
      materials: [],
      flashcardSets: [],
      quizzes: [],
      assignments: [],
      lectures: [],
      masteryTopics: [],
      studyTasks: [],
      focusSessions: [],
      projects: [],
      aiChats: [],

      setHydrated: () => set({ hydrated: true }),
      updateProfile: (patch) => set((s) => ({ profile: { ...s.profile, ...patch } })),

      addCourse: (course) => {
        const newCourse: Course = { ...course, id: uid("course"), createdAt: new Date().toISOString(), archived: false, lastStudiedAt: null };
        set((s) => ({ courses: [newCourse, ...s.courses] }));
        return newCourse;
      },
      updateCourse: (id, patch) => set((s) => ({ courses: s.courses.map((c) => (c.id === id ? { ...c, ...patch } : c)) })),
      archiveCourse: (id, archived) => set((s) => ({ courses: s.courses.map((c) => (c.id === id ? { ...c, archived } : c)) })),
      deleteCourse: (id) =>
        set((s) => ({
          courses: s.courses.filter((c) => c.id !== id),
          materials: s.materials.filter((m) => m.courseId !== id),
          assignments: s.assignments.filter((a) => a.courseId !== id),
          lectures: s.lectures.filter((l) => l.courseId !== id),
          flashcardSets: s.flashcardSets.filter((f) => f.courseId !== id),
          quizzes: s.quizzes.filter((q) => q.courseId !== id),
          masteryTopics: s.masteryTopics.filter((m) => m.courseId !== id),
          studyTasks: s.studyTasks.filter((t) => t.courseId !== id),
          projects: s.projects.filter((p) => p.courseId !== id),
        })),
      touchCourse: (id) => set((s) => ({ courses: s.courses.map((c) => (c.id === id ? { ...c, lastStudiedAt: new Date().toISOString() } : c)) })),

      addMaterial: (m) => {
        const newMaterial: Material = { ...m, id: uid("mat"), createdAt: new Date().toISOString(), archived: false };
        set((s) => ({ materials: [newMaterial, ...s.materials] }));
        return newMaterial;
      },
      updateMaterial: (id, patch) => set((s) => ({ materials: s.materials.map((m) => (m.id === id ? { ...m, ...patch } : m)) })),
      archiveMaterial: (id, archived) => set((s) => ({ materials: s.materials.map((m) => (m.id === id ? { ...m, archived } : m)) })),
      deleteMaterial: (id) => set((s) => ({ materials: s.materials.filter((m) => m.id !== id) })),
      moveMaterialToCourse: (id, courseId) => set((s) => ({ materials: s.materials.map((m) => (m.id === id ? { ...m, courseId } : m)) })),

      addFlashcardSet: (fs) => {
        const newSet: FlashcardSet = { ...fs, id: uid("fset"), createdAt: new Date().toISOString() };
        set((s) => ({ flashcardSets: [newSet, ...s.flashcardSets] }));
        return newSet;
      },
      updateFlashcardSet: (id, patch) => set((s) => ({ flashcardSets: s.flashcardSets.map((f) => (f.id === id ? { ...f, ...patch } : f)) })),

      addQuiz: (q) => {
        const newQuiz: Quiz = { ...q, id: uid("quiz"), createdAt: new Date().toISOString(), attempts: [] };
        set((s) => ({ quizzes: [newQuiz, ...s.quizzes] }));
        return newQuiz;
      },
      recordQuizAttempt: (id, scorePct, missedTopics) =>
        set((s) => ({
          quizzes: s.quizzes.map((q) =>
            q.id === id ? { ...q, attempts: [...q.attempts, { id: uid("attempt"), date: new Date().toISOString(), scorePct, missedTopics }] } : q,
          ),
        })),

      addAssignment: (a) => {
        const newA: Assignment = { ...a, id: uid("asg"), createdAt: new Date().toISOString() };
        set((s) => ({ assignments: [newA, ...s.assignments] }));
        return newA;
      },
      updateAssignment: (id, patch) => set((s) => ({ assignments: s.assignments.map((a) => (a.id === id ? { ...a, ...patch } : a)) })),
      deleteAssignment: (id) => set((s) => ({ assignments: s.assignments.filter((a) => a.id !== id) })),

      addLecture: (l) => {
        const newL: Lecture = { ...l, id: uid("lec"), createdAt: new Date().toISOString() };
        set((s) => ({ lectures: [newL, ...s.lectures] }));
        return newL;
      },
      updateLecture: (id, patch) => set((s) => ({ lectures: s.lectures.map((l) => (l.id === id ? { ...l, ...patch } : l)) })),

      upsertMasteryTopic: (courseId, name, patch) =>
        set((s) => {
          const existing = s.masteryTopics.find((t) => t.courseId === courseId && t.name === name);
          if (existing) {
            return { masteryTopics: s.masteryTopics.map((t) => (t.id === existing.id ? { ...t, ...patch } : t)) };
          }
          const created: MasteryTopic = { id: uid("topic"), courseId, name, stage: "Not started", lastReviewedAt: null, accuracyPct: null, ...patch };
          return { masteryTopics: [created, ...s.masteryTopics] };
        }),

      addStudyTask: (t) => {
        const newT: StudyTask = { ...t, id: uid("task") };
        set((s) => ({ studyTasks: [newT, ...s.studyTasks] }));
        return newT;
      },
      updateStudyTask: (id, patch) => set((s) => ({ studyTasks: s.studyTasks.map((t) => (t.id === id ? { ...t, ...patch } : t)) })),
      deleteStudyTask: (id) => set((s) => ({ studyTasks: s.studyTasks.filter((t) => t.id !== id) })),

      addFocusSession: (f) => {
        const newF: FocusSession = { ...f, id: uid("focus") };
        set((s) => ({ focusSessions: [newF, ...s.focusSessions] }));
        return newF;
      },
      updateFocusSession: (id, patch) => set((s) => ({ focusSessions: s.focusSessions.map((f) => (f.id === id ? { ...f, ...patch } : f)) })),

      addProject: (p) => {
        const newP: Project = { ...p, id: uid("proj") };
        set((s) => ({ projects: [newP, ...s.projects] }));
        return newP;
      },
      updateProject: (id, patch) => set((s) => ({ projects: s.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)) })),

      addAiChat: (c) => {
        const newC: AiChatSession = { ...c, id: uid("chat"), createdAt: new Date().toISOString() };
        set((s) => ({ aiChats: [newC, ...s.aiChats] }));
        return newC;
      },
      updateAiChat: (id, patch) => set((s) => ({ aiChats: s.aiChats.map((c) => (c.id === id ? { ...c, ...patch } : c)) })),

      resetAll: () =>
        set({
          profile: defaultProfile,
          courses: [],
          materials: [],
          flashcardSets: [],
          quizzes: [],
          assignments: [],
          lectures: [],
          masteryTopics: [],
          studyTasks: [],
          focusSessions: [],
          projects: [],
          aiChats: [],
        }),
    }),
    {
      name: "studygenie-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);

export function useHydrated() {
  return useStudyGenieStore(useShallow((s) => s.hydrated));
}
