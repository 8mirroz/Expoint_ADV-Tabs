"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCalculatorStore } from '@/store/useCalculatorStore';
import { useAnalytics } from '@/hooks/useAnalytics';
import { SIGN_MATERIALS, LIGHTING_PACKAGES } from '@/data/materials';
import { PRICING_MODIFIERS } from '@/data/pricing-matrix';
import { 
  Settings, 
  Layers, 
  Zap, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Info,
  Truck,
  Timer
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

const SignScene = dynamic(() => import('@/components/three/SignScene'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-950">
       <div className="text-orange-500 animate-pulse font-black text-xs uppercase tracking-widest">
         Initializing 3D Engine...
       </div>
    </div>
  )
});

const STEPS = [
  { id: 'config', title: 'Конфигурация', icon: Settings },
  { id: 'tech', title: 'Технические ТТХ', icon: Layers },
  { id: 'style', title: 'Материалы и Свет', icon: Zap },
  { id: 'summary', title: 'Спецификация', icon: CheckCircle2 },
];

const URGENCY_OPTIONS = ['standard', 'express'] as const;

export default function CalculatorContainer() {
  const [currentStep, setCurrentStep] = useState(0);
  const store = useCalculatorStore();
  const { captureSignal } = useAnalytics();

  const nextStep = () => {
    const next = Math.min(currentStep + 1, STEPS.length - 1);
    setCurrentStep(next);
    captureSignal({
      topic: "conversion",
      priority: "P3",
      payload: { 
        action: "next_step", 
        from_step: STEPS[currentStep].id, 
        to_step: STEPS[next].id,
        current_text: store.text,
        current_price: store.priceRange?.min
      }
    });
  };

  const prevStep = () => {
    const prev = Math.max(currentStep - 1, 0);
    setCurrentStep(prev);
    captureSignal({
      topic: "conversion",
      priority: "P3",
      payload: { action: "prev_step", from_step: STEPS[currentStep].id, to_step: STEPS[prev].id }
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
      {/* Header / Stepper */}
      <div className="flex border-b border-white/5 bg-slate-900/30">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = idx === currentStep;
          const isCompleted = idx < currentStep;
          
          return (
            <div 
              key={step.id}
              className={`flex-1 flex items-center justify-center py-6 px-2 gap-3 border-r last:border-r-0 border-white/5 transition-all duration-500 relative ${
                isActive ? 'text-accent' : isCompleted ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-step"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-accent shadow-neon"
                />
              )}
              <Icon size={16} className={isActive ? 'text-accent' : ''} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden md:block">
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        {/* Main Control Panel */}
        <div className="lg:col-span-8 p-8 border-r border-slate-800">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-8"
            >
              {currentStep === 0 && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-black font-headline text-white uppercase tracking-tight">Базовые параметры</h3>
                  <div className="space-y-6">
                    <Input 
                      label="Текст вашей вывески"
                      value={store.text}
                      onChange={(e) => store.setText(e.target.value)}
                      placeholder="Введите название компании..."
                      className="text-xl font-bold tracking-tight"
                    />
                    <div className="grid grid-cols-2 gap-4">
                       <Card className="p-6 bg-slate-900/50 border-white/5">
                          <span className="text-slate-500 text-[10px] uppercase font-black tracking-widest">Символов</span>
                          <div className="text-3xl font-mono text-white mt-1">{store.count}</div>
                       </Card>
                       <Card className="p-6 border-accent/20 bg-accent/5">
                          <span className="text-accent text-[10px] uppercase font-black tracking-widest">Тип конструкции</span>
                          <div className="text-sm font-bold text-white uppercase mt-2">Объемные буквы</div>
                       </Card>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold font-outfit text-white">Технические спецификации</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-end mb-4">
                        <span className="text-slate-400 text-sm uppercase tracking-widest font-bold">Высота (см)</span>
                        <span className="text-orange-500 font-mono text-xl">{store.heightCm} см</span>
                      </div>
                      <input 
                        type="range" 
                        min="10" 
                        max="100" 
                        value={store.heightCm}
                        onChange={(e) => store.setHeight(parseInt(e.target.value))}
                        className="w-full accent-orange-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <span className="text-slate-400 text-[10px] uppercase font-black">Сложность шрифта</span>
                        <div className="flex flex-col gap-2">
                          {(Object.keys(PRICING_MODIFIERS.complexity) as Array<keyof typeof PRICING_MODIFIERS.complexity>).map(key => (
                            <button
                              key={key}
                              onClick={() => store.setComplexity(key)}
                              className={`text-left p-3 border text-sm transition-all ${
                                store.complexity === key 
                                ? 'border-orange-500 bg-orange-500/10 text-white' 
                                : 'border-slate-800 text-slate-400 hover:border-slate-600'
                              }`}
                            >
                              {key === 'standard' && 'Стандарт (Без засечек)'}
                              {key === 'serif' && 'С засечками (Roman)'}
                              {key === 'script' && 'Каллиграфия / Лого'}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <span className="text-slate-400 text-[10px] uppercase font-black">Срочность</span>
                        <div className="flex flex-col gap-2">
                          {URGENCY_OPTIONS.map((key) => (
                            <button
                              key={key}
                              onClick={() => store.setUrgency(key)}
                              className={`text-left p-3 border text-sm transition-all ${
                                store.urgency === key 
                                ? 'border-orange-500 bg-orange-500/10 text-white' 
                                : 'border-slate-800 text-slate-400 hover:border-slate-600'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {key === 'standard' ? <Truck size={14} /> : <Timer size={14} />}
                                {key === 'standard' ? 'Стандарт (7-10 дней)' : 'Экспресс (3-5 дней)'}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-8">
                   <h3 className="text-2xl font-bold font-outfit text-white">Материалы и Свет</h3>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <span className="text-slate-400 text-[10px] uppercase font-black block">Лицевая панель</span>
                        <div className="grid grid-cols-1 gap-3">
                          {SIGN_MATERIALS.map(m => (
                            <button
                              key={m.id}
                              onClick={() => store.setMaterial(m.id)}
                              className={`text-left p-4 border transition-all group ${
                                store.materialId === m.id 
                                ? 'border-orange-500 bg-orange-500/10' 
                                : 'border-slate-800 hover:border-slate-700'
                              }`}
                            >
                              <div className="font-bold text-sm text-white mb-1">{m.name}</div>
                              <div className="text-[10px] text-slate-500 leading-tight">{m.premiumValue}</div>
                            </button>
                          ))}
                        </div>
                     </div>

                     <div className="space-y-4">
                        <span className="text-slate-400 text-[10px] uppercase font-black block">Тип подсветки</span>
                        <div className="grid grid-cols-1 gap-3">
                          {LIGHTING_PACKAGES.map(l => (
                            <button
                              key={l.id}
                              onClick={() => store.setLighting(l.id)}
                              className={`text-left p-4 border transition-all ${
                                store.lightingId === l.id 
                                ? 'border-orange-500 bg-orange-500/10' 
                                : 'border-slate-800 hover:border-slate-700'
                              }`}
                            >
                               <div className="text-[10px] text-slate-500 leading-tight">{l.valueProp}</div>
                            </button>
                          ))}
                        </div>
                     </div>
                   </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-8">
                   <h3 className="text-2xl font-black font-headline text-white uppercase tracking-tight">Итоговая спецификация</h3>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-6">
                        <Card className="bg-slate-900/50 p-8 space-y-4">
                           <div className="flex justify-between items-center py-3 border-b border-white/5">
                             <span className="text-slate-500 text-[10px] font-black uppercase">Объект</span>
                             <span className="text-white font-bold uppercase tracking-tight">{store.text}</span>
                           </div>
                           <div className="flex justify-between items-center py-3 border-b border-white/5">
                             <span className="text-slate-500 text-[10px] font-black uppercase">Габариты</span>
                             <span className="text-white font-mono">{store.heightCm}см × {Math.round(store.heightCm * 0.8 * store.count)}см</span>
                           </div>
                           <div className="flex justify-between items-center py-3">
                             <span className="text-slate-500 text-[10px] font-black uppercase">Материалы</span>
                             <span className="text-accent text-[10px] font-black uppercase">{SIGN_MATERIALS.find(m => m.id === store.materialId)?.name}</span>
                           </div>
                        </Card>

                        <Card className="bg-accent/10 border-accent/30 p-8">
                           <p className="text-accent text-[10px] font-black uppercase tracking-widest mb-2">Ориентировочный бюджет</p>
                           <div className="text-4xl font-mono text-white tracking-tighter">
                             {store.priceRange?.min.toLocaleString()} — {store.priceRange?.max.toLocaleString()} ₽
                           </div>
                        </Card>
                     </div>

                      <div className="space-y-6 bg-slate-900/30 p-8 border border-white/10">
                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest block mb-4">Завершение заказа</span>
                        <div className="space-y-4">
                           <Input 
                             placeholder="Ваше имя" 
                             id="contactName"
                           />
                           <Input 
                             placeholder="Телефон (обязательно)" 
                             id="contactPhone"
                             required
                             type="tel"
                           />
                           
                           <div className="pt-2">
                             <label className="group flex items-start gap-3 cursor-pointer">
                               <div className="relative flex items-center">
                                 <input
                                   type="checkbox"
                                   id="consentCheckbox"
                                   className="peer sr-only"
                                 />
                                 <div className="w-5 h-5 border border-white/10 bg-background peer-checked:bg-accent peer-checked:border-accent transition-all flex items-center justify-center">
                                   <CheckCircle2 className="w-3 h-3 text-black opacity-0 peer-checked:opacity-100 transition-opacity" />
                                 </div>
                               </div>
                               <span className="text-[10px] text-on-surface-variant leading-tight uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                                 Я согласен на обработку персональных данных (152-ФЗ)
                               </span>
                             </label>
                           </div>

                           <p className="text-[10px] text-slate-600 italic leading-relaxed">
                             Нажимая кнопку, вы подтверждаете готовность к техническому аудиту в соответствии с <a href="/privacy" className="text-accent underline hover:no-underline">политикой конфиденциальности</a>.
                           </p>
                        </div>
                      </div>
                   </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="mt-12 flex justify-between items-center pt-8 border-t border-white/5">
             <Button 
               variant="ghost"
               onClick={prevStep}
               disabled={currentStep === 0}
               className={currentStep === 0 ? 'opacity-0' : ''}
             >
               <ChevronLeft size={16} className="mr-2" /> Назад
             </Button>
             
             {currentStep < STEPS.length - 1 ? (
               <Button 
                 onClick={nextStep}
                 className="group"
               >
                 Конфигурация <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
               </Button>
             ) : (
                <Button 
                  onClick={async () => {
                    const phone = (document.getElementById('contactPhone') as HTMLInputElement)?.value;
                    const name = (document.getElementById('contactName') as HTMLInputElement)?.value;
                    const consent = (document.getElementById('consentCheckbox') as HTMLInputElement)?.checked;
                    
                    if (!phone) return alert('Пожалуйста, укажите телефон');
                    if (!consent) return alert('Необходимо согласие на обработку данных');
                    
                    try {
                      // 1. Log Compliance
                      await fetch('/api/compliance/consent', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          formId: 'calculator_quote',
                          purposes: ['personal_data'],
                        }),
                      });

                      // 2. Submit Quote
                      const res = await fetch('/api/quote', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          text: store.text,
                          heightCm: store.heightCm,
                          materialId: store.materialId,
                          lightingId: store.lightingId,
                          priceRange: store.priceRange,
                          consent: true,
                          contact: { name, phone }
                        })
                      });
                      const result = await res.json();
                      if (result.success) {
                        alert(result.message);
                        store.reset();
                        setCurrentStep(0);
                      } else {
                        alert(result.message || 'Ошибка при отправке');
                      }
                    } catch (error) {
                      console.error('Submission error:', error);
                      alert('Ошибка при отправке');
                    }
                  }}
                >
                  Сформировать заказ <CheckCircle2 size={16} className="ml-2" />
                </Button>
             )}
          </div>
        </div>

        {/* Sidebar / Live Preview (Placeholder for 3D) */}
        <div className="lg:col-span-4 bg-slate-900/50 p-8 flex flex-col">
           <div className="flex-1 flex flex-col items-center justify-center space-y-6">
              <div className="w-full aspect-square bg-slate-950 border border-slate-800 rounded-none relative flex items-center justify-center overflow-hidden">
                 <SignScene />
                 
                 <div className="absolute bottom-4 left-4 flex gap-2 pointer-events-none">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">Live Renderer Engine v2.0</span>
                 </div>
              </div>

              <div className="w-full space-y-4">
                 <div className="flex items-start gap-3 p-4 bg-slate-950 border border-slate-800">
                    <Info size={16} className="text-orange-500 mt-1 shrink-0" />
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      <span className="text-white font-bold block mb-1">Industrial Intelligence</span>
                      Ваш проект соответствует стандартам ГОСТ и нормам наружной рекламы г. Москвы (902-ПП).
                    </p>
                 </div>
              </div>
           </div>

           <div className="pt-8 mt-auto border-t border-slate-800 text-center">
              <span className="text-[10px] text-slate-600 uppercase font-black tracking-[0.2em]">Expoint Engineering Unit</span>
           </div>
        </div>
      </div>
    </div>
  );
}
