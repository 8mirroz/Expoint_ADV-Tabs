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
    <section className="py-24 px-6 max-w-7xl mx-auto">
       <div className="flex flex-col items-center text-center mb-20">
         <div className="flex items-center gap-3 mb-6">
           <div className="h-px w-8 bg-accent" />
           <span className="text-accent font-black uppercase tracking-[0.3em] text-[10px]">Estimation Engine</span>
           <div className="h-px w-8 bg-accent" />
         </div>
         <h2 className="section-title text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
           {locale === 'ru' ? 'Интеллектуальный' : 'Intellectual'} <br/> 
           <span className="text-on-surface-variant/40">{locale === 'ru' ? 'Расчет' : 'Calculation'}</span>
         </h2>
         <p className="text-on-surface-variant max-w-xl font-light text-lg">
           {locale === 'ru' 
             ? 'Получите детальную смету за 30 секунд. Итоговая стоимость может быть оптимизирована при комплексном заказе.' 
             : 'Get a detailed estimate in 30 seconds. The final cost can be optimized for complex orders.'}
         </p>
       </div>
       <div className="calculator-container relative p-1 bg-outline rounded-[2px] overflow-hidden group">
         <div className="absolute inset-0 industrial-grid opacity-5 group-hover:opacity-10 transition-opacity" />
         <div className="relative bg-surface p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-accent/40 via-accent to-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="space-y-4">
              <span className="text-accent font-black uppercase tracking-[0.3em] text-[10px]">Base_Rate</span>
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-on-surface-variant mr-1">от</span>
                <span className="text-6xl md:text-8xl font-black text-white tracking-tighter">{service.basePrice.toLocaleString('ru-RU')}</span>
                <span className="text-accent ml-2 text-xl font-bold">{service.priceUnit}</span>
              </div>
              <p className="text-on-surface-variant font-light max-w-sm">
                {locale === 'ru' 
                  ? 'Финальная стоимость зависит от габаритов, материалов и сложности монтажа.' 
                  : 'The final cost depends on dimensions, materials, and installation complexity.'}
              </p>
            </div>

            <a 
              href={`/calculator?type=${service.id}`}
              className="w-full md:w-auto px-12 py-8 bg-accent text-white font-black uppercase tracking-[0.4em] text-[11px] hover:scale-105 transition-transform text-center flex items-center justify-center gap-3 shadow-[0_0_80px_rgba(255,107,0,0.2)]"
            >
              {locale === 'ru' ? 'Перейти в калькулятор' : 'Open Calculator'}
              <Zap className="w-5 h-5" />
            </a>
         </div>
       </div>
    </section>
  );
}
