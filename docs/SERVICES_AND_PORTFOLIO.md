# Services and portfolio maintenance

The homepage and the dedicated `/services` route are implemented in `app/page.tsx`. The application uses a lightweight pathname check instead of a routing dependency; Netlify's catch-all redirect in `netlify.toml` serves the same application at `/services`.

## Services

English and Spanish service copy lives in the `content` object under `services` and `servicesPage`. The five service groups are:

1. AI integration and automation
2. Custom software development
3. Web and mobile applications
4. Games and interactive experiences
5. Product and project leadership

The homepage service cards link to `/services`. The dedicated route includes full deliverables and a separate leadership/accountability section.

## Portfolio

Projects are maintained in the typed `projects` array near the top of `app/page.tsx`. Each item has a category, bilingual type and optional summary, image, link, and `featured` flag.

The initial featured set is Currículo Claro, Organify, Data Purging Software, Veolia Heavy Clues, Hell Cemetery, and Instruments of Faith. Remaining projects appear in the secondary archive. The filter categories are AI and automation, business software, web and mobile, games and interactive, and enterprise/client work.

The Data Purging Software card is deliberately labeled as a private desktop automation project and links to the inquiry section. Replace that public name, description, status, and link when the exact product identity is confirmed.

Project artwork is stored in `public/assets`. `curriculo-claro.png` comes from the CV project's social card, and `organify.png` comes from Organify's production app icon.

## Insights and responsive design

The `insights` content block contains the selected technical articles. Layout and responsive rules for Services, portfolio filters/cards, Insights, and mobile views are in `app/globals.css`.

## Validation

From the repository root:

```powershell
npm run build
npm run lint
npm run dev
```

Check both `/` and `/services`, switch EN/ES, and exercise every portfolio filter before publishing.
