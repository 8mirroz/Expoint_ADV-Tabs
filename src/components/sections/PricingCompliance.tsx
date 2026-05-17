'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, ShieldAlert, ShieldCheck, AlertTriangle, CircleAlert } from 'lucide-react';

interface ComplianceItem {
  title: string;
  description: string;
  sourceDocId: string;
  evidenceSnippet: string;
  tone: 'allowed' | 'risk';
  severity?: 'low' | 'medium' | 'high' | 'critical';
  riskCost?: string;
  consequence?: string;
  prevention?: string;
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

const severityConfig: Record<string, { label: string; color: string; bg: string }> = {
  low: { label: 'Низкий', color: 'text-success', bg: 'bg-success/10' },
  medium: { label: 'Средний', color: 'text-warning', bg: 'bg-warning/10' },
  high: { label: 'Высокий', color: 'text-accent-warm', bg: 'bg-accent-warm/10' },
  critical: { label: 'Критичный', color: 'text-error', bg: 'bg-error/10' },
};

/**
 * PricingCompliance — v10: Compliance risk cards with severity markers,
 * consequence/prevention structure, and motion reveals.
 */
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
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="section-padding border-t border-outline bg-background relative overflow-hidden"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 z-0 opacity-[0.015] bg-[url('/img/patterns/grid.svg')] bg-[length:40px_40px] pointer-events-none" />

      <div className="section-container relative z-10 space-y-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end"
        >
          <div className="space-y-5">
            <p className="verge-mono-label text-primary">{eyebrow}</p>
            <h2 className="geist-display-lg max-w-[16ch] text-balance text-on-surface">{title}</h2>
          </div>
          <p className="max-w-3xl text-lg leading-[1.7] text-on-surface-variant">{intro}</p>
        </motion.div>

        {/* Risk Cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {items.map((item, index) => {
            const isAllowed = item.tone === 'allowed';
            const severity = item.severity ?? (isAllowed ? 'low' : 'high');
            const config = severityConfig[severity];

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="group rounded-[var(--radius-12)] border border-outline bg-surface p-7 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Top Row: Icon + Severity + Source */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    {/* Cooler and Larger Icon Container with Premium Glow & Border */}
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 ${
                      isAllowed 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.35)]' 
                        : severity === 'critical'
                        ? 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.15)] group-hover:shadow-[0_0_25px_rgba(239,68,68,0.35)]'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)] group-hover:shadow-[0_0_25px_rgba(245,158,11,0.35)]'
                    }`}>
                      {isAllowed ? (
                        <ShieldCheck className="h-6 w-6" strokeWidth={1.75} />
                      ) : severity === 'critical' ? (
                        <CircleAlert className="h-6 w-6" strokeWidth={1.75} />
                      ) : severity === 'high' ? (
                        <ShieldAlert className="h-6 w-6" strokeWidth={1.75} />
                      ) : (
                        <AlertTriangle className="h-6 w-6" strokeWidth={1.75} />
                      )}
                    </div>
                    <span className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.16em] font-mono font-bold ${
                      isAllowed
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10'
                        : severity === 'critical'
                        ? 'bg-red-500/10 text-red-400 border border-red-500/10'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/10'
                    }`}>
                      {config.label}
                    </span>
                  </div>
                  <span className="verge-mono-label text-white/40 font-semibold">{item.sourceDocId}</span>
                </div>

                {item.riskCost && (
                  <div className="mt-5 inline-flex rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-[11px] font-semibold text-primary">
                    {item.riskCost}
                  </div>
                )}

                {/* Title & Description */}
                <h3 className="mt-4 line-clamp-2 min-h-[3.5rem] text-xl font-black uppercase tracking-tight text-on-surface">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-on-surface-variant">{item.description}</p>

                {/* Consequence & Prevention (v10) */}
                {(item.consequence || item.prevention) && (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {item.consequence && (
                      <div className="rounded-[var(--radius-8)] border border-outline bg-error/3 px-4 py-3">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-error/80 mb-1">Последствие</p>
                        <p className="text-sm leading-6 text-on-surface-variant">{item.consequence}</p>
                      </div>
                    )}
                    {item.prevention && (
                      <div className="rounded-[var(--radius-8)] border border-outline bg-success/3 px-4 py-3">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-success/80 mb-1">Как предотвратить</p>
                        <p className="text-sm leading-6 text-on-surface-variant">{item.prevention}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Evidence */}
                <blockquote className="mt-5 border-l-2 border-outline pl-4 text-sm italic leading-6 text-on-surface-variant/70">
                  {item.evidenceSnippet}
                </blockquote>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom CTA Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col gap-4 rounded-[var(--radius-12)] border border-outline bg-surface p-8 md:flex-row md:items-center md:justify-between"
        >
          <div className="space-y-2">
            <p className="text-xl font-black uppercase tracking-tight text-on-surface">
              Сначала диапазон бюджета, затем проверка рисков.
            </p>
            <p className="max-w-3xl text-base leading-7 text-on-surface-variant">
              Для типовых объектов сначала считаем конструкцию в калькуляторе. Для исторического центра, кровли и сложных фасадов сразу подключаем compliance-проверку.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row shrink-0">
            <Link href={primaryCtaHref} className="geist-button-primary h-[52px] group">
              <span>{primaryCtaLabel}</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href={secondaryCtaHref} className="geist-button-secondary h-[52px] group">
              <span>{secondaryCtaLabel}</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
