'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { calculateNeonPrice, NeonInputs } from '@/lib/calculators/neonCalculator';
import { SCNEventBus } from '@/lib/analytics/scn-events';
import { useModalStore } from '@/store/useModalStore';

export function NeonCalculatorV10() {
  const openModal = useModalStore((state) => state.openModal);
  const [inputs, setInputs] = useState<NeonInputs>({
    text: 'БУКВА',
    size: 'M',
    fontType: 'Print',
    isRGB: false,
    backing: 'acrylic',
    urgency: 'standard',
  });

  const result = useMemo(() => calculateNeonPrice(inputs), [inputs]);

  const previewStyles = useMemo(() => {
    if (inputs.isRGB) {
      return {
        color: '#ffffff',
        textShadow: '0 0 10px var(--color-neon-rgb-primary, #FF4D00), 0 0 20px var(--color-neon-rgb-secondary, #0070F3), 0 0 40px var(--color-neon-rgb-primary, #FF4D00)',
        filter: 'drop-shadow(0 0 12px rgba(255,77,0,0.9)) drop-shadow(0 0 26px rgba(0,112,243,0.55))',
        stroke: 'var(--color-neon-rgb-primary, #FF4D00)',
      };
    }
    return {
      color: 'var(--color-neon-warm, var(--accent-warm))',
      textShadow: '0 0 10px rgba(var(--neon-warm-rgb), 0.8), 0 0 20px rgba(var(--neon-warm-rgb), 0.4)',
      filter: 'drop-shadow(0 0 14px rgba(var(--neon-warm-rgb), 0.75))',
      stroke: 'var(--color-neon-warm, var(--accent-warm))',
    };
  }, [inputs.isRGB]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      SCNEventBus.track('scn_price_calculated', {
        productType: 'neon',
        pageSlug: '/services/neon',
        priceTotal: result.estimatedPriceMin,
        length: result.neonLength,
      });
    }, 1000); // Debounce analytics
    return () => clearTimeout(timeout);
  }, [result.estimatedPriceMin, result.neonLength]);

  return (
    <div className="w-full max-w-5xl mx-auto bg-surface border border-outline rounded-[var(--radius-16)] p-6 md:p-10 shadow-sm relative overflow-hidden">
      {/* Dynamic Glow */}
      <div 
        className={`absolute inset-0 pointer-events-none opacity-15 transition-colors duration-300 blur-[100px] ${
          inputs.isRGB ? 'bg-neon-rgb-primary' : 'bg-neon-warm'
        }`}
      />
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Configuration */}
        <div className="lg:col-span-7 space-y-10">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-3">Live maker</h3>
            <p className="mb-8 text-sm text-on-surface-variant">
              Это предварительный расчет. Точная цена фиксируется после проверки макета, длины контура и монтажного доступа.
            </p>
            
            <div className="space-y-8">
              {/* Text Input */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-on-surface/50">Текст вывески</label>
                <input
                  type="text"
                  value={inputs.text}
                  onChange={(e) => setInputs({ ...inputs, text: e.target.value.toUpperCase() })}
                  className="w-full bg-background/50 border border-outline/30 rounded-2xl px-6 py-4 text-xl font-bold focus:outline-none focus:border-accent transition-all"
                  placeholder="ВВЕДИТЕ ТЕКСТ"
                />
              </div>

              {/* Grid Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Size */}
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-on-surface/50">Размер букв</label>
                  <div className="flex bg-background/30 p-1 rounded-xl border border-outline/20">
                    {(['S', 'M', 'L'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setInputs({ ...inputs, size: s })}
                        className={`flex-1 py-3 rounded-lg text-xs font-black uppercase tracking-tighter transition-all ${
                          inputs.size === s ? 'bg-accent-warm text-white' : 'hover:bg-on-surface/5'
                        }`}
                      >
                        {s === 'S' ? '15см' : s === 'M' ? '25см' : '40см'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font */}
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-on-surface/50">Тип шрифта</label>
                  <div className="flex bg-background/30 p-1 rounded-xl border border-outline/20">
                    {(['Print', 'Serif', 'Script'] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setInputs({ ...inputs, fontType: f })}
                        className={`flex-1 py-3 rounded-lg text-xs font-black uppercase tracking-tighter transition-all ${
                          inputs.fontType === f ? 'bg-accent-warm text-white' : 'hover:bg-on-surface/5'
                        }`}
                      >
                        {f === 'Print' ? 'Прямой' : f === 'Serif' ? 'Засечки' : 'Курсив'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setInputs({ ...inputs, isRGB: !inputs.isRGB })}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    inputs.isRGB ? 'border-accent-warm bg-accent-warm/5' : 'border-outline/20 bg-background/30'
                  }`}
                >
                  <span className="text-sm font-bold">RGB Динамика</span>
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors ${inputs.isRGB ? 'bg-accent-warm' : 'bg-on-surface/20'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${inputs.isRGB ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </button>

                <button
                  onClick={() => setInputs({ ...inputs, urgency: inputs.urgency === 'fast' ? 'standard' : 'fast' })}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    inputs.urgency === 'fast' ? 'border-orange-500 bg-orange-500/5' : 'border-outline/20 bg-background/30'
                  }`}
                >
                  <span className="text-sm font-bold">Срочно (24ч)</span>
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors ${inputs.urgency === 'fast' ? 'bg-orange-500' : 'bg-on-surface/20'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${inputs.urgency === 'fast' ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Preview & Result */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="flex-grow bg-background/80 border border-outline rounded-[var(--radius-12)] p-8 flex flex-col justify-between overflow-hidden relative">
            {/* Preview Area */}
            <div className="flex-grow flex items-center justify-center min-h-[220px] relative">
              <svg className="absolute inset-x-6 top-8 h-32 opacity-70" viewBox="0 0 420 140" role="img" aria-label="Динамический световой контур">
                <motion.path
                  d="M20 92 C92 8 146 134 208 58 S332 12 400 92"
                  fill="none"
                  stroke={previewStyles.stroke}
                  strokeWidth="7"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.2 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    filter: previewStyles.filter,
                  }}
                />
              </svg>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${inputs.text}-${inputs.fontType}-${inputs.isRGB}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`text-4xl md:text-6xl text-center break-all ${
                    inputs.fontType === 'Print' ? 'font-black' : inputs.fontType === 'Serif' ? 'font-serif' : 'italic font-serif'
                  }`}
                  style={{
                    color: previewStyles.color,
                    textShadow: previewStyles.textShadow,
                  }}
                >
                  {inputs.text || 'NEON'}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pricing Breakdown */}
            <div className="mt-8 space-y-4 pt-8 border-t border-outline/20">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <span className="text-xs font-black uppercase tracking-widest text-on-surface/50">Ориентир стоимости</span>
                  <div className="text-4xl md:text-5xl font-black text-accent-warm leading-none">
                    от {result.estimatedPriceMin.toLocaleString('ru-RU')} ₽
                  </div>
                  <div className="mt-2 text-xs font-bold text-on-surface-variant">
                    вилка до {result.estimatedPriceMax.toLocaleString('ru-RU')} ₽ после проверки макета
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-1">Рекомендованный пакет</div>
                  <div className="px-3 py-1 bg-accent-warm text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                    {result.recommendedPackage}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-[10px] text-on-surface-variant uppercase font-bold">
                  Длина: <span className="text-on-surface">{result.neonLength} см</span>
                </div>
                <div className="text-[10px] text-on-surface-variant uppercase font-bold">
                  Срок: <span className="text-on-surface">{inputs.urgency === 'fast' ? '1 день' : '3-5 дней'}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => openModal({ context: `Конструктор гибкого неона: ${inputs.text}, ${result.estimatedPriceMin.toLocaleString('ru-RU')} ₽`, source: 'service_neon_calculator' })}
            className="geist-button-primary w-full mt-6 h-[56px]"
          >
            Получить точный расчет
          </button>
          
          <p className="mt-4 text-[10px] text-center text-on-surface-variant font-medium">
            *Ориентировочная стоимость. Точный расчет после проверки макета.
          </p>
        </div>
      </div>
    </div>
  );
}
