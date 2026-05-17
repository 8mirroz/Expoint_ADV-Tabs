'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Building2, Landmark, Lightbulb, PanelsTopLeft, ShieldCheck, Sparkles } from 'lucide-react';

import { SERVICES } from '@/data/services';

interface ServiceRatesProps {
  compact?: boolean;
}

/** Complexity indicator — 5 segment bar */
function ComplexityBar({ level }: { level: number }) {
  return (
    <div className="flex gap-1" aria-label={`Сложность: ${level} из 5`}>
      {[1, 2, 3, 4, 5].map((seg) => (
        <div
          key={seg}
          className={`h-1.5 flex-1 rounded-full transition-colors ${
            seg <= level ? 'bg-primary' : 'bg-outline'
          }`}
        />
      ))}
    </div>
  );
}

/** Maps service ID to complexity level (1-5) */
const complexityMap: Record<string, number> = {
  'volumetric-letters': 3,
  'lightbox': 2,
  'flex-neon': 2,
  'metal-letters': 4,
  'pylon-signs': 5,
  'roof-installations': 5,
};

/** Maps service ID to production timeline */
const timelineMap: Record<string, string> = {
  'volumetric-letters': '5–10 дн.',
  'lightbox': '3–7 дн.',
  'flex-neon': '3–5 дн.',
  'metal-letters': '7–14 дн.',
  'pylon-signs': '14–30 дн.',
  'roof-installations': '30–60 дн.',
};

/** Maps service ID to best-for label */
const bestForMap: Record<string, string> = {
  'volumetric-letters': 'Универсал',
  'lightbox': 'Ритейл / Сети',
  'flex-neon': 'HoReCa / Интерьер',
  'metal-letters': 'Премиум / Бутик',
  'pylon-signs': 'ТЦ / Бизнес-парки',
  'roof-installations': 'Корпорации',
};

const serviceIconMap: Record<string, typeof Building2> = {
  'volumetric-letters': Building2,
  'lightbox': PanelsTopLeft,
  'flex-neon': Sparkles,
  'metal-letters': ShieldCheck,
  'pylon-signs': Landmark,
  'roof-installations': Lightbulb,
};

function formatSegments(segments: string[]) {
  const labels: Record<string, string> = {
    horeca: 'HoReCa',
    retail: 'Retail',
    clinics: 'Clinics',
    corporate: 'Corporate',
    franchise: 'Franchise',
  };

  return segments.slice(0, 2).map((segment) => labels[segment] ?? segment).join(' / ');
}

/**
 * ServiceRates — v10: Service rate cards with complexity indicators,
 * production timelines, best-for badges, and motion reveal.
 */
export default function ServiceRates({ compact = false }: ServiceRatesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      className={`${compact ? 'py-16' : 'py-24'} border-t border-outline bg-background`}
    >
      <div className="section-container space-y-14 px-6">
        {!compact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
          >
            <div className="space-y-5">
              <p className="verge-mono-label text-primary">Матрица базовых ставок</p>
              <h2 className="geist-display-lg text-on-surface">
                Сравните конструкцию, единицу расчёта и проектный сценарий.
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-[1.7] text-on-surface-variant">
              Мы показываем стартовую ставку по каждой конструкции, ключевые технические драйверы и проверенные ограничения. Финальная смета уточняется после замера, но базовый диапазон можно собрать уже сейчас.
            </p>
          </motion.div>
        )}

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service, index) => {
            const notes = service.expertNotes;
            const specs = service.technicalSpecs?.slice(0, 2) ?? [];
            const drivers = notes?.pricingDrivers?.slice(0, 2) ?? [];
            const evidence = notes?.claims?.[0];
            const complexity = complexityMap[service.id] ?? 3;
            const timeline = timelineMap[service.id] ?? '—';
            const bestFor = bestForMap[service.id] ?? '—';
            const Icon = serviceIconMap[service.id] ?? Building2;

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 * (index + 1) }}
                className="group flex h-full flex-col rounded-[var(--radius-12)] border border-outline bg-surface p-7 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border border-primary/15 bg-primary/8 text-primary">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                    <p className="verge-mono-label text-primary">{formatSegments(service.segments)}</p>
                    <h3 className="mt-3 line-clamp-2 min-h-[4rem] text-2xl font-black uppercase tracking-tight text-on-surface">
                      {service.title}
                    </h3>
                    </div>
                  </div>
                  <span className="rounded-full border border-outline px-3 py-1 text-xs uppercase tracking-[0.16em] text-on-surface-variant shrink-0">
                    {notes?.source_doc_ids.join(', ')}
                  </span>
                </div>

                <p className="mt-5 text-base leading-7 text-on-surface-variant">{service.shortDescription}</p>

                {/* Metrics Row: Complexity + Timeline + Best For */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-[var(--radius-8)] border border-outline px-3 py-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-on-surface-variant mb-2">Сложность</p>
                    <ComplexityBar level={complexity} />
                  </div>
                  <div className="rounded-[var(--radius-8)] border border-outline px-3 py-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-on-surface-variant">Срок</p>
                    <p className="mt-1 text-sm font-medium text-on-surface">{timeline}</p>
                  </div>
                  <div className="rounded-[var(--radius-8)] border border-outline px-3 py-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-on-surface-variant">Подходит</p>
                    <p className="mt-1 text-sm font-medium text-on-surface">{bestFor}</p>
                  </div>
                </div>

                {/* Price Block */}
                <div className="mt-6 rounded-[var(--radius-12)] border border-outline bg-surface-variant/30 px-5 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-on-surface-variant">Базовая ставка</p>
                      <div className="mt-3 flex items-end gap-3">
                        <span className="text-4xl font-black leading-none text-on-surface" data-testid={`service-rate-price-${service.id}`}>
                      {service.basePrice.toLocaleString('ru-RU')}
                        </span>
                        <span className="pb-1 text-sm font-mono uppercase tracking-[0.14em] text-primary" data-testid={`service-rate-unit-${service.id}`}>
                      {service.priceUnit}
                        </span>
                      </div>
                    </div>
                    <div className="rounded-[var(--radius-8)] bg-background/70 px-3 py-2 text-right">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-on-surface-variant">Лучше всего</p>
                      <p className="mt-1 text-sm font-semibold leading-5 text-on-surface">{bestFor}</p>
                    </div>
                  </div>
                </div>

                {/* Technical Specs */}
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {specs.map((spec) => (
                    <div key={`${service.id}-${spec.label}`} className="rounded-[var(--radius-8)] border border-outline px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-on-surface-variant">{spec.label}</p>
                      <p className="mt-1.5 text-sm leading-6 text-on-surface">{spec.value}</p>
                    </div>
                  ))}
                </div>

                {/* Pricing Drivers */}
                <div className="mt-6 space-y-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-on-surface-variant">Что сильнее всего меняет цену</p>
                  <ul className="space-y-2">
                    {drivers.map((driver) => (
                      <li key={`${service.id}-${driver}`} className="flex gap-3 text-sm leading-6 text-on-surface-variant">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{driver}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Evidence */}
                {evidence && (
                  <blockquote className="mt-6 rounded-[var(--radius-8)] border border-primary/10 bg-primary/5 px-4 py-4 text-sm italic leading-6 text-on-surface-variant/80">
                    {evidence.evidence_snippet}
                  </blockquote>
                )}

                {/* Footer */}
                <div className="mt-auto pt-6">
                  <div className="mb-4 text-sm leading-6 text-on-surface-variant">
                    <span className="font-medium text-on-surface">Проверено:</span>{' '}
                    {notes?.last_verified_at ?? '2026-05-12'} · {notes?.owner ?? 'content-team'}
                  </div>
                  <Link
                    href={`/calculator?type=${service.id}`}
                    data-testid={`service-rate-link-${service.id}`}
                    className="geist-button-primary h-[52px] w-full group"
                  >
                    <span>Считать {service.title}</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
