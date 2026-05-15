'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { SERVICES } from '@/data/services';

interface ServiceRatesProps {
  compact?: boolean;
}

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

export default function ServiceRates({ compact = false }: ServiceRatesProps) {
  return (
    <section className={`${compact ? 'py-16' : 'py-24'} border-t border-outline bg-background`}>
      <div className="section-container space-y-14 px-6">
        {!compact && (
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div className="space-y-5">
              <p className="verge-mono-label text-primary">Матрица базовых ставок</p>
              <h2 className="geist-display-lg md:text-[48px] text-on-surface">
                Сравните конструкцию, единицу расчета и проектный сценарий.
              </h2>
            </div>
            <p className="max-w-3xl text-[18px] leading-[1.7] text-on-surface-variant">
              Мы показываем стартовую ставку по каждой конструкции, ключевые технические драйверы и проверенные ограничения. Финальная смета уточняется после замера, но базовый диапазон можно собрать уже сейчас.
            </p>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service) => {
            const notes = service.expertNotes;
            const specs = service.technicalSpecs?.slice(0, 2) ?? [];
            const drivers = notes?.pricingDrivers?.slice(0, 2) ?? [];
            const evidence = notes?.claims?.[0];

            return (
              <article
                key={service.id}
                className="flex h-full flex-col rounded-[var(--radius-12)] border border-outline bg-surface p-7 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="verge-mono-label text-primary">{formatSegments(service.segments)}</p>
                    <h3 className="mt-4 text-[28px] font-black uppercase tracking-tight text-on-surface">
                      {service.title}
                    </h3>
                  </div>
                  <span className="rounded-full border border-outline px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-on-surface-variant">
                    {notes?.source_doc_ids.join(', ')}
                  </span>
                </div>

                <p className="mt-5 text-[15px] leading-7 text-on-surface-variant">{service.shortDescription}</p>

                <div className="mt-8 rounded-[var(--radius-8)] border border-outline bg-canvas-soft px-5 py-5">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-on-surface-variant">Базовая ставка</p>
                  <div className="mt-3 flex items-end gap-3">
                    <span className="text-[40px] font-black leading-none text-on-surface" data-testid={`service-rate-price-${service.id}`}>
                      {service.basePrice.toLocaleString('ru-RU')}
                    </span>
                    <span className="pb-1 text-[12px] font-mono uppercase tracking-[0.14em] text-primary" data-testid={`service-rate-unit-${service.id}`}>
                      {service.priceUnit}
                    </span>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {specs.map((spec) => (
                    <div key={`${service.id}-${spec.label}`} className="rounded-[var(--radius-8)] border border-outline px-4 py-4">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-on-surface-variant">{spec.label}</p>
                      <p className="mt-2 text-sm leading-6 text-on-surface">{spec.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-on-surface-variant">Что сильнее всего меняет цену</p>
                  <ul className="space-y-3">
                    {drivers.map((driver) => (
                      <li key={`${service.id}-${driver}`} className="flex gap-3 text-[14px] leading-6 text-on-surface-variant">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{driver}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {evidence && (
                  <blockquote className="mt-8 border-l border-primary/30 pl-4 text-[13px] italic leading-6 text-on-surface-variant/80">
                    {evidence.evidence_snippet}
                  </blockquote>
                )}

                <div className="mt-auto pt-8">
                  <div className="mb-5 text-[12px] leading-6 text-on-surface-variant">
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
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
