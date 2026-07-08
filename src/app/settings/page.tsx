"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Trash2, Download, Shield } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useShallow } from "zustand/react/shallow";
import { useStudyGenieStore, useHydrated } from "@/lib/store";
import type { LearningStyle, UserProfile } from "@/lib/types";

const LEARNING_STYLES: LearningStyle[] = ["Visual", "Reading/Writing", "Auditory", "Hands-on", "Mixed"];
const AI_MODELS: UserProfile["aiModel"][] = ["OpenAI GPT", "Claude", "Google Gemini"];
const PLANS: UserProfile["plan"][] = ["Free", "Student Plus", "Pro Student", "School Plan", "Tutor/Teacher Plan"];
const DAY_OPTIONS = ["Early morning", "Mornings", "Afternoons", "Evenings", "Late night", "Weekends"];
const INTEGRATIONS = ["Google Drive", "Google Calendar", "Gmail", "Canvas", "Blackboard", "D2L Brightspace", "Moodle", "Microsoft OneDrive", "Notion", "YouTube", "Zoom transcripts"];

function SettingsContent() {
  const hydrated = useHydrated();
  const searchParams = useSearchParams();
  const profile = useStudyGenieStore(useShallow((s) => s.profile));
  const updateProfile = useStudyGenieStore(useShallow((s) => s.updateProfile));
  const resetAll = useStudyGenieStore(useShallow((s) => s.resetAll));
  const [connected, setConnected] = useState<string[]>([]);
  const [confirmingReset, setConfirmingReset] = useState(false);

  if (!hydrated) return null;

  function toggleAvailability(day: string) {
    const has = profile.studyAvailability.includes(day);
    updateProfile({ studyAvailability: has ? profile.studyAvailability.filter((d) => d !== day) : [...profile.studyAvailability, day] });
  }

  function toggleIntegration(name: string) {
    setConnected((c) => (c.includes(name) ? c.filter((x) => x !== name) : [...c, name]));
  }

  function exportData() {
    const all = localStorage.getItem("studygenie-storage");
    const blob = new Blob([all ?? "{}"], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "studygenie-data-export.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Settings" title="Settings" description="Your account, preferences, and data controls." />

      <Tabs defaultValue={searchParams.get("tab") ?? "profile"}>
        <TabsList className="flex-wrap">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="ai">AI &amp; Language</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Full name</Label>
                <Input className="mt-1.5" value={profile.name} onChange={(e) => updateProfile({ name: e.target.value })} placeholder="Your name" />
              </div>
              <div>
                <Label>Email</Label>
                <Input className="mt-1.5" value={profile.email} onChange={(e) => updateProfile({ email: e.target.value })} placeholder="you@school.edu" />
              </div>
              <div className="flex items-center justify-between rounded-[var(--radius-md)] border border-border bg-surface p-4 sm:col-span-2">
                <div>
                  <div className="text-sm font-medium text-foreground">Dark mode</div>
                  <div className="text-xs text-muted-foreground">StudyGenie is dark-first — switch to light anytime.</div>
                </div>
                <Switch checked={profile.theme === "dark"} onCheckedChange={(v) => updateProfile({ theme: v ? "dark" : "light" })} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning">
          <Card>
            <CardHeader>
              <CardTitle>Learning preferences &amp; study availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Label>Preferred learning style</Label>
                <Select value={profile.learningStyle} onValueChange={(v) => updateProfile({ learningStyle: v as LearningStyle })}>
                  <SelectTrigger className="mt-1.5 max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LEARNING_STYLES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>When do you study best?</Label>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {DAY_OPTIONS.map((d) => (
                    <button
                      key={d}
                      onClick={() => toggleAvailability(d)}
                      className={`focus-ring rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                        profile.studyAvailability.includes(d) ? "border-electric bg-electric-soft text-electric" : "border-border bg-surface text-muted-foreground"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {["Deadline reminders", "Daily study plan digest", "Weak-topic nudges", "Focus Room check-ins"].map((n) => (
                <div key={n} className="flex items-center justify-between rounded-[var(--radius-md)] border border-border bg-surface p-4">
                  <span className="text-sm text-foreground">{n}</span>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>AI model &amp; language preferences</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>AI model preference</Label>
                <Select value={profile.aiModel} onValueChange={(v) => updateProfile({ aiModel: v as UserProfile["aiModel"] })}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {AI_MODELS.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="mt-1.5 text-xs text-muted-foreground">Requires an API key connected on the backend once available.</p>
              </div>
              <div>
                <Label>Language</Label>
                <Input className="mt-1.5" value={profile.language} onChange={(e) => updateProfile({ language: e.target.value })} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessibility">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {["Larger text", "High-contrast mode", "Reduce motion", "Screen reader optimizations"].map((n) => (
                <div key={n} className="flex items-center justify-between rounded-[var(--radius-md)] border border-border bg-surface p-4">
                  <span className="text-sm text-foreground">{n}</span>
                  <Switch />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {INTEGRATIONS.map((name) => (
                  <div key={name} className="flex items-center justify-between rounded-[var(--radius-md)] border border-border bg-surface p-4">
                    <span className="text-sm text-foreground">{name}</span>
                    <Button size="sm" variant={connected.includes(name) ? "outline" : "primary"} onClick={() => toggleIntegration(name)}>
                      {connected.includes(name) ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Connections here are simulated in this prototype — real OAuth wiring plugs in per integration.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-electric" /> Data privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Everything you&apos;ve created lives in this browser for this prototype. You own it — export it or delete it anytime.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={exportData}>
                  <Download className="h-4 w-4" /> Export all my data
                </Button>
                {confirmingReset ? (
                  <>
                    <Button variant="danger" onClick={() => { resetAll(); setConfirmingReset(false); }}>
                      Confirm delete everything
                    </Button>
                    <Button variant="ghost" onClick={() => setConfirmingReset(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="danger" onClick={() => setConfirmingReset(true)}>
                    <Trash2 className="h-4 w-4" /> Delete all my data
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {PLANS.map((p) => (
                  <button
                    key={p}
                    onClick={() => updateProfile({ plan: p })}
                    className={`focus-ring rounded-[var(--radius-md)] border p-4 text-left transition-colors ${
                      profile.plan === p ? "border-electric bg-electric-soft" : "border-border bg-surface hover:bg-surface-hover"
                    }`}
                  >
                    <div className="text-sm font-semibold text-foreground">{p}</div>
                    {profile.plan === p && <Badge variant="electric" className="mt-2">Current</Badge>}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Billing via Stripe connects once the backend is wired up — plan selection here is stored locally for this prototype.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={null}>
      <SettingsContent />
    </Suspense>
  );
}
