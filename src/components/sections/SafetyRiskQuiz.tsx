'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

type RiskLevel = 'low' | 'medium' | 'high';
type StepAnswer = string | null;

interface StepOption {
  value: string;
  label: string;
}

interface QuizStep {
  question: string;
  options: StepOption[];
}

const STEPS: QuizStep[] = [
  {
    question: 'Где планируется установка?',
    options: [
      { value: 'facade_1_2', label: 'На фасаде 1-2 этажа' },
      { value: 'mall_inside', label: 'Внутри торгового центра' },
      { value: 'roof', label: 'На крыше' },
    ],
  },
  {
    question: 'Утверждена ли архитектурно-художественная концепция (АХК)?',
    options: [
      { value: 'yes', label: 'Да, есть' },
      { value: 'no', label: 'Нет' },
      { value: 'unknown', label: 'Не знаю' },
    ],
  },
  {
    question: 'Были ли ранее предписания ОАТИ на этом фасаде?',
    options: [
      { value: 'no', label: 'Нет' },
      { value: 'yes_remove', label: 'Да, заставляли снимать' },
      { value: 'unknown', label: 'Не знаю' },
    ],
  },
  {
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
    dot: 'bg-red-500',
  },
  medium: {
    title: 'Сложности с согласованием',
    body: 'Размещение возможно, но сопряжено с рисками. Отсутствие АХК улицы/здания означает, что вывеску, вероятно, придется устанавливать строго по дизайн-проекту (п. 18-20 902-ПП).',
    tone: 'border-amber-500/40 text-amber-100 bg-amber-500/5',
    dot: 'bg-amber-500',
  },
  low: {
    title: 'Скорее всего - согласуют',
    body: 'По предварительной оценке, размещение соответствует базовым правилам (п. 10 902-ПП). Информационные конструкции на фасадах 1-го этажа в одну линию обычно согласовываются в уведомительном порядке.',
    tone: 'border-emerald-500/40 text-emerald-100 bg-emerald-500/5',
    dot: 'bg-emerald-500',
  },
} as const;

function evaluateRisk(answers: StepAnswer[]): RiskLevel {
  let risk: RiskLevel | null = null;

  const step1 = answers[0];
  const step2 = answers[1];
  const step3 = answers[2];

  if (step1 === 'mall_inside') risk = 'low';
  if (step1 === 'roof') risk = 'high';

  if (risk === null && (step2 === 'no' || step2 === 'unknown')) {
    risk = 'medium';
  }

  if (step3 === 'yes_remove') {
    risk = 'high';
  }

  return risk || 'low';
}


export default function SafetyRiskQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<StepAnswer[]>(Array(STEPS.length).fill(null));
  const [done, setDone] = useState(false);

  const risk = useMemo(() => evaluateRisk(answers), [answers]);

  const onSelect = (value: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = value;
      return next;
    });

    if (step < STEPS.length - 1) {
      setStep((prev) => prev + 1);
      return;
    }

    setDone(true);
  };

  const onReset = () => {
    setStep(0);
    setAnswers(Array(STEPS.length).fill(null));
    setDone(false);
  };

  const scrollToTopForm = () => {
    const node = document.getElementById('contact');
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="rounded-3xl border border-outline/60 bg-surface p-6 md:p-8 shadow-elevation-1 h-full flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={`q-${step}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <p className="verge-mono-label text-on-surface-variant">Шаг {step + 1} / {STEPS.length}</p>
              <div className="flex gap-1.5">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={cn('h-1.5 w-8 rounded-full', i <= step ? 'bg-accent' : 'bg-outline')}
                  />
                ))}
              </div>
            </div>

            <h3 className="geist-display-sm text-on-surface">{STEPS[step].question}</h3>

            <div className="grid gap-3">
              {STEPS[step].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onSelect(option.value)}
                  className="flex items-center justify-between rounded-xl border border-outline/60 bg-surface-variant/20 px-4 py-3 text-left hover:border-accent/40 hover:bg-accent/5 transition-colors"
                >
                  <span className="text-on-surface text-base md:text-base">{option.label}</span>
                  <ArrowRight className="h-4 w-4 text-on-surface-variant" />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className={cn('rounded-2xl border p-5', RESULT_COPY[risk].tone)}>
              <div className="mb-3 flex items-center gap-2">
                <span className={cn('h-2.5 w-2.5 rounded-full', RESULT_COPY[risk].dot)} />
                <span className="verge-mono-label opacity-80">Итоговая оценка риска</span>
              </div>
              <h4 className="text-xl md:text-2xl font-semibold text-current mb-2">{RESULT_COPY[risk].title}</h4>
              <p className="text-sm leading-relaxed text-current/90">{RESULT_COPY[risk].body}</p>
            </div>

            <div className="grid gap-3">
              <button
                onClick={scrollToTopForm}
                className="geist-button-primary w-full justify-center"
              >
                Заказать точный аудит фасада
              </button>
              <button
                onClick={onReset}
                className="geist-button-secondary w-full justify-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Пересчитать заново
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
