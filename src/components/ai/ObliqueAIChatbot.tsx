'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, ArrowUpRight, Bot } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  links?: { label: string; href: string }[];
}

const QUICK_PROMPTS = [
  'What services do you provide?',
  'What kinds of projects do you build?',
  'Can you work with startups?',
  'Do you work internationally?',
  'How do I start a project?',
  'How do I schedule a call?'
];

export function ObliqueAIChatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Hello. I am Ask Oblique. How can I help you explore our services, review our work, or connect with our team?',
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

  // Hide in editorial studio and admin console after hooks are declared
  if (
    pathname === '/insights/write' || 
    pathname?.startsWith('/insights/write') ||
    pathname === '/admin' ||
    pathname?.startsWith('/admin')
  ) {
    return null;
  }

  const generateAIResponse = (query: string): Message => {
    const q = query.toLowerCase();

    // 1. What services do you provide?
    if (q.includes('service') || q.includes('what do you do') || q.includes('offer')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'ObliqueTech provides 4 primary service areas:\n• Web Development — High-performance web applications and platforms.\n• AI & ML — Practical AI solutions, automation, and intelligent pipelines.\n• UI/UX Design — Human-centered interfaces built for clarity.\n• IT Consulting — Strategic technology direction and architecture.\n\nWe also deliver custom software, mobile apps, and technical digital marketing.',
        links: [
          { label: 'View All Services', href: '/services' },
          { label: 'Start a Project', href: '/start-project' }
        ]
      };
    }

    // 2. What kinds of projects do you build?
    if (q.includes('project') || q.includes('portfolio') || q.includes('built') || q.includes('work')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'We have 3 completed enterprise projects and 2 active initiatives:\n• Cloud-Native Enterprise Inventory Platform (Web)\n• Predictive Maintenance Analytics Engine (AI/ML)\n• Patient Care & Health Records Hub (Healthcare SaaS)\n• Enterprise Knowledge Graph Assistant (Active)\n• Cross-Platform Field Operations Suite (Active)',
        links: [
          { label: 'Explore Portfolio', href: '/portfolio' },
          { label: 'Start a Project', href: '/start-project' }
        ]
      };
    }

    // 3. Can you work with startups?
    if (q.includes('startup') || q.includes('mvp') || q.includes('early stage') || q.includes('founder')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'Yes. Startups and entrepreneurs are one of our core client audiences. We help founders validate technical feasibility, design high-converting prototypes, and engineer scalable MVPs with clean architecture.',
        links: [
          { label: 'Start a Project', href: '/start-project' },
          { label: 'Schedule a Call', href: '/schedule' }
        ]
      };
    }

    // 4. Do you work internationally?
    if (q.includes('international') || q.includes('global') || q.includes('remote') || q.includes('timezone') || q.includes('country')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'Yes, absolutely. We work with international clients across diverse time zones. Our communication is structured around regular async updates, weekly sprint reviews, and direct Slack/WhatsApp channels.',
        links: [
          { label: 'Schedule a Call', href: '/schedule' },
          { label: 'Contact Us', href: '/contact' }
        ]
      };
    }

    // 5. How do I start?
    if (q.includes('start') || q.includes('hire') || q.includes('cost') || q.includes('price') || q.includes('quote')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'Starting is straightforward. You can fill out our neutral 5-step Project Specification form with what you are building, or book a direct 30–45 minute consultation call with our engineering team.',
        links: [
          { label: 'Start a Project (5 Steps)', href: '/start-project' },
          { label: 'Schedule a Call (30-45m)', href: '/schedule' }
        ]
      };
    }

    // 6. How do I schedule a call?
    if (q.includes('call') || q.includes('meet') || q.includes('schedule') || q.includes('talk')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'You can select a preferred topic, date, and time slot on our Schedule page. It is a focused 30–45 minute technical conversation without any sales pressure.',
        links: [
          { label: 'Schedule a Call Now', href: '/schedule' },
          { label: 'Direct WhatsApp Chat', href: 'https://wa.me/15550192834' }
        ]
      };
    }

    // 7. Student / Origin questions
    if (q.includes('origin') || q.includes('student') || q.includes('story') || q.includes('why oblique')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'Oblique started after seeing a common challenge among engineering students: companies wanted experience, but students struggled to find opportunities to gain it. We began as a hands-on project lab connecting developers with seasoned architects, and evolved into an applied technology enterprise.',
        links: [
          { label: 'Read Our Story', href: '/about' },
          { label: 'Schedule a Call', href: '/schedule' }
        ]
      };
    }

    // Default Fallback
    return {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: 'We build practical technology solutions that help businesses work better. Would you like to tell us about what you are building, or schedule a 30-minute discovery call?',
      links: [
        { label: 'Start a Project', href: '/start-project' },
        { label: 'Schedule a Call', href: '/schedule' }
      ]
    };
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setInput('');

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const response = generateAIResponse(userText);
      setMessages((prev) => [...prev, response]);
    }, 250);
  };

  const handleQuickPrompt = (prompt: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: prompt
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const response = generateAIResponse(prompt);
      setMessages((prev) => [...prev, response]);
    }, 250);
  };

  return (
    <>
      {/* Floating Trigger Button (LEFT BOTTOM CORNER — Matches WhatsApp circular floating action style) */}
      <aside
        aria-label="Ask Oblique AI Assistant"
        className="fixed bottom-6 left-6 z-40 flex items-center group select-none"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close AI Assistant" : "Open Ask Oblique AI Assistant"}
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#00D2FF] via-[#7C3AED] to-[#EC4899] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(0,210,255,0.4)] hover:shadow-[0_8px_30px_rgba(124,58,237,0.6)] hover:scale-108 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-3 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-[#08090B]"
        >
          {/* Active status pulse badge */}
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-400 border-2 border-[#08090B]" />
          </span>

          {isOpen ? (
            <X className="w-6 h-6 sm:w-7 sm:h-7 text-white transition-transform duration-200" />
          ) : (
            <Bot className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-md" />
          )}
        </button>

        {/* Tooltip on hover (desktop only, to the right of the button) */}
        <div className="ml-3 hidden md:block px-3 py-1.5 rounded-lg bg-[#0B0B0D]/95 text-xs text-white border border-cyan-500/30 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-xl pointer-events-none whitespace-nowrap translate-x-1 group-hover:translate-x-0">
          <span className="font-medium">Ask Oblique AI</span>
          <span className="block text-[10px] text-cyan-400 font-mono">Instant Technology Advisor</span>
        </div>
      </aside>

      {/* Floating Chat Window (BOTTOM LEFT) */}
      {isOpen && (
        <div className="fixed bottom-22 sm:bottom-24 left-6 z-50 w-[calc(100vw-3rem)] sm:w-96 max-h-[560px] bg-[#121317] rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="p-4 bg-[#0B0B0D] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded bg-white flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#0B0B0D]">
                  <path
                    d="M5 19L19 5M6 5H18C18.5523 5 19 5.44772 19 6V18"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="9" cy="15" r="2.5" fill="#C7A45D" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-tight">Ask Oblique</h3>
                <p className="text-[10px] text-slate-400">Technology & Project Guidance</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 max-h-[380px] bg-transparent">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-xl text-xs max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#3B82F6] text-white rounded-br-xs'
                      : 'bg-white/5 border border-white/10 text-slate-200 rounded-bl-xs shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Quick Link Buttons if present */}
                {msg.links && msg.links.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.links.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-[#3B82F6]/10 text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white transition-colors"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-3 py-2 bg-[#121317] border-t border-white/5 overflow-x-auto flex gap-1.5 scrollbar-none">
            {QUICK_PROMPTS.slice(0, 4).map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickPrompt(qp)}
                className="whitespace-nowrap px-2.5 py-1 text-[10px] rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-[#0B0B0D] border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about services, projects, process..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6]"
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-[#3B82F6] hover:bg-blue-600 text-white transition-colors"
              aria-label="Send"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
