'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  links?: { label: string; href: string }[];
}

const QUICK_PROMPTS = [
  'What services does ObliqueTech provide?',
  'How do we start a project?',
  'What is your development process?',
  'Can you help integrate AI into our systems?'
];

export function ObliqueAIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Welcome to ObliqueTech. I am Oblique AI. How can I help you explore our services, technical process, or guide your next project?',
      links: [
        { label: 'Start a Project', href: '/start-project' },
        { label: 'Schedule a Call', href: '/schedule' }
      ]
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const generateAIResponse = (query: string): Message => {
    const q = query.toLowerCase();

    if (q.includes('service') || q.includes('what do you do') || q.includes('capabilities')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'ObliqueTech specializes in 7 primary disciplines:\n• Web Development (Scalable Next.js/React platforms)\n• IT Consulting & Architecture Strategy\n• AI / ML & Intelligent Automation Systems\n• UI/UX Design & Product Strategy\n• Mobile App Development (iOS & Android)\n• Custom Software & API Engineering\n• Technical Digital Marketing & SEO\n\nWould you like to scope a project with us?',
        links: [
          { label: 'Explore All Services', href: '/services' },
          { label: 'Start a Project', href: '/start-project' }
        ]
      };
    }

    if (q.includes('start') || q.includes('quote') || q.includes('price') || q.includes('cost') || q.includes('hire')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'We do not generate arbitrary pricing quotes without understanding your exact technical requirements and goals. You can submit your requirements through our 5-step Project Wizard, or book a direct 30-minute introductory call with our engineering team.',
        links: [
          { label: 'Start Project Wizard', href: '/start-project' },
          { label: 'Schedule a Call (30-45m)', href: '/schedule' }
        ]
      };
    }

    if (q.includes('process') || q.includes('how it works') || q.includes('steps') || q.includes('timeline')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'Our engineering workflow follows 7 clear stages:\n1. Discover — Business goals & scope definition\n2. Strategize — Tech stack & architecture blueprint\n3. Design — Figma prototypes & UI systems\n4. Build — Agile sprint-based engineering\n5. Test — QA, performance & security checks\n6. Launch — Production rollout\n7. Grow — SLA maintenance and scaling.',
        links: [
          { label: 'Schedule a Discovery Call', href: '/schedule' }
        ]
      };
    }

    if (q.includes('ai') || q.includes('ml') || q.includes('llm') || q.includes('machine learning') || q.includes('gpt')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'We build domain-specific AI systems, document intelligence pipelines (RAG), and predictive analytics models with strict data privacy boundaries. Your proprietary data is never used for public model training.',
        links: [
          { label: 'View AI / ML Service', href: '/services/ai-ml' },
          { label: 'Schedule an AI Discussion', href: '/schedule' }
        ]
      };
    }

    if (q.includes('student') || q.includes('intern') || q.includes('career') || q.includes('origin')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'Oblique began by recognizing the experience gap faced by engineering students—where companies expect production experience that graduates rarely get a chance to build. We actively support mentorship, real-world project collaboration, and tech speaker sessions.',
        links: [
          { label: 'Read Our Story', href: '/about' },
          { label: 'Contact Us', href: '/contact' }
        ]
      };
    }

    if (q.includes('contact') || q.includes('email') || q.includes('call') || q.includes('phone') || q.includes('whatsapp')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'You can reach us through our direct contact page, book a meeting via our scheduler, or send a WhatsApp message anytime.',
        links: [
          { label: 'Contact Details', href: '/contact' },
          { label: 'Schedule a Call', href: '/schedule' }
        ]
      };
    }

    return {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: 'Thank you for your question. To ensure you receive precise, tailored information without assumptions, I recommend speaking directly with our engineering team or completing our discovery wizard.',
      links: [
        { label: 'Start Project Wizard', href: '/start-project' },
        { label: 'Schedule a 30-min Call', href: '/schedule' }
      ]
    };
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input.trim();
    if (!text) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInput('');

    setTimeout(() => {
      const response = generateAIResponse(text);
      setMessages(prev => [...prev, response]);
    }, 450);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <aside aria-label="AI Assistant" className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Oblique AI Assistant"
          className="relative group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/90 text-white border border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_20px_rgba(0,210,255,0.25)] hover:shadow-[0_0_25px_rgba(0,210,255,0.4)] backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <Bot className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-medium tracking-wide">Oblique AI</span>
          <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/30">
            Assistant
          </span>
        </button>
      </aside>

      {/* Chat Drawer / Modal */}
      {isOpen && (
        <section aria-label="Oblique AI Chat Drawer" className="fixed bottom-20 left-6 z-50 w-[92vw] max-w-sm sm:max-w-md h-[560px] max-h-[80vh] flex flex-col rounded-2xl bg-slate-950/95 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-white tracking-wide">Oblique AI</h2>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <p className="text-[11px] text-slate-400">Technology & Project Advisory</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Oblique AI chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-xs'
                      : 'bg-slate-900 border border-white/10 text-slate-200 rounded-bl-xs whitespace-pre-line'
                  }`}
                >
                  {m.text}
                </div>

                {m.links && m.links.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {m.links.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all hover:scale-105"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-4 py-2 border-t border-white/5 flex gap-2 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="shrink-0 px-2.5 py-1 text-[11px] rounded-full bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-white/10 bg-slate-900/50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our services, process, or projects..."
                className="flex-1 bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-slate-950 font-medium transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}
