'use client';

import Link from 'next/link';
import { ArrowRight, ShieldAlert, ShieldCheck } from 'lucide-react';

interface ComplianceItem {
  title: string;
  description: string;
  sourceDocId: string;
  evidenceSnippet: string;
  tone: 'allowed' | 'risk';
}

interface PricingComplianceProps {
  eyebrow?: string;
  title: string;
  intro: string;
  items: ComplianceItem[];
  primaryCtaHref?: string;
  primaryCtaLabel?: string;
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
}

export default function PricingCompliance({
  eyebrow = 'Риски и ограничения',
  title,
  intro,
  items,
  primaryCtaHref = '/calculator',
  primaryCtaLabel = 'Считать проект',
  secondaryCtaHref = '/compliance',
  secondaryCtaLabel = 'Проверить 902-ПП',
}: PricingComplianceProps) {
  return (
    <section className="section-padding border-t border-outline bg-secondary">
      <div className="section-container space-y-14">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div className="space-y-5">
            <p className="verge-mono-label text-primary">{eyebrow}</p>
            <h2 className="geist-display-lg md:text-[48px] text-on-surface">{title}</h2>
          </div>
          <p className="max-w-3xl text-[18px] leading-[1.7] text-on-surface-variant">{intro}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((item) => {
            const isAllowed = item.tone === 'allowed';

            return (
              <article
                key={item.title}
                className="rounded-[var(--radius-12)] border border-outline bg-surface p-7 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${isAllowed ? 'bg-primary/8 text-primary' : 'bg-[rgba(255,77,0,0.08)] text-[rgb(255,77,0)]'}`}>
                    {isAllowed ? <ShieldCheck className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
                  </div>
                  <span className="verge-mono-label text-on-surface-variant">{item.sourceDocId}</span>
                </div>
                <h3 className="mt-6 text-[24px] font-black uppercase tracking-tight text-on-surface">{item.title}</h3>
                <p className="mt-4 text-[15px] leading-7 text-on-surface-variant">{item.description}</p>
                <blockquote className="mt-6 border-l border-outline pl-4 text-[13px] italic leading-6 text-on-surface-variant/80">
                  {item.evidenceSnippet}
                </blockquote>
              </article>
            );
          })}
        </div>

        <div className="flex flex-col gap-4 rounded-[var(--radius-12)] border border-outline bg-surface p-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-[22px] font-black uppercase tracking-tight text-on-surface">
              Сначала диапазон бюджета, затем проверка рисков.
            </p>
            <p className="max-w-3xl text-[15px] leading-7 text-on-surface-variant">
              Для типовых объектов сначала считаем конструкцию в калькуляторе. Для исторического центра, кровли и сложных фасадов сразу подключаем compliance-проверку.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href={primaryCtaHref} className="geist-button-primary h-[52px] group">
              <span>{primaryCtaLabel}</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href={secondaryCtaHref} className="geist-button-secondary h-[52px] group">
              <span>{secondaryCtaLabel}</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
