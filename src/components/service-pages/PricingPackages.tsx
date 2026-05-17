'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PricingPackage } from '@/lib/services/types';
import { Check } from 'lucide-react';

interface PricingPackagesProps {
  packages: PricingPackage[];
}

export default function PricingPackages({ packages }: PricingPackagesProps) {
  return (
    <section className="py-24 px-6 bg-surface/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            Готовые пакеты решений
          </h2>
          <p className="text-xl text-on-surface-variant">Выберите оптимальный вариант под ваши задачи</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-500 ${
                pkg.role === 'recommended'
                  ? 'bg-surface border-accent shadow-[0_0_40px_rgba(0,255,204,0.1)] scale-105 z-10'
                  : 'bg-surface/50 border-outline/30 hover:border-outline'
              }`}
            >
              {pkg.role === 'recommended' && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-background text-xs font-black uppercase tracking-widest rounded-full">
                  Хит продаж
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-black uppercase mb-2 tracking-tight">{pkg.title}</h3>
                <div className="text-3xl font-black text-accent">{pkg.priceLabel}</div>
              </div>

              <div className="flex-grow space-y-4 mb-10">
                {pkg.includes.map((item, i) => (
                  <div key={i} className="flex gap-3 text-sm text-on-surface-variant">
                    <Check className="w-5 h-5 text-accent shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mb-8 pt-6 border-t border-outline/30">
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-3">Подходит для:</p>
                <div className="flex flex-wrap gap-2">
                  {pkg.bestFor.map((item, i) => (
                    <span key={i} className="text-[10px] px-2 py-1 bg-on-surface/5 rounded uppercase font-bold text-on-surface/70">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <button
                className={`w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all ${
                  pkg.role === 'recommended'
                    ? 'bg-accent text-background hover:scale-[1.02]'
                    : 'bg-on-surface text-surface hover:bg-accent hover:text-on-surface'
                }`}
              >
                {pkg.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
