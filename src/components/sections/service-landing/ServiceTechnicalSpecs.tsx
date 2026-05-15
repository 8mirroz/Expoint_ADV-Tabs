'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Maximize2, Cpu, Fingerprint, Box } from 'lucide-react';
import { Service } from '@/data/services';
import { useLanguage } from '@/components/i18n/LanguageProvider';

interface ServiceTechnicalSpecsProps {
  service: Service;
}

export function ServiceTechnicalSpecs({ service }: ServiceTechnicalSpecsProps) {
  const { locale } = useLanguage();

  if (!service.technicalSpecs) return null;

  return (
    <section className="section-padding px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary verge-mono-label">Technical Protocol</span>
            </div>
            <h2 className="geist-display-lg text-on-surface">
              {locale === 'ru' ? 'Инженерный' : 'Engineering'} <br/> 
              <span className="text-on-surface-variant/40">{locale === 'ru' ? 'Стандарт' : 'Standard'}</span>
            </h2>
            <p className="text-on-surface-variant text-[18px] leading-[28px] max-w-lg font-light">
              {locale === 'ru' 
                ? 'Промышленные параметры, гарантирующие долговечность и полное соответствие нормам безопасности 902-ПП.' 
                : 'Industrial parameters ensuring durability and full compliance with 902-PP safety standards.'}
            </p>
          </div>
          <div className="grid gap-2">
            {service.technicalSpecs.map((spec, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 10 }}
                className="flex items-center justify-between p-6 bg-surface border border-outline group hover:border-primary/40 rounded-xl transition-all duration-500 relative overflow-hidden shadow-sm"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/0 group-hover:bg-primary transition-colors" />
                <span className="verge-mono-label text-on-surface-variant">{spec.label}</span>
                <span className="geist-display-sm !text-[18px] text-on-surface group-hover:text-primary transition-colors">{spec.value}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* High-Fidelity Blueprint Visualizer */}
        <div className="relative aspect-square bg-surface border border-outline p-1 flex items-center justify-center overflow-hidden shadow-elevation-2 group rounded-3xl">
            <div className="absolute inset-0 bg-primary/5 opacity-20 group-hover:opacity-30 transition-opacity duration-1000" />
            <div className="absolute inset-0 bg-linear-to-tr from-primary/5 via-transparent to-transparent" />
            
            <div className="absolute inset-4 border border-outline/50 pointer-events-none" />
            <div className="absolute inset-8 border border-outline/50 pointer-events-none" />
            
            <div className="absolute top-8 left-8 verge-mono-label text-on-surface-variant/30 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-primary" />
                <span>System_Check: PASS</span>
              </div>
              <span>Coord: 55.7558° N, 37.6173° E</span>
            </div>
            
            <div className="absolute top-8 right-8 verge-mono-label text-on-surface-variant/30 text-right flex flex-col gap-1">
              <span>Timestamp: LIVE_FEED</span>
              <span className="text-primary">Auth: SECURE_CORE</span>
            </div>

            <div className="absolute bottom-24 left-8 verge-mono-label text-on-surface-variant/30">
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="w-3 h-3" />
                <span>Unit: EX-902PP</span>
              </div>
              <span>Scale: 1:25</span>
            </div>
            
            <div className="relative w-full h-full flex items-center justify-center">
               <div className="absolute inset-0 overflow-hidden pointer-events-none">
                 <div className="absolute top-1/2 left-0 w-full h-px bg-outline/20" />
                 <div className="absolute left-1/2 top-0 h-full w-px bg-outline/20" />
                 <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-transparent via-primary/10 to-transparent -translate-y-full animate-scan pointer-events-none opacity-40" />
               </div>

               <div className="relative w-[80%] h-[80%] border border-primary/20 flex items-center justify-center rounded-2xl bg-surface/40 backdrop-blur-sm">
                  <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl-lg" />
                  <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-primary rounded-tr-lg" />
                  <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl-lg" />
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-primary rounded-br-lg" />
                  
                  <div className="absolute inset-0 border border-outline/20 rounded-full scale-50" />
                  <div className="absolute inset-0 border border-outline/20 rounded-full scale-75" />
                  <div className="absolute inset-0 border border-outline/20 rounded-full scale-90" />
                  
                  <div className="text-center space-y-4">
                     <motion.div 
                       animate={{ scale: [1, 1.02, 1], opacity: [0.6, 1, 0.6] }}
                       transition={{ duration: 4, repeat: Infinity }}
                       className="text-primary"
                     >
                        {service.id === 'volumetric-letters' ? <Fingerprint size={120} strokeWidth={0.5} /> : <Box size={120} strokeWidth={0.5} />}
                     </motion.div>
                     <div className="verge-mono-label text-primary/60">Visualizing_Core</div>
                  </div>
               </div>
            </div>

            <div className="absolute bottom-24 right-8 flex gap-2">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-1 h-3 bg-outline group-hover:bg-primary/40 transition-colors" style={{ transitionDelay: `${i * 100}ms` }} />
               ))}
            </div>

            <div className="absolute inset-x-0 bottom-0 p-8 bg-linear-to-t from-surface to-transparent">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Maximize2 className="w-3 h-3 text-primary" />
                    <span className="verge-mono-label text-primary">Engine_Core_Active</span>
                  </div>
                  <span className="geist-display-sm !text-[20px] text-on-surface">EX-ARCH-GEN8</span>
                </div>
                <div className="text-right">
                  <span className="verge-mono-label text-on-surface-variant/40">Tolerances</span>
                  <span className="geist-display-sm !text-[20px] text-on-surface">±0.001mm</span>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
