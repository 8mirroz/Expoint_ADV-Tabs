'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Minus, Plus, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Utility for classes since clsx is missing in dependencies
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

export interface Plan {
  title: string;
  monthlyPrice: number;
  annuallyPrice: number;
  desc: string;
  features: string[];
  buttonText: string;
  isRecommended?: boolean;
  isPremium?: boolean;
}

const DEFAULT_PLANS: Plan[] = [
  {
    title: "Starter",
    monthlyPrice: 12000,
    annuallyPrice: Math.round(12000 * 12 * 0.8),
    desc: "Базовое обслуживание и поддержка одной локации",
    features: [
      "Плановый осмотр раз в месяц",
      "Замена блоков питания",
      "Чистка световых панелей",
      "Консультации 24/7",
    ],
    buttonText: "Выбрать Lite",
  },
  {
    title: "Professional",
    monthlyPrice: 28000,
    annuallyPrice: Math.round(28000 * 12 * 0.8),
    desc: "Полная техническая поддержка рекламной сети",
    features: [
      "2 плановых выезда в месяц",
      "Замена диодов включена",
      "Мойка вывесок 2 раза в год",
      "Гарантия на работы 2 года",
    ],
    buttonText: "Выбрать Standard",
    isRecommended: true,
  },
  {
    title: "Enterprise",
    monthlyPrice: 55000,
    annuallyPrice: Math.round(55000 * 12 * 0.8),
    desc: "Индивидуальный сервис для крупных сетей",
    features: [
      "Персональный менеджер",
      "Выезд в течение 4 часов",
      "Все запчасти включены",
      "Мониторинг энергопотребления",
    ],
    buttonText: "Связаться",
    isPremium: true,
  }
];

interface DirectionPricingProps {
  plans?: Plan[];
  title?: string;
  subtitle?: string;
}

export function DirectionPricing({ 
  plans = DEFAULT_PLANS,
  title = "Тарифы на обслуживание",
  subtitle = "Масштабируемые решения для поддержки вашего бренда"
}: DirectionPricingProps) {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [locations, setLocations] = useState(1);

  return (
    <div className="w-full bg-canvas section-padding px-4 border-t border-outline/10">
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <h2 className="text-3xl lg:text-5xl font-headline font-black uppercase tracking-tighter text-on-surface mb-6">
          {title}<span className="text-accent">.</span>
        </h2>
        <p className="text-on-surface-variant font-light text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
        <div className="flex p-1 bg-surface border border-outline rounded-full shadow-inner">
          <button
            onClick={() => setBilling('annual')}
            className={cn(
              "px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300",
              billing === 'annual' ? "bg-accent text-on-accent shadow-neon" : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            Год (Выгода 20%)
          </button>
          <button
            onClick={() => setBilling('monthly')}
            className={cn(
              "px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300",
              billing === 'monthly' ? "bg-accent text-on-accent shadow-neon" : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            Месяц
          </button>
        </div>

        <div className="flex items-center gap-6 bg-surface border border-outline rounded-full px-6 py-2 shadow-inner">
          <span className="text-xs font-black uppercase tracking-widest text-on-surface-variant">Локации:</span>
          <div className="flex items-center gap-4">
            <button 
                onClick={() => setLocations(Math.max(1, locations - 1))}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-outline hover:border-accent hover:text-accent transition-all duration-300 active:scale-90"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="min-w-[30px] text-center font-manuka text-3xl text-on-surface leading-none">{locations}</span>
            <button 
                onClick={() => setLocations(locations + 1)}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-outline hover:border-accent hover:text-accent transition-all duration-300 active:scale-90"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
        {plans.map((plan) => (
          <PlanCard key={plan.title} plan={plan} billing={billing} count={locations} />
        ))}
      </div>
    </div>
  );
}

function PlanCard({ plan, billing, count }: { plan: Plan, billing: 'monthly' | 'annual', count: number }) {
  const price = billing === 'annual' ? plan.annuallyPrice : plan.monthlyPrice;
  const totalPrice = price * count;

  return (
    <div className={cn(
      "group relative flex flex-col p-12 border transition-all duration-700 h-full",
      plan.isRecommended 
        ? "bg-secondary border-accent shadow-[0_0_60px_-15px_rgba(111,255,233,0.15)] z-10" 
        : "bg-surface border-outline hover:border-accent/40"
    )}>
      {/* Background Glow for Premium */}
      {plan.isPremium && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 blur-[100px] -z-10 group-hover:bg-accent/10 transition-colors duration-700" />
      )}

      {/* Recommended Tag */}
      {plan.isRecommended && (
        <div className="absolute -top-4 left-12 bg-accent text-on-accent text-[9px] font-black px-5 py-2.5 uppercase tracking-[0.2em] shadow-neon">
          Рекомендуем
        </div>
      )}

      <div className="mb-12">
        <span className="text-xs font-black uppercase tracking-[0.4em] text-on-surface-variant mb-6 block">
          {plan.title}
        </span>
        
        <div className="flex items-baseline gap-2 mb-4 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span 
                key={totalPrice}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-5xl lg:text-6xl font-manuka font-black text-on-surface"
            >
                {totalPrice.toLocaleString('ru-RU')}
            </motion.span>
          </AnimatePresence>
          <span className="text-accent font-polysans text-xl">₽</span>
        </div>
        
        <div className="flex items-center gap-2 mb-8">
            <span className="text-on-surface-variant font-light text-xs uppercase tracking-widest">
                / {billing === 'annual' ? 'в год' : 'в месяц'}
            </span>
            <div className="h-px grow bg-outline/10" />
        </div>

        <p className="text-sm font-light text-on-surface-variant leading-relaxed min-h-[3rem]">
          {plan.desc}
        </p>
      </div>

      <div className="flex-1 mb-12">
        <ul className="space-y-5">
          {plan.features.map((feature: string, idx: number) => (
            <li key={idx} className="flex items-start gap-4">
              <div className="w-5 h-5 rounded-full border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-accent" />
              </div>
              <span className="text-xs font-light text-on-surface-variant leading-relaxed">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Button 
        variant={plan.isRecommended ? 'primary' : 'outline'} 
        size="lg"
        className="w-full group/btn"
      >
        <span className="flex items-center gap-3">
            {plan.buttonText}
            {plan.isRecommended && <Zap className="w-4 h-4 fill-current" />}
        </span>
      </Button>
      
      <div className="mt-6 h-4 overflow-hidden">
        <AnimatePresence mode="wait">
            <motion.p
            key={billing}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-[9px] text-center text-on-surface-variant/30 uppercase tracking-[0.2em]"
            >
            {billing === 'monthly' ? 'Ежемесячное списание' : 'Оплата одним платежом'}
            </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
