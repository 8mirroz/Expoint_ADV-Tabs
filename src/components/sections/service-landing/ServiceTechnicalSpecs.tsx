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
    <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-accent" />
              <span className="text-accent font-black uppercase tracking-[0.3em] text-[10px]">Technical Protocol</span>
            </div>
            <h2 className="section-title text-5xl md:text-6xl font-black mb-4 tracking-tighter uppercase leading-[0.9]">
              {locale === 'ru' ? 'Инженерный' : 'Engineering'} <br/> 
              <span className="text-on-surface-variant/40">{locale === 'ru' ? 'Стандарт' : 'Standard'}</span>
            </h2>
            <p className="text-on-surface-variant leading-relaxed max-w-lg font-light text-lg">
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
                className="flex items-center justify-between p-6 bg-surface border border-outline group hover:border-accent/40 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/0 group-hover:bg-accent transition-colors" />
                <span className="text-on-surface-variant font-mono text-[11px] uppercase tracking-widest">{spec.label}</span>
                <span className="font-black text-lg tracking-tight text-on-surface group-hover:text-accent transition-colors">{spec.value}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* High-Fidelity Blueprint Visualizer */}
        <div className="relative aspect-square bg-black border border-white/5 p-1 flex items-center justify-center overflow-hidden shadow-2xl group rounded-none">
            <div className="absolute inset-0 industrial-grid opacity-20 group-hover:opacity-30 transition-opacity duration-1000" />
            <div className="absolute inset-0 bg-linear-to-tr from-accent/5 via-transparent to-transparent" />
            
            <div className="absolute inset-4 border border-white/5 pointer-events-none" />
            <div className="absolute inset-8 border border-white/5 pointer-events-none" />
            
            <div className="absolute top-8 left-8 text-[9px] font-mono text-white/30 uppercase tracking-tighter flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-accent" />
                <span>System_Check: PASS</span>
              </div>
              <span>Coord: 55.7558° N, 37.6173° E</span>
            </div>
            
            <div className="absolute top-8 right-8 text-[9px] font-mono text-white/30 uppercase tracking-tighter text-right flex flex-col gap-1">
              <span>Timestamp: LIVE_FEED</span>
              <span className="text-accent">Auth: SECURE_CORE</span>
            </div>

            <div className="absolute bottom-24 left-8 text-[9px] font-mono text-white/30 uppercase tracking-tighter">
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="w-3 h-3" />
                <span>Unit: EX-902PP</span>
              </div>
              <span>Scale: 1:25</span>
            </div>
            
            <div className="relative w-full h-full flex items-center justify-center">
               <div className="absolute inset-0 overflow-hidden pointer-events-none">
                 <div className="absolute top-1/2 left-0 w-full h-px bg-white/10" />
                 <div className="absolute left-1/2 top-0 h-full w-px bg-white/10" />
                 <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-transparent via-accent/20 to-transparent -translate-y-full animate-scan pointer-events-none opacity-40" />
               </div>

               <div className="relative w-[80%] h-[80%] border border-accent/20 flex items-center justify-center">
                  <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-accent" />
                  <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-accent" />
                  <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-accent" />
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-accent" />
                  
                  <div className="absolute inset-0 border border-white/5 rounded-full scale-50" />
                  <div className="absolute inset-0 border border-white/5 rounded-full scale-75" />
                  <div className="absolute inset-0 border border-white/5 rounded-full scale-90" />
                  
                  <div className="text-center space-y-4">
                     <motion.div 
                       animate={{ scale: [1, 1.02, 1], opacity: [0.2, 0.4, 0.2] }}
                       transition={{ duration: 4, repeat: Infinity }}
                       className="text-white"
                     >
                       {service.id === 'volumetric-letters' ? <Fingerprint size={120} strokeWidth={0.5} /> : <Box size={120} strokeWidth={0.5} />}
                     </motion.div>
                     <div className="text-[10px] font-mono text-accent/60 tracking-[0.8em] uppercase">Visualizing_Core</div>
                  </div>
               </div>
            </div>

            <div className="absolute bottom-24 right-8 flex gap-2">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-1 h-3 bg-white/10 group-hover:bg-accent/40 transition-colors" style={{ transitionDelay: `${i * 100}ms` }} />
               ))}
            </div>

            <div className="absolute inset-x-0 bottom-0 p-8 bg-linear-to-t from-black to-transparent">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Maximize2 className="w-3 h-3 text-accent" />
                    <span className="text-[9px] font-mono text-accent uppercase tracking-[0.4em]">Engine_Core_Active</span>
                  </div>
                  <span className="block text-2xl font-black text-white uppercase tracking-tighter">EX-ARCH-GEN5</span>
                </div>
                <div className="text-right">
                  <span className="block text-[9px] font-mono text-white/40 uppercase tracking-[0.2em]">Tolerances</span>
                  <span className="block text-2xl font-black text-white uppercase tracking-tighter">±0.001mm</span>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
