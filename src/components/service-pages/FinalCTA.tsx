'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useModalStore } from '@/store/useModalStore';

interface FinalCTAProps {
  title: string;
  description: string;
  buttonText: string;
  modalContext?: string;
  modalSource?: string;
}

export default function FinalCTA({
  title,
  description,
  buttonText,
  modalContext = 'Запрос расчета по услуге',
  modalSource = 'service_final_cta',
}: FinalCTAProps) {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <section id="upload-brief" className="section-padding border-t border-outline bg-canvas-soft relative overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-primary text-on-primary rounded-[var(--radius-20)] p-12 md:p-20 text-center overflow-hidden"
        >
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 opacity-10 blur-[100px] translate-y-1/2 -translate-x-1/2 rounded-full" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
              {title}
            </h2>
            <p className="text-xl md:text-2xl text-on-primary/70 max-w-2xl mx-auto mb-12">
              {description}
            </p>
            <button
              onClick={() => openModal({ context: modalContext, source: modalSource })}
              className="geist-button-secondary group inline-flex h-[56px] items-center gap-4 px-10"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
