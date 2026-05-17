'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Info } from 'lucide-react';

interface LegalTrustBlockProps {
  title: string;
  content: string;
  bullets: string[];
}

export default function LegalTrustBlock({ title, content, bullets }: LegalTrustBlockProps) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>Юридическая чистота</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8">
              {title}
            </h2>
            <p className="text-xl text-on-surface-variant leading-relaxed mb-10">
              {content}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {bullets.map((bullet, i) => (
                <div key={i} className="flex gap-4 p-4 bg-surface/50 rounded-2xl border border-outline/30">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                  </div>
                  <span className="text-sm font-bold text-on-surface/80">{bullet}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-surface to-background border border-outline/30 rounded-3xl p-8 md:p-12 flex flex-col justify-center overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShieldCheck className="w-64 h-64 text-accent" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-accent/20">
                  <Info className="w-8 h-8 text-background" />
                </div>
                <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">Внимание к деталям</h3>
                <p className="text-on-surface-variant mb-8">
                  Мы берем на себя полную ответственность за техническое соответствие изделий городским регламентам. 
                  Это исключает риск демонтажа и штрафов для вашего бизнеса.
                </p>
                <div className="flex gap-2">
                  <div className="px-4 py-2 bg-on-surface text-surface text-xs font-black uppercase tracking-widest rounded-lg">902-ПП</div>
                  <div className="px-4 py-2 bg-surface border border-outline/30 text-on-surface text-xs font-black uppercase tracking-widest rounded-lg">ГОСТ</div>
                </div>
              </div>
            </div>
            
            {/* Background Glow */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 blur-[100px] rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
