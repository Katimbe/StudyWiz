import type { Lead, LeadStatus } from "../leads/types";

/**
 * CRM adapter boundary (§25, §29).
 * The website is not coupled to any CRM vendor. Implement this interface for
 * HubSpot (or another provider) and activate with credentials — the lead
 * pipeline keeps working unchanged in the meantime. Field mapping table lives
 * in docs/integrations/crm.md.
 */

export interface CrmAdapter {
  name: string;
  upsertLead(lead: Lead): Promise<{ externalId?: string }>;
  updateStatus(leadId: string, status: LeadStatus): Promise<void>;
  logActivity(leadId: string, note: string): Promise<void>;
}

/** No-op adapter — system of record remains the built-in pipeline. */
export const internalCrm: CrmAdapter = {
  name: "internal-pipeline",
  async upsertLead() {
    return {};
  },
  async updateStatus() {},
  async logActivity() {},
};

/** HubSpot-ready adapter stub — activate with credentials (see docs). */
export const hubSpotAdapter = (/* credentials via env on the server */): CrmAdapter => ({
  name: "hubspot",
  async upsertLead() {
    throw new Error("HubSpot adapter not yet activated — see docs/integrations/crm.md");
  },
  async updateStatus() {},
  async logActivity() {},
});

export const activeCrm: CrmAdapter = internalCrm;
