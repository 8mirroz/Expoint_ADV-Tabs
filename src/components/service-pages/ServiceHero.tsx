'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ServiceHeroData } from '@/lib/services/types';

interface ServiceHeroProps {
  data: ServiceHeroData;
}

export default function ServiceHero({ data }: ServiceHeroProps) {
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
    <section className="relative min-h-[86vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {data.videoSrc && !isAutoplayBlocked ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={data.imageSrc}
            className="w-full h-full object-cover opacity-35 mix-blend-multiply transition-opacity duration-500"
            src={data.videoSrc}
          />
        ) : data.imageSrc ? (
          <img
            src={data.imageSrc}
            alt={data.title}
            className="w-full h-full object-cover opacity-30 transition-opacity duration-500"
          />
        ) : null}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(var(--accent-warm-rgb),0.18),transparent_34%),linear-gradient(to_bottom,rgba(250,250,250,0.62),var(--background)_88%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {data.eyebrow && (
            <div className="mb-5 inline-flex rounded-full border border-accent-warm/25 bg-white/80 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-accent-warm shadow-sm backdrop-blur">
              {data.eyebrow}
            </div>
          )}
          <h1 className="mx-auto max-w-6xl text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-on-surface to-on-surface/45 leading-[0.92]">
            {data.title}
          </h1>
        </motion.div>

        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl font-medium text-on-surface-variant max-w-4xl mx-auto mb-10"
        >
          {data.subtitle}
        </motion.p>

        {data.trustLine && (
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.14 }}
            className="mx-auto mb-12 flex max-w-4xl flex-wrap justify-center gap-3"
          >
            {data.trustLine.map((item) => (
              <span key={item} className="rounded-full border border-outline bg-white/75 px-4 py-2 text-xs font-bold text-on-surface-variant shadow-sm backdrop-blur">
                {item}
              </span>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap justify-center gap-6"
        >
          <a
            href={data.primaryCTA.href}
            className="group relative px-10 py-5 bg-accent-warm text-white font-black uppercase tracking-[0.16em] rounded-full overflow-hidden transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shadow-[0_18px_48px_rgba(var(--accent-warm-rgb),0.28)]"
          >
            <span className="relative z-10">{data.primaryCTA.label}</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </a>

          {data.secondaryCTA && (
            <a
              href={data.secondaryCTA.href}
              className="px-10 py-5 bg-white/75 border border-outline backdrop-blur-xl text-on-surface font-black uppercase tracking-[0.16em] rounded-full hover:bg-white transition-all duration-200 active:scale-95 shadow-sm"
            >
              {data.secondaryCTA.label}
            </a>
          )}
        </motion.div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-accent-warm/10 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
