import { Bot, LoaderCircle, MessageCircle, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type ChatMessage = { role: 'assistant' | 'user'; content: string };

const greeting: ChatMessage = {
  role: 'assistant',
  content: 'Hi! I’m the ClubGamerZone assistant. Tell me what you want to build, improve, or automate, and I’ll help you explore the next step.',
};

const suggestions = [
  'Can you build my app idea?',
  'How can AI help my business?',
  'I need a website',
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([greeting]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

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
        content: 'I’m having trouble connecting right now. Please email admin@clubgamerzone.com or call +57 301 273 1004 and our team will help you.',
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
        <section className="chat-panel" aria-label="Chat with ClubGamerZone">
          <header className="chat-header">
            <div className="chat-identity"><span><Bot size={20} /></span><div><strong>ClubGamerZone AI</strong><small><i /> Ready to help</small></div></div>
            <button onClick={() => setOpen(false)} aria-label="Close chat"><X size={20} /></button>
          </header>
          <div className="chat-body" aria-live="polite">
            {messages.map((message, index) => <div className={`chat-message ${message.role}`} key={`${message.role}-${index}`}>{message.content}</div>)}
            {messages.length === 1 && <div className="chat-suggestions">{suggestions.map(item => <button key={item} onClick={() => void sendMessage(item)}>{item}</button>)}</div>}
            {loading && <div className="chat-message assistant chat-loading"><LoaderCircle size={16} /> Thinking…</div>}
            <div ref={endRef} />
          </div>
          <form className="chat-form" onSubmit={submit}>
            <label className="sr-only" htmlFor="chat-input">Your message</label>
            <input id="chat-input" value={input} onChange={event => setInput(event.target.value)} maxLength={600} placeholder="What would you like to build?" autoComplete="off" />
            <button type="submit" disabled={!input.trim() || loading} aria-label="Send message"><Send size={18} /></button>
          </form>
          <p className="chat-disclaimer">AI can make mistakes. Project estimates are confirmed by our team.</p>
        </section>
      )}
      <button className="chat-launcher" onClick={() => setOpen(current => !current)} aria-expanded={open} aria-label={open ? 'Close AI assistant' : 'Ask our AI assistant'}>
        {open ? <X size={24} /> : <MessageCircle size={25} />}
        {!open && <span>Ask our AI</span>}
      </button>
    </div>
  );
}
