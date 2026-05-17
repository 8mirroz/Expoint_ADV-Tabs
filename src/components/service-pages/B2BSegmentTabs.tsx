'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { B2BSegment } from '@/lib/services/types';

interface B2BSegmentTabsProps {
  segments: B2BSegment[];
}

export default function B2BSegmentTabs({ segments }: B2BSegmentTabsProps) {
  const [activeTab, setActiveTab] = useState(segments[0].id);

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12 text-center">
          Для каких задач
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {segments.map((segment) => (
            <button
              key={segment.id}
              onClick={() => setActiveTab(segment.id)}
              className={`px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-all ${
                activeTab === segment.id
                  ? 'bg-accent text-background'
                  : 'bg-surface border border-outline/30 text-on-surface-variant hover:border-outline'
              }`}
            >
              {segment.title}
            </button>
          ))}
        </div>

        <div className="bg-surface/30 border border-outline/30 backdrop-blur-xl rounded-3xl p-8 md:p-16 min-h-[300px] flex items-center justify-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl text-center"
            >
              <h3 className="text-4xl md:text-6xl font-black uppercase mb-6 text-accent">
                {segments.find(s => s.id === activeTab)?.title}
              </h3>
              <p className="text-xl md:text-2xl text-on-surface-variant leading-relaxed">
                {segments.find(s => s.id === activeTab)?.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 blur-3xl rounded-full" />
        </div>
      </div>
    </section>
  );
}
