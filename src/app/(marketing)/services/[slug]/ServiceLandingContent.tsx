'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { Service } from '@/data/services';
import { useGSAP } from '@/lib/gsap';
import { gsap } from '@/lib/gsap';
import { tracker } from '@/lib/analytics/tracker';
import { useModalStore } from '@/store/useModalStore';
import { MaterialComparison } from '@/components/sections/MaterialComparison';
import { useLanguage } from '@/components/i18n/LanguageProvider';

// Sub-components
import { ServiceHero } from '@/components/sections/service-landing/ServiceHero';
import { ServiceTechnicalSpecs } from '@/components/sections/service-landing/ServiceTechnicalSpecs';
import { ServiceFeatures } from '@/components/sections/service-landing/ServiceFeatures';
import { ServicePricing } from '@/components/sections/service-landing/ServicePricing';
import { ServiceFAQ } from '@/components/sections/service-landing/ServiceFAQ';
import { ServiceCTA } from '@/components/sections/service-landing/ServiceCTA';

interface ServiceLandingContentProps {
  service: Service;
}

export function ServiceLandingContent({ service }: ServiceLandingContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const openModal = useModalStore((state) => state.openModal);
  const { locale } = useLanguage();

  const sessionKey = useMemo(() => {
    const normalizedId = service.id.replace(/[^a-z0-9]/gi, '').toUpperCase();
    return `EXP-${normalizedId.slice(0, 6).padEnd(6, 'X')}`;
  }, [service.id]);

  const previewVideo = useMemo(() => {
    if (service.id === 'volumetric-letters' || service.id === 'signs') {
      return '/mp4/grok-video-4ba46673-a719-4e79-aa78-bd36329160e8 (1).mp4';
    }
    if (service.id === 'lightbox') {
      return '/mp4/grok-video-4ad41f12-1475-47c4-93d5-b42463ff34fc.mp4';
    }
    return service.previewVideo;
  }, [service.id, service.previewVideo]);

  useEffect(() => {
    tracker.track('page_view', { service: service.id });
  }, [service.id]);

  useGSAP(() => {
    // Cinematic entrance and scroll reveals
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    
    tl.from('.hero-badge', { opacity: 0, y: 20, duration: 0.8 })
      .from('.hero-title', { opacity: 0, y: 60, duration: 1.2 }, '-=0.4')
      .from('.hero-desc', { opacity: 0, y: 30, duration: 1 }, '-=0.8');

    gsap.from('.bento-card-wrapper', {
      scrollTrigger: {
        trigger: '.bento-grid-section',
        start: 'top 70%',
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'expo.out',
    });

    gsap.utils.toArray<HTMLElement>('.section-title').forEach((title) => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    });

    gsap.from('.calculator-container', {
      scrollTrigger: {
        trigger: '.calculator-container',
        start: 'top 80%',
      },
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      ease: 'elastic.out(1, 0.75)',
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background text-on-surface">
      <ServiceHero 
        service={service} 
        previewVideo={previewVideo} 
        openModal={openModal} 
      />

      <ServiceTechnicalSpecs service={service} />

      <ServiceFeatures 
        service={service} 
        previewVideo={previewVideo} 
      />

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-20 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-accent" />
              <span className="text-accent font-black uppercase tracking-[0.3em] text-xs">Comparative Analysis</span>
            </div>
            <h2 className="section-title text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
              {locale === 'ru' ? 'Битва' : 'Battle of'} <br/> 
              <span className="text-on-surface-variant/40">{locale === 'ru' ? 'Материалов' : 'Materials'}</span>
            </h2>
          </div>
          <p className="text-on-surface-variant max-w-md leading-relaxed font-light text-lg border-l border-accent/20 pl-8">
            {locale === 'ru' 
              ? 'Визуальное сравнение стандартных решений и премиального стандарта Буква Свет. Прозрачность качества на каждом этапе.' 
              : 'Visual comparison of standard solutions and the premium BUKVA SVET standard. Quality transparency at every stage.'}
          </p>
        </div>
        <div className="p-1 bg-outline rounded-[2px]">
          <div className="bg-surface p-1">
            <MaterialComparison />
          </div>
        </div>
      </section>

      <ServicePricing service={service} />

      <ServiceFAQ 
        service={service} 
        openModal={openModal} 
      />

      <ServiceCTA 
        service={service} 
        sessionKey={sessionKey} 
        openModal={openModal} 
      />

    </div>
  );
}
