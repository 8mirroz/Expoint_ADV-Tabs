'use client';

import React from 'react';
import { motion } from 'motion/react';
import { PricingPackage } from '@/lib/services/types';
import { Check, Star } from 'lucide-react';
import { useModalStore } from '@/store/useModalStore';

interface PricingPackagesProps {
  packages: PricingPackage[];
  eyebrow?: string;
  title?: string;
  description?: string;
  modalContextLabel?: string;
  modalSourcePrefix?: string;
}

export default function PricingPackages({
  packages,
  eyebrow = 'Пакеты под задачу',
  title = 'Не хотите считать контур вручную? Выберите пакет.',
  description = 'Пакеты нужны не для скрытия цены, а для понятного выбора сценария: быстрый кастом, рабочий B2B-вариант или комплексный запуск точки.',
  modalContextLabel = 'Пакет услуги',
  modalSourcePrefix = 'service_package',
}: PricingPackagesProps) {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <section id="packages" className="scroll-mt-28 section-padding border-t border-outline bg-surface">
      <div className="section-container px-6">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="space-y-5">
            <p className="verge-mono-label text-primary">{eyebrow}</p>
            <h2 className="geist-display-lg max-w-[16ch] text-balance text-on-surface">
              {title}
            </h2>
          </div>
          <p className="max-w-3xl text-lg leading-[1.7] text-on-surface-variant">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.06 }}
              viewport={{ once: true }}
              className={`relative flex flex-col p-7 rounded-[var(--radius-16)] border transition-all duration-300 shadow-sm hover:shadow-md ${
                pkg.role === 'recommended'
                  ? 'bg-surface border-primary/30 ring-1 ring-primary/10 z-10'
                  : 'bg-surface border-outline hover:border-primary/30'
              }`}
            >
              {pkg.role === 'recommended' && (
                <div className="absolute -top-3 left-6 flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5">
                  <Star className="h-3 w-3 text-on-primary" />
                  <span className="text-xs font-medium text-on-primary uppercase tracking-wider">
                  Рекомендовано
                  </span>
                </div>
              )}

              <div className="mb-8">
                <p className="verge-mono-label mb-4 text-primary">{pkg.id}</p>
                <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">{pkg.title}</h3>
                <div className="text-3xl font-black text-on-surface">{pkg.priceLabel}</div>
              </div>

              <div className="flex-grow space-y-4 mb-10">
                {pkg.includes.map((item, i) => (
                  <div key={i} className="flex gap-3 text-sm text-on-surface/90">
                    <Check className="w-5 h-5 text-primary/70 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mb-8 pt-6 border-t border-outline/30">
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-3">Подходит для:</p>
                <div className="flex flex-wrap gap-2">
                  {pkg.bestFor.map((item, i) => (
                    <span key={i} className="text-[10px] px-2 py-1 bg-on-surface/5 rounded uppercase font-bold text-on-surface/70">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() =>
                  openModal({
                    context: `${modalContextLabel}: ${pkg.title}`,
                    source: `${modalSourcePrefix}_${pkg.id}`,
                  })
                }
                className={`w-full py-4 rounded-full font-black uppercase tracking-widest transition-all ${
                  pkg.role === 'recommended'
                    ? 'geist-button-primary'
                    : 'geist-button-secondary'
                }`}
              >
                {pkg.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
