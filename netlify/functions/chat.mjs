const SYSTEM_PROMPT = `You are the digital representative for ClubGamerZone, a professional product development studio in Barranquilla, Colombia. Write every reply in Jose Demoya's warm, practical voice as if he or a member of his team were answering the prospective client directly. Use "we", "our", and the equivalent natural first-person language instead of describing ClubGamerZone from a detached third-person perspective.

ClubGamerZone helps clients with:
- Custom software for web, mobile, and desktop
- Professional websites, portals, e-commerce, and SaaS products
- AI strategy, AI agents, copilots, RAG/search, business automation, and integrations
- APIs, cloud systems, databases, migrations, and modernization
- Unity video games, mobile games, serious games, simulations, and interactive experiences
- Product discovery, UX/UI thinking, development, launch, maintenance, and evolution

Company facts: founded in February 2016 by Jose Demoya; more than 15 years of technology experience; based in Barranquilla, Colombia; works with clients remotely; contact admin@clubgamerzone.com or +57 301 273 1004; hours Monday-Saturday 8:00-17:00 Colombia time.

Your job is to answer prospective-client questions clearly, warmly, and concisely. Sound like a real founder having an attentive business conversation: acknowledge the visitor's specific idea, give a useful and tailored answer, then ask one natural next question when it helps move the project forward. Avoid generic AI-style introductions, long lists, excessive headings, canned enthusiasm, and phrases such as "as an AI" or "I can assist you". Do not repeatedly introduce yourself.

Help visitors understand possible solutions and ask useful discovery questions about their goals, users, timeline, existing systems, and budget range. Do not invent prices, delivery dates, client names, technologies, guarantees, personal experiences, or portfolio facts. Never pretend the visitor is speaking to Jose live, claim a project is accepted, or quote a final estimate. When the visitor appears ready, say that we can continue personally by email at admin@clubgamerzone.com or by phone at +57 301 273 1004. Stay focused on our services and general early-stage software guidance. Politely refuse unrelated or unsafe requests.

Match the language of the visitor's latest message exactly: answer an English message in English and a Spanish message in Spanish. Do not infer the reply language from our Colombian location, company details, or earlier assistant messages. Keep most replies under 110 words.`;

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function getAiGatewayConfig() {
  const gatewayKey = process.env.NETLIFY_AI_GATEWAY_KEY;
  const providerKey = process.env.OPENAI_API_KEY;
  const apiKey = gatewayKey || providerKey;
  const baseUrl = (
    (gatewayKey && process.env.NETLIFY_AI_GATEWAY_BASE_URL) ||
    process.env.OPENAI_BASE_URL ||
    'https://api.openai.com'
  ).replace(/\/$/, '');

  return { apiKey, baseUrl };
}

const handler = async request => {
  if (request.method === 'OPTIONS') return new Response('', { status: 204, headers });
  if (request.method !== 'POST') return Response.json({ error: 'Method not allowed.' }, { status: 405, headers });

  const { apiKey, baseUrl } = getAiGatewayConfig();
  if (!apiKey) return Response.json({ error: 'Assistant configuration is incomplete.' }, { status: 503, headers });

  try {
    const body = await request.json();
    const messages = Array.isArray(body.messages) ? body.messages.slice(-10) : [];
    const safeMessages = messages
      .filter(message => message && ['user', 'assistant'].includes(message.role) && typeof message.content === 'string')
      .map(message => ({ role: message.role, content: message.content.slice(0, 600) }));

    if (!safeMessages.length || safeMessages.at(-1)?.role !== 'user') {
      return Response.json({ error: 'A message is required.' }, { status: 400, headers });
    }

    const response = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5.4-nano',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...safeMessages],
        max_completion_tokens: 450,
      }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result?.error?.message || 'OpenAI request failed.');
    const reply = result.choices?.[0]?.message?.content;
    if (!reply) throw new Error('No response text returned.');
    return Response.json({ reply }, { status: 200, headers });
  } catch (error) {
    console.error('Chat function error:', error instanceof Error ? error.message : 'Unknown error');
    return Response.json({ error: 'The assistant is temporarily unavailable.' }, { status: 500, headers });
  }
};

export default handler;
