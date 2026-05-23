'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

interface PremiumSEOPlusProps {
  title: string;
  content: string;
  bullets: string[];
}

export default function PremiumSEOPlus({ title, content, bullets }: PremiumSEOPlusProps) {
  return (
    <section className="py-24 border-t border-[var(--ds-border-default)] bg-[var(--ds-bg-page)] relative overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[var(--ds-accent-softer)]/10 blur-[130px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 items-start">
          
          {/* Left Column - SEO Content & Success Criteria (7 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--ds-success-soft)] text-[var(--ds-success)] rounded-full text-[10px] font-black uppercase tracking-widest border border-[var(--ds-success-border)] font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SLA COMPLIANCE // 902-ПП</span>
            </div>
            
            <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tighter text-white leading-none">
              {title}
            </h2>
            
            <p className="text-sm sm:text-base leading-relaxed text-[var(--ds-text-secondary)]">
              {content}
            </p>
            
            {/* Engineering Grid of Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bullets.map((bullet, i) => (
                <div key={i} className="flex gap-3.5 p-4 bg-[var(--ds-bg-card-solid)] rounded-xl border border-[var(--ds-border-card)]">
                  <div className="w-5 h-5 rounded-full bg-[var(--ds-accent-soft)] flex items-center justify-center shrink-0 border border-[var(--ds-accent-border)] mt-0.5">
                    <div className="w-1.5 h-1.5 bg-[var(--ds-accent)] rounded-full" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[var(--ds-text-primary)] leading-snug">{bullet}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
