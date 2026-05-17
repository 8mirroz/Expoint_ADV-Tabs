'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateNeonPrice, NeonInputs } from '@/lib/calculators/neonCalculator';
import { DetailedNeonResult } from '@/lib/calculators/pricingTypes';

export function NeonCalculatorV10() {
  const [inputs, setInputs] = useState<NeonInputs>({
    text: 'EXPOINT',
    size: 'M',
    fontType: 'Print',
    isRGB: false,
    backing: 'acrylic',
    urgency: 'standard',
  });

  const result = useMemo(() => calculateNeonPrice(inputs), [inputs]);

  return (
    <div className="w-full max-w-5xl mx-auto bg-surface/50 border border-outline/30 rounded-[2.5rem] p-6 md:p-12 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
      {/* Dynamic Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10 transition-colors duration-1000 blur-[100px]"
        style={{ backgroundColor: inputs.isRGB ? '#ff00ff' : '#00ffcc' }}
      />
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Configuration */}
        <div className="lg:col-span-7 space-y-10">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Конструктор неона</h3>
            
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
                          inputs.size === s ? 'bg-accent text-background' : 'hover:bg-on-surface/5'
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
                          inputs.fontType === f ? 'bg-accent text-background' : 'hover:bg-on-surface/5'
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
                    inputs.isRGB ? 'border-accent bg-accent/5' : 'border-outline/20 bg-background/30'
                  }`}
                >
                  <span className="text-sm font-bold">RGB Динамика</span>
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors ${inputs.isRGB ? 'bg-accent' : 'bg-on-surface/20'}`}>
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
          <div className="flex-grow bg-background/80 border border-outline/30 rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative">
            {/* Preview Area */}
            <div className="flex-grow flex items-center justify-center min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${inputs.text}-${inputs.fontType}-${inputs.isRGB}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`text-4xl md:text-6xl text-center break-all ${
                    inputs.fontType === 'Print' ? 'font-black' : inputs.fontType === 'Serif' ? 'font-serif' : 'italic font-serif'
                  }`}
                  style={{
                    color: inputs.isRGB ? '#fff' : '#00ffcc',
                    textShadow: inputs.isRGB 
                      ? '0 0 10px #ff00ff, 0 0 20px #00ffff, 0 0 40px #ff00ff'
                      : '0 0 10px rgba(0, 255, 204, 0.8), 0 0 20px rgba(0, 255, 204, 0.4)',
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
                  <span className="text-xs font-black uppercase tracking-widest text-on-surface/50">Примерная стоимость</span>
                  <div className="text-5xl font-black text-accent leading-none">
                    {result.estimatedPriceMin.toLocaleString('ru-RU')} ₽
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40 mb-1">Рекомендованный пакет</div>
                  <div className="px-3 py-1 bg-accent text-background text-[10px] font-black uppercase tracking-widest rounded-full">
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

          <button className="w-full mt-6 py-5 bg-on-surface text-surface font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-accent hover:text-on-surface transition-all active:scale-95 shadow-xl">
            Заказать расчет
          </button>
          
          <p className="mt-4 text-[10px] text-center text-on-surface-variant font-medium">
            *Ориентировочная стоимость. Точный расчет после проверки макета.
          </p>
        </div>
      </div>
    </div>
  );
}
