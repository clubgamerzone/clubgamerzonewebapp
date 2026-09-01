import { Bot, LoaderCircle, MessageCircle, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Locale } from '../app/page';

type ChatMessage = { role: 'assistant' | 'user'; content: string };

const copy = {
  en: { greeting: 'Hi! Welcome to ClubGamerZone. Ask about our services, tell us about a development project, or request a quotation.', suggestions: ['Can you build my app idea?', 'Request a project quotation', 'What services do you offer?'], ready: 'Project inquiries', close: 'Close chat', thinking: 'Writing…', message: 'Your project question', placeholder: 'Tell us about your project…', send: 'Send message', disclaimer: 'For ClubGamerZone project inquiries and quotations. Our team personally confirms scope, timing, and pricing.', launcher: 'Let’s talk', openLabel: 'Talk with ClubGamerZone', closeLabel: 'Close ClubGamerZone chat', fallback: 'We’re having trouble connecting right now. Please email us at admin@clubgamerzone.com or call +57 301 273 1004 and we’ll help you personally.', panel: 'Chat with ClubGamerZone' },
  es: { greeting: '¡Hola! Bienvenido a ClubGamerZone. Pregunta por nuestros servicios, cuéntanos sobre un proyecto de desarrollo o solicita una cotización.', suggestions: ['¿Pueden desarrollar mi aplicación?', 'Solicitar una cotización', '¿Qué servicios ofrecen?'], ready: 'Consultas de proyectos', close: 'Cerrar chat', thinking: 'Escribiendo…', message: 'Tu pregunta sobre el proyecto', placeholder: 'Cuéntanos sobre tu proyecto…', send: 'Enviar mensaje', disclaimer: 'Para consultas y cotizaciones de proyectos ClubGamerZone. Nuestro equipo confirma personalmente alcance, tiempos y precios.', launcher: 'Hablemos', openLabel: 'Hablar con ClubGamerZone', closeLabel: 'Cerrar chat de ClubGamerZone', fallback: 'Tenemos problemas para conectarnos en este momento. Escríbenos a admin@clubgamerzone.com o llama al +57 301 273 1004 y te ayudaremos personalmente.', panel: 'Chatea con ClubGamerZone' },
} as const;

export default function ChatWidget({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const visibleMessages: ChatMessage[] = messages.length ? messages : [{ role: 'assistant', content: c.greeting }];

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages = [...visibleMessages, { role: 'user' as const, content: trimmed }];
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
            {visibleMessages.map((message, index) => <div className={`chat-message ${message.role}`} key={`${message.role}-${index}`}>{message.content}</div>)}
            {messages.length === 0 && <div className="chat-suggestions">{c.suggestions.map(item => <button key={item} onClick={() => void sendMessage(item)}>{item}</button>)}</div>}
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



