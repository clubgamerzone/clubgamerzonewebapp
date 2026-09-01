# AI chat configuration and troubleshooting

The customer chat interface is in `src/ChatWidget.tsx`. It sends the latest conversation messages to `/.netlify/functions/chat`.

The server-side implementation is `netlify/functions/chat.mjs`. It uses Netlify AI Gateway at request time and never exposes credentials to the browser.

## Conversation voice

The system prompt answers in Jose Demoya's warm, practical voice while representing ClubGamerZone with first-person language such as “we” and “our.” Replies should feel like a concise founder conversation: acknowledge the visitor's specific idea, give useful guidance, and ask one natural discovery question. Avoid generic AI-style introductions, long canned lists, invented personal experiences, and repeated self-introductions.

Language is determined from the visitor's latest message, not from ClubGamerZone's Colombian location or earlier assistant messages. English questions receive English answers and Spanish questions receive Spanish answers.

The widget remains transparent that the conversation is AI-powered, while making clear that the team personally confirms project details and estimates. Its English and Spanish greeting, launcher, status, and disclaimer copy live in `src/ChatWidget.tsx`.

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
