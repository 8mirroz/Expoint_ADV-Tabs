'use client';

import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';

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
 * ContactInfoSection — Contact information block with optional inline form.
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
  const contacts = [
    { icon: MapPin, label: 'Адрес', value: address, href: '#map' },
    { icon: Phone, label: 'Телефон', value: phone, href: `tel:${phone.replace(/[\s()-]/g, '')}` },
    { icon: Mail, label: 'Email', value: email, href: `mailto:${email}` },
    { icon: MessageCircle, label: 'Telegram', value: telegram, href: `https://t.me/${telegram.replace('@', '')}` },
    { icon: Send, label: 'WhatsApp', value: 'Написать в WhatsApp', href: `https://wa.me/${whatsapp}` },
    { icon: Clock, label: 'График', value: workingHours },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        {(title || subtitle) && (
          <div className="mb-16">
            {subtitle && (
              <p className="verge-kicker text-primary mb-4">{subtitle}</p>
            )}
            {title && (
              <h2 className="font-headline text-[36px] md:text-[52px] lg:text-[64px] uppercase leading-[0.85] text-on-surface max-w-3xl">
                {title}
              </h2>
            )}
          </div>
        )}

        <div className={`grid gap-12 ${showForm ? 'lg:grid-cols-[1fr_1.2fr]' : 'max-w-2xl'}`}>
          {/* Contact cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {contacts.map((contact, index) => (
              <motion.div
                key={contact.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                {contact.href ? (
                  <a
                    href={contact.href}
                    className="flex items-start gap-4 p-5 bg-surface rounded-[var(--radius-12)] border border-outline hover:border-primary/30 hover:shadow-sm transition-all group"
                  >
                    <contact.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="verge-mono-label text-on-surface-variant mb-1">{contact.label}</p>
                      <p className="text-[14px] font-medium text-on-surface group-hover:text-primary transition-colors">{contact.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-start gap-4 p-5 bg-surface rounded-[var(--radius-12)] border border-outline">
                    <contact.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="verge-mono-label text-on-surface-variant mb-1">{contact.label}</p>
                      <p className="text-[14px] font-medium text-on-surface">{contact.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Inline form */}
          {showForm && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-surface rounded-[var(--radius-16)] border border-outline p-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <h3 className="font-sans font-bold text-[20px] text-on-surface mb-6">
                Напишите нам
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full h-12 px-4 bg-background border border-outline rounded-[var(--radius-8)] text-on-surface text-[14px] placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  className="w-full h-12 px-4 bg-background border border-outline rounded-[var(--radius-8)] text-on-surface text-[14px] placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full h-12 px-4 bg-background border border-outline rounded-[var(--radius-8)] text-on-surface text-[14px] placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none transition-colors"
                />
                <textarea
                  placeholder="Опишите ваш проект"
                  rows={4}
                  className="w-full px-4 py-3 bg-background border border-outline rounded-[var(--radius-8)] text-on-surface text-[14px] placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="w-full h-12 bg-primary text-on-primary rounded-[var(--radius-8)] font-mono font-semibold uppercase tracking-[1px] text-[12px] hover:opacity-90 transition-opacity"
                >
                  Отправить заявку
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
