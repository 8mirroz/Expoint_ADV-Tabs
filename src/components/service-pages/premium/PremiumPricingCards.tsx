'use client';

import React from 'react';
import { motion } from 'motion/react';
import { PricingPackage } from '@/lib/services/types';
import { Check, Star, Settings, Award, ShieldAlert, Cpu } from 'lucide-react';
import { useModalStore } from '@/store/useModalStore';

interface PremiumPricingCardsProps {
  packages: PricingPackage[];
  eyebrow?: string;
  title?: string;
  description?: string;
  modalContextLabel?: string;
  modalSourcePrefix?: string;
}

// Map icons dynamically based on package role
const getPackageIcon = (role: string) => {
  switch (role) {
    case 'entry':
      return <Settings className="w-5 h-5 text-[var(--ds-text-muted)]" />;
    case 'recommended':
      return <Cpu className="w-5 h-5 text-[var(--ds-accent)]" />;
    case 'anchor':
      return <Award className="w-5 h-5 text-[var(--ds-cat-volumetric)]" />;
    default:
      return <Settings className="w-5 h-5 text-white" />;
  }
};

// Map technical formulas dynamically
const getFormulaParts = (id: string) => {
  switch (id) {
    case 'start':
      return [
        { label: 'База (H×L)', value: '85 ₽ / см' },
        { label: 'Монтаж', value: 'Типовой профиль' },
        { label: 'Засветка', value: 'Стандарт LED' },
      ];
    case 'business':
      return [
        { label: 'База (H×L)', value: '110 ₽ / см' },
        { label: 'Засветка', value: 'Samsung LED' },
        { label: 'Допуск', value: '902-ПП Аудит' },
      ];
    case 'premium':
      return [
        { label: 'База (H×L)', value: '180 ₽ / см' },
        { label: 'Корпус', value: 'Сталь AISI 304' },
        { label: 'Засветка', value: 'Контражур (Halo)' },
      ];
    default:
      return [
        { label: 'База', value: 'По тарифу' }
      ];
  }
};

// Map technical subservices with prices
const getSubservices = (id: string) => {
  switch (id) {
    case 'start':
      return [
        { name: 'Макет-привязка', price: '0 ₽' },
        { name: 'Проверка по 902-ПП', price: '0 ₽' },
        { name: 'Сборка борта ПВХ', price: 'ВКЛ' },
      ];
    case 'business':
      return [
        { name: 'AI-предпросмотр 24ч', price: '0 ₽' },
        { name: 'Compliance-контроль', price: '0 ₽' },
        { name: 'Диоды Samsung IP67', price: 'ВКЛ' },
      ];
    case 'premium':
      return [
        { name: 'Проектирование КМ/КМД', price: '0 ₽' },
        { name: 'Сталь AISI 304', price: 'ВКЛ' },
        { name: 'Ночной спецмонтаж', price: 'ВКЛ' },
      ];
    default:
      return [
        { name: 'Базовая подготовка', price: '0 ₽' },
        { name: 'Сборка', price: 'ВКЛ' },
      ];
  }
};

export default function PremiumPricingCards({
  packages,
  eyebrow = 'SYS // PACKAGES',
  title = 'Пакеты под уровень фасада.',
  description = 'В буквах пакет определяет не только материалы, но и тип света, монтажную схему, compliance-контроль и уровень брендового эффекта.',
  modalContextLabel = 'Пакет услуги',
  modalSourcePrefix = 'service_package',
}: PremiumPricingCardsProps) {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <section id="packages" className="scroll-mt-28 py-24 border-t border-[var(--ds-border-default)] bg-[var(--ds-bg-section)] relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[var(--ds-accent)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block with high info-density grid */}
        <div className="mb-20 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="space-y-4">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-[var(--ds-accent)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--ds-accent)] animate-pulse" />
              {eyebrow}
            </p>
            <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tighter text-white leading-none">
              {title}
            </h2>
          </div>
          <p className="max-w-xl text-sm sm:text-base leading-relaxed text-[var(--ds-text-body)]">
            {description}
          </p>
        </div>

        {/* Dynamic Cards Grid with subgrid layout for perfect alignment */}
        <div className="grid grid-cols-1 gap-8 md:gap-x-6 md:gap-y-10 md:grid-cols-3 md:grid-rows-[auto_auto_auto_auto_1fr_auto]">
          {packages.map((pkg, index) => {
            const isRec = pkg.role === 'recommended';
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                viewport={{ once: true, margin: "-100px" }}
                className={`group relative flex flex-col gap-y-8 p-6 sm:p-8 rounded-[2rem] border overflow-hidden transition-all duration-500 md:grid md:grid-cols-1 md:grid-rows-subgrid md:row-span-6 md:gap-y-0 ${
                  isRec
                    ? 'bg-gradient-to-b from-[var(--ds-bg-card-inner)] to-black border-[var(--ds-accent)]/50 shadow-[0_0_40px_rgba(0,255,163,0.08)] hover:shadow-[0_0_80px_rgba(0,255,163,0.15)] hover:border-[var(--ds-accent)]/80 hover:-translate-y-1.5'
                    : 'bg-gradient-to-b from-[var(--ds-bg-card-solid)] to-transparent border-white/5 hover:border-white/15 hover:shadow-2xl hover:-translate-y-1.5'
                }`}
              >
                {/* Subtle rich gradient background for all cards */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                {isRec && <div className="absolute -top-32 -right-32 w-64 h-64 bg-[var(--ds-accent)]/20 blur-[70px] rounded-full pointer-events-none group-hover:bg-[var(--ds-accent)]/30 transition-colors duration-500" />}
                
                {/* 6.7.1 Icon + Title */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-inner transition-colors duration-500 ${
                      isRec
                        ? 'border-[var(--ds-accent)]/30 bg-[var(--ds-accent)]/10 text-[var(--ds-accent)]'
                        : 'border-white/10 bg-white/5 group-hover:bg-white/10 group-hover:border-white/20'
                    }`}>
                      {getPackageIcon(pkg.role)}
                    </div>
                    <div>
                      <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[var(--ds-text-muted)] mb-1 opacity-80">
                        SYS // {pkg.id.toUpperCase()}
                      </p>
                      <h3 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-[var(--ds-accent)] transition-colors duration-300">{pkg.title}</h3>
                    </div>
                  </div>
                  
                  {isRec && (
                    <div className="flex items-center gap-1.5 rounded-full bg-[var(--ds-accent)]/10 border border-[var(--ds-accent)]/30 px-3 py-1 backdrop-blur-sm">
                      <Star className="h-3 w-3 text-[var(--ds-accent)] fill-[var(--ds-accent)]" />
                      <span className="text-[9px] font-black text-[var(--ds-accent)] uppercase tracking-widest">
                        CHOICE
                      </span>
                    </div>
                  )}
                </div>

                {/* 6.7.2 Technical Metrics Row */}
                <div className="grid grid-cols-2 gap-3 border-y border-white/5 py-5">
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--ds-text-muted)] mb-1.5 opacity-80">
                      МАТЕРИАЛЫ
                    </span>
                    <span className="block text-[13px] font-bold text-white/90 leading-tight">
                      {pkg.bestFor.join(', ')}
                    </span>
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--ds-text-muted)] mb-1.5 opacity-80">
                      ФАСАД OPS
                    </span>
                    <span className="block text-[13px] font-bold text-[var(--ds-text-secondary)]">
                      {pkg.id === 'premium' ? 'Сложный / Высокий' : 'Типовой'}
                    </span>
                  </div>
                </div>

                {/* 6.7.3 Base Price */}
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--ds-text-muted)] mb-1.5 opacity-80">
                      БАЗА СМЕТЫ
                    </span>
                    <span className="text-2xl lg:text-[1.75rem] font-black text-white tracking-tighter font-mono tabular-nums whitespace-nowrap group-hover:text-shadow-sm transition-all duration-300">
                      {pkg.priceLabel}
                    </span>
                  </div>
                  
                  {isRec && (
                    <span className="rounded bg-[var(--ds-success)]/10 border border-[var(--ds-success)]/30 px-2.5 py-1 text-[9px] font-black text-[var(--ds-success)] uppercase tracking-widest font-mono">
                      COMPLIANT
                    </span>
                  )}
                </div>

                {/* 6.7.4 Visual Formula Block */}
                <div className="relative z-10">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--ds-text-muted)] mb-3 opacity-90">
                    ФОРМУЛА РАСЧЕТА
                  </span>
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md p-4 space-y-3 transition-colors duration-500 group-hover:bg-white/[0.04] group-hover:border-white/10">
                    {getFormulaParts(pkg.id).map((part, i) => (
                      <div key={i} className="flex justify-between items-baseline font-mono text-[11px]">
                        <span className="text-[var(--ds-text-muted)]/90">{part.label}</span>
                        <span className="flex-grow border-b border-dashed border-white/10 mx-3 opacity-50" />
                        <span className="text-[var(--ds-accent)] font-bold tracking-tight">{part.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6.7.5 Subservices (Dotted List) */}
                <div className="flex-grow space-y-4 pt-6 md:pt-8 pb-6 md:pb-8">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--ds-text-muted)] mb-3 opacity-90 px-0">
                    ВКЛЮЧЕННЫЕ РАБОТЫ
                  </span>
                  <div className="space-y-3 px-4">
                    {getSubservices(pkg.id).map((item, i) => (
                      <div key={i} className="flex justify-between items-baseline font-mono text-[11px] text-[var(--ds-text-body)]">
                        <span>{item.name}</span>
                        <span className="flex-grow border-b border-dotted border-white/15 mx-3 opacity-60" />
                        <span className="text-white/90 font-bold">{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 pt-5 border-t border-white/5 space-y-3 px-4">
                    {pkg.includes.map((item, i) => (
                      <div key={i} className="flex gap-3 text-[13px] text-[var(--ds-text-body)]/90 items-start">
                        <Check className="w-4 h-4 text-[var(--ds-accent)] shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6.7.6 Footer CTA Pill Button */}
                <button
                  onClick={() =>
                    openModal({
                      context: `${modalContextLabel}: ${pkg.title}`,
                      source: `${modalSourcePrefix}_${pkg.id}`,
                    })
                  }
                  className={`w-full mt-0 py-4.5 rounded-full font-black uppercase tracking-[0.15em] transition-all duration-500 text-[11px] ${
                    isRec
                      ? 'bg-[var(--ds-accent)] text-black shadow-[0_0_20px_rgba(0,255,163,0.2)] hover:shadow-[0_0_40px_rgba(0,255,163,0.4)] hover:bg-white hover:-translate-y-1'
                      : 'bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black hover:-translate-y-1 hover:shadow-xl'
                  }`}
                >
                  {pkg.cta}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
