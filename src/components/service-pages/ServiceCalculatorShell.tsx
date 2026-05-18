'use client';

import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

interface ServiceCalculatorShellProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function ServiceCalculatorShell({ children, title, description }: ServiceCalculatorShellProps) {
  return (
    <section id="calculator" className="scroll-mt-28 section-padding border-t border-outline bg-surface relative z-20">
      <div className="section-container px-6">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          {title && (
            <div>
              <p className="verge-mono-label mb-5 text-primary">Pricing maker</p>
              <h2 className="geist-display-lg text-on-surface">{title}.</h2>
            </div>
          )}
          {description && (
            <p className="max-w-3xl text-lg leading-[1.7] text-on-surface-variant">{description}</p>
          )}
        </div>

        <div className="relative">
          {/* Decorative background glow behind calculator */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
