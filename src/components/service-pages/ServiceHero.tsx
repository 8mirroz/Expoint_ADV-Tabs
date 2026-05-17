'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ServiceHeroData } from '@/lib/services/types';

interface ServiceHeroProps {
  data: ServiceHeroData;
}

export default function ServiceHero({ data }: ServiceHeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {data.videoSrc ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-30 mix-blend-screen"
            src={data.videoSrc}
          />
        ) : data.imageSrc ? (
          <img
            src={data.imageSrc}
            alt={data.title}
            className="w-full h-full object-cover opacity-30"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-on-surface to-on-surface/40 leading-[0.9]">
            {data.title}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl font-light text-on-surface-variant max-w-3xl mx-auto mb-12"
        >
          {data.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap justify-center gap-6"
        >
          <a
            href={data.primaryCTA.href}
            className="group relative px-10 py-5 bg-accent text-background font-black uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">{data.primaryCTA.label}</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </a>

          {data.secondaryCTA && (
            <a
              href={data.secondaryCTA.href}
              className="px-10 py-5 bg-surface/30 border border-outline/30 backdrop-blur-xl text-on-surface font-black uppercase tracking-[0.2em] rounded-full hover:bg-surface/50 transition-all active:scale-95"
            >
              {data.secondaryCTA.label}
            </a>
          )}
        </motion.div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
