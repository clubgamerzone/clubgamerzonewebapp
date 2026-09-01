# Translation and mobile maintenance

The public site supports English (`en`) and Spanish (`es`) from the language control in the header.

## Where translations live

- Main page, navigation, services, work, process, company, and contact copy: `app/page.tsx`, inside the `content` object.
- Contact form labels, options, success, and error messages: `src/LeadForm.tsx`, inside the `copy` object.
- AI assistant greeting, suggestions, controls, and connection message: `src/ChatWidget.tsx`, inside the `copy` object.

Every English key must have a Spanish equivalent. Project names remain unchanged, while each project's `type` contains localized `en` and `es` values.

## Language behavior

- The browser language is used for a first-time visitor.
- The visitor's selection is stored in local storage as `cgz-language`.
- Spanish can be linked directly with `?lang=es`.
- The page's HTML `lang` attribute changes with the selected language.

## Responsive behavior

Responsive rules are at the end of `app/globals.css`.

- Desktop shows the primary navigation, language selector, and project call to action.
- Tablet and mobile use an accessible menu button and navigation panel.
- Small screens receive single-column services, capabilities, work, process, about, and contact layouts.
- Form controls use touch-friendly sizing and 16px text to prevent mobile browser zoom.
- The AI chat panel uses the dynamic viewport height on mobile.

## Validation

Run `npm run build` after changing translations or responsive styles. Check both languages and narrow widths before publishing.
