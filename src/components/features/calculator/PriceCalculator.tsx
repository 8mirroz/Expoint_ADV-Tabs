'use client';

import React from 'react';
import { useCalculatorStore } from '@/store/useCalculatorStore';
import { Input } from '@/components/ui/Input';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, ShieldCheck, ChevronDown } from 'lucide-react';

export function PriceCalculator() {
  const {
    text,
    heightCm,
    priceRange,
    setText,
    setHeight,
    complexity,
    setComplexity,
    urgency,
    setUrgency,
  } = useCalculatorStore();

  const [showFormula, setShowFormula] = React.useState(false);

  const charCount = text.replace(/\s/g, '').length;

  return (
    <div className="space-y-12 relative">
      {/* Decorative Blueprint Corner (Top Left) */}
      <div className="absolute -top-4 -left-4 w-12 h-12 border-l-2 border-t-2 border-accent/20 pointer-events-none" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Controls */}
        <div className="space-y-10">
          <div className="space-y-4">
            <h3 className="text-4xl font-black flex items-center gap-4 tracking-tighter uppercase leading-none">
              {charCount > 0 ? 'Параметры_01' : 'Параметры проекта'}
            </h3>
            <p className="text-on-surface-variant text-base font-light leading-relaxed max-w-md border-l-2 border-[#00ffa3] pl-6">
              Сконфигурируйте технические характеристики для получения мгновенной промышленной оценки стоимости.
            </p>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between items-end mb-1">
                <label className="text-xs font-black text-on-surface-variant uppercase tracking-widest">Текст вывески</label>
              </div>
              <div className="relative group">
                <Input 
                  value={text} 
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Например: БУКВА"
                  className="text-xl font-black py-8 px-6 bg-surface border-outline focus:border-accent group-hover:border-accent/40 rounded-none transition-all shadow-sm"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-mono text-accent bg-accent/5 border border-accent/20 px-3 py-1.5 rounded-none font-black">
                  {charCount} CHR
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-black text-on-surface-variant uppercase tracking-widest">Высота (см)</label>
                    <span className="text-xs font-mono text-accent font-black">{heightCm} CM</span>
                  </div>
                  <div className="flex items-center gap-4 px-2">
                    <input 
                      type="range"
                      min={10}
                      max={100}
                      value={heightCm}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="grow accent-accent h-1.5 bg-secondary rounded-full appearance-none cursor-pointer"
                    />
                  </div>
               </div>
               <div className="space-y-4">
                  <label className="text-xs font-black text-on-surface-variant uppercase tracking-widest">Сложность шрифта</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['standard', 'serif', 'script'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setComplexity(type as 'standard' | 'serif' | 'script')}
                        className={`py-3 text-xs font-black uppercase rounded-none border transition-all duration-300 ${
                          complexity === type 
                            ? 'bg-accent border-accent text-white shadow-xl shadow-accent/20' 
                            : 'bg-surface border-outline text-on-surface-variant hover:border-accent/40'
                        }`}
                      >
                        {type === 'standard' ? 'Sans' : type === 'serif' ? 'Serif' : 'Script'}
                      </button>
                    ))}
                  </div>
               </div>
            </div>

            <div className="p-8 rounded-none bg-surface border border-outline relative overflow-hidden group">
               <div className="absolute right-0 top-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                 <Clock size={80} />
               </div>
               <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-1">
                    <p className="text-sm font-black uppercase tracking-tight text-on-surface">Производственная очередь</p>
                  </div>
                  <div className="flex bg-secondary p-1 rounded-none w-full md:w-auto border border-outline">
                    <button 
                      onClick={() => setUrgency('standard')}
                      className={`flex-1 md:flex-none px-8 py-3 text-xs font-black uppercase tracking-widest rounded-none transition-all ${urgency === 'standard' ? 'bg-surface text-accent shadow-premium' : 'text-on-surface-variant'}`}
                    >
                      Стандарт
                    </button>
                    <button 
                      onClick={() => setUrgency('express')}
                      className={`flex-1 md:flex-none px-8 py-3 text-xs font-black uppercase tracking-widest rounded-none transition-all ${urgency === 'express' ? 'bg-surface text-accent shadow-premium' : 'text-on-surface-variant'}`}
                    >
                      Экспресс
                    </button>
                  </div>
               </div>
            </div>

          </div>
        </div>

        {/* Results Card - High Fidelity Blueprint */}
        <div className="flex flex-col justify-between p-12 rounded-none bg-black text-white relative overflow-hidden shadow-2xl group border border-white/5">
          {/* Industrial Design Elements */}
          <div className="absolute inset-0 industrial-grid opacity-10 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,color-mix(in_oklab,var(--accent-warm)_12%,transparent),transparent_70%)]" />
          
          {/* Scanning Line Decoration */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-transparent via-accent/5 to-transparent -translate-y-full animate-scan pointer-events-none opacity-20" />


          <div className="relative z-10">
            <div className="flex items-center justify-between mb-12">
                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              <button 
                onClick={() => setShowFormula(!showFormula)}
                className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 text-white/40 hover:text-accent transition-colors"
              >
                <div className={`transition-transform duration-500 ${showFormula ? 'rotate-180' : ''}`}>
                  <ChevronDown size={14} />
                </div>
                {showFormula ? 'Hide_Parameters' : 'View_Audit_Log'}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {showFormula ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 py-6"
                >
                  <div className="font-mono text-xs space-y-4 text-white/60">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="uppercase tracking-widest">Base_Coefficient (85.0)</span>
                      <span className="text-white font-black">STABLE</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="uppercase tracking-widest">Complexity_Factor</span>
                      <span className="text-accent font-black">{complexity === 'standard' ? '1.0' : complexity === 'serif' ? '1.2' : '1.5'}x</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="uppercase tracking-widest">Urgency_Markup</span>
                      <span className="text-white font-black">{urgency === 'standard' ? '0%' : '+25%'}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="uppercase tracking-widest">Structural_Safety_Buffer</span>
                      <span className="text-white/40 font-black">5% INCLUDED</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  className="space-y-6 py-6"
                >
                  <div className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.8] text-white">
                    {priceRange?.min.toLocaleString('ru-RU')} — {priceRange?.max.toLocaleString('ru-RU')} <span className="text-2xl font-light text-white/30 tracking-normal ml-2">₽</span>
                  </div>
                  <div className="flex gap-2 mt-8">
                    {[1,2,3,4,5,6,7,8].map(i => (
                      <div key={i} className="h-1 flex-1 bg-white/5 overflow-hidden">
                        <motion.div 
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                          className="w-full h-full bg-accent/40"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>


            <div className="mt-12 space-y-4">
              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-white/40 group/item">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Гарантия промышленного стандарта 3 года</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-white/40 group/item">
                <Clock className="w-4 h-4 text-accent" />
                <span>Расширенный пакет сервиса (24/7)</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-16 space-y-6">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-10 text-xs font-black bg-accent hover:bg-accent/90 text-white rounded-none transition-all shadow-2xl shadow-accent/20 uppercase tracking-[0.4em] relative overflow-hidden group/btn"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10">Получить финальную смету</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
