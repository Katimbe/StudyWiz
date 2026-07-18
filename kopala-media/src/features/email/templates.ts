import { site } from "@/config/site";
import type { Lead } from "../leads/types";

/** Brand-styled HTML + plain-text email templates (§27). */

const esc = (v: string | undefined) =>
  String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const shell = (title: string, body: string) => `<!doctype html>
<html><body style="margin:0;padding:0;background:#0B0B0D;font-family:Inter,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 20px;">
    <div style="text-align:center;padding-bottom:24px;">
      <img src="${site.url}/brand/kopala-media-logo-sm.png" alt="Kopala Media" width="120" style="display:inline-block;" />
    </div>
    <div style="background:#141418;border:1px solid rgba(245,241,232,.1);border-radius:16px;padding:32px;color:#F5F1E8;">
      <h1 style="font-family:'Space Grotesk',Arial,sans-serif;font-size:22px;color:#E3C766;margin:0 0 16px;">${title}</h1>
      ${body}
    </div>
    <p style="color:#A8A29A;font-size:12px;text-align:center;padding-top:24px;">
      Kopala Media · ${esc(site.serviceArea)}<br/>
      <a href="${site.url}/privacy" style="color:#C9A227;">Privacy Policy</a>
    </p>
  </div>
</body></html>`;

export function customerConfirmation(lead: Lead): { subject: string; html: string; text: string } {
  const name = esc(lead.firstName);
  const business = lead.businessName ? ` at ${esc(lead.businessName)}` : "";
  const isAssessment = lead.formType === "assessment";
  const subject = isAssessment
    ? "We've received your Business Assessment — Kopala Media"
    : "We've received your message — Kopala Media";
  const body = `
    <p style="line-height:1.7;margin:0 0 16px;">Hi ${name},</p>
    <p style="line-height:1.7;margin:0 0 16px;">
      Thank you for ${isAssessment ? "completing the Business Assessment" : "reaching out"}${business}.
      This email confirms we've received ${isAssessment ? "your assessment" : "your inquiry"}.
    </p>
    <p style="line-height:1.7;margin:0 0 16px;"><strong style="color:#E3C766;">What happens next</strong><br/>
      We review every ${isAssessment ? "assessment" : "inquiry"} personally and respond within
      1–2 business days. ${isAssessment ? "We'll come to the conversation already understanding your situation." : ""}
    </p>
    <p style="line-height:1.7;margin:0 0 16px;">
      If you'd like to talk sooner, you can
      <a href="${site.url}/book" style="color:#C9A227;">book a Business Discovery Call</a> at a time that suits you.
    </p>
    <p style="line-height:1.7;margin:0;">Warm regards,<br/><strong>Katimbe Kabezya</strong><br/>Founder, Kopala Media</p>`;
  const text = `Hi ${lead.firstName},\n\nThank you for ${isAssessment ? "completing the Business Assessment" : "reaching out"}${lead.businessName ? ` at ${lead.businessName}` : ""}. This confirms we've received your ${isAssessment ? "assessment" : "inquiry"}.\n\nWhat happens next: we review every message personally and respond within 1–2 business days.\n\nBook a Discovery Call: ${site.url}/book\n\nWarm regards,\nKatimbe Kabezya\nFounder, Kopala Media\n\nPrivacy: ${site.url}/privacy`;
  return { subject, html: shell(subject, body), text };
}

export function internalNotification(lead: Lead): { subject: string; html: string; text: string } {
  const subject = `New ${lead.formType} lead: ${lead.firstName} ${lead.lastName ?? ""}${lead.businessName ? ` — ${lead.businessName}` : ""}`.trim();
  const rows: [string, string | undefined][] = [
    ["Name", `${lead.firstName} ${lead.lastName ?? ""}`.trim()],
    ["Business", lead.businessName],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Location", lead.location],
    ["Form", lead.formType],
    ["Services", lead.servicesInterested?.join(", ")],
    ["Primary challenge", lead.primaryChallenge ?? lead.biggestResponseChallenge],
    ["Budget", lead.budgetRange],
    ["Timeline", lead.timeline],
    ["Preferred contact", lead.preferredContactMethod],
    ["Lead source", lead.leadSource],
    ["UTM", [lead.utm.source, lead.utm.medium, lead.utm.campaign].filter(Boolean).join(" / ")],
    ["Message", lead.message],
    ["Submitted", new Date(lead.createdAt).toLocaleString("en-US", { timeZone: "America/Chicago" }) + " CT"],
    ["Lead ID", lead.id],
  ];
  const body = `<table style="width:100%;border-collapse:collapse;font-size:14px;">${rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;color:#A8A29A;vertical-align:top;border-bottom:1px solid rgba(245,241,232,.08);white-space:nowrap;">${k}</td><td style="padding:8px 12px;color:#F5F1E8;border-bottom:1px solid rgba(245,241,232,.08);">${esc(v)}</td></tr>`,
    )
    .join("")}</table>`;
  const text = rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
  return { subject, html: shell(subject, body), text };
}
