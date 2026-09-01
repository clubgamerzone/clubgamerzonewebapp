# AI chat configuration and troubleshooting

The customer chat interface is in `src/ChatWidget.tsx`. It sends the latest conversation messages to `/.netlify/functions/chat`.

The server-side implementation is `netlify/functions/chat.mjs`. It uses Netlify AI Gateway at request time and never exposes credentials to the browser.

## Conversation voice

The system prompt answers in Jose Demoya's warm, practical voice while representing ClubGamerZone with first-person language such as “we” and “our.” Replies should feel like a concise founder conversation: acknowledge the visitor's specific idea, give useful guidance, and ask one natural discovery question. Avoid generic AI-style introductions, long canned lists, invented personal experiences, and repeated self-introductions.

Language is determined from the visitor's latest message, not from ClubGamerZone's Colombian location or earlier assistant messages. English questions receive English answers and Spanish questions receive Spanish answers.

The widget remains transparent that the conversation is AI-powered, while making clear that the team personally confirms project details and estimates. Its English and Spanish greeting, launcher, status, and disclaimer copy live in `src/ChatWidget.tsx`.

## Scope boundary

The chat is a commercial project-inquiry assistant, not a general-purpose assistant. It may discuss ClubGamerZone services, portfolio, delivery process, contact information, prospective development projects, and quotation requests. It must redirect general knowledge, news, politics, entertainment, personal advice, schoolwork, trivia, unrelated technical support, and standalone coding or debugging requests without answering them.

Quotation conversations gather the goal, users, features, platforms, integrations, timeline, and budget range. The assistant never invents a numeric price or final delivery date; the ClubGamerZone team confirms the final quotation personally.

## WhatsApp inquiry handoff

The project form in `src/LeadForm.tsx` opens a WhatsApp conversation with the temporary contact number `+57 305 483 9092`. It pre-fills the visitor's name, email, optional WhatsApp number, project type, and description. The visitor reviews the message and taps Send; no message is transmitted silently and no WhatsApp API credentials are stored in the website.

An automated WhatsApp AI conversation is a separate integration. It requires a WhatsApp Business Platform number, a webhook/serverless endpoint, Meta credentials stored as server-side environment variables, and conversation/privacy controls. The existing web assistant's scope and qualification prompt can be reused, but the channel should not be presented as active until those credentials and the business number are configured and tested.

## Credentials

The function prefers Netlify's runtime-injected variables:

- `NETLIFY_AI_GATEWAY_KEY`
- `NETLIFY_AI_GATEWAY_BASE_URL`

It can also use provider variables when a private OpenAI key is deliberately configured:

- `OPENAI_API_KEY`
- `OPENAI_BASE_URL`
- `OPENAI_MODEL` (optional; defaults to `gpt-5.4-nano`)

Do not commit API keys to the repository. Netlify AI Features must be enabled for the team and the project must have a production deployment for AI Gateway credentials to be injected.

## Verification

Send a POST request to `https://clubgamerzone.com/.netlify/functions/chat` with JSON shaped like:

```json
{
  "messages": [{ "role": "user", "content": "How can AI help my business?" }]
}
```

A healthy response has HTTP status `200` and a JSON `reply`. A `503` response means the gateway/provider credentials were not injected. A `500` response means the provider call failed; inspect the Netlify function log without logging credentials or full customer conversations.

