"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Bot, AlertTriangle, PhoneCall, Sparkles, ChevronRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { useAssistantContext } from '@/hooks/useAssistantContext';
import { useModalStore } from '@/store/useModalStore';
import type { KnowledgeCitation, KnowledgeFallbackReason } from '@/lib/knowledge/types';

interface AssistantMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  citations?: KnowledgeCitation[];
  confidence?: number;
  fallbackReason?: KnowledgeFallbackReason;
  variant?: 'knowledge' | 'proactive' | 'handoff';
}

export default function AssistantWidget() {
  const { locale } = useLanguage();
  const { openModal } = useModalStore();
  const [isOpen, setIsOpen] = useState(false);
  const [hasShownTeaser, setHasShownTeaser] = useState(false);
  const [showCollapsedHint, setShowCollapsedHint] = useState(false);
  const [operatorTyping, setOperatorTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const makeAssistantMessage = useCallback((text: string, variant: AssistantMessage['variant'] = 'knowledge'): AssistantMessage => ({
    id: crypto.randomUUID(),
    role: 'assistant',
    text,
    variant,
  }), []);

  const initialMessage = useMemo(
    () =>
      locale === 'ru'
        ? 'Здравствуйте. Я цифровой консультант БУКВА СВЕТ. Помогу по материалам, 902-ПП, срокам, стоимости и подготовке заявки для инженера.'
        : 'Hello. I am the BUKVA SVET digital consultant. I can help with materials, compliance, lead times, pricing, and preparing a request for an engineer.',
    [locale]
  );

  const proactiveMessage = useMemo(
    () =>
      locale === 'ru'
        ? 'Если хотите, подскажу по типу вывески, ограничениям 902-ПП или помогу быстро передать запрос оператору.'
        : 'I can help choose the right signage type, explain 902-PP limits, or pass your request to a live operator.',
    [locale]
  );

  const [messages, setMessages] = useState<AssistantMessage[]>([
    makeAssistantMessage(initialMessage, 'proactive'),
    makeAssistantMessage(proactiveMessage, 'proactive'),
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const assistantContext = useAssistantContext();
  const quickReplies = useMemo(
    () => [
      locale === 'ru' ? 'Нужна помощь с выбором вывески' : 'Help me choose signage',
      locale === 'ru' ? 'Какие есть ограничения по 902-ПП?' : 'What are the 902-PP limits?',
      locale === 'ru' ? 'Хочу связаться с оператором' : 'I want a live operator',
    ],
    [locale]
  );

  useEffect(() => {
    const teaserKey = 'bukva-svet-assistant-teaser-shown';
    const proactiveKey = 'bukva-svet-assistant-proactive-opened';

    if (typeof window === 'undefined') {
      return;
    }

    if (!sessionStorage.getItem(teaserKey)) {
      const teaserTimer = window.setTimeout(() => {
        setHasShownTeaser(true);
        setShowCollapsedHint(true);
        sessionStorage.setItem(teaserKey, 'true');
      }, 1800);

      const hideTimer = window.setTimeout(() => {
        setShowCollapsedHint(false);
      }, 7200);

      return () => {
        window.clearTimeout(teaserTimer);
        window.clearTimeout(hideTimer);
      };
    }

    if (!sessionStorage.getItem(proactiveKey)) {
      const proactiveTimer = window.setTimeout(() => {
        setIsOpen(true);
        setHasShownTeaser(true);
        sessionStorage.setItem(proactiveKey, 'true');
      }, 9000);

      return () => window.clearTimeout(proactiveTimer);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, operatorTyping]);

  const openOperatorModal = useCallback((context: string) => {
    openModal({
      context,
      source: 'assistant_widget',
    });
  }, [openModal]);

  const submitQuery = useCallback(async (userMessage: string) => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'user', text: userMessage }]);
    setLoading(true);
    setOperatorTyping(true);

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
        id: crypto.randomUUID(),
        role: 'assistant',
        text: payload.answer,
        citations: Array.isArray(payload.citations) ? payload.citations : [],
        confidence: typeof payload.confidence === 'number' ? payload.confidence : 0,
        fallbackReason: payload.fallback_reason ?? 'upstream_unreachable',
        variant: payload.fallback_reason && payload.fallback_reason !== 'none' ? 'handoff' : 'knowledge',
      };

      window.setTimeout(() => {
        setOperatorTyping(false);
        setMessages((prev) => [...prev, assistantMessage]);
      }, 650);
    } catch (error) {
      console.error('[AssistantWidget] knowledge query failed', error);
      window.setTimeout(() => {
        setOperatorTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            text: 'Сервис знаний временно недоступен. Оставьте параметры проекта, и оператор передаст запрос инженеру с нужным контекстом.',
            citations: [],
            confidence: 0,
            fallbackReason: 'upstream_unreachable',
            variant: 'handoff',
          },
        ]);
      }, 500);
    } finally {
      setLoading(false);
    }
  }, [assistantContext, locale]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    if (locale === 'ru' && userMessage.toLowerCase().includes('оператор')) {
      openOperatorModal(`Запрос из чата: ${userMessage}`);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: 'Открываю форму связи с оператором. Передайте краткое ТЗ, телефон и удобный канал связи.',
          variant: 'handoff',
        },
      ]);
      return;
    }

    await submitQuery(userMessage);
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-4 z-50 sm:bottom-8 sm:right-8">
          <AnimatePresence>
            {showCollapsedHint && (
              <motion.button
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                onClick={() => {
                  setIsOpen(true);
                  setShowCollapsedHint(false);
                }}
                className="mb-3 block max-w-[290px] rounded-[22px] border border-[color:rgba(118,118,118,0.16)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(247,247,244,0.94))] p-4 text-left shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
              >
                <div className="mb-1 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0055c9,#18b9d4)] text-white shadow-[0_8px_18px_rgba(0,85,201,0.24)]">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-on-surface" style={{ fontFamily: 'var(--font-header)' }}>
                      Елизавета
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[color:rgba(64,64,64,0.56)]" style={{ fontFamily: 'var(--font-mono)' }}>
                      Консультант онлайн
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-6 text-on-surface-variant">
                  {locale === 'ru'
                    ? 'Подскажу по материалам, 902-ПП и помогу быстро передать запрос оператору.'
                    : 'I can help with materials, compliance and pass your request to an operator.'}
                </p>
              </motion.button>
            )}
          </AnimatePresence>

          <button
            onClick={() => {
              setIsOpen(true);
              setShowCollapsedHint(false);
            }}
            className="group relative flex h-[74px] w-[74px] items-center justify-center rounded-full border border-[color:rgba(24,185,212,0.24)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,247,250,0.88))] text-on-surface shadow-[0_20px_40px_rgba(15,23,42,0.15)] transition-transform hover:scale-[1.03] animate-assistant-float"
          >
            <div className="absolute inset-[6px] rounded-full border border-[color:rgba(0,85,201,0.14)]" />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_35%,rgba(24,185,212,0.18),rgba(0,85,201,0.08),transparent_70%)] opacity-90" />
            <div className="absolute inset-0 rounded-full opacity-70 blur-xl" style={{ background: 'radial-gradient(circle, rgba(24,185,212,0.18), transparent 68%)' }} />
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0055c9,#18b9d4)] text-white shadow-[0_12px_24px_rgba(0,85,201,0.28)]">
                <MessageCircle className="h-5 w-5" />
              </div>
              <Sparkles className="absolute -right-1 top-0 h-3.5 w-3.5 text-[var(--accent-warm)] opacity-85 group-hover:animate-pulse" />
            </div>
          </button>
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-4 right-3 z-50 flex h-[min(78vh,680px)] w-[min(calc(100vw-24px),420px)] flex-col overflow-hidden rounded-[28px] border border-[color:rgba(118,118,118,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,246,242,0.97))] shadow-[0_28px_80px_rgba(15,23,42,0.2)] sm:bottom-8 sm:right-8"
          >
            <div className="border-b border-[color:rgba(118,118,118,0.12)] bg-[linear-gradient(95deg,#0055c9_20%,#18b9d4_80%)] px-5 py-4 text-white">
              <div className="absolute left-0 top-0 h-full w-full opacity-20" style={{ background: 'radial-gradient(circle at 90% 10%, rgba(255,255,255,0.35), transparent 32%)' }} />
              <div className="flex items-center gap-3">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/12 backdrop-blur-sm">
                  <Bot className="h-6 w-6" />
                  <span className="absolute bottom-[4px] right-[4px] h-3.5 w-3.5 rounded-full border-2 border-[rgb(0,85,201)] bg-[#37d561]" />
                </div>
                <div>
                  <p className="text-base font-semibold tracking-[-0.02em]" style={{ fontFamily: 'var(--font-header)' }}>Елизавета</p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/80" style={{ fontFamily: 'var(--font-mono)' }}>
                    Консультант · Online
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="absolute right-4 top-4 text-white/70 transition-colors hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="border-b border-[color:rgba(118,118,118,0.1)] bg-[rgba(255,255,255,0.76)] px-5 py-3">
              <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    onClick={() => {
                      setIsOpen(true);
                      if (reply.includes('оператор') || reply.includes('operator')) {
                        openOperatorModal(reply);
                        setMessages((prev) => [
                          ...prev,
                          {
                            id: crypto.randomUUID(),
                            role: 'assistant',
                            text: 'Перевожу вас в режим связи с оператором. Оставьте контакты и краткое описание задачи.',
                            variant: 'handoff',
                          },
                        ]);
                        return;
                      }
                      void submitQuery(reply);
                    }}
                    className="rounded-full border border-[color:rgba(118,118,118,0.14)] bg-white px-3.5 py-2 text-sm text-on-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-colors hover:border-[color:rgba(var(--accent-rgb),0.3)] hover:text-primary"
                    style={{ fontFamily: 'var(--font-header)' }}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-[linear-gradient(180deg,rgba(250,250,248,0.88),rgba(244,244,241,0.92))] p-5 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={msg.id ?? i} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[88%] rounded-[22px] p-4 text-sm leading-6 whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-[linear-gradient(135deg,#0055c9,#18b9d4)] text-white shadow-[0_16px_30px_rgba(0,85,201,0.18)]'
                        : 'border border-[color:rgba(118,118,118,0.12)] bg-white/88 text-on-surface shadow-[0_8px_18px_rgba(15,23,42,0.05)]'
                    }`}
                  >
                    {msg.text}

                    {msg.role === 'assistant' && typeof msg.confidence === 'number' && (
                      <div className="mt-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-on-surface-variant/70" style={{ fontFamily: 'var(--font-mono)' }}>
                        <ShieldCheck className="h-3.5 w-3.5 text-primary/70" />
                        Confidence: {Math.round(msg.confidence * 100)}%
                      </div>
                    )}

                    {msg.role === 'assistant' && msg.fallbackReason && msg.fallbackReason !== 'none' && (
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-emerald-700" style={{ fontFamily: 'var(--font-mono)' }}>
                        <AlertTriangle className="h-3 w-3" />
                        Fallback: {msg.fallbackReason}
                      </div>
                    )}

                    {msg.role === 'assistant' && msg.citations && msg.citations.length > 0 && (
                      <div className="mt-4 space-y-2 border-t border-[color:rgba(118,118,118,0.12)] pt-3">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-primary" style={{ fontFamily: 'var(--font-mono)' }}>Citations</p>
                        {msg.citations.map((citation, citationIndex) => (
                          <div key={`${citation.source_doc_id}-${citationIndex}`} className="rounded-2xl bg-[rgba(246,248,250,0.9)] p-3 text-xs text-on-surface-variant/80">
                            <div className="font-semibold text-on-surface">{citation.source_doc_id} — {citation.source_title}</div>
                            <div>{citation.snippet}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {msg.role === 'assistant' && msg.variant === 'handoff' && (
                      <button
                        type="button"
                        onClick={() => openOperatorModal(msg.text)}
                        className="mt-4 inline-flex items-center gap-2 rounded-full border border-[color:rgba(var(--accent-rgb),0.18)] bg-[rgba(0,112,243,0.06)] px-3.5 py-2 text-sm font-medium text-primary transition-colors hover:bg-[rgba(0,112,243,0.1)]"
                        style={{ fontFamily: 'var(--font-header)' }}
                      >
                        Связаться с оператором
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {operatorTyping && (
                <div className="flex justify-start">
                  <div className="rounded-[20px] border border-[color:rgba(118,118,118,0.12)] bg-white/88 p-4 text-on-surface-variant shadow-[0_8px_18px_rgba(15,23,42,0.05)]">
                    <div className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[color:rgba(64,64,64,0.54)]" style={{ fontFamily: 'var(--font-mono)' }}>
                      Оператор набирает сообщение
                    </div>
                    <div className="flex gap-2">
                      <span className="h-2 w-2 rounded-full bg-[var(--brand-telegram)] animate-pulse" />
                      <span className="h-2 w-2 rounded-full bg-[var(--brand-telegram)] animate-pulse [animation-delay:120ms]" />
                      <span className="h-2 w-2 rounded-full bg-[var(--brand-telegram)] animate-pulse [animation-delay:240ms]" />
                    </div>
                  </div>
                </div>
              )}

              {!loading && !operatorTyping && messages.length <= 2 && hasShownTeaser && (
                <div className="mt-4 rounded-[22px] border border-dashed border-[color:rgba(118,118,118,0.14)] bg-white/60 p-4">
                  <p className="mb-3 text-sm text-on-surface-variant">
                    Быстрый сценарий: уточняем задачу, проверяем ограничения и при необходимости передаем запрос оператору с контекстом.
                  </p>
                  <button
                    type="button"
                    onClick={() => openOperatorModal('Нужна консультация по проекту')}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-on-primary"
                    style={{ fontFamily: 'var(--font-header)' }}
                  >
                    <PhoneCall className="h-4 w-4" />
                    Передать оператору
                  </button>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-[color:rgba(118,118,118,0.12)] bg-[rgba(255,255,255,0.92)] p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => openOperatorModal('Нужна связь с оператором из чата')}
                  className="inline-flex items-center gap-2 rounded-full border border-[color:rgba(var(--accent-rgb),0.16)] bg-[rgba(0,112,243,0.05)] px-3.5 py-2 text-sm text-primary"
                  style={{ fontFamily: 'var(--font-header)' }}
                >
                  <PhoneCall className="h-4 w-4" />
                  Оператор
                </button>
                <a
                  href="https://t.me/bukva_svet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[color:rgba(38,165,228,0.18)] bg-[rgba(38,165,228,0.07)] px-3.5 py-2 text-sm text-[var(--brand-telegram)]"
                  style={{ fontFamily: 'var(--font-header)' }}
                >
                  Telegram
                </a>
              </div>

            <form onSubmit={handleSend} className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={locale === 'ru' ? 'Введите сообщение' : 'Enter your message'}
                className="flex-1 rounded-[18px] border border-[color:rgba(118,118,118,0.14)] bg-[rgba(247,247,244,0.94)] px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/55 focus:outline-none focus:border-[color:rgba(var(--accent-rgb),0.28)]"
                style={{ fontFamily: 'var(--font-header)' }}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0055c9,#18b9d4)] text-white transition-all hover:scale-[1.02] disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
