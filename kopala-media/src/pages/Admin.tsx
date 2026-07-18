import { useState } from "react";
import { Download, Trash2, Lock, Mail, Activity, Users } from "lucide-react";
import { SEO } from "@/components/layout/SEO";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  getLeads, setLeadStatus, updateLead, deleteLead, getEmailLog, getEventLog,
  leadsToCsv, download,
} from "@/features/leads/store";
import { LEAD_STATUSES, type Lead, type LeadStatus } from "@/features/leads/types";

/**
 * Lead pipeline dashboard (§48). Passphrase gate is an interim control until
 * server-side auth exists — see docs/operations/admin.md.
 */

const statusColors: Record<LeadStatus, string> = {
  New: "bg-gold/15 text-gold-bright border-gold/40",
  Contacted: "bg-blue-500/15 text-blue-300 border-blue-400/30",
  Qualified: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  "Discovery Scheduled": "bg-violet-500/15 text-violet-300 border-violet-400/30",
  "Proposal Sent": "bg-amber-500/15 text-amber-300 border-amber-400/30",
  Won: "bg-green-500/20 text-green-300 border-green-400/40",
  Lost: "bg-red-500/15 text-red-300 border-red-400/30",
  Nurture: "bg-ivory/10 text-ivory/70 border-ivory/20",
};

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("km.admin") === "1");
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState(false);
  const [tab, setTab] = useState<"leads" | "emails" | "events">("leads");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [, force] = useState(0);
  const refresh = () => force((n) => n + 1);

  // Read directly each render — the dashboard re-renders on every mutation.
  const leads = authed ? getLeads() : [];
  const emails = authed ? getEmailLog() : [];
  const events = authed ? getEventLog() : [];

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === site.adminPassphrase) {
      sessionStorage.setItem("km.admin", "1");
      setAuthed(true);
    } else {
      setPassError(true);
    }
  };

  if (!authed) {
    return (
      <section className="section-pad">
        <SEO title="Lead Dashboard | Kopala Media" description="Private lead pipeline dashboard." path="/admin" noindex />
        <div className="container-x max-w-md">
          <form onSubmit={login} className="rounded-2xl border border-ivory/10 bg-graphite/60 p-8">
            <Lock className="h-8 w-8 text-gold" aria-hidden="true" />
            <h1 className="mt-4 font-display text-2xl font-bold text-ivory">Lead dashboard</h1>
            <p className="mt-2 text-sm text-warmgray">Enter the owner passphrase to continue.</p>
            <label htmlFor="pass" className="field-label mt-6">Passphrase</label>
            <input
              id="pass"
              type="password"
              className="field"
              value={pass}
              onChange={(e) => { setPass(e.target.value); setPassError(false); }}
              autoComplete="current-password"
            />
            {passError && <p role="alert" className="field-error">Incorrect passphrase.</p>}
            <button type="submit" className="btn-gold mt-5 w-full">Open dashboard</button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 sm:py-14">
      <SEO title="Lead Dashboard | Kopala Media" description="Private lead pipeline dashboard." path="/admin" noindex />
      <div className="container-x">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-ivory">Lead pipeline</h1>
            <p className="mt-1 text-sm text-warmgray">
              {leads.length} lead{leads.length === 1 ? "" : "s"} · stored on this device · export anytime
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => download(`kopala-leads-${new Date().toISOString().slice(0, 10)}.csv`, leadsToCsv(leads))}
              className="btn-outline !px-4 !py-2 text-xs"
              disabled={leads.length === 0}
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" /> Export CSV
            </button>
            <button
              type="button"
              onClick={() => download(`kopala-leads-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(leads, null, 2), "application/json")}
              className="btn-outline !px-4 !py-2 text-xs"
              disabled={leads.length === 0}
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" /> Export JSON
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div role="tablist" aria-label="Dashboard views" className="mt-8 flex gap-2">
          {([
            ["leads", `Leads (${leads.length})`, Users],
            ["emails", `Email log (${emails.length})`, Mail],
            ["events", `Events (${events.length})`, Activity],
          ] as const).map(([key, label, Icon]) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-display text-sm font-medium transition-colors",
                tab === key ? "border-gold bg-gold/10 text-gold-bright" : "border-ivory/15 text-warmgray hover:text-ivory",
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" /> {label}
            </button>
          ))}
        </div>

        {tab === "leads" && (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
            {/* Lead list */}
            <div className="flex flex-col gap-3">
              {leads.length === 0 && (
                <div className="rounded-2xl border border-dashed border-ivory/20 p-10 text-center text-sm text-warmgray">
                  No leads yet. Submissions from the contact form, assessment, and booking requests appear here.
                </div>
              )}
              {leads.map((lead) => (
                <button
                  key={lead.id}
                  type="button"
                  onClick={() => setSelected(lead)}
                  className={cn(
                    "rounded-2xl border p-5 text-left transition-colors",
                    selected?.id === lead.id ? "border-gold/60 bg-graphite" : "border-ivory/10 bg-graphite/50 hover:border-ivory/25",
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-display text-base font-semibold text-ivory">
                      {lead.firstName} {lead.lastName}
                      {lead.businessName && <span className="text-warmgray"> · {lead.businessName}</span>}
                    </p>
                    <span className={cn("rounded-full border px-2.5 py-0.5 text-[11px] font-semibold", statusColors[lead.status])}>
                      {lead.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-warmgray">
                    {lead.formType} · {new Date(lead.createdAt).toLocaleString("en-US", { timeZone: "America/Chicago" })} CT · source: {lead.leadSource}
                  </p>
                </button>
              ))}
            </div>

            {/* Lead detail */}
            <div>
              {selected ? (
                <div className="rounded-2xl border border-ivory/10 bg-graphite/60 p-6">
                  <h2 className="font-display text-xl font-bold text-ivory">
                    {selected.firstName} {selected.lastName}
                  </h2>
                  <dl className="mt-4 grid gap-x-6 gap-y-2.5 text-sm sm:grid-cols-2">
                    {([
                      ["Email", selected.email],
                      ["Phone", selected.phone],
                      ["Business", selected.businessName],
                      ["Type", selected.businessType],
                      ["Location", selected.location],
                      ["Website", selected.currentWebsite],
                      ["Budget", selected.budgetRange],
                      ["Timeline", selected.timeline],
                      ["Contact via", selected.preferredContactMethod],
                      ["Services", selected.servicesInterested?.join(", ")],
                      ["Outcomes", selected.desiredOutcomes?.join(", ")],
                      ["UTM", [selected.utm.source, selected.utm.medium, selected.utm.campaign].filter(Boolean).join(" / ")],
                    ] as [string, string | undefined][]).filter(([, v]) => v).map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-xs uppercase tracking-wider text-warmgray">{k}</dt>
                        <dd className="mt-0.5 text-ivory/90">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  {selected.message && (
                    <div className="mt-4">
                      <dt className="text-xs uppercase tracking-wider text-warmgray">Message</dt>
                      <dd className="mt-1 rounded-lg bg-charcoal p-3 text-sm text-ivory/90">{selected.message}</dd>
                    </div>
                  )}

                  {/* Status + next action */}
                  <div className="mt-6 border-t border-ivory/10 pt-5">
                    <label htmlFor="status" className="field-label">Lead status</label>
                    <select
                      id="status"
                      className="field"
                      value={selected.status}
                      onChange={(e) => {
                        setLeadStatus(selected.id, e.target.value as LeadStatus);
                        setSelected(getLeads().find((l) => l.id === selected.id) ?? null);
                        refresh();
                      }}
                    >
                      {LEAD_STATUSES.map((s) => (
                        <option key={s} value={s} className="bg-charcoal">{s}</option>
                      ))}
                    </select>
                    <label htmlFor="nextAction" className="field-label mt-4">Next action</label>
                    <input
                      id="nextAction"
                      className="field"
                      defaultValue={selected.nextAction ?? ""}
                      placeholder="e.g. Send proposal by Friday"
                      onBlur={(e) => {
                        updateLead(selected.id, { nextAction: e.target.value }, e.target.value ? `Next action set: ${e.target.value}` : undefined);
                        refresh();
                      }}
                    />
                  </div>

                  {/* History */}
                  <div className="mt-6 border-t border-ivory/10 pt-5">
                    <h3 className="font-display text-sm font-semibold text-ivory">History</h3>
                    <ul className="mt-3 flex flex-col gap-2">
                      {selected.history.map((h, i) => (
                        <li key={i} className="text-xs text-warmgray">
                          <span className="text-ivory/70">{new Date(h.at).toLocaleString("en-US", { timeZone: "America/Chicago" })}</span> — {h.note}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Delete this lead permanently?")) {
                        deleteLead(selected.id);
                        setSelected(null);
                        refresh();
                      }
                    }}
                    className="mt-6 inline-flex items-center gap-2 text-xs text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" /> Delete lead
                  </button>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-ivory/20 p-10 text-center text-sm text-warmgray">
                  Select a lead to view details, update status, and set next actions.
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "emails" && (
          <div className="mt-6 flex flex-col gap-3">
            <p className="text-sm text-warmgray">
              Confirmation and notification emails are rendered and logged here. Delivery activates
              when an email provider is connected — see docs/integrations/email.md.
            </p>
            {emails.length === 0 && (
              <div className="rounded-2xl border border-dashed border-ivory/20 p-10 text-center text-sm text-warmgray">
                No emails logged yet.
              </div>
            )}
            {emails.map((em) => (
              <details key={em.id} className="rounded-2xl border border-ivory/10 bg-graphite/50 p-5">
                <summary className="cursor-pointer font-display text-sm font-semibold text-ivory">
                  <span className={cn("mr-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", em.status === "sent" ? "bg-emerald-500/20 text-emerald-300" : em.status === "failed" ? "bg-red-500/20 text-red-300" : "bg-amber-500/20 text-amber-300")}>
                    {em.status}
                  </span>
                  {em.subject}
                  <span className="ml-2 text-xs font-normal text-warmgray">
                    → {em.to} · {new Date(em.createdAt).toLocaleString("en-US", { timeZone: "America/Chicago" })}
                  </span>
                </summary>
                <pre className="mt-4 max-h-64 overflow-auto rounded-lg bg-charcoal p-4 text-xs text-warmgray whitespace-pre-wrap">{em.text}</pre>
              </details>
            ))}
          </div>
        )}

        {tab === "events" && (
          <div className="mt-6">
            <p className="text-sm text-warmgray">Analytics events recorded on this device (also pushed to the GTM dataLayer when configured).</p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-ivory/10">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-graphite">
                  <tr>
                    <th className="px-4 py-3 font-display text-ivory">Event</th>
                    <th className="px-4 py-3 font-display text-ivory">Detail</th>
                    <th className="px-4 py-3 font-display text-ivory">Time (CT)</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((ev, i) => (
                    <tr key={i} className={i % 2 ? "bg-graphite/40" : "bg-charcoal"}>
                      <td className="px-4 py-2.5 font-mono text-xs text-gold-bright">{ev.name}</td>
                      <td className="px-4 py-2.5 text-xs text-warmgray">{ev.detail ? JSON.stringify(ev.detail) : "—"}</td>
                      <td className="px-4 py-2.5 text-xs text-warmgray">{new Date(ev.at).toLocaleString("en-US", { timeZone: "America/Chicago" })}</td>
                    </tr>
                  ))}
                  {events.length === 0 && (
                    <tr><td colSpan={3} className="px-4 py-8 text-center text-sm text-warmgray">No events recorded yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
