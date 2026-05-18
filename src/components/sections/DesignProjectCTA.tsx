"use client";

import { useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Clock, ShieldCheck, Coins, Check, ArrowRight, Send, MessageCircle, Ruler, Layers3 } from 'lucide-react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';
import { useModalStore } from '@/store/useModalStore';
import gsap, { useGSAP } from '@/lib/gsap';

const copy = {
  sectionLabel: { ru: '// DESIGN & VISUALIZATION', en: '// DESIGN & VISUALIZATION' },
  sectionTitle: { ru: 'Закажите дизайн-проект вывески.', en: 'Order a sign design project.' },
  sectionDesc: { ru: 'Разработаем фотореалистичный 3D-макет, сделаем фотопривязку по 902-ПП и подготовим точные конструкторские файлы для ЧПУ до начала производства.', en: 'We will develop a photorealistic 3D layout, perform photo alignment in accordance with 902-PP, and prepare precise CNC engineering files before production starts.' },
  packageBadge: { ru: 'ИНДИВИДУАЛЬНЫЙ ЗАКАЗ', en: 'CUSTOM ORDER' },
  packageTitle: { ru: 'Конструкторский дизайн-пакет', en: 'Engineering Design Package' },
  phoneLabel: { ru: '+7 (495) 000-00-00', en: '+7 (495) 000-00-00' },
  orWriteUs: { ru: 'Или напишите в мессенджеры:', en: 'Or message us directly:' },
  freeEstimate: { ru: 'Бесплатный расчет за 24 часа', en: 'Free estimate within 24 hours' },
  orderProject: { ru: 'Заказать дизайн-проект', en: 'Order design project' },
} as const;

interface CardItem {
  icon: typeof Sparkles;
  value: string;
  suffix?: string;
  label: { ru: string; en: string };
  desc: { ru: string; en: string };
}

export default function DesignProjectCTA({ className = '' }: { className?: string }) {
  const { locale } = useLanguage();
  const openModal = useModalStore((state) => state.openModal);
  const sectionRef = useRef<HTMLElement>(null);

  const cardItems: CardItem[] = [
    {
      icon: Sparkles,
      value: '3D',
      label: { ru: '3D-ВИЗУАЛИЗАЦИЯ', en: '3D VISUALIZATION' },
      desc: {
        ru: 'Покажем, как вывеска впишется в фасад при дневном и ночном освещении.',
        en: 'Show how the sign fits the facade under day and night lighting conditions.'
      }
    },
    {
      icon: Clock,
      value: '24',
      suffix: 'ч',
      label: { ru: 'ЭКСКЛЮЗИВНЫЙ МАКЕТ', en: 'EXCLUSIVE LAYOUT' },
      desc: {
        ru: 'Первые эскизы и конструктивные решения за 1 день с момента замера.',
        en: 'First sketches and structural concepts within 1 day from measurement.'
      }
    },
    {
      icon: ShieldCheck,
      value: '902',
      suffix: '-ПП',
      label: { ru: 'COMPLIANCE 902-ПП', en: 'COMPLIANCE 902-PP' },
      desc: {
        ru: 'Проверяем размер, вылет, размещение и исключаем риски демонтажа.',
        en: 'Verify size, projection, alignment, and eliminate any legal removal risks.'
      }
    },
    {
      icon: Coins,
      value: '0',
      suffix: '₽',
      label: { ru: 'ВЫЧЕТ ИЗ СМЕТЫ', en: 'COST DEDUCTION' },
      desc: {
        ru: 'Стоимость проектирования полностью вычитается из стоимости вывески при заказе.',
        en: 'Design cost is fully deducted from the final sign production budget.'
      }
    }
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 78%',
        once: true,
      },
    });

    tl.from('.design-cta-copy', { opacity: 0, x: -28, duration: 0.7 })
      .from('.design-cta-metric', { opacity: 0, y: 28, stagger: 0.08, duration: 0.45 }, '-=0.35')
      .from('.design-cta-panel', { opacity: 0, x: 30, duration: 0.75 }, '-=0.45');

    gsap.to('.design-cta-ambient', {
      xPercent: 4,
      yPercent: -3,
      scale: 1.06,
      duration: 5.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden border-y border-white/[0.08] bg-[#090909] py-16 lg:flex lg:min-h-[100svh] lg:items-center lg:py-10 ${className}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,160,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,160,0.028)_1px,transparent_1px)] bg-[size:18px_18px] pointer-events-none z-0" />
      <div className="design-cta-ambient absolute top-1/2 left-[22%] -translate-x-1/2 -translate-y-1/2 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,245,160,0.1)_0%,transparent_72%)] pointer-events-none z-0" />
      <div className="absolute right-[10%] top-[18%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,245,160,0.06)_0%,transparent_76%)] pointer-events-none z-0" />

      <div className="section-container relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 xl:gap-10 lg:items-stretch">
          <div className="design-cta-copy lg:col-span-7 flex min-h-0 flex-col justify-between gap-8 lg:pr-4">
            <div className="max-w-[760px]">
              <p className="verge-mono-label mb-4 text-accent uppercase tracking-[0.22em] text-[11px]">
                {t(locale, copy.sectionLabel)}
              </p>
              <h2 className="font-headline text-[2.6rem] font-black leading-[0.92] tracking-[-0.045em] text-white sm:text-[3.3rem] lg:text-[4.45rem] xl:text-[4.95rem]">
                {t(locale, copy.sectionTitle)}
              </h2>
              <p className="mt-5 max-w-[44rem] text-[1rem] leading-[1.55] text-neutral-300/82 sm:text-[1.08rem] lg:text-[1.12rem]">
                {t(locale, copy.sectionDesc)}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:gap-5">
              {cardItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label.ru}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: index * 0.08, duration: 0.65 }}
                    className="design-cta-metric group relative overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(14,14,16,0.92),rgba(8,8,10,0.94))] p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_16px_34px_rgba(0,0,0,0.34),0_0_0_1px_rgba(0,245,160,0.14)]"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(0,245,160,0.08),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="pointer-events-none absolute right-4 top-4 text-[9px] font-mono uppercase tracking-[0.22em] text-white/18">
                      0{index + 1}
                    </div>
                    <div className="relative z-10 mb-5 flex h-11 w-11 items-center justify-center rounded-[14px] border border-white/12 bg-white/[0.03] text-accent transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="relative z-10 flex items-baseline gap-0.5 whitespace-nowrap text-[2.7rem] font-black leading-none tracking-[-0.05em] text-white sm:text-[3rem] xl:text-[3.25rem]">
                      {item.value}
                      {item.suffix && (
                        <span className="relative bottom-[0.08em] ml-0.5 text-[1.05rem] font-medium tracking-[-0.01em] text-accent/90 sm:text-[1.2rem]">
                          {item.suffix}
                        </span>
                      )}
                    </div>
                    <p className="relative z-10 mt-3 text-[10px] font-mono uppercase tracking-[0.2em] text-accent/88">
                      {t(locale, item.label)}
                    </p>
                    <p className="relative z-10 mt-2.5 max-w-[28ch] text-[13.5px] leading-[1.6] text-neutral-300/76">
                      {t(locale, item.desc)}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 flex min-h-0 items-stretch">
            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="design-cta-panel relative flex w-full min-h-[560px] overflow-hidden rounded-[28px] border border-white/10 bg-black/80 shadow-[0_26px_70px_rgba(0,0,0,0.55)]"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src="/img/backgrounds/design-project-bg.png" 
                  alt="CAD Design Project Blueprint"
                  className="h-full w-full object-cover opacity-[0.24] transition-transform duration-[4s] ease-out group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/96 via-black/86 to-black/48" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/58 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_45%,rgba(0,245,160,0.08),transparent_64%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,180,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,180,0.015)_1px,transparent_1px)] bg-[size:14px_14px] opacity-40" />
              </div>

              <div className="absolute top-4 left-4 right-4 h-[1px] bg-white/5" />
              <div className="absolute bottom-4 left-4 right-4 h-[1px] bg-white/5" />

              <div className="relative z-10 flex h-full w-full flex-col justify-between gap-8 p-7 sm:p-8 xl:p-9">
                <div className="space-y-5">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 text-[9px] font-mono tracking-widest text-accent bg-accent/10 border border-accent/20 rounded-full">
                      {t(locale, copy.packageBadge)}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  </div>

                  <div className="space-y-3.5">
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/26">
                      <Layers3 className="h-3.5 w-3.5 text-accent/70" />
                      Advanced Design System
                    </div>
                    <h3 className="max-w-[13ch] text-[2.1rem] font-black leading-[0.92] tracking-[-0.04em] text-white sm:text-[2.45rem] xl:text-[2.9rem]">
                      {t(locale, copy.packageTitle)}
                    </h3>
                    <p className="max-w-[38ch] text-[14px] leading-[1.62] text-neutral-300/74">
                      Полный комплект документации для изготовления вывески и прохождения всех этапов городского согласования в одном пакете.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 rounded-[20px] border border-white/8 bg-white/[0.02] p-3.5">
                    <div className="rounded-2xl border border-white/8 bg-black/30 p-3.5">
                      <div className="mb-1 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                        <Ruler className="h-4 w-4" />
                      </div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Фотопривязка</p>
                      <p className="mt-1 text-lg font-bold tracking-[-0.03em] text-white">Laser-fit</p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-black/30 p-3.5">
                      <div className="mb-1 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/42">Согласование</p>
                      <p className="mt-1 text-lg font-bold tracking-[-0.03em] text-white">902-ПП</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-1">
                    {[
                      { ru: 'Лазерные обмеры и точная фотопривязка', en: 'Laser measurements and precise photo placement' },
                      { ru: 'Визуализация дневного и ночного свечения', en: 'Visualization of day and night lighting' },
                      { ru: 'Инженерный КМ/КМД пакет чертежей для ЧПУ', en: 'Engineering CD drawings ready for CNC' },
                      { ru: 'Паспорт вывески и проверка на 902-ПП', en: 'Signage passport and 902-PP validation' }
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-xl border border-transparent px-1 py-1 transition-colors duration-300 hover:border-white/6 hover:bg-white/[0.02]">
                        <div className="mt-1 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-accent/10 border border-accent/30 text-accent">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-neutral-200 text-[13.5px] font-medium tracking-tight leading-relaxed">
                          {t(locale, feature)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-5 border-t border-white/10 pt-5">
                  <div className="space-y-2">
                    <span className="block text-[10px] font-mono tracking-[0.2em] text-accent uppercase">
                      СВЯЗАТЬСЯ НАПРЯМУЮ // DIRECT LINE
                    </span>
                    <a
                      href="tel:+74950000000"
                      className="block max-w-[10ch] text-[2.8rem] font-black leading-[0.9] tracking-[-0.05em] text-white transition-colors duration-300 hover:text-accent sm:text-[3.6rem] xl:text-[4.2rem]"
                    >
                      {t(locale, copy.phoneLabel)}
                    </a>
                  </div>

                  <div className="space-y-3">
                    <span className="block text-[10px] font-mono tracking-[0.15em] text-neutral-400 uppercase">
                      {t(locale, copy.orWriteUs)}
                    </span>
                    <div className="flex items-center gap-4">
                      <a
                        href="https://t.me/expoint_adv"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex h-12 w-12 items-center justify-center rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.15)] transition-all duration-300 hover:scale-110 hover:border-sky-500/50 hover:bg-sky-500/20 active:scale-95 group/dot cursor-pointer"
                      >
                        <span className="absolute h-3 w-3 rounded-full bg-sky-400 opacity-60 animate-ping group-hover/dot:opacity-80" />
                        <Send className="relative z-10 h-5 w-5" />
                      </a>
                      <a
                        href="https://wa.me/74950000000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-300 hover:scale-110 hover:border-emerald-500/50 hover:bg-emerald-500/20 active:scale-95 group/dot cursor-pointer"
                      >
                        <span className="absolute h-3 w-3 rounded-full bg-emerald-400 opacity-60 animate-ping group-hover/dot:opacity-80" />
                        <MessageCircle className="relative z-10 h-5 w-5" />
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col items-stretch gap-3 pt-1 sm:flex-row sm:items-center">
                    <button
                      onClick={() => openModal({ context: 'Заказ дизайн-проекта вывески', source: 'design_cta' })}
                      className="group flex h-[54px] w-full flex-grow items-center justify-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold tracking-[-0.01em] text-black shadow-[0_0_24px_rgba(0,245,160,0.22)] transition-all duration-300 hover:-translate-y-px hover:bg-accent/90 hover:shadow-[0_0_32px_rgba(0,245,160,0.38)] active:scale-[0.97] sm:w-auto"
                      style={{ fontFamily: 'var(--font-header)' }}
                    >
                      <span>{t(locale, copy.orderProject)}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>

                    <div className="flex items-center justify-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(0,245,160,0.65)]" />
                      <span className="text-xs font-medium tracking-wide text-white/60">
                        {t(locale, copy.freeEstimate)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
