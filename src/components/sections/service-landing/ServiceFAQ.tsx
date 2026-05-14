'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Info } from 'lucide-react';
import { Service } from '@/data/services';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { cn } from '@/lib/utils';

interface ServiceFAQProps {
  service: Service;
  openModal: (options: { context: string; source: string }) => void;
}

export function ServiceFAQ({ service, openModal }: ServiceFAQProps) {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);
  const { locale } = useLanguage();

  if (!service.faq) return null;

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-16">
        <div className="lg:col-span-1 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-accent" />
              <span className="text-accent font-black uppercase tracking-[0.3em] text-[10px]">Knowledge Base</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9]">
              {locale === 'ru' ? 'Частые' : 'Common'} <br/> 
              <span className="text-on-surface-variant/40">{locale === 'ru' ? 'Вопросы' : 'Questions'}</span>
            </h2>
          </div>
          <div className="p-8 bg-accent/5 border border-accent/20 space-y-6">
            <div className="flex items-center gap-4 text-accent">
              <Info className="w-6 h-6" />
              <span className="font-black uppercase tracking-widest text-[10px]">Engineering Support</span>
            </div>
            <p className="text-on-surface-variant text-sm font-light leading-relaxed">
              {locale === 'ru' 
                ? 'Не нашли ответ? Наши инженеры готовы проконсультировать вас по любым техническим нюансам вашего проекта.' 
                : 'Did not find the answer? Our engineers are ready to consult you on any technical nuances of your project.'}
            </p>
            <button 
              onClick={() => openModal({ context: `FAQ Help: ${service.title}`, source: 'service_page' })}
              className="w-full py-4 bg-accent text-white font-black uppercase tracking-widest text-[9px] hover:scale-105 transition-transform"
            >
              {locale === 'ru' ? 'Задать вопрос' : 'Ask Question'}
            </button>
          </div>
        </div>
        
        <div className="lg:col-span-2 space-y-4">
           {service.faq.map((item, idx) => (
             <div key={idx} className="group overflow-hidden">
               <button
                 onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                 className={cn(
                   "w-full text-left p-8 bg-surface border transition-all duration-500 relative overflow-hidden",
                   expandedFaq === idx ? "border-accent/40" : "border-outline hover:border-accent/20"
                 )}
               >
                 <div className={cn(
                   "absolute left-0 top-0 bottom-0 w-1 transition-all duration-500",
                   expandedFaq === idx ? "bg-accent" : "bg-accent/0"
                 )} />
                 
                 <div className="flex items-center justify-between gap-8">
                   <div className="space-y-1">
                     <span className="text-[9px] font-mono text-accent/40 uppercase tracking-[0.3em]">Ref_ID: FAQ_0{idx + 1}</span>
                     <h3 className="font-black text-xl tracking-tight text-on-surface uppercase">{item.question}</h3>
                   </div>
                   <div className={cn(
                     "w-10 h-10 shrink-0 flex items-center justify-center border transition-all duration-500",
                     expandedFaq === idx ? "border-accent/40 rotate-180 bg-accent/5" : "border-outline"
                   )}>
                     <ChevronDown className={cn(
                       "w-5 h-5 transition-colors",
                       expandedFaq === idx ? "text-accent" : "text-on-surface-variant"
                     )} />
                   </div>
                 </div>

                 <AnimatePresence mode="wait">
                   {expandedFaq === idx && (
                     <motion.div
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: "auto", opacity: 1 }}
                       exit={{ height: 0, opacity: 0 }}
                       transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                     >
                       <div className="pt-8 mt-8 border-t border-outline/30">
                         <p className="text-on-surface-variant text-base leading-relaxed font-light">
                           {item.answer}
                         </p>
                         
                         <div className="mt-8 flex items-center gap-6">
                           <div className="flex items-center gap-2">
                             <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                             <span className="text-[9px] font-mono text-on-surface-variant/40 uppercase tracking-widest">Status: Verified_Core</span>
                           </div>
                           <div className="text-[9px] font-mono text-on-surface-variant/40 uppercase tracking-widest">
                             Updated: VERIFIED_RELEASE
                            </div>
                         </div>
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </button>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
