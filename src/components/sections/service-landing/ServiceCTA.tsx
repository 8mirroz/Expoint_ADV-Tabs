'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Zap, Target } from 'lucide-react';
import { Service } from '@/data/services';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { tracker } from '@/lib/analytics/tracker';
import { MeshBackground } from '@/components/ui/MeshBackground';

interface ServiceCTAProps {
  service: Service;
  sessionKey: string;
  openModal: (options: { context: string; source: string }) => void;
}

export function ServiceCTA({ service, sessionKey, openModal }: ServiceCTAProps) {
  const { locale } = useLanguage();

  return (
    <section className="section-padding px-6 relative overflow-hidden bg-background">
       {/* Background Visual Engine */}
       <div className="absolute inset-0 z-0">
         <MeshBackground opacity={0.15} />
         
         <div className="absolute top-0 left-0 w-full h-px bg-outline" />
         <div className="absolute bottom-0 left-0 w-full h-px bg-outline" />
         
         <div className="absolute inset-y-0 left-12 w-px bg-outline hidden xl:block" />
         <div className="absolute inset-y-0 right-12 w-px bg-outline hidden xl:block" />
         
       </div>
       
       <div className="max-w-5xl mx-auto relative z-10">
         <div className="flex flex-col items-center gap-12 text-center">
            
            <div className="space-y-8">
              <h2 className="geist-display-2xl text-on-surface">
                {locale === 'ru' ? 'Запустите' : 'Ignite'} <br /> 
                <span className="text-primary">{locale === 'ru' ? 'Проект' : 'Project'}</span>
              </h2>
              <div className="relative inline-block mt-8">
                <p className="text-on-surface-variant text-xl md:text-3xl font-light max-w-2xl mx-auto border-l-2 border-[#00ffa3] pl-8 text-left italic leading-tight">
                  {locale === 'ru' 
                    ? `Превратите вашу идею в осязаемый актив. Детальный инженерный расчет ${service.title} в течение 2 часов.`
                    : `Transform your idea into a tangible asset. Detailed engineering estimate for ${service.title} within 2 hours.`}
                </p>
                <div className="absolute -right-8 top-0 text-primary/20 select-none hidden md:block">
                  <Target size={80} strokeWidth={0.5} />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-3xl pt-12">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  tracker.track('cta_click', { type: 'estimate', service: service.id });
                  openModal({ context: `CTA: ${service.title}`, source: 'service_page' });
                }}
                className="geist-button-primary w-full sm:flex-1 shadow-elevation-2 text-lg"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {locale === 'ru' ? 'Запросить расчет' : 'Request Estimate'}
                  <Zap className="w-5 h-5" />
                </span>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  tracker.track('cta_click', { type: 'survey', service: service.id });
                  openModal({ context: `Замер: ${service.title}`, source: 'service_page' });
                }}
                className="geist-button-secondary w-full sm:flex-1 text-lg"
              >
                <span className="relative z-10">{locale === 'ru' ? 'Вызвать замерщика' : 'Book a Surveyor'}</span>
              </motion.button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full pt-16 border-t border-outline">
              {[
                { label: 'SLA_Response', value: '< 120 MIN' },
                { label: 'PP_Compliance', value: '902-PP_FULL' },
                { label: 'System_Warranty', value: '60 MONTHS' },
                { label: 'Visual_Model', value: '3D_RENDER' }
              ].map((stat, i) => (
                <div key={i} className="text-center space-y-3 group/stat">
                  <div className="verge-mono-label text-on-surface-variant/40 group-hover/stat:text-primary transition-colors">{stat.label}</div>
                  <div className="geist-display-sm !text-base text-on-surface group-hover/stat:scale-110 transition-transform">{stat.value}</div>
                </div>
              ))}
            </div>
         </div>
       </div>
       
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-linear-to-b from-primary/40 to-transparent" />
    </section>
  );
}
