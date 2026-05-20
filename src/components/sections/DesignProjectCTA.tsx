"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ShieldCheck,
  Cuboid,
  Layers3,
  PenTool,
  Ruler,
  Check,
} from 'lucide-react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';
import { useModalStore } from '@/store/useModalStore';
import gsap, { useGSAP } from '@/lib/gsap';

const copy = {
  eyebrow: { ru: '// DESIGN PROJECT', en: '// DESIGN PROJECT' },
  title: { ru: 'Закажите дизайн-проект вывески.', en: 'Order a sign design project.' },
  desc: {
    ru: 'Соберем несколько рабочих сценариев, проверим фасад и 902-ПП, подготовим конструкторские файлы для производства.',
    en: 'We provide several workable scenarios, validate facade and 902-PP, and prepare engineering files for production.',
  },
  ctaPrimary: { ru: 'Получить 3 сценария', en: 'Get 3 scenarios' },
  ctaSecondary: { ru: 'Проверить фасад', en: 'Check facade' },
  note: { ru: 'первый разбор за 24 часа', en: 'first review within 24 hours' },
} as const;

const featureCards = [
  { icon: Cuboid, title: { ru: 'Ai/3D визуализация', en: 'Ai/3D Visualization' } },
  { icon: Layers3, title: { ru: '3 варианта на выбор', en: '3 options to choose' } },
  { icon: PenTool, title: { ru: 'Дизайн и иллюстрация', en: 'Design and Illustration' } },
  { icon: Ruler, title: { ru: 'CAD чертежи', en: 'CAD drawings' } },
] as const;

const featureLines = [
  { ru: 'Лазерные обмеры и фотопривязка', en: 'Laser measurements and photo placement', be: 'Лазерныя абмеры і фотапрывязка', kk: 'Лазерлік өлшеу және фотоорналастыру', zh: '激光测量与精准贴图', ce: 'Лазерни замерш а, фотопривязка а', tt: 'Лазер үлчәү һәм фотобәйләү' },
  { ru: 'Инженерный пакет КМ/КМД', en: 'Engineering package for fabrication', be: 'Інжынерны пакет КМ/КМД', kk: 'КМ/КМД инженерлік пакеті', zh: '生产用工程图纸包', ce: 'Инженерни пакет КМ/КМД', tt: 'Инженер пакеты КМ/КМД' },
  { ru: 'Свет и посадка под фасад', en: 'Light and fit tuned to the facade', be: 'Святло і пасадка пад фасад', kk: 'Жарық және қасбетке бейімдеу', zh: '针对具体门面的灯光与落位', ce: 'Свет а, фасаданна посадка а', tt: 'Яктылык һәм фасад өчен урнашу' },
] as const;

export default function DesignProjectCTA({ className = '' }: { className?: string }) {
  const { locale } = useLanguage();
  const openModal = useModalStore((state) => state.openModal);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
    });

    tl.from('.dp-copy', { opacity: 0, y: 18, duration: 0.45 })
      .from('.dp-card', { opacity: 0, y: 16, stagger: 0.08, duration: 0.4 }, '-=0.2');
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-section="design-project-cta"
      className={`relative overflow-hidden border-y border-white/[0.08] bg-[#070807] py-14 sm:py-16 lg:py-20 ${className}`}
    >
      <div className="absolute inset-0">
        <Image src="/img/backgrounds/design-project-bg.png" alt="" fill sizes="100vw" className="object-cover opacity-[0.15]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,7,0.98),rgba(7,8,7,0.9)_52%,rgba(7,8,7,0.72))]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,160,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,160,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="section-container relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12 xl:px-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          
          {/* Left Text Content */}
          <div className="dp-copy max-w-xl">
            <p className="verge-mono-label text-[10px] uppercase tracking-[0.22em] text-accent">
              {t(locale, copy.eyebrow)}
            </p>

            <h2 className="mt-5 font-headline text-[2.2rem] font-black leading-[1.05] text-white sm:text-[2.8rem] lg:text-[3.2rem]">
              {t(locale, copy.title)}
            </h2>
            <p className="mt-4 text-[15px] leading-[1.7] text-neutral-300/80 sm:text-[16px]">
              {t(locale, copy.desc)}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <motion.button
                onClick={() => openModal({ context: 'Дизайн-проект вывески', source: 'design_project_cta' })}
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="geist-button-primary group h-[52px] w-full gap-3 px-7 text-sm sm:w-auto"
              >
                {t(locale, copy.ctaPrimary)}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                onClick={() => openModal({ context: 'Проверка фасада по 902-ПП', source: 'design_project_cta_facade' })}
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="flex h-[52px] w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-6 text-sm font-semibold text-white transition-colors duration-300 hover:border-accent/35 hover:bg-accent/8 sm:w-auto"
              >
                <ShieldCheck className="h-4 w-4 text-accent" />
                {t(locale, copy.ctaSecondary)}
              </motion.button>

              <div className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/28 px-4 py-2 text-xs font-medium text-white/60 sm:mt-0 sm:justify-start">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,245,160,0.7)]" />
                {t(locale, copy.note)}
              </div>
            </div>
          </div>

          {/* Right Cards Grid */}
          <div className="w-full max-w-[500px] lg:shrink-0">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {featureCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <div
                    key={i}
                    className="dp-card group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-accent/30 hover:bg-white/[0.04] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                  >
                    {/* Subtle Top Gradient Line */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/0 to-transparent transition-all duration-500 group-hover:via-accent/40" />
                    
                    {/* Icon Container */}
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/5 bg-black/40 text-neutral-400 transition-colors duration-300 group-hover:border-accent/20 group-hover:bg-accent/10 group-hover:text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    {/* Text */}
                    <h3 className="text-[13px] font-semibold leading-[1.3] text-white/90 sm:text-[15px]">
                      {t(locale, card.title)}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom: Design Pack & Pricing */}
        <div className="dp-card mt-12 lg:mt-16 rounded-[24px] border border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent p-6 md:p-8 flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Left side of bottom panel */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">Premium Workflow</p>
              <h4 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Конструкторский дизайн-пакет
              </h4>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {featureLines.map((item) => (
                <div key={item.ru} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/10 border border-accent/20">
                    <Check className="h-2.5 w-2.5 text-accent" />
                  </div>
                  <span className="text-xs text-white/70 leading-snug">
                    {t(locale, item)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Pricing Matrix */}
          <div className="flex-[1.2] lg:border-l lg:border-white/10 lg:pl-10 flex flex-col justify-center">
            <div className="space-y-4 font-mono">
              {/* Option 1 */}
              <div className="group/row">
                <div className="flex items-end justify-between text-xs font-semibold mb-1">
                  <span className="text-white/80 transition-colors group-hover/row:text-white">
                    {t(locale, { ru: '1. Проект + Производство', en: '1. Project + Fabrication' })}
                  </span>
                  <span className="flex-grow border-b border-dotted border-white/15 mx-3 relative -top-1 transition-colors group-hover/row:border-white/30" />
                  <span className="text-accent font-bold">0 ₽</span>
                </div>
                <p className="text-[10px] text-white/40 leading-snug">
                  {t(locale, { ru: 'Компенсация стоимости проектирования при заказе вывески', en: 'Design cost is 100% refunded when you order signage' })}
                </p>
              </div>

              {/* Option 2 */}
              <div className="group/row">
                <div className="flex items-end justify-between text-xs font-semibold mb-1">
                  <span className="text-white/80 transition-colors group-hover/row:text-white">
                    {t(locale, { ru: '2. Чертежи КМ/КМД', en: '2. Engineering DWG bundle' })}
                  </span>
                  <span className="flex-grow border-b border-dotted border-white/15 mx-3 relative -top-1 transition-colors group-hover/row:border-white/30" />
                  <span className="text-white font-bold">9 900 ₽</span>
                </div>
                <p className="text-[10px] text-white/40 leading-snug">
                  {t(locale, { ru: 'Ветровые нагрузки, крепления и файлы для ЧПУ', en: 'CNC cutting paths, structural stress analysis' })}
                </p>
              </div>

              {/* Option 3 */}
              <div className="group/row">
                <div className="flex items-end justify-between text-xs font-semibold mb-1">
                  <span className="text-white/80 transition-colors group-hover/row:text-white">
                    {t(locale, { ru: '3. Согласование 902-ПП', en: '3. 902-PP Permit Approval' })}
                  </span>
                  <span className="flex-grow border-b border-dotted border-white/15 mx-3 relative -top-1 transition-colors group-hover/row:border-white/30" />
                  <span className="text-white font-bold">{t(locale, { ru: 'от 15 000 ₽', en: 'from 15 000 ₽' })}</span>
                </div>
                <p className="text-[10px] text-white/40 leading-snug">
                  {t(locale, { ru: 'Официальное оформление под ключ', en: 'Full state paperwork preparation & filing' })}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
