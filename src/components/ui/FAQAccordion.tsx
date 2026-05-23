'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FAQItem {
  question: string;
  answer: string;
  serviceTitle?: string;
  status?: string;
  updated?: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  variant?: 'console' | 'landing';
  className?: string;
}

export function FAQAccordion({ items, variant = 'console', className }: FAQAccordionProps) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  const handleToggle = (index: number) => {
    setExpandedIdx(expandedIdx === index ? null : index);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item, idx) => {
        const isExpanded = expandedIdx === idx;

        if (variant === 'landing') {
          return (
            <div key={idx} className="overflow-hidden">
              <button
                onClick={() => handleToggle(idx)}
                className={cn(
                  "w-full text-left p-8 bg-surface border transition-all duration-300 relative overflow-hidden rounded-2xl shadow-sm cursor-pointer",
                  isExpanded ? "border-primary/40 shadow-elevation-1" : "border-outline"
                )}
              >
                <div
                  className={cn(
                    "absolute left-0 top-0 bottom-0 w-1 transition-all duration-500",
                    isExpanded ? "bg-primary" : "bg-primary/0"
                  )}
                />

                <div className="flex items-center justify-between gap-8">
                  <div className="space-y-1">
                    <span className="verge-mono-label text-primary/40">Ref_ID: FAQ_0{idx + 1}</span>
                    <h3 className="geist-display-sm !text-xl text-on-surface">{item.question}</h3>
                  </div>
                  <div
                    className={cn(
                      "w-10 h-10 shrink-0 flex items-center justify-center border rounded-full transition-all duration-500",
                      isExpanded ? "border-primary/40 rotate-180 bg-primary/5" : "border-outline"
                    )}
                  >
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 transition-colors duration-500",
                        isExpanded ? "text-primary" : "text-on-surface-variant"
                      )}
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <div className="pt-8 mt-8 border-t border-outline/30">
                        <p className="text-on-surface-variant text-base leading-relaxed font-light whitespace-pre-line">
                          {item.answer}
                        </p>
                        <div className="mt-8 flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                            <span className="verge-mono-label text-on-surface-variant/40">
                              Status: {item.status || 'Verified_Core'}
                            </span>
                          </div>
                          <div className="verge-mono-label text-on-surface-variant/40">
                            Updated: {item.updated || 'VERIFIED_RELEASE'}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          );
        }

        // Default 'console' variant
        return (
          <div
            key={idx}
            className="group/faq border border-white/5 bg-white/[0.01] rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent/20"
          >
            <button
              onClick={() => handleToggle(idx)}
              className="w-full text-left p-6 flex justify-between items-center gap-4 cursor-pointer"
            >
              <div className="space-y-1">
                {item.serviceTitle && (
                  <span className="text-[9px] font-mono uppercase tracking-widest text-accent font-bold">
                    {item.serviceTitle}
                  </span>
                )}
                <h3 className="text-base md:text-lg font-bold text-white leading-snug">
                  {item.question}
                </h3>
              </div>
              <div className="shrink-0 w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white transition-all duration-300">
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    isExpanded ? "rotate-180 text-accent" : ""
                  )}
                />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 pt-2 border-t border-white/5 text-sm md:text-base text-neutral-400 leading-relaxed font-light whitespace-pre-line">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
