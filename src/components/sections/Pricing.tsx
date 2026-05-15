'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { SERVICES } from '@/data/services';

const scenarios = [
  {
    id: 'single-site',
    label: 'NB-009 · NB-010 · NB-016',
    title: 'Одна точка, быстрый запуск',
    audience: 'ПВЗ, кофейни, небольшие магазины, локальные сервисы.',
    posture: 'Сначала считаем читаемую базовую конструкцию и монтаж.',
    recommendation: ['volumetric-letters', 'lightbox'],
    proof: 'Сегменты различаются не только бюджетом, но и критериями решения. Funnel-stage matching improves action rate on high-intent visitors.',
  },
  {
    id: 'rollout',
    label: 'NB-010 · NB-011 · NB-019',
    title: 'Сеть или франшиза',
    audience: 'Сетевые открытия, клиники, multi-site retail и корпоративные стандарты.',
    posture: 'Считаем не единичную вывеску, а повторяемость, SLA и единый стандарт монтажа.',
    recommendation: ['lightbox', 'metal-letters', 'pylon-signs'],
    proof: 'Template-based signage kits produce fastest growth with stable quality control.',
  },
  {
    id: 'engineering',
    label: 'NB-006 · NB-018 · NB-017',
    title: 'Сложный инженерный объект',
    audience: 'Кровля, стелы, исторический центр, сложные фасады.',
    posture: 'Сначала снимаем регуляторный и инженерный риск, затем фиксируем диапазон бюджета.',
    recommendation: ['pylon-signs', 'roof-installations'],
    proof: 'Risk clarity at pre-sale stage decreases negotiation churn and legal delays.',
  },
] as const;

const serviceTitleMap = new Map(SERVICES.map((service) => [service.id, service.title]));

export default function Pricing() {
  return (
    <section className="section-padding border-t border-outline bg-surface">
      <div className="section-container space-y-14">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="space-y-5">
            <p className="verge-mono-label text-primary">Подход по сегменту</p>
            <h2 className="geist-display-lg md:text-[48px] text-on-surface">
              Бюджет считается по-разному для одиночной точки, сети и сложного объекта.
            </h2>
          </div>
          <p className="max-w-3xl text-[18px] leading-[1.7] text-on-surface-variant">
            Вместо абстрактных пакетов мы показываем три реальных сценария принятия решения: запуск одной точки, масштабирование сети и сложный инженерный проект. Для каждого сценария различаются и аргументы, и порядок расчета.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {scenarios.map((scenario) => (
            <article
              key={scenario.id}
              className="flex h-full flex-col rounded-[var(--radius-12)] border border-outline bg-canvas-soft p-7 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="verge-mono-label text-primary">{scenario.label}</span>
                <span className="rounded-full border border-outline px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-on-surface-variant">
                  fit
                </span>
              </div>

              <h3 className="mt-6 text-[28px] font-black uppercase tracking-tight text-on-surface">
                {scenario.title}
              </h3>
              <p className="mt-4 text-[15px] leading-7 text-on-surface-variant">{scenario.audience}</p>

              <div className="mt-8 rounded-[var(--radius-8)] border border-outline bg-surface px-5 py-5">
                <p className="text-[11px] uppercase tracking-[0.18em] text-on-surface-variant">Что считать первым</p>
                <p className="mt-3 text-[15px] leading-7 text-on-surface">{scenario.posture}</p>
              </div>

              <div className="mt-8">
                <p className="text-[11px] uppercase tracking-[0.18em] text-on-surface-variant">Чаще всего подходят</p>
                <ul className="mt-4 space-y-3">
                  {scenario.recommendation.map((serviceId) => (
                    <li key={serviceId} className="flex gap-3 text-[14px] leading-6 text-on-surface-variant">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{serviceTitleMap.get(serviceId)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <blockquote className="mt-8 border-l border-primary/30 pl-4 text-[13px] italic leading-6 text-on-surface-variant/80">
                {scenario.proof}
              </blockquote>

              <div className="mt-auto pt-8">
                <Link href="/calculator" className="geist-button-primary h-[52px] w-full group">
                  <span>Открыть калькулятор</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
