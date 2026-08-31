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

Once connected, each push to the production branch triggers a new deployment. No database, server, or runtime secrets are required for the current site.

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
