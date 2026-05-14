'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Zap, Target } from 'lucide-react';
import { Service } from '@/data/services';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { tracker } from '@/lib/analytics/tracker';

interface ServiceCTAProps {
  service: Service;
  sessionKey: string;
  openModal: (options: { context: string; source: string }) => void;
}

export function ServiceCTA({ service, sessionKey, openModal }: ServiceCTAProps) {
  const { locale } = useLanguage();

  return (
    <section className="py-32 md:py-48 px-6 relative overflow-hidden bg-black">
       {/* Background Visual Engine */}
       <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 industrial-grid opacity-20" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,0,0.1),transparent_70%)]" />
         
         {/* Dynamic Scanning Effect */}
         <div className="absolute inset-0 pointer-events-none">
           <div className="absolute top-0 left-0 w-full h-1/3 bg-linear-to-b from-accent/10 via-transparent to-transparent animate-scan opacity-20" />
           <div className="absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-accent/10 via-transparent to-transparent animate-scan-reverse opacity-20" />
         </div>

         <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
         <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
         
         <div className="absolute inset-y-0 left-12 w-px bg-white/5 hidden xl:block" />
         <div className="absolute inset-y-0 right-12 w-px bg-white/5 hidden xl:block" />
         
         {/* Industrial Metadata Corners */}
         <div className="absolute top-12 left-12 hidden lg:flex flex-col gap-1 text-[8px] font-mono text-white/20 uppercase tracking-[0.4em]">
           <span>Terminal_ID: EXP-CTR-09</span>
           <span>Session_Key: {sessionKey}</span>
         </div>
         <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-end gap-1 text-[8px] font-mono text-white/20 uppercase tracking-[0.4em]">
           <span>Security_Level: ENCRYPTED</span>
           <span>Lat: 55.7558° N | Lon: 37.6173° E</span>
         </div>
       </div>
       
       <div className="max-w-5xl mx-auto relative z-10">
         <div className="flex flex-col items-center gap-12 text-center">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-4 px-6 py-2 bg-accent/10 border border-accent/30 text-accent text-[10px] font-black uppercase tracking-[0.5em] backdrop-blur-xl"
           >
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
             </span>
             Protocol_Final_Engagement
           </motion.div>
           
           <div className="space-y-8">
             <h2 className="text-6xl md:text-[140px] font-black uppercase tracking-tighter leading-[0.75] text-white">
               {locale === 'ru' ? 'Запустите' : 'Ignite'} <br /> 
               <span className="text-accent">{locale === 'ru' ? 'Проект' : 'Project'}</span>
             </h2>
             <div className="relative inline-block mt-8">
               <p className="text-white/40 text-xl md:text-2xl font-light max-w-2xl mx-auto border-l-2 border-accent pl-8 text-left italic">
                 {locale === 'ru' 
                   ? `Превратите вашу идею в осязаемый актив. Детальный инженерный расчет ${service.title} в течение 2 часов.`
                   : `Transform your idea into a tangible asset. Detailed engineering estimate for ${service.title} within 2 hours.`}
               </p>
               <div className="absolute -right-8 top-0 text-accent/20 select-none hidden md:block">
                 <Target size={80} strokeWidth={0.5} />
               </div>
             </div>
           </div>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-3xl pt-12">
             <motion.button 
               whileHover={{ scale: 1.02, backgroundColor: '#FF8A00' }}
               whileTap={{ scale: 0.98 }}
               onClick={() => {
                 tracker.track('cta_click', { type: 'estimate', service: service.id });
                 openModal({ context: `CTA: ${service.title}`, source: 'service_page' });
               }}
               className="group relative w-full sm:flex-1 py-10 bg-accent text-white font-black uppercase tracking-[0.4em] text-[11px] overflow-hidden shadow-[0_0_80px_rgba(255,107,0,0.2)] transition-all duration-500"
             >
               <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
               <span className="relative z-10 flex items-center justify-center gap-3">
                 {locale === 'ru' ? 'Запросить расчет' : 'Request Estimate'}
                 <Zap className="w-5 h-5" />
               </span>
               <div className="absolute top-0 right-0 w-8 h-8 bg-black/10 -rotate-45 translate-x-4 -translate-y-4" />
             </motion.button>
             
             <motion.button 
               whileHover={{ scale: 1.02, borderColor: '#FF9F0A' }}
               whileTap={{ scale: 0.98 }}
               onClick={() => {
                 tracker.track('cta_click', { type: 'survey', service: service.id });
                 openModal({ context: `Замер: ${service.title}`, source: 'service_page' });
               }}
               className="relative w-full sm:flex-1 py-10 bg-transparent border border-white/10 text-white font-black uppercase tracking-[0.4em] text-[11px] hover:text-accent transition-all duration-500 overflow-hidden group"
             >
               <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
               <span className="relative z-10">{locale === 'ru' ? 'Вызвать замерщика' : 'Book a Surveyor'}</span>
             </motion.button>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full pt-16 border-t border-white/5">
             {[
               { label: 'SLA_Response', value: '< 120 MIN' },
               { label: 'PP_Compliance', value: '902-PP_FULL' },
               { label: 'System_Warranty', value: '60 MONTHS' },
               { label: 'Visual_Model', value: '3D_RENDER' }
             ].map((stat, i) => (
               <div key={i} className="text-center space-y-3 group/stat">
                 <div className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em] group-hover/stat:text-accent/40 transition-colors">{stat.label}</div>
                 <div className="text-sm font-black text-white uppercase tracking-tighter group-hover/stat:scale-110 transition-transform">{stat.value}</div>
               </div>
             ))}
           </div>
         </div>
       </div>
       
       <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-black to-transparent pointer-events-none" />
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-linear-to-b from-accent/40 to-transparent" />
    </section>
  );
}
