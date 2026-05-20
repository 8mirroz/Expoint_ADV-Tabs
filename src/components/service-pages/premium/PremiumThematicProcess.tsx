'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Clock, ShieldCheck } from 'lucide-react';
import type { ServicePageData } from '@/lib/services/types';

interface PremiumThematicProcessProps {
  data: ServicePageData;
}

export default function PremiumThematicProcess({ data }: PremiumThematicProcessProps) {
  if (!data.process?.length) return null;

  return (
    <section id="process" className="scroll-mt-28 py-24 border-t border-[var(--ds-border-default)] bg-[var(--ds-bg-page)] relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--ds-accent-border)] bg-[var(--ds-accent-softer)] px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[var(--ds-accent)] font-mono">
              <Clock className="h-3.5 w-3.5" />
              <span>SLA // WORKFLOW PRECISION</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tighter text-white leading-none">
              От запроса до запуска без сюрпризов.
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base leading-relaxed text-[var(--ds-text-body)]">
            Процесс разбит на строгие контролируемые этапы с фиксированными лимитами времени (SLA), гарантирующими предсказуемый B2B результат.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {data.process.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border border-[var(--ds-border-card)] bg-[var(--ds-bg-card-solid)] p-6 hover:border-[var(--ds-accent-border)] transition-all duration-300 group hover:shadow-[var(--ds-shadow-card-hover)]"
            >
              {/* Card Header with Step ID and SLA badge */}
              <div className="mb-8 flex items-center justify-between">
                <span className="text-4xl font-black text-[var(--ds-text-ghost)] transition-colors duration-300 group-hover:text-[var(--ds-accent)]/20 font-mono">
                  0{index + 1}
                </span>
                <span className="rounded-md border border-[var(--ds-accent-border)] bg-[var(--ds-accent-softer)] px-2.5 py-1 text-[9px] font-mono font-black uppercase tracking-widest text-[var(--ds-accent)]">
                  {step.meta}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="mb-3 text-lg font-black uppercase tracking-tight text-white group-hover:text-[var(--ds-accent)] transition-colors duration-200">
                {step.title}
              </h3>
              
              <p className="text-xs sm:text-sm text-[var(--ds-text-body)] leading-relaxed">
                {step.description}
              </p>

              {/* Decorative engineering border line that expands on hover */}
              <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-transparent group-hover:bg-[var(--ds-accent)] transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
