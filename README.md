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

The hero motion system is implemented entirely in `app/page.tsx` and `app/globals.css`: layered ambient light, drifting grid and particles, staggered content reveals, a multi-ring product orbit, data labels, and reduced-motion fallbacks. No animation library is required.
- Project inquiry form and submission states: `src/LeadForm.tsx`

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

## Customer inquiries

The contact section provides three ways to reach ClubGamerZone: a Netlify Forms project-inquiry form, direct email/phone links, and the AI assistant. `index.html` contains the hidden static form definition Netlify needs for build-time form detection; `src/LeadForm.tsx` contains the visible React form and its success/error states. Submissions appear in **Netlify → clubgamerzone-webapp → Forms**.

The public portfolio section lists only projects and client work that were already presented on the previous public ClubGamerZone website. Add a client name only after confirming that the relationship may be advertised publicly.

### Verified portfolio image mapping

Portfolio artwork is matched to the project headings on the previous public `/gamedevelopment/` page, rather than inferred from old local filenames:

- `instruments-of-faith-v2.jpg` → Instruments of Faith
- `save-the-pets.png` → Save the Pets
- `word-crush.jpg` → Word Crush — Languages
- `goal-music-v2.jpg` → The Goal Music
- `animatch-v2.webp` → Animatch
- `verneverse.png` → Verneverse
- `golden-buddha.png` → Golden Buddha
- `space-blast.png` → Space Blast
- `veolia.png` → Veolia — Heavy Clues
- `hell-cemetery.png` → Hell Cemetery

### Verified portfolio links

Project cards and the compact portfolio list reuse the public destinations from the previous `/gamedevelopment/` page. Hell Cemetery, Instruments of Faith, The Goal Music, Verneverse, Animatch, Save the Pets, Space Blast, and Word Crush open their verified store or live-project pages in a new tab. Golden Buddha's old Netlify demo currently returns `404`, and the Veolia detail page would disappear when `clubgamerzone.com` moves away from WordPress, so those two cards lead to the site's inquiry section instead of a broken destination.

## Domain and email safety

The website can be pointed to Netlify by changing only the web records for `clubgamerzone.com` and `www`. Do **not** remove or replace MX, SPF, DKIM, DMARC, `mail`, `webmail`, or other email-related DNS records. Using Netlify for the website does not replace email hosting.

Before changing DNS:

1. Confirm the Netlify preview URL works on desktop and mobile.
2. Record the current DNS zone.
3. Add the exact A/ALIAS/CNAME values Netlify provides for the custom domain.
4. Leave all mail records untouched.
5. Test the root domain, `www`, inbound email, and outbound email after propagation.

### Current custom-domain setup (2026-08-31)

`clubgamerzone.com` and `www.clubgamerzone.com` are attached to the Netlify project and awaiting external DNS verification. Netlify provided these records:

- Apex/root `A`: `75.2.60.5`
- `www` `CNAME`: `clubgamerzone-webapp.netlify.app`

On 2026-08-31, GoDaddy accepted the nameserver change from the Baby pair (`ns8521.hostgator.com` / `ns8522.hostgator.com`) to the Business pair (`hgns1.hostgator.com` / `hgns2.hostgator.com`). The `.com` parent delegation already reports the Business pair, while recursive caches may continue returning the Baby pair until their TTL expires.

The Business cPanel zone has the Netlify root `A` and `www` CNAME above, plus its existing Business mail records (`MX` to `mail.clubgamerzone.com`, `mail` A to `192.254.227.41`, and its SPF, DKIM, DMARC, autodiscovery, and related records). A post-change check found that the zone's own apex `NS` records still return the Baby pair even when queried directly through `hgns1`/`hgns2`. Update those two zone records to `hgns1.hostgator.com` and `hgns2.hostgator.com` in Business cPanel, then recheck the authoritative and public answers. Do not delete or replace the Business mail records.

HostGator support was contacted on 2026-08-31. The GoDaddy screenshot showing `hgns1`/`hgns2` was provided. The agent initially attributed the mismatch to the normal 24–48 hour propagation window; we clarified that direct queries to both authoritative Business servers still return the Baby NS pair and requested verification or escalation to the backend DNS team. The chat was still awaiting their technical response at the end of this check.

Do not cancel the Baby plan until the public NS answers show the Business pair, the root and `www` load from Netlify with valid HTTPS, and inbound/outbound mail tests succeed through the migrated Business mailboxes.

## Content source

Company history, contact information, social links, and selected project names/art were adapted from the prior public `clubgamerzone.com` website. The generated Open Graph artwork uses the same dark, aqua, and lime visual direction as the new site.
