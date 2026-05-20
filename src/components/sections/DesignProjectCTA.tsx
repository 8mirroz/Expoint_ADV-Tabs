"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Check,
  Clock3,
  DraftingCompass,
  Factory,
  FileCheck2,
  Layers3,
  Ruler,
  ShieldCheck,
  Sparkles,
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
  badge: { ru: 'Конструкторский дизайн-пакет', en: 'Engineering design pack' },
  outTitle: { ru: 'На выходе', en: 'Deliverables' },
} as const;

const bullets = [
  { ru: '3D-визуализация на фасаде (день/ночь)', en: 'Facade 3D visualization (day/night)' },
  { ru: 'Фотопривязка и проверка по 902-ПП', en: 'Photo fit and 902-PP review' },
  { ru: 'КМ/КМД, спецификация, файлы для ЧПУ', en: 'Engineering drawings, spec, CNC-ready files' },
] as const;

const chips = [
  { icon: Sparkles, value: '3', label: { ru: 'сценария', en: 'scenarios' } },
  { icon: Clock3, value: '24ч', label: { ru: 'старт', en: 'start' } },
  { icon: ShieldCheck, value: '902-ПП', label: { ru: 'комплаенс', en: 'compliance' } },
  { icon: Layers3, value: 'CAD+3D', label: { ru: 'формат', en: 'format' } },
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
      .from('.dp-chip', { opacity: 0, y: 12, stagger: 0.04, duration: 0.25 }, '-=0.2')
      .from('.dp-panel', { opacity: 0, x: 16, duration: 0.45 }, '-=0.15');
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-section="design-project-cta"
      className={`relative overflow-hidden border-y border-white/[0.08] bg-[#070807] py-10 sm:py-12 lg:py-14 ${className}`}
    >
      <div className="absolute inset-0">
        <Image src="/img/backgrounds/design-project-bg.png" alt="" fill sizes="100vw" className="object-cover opacity-[0.18]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,7,0.98),rgba(7,8,7,0.9)_52%,rgba(7,8,7,0.72))]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,160,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,160,0.028)_1px,transparent_1px)] bg-[size:18px_18px]" />
      </div>

      <div className="section-container relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-8">
          <div className="dp-copy lg:col-span-7">
            <p className="verge-mono-label text-[10px] uppercase tracking-[0.22em] text-accent">
              {t(locale, copy.eyebrow)}
            </p>

            <h2 className="mt-5 font-headline text-[2.1rem] font-black leading-[1] text-white sm:text-[2.6rem] lg:text-[3.1rem]">
              {t(locale, copy.title)}
            </h2>
            <p className="mt-3 max-w-[54ch] text-[14px] leading-[1.7] text-neutral-300/82 sm:text-[15px]">
              {t(locale, copy.desc)}
            </p>

            <div className="mt-5 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {chips.map((chip) => {
                const Icon = chip.icon;
                return (
                  <div
                    key={chip.value}
                    className="dp-chip shrink-0 rounded-full border border-white/10 bg-black/38 px-3 py-2 backdrop-blur-md"
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-accent/22 bg-accent/10 text-accent">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-black text-white">{chip.value}</span>
                      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">
                        {t(locale, chip.label)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
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

              <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/28 px-4 py-2 text-xs font-medium text-white/62 sm:justify-start">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,245,160,0.7)]" />
                {t(locale, copy.note)}
              </div>
            </div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.45 }}
            className="dp-panel relative overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(8,10,9,0.9),rgba(3,4,4,0.96))] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] lg:col-span-5"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,245,160,0.65),transparent)]" />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-accent">
                    <DraftingCompass className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/34">PACK</p>
                    <p className="truncate text-sm font-semibold text-white">{t(locale, copy.badge)}</p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[9px] font-mono uppercase tracking-[0.18em] text-white/55">
                  <Ruler className="h-3.5 w-3.5 text-accent/80" />
                  Laser-fit
                </div>
              </div>

              <p className="mt-5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/34">
                {t(locale, copy.outTitle)}
              </p>
              <div className="mt-3 space-y-3">
                {bullets.map((item) => (
                  <div key={item.ru} className="flex items-start gap-3 rounded-lg border border-white/8 bg-black/28 px-3 py-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[13px] leading-[1.55] text-neutral-200/84">{t(locale, item)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                {[
                  { icon: Factory, value: '2500 м²', label: { ru: 'цеха', en: 'workshop' } },
                  { icon: FileCheck2, value: '5 лет', label: { ru: 'гарантия', en: 'warranty' } },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.value} className="rounded-lg border border-white/8 bg-white/[0.025] p-3">
                      <Icon className="h-4 w-4 text-accent" />
                      <p className="mt-3 text-[1.05rem] font-black leading-none text-white">{item.value}</p>
                      <p className="mt-2 text-[9px] font-mono uppercase tracking-[0.16em] text-accent/82">
                        {t(locale, item.label)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
