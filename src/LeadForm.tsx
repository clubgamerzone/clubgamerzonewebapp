import { ArrowRight, CheckCircle2, LoaderCircle, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import type { Locale } from '../app/page';

const WHATSAPP_NUMBER = '573054839092';

const copy = {
  en: {
    types: [['Software or app', 'Software or app'], ['Website or platform', 'Website or platform'], ['AI integration or automation', 'AI integration or automation'], ['Video game or interactive', 'Video game or interactive'], ['Other', 'Other']],
    thankYou: 'We received your project inquiry.', received: 'Your details are now safely in our project pipeline. We’ll review them personally and contact you using the information provided.', another: 'Send another inquiry', whatsapp: 'Also continue in WhatsApp', kicker: 'Project inquiry', heading: 'Tell us what’s on your mind.', name: 'Your name', namePlaceholder: 'How should we address you?', email: 'Email', phone: 'WhatsApp phone (optional)', phonePlaceholder: 'Include country code, e.g. +1 555 123 4567', help: 'What can we help with?', select: 'Select a project type', idea: 'Tell us about your idea', ideaPlaceholder: 'What do you want to build, who is it for, and what would success look like?', send: 'Send project inquiry', sending: 'Sending securely…', error: 'We couldn’t save your inquiry. Please message +57 305 483 9092 or email admin@clubgamerzone.com.', consent: 'I agree that ClubGamerZone may store these details and contact me about this project inquiry.', privacy: 'We use these details only to review and follow up on your inquiry.', policy: 'Privacy Policy', honeypot: 'Don’t fill this out:',
  },
  es: {
    types: [['Software or app', 'Software o aplicación'], ['Website or platform', 'Sitio web o plataforma'], ['AI integration or automation', 'Integración de IA o automatización'], ['Video game or interactive', 'Videojuego o experiencia interactiva'], ['Other', 'Otro']],
    thankYou: 'Recibimos tu consulta de proyecto.', received: 'Tus datos ya están guardados de forma segura en nuestro proceso de proyectos. Los revisaremos personalmente y te contactaremos usando la información proporcionada.', another: 'Enviar otra consulta', whatsapp: 'Continuar también por WhatsApp', kicker: 'Consulta de proyecto', heading: 'Cuéntanos qué tienes en mente.', name: 'Tu nombre', namePlaceholder: '¿Cómo debemos llamarte?', email: 'Correo electrónico', phone: 'Teléfono de WhatsApp (opcional)', phonePlaceholder: 'Incluye el código del país, ej. +57 300 123 4567', help: '¿En qué podemos ayudarte?', select: 'Selecciona un tipo de proyecto', idea: 'Cuéntanos sobre tu idea', ideaPlaceholder: '¿Qué quieres construir, para quién es y cómo se vería un resultado exitoso?', send: 'Enviar consulta de proyecto', sending: 'Enviando de forma segura…', error: 'No pudimos guardar tu consulta. Escríbenos al +57 305 483 9092 o a admin@clubgamerzone.com.', consent: 'Acepto que ClubGamerZone guarde estos datos y me contacte sobre esta consulta de proyecto.', privacy: 'Usamos estos datos solamente para revisar y dar seguimiento a tu consulta.', policy: 'Política de privacidad', honeypot: 'No completes este campo:',
  },
} as const;

export default function LeadForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<'idle'|'sent'|'error'>('idle');
  const [submitting, setSubmitting] = useState(false);
  const [loadedAt, setLoadedAt] = useState(() => Date.now());
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const c = copy[locale];

  async function submit(form: HTMLFormElement) {
    setSubmitting(true);
    setStatus('idle');
    try {
      const fields = Object.fromEntries(new FormData(form).entries()) as Record<string,string>;
      const query = new URLSearchParams(window.location.search);
      const response = await fetch('/.netlify/functions/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          phone: fields.phone,
          project_type: fields.projectType,
          message: fields.message,
          consent: fields.consent === 'yes',
          locale,
          page_url: window.location.href,
          utm_source: query.get('utm_source') || '',
          utm_medium: query.get('utm_medium') || '',
          utm_campaign: query.get('utm_campaign') || '',
          loaded_at: loadedAt,
          bot_field: fields['bot-field'] || '',
        }),
      });
      const result = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) throw new Error(result.error || 'Inquiry submission failed');

      const labels = locale === 'es'
        ? { title: 'Nueva consulta de proyecto', name: 'Nombre', email: 'Correo', phone: 'WhatsApp de contacto', type: 'Tipo de proyecto', idea: 'Idea' }
        : { title: 'New project inquiry', name: 'Name', email: 'Email', phone: 'Contact WhatsApp', type: 'Project type', idea: 'Idea' };
      const message = [`*${labels.title} — ClubGamerZone*`, '', `*${labels.name}:* ${fields.name}`, `*${labels.email}:* ${fields.email}`, fields.phone ? `*${labels.phone}:* ${fields.phone}` : '', `*${labels.type}:* ${fields.projectType}`, '', `*${labels.idea}:*`, fields.message].filter(Boolean).join('\n');
      setWhatsappUrl(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`);
      form.reset();
      setLoadedAt(Date.now());
      setStatus('sent');
    } catch {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  }

  if (status === 'sent') return <div className="lead-success"><CheckCircle2 size={34}/><h3>{c.thankYou}</h3><p>{c.received}</p><a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={17}/>{c.whatsapp}</a><button onClick={()=>setStatus('idle')}>{c.another}</button></div>;

  return <form className="lead-form" name="project-inquiry" onSubmit={event=>{event.preventDefault();void submit(event.currentTarget);}}>
    <div className="form-heading"><span>{c.kicker}</span><h3>{c.heading}</h3></div>
    <label><span>{c.name}</span><input name="name" required autoComplete="name" maxLength={120} placeholder={c.namePlaceholder} /></label>
    <label><span>{c.email}</span><input name="email" type="email" required autoComplete="email" maxLength={254} placeholder="you@company.com" /></label>
    <label><span>{c.phone}</span><input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder={c.phonePlaceholder} /></label>
    <label><span>{c.help}</span><select name="projectType" required defaultValue=""><option value="" disabled>{c.select}</option>{c.types.map(([value,label])=><option value={value} key={value}>{label}</option>)}</select></label>
    <label><span>{c.idea}</span><textarea name="message" required rows={4} maxLength={3000} placeholder={c.ideaPlaceholder} /></label>
    <label className="consent-field"><input name="consent" type="checkbox" value="yes" required /><span>{c.consent}</span></label>
    <label className="honeypot">{c.honeypot} <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
    <button className="button button-primary" type="submit" disabled={submitting}>{submitting ? <><LoaderCircle className="spin" size={18}/>{c.sending}</> : <>{c.send}<ArrowRight size={18}/></>}</button>
    {status==='error'&&<p className="form-error">{c.error}</p>}
    <small>{c.privacy} <a href="/privacy-policy">{c.policy}</a></small>
  </form>;
}
