'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  title: string;
  description: string;
  buttonText: string;
}

export default function FinalCTA({ title, description, buttonText }: FinalCTAProps) {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-on-surface text-surface rounded-[3rem] p-12 md:p-24 text-center overflow-hidden"
        >
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 opacity-10 blur-[100px] translate-y-1/2 -translate-x-1/2 rounded-full" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
              {title}
            </h2>
            <p className="text-xl md:text-2xl text-surface/70 max-w-2xl mx-auto mb-12">
              {description}
            </p>
            <button className="group inline-flex items-center gap-4 px-10 py-5 bg-accent text-background text-lg font-black uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all">
              <span>{buttonText}</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
