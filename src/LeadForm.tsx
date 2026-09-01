import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import type { Locale } from '../app/page';

const copy = {
  en: {
    types: [['Software or app', 'Software or app'], ['Website or platform', 'Website or platform'], ['AI integration or automation', 'AI integration or automation'], ['Video game or interactive', 'Video game or interactive'], ['Other', 'Other']],
    thankYou: 'Thank you — we’ll be in touch.', received: 'Your idea is in good hands. A ClubGamerZone team member will review it and reply soon.', another: 'Send another inquiry', kicker: 'Project inquiry', heading: 'Tell us what’s on your mind.', name: 'Your name', namePlaceholder: 'How should we address you?', email: 'Email', help: 'What can we help with?', select: 'Select a project type', idea: 'Tell us about your idea', ideaPlaceholder: 'What do you want to build, who is it for, and what would success look like?', sending: 'Sending…', send: 'Send project inquiry', error: 'We couldn’t send this form. Please email admin@clubgamerzone.com.', privacy: 'We’ll only use your details to respond to this inquiry.', honeypot: 'Don’t fill this out:',
  },
  es: {
    types: [['Software or app', 'Software o aplicación'], ['Website or platform', 'Sitio web o plataforma'], ['AI integration or automation', 'Integración de IA o automatización'], ['Video game or interactive', 'Videojuego o experiencia interactiva'], ['Other', 'Otro']],
    thankYou: 'Gracias — pronto nos pondremos en contacto.', received: 'Tu idea está en buenas manos. Un miembro de ClubGamerZone la revisará y te responderá pronto.', another: 'Enviar otra consulta', kicker: 'Consulta de proyecto', heading: 'Cuéntanos qué tienes en mente.', name: 'Tu nombre', namePlaceholder: '¿Cómo debemos llamarte?', email: 'Correo electrónico', help: '¿En qué podemos ayudarte?', select: 'Selecciona un tipo de proyecto', idea: 'Cuéntanos sobre tu idea', ideaPlaceholder: '¿Qué quieres construir, para quién es y cómo se vería un resultado exitoso?', sending: 'Enviando…', send: 'Enviar consulta', error: 'No pudimos enviar el formulario. Escríbenos a admin@clubgamerzone.com.', privacy: 'Solo usaremos tus datos para responder a esta consulta.', honeypot: 'No completes este campo:',
  },
} as const;

export default function LeadForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  const c = copy[locale];

  async function submit(form: HTMLFormElement) {
    setStatus('sending');
    try {
      const fields = Object.fromEntries(new FormData(form).entries()) as Record<string,string>;
      const response = await fetch('/', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:new URLSearchParams(fields).toString() });
      if (!response.ok) throw new Error('Submission failed');
      form.reset();
      setStatus('sent');
    } catch { setStatus('error'); }
  }

  if (status === 'sent') return <div className="lead-success"><CheckCircle2 size={34}/><h3>{c.thankYou}</h3><p>{c.received}</p><button onClick={()=>setStatus('idle')}>{c.another}</button></div>;

  return <form className="lead-form" name="project-inquiry" data-netlify="true" onSubmit={event=>{event.preventDefault();void submit(event.currentTarget);}}>
    <input type="hidden" name="form-name" value="project-inquiry" />
    <div className="form-heading"><span>{c.kicker}</span><h3>{c.heading}</h3></div>
    <label><span>{c.name}</span><input name="name" required autoComplete="name" placeholder={c.namePlaceholder} /></label>
    <label><span>{c.email}</span><input name="email" type="email" required autoComplete="email" placeholder="you@company.com" /></label>
    <label><span>{c.help}</span><select name="projectType" required defaultValue=""><option value="" disabled>{c.select}</option>{c.types.map(([value,label])=><option value={value} key={value}>{label}</option>)}</select></label>
    <label><span>{c.idea}</span><textarea name="message" required rows={4} maxLength={1500} placeholder={c.ideaPlaceholder} /></label>
    <label className="honeypot">{c.honeypot} <input name="bot-field" /></label>
    <button className="button button-primary" type="submit" disabled={status==='sending'}>{status==='sending'?c.sending:c.send} <ArrowRight size={18}/></button>
    {status==='error'&&<p className="form-error">{c.error}</p>}
    <small>{c.privacy}</small>
  </form>;
}
