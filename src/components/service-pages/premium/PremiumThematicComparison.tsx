'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Layers2, HelpCircle } from 'lucide-react';
import type { TechnologyComparisonItem } from '@/lib/services/types';

interface PremiumThematicComparisonProps {
  title: string;
  items: TechnologyComparisonItem[];
  variant?: string;
}

const renderValue = (value: string | boolean) => {
  if (typeof value === 'boolean') {
    return value ? 'Да // SLA+' : 'Нет';
  }
  return value;
};

export default function PremiumThematicComparison({
  title,
  items,
  variant = 'premium-dark',
}: PremiumThematicComparisonProps) {
  // Option names from the first item to draw headers
  const optionAName = items[0]?.optionA.name ?? 'Вариант А';
  const optionBName = items[0]?.optionB.name ?? 'Вариант Б';

  return (
    <section className="py-24 border-t border-[var(--ds-border-default)] bg-[var(--ds-bg-section)] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--ds-accent-soft)] text-[var(--ds-accent)] rounded-full text-[10px] font-black uppercase tracking-widest border border-[var(--ds-accent-border)] font-mono">
            <Layers2 className="w-3.5 h-3.5" />
            <span>SYS // TECH COMPARISON</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tighter text-white max-w-3xl mx-auto leading-none">
            {title.split(/\s+(?:vs|VS)\s+/).map((part, index, arr) => (
              <React.Fragment key={index}>
                {part}
                {index < arr.length - 1 && <span className="text-[var(--ds-accent)]"> vs </span>}
              </React.Fragment>
            ))}
          </h2>
          <p className="text-sm sm:text-base text-[var(--ds-text-body)] max-w-xl mx-auto">
            Сравнение ключевых инженерных сценариев свечения для правильного позиционирования бренда на фасаде.
          </p>
        </div>

        {/* Comparison Grid Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Option A (Left Card) - 5 Columns */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="md:col-span-5 bg-[var(--ds-bg-card-solid)] border border-[var(--ds-border-card)] rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <div className="mb-4 inline-flex px-3 py-1 bg-[var(--ds-bg-page)] rounded-lg border border-[var(--ds-border-divider)] font-mono text-[10px] font-black text-white uppercase tracking-widest">
                СЦЕНАРИЙ А
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
                {optionAName} подсветка
              </h3>
              <p className="text-xs text-[var(--ds-text-body)] mb-6 leading-relaxed">
                Прямой световой поток сквозь лицевую панель из акрила. Высокая яркость, лучшая читаемость в туманную и дождливую погоду, яркий ориентир для стрит-ритейла.
              </p>
            </div>
            <div className="rounded-xl bg-[var(--ds-bg-page)] border border-[var(--ds-border-divider)] p-4 font-mono text-[9px] text-[var(--ds-text-ghost)] space-y-1.5">
              <div>{'// РЕКОМЕНДОВАНО ДЛЯ:'}</div>
              <div className="text-white font-bold">Аптеки, Ритейл, Круглосуточные точки, ПВЗ</div>
            </div>
          </motion.div>

          {/* Features Comparison Matrix - 7 Columns */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="md:col-span-7 flex flex-col justify-center space-y-4"
          >
            {items.map((item, index) => (
              <div
                key={item.feature}
                className="bg-[var(--ds-bg-card-inner)] border border-[var(--ds-border-divider)] rounded-xl p-5 hover:border-[var(--ds-accent-border)] transition-all duration-300 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center"
              >
                {/* Feature Name */}
                <div className="sm:col-span-1">
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-[var(--ds-text-ghost)] mb-1">
                    КРИТЕРИЙ
                  </span>
                  <span className="text-xs font-black text-white uppercase tracking-tight">
                    {item.feature}
                  </span>
                </div>

                {/* Option A Value */}
                <div className="sm:col-span-1 border-t sm:border-t-0 sm:border-r border-[var(--ds-border-divider)] pt-3 sm:pt-0 sm:pr-4">
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-[var(--ds-text-ghost)] mb-1">
                    {optionAName.toUpperCase()}
                  </span>
                  <span className="text-xs font-bold text-[var(--ds-text-body)]">
                    {renderValue(item.optionA.value)}
                  </span>
                </div>

                {/* Option B Value */}
                <div className="sm:col-span-1 pt-3 sm:pt-0 sm:pl-2">
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-[var(--ds-text-ghost)] mb-1">
                    {optionBName.toUpperCase()}
                  </span>
                  <span className="text-xs font-bold text-[var(--ds-accent)]">
                    {renderValue(item.optionB.value)}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
