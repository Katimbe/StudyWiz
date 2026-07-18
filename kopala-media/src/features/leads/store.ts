import type { Lead, LeadInput, LeadFormType, LeadStatus, EmailLogEntry, AnalyticsEvent } from "./types";

/**
 * Lead store — repository-pattern persistence.
 * Current backend: browser localStorage (works with zero infrastructure and
 * makes the full workflow testable). The interface is deliberately shaped so
 * a serverless endpoint / Supabase / Postgres adapter can replace the storage
 * functions without touching UI code. See docs/architecture/lead-storage.md.
 */

const LEADS_KEY = "km.leads.v1";
const EMAIL_KEY = "km.emailLog.v1";
const EVENTS_KEY = "km.events.v1";
const RATE_KEY = "km.rate.v1";

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or unavailable — never silently discard: caller keeps state */
  }
};

export const uid = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export function getLeads(): Lead[] {
  return read<Lead[]>(LEADS_KEY, []);
}

export function getLead(id: string): Lead | undefined {
  return getLeads().find((l) => l.id === id);
}

function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  return {
    leadSource: document.referrer
      ? new URL(document.referrer).hostname
      : params.get("utm_source") ?? "direct",
    referrer: document.referrer || undefined,
    utm: {
      source: params.get("utm_source") ?? undefined,
      medium: params.get("utm_medium") ?? undefined,
      campaign: params.get("utm_campaign") ?? undefined,
      content: params.get("utm_content") ?? undefined,
    },
  };
}

export function createLead(input: LeadInput, formType: LeadFormType, payloadHash?: string): Lead {
  const now = new Date().toISOString();
  const lead: Lead = {
    ...input,
    id: uid(),
    formType,
    payloadHash,
    ...captureAttribution(),
    consentAt: now,
    status: "New",
    createdAt: now,
    updatedAt: now,
    history: [{ at: now, note: `Lead created via ${formType} form` }],
  };
  const leads = getLeads();
  leads.unshift(lead);
  write(LEADS_KEY, leads);
  return lead;
}

export function updateLead(id: string, patch: Partial<Lead>, note?: string): Lead | undefined {
  const leads = getLeads();
  const idx = leads.findIndex((l) => l.id === id);
  if (idx === -1) return undefined;
  const now = new Date().toISOString();
  const updated: Lead = {
    ...leads[idx],
    ...patch,
    updatedAt: now,
    history: note
      ? [...leads[idx].history, { at: now, note }]
      : leads[idx].history,
  };
  leads[idx] = updated;
  write(LEADS_KEY, leads);
  return updated;
}

export function setLeadStatus(id: string, status: LeadStatus) {
  return updateLead(id, { status }, `Status changed to ${status}`);
}

export function deleteLead(id: string) {
  write(LEADS_KEY, getLeads().filter((l) => l.id !== id));
}

/* ---------- duplicate + rate limiting ---------- */

async function hash(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Returns an existing recent lead if this looks like a duplicate submission. */
export async function findDuplicate(email: string, payloadKey: string): Promise<Lead | undefined> {
  const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
  const h = await hashPayload(payloadKey);
  return getLeads().find(
    (l) =>
      new Date(l.createdAt).getTime() >= dayAgo &&
      l.email.toLowerCase() === email.toLowerCase() &&
      l.payloadHash === h,
  );
}

export const hashPayload = hash;

const RATE_LIMIT = { max: 5, windowMs: 60 * 60 * 1000 }; // 5 submissions / hour / browser

export function checkRateLimit(): { ok: boolean; retryAfterMinutes?: number } {
  const stamps = read<number[]>(RATE_KEY, []).filter((t) => Date.now() - t < RATE_LIMIT.windowMs);
  if (stamps.length >= RATE_LIMIT.max) {
    const oldest = Math.min(...stamps);
    return { ok: false, retryAfterMinutes: Math.ceil((RATE_LIMIT.windowMs - (Date.now() - oldest)) / 60000) };
  }
  stamps.push(Date.now());
  write(RATE_KEY, stamps);
  return { ok: true };
}

/* ---------- spam checks ---------- */

export interface SpamSignals {
  honeypot: string; // must be empty
  elapsedMs: number; // time between form render and submit
}

export function looksLikeSpam(s: SpamSignals): boolean {
  if (s.honeypot.trim() !== "") return true;
  if (s.elapsedMs < 1500) return true; // impossibly fast fill
  return false;
}

/* ---------- email log ---------- */

export function getEmailLog(): EmailLogEntry[] {
  return read<EmailLogEntry[]>(EMAIL_KEY, []);
}

export function appendEmailLog(entry: EmailLogEntry) {
  const log = getEmailLog();
  log.unshift(entry);
  write(EMAIL_KEY, log.slice(0, 200));
}

/* ---------- analytics event log (pre-GTM verification) ---------- */

export function getEventLog(): AnalyticsEvent[] {
  return read<AnalyticsEvent[]>(EVENTS_KEY, []);
}

export function appendEvent(event: AnalyticsEvent) {
  const log = getEventLog();
  log.unshift(event);
  write(EVENTS_KEY, log.slice(0, 300));
}

/* ---------- export ---------- */

export function leadsToCsv(leads: Lead[]): string {
  const cols = [
    "id", "createdAt", "status", "formType", "firstName", "lastName", "email", "phone",
    "businessName", "businessType", "location", "currentWebsite", "primaryChallenge",
    "budgetRange", "timeline", "preferredContactMethod", "leadSource",
    "utm.source", "utm.medium", "utm.campaign", "message",
  ] as const;
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const rows = leads.map((l) =>
    cols.map((c) => {
      if (c.startsWith("utm.")) return esc(l.utm[c.slice(4) as keyof typeof l.utm]);
      return esc(l[c as keyof Lead]);
    }).join(","),
  );
  return [cols.join(","), ...rows].join("\n");
}

export function download(filename: string, content: string, type = "text/csv") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
