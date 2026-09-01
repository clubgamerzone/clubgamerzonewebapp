import { Bot, LoaderCircle, MessageCircle, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Locale } from '../app/page';

type ChatMessage = { role: 'assistant' | 'user'; content: string };

const copy = {
  en: { greeting: 'Hi! Welcome to ClubGamerZone. Tell us what you want to build, improve, or automate, and we’ll help you define the best next step.', suggestions: ['Can you build my app idea?', 'How can AI help my business?', 'I need a website'], ready: 'Ready to talk', close: 'Close chat', thinking: 'Writing…', message: 'Your message', placeholder: 'What would you like to build?', send: 'Send message', disclaimer: 'AI-powered conversation in our team’s voice. We personally confirm all project details and estimates.', launcher: 'Let’s talk', openLabel: 'Talk with ClubGamerZone', closeLabel: 'Close ClubGamerZone chat', fallback: 'We’re having trouble connecting right now. Please email us at admin@clubgamerzone.com or call +57 301 273 1004 and we’ll help you personally.', panel: 'Chat with ClubGamerZone' },
  es: { greeting: '¡Hola! Bienvenido a ClubGamerZone. Cuéntanos qué quieres construir, mejorar o automatizar y te ayudaremos a definir el mejor siguiente paso.', suggestions: ['¿Pueden desarrollar mi idea de aplicación?', '¿Cómo puede ayudar la IA a mi negocio?', 'Necesito un sitio web'], ready: 'Listos para conversar', close: 'Cerrar chat', thinking: 'Escribiendo…', message: 'Tu mensaje', placeholder: '¿Qué te gustaría construir?', send: 'Enviar mensaje', disclaimer: 'Conversación impulsada por IA con la voz de nuestro equipo. Confirmamos personalmente todos los detalles y estimaciones.', launcher: 'Hablemos', openLabel: 'Hablar con ClubGamerZone', closeLabel: 'Cerrar chat de ClubGamerZone', fallback: 'Tenemos problemas para conectarnos en este momento. Escríbenos a admin@clubgamerzone.com o llama al +57 301 273 1004 y te ayudaremos personalmente.', panel: 'Chatea con ClubGamerZone' },
} as const;

export default function ChatWidget({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'assistant', content: copy.en.greeting }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  useEffect(() => {
    setMessages(current => current.length === 1 && current[0].role === 'assistant' ? [{ role: 'assistant', content: c.greeting }] : current);
  }, [c.greeting]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages = [...messages, { role: 'user' as const, content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages.slice(-10) }),
      });
      const data = await response.json() as { error?: string; reply?: string };
      if (!response.ok) throw new Error(data.error || 'The assistant is unavailable.');
      if (!data.reply) throw new Error('The assistant returned an empty response.');
      setMessages(current => [...current, { role: 'assistant', content: data.reply! }]);
    } catch {
      setMessages(current => [...current, {
        role: 'assistant',
        content: c.fallback,
      }]);
    } finally {
      setLoading(false);
    }
  }

  function submit(event: { preventDefault: () => void }) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="chat-widget">
      {open && (
        <section className="chat-panel" aria-label={c.panel}>
          <header className="chat-header">
            <div className="chat-identity"><span><Bot size={20} /></span><div><strong>ClubGamerZone</strong><small><i /> {c.ready}</small></div></div>
            <button onClick={() => setOpen(false)} aria-label={c.close}><X size={20} /></button>
          </header>
          <div className="chat-body" aria-live="polite">
            {messages.map((message, index) => <div className={`chat-message ${message.role}`} key={`${message.role}-${index}`}>{message.content}</div>)}
            {messages.length === 1 && <div className="chat-suggestions">{c.suggestions.map(item => <button key={item} onClick={() => void sendMessage(item)}>{item}</button>)}</div>}
            {loading && <div className="chat-message assistant chat-loading"><LoaderCircle size={16} /> {c.thinking}</div>}
            <div ref={endRef} />
          </div>
          <form className="chat-form" onSubmit={submit}>
            <label className="sr-only" htmlFor="chat-input">{c.message}</label>
            <input id="chat-input" value={input} onChange={event => setInput(event.target.value)} maxLength={600} placeholder={c.placeholder} autoComplete="off" />
            <button type="submit" disabled={!input.trim() || loading} aria-label={c.send}><Send size={18} /></button>
          </form>
          <p className="chat-disclaimer">{c.disclaimer}</p>
        </section>
      )}
      <button className="chat-launcher" onClick={() => setOpen(current => !current)} aria-expanded={open} aria-label={open ? c.closeLabel : c.openLabel}>
        {open ? <X size={24} /> : <MessageCircle size={25} />}
        {!open && <span>{c.launcher}</span>}
      </button>
    </div>
  );
}


