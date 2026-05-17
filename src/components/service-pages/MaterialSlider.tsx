'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MaterialOption } from '@/lib/services/types';

interface MaterialSliderProps {
  title: string;
  options: MaterialOption[];
}

export default function MaterialSlider({ title, options }: MaterialSliderProps) {
  return (
    <section id="materials" className="py-24 px-6 bg-surface/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-16 text-center">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {options.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-background border border-outline/30"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
              
              {/* Image Placeholder / Actual Image */}
              <div className="absolute inset-0 bg-surface/20">
                {/* Fallback pattern if image is missing */}
                <div className="absolute inset-0 flex items-center justify-center text-on-surface/5">
                  <span className="text-8xl font-black uppercase tracking-tighter -rotate-12 opacity-50">{option.name}</span>
                </div>
                {/* Image tag would go here */}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <h3 className="text-2xl font-black uppercase mb-2 tracking-tight group-hover:text-accent transition-colors">
                  {option.name}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {option.description}
                </p>
              </div>

              {/* Decorative border */}
              <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/20 transition-colors pointer-events-none rounded-[2rem]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
