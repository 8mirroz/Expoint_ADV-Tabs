'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Activity, ArrowRight } from 'lucide-react';
import { Service } from '@/data/services';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { MeshBackground } from '@/components/ui/MeshBackground';

interface ServiceHeroProps {
  service: Service;
  previewVideo?: string;
  openModal: (options: { context: string; source: string }) => void;
}

export function ServiceHero({ service, previewVideo, openModal }: ServiceHeroProps) {
  const { locale } = useLanguage();

  return (
    <section className="hero-section relative min-h-[90vh] flex items-center px-6 overflow-hidden bg-background">
      <MeshBackground opacity={0.15} />
      
      {/* Optional Cinematic Background */}
      {previewVideo && (
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-10 grayscale scale-105"
          >
            <source src={previewVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-linear-to-b from-background/40 via-background/20 to-background" />
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="space-y-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface border border-outline text-primary verge-mono-label backdrop-blur-xl"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Geist Engineering V8
          </motion.div>
          
          <h1 className="hero-title geist-display-2xl text-on-surface max-w-5xl">
            {service.title.split(' ').map((word, i) => (
              <span key={i} className={i % 2 === 1 ? 'text-primary' : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>
          
          <p className="hero-desc text-[18px] md:text-[22px] text-on-surface-variant max-w-2xl leading-[1.6] font-light border-l border-primary/30 pl-8">
            {service.fullDescription}
          </p>

          <div className="flex flex-wrap gap-6 pt-4">
            <button 
              onClick={() => openModal({ context: `Hero: ${service.title}`, source: 'service_page' })}
              className="geist-button-primary gap-3 group"
            >
              <span>{locale === 'ru' ? 'Получить консультацию' : 'Get Consultation'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-4 verge-mono-label text-on-surface-variant/40">
              <Activity className="w-4 h-4 text-primary" />
              <span>Status: Production_Ready</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="verge-mono-label text-on-surface-variant/20 rotate-90 mb-4">Scroll</span>
        <div className="w-px h-12 bg-linear-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}
