'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQItem } from '@/lib/services/types';
import { ChevronDown } from 'lucide-react';

interface ServiceFAQProps {
  items: FAQItem[];
  title?: string;
}

export default function ServiceFAQ({ items, title = 'Частые вопросы' }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12 text-center">
          {title}
        </h2>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="border border-outline/30 rounded-2xl overflow-hidden bg-surface/30 backdrop-blur-xl"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-6 px-8 flex items-center justify-between text-left group"
              >
                <span className={`text-lg font-bold transition-colors ${openIndex === index ? 'text-accent' : 'text-on-surface'}`}>
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180 text-accent' : 'text-on-surface-variant'
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <div className="px-8 pb-6 text-on-surface-variant leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
