import {
  ScanLine,
  FileText,
  PenLine,
  ClipboardList,
  FileCheck2,
  ScrollText,
  FileUp,
  Image as ImageIcon,
  AudioLines,
  Video,
  ClipboardPaste,
  PlaySquare,
  FolderInput,
  Mic,
  NotebookPen,
  type LucideIcon,
} from "lucide-react";

export type CaptureInputMode = "scan" | "file" | "text" | "url" | "record";

export interface CaptureOption {
  id: string;
  label: string;
  icon: LucideIcon;
  inputMode: CaptureInputMode;
  accept?: string;
}

export const CAPTURE_OPTIONS: CaptureOption[] = [
  { id: "scan-textbook", label: "Scan textbook page", icon: ScanLine, inputMode: "scan" },
  { id: "scan-handwritten", label: "Scan handwritten notes", icon: PenLine, inputMode: "scan" },
  { id: "scan-whiteboard", label: "Scan whiteboard", icon: ScrollText, inputMode: "scan" },
  { id: "scan-worksheet", label: "Scan worksheet", icon: ClipboardList, inputMode: "scan" },
  { id: "scan-assignment", label: "Scan assignment instructions", icon: FileCheck2, inputMode: "scan" },
  { id: "scan-rubric", label: "Scan rubric", icon: FileCheck2, inputMode: "scan" },
  { id: "upload-pdf", label: "Upload PDF", icon: FileUp, inputMode: "file", accept: ".pdf" },
  { id: "upload-docx", label: "Upload DOCX", icon: FileText, inputMode: "file", accept: ".docx" },
  { id: "upload-pptx", label: "Upload PPTX", icon: FileText, inputMode: "file", accept: ".pptx" },
  { id: "upload-image", label: "Upload image", icon: ImageIcon, inputMode: "file", accept: "image/*" },
  { id: "upload-audio", label: "Upload audio", icon: AudioLines, inputMode: "file", accept: "audio/*" },
  { id: "upload-video", label: "Upload video", icon: Video, inputMode: "file", accept: "video/*" },
  { id: "paste-text", label: "Paste text", icon: ClipboardPaste, inputMode: "text" },
  { id: "youtube-transcript", label: "Import YouTube transcript", icon: PlaySquare, inputMode: "url" },
  { id: "google-drive", label: "Import Google Drive file", icon: FolderInput, inputMode: "url" },
  { id: "record-lecture", label: "Record lecture", icon: Mic, inputMode: "record" },
  { id: "blank-note", label: "Type a blank note", icon: NotebookPen, inputMode: "text" },
];

export const CAPTURE_KINDS = [
  "Syllabus",
  "Textbook page",
  "Lecture notes",
  "Assignment instructions",
  "Rubric",
  "Study guide",
  "Homework question",
  "Research article",
  "Class slides",
  "Handwritten notes",
  "Code",
  "Diagram",
  "Exam review",
  "Other",
] as const;
