'use client';

import { motion } from 'motion/react';
import { COMPANY_MISSION } from '@/data/company';

export default function MissionSection() {
  return (
    <section className="section-padding bg-canvas relative overflow-hidden border-y border-outline/10">
      <div className="absolute inset-0 z-0 opacity-[0.02] bg-[url('/img/patterns/grid.svg')] bg-[length:60px_60px] pointer-events-none" />
      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-primary font-mono font-bold uppercase tracking-[0.4em] text-xs mb-8 block">
            Mission Statement
          </span>
          <h2 className="geist-display-lg lg:text-[64px] text-on-surface leading-tight mb-10">
            {COMPANY_MISSION.description.ru}
          </h2>
          <div className="w-20 h-px bg-primary/30 mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}
