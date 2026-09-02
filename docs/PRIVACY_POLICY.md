# ClubGamerZone privacy policy implementation

## Public location

- Production path: `https://clubgamerzone.com/privacy-policy`
- Page component: `src/PrivacyPolicy.tsx`
- Route selection: `app/page.tsx`
- Styling: the `Privacy policy` block near the end of `app/globals.css`

The page supports English and Spanish with the same language preference used by the rest of the site. It is responsive, has a mobile layout, includes a table of contents on larger screens and links back to the main site.

## Where the policy is linked

- Main website footer
- Services page footer
- Project inquiry form disclosure
- AI inquiry assistant disclosure

## Current website data inventory

- Language preference: stored locally in the visitor's browser as `cgz-language`.
- Project inquiry form: builds a WhatsApp message locally. The visitor reviews it before choosing whether to send it through WhatsApp.
- AI inquiry assistant: sends up to the last ten chat messages, each limited to 600 characters, to `/.netlify/functions/chat`. The function forwards the necessary conversation to the configured AI provider and does not intentionally write the conversation to a ClubGamerZone database.
- Hosting: Netlify may process ordinary request, operational and security logs.
- No Google Analytics, Meta Pixel, AdSense or other marketing tracker was found in the website code when this policy was created on September 2, 2026.

## Product coverage

The policy is intentionally written as an umbrella notice for ClubGamerZone websites, client services, software, mobile and desktop apps, games, AI-enabled features, analytics, Firebase, AdMob, stores, purchases and support. It states that these services are used only where relevant to a particular product.

A product-specific notice must be added when an app or game:

- is directed to children or knowingly handles children's data;
- collects precise location, contacts, photos, camera, microphone, health, biometric or other sensitive information;
- has user accounts, user-generated content or social/multiplayer features;
- uses materially different advertising, tracking or profiling;
- handles financial information or payments outside an app store;
- makes automated decisions with legal or similarly significant effects;
- uses a provider or purpose not reasonably covered by the umbrella policy.

The app-store privacy form or Data Safety form must match the actual SDKs and runtime behavior of each released build. This website policy does not replace those declarations.

## Account and personal-data deletion

The public policy includes a dedicated bilingual section explaining how users can delete an account and request deletion of personal information. It also explains that:

- deleting an installed app or clearing local device data does not delete an online account;
- permanent deletion may remove saved content, progress and access and may not be reversible;
- information may be retained only when legally required or otherwise permitted for obligations such as tax, accounting, dispute, security and fraud prevention;
- protected backup copies may remain until the normal overwrite cycle completes; and
- deleting a ClubGamerZone account may not cancel a subscription purchased through Apple, Google or another platform.

For Apple platforms, policy text and an email address are not sufficient by themselves. Every iOS or iPadOS app that supports account creation, including automatically generated or guest accounts, must provide an easy-to-find way to initiate permanent account deletion from within the app. In ordinary products, users must not be required to call or email support as the only deletion path. A confirmation or reauthentication step is appropriate, and a direct link to a web deletion flow may be used where applicable. Temporary deactivation alone does not meet Apple's requirement.

Recommended implementation for each account-based product:

1. Add `Delete account` / `Eliminar cuenta` under Account, Profile, Privacy or Settings.
2. Explain what will be permanently removed, what must be retained and what happens to purchases or subscriptions.
3. Reauthenticate the user or require a clear confirmation before submitting the request.
4. Delete or anonymize the account and associated personal data across the product database, authentication provider, storage and relevant processors, except for documented lawful retention.
5. Revoke active sessions and Sign in with Apple tokens where applicable.
6. Confirm completion to the user or state the expected processing period when deletion is handled asynchronously.
7. Keep `admin@clubgamerzone.com` as the recovery route for users who cannot access their accounts and for separate personal-data requests.

## Maintenance checklist

1. Audit SDKs, environment variables, server functions, network destinations and requested permissions before each material release.
2. Update both English and Spanish copies in `src/PrivacyPolicy.tsx`.
3. Change the effective date shown in both languages.
4. Update this data inventory if analytics, advertising pixels, databases, forms or new AI providers are added.
5. Verify `/privacy-policy` on desktop and mobile, including language switching and every footer/form/chat link.
6. Recheck Google Play, Apple App Store and advertising-platform disclosures for each product.
7. For every product with registration, test that the in-app deletion control permanently deletes or anonymizes the account and associated data rather than only disabling access.
8. Verify that subscription-cancellation instructions are accurate for the store or payment system used by that product.
9. Obtain legal review for regulated data, children's products or material international expansion.

## Legal reference points used

- Colombia: Law 1581 of 2012 and guidance from the Superintendence of Industry and Commerce concerning access, correction, deletion, authorization withdrawal and complaints.
- European users: GDPR transparency, access, correction, deletion, restriction, objection and portability concepts.
- California users: consumer notice, access, deletion, correction and opt-out concepts where applicable.
- Children: COPPA requirements may apply to commercial websites, apps and games directed to children under 13 or when the operator has actual knowledge of collection from a child under 13.
- Apple: App Store Review Guideline 5.1.1(v) and Apple's account-deletion guidance require apps that support account creation to let users initiate deletion from within the app.

This implementation is a practical general policy based on the observed website and the product categories described by ClubGamerZone. It should be reviewed by qualified counsel when a product processes regulated or unusually sensitive information.
