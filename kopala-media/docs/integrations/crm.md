# CRM Integration Guide

The website is deliberately **not coupled to a CRM vendor**. Until one is
chosen, the built-in pipeline (`/admin`) is the system of record and exports
clean CSV/JSON.

## Adapter contract

`src/features/crm/adapter.ts` defines:

```ts
interface CrmAdapter {
  upsertLead(lead: Lead): Promise<{ externalId?: string }>;
  updateStatus(leadId: string, status: LeadStatus): Promise<void>;
  logActivity(leadId: string, note: string): Promise<void>;
}
```

Statuses: New · Contacted · Qualified · Discovery Scheduled · Proposal Sent ·
Won · Lost · Nurture.

## HubSpot field mapping (ready to apply)

| Lead field | HubSpot contact/company property |
|---|---|
| firstName / lastName | firstname / lastname |
| email | email |
| phone | phone |
| businessName | associated company → name |
| businessType | company → industry (custom) |
| location | city / state (split) |
| currentWebsite | website |
| budgetRange | custom: budget_range |
| timeline | custom: desired_timeline |
| servicesInterested | custom: services_interested (multi-checkbox) |
| desiredOutcomes | custom: desired_outcomes (multi-checkbox) |
| leadSource / utm.* | hs_analytics_source or custom utm_* properties |
| status | custom: km_lead_status (mirrors pipeline stages) |
| formType | custom: km_form_type |
| message | notes / custom: message |

## Activation steps

1. Choose CRM (HubSpot recommended for the planned feature set).
2. Create the custom properties above.
3. Implement the adapter against your serverless endpoint (credentials stay
   server-side) and set it as `activeCrm`.
4. Keep the internal pipeline as backup — the adapter failure path never blocks
   a visitor.
