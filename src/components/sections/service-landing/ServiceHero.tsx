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
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = React.useState(false);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startPlay = async () => {
      try {
        await video.play();
      } catch (err) {
        console.warn('Cinematic video autoplay blocked or failed:', err);
        setIsAutoplayBlocked(true);
      }
    };

    startPlay();
  }, [previewVideo]);

  return (
    <section className="hero-section relative min-h-[90vh] flex items-center px-6 overflow-hidden bg-background">
      <MeshBackground opacity={0.15} />
      
      {/* Optional Cinematic Background */}
      {previewVideo && !isAutoplayBlocked && (
        <div className="absolute inset-0 z-0">
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-10 grayscale scale-105 transition-opacity duration-500"
          >
            <source src={previewVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-linear-to-b from-background/40 via-background/20 to-background" />
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="space-y-10">

          
          <h1 className="hero-title geist-display-2xl text-on-surface max-w-5xl">
            {service.title.split(' ').map((word, i) => (
              <span key={i} className={i % 2 === 1 ? 'text-primary' : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>
          
          <p className="hero-desc text-lg md:text-xl text-on-surface-variant max-w-2xl leading-[1.6] font-light border-l-2 border-[#00ffa3] pl-8">
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
