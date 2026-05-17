'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, ArrowUpRight, Check, Loader2 } from 'lucide-react';
import { TechnicalGrid } from '@/components/ui/TechnicalGrid';

interface ContactInfoSectionProps {
  title?: string;
  subtitle?: string;
  address?: string;
  phone?: string;
  email?: string;
  telegram?: string;
  whatsapp?: string;
  workingHours?: string;
  showForm?: boolean;
}

/**
 * ContactInfoSection — Premium Bento-style contact block with inline form.
 */
export default function ContactInfoSection({
  title,
  subtitle,
  address = 'Москва, ул. Полимерная, д. 8',
  phone = '+7 (495) 000-00-00',
  email = 'info@expoint-adv.ru',
  telegram = '@expoint_adv',
  whatsapp = '+74950000000',
  workingHours = 'Пн–Пт: 9:00–19:00, Сб: 10:00–16:00',
  showForm = true,
}: ContactInfoSectionProps) {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section className="relative section-padding bg-background overflow-hidden">
      {/* Technical grid background */}
      <div className="absolute inset-0 text-on-surface">
        <TechnicalGrid opacity={0.04} spacing={48} />
      </div>
      {/* Subtle top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />

      <div className="section-container relative z-20">
        {/* Header */}
        {(title || subtitle) && (
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {subtitle && (
              <p className="verge-kicker text-primary mb-4">{subtitle}</p>
            )}
            {title && (
              <h2 className="geist-display-2xl uppercase text-on-surface">
                {title}
              </h2>
            )}
          </motion.div>
        )}

        <div className={`grid gap-6 ${showForm ? 'lg:grid-cols-[1fr_420px]' : ''}`}>
          
          {/* ─── LEFT: Bento Grid ─── */}
          <div className="grid grid-cols-2 gap-3 auto-rows-auto">

            {/* LARGE: Address */}
            <motion.a
              href="#map"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.0, duration: 0.4 }}
              className="col-span-2 group relative flex items-end justify-between p-6 bg-surface border border-outline rounded-[var(--radius-12)] hover:border-on-surface/20 hover:shadow-md transition-all duration-300 overflow-hidden min-h-[120px]"
            >
              {/* Metro Station Indicator */}
              <div className="absolute top-4 right-6 flex items-center gap-2 bg-background/25 border border-outline/25 backdrop-blur-sm rounded-full px-3.5 py-1.5 z-10 transition-all duration-300 group-hover:border-[#FFD803]/20 hover:scale-[1.01]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#E31E24] shrink-0">
                  {/* Accurate Moscow Metro M logo */}
                  <path d="M 1.5,19.5 V 4.5 h 4 l 6.5,9.5 6.5,-9.5 h 4 v 15 h -3 v -10.5 l -7.5,10.5 h -1 L 4.5,9 v 10.5 Z" />
                </svg>
                <span className="text-xs font-bold text-[#FFD803]/80 tracking-tight font-sans leading-none">
                  Авиамоторная
                </span>
              </div>

              <div>
                <p className="verge-mono-label text-on-surface-variant mb-2">Адрес производства</p>
                <p className="text-lg md:text-xl font-semibold text-on-surface tracking-tight group-hover:text-primary transition-colors">
                  {address}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <ArrowUpRight className="w-4 h-4 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
              </div>
            </motion.a>

            {/* MEDIUM: Phone */}
            <motion.a
              href={`tel:${phone.replace(/[\s()-]/g, '')}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05, duration: 0.4 }}
              className="group relative flex flex-col justify-between p-5 bg-surface border border-outline rounded-[var(--radius-12)] hover:border-on-surface/20 hover:shadow-md transition-all duration-300 overflow-hidden min-h-[130px]"
            >
              <p className="verge-mono-label text-on-surface-variant">Телефон</p>
              <div>
                <p className="text-base md:text-base font-semibold font-mono text-on-surface group-hover:text-primary transition-colors">
                  {phone}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3 h-3 text-on-surface-variant opacity-0 group-hover:opacity-70 transition-all -translate-x-0.5 group-hover:translate-x-0" />
                </div>
              </div>
            </motion.a>

            {/* MEDIUM: Email */}
            <motion.a
              href={`mailto:${email}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.4 }}
              className="group relative flex flex-col justify-between p-5 bg-surface border border-outline rounded-[var(--radius-12)] hover:border-on-surface/20 hover:shadow-md transition-all duration-300 overflow-hidden min-h-[130px]"
            >
              <p className="verge-mono-label text-on-surface-variant">Email</p>
              <div>
                <p className="text-base font-semibold text-on-surface group-hover:text-primary transition-colors break-all">
                  {email}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3 h-3 text-on-surface-variant opacity-0 group-hover:opacity-70 transition-all -translate-x-0.5 group-hover:translate-x-0" />
                </div>
              </div>
            </motion.a>

            {/* SMALL: Telegram */}
            <motion.a
              href={`https://t.me/${telegram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.11, duration: 0.4 }}
              className="group flex flex-col justify-between p-5 border rounded-[var(--radius-12)] hover:shadow-md transition-all duration-300 min-h-[100px]"
              style={{ backgroundColor: 'color-mix(in oklab, var(--brand-telegram) 10%, transparent)', borderColor: 'color-mix(in oklab, var(--brand-telegram) 25%, transparent)' }}
            >
              <p className="verge-mono-label" style={{ color: 'color-mix(in oklab, var(--brand-telegram) 70%, transparent)' }}>Telegram</p>
              <div className="flex items-center justify-between">
                <p className="text-base font-semibold" style={{ color: 'var(--brand-telegram)' }}>{telegram}</p>
                <MessageCircle className="w-4 h-4" style={{ color: 'color-mix(in oklab, var(--brand-telegram) 50%, transparent)' }} />
              </div>
            </motion.a>

            {/* SMALL: WhatsApp */}
            <motion.a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14, duration: 0.4 }}
              className="group flex flex-col justify-between p-5 border rounded-[var(--radius-12)] hover:shadow-md transition-all duration-300 min-h-[100px]"
              style={{ backgroundColor: 'color-mix(in oklab, var(--brand-whatsapp) 10%, transparent)', borderColor: 'color-mix(in oklab, var(--brand-whatsapp) 25%, transparent)' }}
            >
              <p className="verge-mono-label" style={{ color: 'color-mix(in oklab, var(--brand-whatsapp) 70%, transparent)' }}>WhatsApp</p>
              <div className="flex items-center justify-between">
                <p className="text-base font-semibold" style={{ color: 'var(--brand-whatsapp)' }}>Написать</p>
                <Send className="w-4 h-4" style={{ color: 'color-mix(in oklab, var(--brand-whatsapp) 50%, transparent)' }} />
              </div>
            </motion.a>

            {/* WIDE: Working Hours */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.17, duration: 0.4 }}
              className="col-span-2 flex items-center justify-between p-5 bg-surface/50 border border-outline/60 rounded-[var(--radius-12)]"
            >
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-on-surface-variant/60 shrink-0" />
                <p className="verge-mono-label text-on-surface-variant">График работы</p>
              </div>
              <p className="text-sm font-medium text-on-surface">{workingHours}</p>
            </motion.div>

          </div>

          {/* ─── RIGHT: Premium Glass Form ─── */}
          {showForm && (
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative flex flex-col bg-surface/60 backdrop-blur-xl rounded-[var(--radius-16)] border border-outline/80 p-7 overflow-hidden min-h-[440px]"
              onSubmit={handleSubmit}
            >
              {/* Top Accent Gradient (Mint) */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-80" />

              {/* Form Content */}
              <div className="flex flex-col h-full flex-1">
                <div className="mb-6">
                  <h3 className="font-sans font-bold text-xl text-on-surface tracking-tight">
                    Напишите нам
                  </h3>
                  <p className="text-on-surface-variant text-sm mt-1">Ответим в течение рабочего дня</p>
                </div>

                <div className="flex flex-col gap-3.5 flex-1">
                  <input
                    type="text"
                    required
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-11 px-4 bg-background/70 border border-outline-strong/40 rounded-[var(--radius-8)] text-on-surface text-sm placeholder:text-on-surface-variant/50 hover:border-on-surface/30 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30 focus:shadow-[0_0_12px_rgba(0,245,160,0.15)] focus:bg-background focus:outline-none transition-all duration-300"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Телефон"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-11 px-4 bg-background/70 border border-outline-strong/40 rounded-[var(--radius-8)] text-on-surface text-sm placeholder:text-on-surface-variant/50 hover:border-on-surface/30 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30 focus:shadow-[0_0_12px_rgba(0,245,160,0.15)] focus:bg-background focus:outline-none transition-all duration-300"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-11 px-4 bg-background/70 border border-outline-strong/40 rounded-[var(--radius-8)] text-on-surface text-sm placeholder:text-on-surface-variant/50 hover:border-on-surface/30 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30 focus:shadow-[0_0_12px_rgba(0,245,160,0.15)] focus:bg-background focus:outline-none transition-all duration-300"
                  />
                  <textarea
                    placeholder="Опишите ваш проект"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-background/70 border border-outline-strong/40 rounded-[var(--radius-8)] text-on-surface text-sm placeholder:text-on-surface-variant/50 hover:border-on-surface/30 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30 focus:shadow-[0_0_12px_rgba(0,245,160,0.15)] focus:bg-background focus:outline-none transition-all duration-300 resize-none"
                  />
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full h-11 bg-on-surface text-background rounded-[var(--radius-8)] font-mono font-semibold uppercase tracking-[1.5px] text-xs hover:bg-[var(--accent)] hover:text-black hover:shadow-[0_0_20px_rgba(0,245,160,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Отправка...</span>
                      </>
                    ) : (
                      <span>Отправить заявку</span>
                    )}
                  </button>
                </div>

                {/* Bottom legal note */}
                <p className="text-xs text-on-surface-variant/40 mt-4 text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </div>

              {/* Success Pop-up overlay with premium glassmorphism and mint accent */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 bg-background/95 backdrop-blur-md text-center"
                  >
                    {/* Pulsing mint glow circle */}
                    <div className="relative mb-5 flex items-center justify-center w-16 h-16 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 shadow-[0_0_30px_rgba(0,245,160,0.2)]">
                      <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 rounded-full bg-[var(--accent)]/5 border border-[var(--accent)]/20"
                      />
                      <Check className="w-8 h-8" />
                    </div>

                    <h4 className="text-xl font-bold text-on-surface tracking-tight mb-2">
                      Заявка принята!
                    </h4>
                    <p className="text-sm text-on-surface-variant max-w-[280px] leading-relaxed mb-6">
                      Мы свяжемся с вами в течение рабочего дня для обсуждения деталей вашего проекта.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', phone: '', email: '', message: '' });
                      }}
                      className="px-6 h-10 bg-on-surface text-background rounded-full font-mono font-semibold uppercase tracking-[1px] text-xs hover:bg-[var(--accent)] hover:text-black hover:shadow-[0_0_15px_rgba(0,245,160,0.25)] transition-all duration-300"
                    >
                      Отлично
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
