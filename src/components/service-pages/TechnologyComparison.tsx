'use client';

import React from 'react';
import { motion } from 'motion/react';
import { TechnologyComparisonItem } from '@/lib/services/types';
import { Check, X } from 'lucide-react';

interface TechnologyComparisonProps {
  title: string;
  items: TechnologyComparisonItem[];
  variant?: 'default' | 'premium-dark';
}

export default function TechnologyComparison({
  title,
  items,
  variant = 'default',
}: TechnologyComparisonProps) {
  if (!items.length) return null;

  if (variant === 'premium-dark') {
    return (
      <section className="relative overflow-hidden border-y border-outline/40 py-20 px-6 bg-black">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,245,160,0.026)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,160,0.026)_1px,transparent_1px)] bg-[size:18px_18px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(0,245,160,0.13),transparent_52%)]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-center mb-12 text-[2.15rem] md:text-[3.25rem] lg:text-[4rem] font-headline font-black leading-[0.9] tracking-[-0.03em] uppercase text-white">
            {title}
          </h2>

          <div className="overflow-x-auto rounded-[22px] border border-white/12 bg-[linear-gradient(180deg,rgba(12,12,14,0.95),rgba(6,7,9,0.96))] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_44px_rgba(0,0,0,0.35)]">
            <table className="w-full min-w-[740px] border-separate border-spacing-0">
              <thead>
                <tr className="bg-black/72 backdrop-blur supports-[backdrop-filter]:bg-black/62">
                  <th className="sticky top-0 z-20 py-5 px-5 text-left text-[10px] md:text-xs font-black uppercase tracking-[0.19em] text-white/56 w-[34%] border-b border-white/12">
                    Характеристика
                  </th>
                  <th className="sticky top-0 z-20 py-5 px-5 text-center text-[10px] md:text-xs font-black uppercase tracking-[0.19em] text-white/58 w-[33%] border-b border-white/12 border-l border-white/8">
                    {items[0].optionA.name}
                  </th>
                  <th className="sticky top-0 z-20 py-5 px-5 text-center text-[10px] md:text-xs font-black uppercase tracking-[0.19em] text-accent w-[33%] border-b border-white/12 border-l border-white/8">
                    {items[0].optionB.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.24, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <td className="py-5 md:py-6 px-5 font-semibold text-white/86 border-b border-white/8 group-hover:bg-white/[0.015] transition-colors">
                      {item.feature}
                    </td>
                    <td className="py-5 md:py-6 px-5 text-center text-white/66 border-b border-white/8 border-l border-white/6 group-hover:bg-white/[0.015] transition-colors">
                      {renderValue(item.optionA.value, false)}
                    </td>
                    <td className="py-5 md:py-6 px-5 text-center font-semibold text-accent border-b border-white/8 border-l border-white/6 group-hover:bg-accent/[0.045] transition-colors">
                      {renderValue(item.optionB.value, true)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 bg-surface/5">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12 text-center">
          {title}
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-outline/30">
                <th className="py-6 px-4 text-left text-xs font-black uppercase tracking-[0.2em] text-on-surface/50 w-1/3">Характеристика</th>
                <th className="py-6 px-4 text-center text-xs font-black uppercase tracking-[0.2em] text-on-surface/50 w-1/3">{items[0].optionA.name}</th>
                <th className="py-6 px-4 text-center text-xs font-black uppercase tracking-[0.2em] text-accent w-1/3">{items[0].optionB.name}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.04 }}
                  viewport={{ once: true }}
                  className="border-b border-outline/10 hover:bg-surface/30 transition-colors group"
                >
                  <td className="py-6 px-4 font-bold text-on-surface/80">{item.feature}</td>
                  <td className="py-6 px-4 text-center text-on-surface-variant">
                    {renderValue(item.optionA.value, false)}
                  </td>
                  <td className="py-6 px-4 text-center text-accent font-black">
                    {renderValue(item.optionB.value, true)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function renderValue(value: string | boolean, isAccent: boolean) {
  if (typeof value === 'boolean') {
    if (value) {
      return <Check className={`w-5 h-5 mx-auto ${isAccent ? 'text-accent' : 'text-on-surface/80'}`} />;
    }
    return <X className="w-5 h-5 mx-auto text-on-surface/30" />;
  }
  return value;
}
