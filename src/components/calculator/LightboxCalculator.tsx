'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { calculateLightboxPrice, LightboxInputs, LightboxMultiResult } from '@/lib/calculators/lightboxCalculator';
import { DetailedLightboxResult } from '@/lib/calculators/pricingTypes';

export function LightboxCalculator() {
  const [inputs, setInputs] = useState<LightboxInputs>({
    width: 1000,
    height: 1000,
    type: 'standard',
    sides: 1,
    location: 'outdoor',
    urgency: 'standard',
  });

  const results = useMemo(() => calculateLightboxPrice(inputs), [inputs]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12">
      {/* Configuration Card */}
      <div className="bg-surface/50 border border-outline/30 rounded-[2.5rem] p-8 md:p-12 shadow-2xl backdrop-blur-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Inputs */}
          <div className="lg:col-span-8 space-y-8">
            <h3 className="text-2xl font-black uppercase tracking-tight">Параметры изделия</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Width */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-on-surface/50">Ширина (мм)</label>
                <input
                  type="number"
                  value={inputs.width}
                  onChange={(e) => setInputs({ ...inputs, width: parseInt(e.target.value) || 0 })}
                  className="w-full bg-background/50 border border-outline/30 rounded-2xl px-6 py-4 text-xl font-bold focus:outline-none focus:border-accent transition-all"
                />
              </div>

              {/* Height */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-on-surface/50">Высота (мм)</label>
                <input
                  type="number"
                  value={inputs.height}
                  onChange={(e) => setInputs({ ...inputs, height: parseInt(e.target.value) || 0 })}
                  className="w-full bg-background/50 border border-outline/30 rounded-2xl px-6 py-4 text-xl font-bold focus:outline-none focus:border-accent transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sides */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-on-surface/50">Стороны</label>
                <div className="flex bg-background/30 p-1 rounded-xl border border-outline/20">
                  {([1, 2] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setInputs({ ...inputs, sides: s })}
                      className={`flex-1 py-3 rounded-lg text-xs font-black uppercase transition-all ${
                        inputs.sides === s ? 'bg-accent text-background' : 'hover:bg-on-surface/5'
                      }`}
                    >
                      {s === 1 ? '1-стор' : '2-стор'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-on-surface/50">Размещение</label>
                <div className="flex bg-background/30 p-1 rounded-xl border border-outline/20">
                  {(['indoor', 'outdoor'] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setInputs({ ...inputs, location: l })}
                      className={`flex-1 py-3 rounded-lg text-xs font-black uppercase transition-all ${
                        inputs.location === l ? 'bg-accent text-background' : 'hover:bg-on-surface/5'
                      }`}
                    >
                      {l === 'indoor' ? 'Интерьер' : 'Улица'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Urgency */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-on-surface/50">Срочность</label>
                <div className="flex bg-background/30 p-1 rounded-xl border border-outline/20">
                  {(['standard', 'fast'] as const).map((u) => (
                    <button
                      key={u}
                      onClick={() => setInputs({ ...inputs, urgency: u })}
                      className={`flex-1 py-3 rounded-lg text-xs font-black uppercase transition-all ${
                        inputs.urgency === u ? 'bg-orange-500 text-white' : 'hover:bg-on-surface/5'
                      }`}
                    >
                      {u === 'standard' ? 'Обычный' : 'Срочно'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Visualization / Info */}
          <div className="lg:col-span-4 flex flex-col justify-center bg-background/80 border border-outline/30 rounded-3xl p-8">
            <div className="text-center">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/40 mb-2">Площадь изделия</div>
              <div className="text-5xl font-black text-accent">{(results.start.area).toFixed(2)} м²</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decoy Pricing Packages Output */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {(['start', 'business', 'premium'] as const).map((id) => {
          const res = results[id];
          const isRecommended = id === 'business';
          
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className={`p-8 rounded-[2.5rem] border transition-all duration-500 ${
                isRecommended 
                  ? 'bg-on-surface text-surface border-accent shadow-[0_0_60px_rgba(0,255,204,0.15)] scale-105 z-10' 
                  : 'bg-surface/50 border-outline/30'
              }`}
            >
              <div className="mb-6 flex justify-between items-start">
                <h4 className="text-xl font-black uppercase tracking-tight">
                  {id === 'start' ? 'Эконом' : id === 'business' ? 'Оптимальный' : 'Премиум'}
                </h4>
                {isRecommended && (
                  <span className="px-2 py-0.5 bg-accent text-background text-[8px] font-black uppercase tracking-widest rounded-full">
                    Рекомендуем
                  </span>
                )}
              </div>

              <div className="mb-8">
                <div className={`text-4xl font-black ${isRecommended ? 'text-accent' : 'text-on-surface'}`}>
                  {res.estimatedPriceMin.toLocaleString('ru-RU')} ₽
                </div>
                <div className={`text-[10px] font-bold uppercase tracking-widest ${isRecommended ? 'text-surface/50' : 'text-on-surface-variant'}`}>
                  Ориентировочная цена
                </div>
              </div>

              <ul className="space-y-3 mb-10">
                {res.assumptions.map((a, i) => (
                  <li key={i} className={`text-xs flex gap-2 ${isRecommended ? 'text-surface/70' : 'text-on-surface-variant'}`}>
                    <div className="w-1 h-1 bg-accent rounded-full mt-1.5" />
                    {a}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-full font-black uppercase tracking-widest text-xs transition-all ${
                isRecommended ? 'bg-accent text-background hover:scale-[1.02]' : 'bg-on-surface text-surface hover:bg-accent hover:text-on-surface'
              }`}>
                Выбрать расчет
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
