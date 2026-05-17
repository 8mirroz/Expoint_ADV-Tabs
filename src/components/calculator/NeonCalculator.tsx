'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { calculateNeonPrice, NeonPricingParams } from '@/data/neon-pricing';
import { useLanguage } from '@/components/i18n/LanguageProvider';

export function NeonCalculator() {
  const { locale } = useLanguage();
  
  const [params, setParams] = useState<NeonPricingParams>({
    text: 'NEON',
    size: 'M',
    fontType: 'Print',
    isRGB: false,
  });

  const result = useMemo(() => calculateNeonPrice(params), [params]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-surface border border-outline/30 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Glow Effect */}
      <div className={`absolute inset-0 pointer-events-none opacity-20 transition-colors duration-500 blur-3xl ${params.isRGB ? 'bg-gradient-to-r from-red-500 via-green-500 to-blue-500' : 'bg-accent'}`} />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column: Inputs */}
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-6">
              {locale === 'ru' ? 'Собери свой неон' : 'Design Your Neon'}
            </h3>
            
            <div className="space-y-6">
              {/* Text Input */}
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-2 uppercase tracking-wider">
                  {locale === 'ru' ? 'Ваш текст' : 'Your Text'}
                </label>
                <input
                  type="text"
                  value={params.text}
                  onChange={(e) => setParams({ ...params, text: e.target.value })}
                  className="w-full bg-background border border-outline/50 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-accent transition-colors"
                  placeholder={locale === 'ru' ? 'Введите надпись' : 'Enter text'}
                />
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-2 uppercase tracking-wider">
                  {locale === 'ru' ? 'Размер (Высота букв)' : 'Size (Letter Height)'}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['S', 'M', 'L'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setParams({ ...params, size: s })}
                      className={`py-2 rounded-lg border text-sm font-medium transition-all ${
                        params.size === s
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-outline/50 hover:border-outline text-on-surface-variant'
                      }`}
                    >
                      {s} ({s === 'S' ? '~15cm' : s === 'M' ? '~25cm' : '~40cm'})
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Selection */}
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-2 uppercase tracking-wider">
                  {locale === 'ru' ? 'Шрифт' : 'Font Type'}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Print', 'Serif', 'Script'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setParams({ ...params, fontType: f })}
                      className={`py-2 rounded-lg border text-sm transition-all ${
                        params.fontType === f
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-outline/50 hover:border-outline text-on-surface-variant'
                      } ${f === 'Print' ? 'font-sans' : f === 'Serif' ? 'font-serif' : 'italic font-serif'}`}
                    >
                      {f === 'Print' ? 'Печатный' : f === 'Serif' ? 'С засечками' : 'Рукописный'}
                    </button>
                  ))}
                </div>
              </div>

              {/* RGB Toggle */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={params.isRGB}
                    onChange={(e) => setParams({ ...params, isRGB: e.target.checked })}
                    className="w-5 h-5 accent-accent bg-background border-outline rounded"
                  />
                  <span className="text-sm font-medium text-on-surface">
                    {locale === 'ru' ? 'RGB Динамика (Смена цветов)' : 'RGB Dynamic Colors'}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Preview & Pricing */}
        <div className="flex flex-col justify-between bg-background/50 rounded-xl p-6 border border-outline/30">
          <div>
            <div className="mb-8 min-h-[120px] flex items-center justify-center overflow-hidden">
              {/* Visual Preview text */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`${params.text}-${params.fontType}-${params.isRGB}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`text-4xl md:text-6xl text-center break-all ${
                    params.fontType === 'Print' ? 'font-sans font-black' : params.fontType === 'Serif' ? 'font-serif' : 'italic font-serif'
                  }`}
                  style={{
                    color: params.isRGB ? '#fff' : '#00ffcc',
                    textShadow: params.isRGB 
                      ? '0 0 10px #ff00ff, 0 0 20px #00ffff, 0 0 40px #ff00ff'
                      : '0 0 10px rgba(0, 255, 204, 0.5), 0 0 20px rgba(0, 255, 204, 0.3)',
                  }}
                >
                  {params.text || 'NEON'}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex justify-between text-sm text-on-surface-variant">
                <span>{locale === 'ru' ? 'Базовый комплект' : 'Base Kit'}</span>
                <span>{result.baseKitCost.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between text-sm text-on-surface-variant">
                <span>{locale === 'ru' ? 'Длина неона' : 'Neon Length'} (~{result.neonLength} см)</span>
                <span>{result.neonCost.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between text-sm text-on-surface-variant">
                <span>{locale === 'ru' ? 'Сборка и пайка' : 'Assembly'}</span>
                <span>{result.assemblyCost.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="w-full h-px bg-outline/30 my-2" />
              <div className="flex justify-between items-end">
                <span className="text-lg font-medium">{locale === 'ru' ? 'Итоговая стоимость' : 'Total Cost'}</span>
                <motion.span 
                  key={result.totalEstimatedCost}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-black text-accent"
                >
                  {result.totalEstimatedCost.toLocaleString('ru-RU')} ₽
                </motion.span>
              </div>
            </div>
          </div>

          <button className="w-full py-4 bg-on-surface text-surface font-bold uppercase tracking-widest rounded-lg hover:bg-accent hover:text-on-surface transition-colors">
            {locale === 'ru' ? 'Отправить в WhatsApp' : 'Send to WhatsApp'}
          </button>
        </div>
      </div>
    </div>
  );
}
