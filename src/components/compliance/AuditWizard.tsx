"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { calculateCompliance, AuditParams, AuditResult } from '@/lib/compliance';
import { CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft, Ruler, Building2, Layout, Info } from 'lucide-react';
import { useModalStore } from '@/store/useModalStore';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useFrictionMonitor } from '@/hooks/useFrictionMonitor';

export default function AuditWizard() {
  const { openModal } = useModalStore();
  const { captureSignal } = useAnalytics();
  const { recordClick } = useFrictionMonitor("audit_wizard");
  const [step, setStep] = useState(0);
  const [params, setParams] = useState<AuditParams>({
    inHistoricCenter: false,
    onBalcony: false,
    overlapsWindows: false,
    isLightbox: false,
    height: 0.5,
    lengthPercentage: 50,
    absoluteLength: 10,
  });

  const [result, setResult] = useState<AuditResult | null>(null);

  const steps = [
    {
      title: 'Расположение',
      icon: <Building2 className="w-5 h-5 text-accent" />,
      description: 'Укажите территориальные особенности здания',
      render: () => (
        <div className="space-y-4">
          <label className="group flex items-center space-x-4 p-5 border border-outline hover:border-accent/50 transition-all cursor-pointer bg-surface/50 backdrop-blur-sm relative overflow-hidden">
            <input 
              type="checkbox" 
              checked={params.inHistoricCenter} 
              onChange={e => setParams({...params, inHistoricCenter: e.target.checked})}
              className="w-5 h-5 accent-accent"
            />
            <div className="flex flex-col">
              <span className="text-on-surface font-bold text-sm uppercase tracking-wider">Исторический центр</span>
              <span className="text-on-surface-variant text-xs">В пределах Садового кольца (особые требования 902-ПП)</span>
            </div>
            {/* Industrial accent */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent/20 group-hover:border-accent/60 transition-colors" />
          </label>
        </div>
      )
    },
    {
      title: 'Конструкция',
      icon: <Layout className="w-5 h-5 text-accent" />,
      description: 'Выберите тип и особенности размещения',
      render: () => (
        <div className="space-y-4">
          {[
            { 
              id: 'isLightbox', 
              label: 'Световой короб', 
              desc: 'Классический лайтбокс с внутренней подсветкой',
              tooltip: 'В историческом центре и на зданиях до 1952 года постройки лайтбоксы часто запрещены — разрешены только отдельные объемные буквы.'
            },
            { 
              id: 'onBalcony', 
              label: 'Размещение на балконе', 
              desc: 'Использование элементов фасада, балконов или лоджий',
              tooltip: '902-ПП категорически запрещает размещение любых рекламных конструкций на архитектурных элементах: балконах, эркерах, колоннах.'
            },
            { 
              id: 'overlapsWindows', 
              label: 'Перекрытие витрин', 
              desc: 'Выход конструкции на остекление или оконные проемы',
              tooltip: 'Вывеска не должна перекрывать оконные проемы, витражи и декоративные элементы фасада более чем на 30% или полностью (в зависимости от зоны).'
            }
          ].map((item) => (
            <div key={item.id} className="relative group/item">
              <label className="group flex items-center space-x-4 p-5 border border-outline hover:border-accent/50 transition-all cursor-pointer bg-surface/50 backdrop-blur-sm relative overflow-hidden">
                <input 
                  type="checkbox" 
                  checked={params[item.id as keyof AuditParams] as boolean} 
                  onChange={e => setParams({...params, [item.id]: e.target.checked})}
                  className="w-5 h-5 accent-accent"
                />
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-on-surface font-bold text-sm uppercase tracking-wider">{item.label}</span>
                  </div>
                  <span className="text-on-surface-variant text-xs">{item.desc}</span>
                </div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent/20 group-hover:border-accent/60 transition-colors" />
              </label>
              
              {/* Info Tooltip Icon */}
              <div className="absolute right-5 top-1/2 -translate-y-1/2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                <div className="relative group/tooltip">
                  <Info className="w-4 h-4 text-on-surface-variant cursor-help" />
                  <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-secondary border border-accent/30 text-xs text-white leading-relaxed uppercase tracking-widest hidden group-hover/tooltip:block z-50 shadow-2xl backdrop-blur-md">
                    {item.tooltip}
                    <div className="absolute top-full right-4 w-2 h-2 bg-secondary border-b border-r border-accent/30 rotate-45 -translate-y-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      title: 'Габариты',
      icon: <Ruler className="w-5 h-5 text-accent" />,
      description: 'Укажите точные размеры будущей конструкции',
      render: () => (
        <div className="space-y-8 py-4">
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Высота (м)</label>
              <span className="text-2xl font-black text-accent font-mono">{params.height}</span>
            </div>
            <input 
              type="range" min="0.1" max="2" step="0.1"
              value={params.height}
              onChange={e => setParams({...params, height: parseFloat(e.target.value)})}
              className="w-full accent-accent h-1 bg-outline rounded-none appearance-none cursor-pointer"
            />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Длина от фасада (%)</label>
              <span className="text-2xl font-black text-accent font-mono">{params.lengthPercentage}%</span>
            </div>
            <input 
              type="range" min="10" max="100" step="5"
              value={params.lengthPercentage}
              onChange={e => setParams({...params, lengthPercentage: parseInt(e.target.value)})}
              className="w-full accent-accent h-1 bg-outline rounded-none appearance-none cursor-pointer"
            />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Абсолютная длина (м)</label>
              <span className="text-2xl font-black text-accent font-mono">{params.absoluteLength}</span>
            </div>
            <input 
              type="range" min="1" max="30" step="1"
              value={params.absoluteLength}
              onChange={e => setParams({...params, absoluteLength: parseInt(e.target.value)})}
              className="w-full accent-accent h-1 bg-outline rounded-none appearance-none cursor-pointer"
            />
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    recordClick();
    if (step < steps.length - 1) {
      captureSignal({
        topic: "conversion",
        payload: {
          component: "audit_wizard",
          action: "step_next",
          step: step + 1,
          params
        }
      });
      setStep(step + 1);
    } else {
      const auditResult = calculateCompliance(params);
      setResult(auditResult);
      captureSignal({
        topic: "compliance",
        priority: "P2",
        payload: {
          component: "audit_wizard",
          action: "audit_completed",
          isCompliant: auditResult.isCompliant,
          params
        }
      });
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    recordClick();
    if (step > 0) {
      if (step === steps.length) setResult(null);
      captureSignal({
        topic: "conversion",
        payload: {
          component: "audit_wizard",
          action: "step_prev",
          step: step - 1
        }
      });
      setStep(step - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-surface p-8 lg:p-12 border border-outline shadow-premium relative" onClick={recordClick}>
      {/* Industrial corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent/40" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent/40" />

      {/* Progress Header */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-accent">Compliance Engine v4.0</span>
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
            {step < steps.length ? `Шаг ${step + 1} из ${steps.length}` : 'Результат аудита'}
          </span>
        </div>
        <div className="flex gap-1">
          {[...Array(steps.length + 1)].map((_, i) => (
            <div 
              key={i} 
              className={`h-1 flex-1 transition-all duration-500 ${i <= step ? 'bg-accent' : 'bg-outline'}`} 
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step < steps.length ? (
          <motion.div
            key="wizard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="min-h-[350px]"
          >
            <div className="flex items-center gap-3 mb-2">
              {steps[step].icon}
              <h3 className="text-2xl font-headline font-black uppercase tracking-tight text-on-surface">{steps[step].title}</h3>
            </div>
            <p className="text-on-surface-variant text-sm mb-8">{steps[step].description}</p>
            {steps[step].render()}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-[350px] flex flex-col"
          >
            {result?.isCompliant ? (
              <div className="flex-1 text-center py-8 space-y-6">
                <div className="relative inline-block">
                  <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto" />
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-4 border-surface"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-headline font-black uppercase tracking-tight text-on-surface">Соответствует 902-ПП</h3>
                  <p className="text-on-surface-variant max-w-sm mx-auto">Конструкция полностью удовлетворяет требованиям регламента г. Москвы.</p>
                </div>
              </div>
            ) : (
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-accent/10 flex items-center justify-center border border-accent/20">
                    <AlertTriangle className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-headline font-black uppercase tracking-tight text-on-surface">Выявлены нарушения</h3>
                    <p className="text-xs font-bold text-accent uppercase tracking-widest">Требуется корректировка проекта</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {result?.violations.map(v => (
                    <div key={v.id} className="p-5 bg-accent/3 border-l-4 border-l-accent border-y border-r border-outline transition-colors hover:bg-accent/5">
                      <p className="font-black text-on-surface text-xs uppercase tracking-wider mb-2">{v.title}</p>
                      <p className="text-sm text-on-surface-variant leading-relaxed">{v.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-auto pt-8 border-t border-outline">
               <button
                 onClick={() => {
                   recordClick();
                   captureSignal({
                     topic: "conversion",
                     priority: "P1",
                     payload: {
                       component: "audit_wizard",
                       action: "request_report",
                       isCompliant: result?.isCompliant,
                       params
                     }
                   });
                   openModal({ 
                     context: 'Запрошен детальный отчет по 902-ПП', 
                     source: 'compliance_audit' 
                   });
                 }}
                 className="w-full bg-primary hover:bg-accent text-on-primary px-6 py-5 font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 group shadow-xl"
               >
                 Получить инженерный отчет
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between mt-12 pt-8 border-t border-outline">
        <button
          onClick={handlePrev}
          disabled={step === 0}
          className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest text-on-surface-variant hover:text-accent disabled:opacity-30 transition-colors"
        >
          <ArrowLeft className="w-3 h-3" /> Назад
        </button>
        {step < steps.length ? (
          <button
            onClick={handleNext}
            className="flex items-center gap-3 bg-secondary hover:bg-accent hover:text-white text-on-surface px-8 py-3 font-black uppercase tracking-widest text-xs transition-all border border-outline"
          >
            Далее <ArrowRight className="w-3 h-3" />
          </button>
        ) : (
          <button
            onClick={() => { setStep(0); setResult(null); }}
            className="text-xs font-black uppercase tracking-widest text-on-surface-variant hover:text-accent transition-colors"
          >
            Сбросить данные
          </button>
        )}
      </div>
    </div>
  );
}
