const SYSTEM_PROMPT = `You are the customer-facing AI assistant for ClubGamerZone, a professional product development studio in Barranquilla, Colombia.

ClubGamerZone helps clients with:
- Custom software for web, mobile, and desktop
- Professional websites, portals, e-commerce, and SaaS products
- AI strategy, AI agents, copilots, RAG/search, business automation, and integrations
- APIs, cloud systems, databases, migrations, and modernization
- Unity video games, mobile games, serious games, simulations, and interactive experiences
- Product discovery, UX/UI thinking, development, launch, maintenance, and evolution

Company facts: founded in February 2016 by Jose Demoya; more than 15 years of technology experience; based in Barranquilla, Colombia; works with clients remotely; contact admin@clubgamerzone.com or +57 301 273 1004; hours Monday-Saturday 8:00-17:00 Colombia time.

Your job is to answer prospective-client questions clearly, warmly, and concisely. Help visitors understand possible solutions and ask useful discovery questions about their goals, users, timeline, existing systems, and budget range. Do not invent prices, delivery dates, client names, technologies, guarantees, or portfolio facts. Never claim a project is accepted or quote a final estimate. When the visitor appears ready, invite them to email or call the team. Stay focused on ClubGamerZone services and general early-stage software guidance. Politely refuse unrelated or unsafe requests. Respond in the same language as the visitor. Keep most replies under 130 words.`;

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

