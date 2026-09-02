import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import type { Locale } from '../app/page';

const WHATSAPP_NUMBER = '573054839092';

const copy = {
  en: {
    types: [['Software or app', 'Software or app'], ['Website or platform', 'Website or platform'], ['AI integration or automation', 'AI integration or automation'], ['Video game or interactive', 'Video game or interactive'], ['Other', 'Other']],
    thankYou: 'Your WhatsApp inquiry is ready.', received: 'WhatsApp opened with your project details. Review the message and tap Send so we can receive it.', another: 'Prepare another inquiry', kicker: 'Project inquiry', heading: 'Tell us what’s on your mind.', name: 'Your name', namePlaceholder: 'How should we address you?', email: 'Email', phone: 'WhatsApp phone (optional)', phonePlaceholder: 'Include country code, e.g. +1 555 123 4567', help: 'What can we help with?', select: 'Select a project type', idea: 'Tell us about your idea', ideaPlaceholder: 'What do you want to build, who is it for, and what would success look like?', send: 'Continue in WhatsApp', error: 'We couldn’t open WhatsApp. Please message +57 305 483 9092 or email admin@clubgamerzone.com.', privacy: 'Your details are placed in a WhatsApp message for you to review before sending.', policy: 'Privacy Policy', honeypot: 'Don’t fill this out:',
  },
  es: {
    types: [['Software or app', 'Software o aplicación'], ['Website or platform', 'Sitio web o plataforma'], ['AI integration or automation', 'Integración de IA o automatización'], ['Video game or interactive', 'Videojuego o experiencia interactiva'], ['Other', 'Otro']],
    thankYou: 'Tu consulta está lista en WhatsApp.', received: 'Abrimos WhatsApp con los datos de tu proyecto. Revisa el mensaje y presiona Enviar para que podamos recibirlo.', another: 'Preparar otra consulta', kicker: 'Consulta de proyecto', heading: 'Cuéntanos qué tienes en mente.', name: 'Tu nombre', namePlaceholder: '¿Cómo debemos llamarte?', email: 'Correo electrónico', phone: 'Teléfono de WhatsApp (opcional)', phonePlaceholder: 'Incluye el código del país, ej. +57 300 123 4567', help: '¿En qué podemos ayudarte?', select: 'Selecciona un tipo de proyecto', idea: 'Cuéntanos sobre tu idea', ideaPlaceholder: '¿Qué quieres construir, para quién es y cómo se vería un resultado exitoso?', send: 'Continuar en WhatsApp', error: 'No pudimos abrir WhatsApp. Escríbenos al +57 305 483 9092 o a admin@clubgamerzone.com.', privacy: 'Tus datos se colocarán en un mensaje de WhatsApp para que los revises antes de enviarlos.', policy: 'Política de privacidad', honeypot: 'No completes este campo:',
  },
} as const;

export default function LeadForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<'idle'|'sent'|'error'>('idle');
  const c = copy[locale];

  function submit(form: HTMLFormElement) {
    try {
      const fields = Object.fromEntries(new FormData(form).entries()) as Record<string,string>;
      if (fields['bot-field']) return;
      const labels = locale === 'es'
        ? { title: 'Nueva consulta de proyecto', name: 'Nombre', email: 'Correo', phone: 'WhatsApp de contacto', type: 'Tipo de proyecto', idea: 'Idea' }
        : { title: 'New project inquiry', name: 'Name', email: 'Email', phone: 'Contact WhatsApp', type: 'Project type', idea: 'Idea' };
      const message = [
        `*${labels.title} — ClubGamerZone*`,
        '',
        `*${labels.name}:* ${fields.name}`,
        `*${labels.email}:* ${fields.email}`,
        fields.phone ? `*${labels.phone}:* ${fields.phone}` : '',
        `*${labels.type}:* ${fields.projectType}`,
        '',
        `*${labels.idea}:*`,
        fields.message,
      ].filter(Boolean).join('\n');
      const whatsappWindow = window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
      if (!whatsappWindow) throw new Error('WhatsApp window was blocked');
      whatsappWindow.opener = null;
      form.reset();
      setStatus('sent');
    } catch { setStatus('error'); }
  }

  if (status === 'sent') return <div className="lead-success"><CheckCircle2 size={34}/><h3>{c.thankYou}</h3><p>{c.received}</p><button onClick={()=>setStatus('idle')}>{c.another}</button></div>;

  return <form className="lead-form" name="project-inquiry" onSubmit={event=>{event.preventDefault();submit(event.currentTarget);}}>
    <div className="form-heading"><span>{c.kicker}</span><h3>{c.heading}</h3></div>
    <label><span>{c.name}</span><input name="name" required autoComplete="name" placeholder={c.namePlaceholder} /></label>
    <label><span>{c.email}</span><input name="email" type="email" required autoComplete="email" placeholder="you@company.com" /></label>
    <label><span>{c.phone}</span><input name="phone" type="tel" autoComplete="tel" placeholder={c.phonePlaceholder} /></label>
    <label><span>{c.help}</span><select name="projectType" required defaultValue=""><option value="" disabled>{c.select}</option>{c.types.map(([value,label])=><option value={value} key={value}>{label}</option>)}</select></label>
    <label><span>{c.idea}</span><textarea name="message" required rows={4} maxLength={1500} placeholder={c.ideaPlaceholder} /></label>
    <label className="honeypot">{c.honeypot} <input name="bot-field" /></label>
    <button className="button button-primary" type="submit">{c.send} <ArrowRight size={18}/></button>
    {status==='error'&&<p className="form-error">{c.error}</p>}
    <small>{c.privacy} <a href="/privacy-policy">{c.policy}</a></small>
  </form>;
}

