'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { CaseStudy } from '@/data/cases';

interface CasesArchiveProps {
  title?: string;
  subtitle?: string;
  cases: CaseStudy[];
  filters?: { id: string; label: string }[];
}

/**
 * CasesArchive — Filterable case studies archive with metric cards.
 */
export default function CasesArchive({ title, subtitle, cases, filters }: CasesArchiveProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredCases = activeFilter === 'all'
    ? cases
    : cases.filter((c) => c.segment === activeFilter);

  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        {(title || subtitle) && (
          <div className="mb-12">
            {subtitle && (
              <p className="verge-kicker text-primary mb-4">{subtitle}</p>
            )}
            {title && (
              <h2 className="font-headline text-[36px] md:text-[52px] lg:text-[64px] uppercase leading-[0.85] text-on-surface max-w-3xl">
                {title}
              </h2>
            )}
          </div>
        )}

        {/* Filters */}
        {filters && filters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-[var(--radius-8)] verge-mono-label transition-all ${
                activeFilter === 'all'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface border border-outline text-on-surface-variant hover:border-primary hover:text-primary'
              }`}
            >
              Все сегменты
            </button>
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-[var(--radius-8)] verge-mono-label transition-all ${
                  activeFilter === filter.id
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface border border-outline text-on-surface-variant hover:border-primary hover:text-primary'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}

        {/* Cases Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredCases.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="bg-surface rounded-[var(--radius-12)] border border-outline overflow-hidden group hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="p-8 pb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="verge-mono-label text-primary">{caseStudy.segment}</span>
                  <span className="verge-mono-label text-on-surface-variant">{caseStudy.budget}</span>
                </div>

                <h3 className="font-sans font-bold text-[20px] md:text-[24px] text-on-surface mb-2">
                  {caseStudy.title}
                </h3>

                <p className="text-[14px] leading-[1.7] text-on-surface-variant mb-1">
                  <strong className="text-on-surface">Задача:</strong> {caseStudy.description}
                </p>
                <p className="text-[14px] leading-[1.7] text-on-surface-variant">
                  <strong className="text-on-surface">Решение:</strong> {caseStudy.solution}
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-px bg-outline">
                {caseStudy.metrics.map((metric) => (
                  <div key={metric.label} className="bg-surface-variant p-4 text-center">
                    <p className="font-mono font-bold text-[14px] text-primary">{metric.value}</p>
                    <p className="text-[10px] uppercase tracking-wider text-on-surface-variant mt-1">{metric.label}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="p-6 pt-4 flex items-center justify-between">
                <span className="verge-mono-label text-on-surface-variant">Срок: {caseStudy.term}</span>
                <Link
                  href={`/calculator`}
                  className="flex items-center gap-2 text-[12px] font-mono font-semibold text-primary hover:gap-3 transition-all"
                >
                  Заказать аналогичное
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
