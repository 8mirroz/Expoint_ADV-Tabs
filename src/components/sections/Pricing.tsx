'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, BriefcaseBusiness, Check, Gem, Network, Rocket, Star } from 'lucide-react';

import { SERVICES } from '@/data/services';

interface ScenarioPackage {
  id: string;
  label: string;
  title: string;
  budget: string;
  budgetNote?: string;
  audience: string;
  includes: string[];
  timeline: string;
  decisionNote?: string;
  recommendation: string[];
  riskLevel: 'low' | 'medium' | 'high';
  isPopular?: boolean;
}

interface PricingProps {
  packages?: ScenarioPackage[];
}

/** Default packages (v10) if not provided via props */
const defaultPackages: ScenarioPackage[] = [
  {
    id: 'start',
    label: 'Start',
    title: 'Локальный стартап',
    budget: 'от 40 000 ₽',
    budgetNote: 'согласование + быстрый запуск',
    audience: 'Магазины у дома, экспресс-кофейни, ПВЗ маркетплейсов и локальные студии.',
    includes: [
      'Базовая вывеска из ПВХ или легкий световой короб',
      'Энергоэффективная лицевая LED-подсветка',
      'Монтаж на высоте до 3 метров в подарок',
      'Гарантия 1–3 года и паспорт изделия',
    ],
    timeline: '5–7 рабочих дней',
    recommendation: ['volumetric-letters', 'lightbox'],
    riskLevel: 'low',
    decisionNote: 'Идеально для экономного и быстрого открытия первой точки продаж',
  },
  {
    id: 'business',
    label: 'Business',
    title: 'Фирменный ритейл',
    budget: 'от 90 000 ₽',
    budgetNote: 'оптимум для трафика и B2B',
    audience: 'Полноформатные кафе, рестораны, салоны красоты, клиники и стрит-ритейл.',
    includes: [
      'Объёмные световые буквы с премиум LED Samsung',
      'Индивидуальный 3D-дизайн и фотопривязка',
      'Бесплатный выезд инженера-замерщика по МКАД',
      '100% аудит соответствия Постановлению 902-ПП',
      'Расширенная B2B-гарантия до 5 лет',
    ],
    timeline: '7–12 рабочих дней',
    recommendation: ['volumetric-letters', 'flex-neon', 'lightbox'],
    riskLevel: 'medium',
    isPopular: true,
    decisionNote: 'Сбалансированное решение по цене, привлекательности и ресурсу',
  },
  {
    id: 'premium',
    label: 'Premium',
    title: 'Архитектурный бренд',
    budget: 'от 150 000 ₽',
    budgetNote: 'эксклюзивные материалы',
    audience: 'Флагманские бутики, рестораны высокой кухни, отели, премиальные офисы.',
    includes: [
      'Конструкции из нержавеющей стали, латуни и композита',
      'Художественный дизайн-проект под фасад здания',
      'Сложный монтаж спецтехникой в ночное время',
      'Регулярное профилактическое обслуживание',
      'Гарантия 5 лет + VIP-сервис 24/7',
    ],
    timeline: '10–18 рабочих дней',
    recommendation: ['metal-letters', 'flex-neon', 'volumetric-letters'],
    riskLevel: 'medium',
    decisionNote: 'Когда статус компании и эстетика фасада важнее минимальной цены',
  },
  {
    id: 'network',
    label: 'Network',
    title: 'Roll-out & Франшизы',
    budget: 'индивидуально',
    budgetNote: 'под единый брендбук и SLA',
    audience: 'Федеральные сети, франшизы, торговые комплексы и ритейл-корпорации.',
    includes: [
      'Разработка единого технического гайдлайна сети',
      'Потоковое серийное производство по спецтарифам',
      'Комплексный roll-out монтаж по всей РФ',
      'Индивидуальный аккаунт-менеджер и отчетность',
      'Круглосуточный мониторинг и обслуживание сети',
    ],
    timeline: 'строго по графику',
    recommendation: ['lightbox', 'volumetric-letters', 'pylon-signs'],
    riskLevel: 'low',
    decisionNote: 'Масштабируемый выпуск вывесок с гарантией соблюдения сроков и SLA',
  },
];

const serviceTitleMap = new Map(SERVICES.map((service) => [service.id, service.title]));

const riskColors: Record<string, string> = {
  low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  medium: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
  high: 'bg-[#00ffa3]/10 text-[#00ffa3] border-[#00ffa3]/20',
};

const riskLabels: Record<string, string> = {
  low: 'Минимальный',
  medium: 'Средний',
  high: 'Высокий',
};

const packageIcons: Record<string, typeof Rocket> = {
  start: Rocket,
  business: BriefcaseBusiness,
  premium: Gem,
  network: Network,
};

/**
 * Pricing — v10: Scenario-based B2B packages with timeline rail,
 * budget anchors, glassmorphism cards, and motion reveals.
 */
export default function Pricing({ packages }: PricingProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [pricingMode, setPricingMode] = useState<'all-inclusive' | 'production-only'>('all-inclusive');

  const items = (packages ?? defaultPackages).map((pkg) => {
    if (pricingMode === 'production-only') {
      let budget = pkg.budget;
      let timeline = pkg.timeline;
      let includes = [...pkg.includes];
      let budgetNote = pkg.budgetNote;

      if (pkg.id === 'start') {
        budget = 'от 34 000 ₽';
        timeline = '4–5 рабочих дней';
        budgetNote = 'чистое производство без монтажа';
        includes = [
          'Базовая вывеска из ПВХ или легкий световой короб',
          'Энергоэффективная лицевая LED-подсветка',
          'Шеф-монтаж и видеоинструкция по установке',
          'Гарантия 1 год и паспорт изделия',
        ];
      } else if (pkg.id === 'business') {
        budget = 'от 76 500 ₽';
        timeline = '6–8 рабочих дней';
        budgetNote = 'оптимум для дилеров и самостоятельных';
        includes = [
          'Объёмные световые буквы с премиум LED Samsung',
          'Индивидуальный 3D-дизайн и чертежи для монтажа',
          'Бесплатный технический аудит ваших замеров',
          '100% аудит соответствия Постановлению 902-ПП',
          'B2B-гарантия на компоненты до 5 лет',
        ];
      } else if (pkg.id === 'premium') {
        budget = 'от 127 500 ₽';
        timeline = '8–12 рабочих дней';
        budgetNote = 'элитные материалы с отправкой по РФ';
        includes = [
          'Конструкции из нержавеющей стали, латуни и композита',
          'Художественный дизайн-проект и монтажные шаблоны',
          'Шеф-монтаж (удаленный или выездной надзор)',
          'Профессиональная упаковка и бережная доставка',
          'Гарантия 5 лет + VIP-поддержка',
        ];
      }

      return {
        ...pkg,
        budget,
        timeline,
        includes,
        budgetNote,
      };
    }
    return pkg;
  });

  return (
    <section
      ref={sectionRef}
      className="section-padding border-t border-white/[0.08] bg-zinc-950 relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.015] bg-[url('/img/patterns/grid.svg')] bg-[length:40px_40px] pointer-events-none" />

      <div className="section-container relative z-10 space-y-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <div className="space-y-5">
            <p className="verge-mono-label text-primary">Пакеты под задачу</p>
            <h2 className="geist-display-lg max-w-[16ch] text-balance text-white">
              Не хотите разбираться в сантиметрах? Выберите готовый пакет.
            </h2>
          </div>
          <p className="max-w-3xl text-lg leading-[1.7] text-neutral-400">
            Четыре сценария для разных задач бизнеса — от быстрого запуска одной точки до масштабирования сети. Каждый пакет включает производство, монтаж и проверку.
          </p>
        </motion.div>

        {/* Interactive Pricing Mode Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center pt-2 pb-4"
        >
          <div className="inline-flex rounded-full bg-zinc-900/90 p-1 border border-white/[0.08] backdrop-blur-md relative shadow-inner select-none">
            <button
              onClick={() => setPricingMode('all-inclusive')}
              className={`relative rounded-full px-5 py-2.5 text-xs font-bold font-mono tracking-wider transition-all duration-300 ${
                pricingMode === 'all-inclusive'
                  ? 'text-black z-10 font-black'
                  : 'text-neutral-400 hover:text-white z-10'
              }`}
            >
              {pricingMode === 'all-inclusive' && (
                <motion.div
                  layoutId="active-pricing-bg"
                  className="absolute inset-0 bg-[#00ffa3] rounded-full shadow-[0_0_15px_rgba(0,255,163,0.3)] z-[-1]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              ПОД КЛЮЧ
            </button>
            <button
              onClick={() => setPricingMode('production-only')}
              className={`relative rounded-full px-5 py-2.5 text-xs font-bold font-mono tracking-wider transition-all duration-300 ${
                pricingMode === 'production-only'
                  ? 'text-black z-10 font-black'
                  : 'text-neutral-400 hover:text-white z-10'
              }`}
            >
              {pricingMode === 'production-only' && (
                <motion.div
                  layoutId="active-pricing-bg"
                  className="absolute inset-0 bg-[#00ffa3] rounded-full shadow-[0_0_15px_rgba(0,255,163,0.3)] z-[-1]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              ТОЛЬКО ПРОИЗВОДСТВО (-15%)
            </button>
          </div>
        </motion.div>

        {/* Package Cards */}
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {items.map((pkg, index) => {
            const Icon = packageIcons[pkg.id] ?? Rocket;
            const isIndividual = pkg.budget.toLowerCase().includes('индивидуал');

            return (
              <motion.article
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.08 * (index + 1), ease: [0.16, 1, 0.3, 1] }}
                className={`group relative flex h-full flex-col rounded-[24px] p-6 transition-all duration-500 overflow-hidden ${
                  pkg.isPopular
                    ? 'shadow-[0_0_35px_rgba(0,255,163,0.04)] hover:shadow-[0_0_55px_rgba(0,255,163,0.08)]'
                    : 'hover:shadow-[0_20px_40px_rgba(0,255,163,0.04)]'
                } hover:-translate-y-2`}
              >
                {/* Dynamic linear sweep border glow on hover */}
                <div className="absolute inset-0 p-[1.2px] rounded-[24px] bg-gradient-to-br from-white/10 via-white/5 to-transparent group-hover:from-[#00ffa3]/40 group-hover:via-[#00ffa3]/10 group-hover:to-purple-500/20 transition-all duration-700 ease-out z-0 pointer-events-none" />
                <div className={`absolute inset-[1.2px] rounded-[22.8px] z-0 pointer-events-none transition-colors duration-500 ${
                  pkg.isPopular ? 'bg-zinc-950/98' : 'bg-zinc-900/98'
                }`} />

                {/* Popular Choice Floating Badge */}
                {pkg.isPopular && (
                  <div className="absolute -top-3 left-6 flex items-center gap-1.5 rounded-full bg-[#00ffa3] px-3.5 py-1 shadow-[0_0_20px_rgba(0,255,163,0.4)] select-none z-20 transition-transform duration-500 group-hover:scale-105">
                    <Star className="h-3 w-3 text-black fill-black animate-pulse" />
                    <span className="text-[9px] font-mono font-bold text-black uppercase tracking-wider">Выбор большинства</span>
                  </div>
                )}

                {/* Card Cover Image */}
                <div className="relative mb-5 overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950 aspect-[16/9] z-10 select-none">
                  <img
                    src={`/img/packages/${pkg.id}.png`}
                    alt={pkg.title}
                    className="h-full w-full object-cover opacity-75 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-zinc-950/20 to-transparent pointer-events-none" />
                  {/* Floating category icon */}
                  <div className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/60 backdrop-blur-md text-white transition-all duration-500 group-hover:border-[#00ffa3]/30 group-hover:text-[#00ffa3]">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                {/* Header Info */}
                <div className="relative z-10 space-y-4">
                  {/* Tag & SLA Risk */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-widest text-[#00ffa3] uppercase select-none">{pkg.label} PACKAGE</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-wider border select-none transition-colors duration-500 ${
                      pkg.riskLevel === 'low'
                        ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400 group-hover:border-emerald-500/30'
                        : pkg.riskLevel === 'medium'
                        ? 'border-emerald-400/20 bg-emerald-400/5 text-emerald-300 group-hover:border-emerald-400/30'
                        : 'border-[#00ffa3]/20 bg-[#00ffa3]/5 text-[#00ffa3] group-hover:border-[#00ffa3]/30'
                    }`}>
                      SLA: {riskLabels[pkg.riskLevel]}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="h-[56px] min-h-[56px] flex flex-col justify-center">
                    <h3 className="text-xl font-bold tracking-tight text-white leading-tight transition-colors duration-300 group-hover:text-[#00ffa3] line-clamp-2">
                      {pkg.title}
                    </h3>
                  </div>

                  {/* Budget Presentation */}
                  <div className="flex flex-col justify-end h-[64px] min-h-[64px] border-b border-white/[0.04] pb-4">
                    {pricingMode === 'production-only' && !isIndividual && (
                      <span className="text-xs line-through text-neutral-500 font-mono mb-1">
                        {pkg.id === 'start' && 'от 40 000 ₽'}
                        {pkg.id === 'business' && 'от 90 000 ₽'}
                        {pkg.id === 'premium' && 'от 150 000 ₽'}
                      </span>
                    )}
                    <span className={`tracking-tight text-white leading-none ${
                      isIndividual
                        ? 'text-[20px] xs:text-xl lg:text-[22px] font-bold text-white/95'
                        : 'text-3xl font-black text-[#00ffa3]'
                    }`}>
                      {isIndividual ? 'Индивидуально' : pkg.budget}
                    </span>
                    {pkg.budgetNote && (
                      <p className="mt-1.5 text-[9px] font-mono tracking-widest text-neutral-400 uppercase">{pkg.budgetNote}</p>
                    )}
                  </div>

                  {/* Audience Info */}
                  <p className="text-xs leading-relaxed text-neutral-400 h-[48px] min-h-[48px] overflow-hidden line-clamp-2">
                    {pkg.audience}
                  </p>
                </div>

                {/* Specifications B2B Widget */}
                <div className="relative z-10 mt-5 h-[156px] min-h-[156px] bg-zinc-950/60 border border-white/[0.04] rounded-2xl p-4 space-y-3.5 group-hover:border-[#00ffa3]/10 transition-all duration-500 overflow-hidden flex flex-col justify-between">
                  {/* Timeline row */}
                  <div className="flex items-center justify-between text-xs h-[20px] min-h-[20px]">
                    <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">Срок производства</span>
                    <span className="font-semibold text-white/90 font-mono whitespace-nowrap">{pkg.timeline}</span>
                  </div>

                  {/* Structures row */}
                  <div className="border-t border-white/[0.04] pt-3 flex flex-col gap-1.5 flex-1 justify-start">
                    <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">Рекомендуемые конструкции</span>
                    <div className="flex flex-wrap gap-1 overflow-hidden">
                      {pkg.recommendation.map((serviceId) => (
                        <span
                          key={serviceId}
                          className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 text-[9px] text-neutral-400 hover:border-[#00ffa3]/25 hover:text-white transition-colors duration-300 font-mono"
                        >
                          {serviceTitleMap.get(serviceId) ?? serviceId}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Includes / Features */}
                <div className="relative z-10 mt-5 h-[190px] min-h-[190px] space-y-2.5 flex flex-col justify-start overflow-hidden border-t border-white/[0.04] pt-4">
                  <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase mb-1">Что входит в пакет</span>
                  {pkg.includes.map((item) => (
                    <div key={item} className="flex gap-2.5 text-xs leading-relaxed text-neutral-400 hover:text-neutral-200 transition-colors duration-300">
                      <Check className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[#00ffa3] shadow-[0_0_6px_rgba(0,255,163,0.3)]" />
                      <span className="line-clamp-2">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Decision Advice Banner */}
                <div className="relative z-10 mt-5 h-[84px] min-h-[84px] rounded-xl border border-[#00ffa3]/10 bg-[#00ffa3]/[0.02] px-4 py-2.5 flex flex-col justify-center overflow-hidden group-hover:bg-[#00ffa3]/[0.04] transition-all duration-500">
                  <p className="text-[9px] font-mono tracking-widest text-[#00ffa3] uppercase font-bold">B2B сценарий</p>
                  <p className="mt-0.5 text-xs leading-normal text-neutral-300 font-medium line-clamp-2">
                    {pkg.decisionNote ?? 'Оптимальное решение для ваших задач'}
                  </p>
                </div>

                {/* CTA Button */}
                <div className="relative z-10 mt-auto pt-5">
                  {pkg.isPopular ? (
                    <Link
                      href="/calculator"
                      className="relative flex h-[48px] w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#00ffa3] text-black font-bold text-xs transition-all duration-300 hover:bg-[#00ffa3]/90 hover:shadow-[0_0_25px_rgba(0,255,163,0.35)] active:scale-[0.98] group"
                    >
                      <span>Быстрый расчет {pkg.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ) : (
                    <Link
                      href="/calculator"
                      className="relative flex h-[48px] w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/[0.1] bg-white/[0.02] backdrop-blur-sm text-white font-semibold text-xs transition-all duration-300 hover:bg-white/[0.04] hover:border-[#00ffa3]/40 hover:shadow-[0_0_20px_rgba(0,255,163,0.05)] active:scale-[0.98] group"
                    >
                      <span>Быстрый расчет {pkg.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform text-[#00ffa3] group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
