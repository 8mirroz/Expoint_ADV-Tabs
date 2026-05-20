'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  Clock3,
  Gem,
  Network,
  Rocket,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import { SERVICES } from '@/data/services';
import gsap, { useGSAP } from '@/lib/gsap';

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

type PricingMode = 'all-inclusive' | 'production-only';

const serviceTitleMap = new Map(SERVICES.map((service) => [service.id, service.title]));

const riskLabels: Record<ScenarioPackage['riskLevel'], string> = {
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

const packageThemes: Record<
  string,
  { accent: string; accentSoft: string; border: string; surface: string; ring: string; titleHover: string }
> = {
  start: {
    accent: 'text-sky-200',
    accentSoft: 'bg-sky-400/10 text-sky-100 border-sky-300/20',
    border: 'border-sky-400/20',
    surface: 'from-sky-500/15 via-cyan-400/8 to-emerald-400/12',
    ring: 'shadow-[0_0_0_1px_rgba(56,189,248,0.14),0_18px_40px_rgba(0,0,0,0.34)]',
    titleHover: 'group-hover:text-sky-200',
  },
  business: {
    accent: 'text-[#00ffa3]',
    accentSoft: 'bg-[#00ffa3]/10 text-[#00ffa3] border-[#00ffa3]/20',
    border: 'border-[#00ffa3]/22',
    surface: 'from-[#00ffa3]/16 via-emerald-400/10 to-cyan-400/14',
    ring: 'shadow-[0_0_0_1px_rgba(0,255,163,0.16),0_18px_44px_rgba(0,0,0,0.34)]',
    titleHover: 'group-hover:text-[#00ffa3]',
  },
  premium: {
    accent: 'text-amber-100',
    accentSoft: 'bg-amber-400/10 text-amber-100 border-amber-300/20',
    border: 'border-amber-400/22',
    surface: 'from-amber-400/16 via-orange-300/10 to-rose-400/12',
    ring: 'shadow-[0_0_0_1px_rgba(251,191,36,0.14),0_18px_44px_rgba(0,0,0,0.34)]',
    titleHover: 'group-hover:text-amber-100',
  },
  network: {
    accent: 'text-violet-100',
    accentSoft: 'bg-violet-400/10 text-violet-100 border-violet-300/20',
    border: 'border-violet-400/22',
    surface: 'from-violet-400/16 via-cyan-400/10 to-[#00ffa3]/10',
    ring: 'shadow-[0_0_0_1px_rgba(167,139,250,0.14),0_18px_44px_rgba(0,0,0,0.34)]',
    titleHover: 'group-hover:text-violet-100',
  },
};

const packageModeCopy: Record<PricingMode, { label: string; description: string }> = {
  'all-inclusive': {
    label: 'Под ключ',
    description: 'Монтаж, согласование и проверка включены в рабочий сценарий.',
  },
  'production-only': {
    label: 'Только производство',
    description: 'Снимаем монтаж из сметы и показываем чистую производственную часть.',
  },
};

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
      'AI-предпросмотр фасада (входит в стоимость)',
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
      'AI-предпросмотр фасада (входит в стоимость)',
      'Выезд инженера-замерщика по МКАД',
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
      'AI-предпросмотр фасада (входит в стоимость)',
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

const getWarranty = (id: string, mode: PricingMode) => {
  if (id === 'start') return mode === 'all-inclusive' ? '1–3 года' : '1 год';
  if (id === 'business') return 'до 5 лет';
  if (id === 'premium') return mode === 'all-inclusive' ? '5 лет + VIP' : '5 лет';
  return 'по SLA';
};

const getCompliance = (id: string) => {
  if (id === 'start') return 'Базовый аудит';
  if (id === 'business') return '100% аудит (902-ПП)';
  if (id === 'premium') return 'VIP-экспертиза';
  return 'Полный комплаенс';
};

const getBudget = (pkg: ScenarioPackage, mode: PricingMode) => {
  if (mode === 'all-inclusive') {
    return {
      budget: pkg.budget,
      budgetNote: pkg.budgetNote,
      previousBudget: null as string | null,
      timeline: pkg.timeline,
      includes: pkg.includes,
    };
  }

  if (pkg.id === 'start') {
    return {
      budget: 'от 34 000 ₽',
      budgetNote: 'чистое производство без монтажа',
      previousBudget: pkg.budget,
      timeline: '4–5 рабочих дней',
      includes: [
        'Базовая вывеска из ПВХ или легкий световой короб',
        'Энергоэффективная лицевая LED-подсветка',
        'AI-предпросмотр фасада (входит в стоимость)',
        'Шеф-монтаж и видеоинструкция по установке',
        'Гарантия 1 год и паспорт изделия',
      ],
    };
  }

  if (pkg.id === 'business') {
    return {
      budget: 'от 76 500 ₽',
      budgetNote: 'оптимум для дилеров и самостоятельных',
      previousBudget: pkg.budget,
      timeline: '6–8 рабочих дней',
      includes: [
        'Объёмные световые буквы с премиум LED Samsung',
        'AI-предпросмотр фасада (входит в стоимость)',
        'Бесплатный технический аудит ваших замеров',
        '100% аудит соответствия Постановлению 902-ПП',
        'B2B-гарантия на компоненты до 5 лет',
      ],
    };
  }

  if (pkg.id === 'premium') {
    return {
      budget: 'от 127 500 ₽',
      budgetNote: 'элитные материалы с отправкой по РФ',
      previousBudget: pkg.budget,
      timeline: '8–12 рабочих дней',
      includes: [
        'Конструкции из нержавеющей стали, латуни и композита',
        'AI-предпросмотр фасада (входит в стоимость)',
        'Шеф-монтаж (удаленный или выездной надзор)',
        'Профессиональная упаковка и бережная доставка',
        'Гарантия 5 лет + VIP-поддержка',
      ],
    };
  }

  return {
    budget: pkg.budget,
    budgetNote: pkg.budgetNote,
    previousBudget: null as string | null,
    timeline: pkg.timeline,
    includes: pkg.includes,
  };
};

/**
 * Pricing — premium scenario cards with clearer hierarchy, more contrast,
 * and GSAP-driven reveal/ambient motion.
 */
export default function Pricing({ packages }: PricingProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [pricingMode, setPricingMode] = useState<PricingMode>('all-inclusive');

  const items = (packages ?? defaultPackages).map((pkg) => ({
    ...pkg,
    ...getBudget(pkg, pricingMode),
  }));

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 76%',
          once: true,
        },
      });

      tl.from('.pricing-headline', { opacity: 0, y: 28, duration: 0.65 })
        .from('.pricing-toggle-wrap', { opacity: 0, y: 18, duration: 0.35 }, '-=0.25')
        .from('.pricing-premium-card', { opacity: 0, y: 38, scale: 0.98, stagger: 0.09, duration: 0.55 }, '-=0.08');

      gsap.to('.pricing-ambient', {
        xPercent: 3,
        yPercent: -2,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.pricing-grid-line', {
        backgroundPositionX: '42px',
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="section-padding border-t border-white/[0.08] bg-[radial-gradient(120%_100%_at_50%_0%,rgba(0,255,163,0.08),rgba(0,0,0,0)_48%),#070707] relative overflow-hidden"
    >
      <div className="pricing-ambient pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_12%_18%,rgba(0,255,163,0.16),transparent_28%),radial-gradient(circle_at_86%_14%,rgba(168,85,247,0.12),transparent_24%),radial-gradient(circle_at_50%_78%,rgba(14,165,233,0.08),transparent_28%)] opacity-80" />
      <div className="pricing-grid-line pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(0,255,163,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,163,0.03)_1px,transparent_1px)] bg-[size:22px_22px]" />
      <div className="absolute inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-[#00ffa3]/30 to-transparent" />

      <div className="section-container relative z-10 space-y-12">
        <div className="pricing-headline grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div className="space-y-5">
            <p className="verge-mono-label text-primary tracking-[0.22em]">Пакеты под задачу</p>
            <h2 className="geist-display-lg max-w-[15ch] text-balance text-white">
              Пакет выбирается по сценарию, а не по красивой цифре.
            </h2>
          </div>

          <div className="space-y-5">
            <p className="max-w-3xl text-lg leading-[1.7] text-neutral-300/90">
              Мы собрали четыре сценария с прозрачной логикой бюджета, сроков, гарантии и комплаенса. Информация плотная, но без визуального шума: ключевые значения всегда на первом плане.
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                <p className="text-[10px] font-mono tracking-[0.18em] text-neutral-500 uppercase">Сценариев</p>
                <p className="mt-1 text-lg font-semibold text-white">4 рабочих пакета</p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                <p className="text-[10px] font-mono tracking-[0.18em] text-neutral-500 uppercase">Монтаж</p>
                <p className="mt-1 text-lg font-semibold text-white">от 4 000 ₽</p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                <p className="text-[10px] font-mono tracking-[0.18em] text-neutral-500 uppercase">Проверка</p>
                <p className="mt-1 text-lg font-semibold text-[#00ffa3]">902-ПП до запуска</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pricing-toggle-wrap flex items-center justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-zinc-950/85 p-1 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-md">
            {(['all-inclusive', 'production-only'] as PricingMode[]).map((mode) => {
              const active = pricingMode === mode;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setPricingMode(mode)}
                  aria-pressed={active}
                  className={`relative rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
                    active ? 'text-black' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="pricing-toggle-bg"
                      className="absolute inset-0 rounded-full bg-[#00ffa3] shadow-[0_0_18px_rgba(0,255,163,0.28)]"
                      transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{packageModeCopy[mode].label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center">
          <p className="max-w-3xl text-center text-sm leading-6 text-neutral-400">
            {packageModeCopy[pricingMode].description}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {items.map((pkg) => {
            const Icon = packageIcons[pkg.id] ?? Rocket;
            const theme = packageThemes[pkg.id] ?? packageThemes.start;
            const isIndividual = pkg.budget.toLowerCase().includes('индивидуал');

            return (
              <article
                key={pkg.id}
                className={`pricing-premium-card group relative flex h-full flex-col overflow-hidden rounded-[30px] border ${theme.border} bg-[linear-gradient(180deg,rgba(16,16,18,0.98),rgba(7,7,9,0.96))] p-6 transition-all duration-500 hover:-translate-y-1.5 ${theme.ring}`}
              >
                <div
                  className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,163,0.14),transparent_48%)]`}
                />
                <div
                  className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-br ${theme.surface} opacity-70`}
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:18px_18px] opacity-[0.16]" />

                {pkg.isPopular && (
                  <div className="absolute -top-3 left-6 z-20 inline-flex items-center gap-1.5 rounded-full bg-[#00ffa3] px-3.5 py-1 shadow-[0_0_22px_rgba(0,255,163,0.34)]">
                    <Sparkles className="h-3.5 w-3.5 fill-black text-black" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black">Выбор большинства</span>
                  </div>
                )}

                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/60 text-white transition-all duration-300 group-hover:text-[#00ffa3] group-hover:border-[#00ffa3]/30 group-hover:shadow-[0_0_24px_rgba(0,255,163,0.12)]`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-mono tracking-[0.2em] text-[#00ffa3] uppercase">{pkg.label} PACKAGE</p>
                        <p className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-neutral-500">
                          {pkg.isPopular ? 'Самый частый выбор' : 'Доступный сценарий'}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] ${theme.accentSoft}`}
                    >
                      SLA: {riskLabels[pkg.riskLevel]}
                    </span>
                  </div>

                  <div className="mt-7 space-y-4 border-b border-white/[0.08] pb-5">
                    <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono tracking-[0.18em] text-neutral-500 uppercase">Сценарий</p>
                        <h3 className={`text-2xl font-black tracking-[-0.03em] text-white transition-colors duration-300 ${theme.titleHover}`}>
                          {pkg.title}
                        </h3>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${theme.accentSoft}`}
                      >
                        <BadgeCheck className="h-3.5 w-3.5" />
                        {pkg.id === 'network' ? 'SLA / сеть' : 'B2B-ready'}
                      </span>
                    </div>

                    <p className="text-sm leading-6 text-neutral-300">{pkg.audience}</p>
                  </div>

                  <div className="mt-5 rounded-[22px] border border-white/[0.06] bg-black/55 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-[10px] font-mono tracking-[0.18em] text-neutral-500 uppercase">Бюджет</p>
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.div
                            key={`${pkg.id}-${pricingMode}-${pkg.budget}`}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.22 }}
                            className="mt-1 flex items-baseline gap-2"
                          >
                            <span
                              className={`text-[2.15rem] font-black tracking-[-0.04em] leading-none tabular-nums ${
                                isIndividual ? 'text-white' : 'text-[#00ffa3]'
                              }`}
                            >
                              {pkg.budget}
                            </span>
                          </motion.div>
                        </AnimatePresence>
                        {pkg.budgetNote && (
                          <p className="mt-1 text-[10px] font-mono tracking-[0.14em] text-neutral-500 uppercase">
                            {pkg.budgetNote}
                          </p>
                        )}
                      </div>

                      <div className="text-right">
                        <p className="text-[10px] font-mono tracking-[0.18em] text-neutral-500 uppercase">Режим</p>
                        <span className="mt-1 inline-flex rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                          {packageModeCopy[pricingMode].label}
                        </span>
                        {pricingMode === 'production-only' && pkg.id !== 'network' && (
                          <p className="mt-2 text-[10px] font-mono tracking-[0.14em] text-neutral-500 uppercase line-through">
                            {pkg.id === 'start' && 'от 40 000 ₽'}
                            {pkg.id === 'business' && 'от 90 000 ₽'}
                            {pkg.id === 'premium' && 'от 150 000 ₽'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-3 py-3">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                        <Clock3 className="h-3.5 w-3.5 text-[#00ffa3]/85" />
                        Срок
                      </div>
                      <p className="mt-1 text-sm font-semibold text-white">{pkg.timeline}</p>
                    </div>
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-3 py-3">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#00ffa3]/85" />
                        Гарантия
                      </div>
                      <p className="mt-1 text-sm font-semibold text-white">{getWarranty(pkg.id, pricingMode)}</p>
                    </div>
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-3 py-3">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                        <BadgeCheck className="h-3.5 w-3.5 text-[#00ffa3]/85" />
                        Аудит
                      </div>
                      <p className="mt-1 text-sm font-semibold text-[#00ffa3]">{getCompliance(pkg.id)}</p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-[22px] border border-white/[0.06] bg-white/[0.015] p-4">
                    <p className="text-[10px] font-mono tracking-[0.18em] text-neutral-500 uppercase">Рекомендованные конструкции</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {pkg.recommendation.map((serviceId) => (
                        <span
                          key={serviceId}
                          className="rounded-full border border-white/[0.08] bg-black/40 px-2.5 py-1 text-[10px] text-neutral-300 transition-colors duration-300 hover:border-[#00ffa3]/30 hover:text-white"
                        >
                          {serviceTitleMap.get(serviceId) ?? serviceId}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 space-y-3 border-t border-white/[0.08] pt-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-mono tracking-[0.18em] text-neutral-500 uppercase">Что входит в пакет</p>
                      <span className="text-[10px] uppercase tracking-[0.14em] text-neutral-500">{pkg.includes.length} пунктов</span>
                    </div>

                    <div className="grid gap-2">
                      {pkg.includes.map((item) => (
                        <div
                          key={item}
                          className="flex gap-2.5 rounded-2xl border border-white/[0.04] bg-black/35 px-3 py-2.5 text-sm leading-6 text-neutral-300 transition-colors duration-300 hover:border-white/[0.08] hover:text-white"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00ffa3] shadow-[0_0_8px_rgba(0,255,163,0.22)]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-[22px] border border-white/[0.06] bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] px-4 py-3">
                    <p className="text-[10px] font-mono tracking-[0.18em] text-[#00ffa3] uppercase">Бизнес-сценарий</p>
                    <p className="mt-1 text-sm leading-6 text-white/88">
                      {pkg.decisionNote ?? 'Оптимальное решение для ваших задач'}
                    </p>
                  </div>

                  <div className="mt-auto pt-5">
                    <Link
                      href="/calculator"
                      className={`group flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl border text-sm font-semibold transition-all duration-300 active:scale-[0.98] ${
                        pkg.isPopular
                          ? 'border-[#00ffa3]/35 bg-[#00ffa3] text-black shadow-[0_0_24px_rgba(0,255,163,0.24)] hover:bg-[#00ffa3]/92'
                          : 'border-white/[0.1] bg-white/[0.02] text-white hover:border-[#00ffa3]/35 hover:bg-white/[0.04]'
                      }`}
                    >
                      <span>Быстрый расчет {pkg.label}</span>
                      <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${pkg.isPopular ? 'text-black' : 'text-[#00ffa3]'}`} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
