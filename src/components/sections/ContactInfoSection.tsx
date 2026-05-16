'use client';

import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, ArrowUpRight } from 'lucide-react';
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
  address = 'Москва, ул. Промышленная, д. 12, стр. 3',
  phone = '+7 (495) 000-00-00',
  email = 'info@expoint-adv.ru',
  telegram = '@expoint_adv',
  whatsapp = '+74950000000',
  workingHours = 'Пн–Пт: 9:00–19:00, Сб: 10:00–16:00',
  showForm = true,
}: ContactInfoSectionProps) {

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
              {/* Background label */}
              <span className="absolute top-4 right-6 text-[80px] font-black opacity-[0.03] uppercase leading-none pointer-events-none select-none">
                ADR
              </span>
              <div>
                <p className="verge-mono-label text-on-surface-variant mb-2">Адрес производства</p>
                <p className="text-lg md:text-xl font-semibold text-on-surface tracking-tight group-hover:text-primary transition-colors">
                  {address}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <MapPin className="w-5 h-5 text-on-surface-variant" />
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
              <span className="absolute bottom-2 right-3 text-[56px] font-black opacity-[0.04] leading-none pointer-events-none select-none">TEL</span>
              <p className="verge-mono-label text-on-surface-variant">Телефон</p>
              <div>
                <p className="text-base md:text-base font-semibold font-mono text-on-surface group-hover:text-primary transition-colors">
                  {phone}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Phone className="w-3.5 h-3.5 text-on-surface-variant/50" />
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
              <span className="absolute bottom-2 right-3 text-[56px] font-black opacity-[0.04] leading-none pointer-events-none select-none">@</span>
              <p className="verge-mono-label text-on-surface-variant">Email</p>
              <div>
                <p className="text-base font-semibold text-on-surface group-hover:text-primary transition-colors break-all">
                  {email}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Mail className="w-3.5 h-3.5 text-on-surface-variant/50" />
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
              className="relative flex flex-col bg-surface/60 backdrop-blur-xl rounded-[var(--radius-16)] border border-outline/80 p-7 overflow-hidden"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Subtle gradient top accent */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-on-surface/10 to-transparent" />

              <div className="mb-6">
                <h3 className="font-sans font-bold text-xl text-on-surface tracking-tight">
                  Напишите нам
                </h3>
                <p className="text-on-surface-variant text-sm mt-1">Ответим в течение рабочего дня</p>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                {[
                  { type: 'text', placeholder: 'Ваше имя' },
                  { type: 'tel', placeholder: 'Телефон' },
                  { type: 'email', placeholder: 'Email' },
                ].map((field) => (
                  <input
                    key={field.placeholder}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full h-11 px-4 bg-background/50 border border-outline/60 rounded-[var(--radius-8)] text-on-surface text-sm placeholder:text-on-surface-variant/40 focus:border-on-surface/30 focus:bg-background focus:outline-none transition-all"
                  />
                ))}
                <textarea
                  placeholder="Опишите ваш проект"
                  rows={4}
                  className="w-full px-4 py-3 bg-background/50 border border-outline/60 rounded-[var(--radius-8)] text-on-surface text-sm placeholder:text-on-surface-variant/40 focus:border-on-surface/30 focus:bg-background focus:outline-none transition-all resize-none"
                />
                <button
                  type="submit"
                  className="mt-1 w-full h-11 bg-on-surface text-background rounded-[var(--radius-8)] font-mono font-semibold uppercase tracking-[1.5px] text-xs hover:bg-on-surface/85 active:scale-[0.99] transition-all"
                >
                  Отправить заявку
                </button>
              </div>

              {/* Bottom legal note */}
              <p className="text-xs text-on-surface-variant/40 mt-4 text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
