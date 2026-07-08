import {
  LayoutDashboard,
  BookOpen,
  ScanLine,
  Library,
  GraduationCap,
  Dumbbell,
  ClipboardList,
  Timer,
  LineChart,
  Archive,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  mobile: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", icon: LayoutDashboard, mobile: true },
  { label: "Courses", href: "/courses", icon: BookOpen, mobile: false },
  { label: "Capture", href: "/capture", icon: ScanLine, mobile: true },
  { label: "Library", href: "/library", icon: Library, mobile: false },
  { label: "AI Professor", href: "/ai-professor", icon: GraduationCap, mobile: false },
  { label: "Practice", href: "/practice", icon: Dumbbell, mobile: true },
  { label: "Assignments", href: "/assignments", icon: ClipboardList, mobile: false },
  { label: "Focus Room", href: "/focus", icon: Timer, mobile: true },
  { label: "Progress", href: "/progress", icon: LineChart, mobile: false },
  { label: "Archive", href: "/archive", icon: Archive, mobile: false },
  { label: "Settings", href: "/settings", icon: Settings, mobile: false },
];
