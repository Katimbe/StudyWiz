import { site } from "@/config/site";
import type { Lead, EmailLogEntry } from "../leads/types";
import { appendEmailLog, uid } from "../leads/store";
import { customerConfirmation, internalNotification } from "./templates";

/**
 * Email provider adapter (§27, §29).
 *
 * Delivery activates when a transactional provider (Resend / SendGrid / Gmail
 * API) is connected via the serverless endpoint described in .env.example and
 * docs/integrations/email.md. Until then, every message is rendered and
 * captured in the email log (visible in /admin) — so the complete workflow is
 * testable end-to-end and nothing is silently lost.
 */

const DELIVERY_ENDPOINT = import.meta.env.VITE_EMAIL_ENDPOINT as string | undefined;

async function deliver(entry: EmailLogEntry): Promise<EmailLogEntry> {
  if (!DELIVERY_ENDPOINT) return entry; // stays "queued" in the log
  try {
    const res = await fetch(DELIVERY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: entry.to,
        subject: entry.subject,
        html: entry.html,
        text: entry.text,
        kind: entry.kind,
      }),
    });
    if (!res.ok) throw new Error(`Email endpoint responded ${res.status}`);
    return { ...entry, status: "sent" };
  } catch (err) {
    // Log failure without sensitive payload contents.
    return {
      ...entry,
      status: "failed",
      error: err instanceof Error ? err.message : "Unknown email error",
    };
  }
}

export async function sendLeadEmails(lead: Lead): Promise<void> {
  const confirmation = customerConfirmation(lead);
  const notification = internalNotification(lead);

  const entries: EmailLogEntry[] = [
    {
      id: uid(),
      leadId: lead.id,
      kind: "customer-confirmation",
      to: lead.email,
      ...confirmation,
      status: "queued",
      createdAt: new Date().toISOString(),
    },
    {
      id: uid(),
      leadId: lead.id,
      kind: "internal-notification",
      to: site.emailNotificationsTo || `internal:${site.name}`,
      ...notification,
      status: "queued",
      createdAt: new Date().toISOString(),
    },
  ];

  for (const entry of entries) {
    const result = await deliver(entry);
    appendEmailLog(result);
  }
}
