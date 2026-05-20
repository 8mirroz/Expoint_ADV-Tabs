'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Check, FileUp, Sparkles, Send, ShieldCheck, ArrowRight } from 'lucide-react';
import { useModalStore } from '@/store/useModalStore';
import { TurnstileWidget } from '@/components/ui/TurnstileWidget';

interface PremiumIndividualCTAProps {
  title: string;
  description: string;
  buttonText: string;
  modalContext?: string;
  modalSource?: string;
}

export default function PremiumIndividualCTA({
  title,
  description,
  buttonText,
  modalContext = 'Индивидуальный заказ',
  modalSource = 'service_individual_cta',
}: PremiumIndividualCTAProps) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    desc: '',
    lighting: 'internal',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const openModal = useModalStore((state) => state.openModal);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!turnstileToken) {
      setError('Пожалуйста, пройдите проверку безопасности');
      return;
    }

    if (!formData.name.trim() || !formData.contact.trim()) {
      setError('Заполните имя и контактные данные');
      return;
    }

    setIsSubmitting(true);

    try {
      const lightingLabel =
        formData.lighting === 'internal'
          ? 'Лицевая подсветка'
          : formData.lighting === 'halo'
          ? 'Контражур'
          : 'Без подсветки';

      const contextMessage = [
        formData.desc ? `Описание: ${formData.desc}` : null,
        `Тип подсветки: ${lightingLabel}`,
      ]
        .filter(Boolean)
        .join('\n');

      const payload = {
        name: formData.name,
        phone: formData.contact,
        source: 'Premium Individual CTA',
        context: contextMessage,
        turnstileToken,
        consent: true,
      };

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.message || 'Ошибка при отправке. Попробуйте ещё раз.');
      }
    } catch {
      setError('Ошибка соединения. Проверьте интернет и попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="individual-order" className="scroll-mt-28 py-24 border-t border-[var(--ds-border-default)] bg-[var(--ds-bg-section-alt)] relative overflow-hidden">
      {/* Decorative Blur and Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[380px] h-[380px] bg-[var(--ds-accent-softer)]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column - Benefits & Context (6 Columns) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--ds-accent-soft)] text-[var(--ds-accent)] rounded-full text-[10px] font-black uppercase tracking-widest border border-[var(--ds-accent-border)] font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SLA // INDIVIDUAL ORDER ENGINE</span>
            </div>

            <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tighter text-white leading-none">
              {title}
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-[var(--ds-text-body)]">
              {description}
            </p>

            {/* List of high-value conversion elements */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-[var(--ds-accent-soft)] border border-[var(--ds-accent-border)] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[var(--ds-accent)]" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase text-white tracking-tight">Смета в трех ценовых сценариях</h4>
                  <p className="text-xs text-[var(--ds-text-body)] mt-1">
                    Покажем разницу между базовой ценой и премиум-материалами с детализацией работ.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-[var(--ds-accent-soft)] border border-[var(--ds-accent-border)] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[var(--ds-accent)]" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase text-white tracking-tight">AI-макет привязки на ваш фасад</h4>
                  <p className="text-xs text-[var(--ds-text-body)] mt-1">
                    Увидите точные пропорции, вылет и визуальный эффект конструкции до оплаты.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-[var(--ds-accent-soft)] border border-[var(--ds-accent-border)] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[var(--ds-accent)]" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase text-white tracking-tight">Инженерный аудит городских рисков</h4>
                  <p className="text-xs text-[var(--ds-text-body)] mt-1">
                    Сразу укажем, если выбранный формат вывески несет риск штрафа или демонтажа.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Form Panel (6 Columns) */}
          <div className="lg:col-span-6">
            <div className="bg-[var(--ds-bg-card-inner)] border border-[var(--ds-border-card)] rounded-2xl p-6 sm:p-8 shadow-[var(--ds-shadow-panel)]">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-[var(--ds-success-soft)] border border-[var(--ds-success-border)] rounded-full flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-8 h-8 text-[var(--ds-success)]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black uppercase text-white tracking-tight">Параметры сохранены</h3>
                    <p className="text-xs text-[var(--ds-text-body)] max-w-sm mx-auto">
                      Наш инженер уже получил данные. Мы подготовим расчет и свяжемся с вами в течение 15 минут.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setTurnstileToken(null);
                      setFormData({ name: '', contact: '', desc: '', lighting: 'internal' });
                    }}
                    className="font-mono text-xs font-black text-[var(--ds-accent)] uppercase tracking-widest hover:underline"
                  >
                    {'// ОТПРАВИТЬ ЕЩЕ ОДИН ЗАПРОС'}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="mb-4">
                    <h3 className="text-lg font-black uppercase tracking-tight text-white mb-1">
                      Форма прямого брифинга
                    </h3>
                    <p className="text-xs text-[var(--ds-text-ghost)] font-mono uppercase tracking-widest">
                      SYS // CUSTOM SETUP PANEL
                    </p>
                  </div>

                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[9px] uppercase tracking-widest text-[var(--ds-text-ghost)]">
                      ВАШЕ ИМЯ
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Алексей"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[var(--ds-bg-input)] border border-[var(--ds-border-input)] rounded-xl px-4 py-3 text-sm text-white placeholder-[var(--ds-text-disabled)] outline-none focus:border-[var(--ds-border-input-focus)] focus:ring-1 focus:ring-[var(--ds-accent)]/20 transition-all duration-200"
                    />
                  </div>

                  {/* Phone / Contact field */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[9px] uppercase tracking-widest text-[var(--ds-text-ghost)]">
                      ТЕЛЕФОН ИЛИ TELEGRAM
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+7 (999) 000-00-00 / @username"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full bg-[var(--ds-bg-input)] border border-[var(--ds-border-input)] rounded-xl px-4 py-3 text-sm text-white placeholder-[var(--ds-text-disabled)] outline-none focus:border-[var(--ds-border-input-focus)] focus:ring-1 focus:ring-[var(--ds-accent)]/20 transition-all duration-200"
                    />
                  </div>

                  {/* Lighting selection */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[9px] uppercase tracking-widest text-[var(--ds-text-ghost)]">
                      ТИП ПОДСВЕТКИ
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'internal', label: 'ЛИЦЕВАЯ' },
                        { id: 'halo', label: 'КОНТРАЖУР' },
                        { id: 'none', label: 'БЕЗ СВЕТА' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, lighting: opt.id })}
                          className={`py-2 px-2.5 rounded-lg border font-mono text-[10px] font-black uppercase text-center transition-all ${
                            formData.lighting === opt.id
                              ? 'border-[var(--ds-accent-border)] bg-[var(--ds-accent-soft)] text-[var(--ds-accent)]'
                              : 'border-[var(--ds-border-card)] bg-[var(--ds-bg-page)] text-[var(--ds-text-muted)] hover:border-[var(--ds-accent-border)]/50'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message field */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[9px] uppercase tracking-widest text-[var(--ds-text-ghost)]">
                      ОПИСАНИЕ ИЛИ ВЫСОТА БУКВ
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Буквы 'Кофейня', высота 30см, монтаж на козырек..."
                      value={formData.desc}
                      onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                      className="w-full bg-[var(--ds-bg-input)] border border-[var(--ds-border-input)] rounded-xl px-4 py-3 text-sm text-white placeholder-[var(--ds-text-disabled)] outline-none resize-none focus:border-[var(--ds-border-input-focus)] focus:ring-1 focus:ring-[var(--ds-accent)]/20 transition-all duration-200"
                    />
                  </div>

                  {/* Upload file placeholder */}
                  <div
                    className="rounded-xl border border-dashed border-[var(--ds-border-card)] bg-[var(--ds-bg-page)] p-4 text-center cursor-pointer hover:border-[var(--ds-accent-border)] transition-colors duration-200"
                    onClick={() => openModal({ context: 'Загрузка материалов для расчета', source: modalSource })}
                  >
                    <FileUp className="w-5 h-5 text-[var(--ds-text-muted)] mx-auto mb-2" />
                    <span className="block font-mono text-[9px] uppercase tracking-widest text-white">
                      ЗАГРУЗИТЬ ЛОГОТИП / ФОТО ФАСАДА
                    </span>
                    <span className="block text-[8px] text-[var(--ds-text-ghost)] mt-1">
                      Форматы PDF, PNG, JPG, CAD до 50MB
                    </span>
                  </div>

                  {/* Turnstile security check */}
                  <div className="py-1">
                    <TurnstileWidget onVerify={setTurnstileToken} />
                  </div>

                  {/* Error message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono uppercase tracking-wider text-center"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !turnstileToken}
                    className="w-full py-4 bg-[var(--ds-accent)] text-black rounded-full font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 border border-[var(--ds-accent)] shadow-[var(--ds-glow-accent)] hover:shadow-[var(--ds-glow-accent-lg)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    <span>{isSubmitting ? 'ОБРАБОТКА ДАННЫХ...' : buttonText.toUpperCase()}</span>
                    {!isSubmitting && <Send className="w-3.5 h-3.5" />}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
