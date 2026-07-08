"use client";
import { Suspense, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Loader2,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CAPTURE_OPTIONS, CAPTURE_KINDS, type CaptureOption } from "@/lib/capture-options";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore, useHydrated } from "@/lib/store";
import type { MaterialKind, MaterialSource } from "@/lib/types";
import {
  extractSummary,
  extractKeyPoints,
  extractDefinitions,
  extractDates,
  generateFlashcards,
  generateQuiz,
  estimateConfidence,
} from "@/lib/ai-engine";

const SOURCE_BY_INPUT: Record<string, MaterialSource> = {
  scan: "Scan",
  file: "PDF",
  text: "Pasted text",
  url: "YouTube transcript",
  record: "Lecture recording",
};

const INTENT_MAP: Record<string, string> = {
  syllabus: "upload-pdf",
  scan: "scan-textbook",
  paste: "paste-text",
  record: "record-lecture",
  drive: "google-drive",
};

function CaptureFlow() {
  const router = useRouter();
  const params = useSearchParams();
  const intent = params.get("intent");
  const presetOptionId = intent ? INTENT_MAP[intent] : null;
  const presetCourseId = params.get("course");

  const hydrated = useHydrated();
  const courses = useStudyGenieStore(useShallow((s) => s.courses.filter((c) => !c.archived)));
  const addMaterial = useStudyGenieStore(useShallow((s) => s.addMaterial));
  const addFlashcardSet = useStudyGenieStore(useShallow((s) => s.addFlashcardSet));
  const addQuiz = useStudyGenieStore(useShallow((s) => s.addQuiz));
  const updateMaterial = useStudyGenieStore(useShallow((s) => s.updateMaterial));

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [option, setOption] = useState<CaptureOption | null>(presetOptionId ? CAPTURE_OPTIONS.find((o) => o.id === presetOptionId) ?? null : null);
  const [title, setTitle] = useState("");
  const [rawText, setRawText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [url, setUrl] = useState("");
  const [kind, setKind] = useState<MaterialKind | null>(null);
  const [courseId, setCourseId] = useState<string>(presetCourseId ?? "inbox");
  const [wantFlashcards, setWantFlashcards] = useState(true);
  const [wantQuiz, setWantQuiz] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [savedMaterialId, setSavedMaterialId] = useState<string | null>(null);

  const preview = useMemo(() => {
    if (!rawText.trim()) return null;
    return {
      summary: extractSummary(rawText),
      keyPoints: extractKeyPoints(rawText),
      definitions: extractDefinitions(rawText),
      dates: extractDates(rawText),
      confidence: estimateConfidence(rawText),
    };
  }, [rawText]);

  function selectOption(o: CaptureOption) {
    setOption(o);
    setStep(2);
  }

  function handleFile(file: File) {
    setFileName(file.name);
    if (!title) setTitle(file.name.replace(/\.[^.]+$/, ""));
    if (file.type.startsWith("text/")) {
      file.text().then(setRawText);
    }
  }

  async function handleSave() {
    if (!option || !kind) return;
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 700));

    const finalCourseId = courseId === "inbox" ? null : courseId;
    const material = addMaterial({
      courseId: finalCourseId,
      title: title.trim() || `Untitled ${kind}`,
      kind,
      source: SOURCE_BY_INPUT[option.inputMode],
      rawText,
      summary: preview?.summary ?? null,
      keyPoints: preview?.keyPoints ?? [],
      definitions: preview?.definitions ?? [],
      dates: preview?.dates ?? [],
      processingStatus: "processed",
      sourceConfidence: preview?.confidence ?? 60,
      flashcardSetId: null,
      quizId: null,
    });

    let flashcardSetId: string | null = null;
    let quizId: string | null = null;

    if (finalCourseId && wantFlashcards && rawText.trim()) {
      const set = addFlashcardSet({ courseId: finalCourseId, materialId: material.id, title: material.title, cards: generateFlashcards(rawText, 8) });
      flashcardSetId = set.id;
    }
    if (finalCourseId && wantQuiz && rawText.trim()) {
      const quiz = addQuiz({ courseId: finalCourseId, materialId: material.id, title: material.title, questions: generateQuiz(rawText, kind, 6) });
      quizId = quiz.id;
    }
    if (flashcardSetId || quizId) {
      updateMaterial(material.id, { flashcardSetId, quizId });
    }

    setSavedMaterialId(material.id);
    setProcessing(false);
    setStep(4);
  }

  if (!hydrated) return null;

  if (step === 1) {
    return (
      <div className="space-y-6">
        <PageHeader eyebrow="Capture" title="Capture Center" description="Scan, upload, or paste anything — StudyGenie will turn it into notes, flashcards, and quizzes." />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {CAPTURE_OPTIONS.map((o) => (
            <button
              key={o.id}
              onClick={() => selectOption(o)}
              className="focus-ring group flex flex-col items-center gap-2.5 rounded-[var(--radius-md)] border border-border bg-surface p-4 text-center transition-colors hover:border-electric/50 hover:bg-surface-hover"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-electric-soft">
                <o.icon className="h-5 w-5 text-electric" />
              </span>
              <span className="text-xs font-medium text-foreground">{o.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === 2 && option) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <button onClick={() => setStep(1)} className="focus-ring flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to capture options
        </button>
        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-electric-soft">
                <option.icon className="h-5 w-5 text-electric" />
              </span>
              <h2 className="text-lg font-semibold">{option.label}</h2>
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Title</label>
              <Input className="mt-1.5" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Give this a title" />
            </div>

            {option.inputMode === "scan" && (
              <div className="space-y-3">
                <label className="flex flex-col items-center gap-2 rounded-[var(--radius-md)] border-2 border-dashed border-border bg-surface p-8 text-center">
                  <UploadCloud className="h-7 w-7 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Tap to open camera or upload a photo of the page</span>
                  <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
                </label>
                {fileName && <Badge variant="electric">{fileName} captured</Badge>}
                <div>
                  <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Recognized text (OCR)</label>
                  <Textarea
                    className="mt-1.5 min-h-40"
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Once OCR is connected, extracted text appears here automatically. For now, type or paste what the scan contains."
                  />
                </div>
              </div>
            )}

            {option.inputMode === "file" && (
              <div className="space-y-3">
                <label className="flex flex-col items-center gap-2 rounded-[var(--radius-md)] border-2 border-dashed border-border bg-surface p-8 text-center">
                  <UploadCloud className="h-7 w-7 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Click to choose a file ({option.accept})</span>
                  <input type="file" accept={option.accept} className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
                </label>
                {fileName && <Badge variant="electric">{fileName}</Badge>}
                <div>
                  <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Extracted content</label>
                  <Textarea
                    className="mt-1.5 min-h-40"
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Plain-text files are read automatically. PDFs/DOCX/PPTX/audio/video need the extraction pipeline connected — paste the text for now."
                  />
                </div>
              </div>
            )}

            {option.inputMode === "text" && (
              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {option.id === "blank-note" ? "Write your note" : "Paste your text"}
                </label>
                <Textarea className="mt-1.5 min-h-56" value={rawText} onChange={(e) => setRawText(e.target.value)} placeholder="Start typing…" />
              </div>
            )}

            {option.inputMode === "url" && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {option.id === "youtube-transcript" ? "YouTube URL" : "Google Drive file link"}
                  </label>
                  <Input className="mt-1.5" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…" />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Transcript / content</label>
                  <Textarea
                    className="mt-1.5 min-h-40"
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Once connected, the transcript/content imports automatically. Paste it here for now."
                  />
                </div>
              </div>
            )}

            {option.inputMode === "record" && (
              <RecordPanel onTranscript={setRawText} rawText={rawText} />
            )}

            <div className="flex justify-end pt-2">
              <Button onClick={() => setStep(3)} disabled={!title.trim() && !rawText.trim()}>
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <button onClick={() => setStep(2)} className="focus-ring flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <Card>
          <CardContent className="space-y-5 p-6">
            <div>
              <h2 className="text-lg font-semibold">What did you add?</h2>
              <p className="mt-1 text-sm text-muted-foreground">This tells StudyGenie how to process it.</p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {CAPTURE_KINDS.map((k) => (
                <button
                  key={k}
                  onClick={() => setKind(k)}
                  className={`focus-ring rounded-[var(--radius-sm)] border px-3 py-2.5 text-sm font-medium transition-colors ${
                    kind === k ? "border-electric bg-electric-soft text-electric" : "border-border bg-surface text-foreground hover:bg-surface-hover"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setStep(4)} disabled={!kind}>
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 4 && !savedMaterialId) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <button onClick={() => setStep(3)} className="focus-ring flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <Card>
          <CardContent className="space-y-5 p-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-electric" />
              <h2 className="text-lg font-semibold">Processing preview</h2>
            </div>

            <div className="space-y-2 text-sm">
              {["Extract text with OCR", "Clean formatting", "Detect language", "Summarize", "Extract key concepts", "Extract definitions", "Extract dates and deadlines"].map((step) => (
                <div key={step} className="flex items-center gap-2 text-muted-foreground">
                  <Check className="h-3.5 w-3.5 text-mint" /> {step}
                </div>
              ))}
            </div>

            {preview ? (
              <div className="space-y-4 rounded-[var(--radius-md)] border border-border bg-surface p-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Summary</div>
                  <p className="mt-1 text-sm text-foreground">{preview.summary}</p>
                </div>
                {preview.keyPoints.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Key points</div>
                    <ul className="mt-1 list-inside list-disc text-sm text-foreground">
                      {preview.keyPoints.slice(0, 4).map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {preview.dates.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {preview.dates.map((d) => (
                      <Badge key={d} variant="gold">
                        {d}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="text-xs text-muted-foreground">Source confidence: {preview.confidence}%</div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No text captured — you can still save this, but summaries/flashcards need text content.</p>
            )}

            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Save to</label>
              <Select value={courseId} onValueChange={setCourseId}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inbox">Library Inbox (no course)</SelectItem>
                  {courses.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {courseId !== "inbox" && (
              <div className="flex flex-wrap gap-4 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={wantFlashcards} onChange={(e) => setWantFlashcards(e.target.checked)} className="h-4 w-4 accent-[var(--electric)]" />
                  Generate flashcards
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={wantQuiz} onChange={(e) => setWantQuiz(e.target.checked)} className="h-4 w-4 accent-[var(--electric)]" />
                  Generate quiz
                </label>
              </div>
            )}

            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={processing}>
                {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                {processing ? "Saving…" : "Save material"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-6 py-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mint-soft">
        <Check className="h-7 w-7 text-mint" />
      </div>
      <h2 className="text-xl font-semibold">Saved</h2>
      <p className="text-sm text-muted-foreground">
        Your material is processed and ready. {courseId !== "inbox" ? "It's in your course workspace." : "It's waiting in your Library Inbox — move it to a course anytime."}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          onClick={() => {
            if (courseId !== "inbox") router.push(`/courses/${courseId}?tab=materials`);
            else router.push("/library");
          }}
        >
          View material
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setStep(1);
            setOption(null);
            setTitle("");
            setRawText("");
            setFileName(null);
            setKind(null);
            setCourseId("inbox");
            setSavedMaterialId(null);
          }}
        >
          Capture something else
        </Button>
      </div>
    </div>
  );
}

function RecordPanel({ rawText, onTranscript }: { rawText: string; onTranscript: (v: string) => void }) {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function start() {
    setRecording(true);
    setSeconds(0);
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  }
  function stop() {
    setRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-4 rounded-[var(--radius-md)] border border-border bg-surface p-6">
        <div className="text-2xl font-semibold tabular-nums text-foreground">
          {mm}:{ss}
        </div>
        <Button variant={recording ? "danger" : "primary"} onClick={recording ? stop : start}>
          {recording ? "Stop recording" : "Start recording"}
        </Button>
      </div>
      <div>
        <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Transcript / notes</label>
        <Textarea
          className="mt-1.5 min-h-40"
          value={rawText}
          onChange={(e) => onTranscript(e.target.value)}
          placeholder="Once speech-to-text is connected, your transcript appears live here. Type notes for now."
        />
      </div>
    </div>
  );
}

export default function CapturePage() {
  return (
    <Suspense fallback={null}>
      <CaptureFlow />
    </Suspense>
  );
}
