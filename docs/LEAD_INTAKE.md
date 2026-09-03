# ClubGamerZone project-inquiry delivery

## User flow

1. A visitor completes the bilingual project form and explicitly agrees to storage and follow-up.
2. The browser sends the form to `netlify/functions/inquiry.mjs` on the ClubGamerZone site.
3. The server validates required fields, length limits, the honeypot and form timing.
4. The server forwards the inquiry to SignalDesk using a protected shared token that is never sent to the browser.
5. SignalDesk resolves the `clubgamerzone` workspace and `ClubGamerZone website` product, then creates a `new_inquiry` lead.
6. The visitor sees a confirmation and may optionally continue with the same details in WhatsApp.

## Protected Netlify configuration

Configure these values only in the ClubGamerZone Netlify environment:

- `SIGNALDESK_INTAKE_URL=https://signaldeskcrm.netlify.app/api/public-lead-intake`
- `SIGNALDESK_INTAKE_TOKEN=<same generated secret configured in SignalDesk>`

The SignalDesk environment requires the same `SIGNALDESK_INTAKE_TOKEN`, plus its existing `SUPABASE_URL` and a server-only `SUPABASE_SERVICE_ROLE_KEY`.

Never add these secret values to Git, browser variables, screenshots, ordinary CRM records or this document.

## Captured attribution

The form records name, email, optional phone, project type, project description, language, page URL and the `utm_source`, `utm_medium` and `utm_campaign` query parameters. The initial source is `Website form` and the CRM stage is `new_inquiry`.

## Privacy behavior

The consent checkbox is required. WhatsApp is optional after the CRM confirms receipt. The privacy policy explains both transfers. The server does not log the visitor's submitted fields.
