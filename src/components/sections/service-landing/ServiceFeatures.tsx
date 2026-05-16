'use client';

import React from 'react';
import { Service } from '@/data/services';
import { BentoGrid } from '@/components/ui/bento/BentoGrid';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { 
  Zap, 
  ShieldCheck, 
  Target, 
  Box, 
  Layers, 
  Truck 
} from 'lucide-react';

interface ServiceFeaturesProps {
  service: Service;
  previewVideo?: string;
}

export function ServiceFeatures({ service, previewVideo }: ServiceFeaturesProps) {
  const { locale } = useLanguage();
  const icons = [Zap, ShieldCheck, Target, Box, Layers, Truck];

  return (
    <section className="bento-grid-section section-padding px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary verge-mono-label">Quality Vector</span>
          </div>
          <h2 className="geist-display-lg text-on-surface">
            {locale === 'ru' ? 'Преимущества' : 'Advantages'} <br/> 
            <span className="text-on-surface-variant/40">{locale === 'ru' ? 'Решения' : 'Solutions'}</span>
          </h2>
        </div>
        <div className="flex items-center gap-6 verge-mono-label text-on-surface-variant/40 border-l border-outline pl-8">
          <div className="space-y-1">
            <div className="text-on-surface font-semibold">ISO-9001:2015</div>
            <div>CERTIFIED_WORKFLOW</div>
          </div>
          <div className="space-y-1">
            <div className="text-on-surface font-semibold">902-PP</div>
            <div>COMPLIANCE_GATE</div>
          </div>
        </div>
      </div>
      
      <BentoGrid>
        {service.features.map((feature, idx) => {
          const Icon = icons[idx % icons.length];
          const hasVideo = (service.id === 'volumetric-letters' || service.id === 'lightbox') && idx % 2 === 0;
          
          return (
            <div key={idx} className="bento-card-wrapper h-full group min-h-[450px]">
              <div className="relative h-full bg-surface border border-outline transition-all duration-700 group-hover:border-primary/40 rounded-2xl overflow-hidden flex flex-col justify-between shadow-elevation-1">
                 {/* Background Visual (Video or Gradient) */}
                 <div className="absolute inset-0 z-0">
                    {hasVideo ? (
                      <>
                        <video 
                          autoPlay 
                          muted 
                          loop 
                          playsInline 
                          className="w-full h-full object-cover opacity-10 grayscale group-hover:opacity-30 transition-opacity duration-1000 scale-105 group-hover:scale-100"
                        >
                          <source src={previewVideo} type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-linear-to-b from-transparent via-surface/40 to-surface" />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                    
                    <div className="absolute top-6 right-6 verge-mono-label text-on-surface-variant/20 pointer-events-none">
                      Feature_ID: 0{idx + 1}
                    </div>
                 </div>

                  <div className="relative z-10 p-10 flex flex-col justify-between h-full">
                   <div className="space-y-8">
                     <div className="w-14 h-14 bg-surface border border-outline flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-700 rounded-xl relative shadow-sm">
                       <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                     </div>
                     
                     <div className="space-y-4">
                       <h3 className="geist-display-sm text-on-surface group-hover:text-primary transition-colors">
                         {feature}
                       </h3>
                       <div className="h-px w-12 bg-primary/20 group-hover:w-full transition-all duration-700" />
                       <p className="text-on-surface-variant text-base leading-relaxed font-light">
                         {locale === 'ru' 
                           ? 'Высокотехнологичный процесс производства с использованием сертифицированных материалов и многоуровневым контролем качества на каждом этапе сборки.' 
                           : 'High-tech production process using certified materials and multi-level quality control at every stage of assembly.'}
                       </p>
                     </div>
                   </div>
                   
                   <div className="mt-8 pt-8 border-t border-outline/50 flex items-end justify-between">
                     <div className="space-y-2">
                       <div className="flex gap-1">
                         {[1,2,3,4].map(i => (
                           <div key={i} className={`w-3 h-1 ${i <= (idx + 2) ? 'bg-primary/40' : 'bg-outline'} transition-colors duration-500`} />
                         ))}
                       </div>
                       <span className="block verge-mono-label text-on-surface-variant/40">Efficiency_Index: 0.9{idx + 5}</span>
                     </div>
                     
                     <div className="text-right">
                       <div className="verge-mono-label text-on-surface font-semibold">V8_PRO</div>
                       <div className="text-[8px] font-mono text-on-surface-variant/20 uppercase">Core_Verified</div>
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          );
        })}
      </BentoGrid>
    </section>
  );
}
