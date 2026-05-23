'use client';

import React from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Clock3, Settings2 } from 'lucide-react';
import { useModalStore } from '@/store/useModalStore';

interface PremiumIndividualCTAProps {
  title: string;
  description: string;
  buttonText: string;
  modalContext?: string;
  modalSource?: string;
}

const orderOptions = [
  {
    title: 'Быстрый расчет за 24 часа',
    description: 'Фото фасада или логотип, 2-3 размера, целевой бюджет. Даем понятный ориентир без скрытых доплат.',
    icon: Clock3,
  },
  {
    title: 'Проект под брендбук и регламенты',
    description: 'Подбираем материалы, тип подсветки и крепление с учетом архитектуры здания и требований УК/902-ПП.',
    icon: ShieldCheck,
  },
  {
    title: 'Комплектация под формат точки',
    description: 'От базового старта до премиального контура: фасад, витрина, интерьерные акценты, монтаж и сервис.',
    icon: Settings2,
  },
];

const seoBlocks = [
  'объемные буквы на фасад',
  'вывеска по брендбуку',
  'контражур и лицевая подсветка',
  'монтаж в Москве и МО',
];

export default function PremiumIndividualCTA({
  title,
  description,
  buttonText,
  modalContext = 'Индивидуальный заказ',
  modalSource = 'service_individual_cta',
}: PremiumIndividualCTAProps) {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <section id="individual-order" className="scroll-mt-28 py-24 border-t border-[var(--ds-border-default)] bg-[var(--ds-bg-section-alt)] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[380px] h-[380px] bg-[var(--ds-accent-softer)]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--ds-accent-soft)] text-[var(--ds-accent)] rounded-full text-[10px] font-black uppercase tracking-widest border border-[var(--ds-accent-border)] font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SLA // INDIVIDUAL ORDER ENGINE</span>
            </div>

            <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tighter text-white leading-none">
              {title}
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-[var(--ds-text-body)]">
              {description}
            </p>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-[var(--ds-accent-soft)] border border-[var(--ds-accent-border)] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[var(--ds-accent)]" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase text-white tracking-tight">Смета в трех ценовых сценариях</h4>
                  <p className="text-xs text-[var(--ds-text-body)] mt-1">
                    Покажем разницу между базовой ценой и премиум-материалами с детализацией работ.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-[var(--ds-accent-soft)] border border-[var(--ds-accent-border)] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[var(--ds-accent)]" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase text-white tracking-tight">AI-макет привязки на ваш фасад</h4>
                  <p className="text-xs text-[var(--ds-text-body)] mt-1">
                    Увидите точные пропорции, вылет и визуальный эффект конструкции до оплаты.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-[var(--ds-accent-soft)] border border-[var(--ds-accent-border)] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[var(--ds-accent)]" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase text-white tracking-tight">Инженерный аудит городских рисков</h4>
                  <p className="text-xs text-[var(--ds-text-body)] mt-1">
                    Сразу укажем, если выбранный формат вывески несет риск штрафа или демонтажа.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-[var(--ds-bg-card-inner)] border border-[var(--ds-border-card)] rounded-2xl p-6 sm:p-8 shadow-[var(--ds-shadow-panel)] space-y-6">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight text-white mb-1">Опции заказа и конфигурации</h3>
                <p className="text-xs text-[var(--ds-text-ghost)] font-mono uppercase tracking-widest">SYS // SEO + ORDER OPTIONS PANEL</p>
              </div>

              <div className="space-y-4">
                {orderOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <div key={option.title} className="rounded-xl border border-[var(--ds-border-card)] bg-[var(--ds-bg-page)]/60 p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--ds-accent-soft)] border border-[var(--ds-accent-border)] flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-[var(--ds-accent)]" />
                        </div>
                        <div>
                          <h4 className="text-sm font-black uppercase tracking-tight text-white">{option.title}</h4>
                          <p className="text-xs text-[var(--ds-text-body)] mt-1 leading-relaxed">{option.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-xl border border-dashed border-[var(--ds-accent-border)] bg-[var(--ds-accent-soft)]/20 p-4">
                <p className="font-mono text-[9px] uppercase tracking-widest text-[var(--ds-text-ghost)] mb-2">SEO INTENT CLUSTER</p>
                <div className="flex flex-wrap gap-2">
                  {seoBlocks.map((item) => (
                    <span key={item} className="text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full border border-[var(--ds-border-card)] text-[var(--ds-text-body)] bg-[var(--ds-bg-page)]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => openModal({ context: modalContext, source: modalSource })}
                className="w-full py-4 bg-[var(--ds-accent)] text-black rounded-full font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 border border-[var(--ds-accent)] shadow-[var(--ds-glow-accent)] hover:shadow-[var(--ds-glow-accent-lg)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
              >
                <span>{buttonText.toUpperCase()}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
