'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { X, AlertTriangle, ArrowRight, RotateCcw, ShieldCheck } from 'lucide-react';
import { calculateCompliance, type AuditParams } from '@/lib/compliance';

interface Question {
  id: keyof AuditParams;
  text: string;
  kind: 'boolean' | 'range';
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  passHint: string;
  warnHint: string;
}

const QUESTIONS: Question[] = [
  {
    id: 'inHistoricCenter',
    text: 'Объект находится в историческом центре?',
    kind: 'boolean',
    passHint: 'Стандартные ограничения 902-ПП.',
    warnHint: 'Применяются усиленные ограничения по формату конструкции.',
  },
  {
    id: 'isLightbox',
    text: 'Планируется световой короб?',
    kind: 'boolean',
    passHint: 'Допустимо, если нет дополнительных ограничений.',
    warnHint: 'Для исторического центра часто недопустимо.',
  },
  {
    id: 'onBalcony',
    text: 'Есть размещение на балконе/лоджии/эркере?',
    kind: 'boolean',
    passHint: 'Размещение вне архитектурных элементов снижает риск отказа.',
    warnHint: 'Балконы и лоджии запрещены для размещения вывесок.',
  },
  {
    id: 'overlapsWindows',
    text: 'Конструкция перекрывает окна/витрины?',
    kind: 'boolean',
    passHint: 'Без перекрытия окон риск минимальный.',
    warnHint: 'Перекрытие окон относится к высокому юридическому риску.',
  },
  {
    id: 'height',
    text: 'Высота конструкции (м)',
    kind: 'range',
    min: 0.1,
    max: 2,
    step: 0.1,
    unit: 'м',
    passHint: 'До 0.5 м обычно укладывается в базовое ограничение.',
    warnHint: 'Выше 0.5 м потребуется пересчет решения.',
  },
  {
    id: 'lengthPercentage',
    text: 'Длина относительно фасада (%)',
    kind: 'range',
    min: 10,
    max: 100,
    step: 5,
    unit: '%',
    passHint: 'До 70% фасада — безопаснее для согласования.',
    warnHint: 'Свыше 70% фасада вызывает риск отклонения.',
  },
  {
    id: 'absoluteLength',
    text: 'Абсолютная длина конструкции (м)',
    kind: 'range',
    min: 1,
    max: 30,
    step: 1,
    unit: 'м',
    passHint: 'До 15 м соответствует базовой рамке.',
    warnHint: 'Свыше 15 м требует отдельной проработки.',
  },
];

const INITIAL_PARAMS: AuditParams = {
  inHistoricCenter: false,
  onBalcony: false,
  overlapsWindows: false,
  isLightbox: false,
  height: 0.5,
  lengthPercentage: 50,
  absoluteLength: 10,
};

export const ComplianceChecker = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [params, setParams] = useState<AuditParams>(INITIAL_PARAMS);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = QUESTIONS[currentStep];
  const result = calculateCompliance(params);

  const handleBoolean = (value: boolean) => {
    setParams((prev) => ({ ...prev, [currentQuestion.id]: value }));
    goNext();
  };

  const handleRange = (value: number) => {
    setParams((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const goNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      return;
    }
    setIsFinished(true);
  };

  const reset = () => {
    setCurrentStep(0);
    setParams(INITIAL_PARAMS);
    setIsFinished(false);
  };

  const resultType = result.isCompliant ? 'pass' : 'fail';

  return (
    <div className="w-full max-w-3xl mx-auto bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key="step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center text-xs font-medium uppercase tracking-widest text-neutral-500">
              <span>Вопрос {currentStep + 1} из {QUESTIONS.length}</span>
              <div className="flex gap-1">
                {QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'h-1 w-8 rounded-full transition-colors duration-500',
                      i <= currentStep ? 'bg-amber-500' : 'bg-neutral-800'
                    )}
                  />
                ))}
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-white tracking-tight">{currentQuestion.text}</h3>

            {currentQuestion.kind === 'boolean' ? (
              <div className="grid gap-4">
                <button
                  onClick={() => handleBoolean(false)}
                  className="group relative flex flex-col items-start p-4 bg-white/3 border border-white/10 hover:bg-emerald-500/5 transition-all cursor-pointer rounded-2xl text-left"
                >
                  <div className="flex w-full justify-between items-center mb-1">
                    <span className="text-lg font-medium text-neutral-200 group-hover:text-white transition-colors">Нет</span>
                    <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-sm text-neutral-500 group-hover:text-neutral-400 leading-relaxed">{currentQuestion.passHint}</p>
                </button>

                <button
                  onClick={() => handleBoolean(true)}
                  className="group relative flex flex-col items-start p-4 bg-white/3 border border-white/10 hover:bg-amber-500/5 transition-all cursor-pointer rounded-2xl text-left"
                >
                  <div className="flex w-full justify-between items-center mb-1">
                    <span className="text-lg font-medium text-neutral-200 group-hover:text-white transition-colors">Да</span>
                    <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-sm text-neutral-500 group-hover:text-neutral-400 leading-relaxed">{currentQuestion.warnHint}</p>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl border border-white/10 bg-white/3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-neutral-400">Текущее значение</span>
                    <span className="text-xl font-black text-amber-400">
                      {String(params[currentQuestion.id])} {currentQuestion.unit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={currentQuestion.min}
                    max={currentQuestion.max}
                    step={currentQuestion.step}
                    value={Number(params[currentQuestion.id])}
                    onChange={(event) => handleRange(Number(event.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

                <button
                  onClick={goNext}
                  className="w-full px-6 py-4 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition-all"
                >
                  Продолжить
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 py-4"
          >
            <div className="flex justify-center">
              <div
                className={cn(
                  'w-20 h-20 rounded-full flex items-center justify-center animate-pulse',
                  resultType === 'pass' && 'bg-emerald-500/20 text-emerald-500',
                  resultType === 'fail' && 'bg-red-500/20 text-red-500'
                )}
              >
                {resultType === 'pass' && <ShieldCheck size={40} />}
                {resultType === 'fail' && <X size={40} />}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-3xl font-bold text-white tracking-tight">
                {resultType === 'pass' ? 'Соответствует 902-ПП' : 'Требует доработки'}
              </h3>
              <p className="text-neutral-400 max-w-md mx-auto">
                {resultType === 'pass'
                  ? 'Параметры выглядят безопасно для реализации. Сохраняйте текущие габариты и тип размещения.'
                  : 'Найдены нарушения по 902-ПП. Ниже показаны конкретные пункты с источниками и evidence.'}
              </p>
            </div>

            {result.violations.length > 0 && (
              <div className="text-left space-y-4 max-w-2xl mx-auto">
                {result.violations.map((violation) => (
                  <div key={violation.id} className="p-4 rounded-xl border border-red-500/20 bg-red-500/5">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5" />
                      <div>
                        <div className="font-bold text-red-200">{violation.title}</div>
                        <div className="text-sm text-red-100/80 mt-1">{violation.description}</div>
                        <div className="mt-3 text-xs text-neutral-300">
                          Source: <span className="font-mono">{violation.evidence.source_doc_id}</span> · Owner: {violation.evidence.owner} · Verified: {violation.evidence.last_verified_at}
                        </div>
                        <div className="mt-1 text-xs text-neutral-400">Evidence: {violation.evidence.evidence_snippet}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={reset}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
              >
                <RotateCcw size={18} />
                Пройти еще раз
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                Получить экспертный аудит
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
