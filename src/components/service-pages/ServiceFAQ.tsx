'use client';

import React from 'react';
import { Info, Send } from 'lucide-react';
import { useModalStore } from '@/store/useModalStore';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { FAQItem } from '@/lib/services/types';

interface ServiceFAQProps {
  items: FAQItem[];
  title?: string;
}

export default function ServiceFAQ({ items, title = 'Частые вопросы' }: ServiceFAQProps) {
  const openModal = useModalStore((state) => state.openModal);

  if (!items || items.length === 0) return null;

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column - 4 columns (1/3 area) */}
        <div className="lg:col-span-4 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--ds-accent-soft)] text-[var(--ds-accent)] rounded-full text-[10px] font-black uppercase tracking-widest border border-[var(--ds-accent-border)] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ds-accent)] animate-pulse" />
              <span>SLA // KNOWLEDGE BASE</span>
            </div>
            
            <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tighter text-white leading-tight">
              {title}
            </h2>
          </div>
          
          {/* Engineering Support Help Card */}
          <div className="bg-[var(--ds-bg-card-inner)] border border-[var(--ds-border-card)] rounded-2xl p-6 sm:p-8 shadow-[var(--ds-shadow-panel)] space-y-6 relative overflow-hidden">
            {/* Soft decorative background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--ds-accent-softer)]/5 blur-3xl rounded-full pointer-events-none" />
            
            <div className="flex items-center gap-3 text-[var(--ds-accent)] relative z-10">
              <Info className="w-5 h-5" />
              <span className="font-mono text-[9px] font-black uppercase tracking-widest">Engineering Support</span>
            </div>
            
            <p className="text-[var(--ds-text-body)] text-xs leading-relaxed font-light relative z-10">
              Не нашли нужного ответа? Наши инженеры готовы оперативно проконсультировать вас по любым конструктивным, технологическим и нормативным нюансам вашего фасада или вывески.
            </p>
            
            <button 
              onClick={() => openModal({ context: `FAQ Консультация: ${title}`, source: 'service_faq_support_card' })}
              className="group w-full py-4 rounded-full bg-[#0088CC] text-white font-semibold tracking-[0.02em] text-[12px] inline-flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,136,204,0.4)] transition-all duration-300 hover:bg-[#0088CC]/90 hover:shadow-[0_0_30px_rgba(0,136,204,0.6)] hover:-translate-y-0.5 active:scale-95 cursor-pointer relative z-10"
            >
              <Send className="h-4 w-4" />
              Обсудить с инженером
            </button>
          </div>
        </div>
        
        {/* Right Column - 8 columns (2/3 area) */}
        <div className="lg:col-span-8">
          <FAQAccordion items={items} variant="landing" />
        </div>
        
      </div>
    </section>
  );
}
