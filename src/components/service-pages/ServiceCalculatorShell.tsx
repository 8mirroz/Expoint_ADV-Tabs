'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ServiceCalculatorShellProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function ServiceCalculatorShell({ children, title, description }: ServiceCalculatorShellProps) {
  return (
    <section id="calculator" className="py-24 px-6 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {title && (
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">{description}</p>
          )}
        </div>

        <div className="relative">
          {/* Decorative background glow behind calculator */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
