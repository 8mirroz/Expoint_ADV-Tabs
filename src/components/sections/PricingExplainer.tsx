'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface PricingDriverItem {
  title: string;
  description: string;
  evidenceSnippet: string;
  sourceDocId: string;
}

interface PricingExplainerProps {
  eyebrow?: string;
  title: string;
  intro: string;
  drivers: PricingDriverItem[];
  ctaHref?: string;
  ctaLabel?: string;
}

export default function PricingExplainer({
  eyebrow = 'Что формирует цену',
  title,
  intro,
  drivers,
  ctaHref = '/calculator',
  ctaLabel = 'Открыть калькулятор',
}: PricingExplainerProps) {
  return (
    <section className="section-padding border-t border-outline bg-canvas-soft">
      <div className="section-container space-y-14">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="space-y-5">
            <p className="verge-mono-label text-primary">{eyebrow}</p>
            <h2 className="geist-display-lg md:text-[48px] text-on-surface">{title}</h2>
          </div>
          <div className="space-y-5">
            <p className="max-w-3xl text-[18px] leading-[1.7] text-on-surface-variant">{intro}</p>
            <Link href={ctaHref} className="geist-button-primary h-[52px] w-fit group">
              <span>{ctaLabel}</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {drivers.map((driver) => (
            <article
              key={driver.title}
              className="flex h-full flex-col rounded-[var(--radius-12)] border border-outline bg-surface p-7 shadow-sm"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="verge-mono-label text-primary">{driver.sourceDocId}</span>
                <span className="rounded-full border border-outline px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-on-surface-variant">
                  verified
                </span>
              </div>
              <h3 className="text-[24px] font-black uppercase tracking-tight text-on-surface">{driver.title}</h3>
              <p className="mt-4 text-[15px] leading-7 text-on-surface-variant">{driver.description}</p>
              <blockquote className="mt-6 border-l border-primary/30 pl-4 text-[13px] italic leading-6 text-on-surface-variant/80">
                {driver.evidenceSnippet}
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
