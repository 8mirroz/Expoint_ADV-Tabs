'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { B2BSegment } from '@/lib/services/types';

interface B2BSegmentTabsProps {
  segments: B2BSegment[];
  eyebrow?: string;
  title?: string;
  description?: string;
}

export default function B2BSegmentTabs({
  segments,
  eyebrow = 'Segment fit',
  title = 'Для каких задач.',
  description = 'Один и тот же сервис решает разные коммерческие задачи: видимость, запуск точки, удобство навигации, брендовый статус или аккуратный монтаж без риска для фасада.',
}: B2BSegmentTabsProps) {
  const [activeTab, setActiveTab] = useState(segments[0].id);

  return (
    <section id="anatomy" className="scroll-mt-28 section-padding border-t border-outline bg-background">
      <div className="section-container px-6">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="verge-mono-label mb-5 text-primary">{eyebrow}</p>
            <h2 className="geist-display-lg text-on-surface">{title}</h2>
          </div>
          <p className="max-w-3xl text-lg leading-[1.7] text-on-surface-variant">
            {description}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-10">
          {segments.map((segment) => (
            <button
              key={segment.id}
              onClick={() => setActiveTab(segment.id)}
              className={`px-4 py-2 rounded-[var(--radius-8)] verge-mono-label transition-all ${
                activeTab === segment.id
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface border border-outline text-on-surface-variant hover:border-primary hover:text-primary'
              }`}
            >
              {segment.title}
            </button>
          ))}
        </div>

        <div className="bg-surface border border-outline rounded-[var(--radius-16)] p-8 md:p-12 min-h-[260px] flex items-center relative overflow-hidden shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              <h3 className="geist-display-md mb-6 text-primary">
                {segments.find(s => s.id === activeTab)?.title}
              </h3>
              <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed">
                {segments.find(s => s.id === activeTab)?.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
        </div>
      </div>
    </section>
  );
}
