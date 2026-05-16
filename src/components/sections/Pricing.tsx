'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Check, Star } from 'lucide-react';

import { SERVICES } from '@/data/services';

interface ScenarioPackage {
  id: string;
  label: string;
  title: string;
  budget: string;
  audience: string;
  includes: string[];
  timeline: string;
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
    title: 'Быстрый запуск',
    budget: 'от 40 000 ₽',
    audience: 'ПВЗ, кофейни, небольшие магазины, локальные сервисы.',
    includes: [
      'Базовая вывеска из ПВХ или световой короб',
      'Стандартная лицевая подсветка',
      'Монтаж на высоте до 3 м',
      'Гарантия 1–3 года',
    ],
    timeline: '5–7 дней',
    recommendation: ['volumetric-letters', 'lightbox'],
    riskLevel: 'low',
  },
  {
    id: 'business',
    label: 'Business',
    title: 'Выбор большинства',
    budget: 'от 90 000 ₽',
    audience: 'Кафе, салоны красоты, аптеки, клиники, street retail.',
    includes: [
      'Объёмные световые буквы с LED Samsung',
      '3D-макет и фотопривязка',
      'Выезд замерщика в пределах МКАД',
      'Проверка по 902-ПП',
      'Гарантия до 5 лет',
    ],
    timeline: '7–12 дней',
    recommendation: ['volumetric-letters', 'flex-neon', 'lightbox'],
    riskLevel: 'medium',
    isPopular: true,
  },
  {
    id: 'premium',
    label: 'Premium',
    title: 'Для бренда и архитектуры',
    budget: 'от 150 000 ₽',
    audience: 'Рестораны, бутики, шоурумы, медцентры, премиальный ритейл.',
    includes: [
      'Нержавеющая сталь, латунь, контражур',
      'Дизайн-проект с визуализацией',
      'Сложный монтаж (ночь, автовышка)',
      'Сервисное обслуживание',
      'Гарантия до 5 лет + сервис',
    ],
    timeline: '10–18 дней',
    recommendation: ['metal-letters', 'flex-neon', 'volumetric-letters'],
    riskLevel: 'medium',
  },
  {
    id: 'network',
    label: 'Network',
    title: 'Масштабирование сети',
    budget: 'индивидуально',
    audience: 'Сети ПВЗ, франшизы, аптечные сети, федеральные бренды, ТЦ.',
    includes: [
      'Единый стандарт для всех точек',
      'Серийное производство',
      'Roll-out монтаж по адресам',
      'Фотоотчёты и техдокументация',
      'Сервисное сопровождение',
    ],
    timeline: 'по графику',
    recommendation: ['lightbox', 'volumetric-letters', 'pylon-signs'],
    riskLevel: 'low',
  },
];

const serviceTitleMap = new Map(SERVICES.map((service) => [service.id, service.title]));

const riskColors: Record<string, string> = {
  low: 'bg-success/10 text-success',
  medium: 'bg-warning/10 text-warning',
  high: 'bg-error/10 text-error',
};

const riskLabels: Record<string, string> = {
  low: 'Минимальный',
  medium: 'Средний',
  high: 'Высокий',
};

/**
 * Pricing — v10: Scenario-based B2B packages with timeline rail,
 * budget anchors, glassmorphism cards, and motion reveals.
 */
export default function Pricing({ packages }: PricingProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const items = packages ?? defaultPackages;

  return (
    <section
      ref={sectionRef}
      className="section-padding border-t border-outline bg-surface relative overflow-hidden"
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
            <h2 className="geist-display-lg text-on-surface">
              Не хотите разбираться в сантиметрах? Выберите готовый пакет.
            </h2>
          </div>
          <p className="max-w-3xl text-lg leading-[1.7] text-on-surface-variant">
            Четыре сценария для разных задач бизнеса — от быстрого запуска одной точки до масштабирования сети. Каждый пакет включает производство, монтаж и проверку.
          </p>
        </motion.div>

        {/* Timeline Rail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:flex items-center justify-center gap-0"
        >
          {items.map((pkg, index) => (
            <div key={`rail-${pkg.id}`} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div className={`h-3 w-3 rounded-full border-2 ${pkg.isPopular ? 'bg-primary border-primary' : 'bg-surface border-primary/40'}`} />
                <span className="text-xs font-mono uppercase tracking-wider text-on-surface-variant">
                  {pkg.label}
                </span>
                <span className="text-xs text-primary font-medium">{pkg.budget}</span>
              </div>
              {index < items.length - 1 && (
                <div className="h-px w-24 xl:w-32 bg-outline mx-4" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Package Cards */}
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {items.map((pkg, index) => (
            <motion.article
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className={`group relative flex h-full flex-col rounded-[var(--radius-16)] border p-7 shadow-sm hover:shadow-lg transition-all duration-300 ${
                pkg.isPopular
                  ? 'border-primary/30 bg-surface ring-1 ring-primary/10'
                  : 'border-outline bg-surface/80 backdrop-blur-sm'
              }`}
            >
              {/* Popular Badge */}
              {pkg.isPopular && (
                <div className="absolute -top-3 left-6 flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5">
                  <Star className="h-3 w-3 text-on-primary" />
                  <span className="text-xs font-medium text-on-primary uppercase tracking-wider">Популярный</span>
                </div>
              )}

              {/* Header */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="verge-mono-label text-primary">{pkg.label}</span>
                <span className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.16em] font-medium ${riskColors[pkg.riskLevel]}`}>
                  Риск: {riskLabels[pkg.riskLevel]}
                </span>
              </div>

              {/* Title & Budget */}
              <h3 className="text-2xl font-black uppercase tracking-tight text-on-surface">
                {pkg.title}
              </h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-black text-on-surface">{pkg.budget}</span>
              </div>

              {/* Audience */}
              <p className="mt-4 text-sm leading-6 text-on-surface-variant">{pkg.audience}</p>

              {/* Timeline */}
              <div className="mt-5 rounded-[var(--radius-8)] border border-outline bg-surface-variant/30 px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-on-surface-variant">Срок</span>
                  <span className="text-sm font-medium text-on-surface">{pkg.timeline}</span>
                </div>
              </div>

              {/* Includes */}
              <div className="mt-6 space-y-2.5 flex-1">
                {pkg.includes.map((item) => (
                  <div key={item} className="flex gap-2.5 text-sm leading-6 text-on-surface-variant">
                    <Check className="h-4 w-4 shrink-0 mt-0.5 text-primary/60" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Recommended services */}
              <div className="mt-6">
                <p className="text-[10px] uppercase tracking-[0.18em] text-on-surface-variant mb-2">Конструкции</p>
                <div className="flex flex-wrap gap-1.5">
                  {pkg.recommendation.map((serviceId) => (
                    <span
                      key={serviceId}
                      className="rounded-full border border-outline px-2.5 py-1 text-[11px] text-on-surface-variant"
                    >
                      {serviceTitleMap.get(serviceId) ?? serviceId}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 pt-2">
                <Link
                  href="/calculator"
                  className={`${pkg.isPopular ? 'geist-button-primary' : 'geist-button-secondary'} h-[48px] w-full group`}
                >
                  <span>Рассчитать {pkg.label}</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
