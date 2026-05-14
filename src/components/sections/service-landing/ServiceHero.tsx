'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';
import { Service } from '@/data/services';
import { useLanguage } from '@/components/i18n/LanguageProvider';

interface ServiceHeroProps {
  service: Service;
  previewVideo?: string;
  openModal: (options: { context: string; source: string }) => void;
}

export function ServiceHero({ service, previewVideo, openModal }: ServiceHeroProps) {
  const { locale } = useLanguage();

  return (
    <section className="hero-section relative min-h-[90vh] flex items-center px-6 overflow-hidden bg-black">
      {/* Cinematic Video Background */}
      {previewVideo && (
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-60 grayscale scale-105"
          >
            <source src={previewVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-background" />
          <div className="absolute inset-0 industrial-grid opacity-20" />
          
          {/* Technical Scanlines */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(255,107,0,0.05)_2px,transparent_3px)]" />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="space-y-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-badge inline-flex items-center gap-3 px-5 py-2 rounded-full bg-black/40 border border-white/10 text-accent text-[10px] font-black tracking-[0.4em] uppercase backdrop-blur-xl"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Technical Core V5
          </motion.div>
          
          <h1 className="hero-title text-6xl md:text-[120px] font-black tracking-tighter leading-[0.8] max-w-5xl uppercase text-white">
            {service.title.split(' ').map((word, i) => (
              <span key={i} className={i % 2 === 1 ? 'text-accent' : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>
          
          <p className="hero-desc text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed font-light border-l border-accent/30 pl-8">
            {service.fullDescription}
          </p>

          <div className="flex flex-wrap gap-6 pt-4">
            <button 
              onClick={() => openModal({ context: `Hero: ${service.title}`, source: 'service_page' })}
              className="px-12 py-6 bg-accent text-white font-black uppercase tracking-[0.3em] text-[10px] hover:scale-105 transition-transform"
            >
              {locale === 'ru' ? 'Получить консультацию' : 'Get Consultation'}
            </button>
            <div className="flex items-center gap-4 text-[10px] font-mono text-white/40 uppercase tracking-widest">
              <Activity className="w-4 h-4 text-accent" />
              <span>Status: Production_Ready</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] rotate-90 mb-4">Scroll</span>
        <div className="w-px h-12 bg-linear-to-b from-accent to-transparent animate-pulse" />
      </div>
    </section>
  );
}
