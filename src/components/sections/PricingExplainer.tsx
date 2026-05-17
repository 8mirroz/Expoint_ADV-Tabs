'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Gem, Landmark, Ruler, Shield, Wrench } from 'lucide-react';

interface PricingDriverItem {
  title: string;
  description: string;
  evidenceSnippet: string;
  sourceDocId: string;
  impactLabel?: string;
  impactValue?: string;
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
}: PricingExplainerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const driverIcons = [Ruler, Gem, Wrench, Shield, Landmark];

  return (
    <section
      ref={sectionRef}
      className="section-padding border-t border-white/5 bg-black relative overflow-hidden"
    >
      {/* Technical Grid Background & Radial Glow */}
      <div className="absolute inset-0 z-0 industrial-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(0,255,163,0.03),transparent_65%)] pointer-events-none" />

      <div className="section-container relative z-10 space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl space-y-4"
        >
          <span className="text-xs font-mono tracking-[0.2em] text-accent uppercase font-semibold">
            {eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold tracking-tight text-balance leading-tight">
            {title}
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-neutral-400 font-light max-w-3xl pt-1">
            {intro}
          </p>
        </motion.div>

        {/* Driver Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {drivers.map((driver, index) => {
            const Icon = driverIcons[index] ?? Ruler;
            return (
              <motion.article
                key={driver.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="group flex h-full flex-col rounded-[var(--radius-12)] border border-white/5 bg-white/[0.02] backdrop-blur-md p-7 hover:border-accent/40 transition-all duration-300 relative overflow-hidden"
              >
                {/* Top accent glowing bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10 group-hover:bg-accent transition-colors duration-300" />

                {/* Interactive Industrial Hover Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:14px_14px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Subtle Accent Glow Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,163,0.05),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Clean Premium Top Bar */}
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent shadow-[0_0_10px_rgba(0,255,163,0.03)] group-hover:border-accent/30 group-hover:shadow-[0_0_15px_rgba(0,255,163,0.1)] transition-all duration-300">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  {driver.impactValue && (
                    <span className="font-mono text-[11px] font-semibold text-accent border border-accent/20 rounded-full px-2.5 py-0.5 bg-accent/5">
                      {driver.impactValue}
                    </span>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold tracking-tight text-white/95 group-hover:text-accent transition-colors duration-300 leading-snug">
                  {driver.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-neutral-300/80 group-hover:text-neutral-200/90 transition-colors duration-300 flex-1 font-light">
                  {driver.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
