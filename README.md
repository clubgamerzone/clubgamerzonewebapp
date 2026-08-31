# ClubGamerZone Web App

Professional marketing site for ClubGamerZone, focused on software development, AI integration, apps, cloud platforms, and interactive/game products.

## Where everything lives

- Page content and sections: `app/page.tsx`
- Visual design and responsive rules: `app/globals.css`
- Browser/SEO metadata: `index.html`
- Social sharing image: `public/og.png`
- Existing ClubGamerZone project art and logo: `public/assets/`
- Netlify build rules and security headers: `netlify.toml`
- React entry point: `src/main.tsx`
- Customer AI chat interface: `src/ChatWidget.tsx`
- Secure AI server function and business knowledge: `netlify/functions/chat.mjs`

## Local development

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Production validation

```bash
npm run lint
npm run build
npm run preview
```

The production-ready static site is generated in `dist/`. Netlify is configured to run `npm run build` and publish `dist`.

## Deployment

The intended workflow is Netlify continuous deployment from the GitHub repository:

`https://github.com/clubgamerzone/clubgamerzonewebapp`

Once connected, each push to the production branch triggers a new deployment. The marketing pages need no database; the AI assistant requires the server-side secret described below.

## Customer AI assistant

The floating chat widget sends recent conversation messages to a Netlify Function. The function—not the visitor's browser—calls OpenAI's Responses API. This protects the API key and keeps the ClubGamerZone business instructions in server-side code.

Required Netlify environment variable:

- `OPENAI_API_KEY`: a project API key created in the OpenAI Platform. Mark it as a secret and do not put it in GitHub or client code.

Optional environment variable:

- `OPENAI_MODEL`: defaults to `gpt-5.4-nano`, chosen for a fast, economical customer-inquiry experience.

After adding or changing an environment variable in Netlify, trigger a new deploy. To change the assistant's services, tone, contact information, or qualification questions, edit `SYSTEM_PROMPT` in `netlify/functions/chat.mjs`.

The function limits the browser to the latest ten messages, caps each message at 600 characters, caps model output, disables API response storage, and avoids promising prices or schedules. The interface falls back to ClubGamerZone's email and phone number if the AI service is unavailable.

## Domain and email safety

The website can be pointed to Netlify by changing only the web records for `clubgamerzone.com` and `www`. Do **not** remove or replace MX, SPF, DKIM, DMARC, `mail`, `webmail`, or other email-related DNS records. Using Netlify for the website does not replace email hosting.

Before changing DNS:

1. Confirm the Netlify preview URL works on desktop and mobile.
2. Record the current DNS zone.
3. Add the exact A/ALIAS/CNAME values Netlify provides for the custom domain.
4. Leave all mail records untouched.
5. Test the root domain, `www`, inbound email, and outbound email after propagation.

## Content source

Company history, contact information, social links, and selected project names/art were adapted from the prior public `clubgamerzone.com` website. The generated Open Graph artwork uses the same dark, aqua, and lime visual direction as the new site.
