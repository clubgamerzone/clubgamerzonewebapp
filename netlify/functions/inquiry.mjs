const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'Access-Control-Allow-Origin': 'https://clubgamerzone.com',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const clean = (value, maximum) => typeof value === 'string' ? value.trim().slice(0, maximum) : '';
const projectTypes = new Set(['Software or app', 'Website or platform', 'AI integration or automation', 'Video game or interactive', 'Other']);

const handler = async request => {
  if (request.method === 'OPTIONS') return new Response('', { status: 204, headers });
  if (request.method !== 'POST') return Response.json({ error: 'Method not allowed.' }, { status: 405, headers });

  const intakeUrl = process.env.SIGNALDESK_INTAKE_URL;
  const intakeToken = process.env.SIGNALDESK_INTAKE_TOKEN;
  if (!intakeUrl || !intakeToken) return Response.json({ error: 'Inquiry delivery is not configured.' }, { status: 503, headers });

  try {
    const body = await request.json();
    const name = clean(body.name, 120);
    const email = clean(body.email, 254).toLowerCase();
    const projectType = clean(body.project_type, 120);
    const message = clean(body.message, 3000);
    if (clean(body.bot_field, 100)) return Response.json({ accepted: true }, { status: 202, headers });
    if (!name || !email || !message || !body.consent || !/^\S+@\S+\.\S+$/.test(email) || !projectTypes.has(projectType)) {
      return Response.json({ error: 'Please complete the required inquiry fields.' }, { status: 400, headers });
    }

    const response = await fetch(intakeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-SignalDesk-Intake-Token': intakeToken },
      body: JSON.stringify({
        workspace: 'clubgamerzone',
        product: 'ClubGamerZone website',
        name,
        email,
        phone: clean(body.phone, 40),
        project_type: projectType,
        message,
        locale: body.locale === 'es' ? 'es' : 'en',
        page_url: clean(body.page_url, 500),
        utm_source: clean(body.utm_source, 120),
        utm_medium: clean(body.utm_medium, 120),
        utm_campaign: clean(body.utm_campaign, 160),
        consent: true,
        loaded_at: Number(body.loaded_at),
        bot_field: '',
      }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error('SignalDesk intake rejected the inquiry:', response.status, result?.error || 'Unknown error');
      return Response.json({ error: 'We could not save your inquiry right now.' }, { status: 502, headers });
    }
    return Response.json({ accepted: true }, { status: 201, headers });
  } catch (error) {
    console.error('Inquiry function error:', error instanceof Error ? error.message : 'Unknown error');
    return Response.json({ error: 'We could not save your inquiry right now.' }, { status: 500, headers });
  }
};

export default handler;
