'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, FolderGit2, CheckCircle2 } from 'lucide-react';
import type { ServicePageData } from '@/lib/services/types';

interface PremiumCasesProps {
  data: ServicePageData;
}

export default function PremiumCases({ data }: PremiumCasesProps) {
  if (!data.caseCards?.length) return null;

  return (
    <section id="cases" className="scroll-mt-28 py-24 border-t border-[var(--ds-border-default)] bg-[var(--ds-bg-section)] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--ds-accent-border)] bg-[var(--ds-accent-softer)] px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[var(--ds-accent)] font-mono">
            <FolderGit2 className="h-3.5 w-3.5" />
            <span>SYS // PROVED B2B CASES</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tighter text-white leading-none">
            Реальные B2B кейсы и сценарии.
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--ds-text-body)]">
            Примеры реализованных нами проектов с прозрачной фиксацией бюджетов, сроков исполнения и итогового бизнес-результата.
          </p>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {data.caseCards.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="relative flex flex-col p-6 rounded-2xl border border-[var(--ds-border-card)] bg-[var(--ds-bg-card-solid)] hover:border-[var(--ds-accent-border)] transition-all duration-300 group hover:shadow-[var(--ds-shadow-card-hover)]"
            >
              {/* Kicker label */}
              <div className="mb-4 font-mono text-[9px] font-black uppercase tracking-widest text-[var(--ds-text-ghost)]">
                CASE STUDY // 0{index + 1}
              </div>

              {/* Title & Description */}
              <h3 className="mb-4 text-xl font-black uppercase tracking-tight text-white group-hover:text-[var(--ds-accent)] transition-colors duration-200">
                {item.title}
              </h3>
              
              <p className="mb-8 text-xs sm:text-sm text-[var(--ds-text-body)] leading-relaxed flex-grow">
                {item.description}
              </p>

              {/* Technical Specifications Block (Budget & Timeline) */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="rounded-xl bg-[var(--ds-bg-page)] border border-[var(--ds-border-divider)] p-3">
                  <span className="block font-mono text-[8px] uppercase tracking-widest text-[var(--ds-text-ghost)] mb-1">
                    БЮДЖЕТ ПРОЕКТА
                  </span>
                  <span className="text-xs sm:text-sm font-black text-[var(--ds-accent)] font-mono">
                    {item.budget}
                  </span>
                </div>
                
                <div className="rounded-xl bg-[var(--ds-bg-page)] border border-[var(--ds-border-divider)] p-3">
                  <span className="block font-mono text-[8px] uppercase tracking-widest text-[var(--ds-text-ghost)] mb-1">
                    СРОК РАБОТЫ
                  </span>
                  <span className="text-xs sm:text-sm font-black text-white font-mono">
                    {item.timeline}
                  </span>
                </div>
              </div>

              {/* Outcome Badge Box */}
              <div className="rounded-xl border border-[var(--ds-success-border)] bg-[var(--ds-success-soft)]/20 p-4">
                <div className="flex gap-2 items-start text-xs text-white leading-relaxed font-bold">
                  <CheckCircle2 className="h-4 w-4 text-[var(--ds-success)] shrink-0 mt-0.5" />
                  <span>
                    Результат: <span className="font-normal text-[var(--ds-text-secondary)]">{item.result}</span>
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        
      </div>
    </section>
  );
}
