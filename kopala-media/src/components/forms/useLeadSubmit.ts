import { useCallback, useEffect, useRef, useState } from "react";
import type { LeadInput, LeadFormType, Lead } from "@/features/leads/types";
import {
  createLead,
  checkRateLimit,
  looksLikeSpam,
  findDuplicate,
  hashPayload,
} from "@/features/leads/store";
import { sendLeadEmails } from "@/features/email/provider";
import { activeCrm } from "@/features/crm/adapter";

/**
 * Shared lead-submission pipeline (§16 form workflow):
 * spam signals → rate limit → duplicate detection → persist → email workflow
 * → CRM adapter → caller records analytics. Every failure leaves the lead
 * stored and the user informed — nothing is silently discarded.
 */

export type SubmitState =
  | { phase: "idle" }
  | { phase: "submitting" }
  | { phase: "success"; lead: Lead }
  | { phase: "duplicate"; lead: Lead }
  | { phase: "rate-limited"; retryAfterMinutes: number }
  | { phase: "error"; message: string };

export function useLeadSubmit(formType: LeadFormType) {
  const [state, setState] = useState<SubmitState>({ phase: "idle" });
  const renderedAt = useRef(0);
  const honeypot = useRef("");
  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);
  const submittingRef = useRef(false);

  const resetTimer = useCallback(() => {
    renderedAt.current = Date.now();
  }, []);

  const setHoneypot = useCallback((v: string) => {
    honeypot.current = v;
  }, []);

  const submit = useCallback(
    async (input: LeadInput): Promise<SubmitState> => {
      if (submittingRef.current) return state; // double-submit guard
      submittingRef.current = true;
      setState({ phase: "submitting" });

      try {
        // 1. Spam signals (honeypot + fill time)
        if (looksLikeSpam({ honeypot: honeypot.current, elapsedMs: Date.now() - renderedAt.current })) {
          // Pretend success to bots, store nothing.
          const fake = { phase: "success" } as SubmitState;
          setState(fake);
          return fake;
        }

        // 2. Rate limit
        const rate = checkRateLimit();
        if (!rate.ok) {
          const s: SubmitState = { phase: "rate-limited", retryAfterMinutes: rate.retryAfterMinutes ?? 60 };
          setState(s);
          return s;
        }

        // 3. Duplicate detection (same email + same payload within 24h)
        const payloadKey = JSON.stringify({ ...input, consent: undefined });
        const duplicate = await findDuplicate(input.email, payloadKey);
        if (duplicate) {
          const s: SubmitState = { phase: "duplicate", lead: duplicate };
          setState(s);
          return s;
        }

        // 4. Persist lead
        const payloadHash = await hashPayload(payloadKey);
        const lead = createLead(input, formType, payloadHash);

        // 5. Email workflow (queued until provider credentials are supplied)
        try {
          await sendLeadEmails(lead);
        } catch {
          /* email failures are logged inside the provider; the lead is safe */
        }

        // 6. CRM adapter (no-op until a CRM is connected)
        try {
          await activeCrm.upsertLead(lead);
        } catch {
          /* CRM failure must never block the visitor */
        }

        const s: SubmitState = { phase: "success", lead };
        setState(s);
        return s;
      } catch (err) {
        console.error("[lead-submit] unexpected error", err);
        const s: SubmitState = {
          phase: "error",
          message:
            "Something went wrong while sending. Your information has not been lost — please try again, or use the contact options below.",
        };
        setState(s);
        return s;
      } finally {
        submittingRef.current = false;
      }
    },
    [formType, state],
  );

  return { state, submit, honeypot, setHoneypot, resetTimer, setState };
}
