'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { ArrowRight, RotateCcw } from 'lucide-react';

type RiskLevel = 'low' | 'medium' | 'high';
type StepAnswer = string | null;

interface QuizStep {
  id: number;
  question: string;
  options: Array<{ value: string; label: string }>;
}

const STEPS: QuizStep[] = [
  {
    id: 1,
    question: 'Где планируется установка?',
    options: [
      { value: 'facade_1_2', label: 'На фасаде 1-2 этажа' },
      { value: 'mall_inside', label: 'Внутри торгового центра' },
      { value: 'roof', label: 'На крыше' },
    ],
  },
  {
    id: 2,
    question: 'Утверждена ли архитектурно-художественная концепция (АХК)?',
    options: [
      { value: 'yes', label: 'Да, есть' },
      { value: 'no', label: 'Нет' },
      { value: 'unknown', label: 'Не знаю' },
    ],
  },
  {
    id: 3,
    question: 'Были ли ранее предписания ОАТИ на этом фасаде?',
    options: [
      { value: 'no', label: 'Нет' },
      { value: 'yes_remove', label: 'Да, заставляли снимать' },
      { value: 'unknown', label: 'Не знаю' },
    ],
  },
  {
    id: 4,
    question: 'Нужна ли помощь с согласованием?',
    options: [
      { value: 'turnkey', label: 'Да, хочу сделать всё под ключ' },
      { value: 'self', label: 'Нет, сами согласуем' },
    ],
  },
];

const RESULT_COPY = {
  high: {
    title: 'Скорее всего - не согласуют',
    body: 'Размещение выше 2 этажа (крышные установки) или наличие предписаний ОАТИ требуют сложного процесса. Согласно Разделу III 902-ПП, штраф за незаконное размещение может достигать 500 000 руб (ст. 8.6.1 КоАП г. Москвы).',
    tone: 'border-red-500/40 text-red-200 bg-red-500/5',
    accent: 'bg-red-500',
  },
  medium: {
    title: 'Сложности с согласованием',
    body: 'Размещение возможно, но сопряжено с рисками. Отсутствие архитектурно-художественной концепции (АХК) улицы/здания означает, что вывеску, вероятно, придется устанавливать строго по дизайн-проекту (п. 18-20 902-ПП).',
    tone: 'border-amber-500/40 text-amber-100 bg-amber-500/5',
    accent: 'bg-amber-500',
  },
  low: {
    title: 'Скорее всего - согласуют',
    body: 'По предварительной оценке, размещение соответствует базовым правилам (п. 10 902-ПП). Информационные конструкции на фасадах 1-го этажа в одну линию обычно согласовываются в уведомительном порядке при соблюдении габаритов.',
    tone: 'border-emerald-500/40 text-emerald-100 bg-emerald-500/5',
    accent: 'bg-emerald-500',
  },
} as const;

function evaluateRisk(answers: StepAnswer[]): RiskLevel {
  let risk: RiskLevel | null = null;

  const step1 = answers[0];
  const step2 = answers[1];
  const step3 = answers[2];

  if (step1 === 'mall_inside') {
    risk = 'low';
  } else if (step1 === 'roof') {
    risk = 'high';
  }

  if (risk === null && (step2 === 'no' || step2 === 'unknown')) {
    risk = 'medium';
  }

  if (step3 === 'yes_remove') {
    risk = 'high';
  }

  return risk || 'low';
}


export const ComplianceChecker = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<StepAnswer[]>(Array(STEPS.length).fill(null));
  const [isFinished, setIsFinished] = useState(false);

  const risk = useMemo(() => evaluateRisk(answers), [answers]);
  const currentQuestion = STEPS[currentStep];

  const selectOption = (value: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentStep] = value;
      return next;
    });

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    setIsFinished(true);
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers(Array(STEPS.length).fill(null));
    setIsFinished(false);
  };

  const scrollToAudit = () => {
    const node = document.getElementById('audit');
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center text-xs font-medium uppercase tracking-widest text-neutral-500">
              <span>Шаг {currentStep + 1} из {STEPS.length}</span>
              <div className="flex gap-1">
                {STEPS.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      'h-1 w-8 rounded-full transition-colors duration-500',
                      index <= currentStep ? 'bg-amber-500' : 'bg-neutral-800'
                    )}
                  />
                ))}
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-white tracking-tight">{currentQuestion.question}</h3>

            <div className="grid gap-4">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => selectOption(option.value)}
                  className="group relative flex items-center justify-between p-4 bg-white/3 border border-white/10 hover:bg-white/5 transition-all cursor-pointer rounded-2xl text-left"
                >
                  <span className="text-base md:text-lg font-medium text-neutral-200 group-hover:text-white transition-colors">
                    {option.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8 py-2"
          >
            <div className={cn('rounded-2xl border p-6 md:p-8', RESULT_COPY[risk].tone)}>
              <div className="flex items-center gap-3 mb-4">
                <div className={cn('w-2.5 h-2.5 rounded-full', RESULT_COPY[risk].accent)} />
                <span className="text-xs uppercase tracking-[0.2em] opacity-80">Итоговая оценка риска</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-current">
                {RESULT_COPY[risk].title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-current/90">
                {RESULT_COPY[risk].body}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <button
                onClick={scrollToAudit}
                className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition-all"
              >
                Заказать точный аудит фасада
              </button>
              <button
                onClick={reset}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
              >
                <RotateCcw size={18} />
                Пересчитать заново
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
