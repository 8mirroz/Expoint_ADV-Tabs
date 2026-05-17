'use client';

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Clock, FileUp, Sparkles, Zap } from 'lucide-react';
import type { ServicePageData } from '@/lib/services/types';

interface ServiceDataProps {
  data: ServicePageData;
}

export function ServiceProofStats({ data }: ServiceDataProps) {
  if (!data.proofStats?.length) return null;

  return (
    <section className="border-t border-outline bg-background py-16">
      <div className="section-container grid grid-cols-1 gap-4 px-6 md:grid-cols-4">
        {data.proofStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: index * 0.04 }}
            className="rounded-[var(--radius-12)] border border-outline bg-surface p-6 shadow-sm"
          >
            <div className="mb-4 text-4xl font-black tracking-tight text-primary">{stat.value}</div>
            <h2 className="mb-2 text-sm font-black uppercase tracking-[0.16em] text-on-surface">{stat.label}</h2>
            <p className="text-sm text-on-surface-variant">{stat.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function ServiceCaseCards({ data }: ServiceDataProps) {
  if (!data.caseCards?.length) return null;

  return (
    <section className="section-padding border-t border-outline bg-surface">
      <div className="section-container">
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-[var(--radius-8)] border border-outline bg-background px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            B2B сценарии
          </div>
          <h2 className="geist-display-lg text-on-surface">Пакеты, кейсы и рабочие сценарии.</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {data.caseCards.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className="rounded-[var(--radius-16)] border border-outline bg-surface p-7 shadow-sm"
            >
              <h3 className="mb-5 text-2xl font-black uppercase tracking-tight">{item.title}</h3>
              <p className="mb-8 text-on-surface-variant">{item.description}</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-background p-4">
                  <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-on-surface/45">Бюджет</div>
                  <div className="font-black text-primary">{item.budget}</div>
                </div>
                <div className="rounded-2xl bg-background p-4">
                  <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-on-surface/45">Срок</div>
                  <div className="font-black">{item.timeline}</div>
                </div>
              </div>
              <div className="mt-4 rounded-[var(--radius-8)] border border-primary/15 bg-primary/5 p-4 text-sm font-bold text-on-surface">
                Результат: {item.result}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceProcessTimeline({ data }: ServiceDataProps) {
  if (!data.process?.length) return null;

  return (
    <section className="section-padding border-t border-outline bg-background">
      <div className="section-container">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-[var(--radius-8)] border border-outline bg-surface px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">
              <Clock className="h-4 w-4 text-primary" />
              SLA
            </div>
            <h2 className="geist-display-lg text-on-surface">От запроса до запуска без сюрпризов.</h2>
          </div>
          <p className="max-w-xl text-on-surface-variant">
            Процесс разбит на короткие и понятные этапы: расчет, согласование, производство, монтаж и передача проекта в работу.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {data.process.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
              className="relative rounded-[var(--radius-16)] border border-outline bg-surface p-6 shadow-sm"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-5xl font-black text-on-surface/10">0{index + 1}</span>
                <span className="rounded-full bg-primary/8 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary">{step.meta}</span>
              </div>
              <h3 className="mb-3 text-xl font-black uppercase tracking-tight">{step.title}</h3>
              <p className="text-sm text-on-surface-variant">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceLeadMagnets({ data }: ServiceDataProps) {
  if (!data.leadMagnets?.length) return null;

  return (
    <section className="border-t border-outline bg-surface py-16">
      <div className="section-container grid grid-cols-1 gap-4 px-6 md:grid-cols-3">
        {data.leadMagnets.map((item) => (
          <div key={item.title} className="flex gap-4 rounded-[var(--radius-12)] border border-outline bg-surface p-6 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-8)] bg-primary/8 text-primary">
              {item.title.includes('макет') || item.title.includes('файл') ? (
                <FileUp className="h-5 w-5" />
              ) : item.title.includes('проверка') ? (
                <Sparkles className="h-5 w-5" />
              ) : (
                <Zap className="h-5 w-5" />
              )}
            </div>
            <div>
              <h3 className="mb-2 text-base font-black uppercase tracking-tight">{item.title}</h3>
              <p className="text-sm text-on-surface-variant">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
