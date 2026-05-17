'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Clock, FileUp, Sparkles, Zap } from 'lucide-react';
import PageShell from '@/components/framework/PageShell';
import HeroGeneric from '@/components/sections/HeroGeneric';
import B2BSegmentTabs from '@/components/service-pages/B2BSegmentTabs';
import ServiceCalculatorShell from '@/components/service-pages/ServiceCalculatorShell';
import { NeonCalculatorV10 } from '@/components/calculator/NeonCalculatorV10';
import PricingPackages from '@/components/service-pages/PricingPackages';
import TechnologyComparison from '@/components/service-pages/TechnologyComparison';
import LegalTrustBlock from '@/components/service-pages/LegalTrustBlock';
import ServiceFAQ from '@/components/service-pages/ServiceFAQ';
import FinalCTA from '@/components/service-pages/FinalCTA';
import { neonData } from '@/data/service-pages/neon';
import { useModalStore } from '@/store/useModalStore';

export default function NeonPageClient() {
  const openModal = useModalStore((state) => state.openModal);

  const pricingPreview = {
    items: [
      { label: 'Готовые SKU', price: '1 900', unit: '₽' },
      { label: 'Кастом', price: '9 500', unit: '₽' },
      { label: 'Business', price: '18 000', unit: '₽' },
      { label: 'B2B пакет', price: '90 000', unit: '₽' },
    ],
    badges: neonData.hero.trustLine,
    meta: [
      { label: 'Расчет', value: '30 мин' },
      { label: 'Макет', value: '24 ч' },
      { label: 'Производство', value: '3-5 дн.' },
    ],
  };

  return (
    <PageShell headerVariant="immersive" breadcrumbs={[
      { label: 'Услуги', href: '/#services' },
      { label: 'Гибкий Неон', href: '/services/neon' },
    ]} withMesh>
      <HeroGeneric
        subtitle={neonData.hero.eyebrow}
        title="Гибкий неон"
        titleAccent="для бизнеса"
        description={neonData.hero.subtitle}
        highlights={[
          'Считаем не метр ради метра, а задачу: витрина, фотозона, интерьер или запуск точки.',
          'Показываем честную вилку бюджета: готовые SKU, кастом, монтаж и B2B-пакеты отдельно.',
          'До производства проверяем макет, питание, место размещения и риски по 902-ПП.',
        ]}
        pricingPreview={pricingPreview}
        ctaText={neonData.hero.primaryCTA.label}
        ctaHref={neonData.hero.primaryCTA.href}
        secondaryCtaText={neonData.hero.secondaryCTA?.label}
        secondaryCtaHref={neonData.hero.secondaryCTA?.href}
      />
      <ProofStats />
      <B2BSegmentTabs segments={neonData.segments} />
      <ServiceCalculatorShell 
        title="Конструктор стоимости" 
        description="Введите текст, выберите размер и сценарий свечения. Покажем честный ориентир без цены ниже минимального кастомного чека."
      >
        <NeonCalculatorV10 />
      </ServiceCalculatorShell>
      <SkuShowcase />
      <PricingPackages packages={neonData.packages} />
      <CaseCards />
      {neonData.comparison && <TechnologyComparison title={neonData.comparison.title} items={neonData.comparison.items} />}
      {neonData.legal && <LegalTrustBlock title={neonData.legal.title} content={neonData.legal.content} bullets={neonData.legal.bullets} />}
      <ProcessTimeline />
      <LeadMagnets />
      <ServiceFAQ items={neonData.faq} />
      <FinalCTA title={neonData.finalCTA.title} description={neonData.finalCTA.description} buttonText={neonData.finalCTA.buttonText} />
      <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
        <button
          onClick={() => openModal({ context: 'Мобильный CTA: расчет гибкого неона', source: 'service_neon_mobile_sticky' })}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-accent-warm px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-[0_18px_48px_rgba(var(--accent-warm-rgb),0.34)]"
        >
          Рассчитать в WhatsApp
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </PageShell>
  );
}

function ProofStats() {
  if (!neonData.proofStats?.length) return null;

  return (
    <section className="border-t border-outline bg-background py-16">
      <div className="section-container grid grid-cols-1 gap-4 px-6 md:grid-cols-4">
        {neonData.proofStats.map((stat, index) => (
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

function SkuShowcase() {
  if (!neonData.sku?.length) return null;

  return (
    <section id="sku" className="section-padding border-t border-outline bg-background">
      <div className="section-container">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-[var(--radius-8)] border border-outline bg-surface px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-primary">
              <Sparkles className="h-4 w-4" />
              Retail anchor
            </div>
            <h2 className="geist-display-lg max-w-4xl text-on-surface">Готовые решения и быстрые SKU.</h2>
          </div>
          <p className="max-w-xl text-on-surface-variant">
            Доступные позиции нужны как ценовой якорь. Кастомный проект считаем отдельно: длина контура, подложка, питание, монтаж и срочность.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {neonData.sku.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-[var(--radius-16)] border border-outline bg-surface p-7 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-accent-warm/10 blur-3xl transition-opacity group-hover:opacity-80" />
              <div className="relative z-10">
                <div className="mb-8 flex h-32 items-center justify-center rounded-[var(--radius-12)] border border-outline bg-background">
                  <span className="text-4xl font-black uppercase tracking-tight text-on-surface [text-shadow:0_0_14px_rgba(var(--accent-warm-rgb),0.28)]">
                    {item.title.split(' ')[0]}
                  </span>
                </div>
                <h3 className="mb-2 text-2xl font-black uppercase tracking-tight">{item.title}</h3>
                <div className="mb-4 text-3xl font-black text-primary">{item.priceLabel}</div>
                <p className="mb-6 text-sm text-on-surface-variant">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-on-surface/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseCards() {
  if (!neonData.caseCards?.length) return null;

  return (
    <section className="section-padding border-t border-outline bg-surface">
      <div className="section-container">
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-[var(--radius-8)] border border-outline bg-background px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            B2B сценарии
          </div>
          <h2 className="geist-display-lg text-on-surface">Пакеты, которые продают задачу, а не метр неона.</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {neonData.caseCards.map((item, index) => (
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

function ProcessTimeline() {
  if (!neonData.process?.length) return null;

  return (
    <section className="section-padding border-t border-outline bg-background">
      <div className="section-container">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-[var(--radius-8)] border border-outline bg-surface px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">
              <Clock className="h-4 w-4 text-primary" />
              SLA
            </div>
            <h2 className="geist-display-lg text-on-surface">От эскиза до света на объекте.</h2>
          </div>
          <p className="max-w-xl text-on-surface-variant">
            Процесс специально разложен на короткие этапы: клиент понимает, когда будет расчет, макет, производство и монтаж.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {neonData.process.map((step, index) => (
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

function LeadMagnets() {
  if (!neonData.leadMagnets?.length) return null;

  return (
    <section className="border-t border-outline bg-surface py-16">
      <div className="section-container grid grid-cols-1 gap-4 px-6 md:grid-cols-3">
        {neonData.leadMagnets.map((item) => (
          <div key={item.title} className="flex gap-4 rounded-[var(--radius-12)] border border-outline bg-surface p-6 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-8)] bg-primary/8 text-primary">
              {item.title.includes('макет') ? <FileUp className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
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
