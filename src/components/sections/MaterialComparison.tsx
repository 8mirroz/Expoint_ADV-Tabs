'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Shield, Star, Zap, Activity, Info, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MeshBackground } from '@/components/ui/MeshBackground';

interface MaterialTier {
  id: string;
  name: string;
  label: string;
  price: string;
  description: string;
  specs: {
    label: string;
    value: string;
    included: boolean;
  }[];
}

const TIERS: MaterialTier[] = [
  {
    id: 'standard',
    name: 'Standard',
    label: 'Бюджетное решение',
    price: 'от 25 000 ₽',
    description: 'Оптимально для временных вывесок или интерьерного использования с ограниченным бюджетом.',
    specs: [
      { label: 'Материал: ПВХ 3мм', value: 'Да', included: true },
      { label: 'Диоды: Стандарт (Китай)', value: 'Да', included: true },
      { label: 'Гарантия: 1 год', value: 'Да', included: true },
      { label: 'УФ-защита', value: 'Нет', included: false },
      { label: 'Яркость: 6000K', value: 'Нет', included: false },
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    label: 'Выбор экспертов',
    price: 'от 65 000 ₽',
    description: 'Максимальная долговечность и премиальный внешний вид для статусных объектов.',
    specs: [
      { label: 'Материал: Акрил Altuglas', value: 'Да', included: true },
      { label: 'Диоды: Samsung / Elf', value: 'Да', included: true },
      { label: 'Гарантия: 3-5 лет', value: 'Да', included: true },
      { label: 'УФ-защита (не желтеет)', value: 'Да', included: true },
      { label: 'Яркость: Регулируемая', value: 'Да', included: true },
    ]
  }
];

export function MaterialComparison() {
  const [activeTier, setActiveTier] = useState<string>('premium');

  return (
    <div className="w-full bg-surface border border-outline relative overflow-hidden group/lab shadow-elevation-1 rounded-xl">
      {/* Vercel Mesh Gradient Backdrop */}
      <MeshBackground opacity={0.15} />
      <div className="absolute inset-0 bg-surface/40 pointer-events-none" />

      {/* Top Protocol Bar */}
      <div className="flex border-b border-outline bg-surface/50 backdrop-blur-xl relative z-30">
        {TIERS.map((tier) => (
          <button
            key={tier.id}
            onClick={() => setActiveTier(tier.id)}
            className={cn(
              "flex-1 py-8 px-8 text-center transition-all relative group overflow-hidden",
              activeTier === tier.id ? "text-on-surface" : "text-on-surface-variant/40 hover:text-on-surface-variant"
            )}
          >
            <div className="flex flex-col items-center gap-3 relative z-10">
              <span className={cn(
                "verge-mono-label transition-all",
                activeTier === tier.id ? "text-primary scale-105" : "text-on-surface-variant/20"
              )}>
                {tier.name}
              </span>
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-1 h-1 rounded-full",
                  activeTier === tier.id ? "bg-primary shadow-[0_0_8px_var(--primary)]" : "bg-outline"
                )} />
              </div>
            </div>
            
            {activeTier === tier.id && (
              <>
                <motion.div 
                  layoutId="tier-glow"
                  className="absolute inset-0 bg-primary/5"
                />
                <motion.div 
                  layoutId="tier-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" 
                />
              </>
            )}
          </button>
        ))}
      </div>

      {/* Lab Analysis Area */}
      <div className="p-10 md:p-20 relative z-10">
        <AnimatePresence mode="wait">
          {TIERS.map((tier) => tier.id === activeTier && (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid lg:grid-cols-2 gap-24"
            >
              <div className="space-y-12">
                <div className="space-y-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 px-4 py-2 bg-surface border border-outline rounded-full text-primary verge-mono-label"
                  >
                    {tier.id === 'premium' ? <Star className="w-3.5 h-3.5 text-primary fill-primary/10" /> : <Shield className="w-3.5 h-3.5" />}
                    <span>{tier.label}</span>
                  </motion.div>
                  
                  <div className="space-y-2">
                    <div className="verge-mono-label text-on-surface-variant/60 mb-2">Estimated Value</div>
                    <h3 className="geist-display-lg text-on-surface">
                      {tier.price}
                    </h3>
                  </div>
                </div>
                
                <p className="text-on-surface-variant leading-[28px] text-[18px] font-sans border-l border-outline pl-10 max-w-xl">
                  {tier.description}
                </p>

                <div className="grid grid-cols-2 gap-4 max-w-md">
                   <div className="p-6 bg-surface border border-outline group hover:border-primary/30 transition-colors rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="verge-mono-label text-on-surface-variant/40">Intensity</span>
                      </div>
                      <span className="text-xl font-semibold text-on-surface font-mono tracking-tight">1200 <span className="text-[10px] opacity-40">cd/m²</span></span>
                   </div>
                   <div className="p-6 bg-surface border border-outline group hover:border-primary/30 transition-colors rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Activity className="w-4 h-4 text-primary" />
                        <span className="verge-mono-label text-on-surface-variant/40">Efficiency</span>
                      </div>
                      <span className="text-xl font-semibold text-on-surface font-mono tracking-tight">A++ <span className="text-[10px] opacity-40">Class</span></span>
                   </div>
                </div>

                <button className="geist-button-primary gap-3 group">
                  <span>Configure Selection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Engineering Specs List */}
              <div className="space-y-4 self-center">
                <div className="flex items-center justify-between mb-8 border-b border-outline pb-4">
                   <div className="flex items-center gap-3">
                     <Info className="w-4 h-4 text-primary" />
                     <span className="verge-mono-label text-on-surface-variant/40">Technical Audit</span>
                   </div>
                </div>
                
                {tier.specs.map((spec, idx) => (
                    <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={cn(
                      "flex items-center justify-between p-4 border transition-all duration-500 relative group/spec rounded-lg",
                      spec.included 
                        ? "bg-surface border-outline hover:border-primary/40" 
                        : "bg-transparent border-transparent opacity-20 grayscale cursor-not-allowed"
                    )}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/0 group-hover/spec:bg-primary transition-all" />
                    <span className="text-[11px] font-mono uppercase tracking-widest text-on-surface-variant group-hover/spec:text-on-surface transition-colors">{spec.label}</span>
                    <div className="flex items-center gap-6">
                       <span className="text-[10px] font-mono font-bold text-primary/60">{spec.value}</span>
                       {spec.included ? (
                         <div className="w-6 h-6 rounded-full border border-primary/20 flex items-center justify-center bg-primary/5">
                           <Check className="w-3 h-3 text-primary" />
                         </div>
                       ) : (
                         <div className="w-6 h-6 rounded-full border border-outline flex items-center justify-center">
                           <X className="w-3 h-3 text-on-surface-variant/20" />
                         </div>
                       )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}

export default MaterialComparison;
