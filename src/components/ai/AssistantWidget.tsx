"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, AlertTriangle, Cpu, Sparkles } from 'lucide-react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { useAssistantContext } from '../../hooks/useAssistantContext';
import type { KnowledgeCitation, KnowledgeFallbackReason } from '@/lib/knowledge/types';

interface AssistantMessage {
  role: 'user' | 'assistant';
  text: string;
  citations?: KnowledgeCitation[];
  confidence?: number;
  fallbackReason?: KnowledgeFallbackReason;
}

export default function AssistantWidget() {
  const { locale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const container = useRef<HTMLButtonElement>(null);
  
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      role: 'assistant',
      text:
        locale === 'ru'
          ? 'Система активна. Я ИИ-консультант Expoint ADV. Задайте вопрос по материалам, 902-ПП или расчету стоимости.'
          : 'System online. I am the Expoint ADV AI consultant. Ask about materials, 902-PP, or pricing.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const assistantContext = useAssistantContext();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('/api/knowledge/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: userMessage,
          context: assistantContext,
          session_meta: {
            locale,
            path: typeof window !== 'undefined' ? window.location.pathname : '/',
          },
        }),
      });

      const payload = await response.json();
      const assistantMessage: AssistantMessage = {
        role: 'assistant',
        text: payload.answer,
        citations: Array.isArray(payload.citations) ? payload.citations : [],
        confidence: typeof payload.confidence === 'number' ? payload.confidence : 0,
        fallbackReason: payload.fallback_reason ?? 'upstream_unreachable',
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('[AssistantWidget] knowledge query failed', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Сервис знаний временно недоступен. Оставьте параметры проекта, и инженер подготовит верифицированный ответ.',
          citations: [],
          confidence: 0,
          fallbackReason: 'upstream_unreachable',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          ref={container}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 w-20 h-20 bg-secondary border-2 border-accent/30 text-white rounded-full flex items-center justify-center shadow-2xl z-50 group hover:border-accent transition-colors animate-assistant-float"
        >
          <div className="absolute inset-0 bg-accent/10 rounded-full animate-ping opacity-20" />
          <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl animate-assistant-glow" />
          
          <div className="relative z-10 flex flex-col items-center">
            <Cpu className="w-8 h-8 text-accent group-hover:scale-110 transition-transform" />
            <Sparkles className="w-3 h-3 text-primary absolute -top-1 -right-1 animate-pulse" />
          </div>

          {/* Technical Ring */}
          <div className="absolute inset-[2px] border border-white/5 rounded-full border-dashed animate-[spin_10s_linear_infinite]" />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 right-8 w-[400px] h-[600px] bg-secondary border border-white/10 shadow-premium z-50 flex flex-col overflow-hidden glass-panel"
          >
            <div className="p-6 bg-background border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">AI System</p>
                  <p className="text-xs font-black text-white uppercase tracking-widest">Knowledge_Consultant</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[90%] p-4 text-xs leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-accent text-white font-black uppercase tracking-widest'
                        : 'bg-white/5 border border-white/10 text-on-surface-variant font-light'
                    }`}
                  >
                    {msg.text}

                    {msg.role === 'assistant' && typeof msg.confidence === 'number' && (
                      <div className="mt-3 text-[10px] uppercase tracking-widest text-on-surface-variant/70">
                        Confidence: {Math.round(msg.confidence * 100)}%
                      </div>
                    )}

                    {msg.role === 'assistant' && msg.fallbackReason && msg.fallbackReason !== 'none' && (
                      <div className="mt-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-amber-400">
                        <AlertTriangle className="w-3 h-3" />
                        Fallback: {msg.fallbackReason}
                      </div>
                    )}

                    {msg.role === 'assistant' && msg.citations && msg.citations.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Citations</p>
                        {msg.citations.map((citation, citationIndex) => (
                          <div key={`${citation.source_doc_id}-${citationIndex}`} className="text-[10px] text-on-surface-variant/80">
                            <div className="font-black text-white/80">{citation.source_doc_id} — {citation.source_title}</div>
                            <div>{citation.snippet}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 flex gap-2">
                    <span className="w-1.5 h-1.5 bg-accent animate-pulse" />
                    <span className="w-1.5 h-1.5 bg-accent animate-pulse delay-75" />
                    <span className="w-1.5 h-1.5 bg-accent animate-pulse delay-150" />
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSend} className="p-4 bg-background border-t border-white/5 flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={locale === 'ru' ? 'ВВЕДИТЕ ЗАПРОС...' : 'INPUT DATA...'}
                className="flex-1 bg-white/3 border border-white/10 p-4 text-[10px] font-black uppercase tracking-widest text-white focus:outline-none focus:border-accent transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-12 h-12 bg-accent text-white flex items-center justify-center hover:bg-white hover:text-secondary transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
