'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ServiceHeroData } from '@/lib/services/types';

interface PremiumHeroProps {
  data: ServiceHeroData;
  categoryColorClass?: string; // e.g. "text-[#ff4f73]" or custom CSS var
}

export default function PremiumHero({ data, categoryColorClass = 'text-[var(--ds-cat-volumetric)]' }: PremiumHeroProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = React.useState(false);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startPlay = async () => {
      try {
        await video.play();
      } catch (err) {
        console.warn('Video autoplay blocked or failed:', err);
        setIsAutoplayBlocked(true);
      }
    };

    startPlay();
  }, [data.videoSrc]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[var(--ds-bg-page)] border-b border-[var(--ds-border-subtle)]">
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] opacity-70 pointer-events-none" />

      {/* Background Media */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {data.videoSrc && !isAutoplayBlocked ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={data.imageSrc}
            className="w-full h-full object-cover opacity-25 mix-blend-screen transition-opacity duration-500"
            src={data.videoSrc}
          />
        ) : data.imageSrc ? (
          <img
            src={data.imageSrc}
            alt={data.title}
            className="w-full h-full object-cover opacity-20 transition-opacity duration-500"
          />
        ) : null}
        
        {/* Radial glow and bottom linear mask for perfect Dark Mode styling */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(var(--ds-accent-rgb),0.12),transparent_40%),linear-gradient(to_bottom,transparent_30%,var(--ds-bg-page)_92%)]" />
        {/* Specific category color secondary glow */}
        <div className="absolute top-[25%] left-[20%] w-[450px] h-[450px] bg-[var(--ds-cat-volumetric)]/5 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-[40%] right-[15%] w-[350px] h-[350px] bg-[var(--ds-accent)]/5 blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {data.eyebrow && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--ds-accent-border)] bg-[var(--ds-accent-softer)] px-5 py-2.5 shadow-sm backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ds-accent)] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.20em] text-[var(--ds-accent)] font-mono">
                {data.eyebrow}
              </span>
            </div>
          )}
          
          <h1 className="mx-auto max-w-6xl text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.94] text-white">
            {data.title.split(' ').map((word, idx) => {
              // Highlight the first two or three words to give visual hierarchy
              const isHighlight = idx < 2;
              return (
                <span key={word} className={isHighlight ? `${categoryColorClass} drop-shadow-[0_0_20px_rgba(255,79,115,0.15)]` : 'text-white'}>
                  {word}{' '}
                </span>
              );
            })}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl font-normal text-[var(--ds-text-secondary)] max-w-3xl mx-auto mb-12 leading-[1.65] text-balance"
        >
          {data.subtitle}
        </motion.p>

        {data.trustLine && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="mx-auto mb-14 flex max-w-4xl flex-wrap justify-center gap-3 sm:gap-4"
          >
            {data.trustLine.map((item) => (
              <span 
                key={item} 
                className="rounded-xl border border-[var(--ds-border-card)] bg-[var(--ds-bg-elevated)] px-4 py-2.5 text-xs font-bold text-[var(--ds-text-primary)] shadow-sm backdrop-blur-md hover:border-[var(--ds-accent-border)] transition-colors duration-200"
              >
                {item}
              </span>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6"
        >
          <a
            href={data.primaryCTA.href}
            className="w-full sm:w-auto text-center px-10 py-5 bg-[var(--ds-accent)] text-black font-black uppercase tracking-[0.16em] rounded-full transition-all duration-300 hover:-translate-y-0.5 active:scale-95 shadow-[var(--ds-glow-accent)] hover:shadow-[var(--ds-glow-accent-lg)] text-xs border border-[var(--ds-accent)]"
          >
            {data.primaryCTA.label}
          </a>

          {data.secondaryCTA && (
            <a
              href={data.secondaryCTA.href}
              className="w-full sm:w-auto text-center px-10 py-5 bg-[var(--ds-bg-elevated)] border border-[var(--ds-border-card)] backdrop-blur-md text-white font-black uppercase tracking-[0.16em] rounded-full hover:bg-[var(--ds-bg-elevated-hover)] hover:border-[var(--ds-accent-border)] transition-all duration-300 active:scale-95 text-xs"
            >
              {data.secondaryCTA.label}
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
