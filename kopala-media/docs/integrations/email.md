# Email Workflow Guide

## What runs today

Every form submission produces two fully-rendered emails:

1. **Customer confirmation** — branded HTML + plain text; uses the customer's
   name and business name, explains next steps, sets a 1–2 business-day
   expectation, includes a booking link and privacy link.
2. **Internal notification** — all lead fields, source, UTM data, timestamp (CT),
   and lead ID.

Both are stored in the **email log** (`/admin` → "Email log") with status
`queued`. Nothing is lost and the entire workflow is testable today.

## Activating live delivery (one endpoint)

Set `VITE_EMAIL_ENDPOINT` (see `.env.example`) to a serverless function that
accepts:

```json
POST { "to": "...", "subject": "...", "html": "...", "text": "...", "kind": "customer-confirmation" }
```

and sends through your provider. A minimal Resend example (Node):

```js
export default async function handler(req, res) {
  const { to, subject, html, text } = req.body;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: "Kopala Media <hello@yourdomain.com>", to, subject, html, text }),
  });
  res.status(r.ok ? 200 : 502).end();
}
```

- The API key lives **only** on the server — never in this app.
- Failures are logged (`status: failed`) without message contents and shown in `/admin`.
- Set the internal notification recipient in `src/config/site.ts` (`emailNotificationsTo`).

## Credentials required from the owner

- Email provider choice (Resend recommended; SendGrid/Gmail API also fine)
- Verified sender domain/address
- Internal notification recipient address
