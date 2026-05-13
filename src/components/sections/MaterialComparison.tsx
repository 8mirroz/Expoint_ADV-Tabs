'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Shield, Star, Zap, Activity, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <div className="w-full bg-black border border-white/10 relative overflow-hidden group/lab shadow-3xl">
      {/* Engineering Background Layer */}
      <div className="absolute inset-0 industrial-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-b from-accent/5 via-transparent to-black pointer-events-none" />
      
      {/* Technical Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5 z-20">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(255,255,255,0.1)_2px,transparent_3px)] animate-scan" />
      </div>

      {/* Top Protocol Bar */}
      <div className="flex border-b border-white/10 bg-white/5 backdrop-blur-2xl relative z-30">
        {TIERS.map((tier) => (
          <button
            key={tier.id}
            onClick={() => setActiveTier(tier.id)}
            className={cn(
              "flex-1 py-10 px-8 text-center transition-all relative group overflow-hidden",
              activeTier === tier.id ? "text-white" : "text-white/30 hover:text-white/60"
            )}
          >
            <div className="flex flex-col items-center gap-3 relative z-10">
              <span className={cn(
                "text-[9px] uppercase tracking-[0.6em] font-black transition-all",
                activeTier === tier.id ? "text-accent scale-110" : "text-white/20"
              )}>
                {tier.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono opacity-40">0{tier.id === 'premium' ? '1' : '02'}</span>
                <div className={cn(
                  "w-1 h-1 rounded-full",
                  activeTier === tier.id ? "bg-accent shadow-[0_0_8px_var(--accent)]" : "bg-white/10"
                )} />
              </div>
            </div>
            
            {activeTier === tier.id && (
              <>
                <motion.div 
                  layoutId="tier-glow"
                  className="absolute inset-0 bg-accent/5"
                />
                <motion.div 
                  layoutId="tier-indicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-accent" 
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
                    className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-accent text-[9px] font-black uppercase tracking-[0.4em]"
                  >
                    {tier.id === 'premium' ? <Star className="w-4 h-4 text-accent fill-accent/20" /> : <Shield className="w-4 h-4" />}
                    <span>{tier.label}</span>
                  </motion.div>
                  
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono text-accent/60 uppercase tracking-widest mb-2">Estimated Value</div>
                    <h3 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none text-white">
                      {tier.price}
                    </h3>
                  </div>
                </div>
                
                <p className="text-white/60 leading-relaxed text-xl font-light border-l border-accent/40 pl-10 max-w-xl">
                  {tier.description}
                </p>

                <div className="grid grid-cols-2 gap-6 max-w-md">
                   <div className="p-6 bg-white/5 border border-white/5 group hover:border-accent/30 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <Zap className="w-4 h-4 text-accent" />
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/40">Intensity</span>
                      </div>
                      <span className="text-xl font-black text-white font-mono tracking-tight">1200 <span className="text-[10px] opacity-40">cd/m²</span></span>
                   </div>
                   <div className="p-6 bg-white/5 border border-white/5 group hover:border-accent/30 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <Activity className="w-4 h-4 text-accent" />
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/40">Efficiency</span>
                      </div>
                      <span className="text-xl font-black text-white font-mono tracking-tight">A++ <span className="text-[10px] opacity-40">Class</span></span>
                   </div>
                </div>

                <button className="group relative px-12 py-8 bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] overflow-hidden transition-all hover:bg-accent hover:text-white">
                  <div className="absolute inset-0 bg-black/10 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  <span className="relative z-10">Configure Selection</span>
                </button>
              </div>

              {/* Engineering Specs List */}
              <div className="space-y-6 self-center">
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                   <div className="flex items-center gap-3">
                     <Info className="w-4 h-4 text-accent" />
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Technical Audit</span>
                   </div>
                   <span className="text-[9px] font-mono text-white/20">REL_CODE: v5.2</span>
                </div>
                
                {tier.specs.map((spec, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={cn(
                      "flex items-center justify-between p-6 border transition-all duration-500 relative group/spec",
                      spec.included 
                        ? "bg-white/5 border-white/5 hover:border-accent/40" 
                        : "bg-transparent border-transparent opacity-20 grayscale cursor-not-allowed"
                    )}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/0 group-hover/spec:bg-accent transition-all" />
                    <span className="text-[11px] font-mono uppercase tracking-widest text-white/60 group-hover/spec:text-white transition-colors">{spec.label}</span>
                    <div className="flex items-center gap-6">
                       <span className="text-[10px] font-mono font-bold text-accent/60">{spec.value}</span>
                       {spec.included ? (
                         <div className="w-6 h-6 rounded-full border border-accent/40 flex items-center justify-center bg-accent/10">
                           <Check className="w-3 h-3 text-accent" />
                         </div>
                       ) : (
                         <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center">
                           <X className="w-3 h-3 text-white/20" />
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

      {/* Metadata Laboratory Footer */}
      <div className="px-10 py-6 bg-white/5 border-t border-white/10 flex justify-between items-center font-mono text-[9px] uppercase tracking-[0.5em] text-white/20">
         <div className="flex items-center gap-4">
           <div className="w-2 h-2 bg-accent animate-pulse" />
           <span>Lab_Analysis_Module // active</span>
         </div>
         <div className="flex items-center gap-8">
           <span>Ref: EXP-V5-2026</span>
           <span className="hidden md:block">Integrity: 100% verified</span>
         </div>
      </div>
    </div>
  );
}
