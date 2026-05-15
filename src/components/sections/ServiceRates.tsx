"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Calculator } from 'lucide-react';
import { SERVICES } from '@/data/services';
import { useLanguage } from '@/components/i18n/LanguageProvider';

interface ServiceRatesProps {
  compact?: boolean;
}

export default function ServiceRates({ compact = false }: ServiceRatesProps) {
  const { locale } = useLanguage();

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="section-container px-6 relative z-10">
        {!compact && (
          <header className="mb-20 max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-primary" />
              <span className="verge-mono-label text-primary uppercase tracking-[0.4em] text-[10px]">Commercial Terms</span>
            </div>
            <h2 className="geist-display-lg md:text-[84px] text-on-surface uppercase leading-[0.85] mb-8">
              Тарифы и <br/>
              <span className="text-on-surface-variant/30">Эффективность.</span>
            </h2>
            <p className="text-on-surface-variant text-xl leading-relaxed font-light border-l border-primary/20 pl-8">
              Прозрачное ценообразование на базе инженерных расчетов. Выберите типовое решение или запросите индивидуальную спецификацию под ваш бюджет.
            </p>
          </header>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bento-card p-10 transition-all duration-500 hover:border-primary/40 flex flex-col h-full bg-surface-elevated/40 backdrop-blur-sm"
            >
              <div className="mb-8 flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <span className="verge-mono-label text-[10px] text-primary/60 uppercase tracking-widest">{service.segments[0]}</span>
                  <div className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                </div>
                <h3 className="font-headline text-3xl font-black uppercase tracking-tighter mb-4 text-on-surface leading-none group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-on-surface-variant text-sm mb-8 leading-relaxed line-clamp-3 font-light">
                  {service.shortDescription}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="text-[12px] text-on-surface-variant/80 flex items-start gap-3 uppercase tracking-wider font-bold">
                      <div className="w-1.5 h-1.5 bg-primary/40 rounded-full mt-1 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-8 border-t border-outline/10 mt-auto">
                <div className="flex items-baseline mb-8">
                  <span className="text-[10px] font-mono text-on-surface-variant/50 mr-3 uppercase tracking-widest">Base Rate /</span>
                  <span className="text-5xl font-black font-headline text-on-surface tracking-tighter">
                    {service.basePrice.toLocaleString()}
                  </span>
                  <span className="text-primary ml-3 font-mono text-[12px] font-bold uppercase tracking-widest">{service.priceUnit}</span>
                </div>
                
                <Link 
                  href={`/calculator?type=${service.id}`}
                  className="w-full flex items-center justify-center gap-3 bg-surface border border-outline px-6 py-4 font-mono text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-primary hover:text-on-primary hover:border-primary group/btn"
                >
                  <Calculator className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Calculate Now</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
