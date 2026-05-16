'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
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

/**
 * PricingExplainer — v10: Numbered pricing driver cards with accent lines,
 * technical grid background, and IntersectionObserver motion reveal.
 */
export default function PricingExplainer({
  eyebrow = 'Что формирует цену',
  title,
  intro,
  drivers,
  ctaHref = '/calculator',
  ctaLabel = 'Открыть калькулятор',
}: PricingExplainerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="section-padding border-t border-outline bg-background relative overflow-hidden"
    >
      {/* Technical Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.02] bg-[url('/img/patterns/grid.svg')] bg-[length:40px_40px] pointer-events-none" />

      <div className="section-container relative z-10 space-y-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <div className="space-y-5">
            <p className="verge-mono-label text-primary">{eyebrow}</p>
            <h2 className="geist-display-lg text-on-surface">{title}</h2>
          </div>
          <div className="space-y-5">
            <p className="max-w-3xl text-lg leading-[1.7] text-on-surface-variant">{intro}</p>
            <Link href={ctaHref} className="geist-button-primary h-[52px] w-fit group">
              <span>{ctaLabel}</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Driver Cards */}
        <div className="grid gap-6 lg:grid-cols-3 xl:grid-cols-5">
          {drivers.map((driver, index) => (
            <motion.article
              key={driver.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="group flex h-full flex-col rounded-[var(--radius-12)] border border-outline bg-surface p-7 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden"
            >
              {/* Accent Line — left border */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary/20 group-hover:bg-primary transition-colors duration-300" />

              {/* Number Badge */}
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="text-5xl font-black text-primary/10 leading-none select-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="rounded-full border border-outline px-3 py-1 text-xs uppercase tracking-[0.16em] text-on-surface-variant">
                  {driver.sourceDocId}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold uppercase tracking-tight text-on-surface leading-snug">
                {driver.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant flex-1">
                {driver.description}
              </p>

              {/* Evidence */}
              <blockquote className="mt-5 border-l-2 border-primary/20 pl-3 text-xs italic leading-5 text-on-surface-variant/70">
                {driver.evidenceSnippet}
              </blockquote>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
