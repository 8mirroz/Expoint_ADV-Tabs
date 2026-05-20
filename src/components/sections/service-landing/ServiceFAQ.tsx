'use client';

import React from 'react';
import { Info } from 'lucide-react';
import { Service } from '@/data/services';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { FAQAccordion } from '@/components/ui/FAQAccordion';

interface ServiceFAQProps {
  service: Service;
  openModal: (options: { context: string; source: string }) => void;
}

export function ServiceFAQ({ service, openModal }: ServiceFAQProps) {
  const { locale } = useLanguage();

  if (!service.faq) return null;

  return (
    <section className="section-padding px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-16">
        <div className="lg:col-span-1 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary verge-mono-label">Knowledge Base</span>
            </div>
            <h2 className="geist-display-lg text-on-surface">
              {locale === 'ru' ? 'Частые' : 'Common'} <br/> 
              <span className="text-on-surface-variant/40">{locale === 'ru' ? 'Вопросы' : 'Questions'}</span>
            </h2>
          </div>
          <div className="p-8 bg-surface border border-outline rounded-2xl shadow-elevation-1 space-y-6">
            <div className="flex items-center gap-4 text-primary">
              <Info className="w-6 h-6" />
              <span className="verge-mono-label font-semibold">Engineering Support</span>
            </div>
            <p className="text-on-surface-variant text-base font-light leading-relaxed">
              {locale === 'ru' 
                ? 'Не нашли ответ? Наши инженеры готовы проконсультировать вас по любым техническим нюансам вашего проекта.' 
                : 'Did not find the answer? Our engineers are ready to consult you on any technical nuances of your project.'}
            </p>
            <button 
              onClick={() => openModal({ context: `FAQ Help: ${service.title}`, source: 'service_page' })}
              className="geist-button-primary w-full h-12"
            >
              {locale === 'ru' ? 'Задать вопрос' : 'Ask Question'}
            </button>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <FAQAccordion items={service.faq} variant="landing" />
        </div>
      </div>
    </section>
  );
}
