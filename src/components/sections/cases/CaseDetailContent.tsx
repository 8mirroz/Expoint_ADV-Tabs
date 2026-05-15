'use client';

import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, TrendingUp, Clock, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { CaseStudy } from '@/data/cases';
import { useLanguage } from '@/components/i18n/LanguageProvider';

interface CaseDetailContentProps {
  caseStudy: CaseStudy;
}

export function CaseDetailContent({ caseStudy }: CaseDetailContentProps) {
  const { locale } = useLanguage();
  
  return (
    <div className="bg-background text-on-surface">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        {caseStudy.videoUrl ? (
          <video 
            src={caseStudy.videoUrl} 
            autoPlay loop muted playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
        ) : (
          <div className={`absolute inset-0 ${caseStudy.imageBg} opacity-20`} />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
        
        <div className="section-container relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="verge-mono-label text-primary mb-6 block uppercase tracking-[0.4em]">
              Case Study / {caseStudy.segment}
            </span>
            <h1 className="geist-display-lg md:text-[80px] lg:text-[100px] text-white uppercase leading-[0.85] mb-8">
              {caseStudy.title}
            </h1>
            <div className="flex flex-wrap gap-12 mt-12">
              {caseStudy.metrics.map((metric, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <span className="text-primary font-black text-4xl tracking-tighter">{metric.value}</span>
                  <span className="text-on-surface-variant text-[10px] uppercase tracking-widest font-bold opacity-60">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="section-padding bg-surface-elevated/10">
        <div className="section-container px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-10">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                  <span className="text-accent font-mono font-bold uppercase tracking-[0.3em] text-[10px]">The Challenge</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-on-surface mb-6">
                  Задача клиента
                </h2>
                <p className="text-on-surface-variant text-lg leading-relaxed font-light">
                  {caseStudy.description}
                </p>
              </div>

              <div className="p-8 bento-card bg-surface/40 backdrop-blur-md">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface/40 mb-6">Project Metadata</h4>
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-outline/10 pb-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-xs uppercase tracking-wider font-bold">Срок реализации</span>
                    </div>
                    <span className="font-mono text-sm">{caseStudy.term}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-outline/10 pb-4">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-4 h-4 text-primary" />
                      <span className="text-xs uppercase tracking-wider font-bold">Бюджет проекта</span>
                    </div>
                    <span className="font-mono text-sm">{caseStudy.budget}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span className="text-primary font-mono font-bold uppercase tracking-[0.3em] text-[10px]">The Solution</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-on-surface mb-6">
                Инженерное решение
              </h2>
              <p className="text-on-surface-variant text-lg leading-relaxed font-light mb-10">
                {caseStudy.solution}
              </p>

              <div className="space-y-4">
                {caseStudy.contentMeta.claims.map((claim, i) => (
                  <div key={i} className="flex gap-4 p-6 bg-primary/5 border border-primary/10 rounded-[2px]">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-bold text-on-surface mb-2">{claim.claim}</p>
                      <p className="text-xs text-on-surface-variant italic opacity-60">&ldquo;{claim.evidence_snippet}&rdquo;</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="section-container relative z-10 px-6 text-center">
          <TrendingUp className="w-12 h-12 text-primary mx-auto mb-8" />
          <h2 className="geist-display-md md:text-[64px] text-on-surface uppercase leading-none mb-8">
            Нужен аналогичный <br/> <span className="text-primary">результат?</span>
          </h2>
          <p className="text-on-surface-variant text-xl max-w-2xl mx-auto mb-12 font-light">
            Мы адаптируем это решение под специфику вашего бизнеса и технические условия площадки.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/calculator" 
              className="bg-primary text-on-primary px-12 py-5 font-black uppercase tracking-[0.2em] text-[11px] hover:-translate-y-1 transition-all"
            >
              Рассчитать стоимость
            </Link>
            <Link 
              href="/contacts" 
              className="bg-surface border border-outline text-on-surface px-12 py-5 font-black uppercase tracking-[0.2em] text-[11px] hover:bg-surface-variant transition-all"
            >
              Обсудить проект
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
