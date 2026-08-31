import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const projectTypes = ['Software or app', 'Website or platform', 'AI integration or automation', 'Video game or interactive', 'Other'];

export default function LeadForm() {
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');

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

  if (status === 'sent') return <div className="lead-success"><CheckCircle2 size={34}/><h3>Thank you — we’ll be in touch.</h3><p>Your idea is in good hands. A ClubGamerZone team member will review it and reply soon.</p><button onClick={()=>setStatus('idle')}>Send another inquiry</button></div>;

  return <form className="lead-form" name="project-inquiry" data-netlify="true" onSubmit={event=>{event.preventDefault();void submit(event.currentTarget);}}>
    <input type="hidden" name="form-name" value="project-inquiry" />
    <div className="form-heading"><span>Project inquiry</span><h3>Tell us what’s on your mind.</h3></div>
    <label><span>Your name</span><input name="name" required autoComplete="name" placeholder="How should we address you?" /></label>
    <label><span>Email</span><input name="email" type="email" required autoComplete="email" placeholder="you@company.com" /></label>
    <label><span>What can we help with?</span><select name="projectType" required defaultValue=""><option value="" disabled>Select a project type</option>{projectTypes.map(type=><option value={type} key={type}>{type}</option>)}</select></label>
    <label><span>Tell us about your idea</span><textarea name="message" required rows={4} maxLength={1500} placeholder="What do you want to build, who is it for, and what would success look like?" /></label>
    <label className="honeypot">Don’t fill this out: <input name="bot-field" /></label>
    <button className="button button-primary" type="submit" disabled={status==='sending'}>{status==='sending'?'Sending…':'Send project inquiry'} <ArrowRight size={18}/></button>
    {status==='error'&&<p className="form-error">We couldn’t send this form. Please email admin@clubgamerzone.com.</p>}
    <small>We’ll only use your details to respond to this inquiry.</small>
  </form>;
}
