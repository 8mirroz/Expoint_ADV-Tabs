'use client';

import React from 'react';
import { Zap } from 'lucide-react';
import { Service } from '@/data/services';
import { useLanguage } from '@/components/i18n/LanguageProvider';

interface ServicePricingProps {
  service: Service;
}

export function ServicePricing({ service }: ServicePricingProps) {
  const { locale } = useLanguage();

  return (
    <section className="section-padding px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary verge-mono-label">Estimation Engine</span>
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="geist-display-lg text-on-surface">
            {locale === 'ru' ? 'Интеллектуальный' : 'Intellectual'} <br/> 
            <span className="text-on-surface-variant/40">{locale === 'ru' ? 'Расчет' : 'Calculation'}</span>
          </h2>
          <p className="text-on-surface-variant text-[18px] leading-[28px] max-w-xl font-light mt-6">
            {locale === 'ru' 
              ? 'Получите детальную смету за 30 секунд. Итоговая стоимость может быть оптимизирована при комплексном заказе.' 
              : 'Get a detailed estimate in 30 seconds. The final cost can be optimized for complex orders.'}
          </p>
        </div>
        
        <div className="relative p-px bg-outline rounded-3xl overflow-hidden group shadow-elevation-1">
          <div className="relative bg-surface p-12 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
             
             <div className="space-y-4">
               <span className="text-primary verge-mono-label">Base_Rate</span>
               <div className="flex items-baseline gap-2">
                 <span className="verge-mono-label mr-1">от</span>
                 <span className="geist-display-xl font-bold text-on-surface">{service.basePrice.toLocaleString('ru-RU')}</span>
                 <span className="text-primary text-xl font-semibold">{service.priceUnit}</span>
               </div>
               <p className="text-on-surface-variant text-[15px] font-light max-w-sm">
                 {locale === 'ru' 
                   ? 'Финальная стоимость зависит от габаритов, материалов и сложности монтажа.' 
                   : 'The final cost depends on dimensions, materials, and installation complexity.'}
               </p>
             </div>

             <a 
               href={`/calculator?type=${service.id}`}
               className="geist-button-primary h-16 px-12 gap-3"
             >
               {locale === 'ru' ? 'Перейти в калькулятор' : 'Open Calculator'}
               <Zap className="w-5 h-5" />
             </a>
          </div>
        </div>
    </section>
  );
}
