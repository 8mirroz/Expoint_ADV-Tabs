'use client';

import React from 'react';
import { motion } from 'motion/react';
import { TechnologyComparisonItem } from '@/lib/services/types';
import { Check, X } from 'lucide-react';

interface TechnologyComparisonProps {
  title: string;
  items: TechnologyComparisonItem[];
}

export default function TechnologyComparison({ title, items }: TechnologyComparisonProps) {
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
                    {renderValue(item.optionA.value)}
                  </td>
                  <td className="py-6 px-4 text-center text-accent font-black">
                    {renderValue(item.optionB.value)}
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

function renderValue(value: string | boolean) {
  if (typeof value === 'boolean') {
    return value ? <Check className="w-5 h-5 mx-auto" /> : <X className="w-5 h-5 mx-auto text-on-surface/30" />;
  }
  return value;
}
