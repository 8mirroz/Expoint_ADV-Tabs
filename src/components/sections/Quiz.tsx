"use client";
import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, CheckCircle2, ShieldCheck, User, Phone, Building2, LayoutTemplate, Sparkles, Network, PencilRuler, Maximize2, Hammer, Zap, CalendarDays, Clock, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';
import { MeshBackground } from '@/components/ui/MeshBackground';
import { TurnstileWidget } from '@/components/ui/TurnstileWidget';
import { Loader2 } from 'lucide-react';
import { OrderConfirmationCard } from '@/components/ui/order-confirmation-card';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Технические требования',
    options: [
      'Наружная вывеска (объемные буквы / короб)',
      'Интерьерная вывеска (ресепшн / ТЦ)',
      'Гибкий неон / Декоративная подсветка',
      'Комплексное фасадное решение'
    ]
  },
  {
    id: 2,
    question: 'Согласование и дизайн',
    options: [
      'Нет макета, нужен проект 902-ПП',
      'Макет есть, нужна проверка на нормы',
      'Интерьерная установка (без АХК)',
      'Проект согласован, нужно производство'
    ]
  },
  {
    id: 3,
    question: 'Сроки реализации',
    options: [
      'Critical (7–10 рабочих дней)',
      'Standard (до 21 рабочего дня)',
      'Strategic Planning (будущий проект)'
    ]
  }
];

const getOptionIcon = (stepIndex: number, optionIndex: number) => {
  switch (stepIndex) {
    case 0:
      switch (optionIndex) {
        case 0: return <Building2 className="w-5 h-5" />;
        case 1: return <LayoutTemplate className="w-5 h-5" />;
        case 2: return <Sparkles className="w-5 h-5" />;
        case 3: return <Network className="w-5 h-5" />;
      }
      break;
    case 1:
      switch (optionIndex) {
        case 0: return <PencilRuler className="w-5 h-5" />;
        case 1: return <ShieldCheck className="w-5 h-5" />;
        case 2: return <Maximize2 className="w-5 h-5" />;
        case 3: return <Hammer className="w-5 h-5" />;
      }
      break;
    case 2:
      switch (optionIndex) {
        case 0: return <Zap className="w-5 h-5" />;
        case 1: return <CalendarDays className="w-5 h-5" />;
        case 2: return <Clock className="w-5 h-5" />;
      }
      break;
  }
  return <CheckCircle2 className="w-5 h-5" />;
};

export default function Quiz() {
  const { locale } = useLanguage();
  const copy = {
    badge: { ru: 'Система оценки проекта', be: 'Сістэма ацэнкі праекта', kk: 'Жобаны бағалау жүйесі', en: 'Project Estimation Engine', zh: '项目评估引擎', ce: 'Проектан мах хадоран система', tt: 'Проект бәяләү системасы' },
    title: { ru: 'Расчет', be: 'Разлік', kk: 'Есеп', en: 'Calculate', zh: '计算', ce: 'Расчет', tt: 'Хисап' },
    phase: { ru: 'Этап', be: 'Этап', kk: 'Кезең', en: 'Phase', zh: '阶段', ce: 'Этап', tt: 'Этап' },
    synced: { ru: 'синхронизировано', be: 'сінхранізавана', kk: 'синхрондалды', en: 'Synchronized', zh: '已同步', ce: 'синхрондеш', tt: 'синхронлашты' },
    finalData: { ru: 'Финальные данные', be: 'Фінальныя дадзеныя', kk: 'Қорытынды деректер', en: 'Final Data Acquisition', zh: '最终数据', ce: 'Чаккхен дата', tt: 'Йомгак мәгълүматлары' },
    nameLabel: { ru: 'Имя контактного лица', be: 'Імя кантактнай асобы', kk: 'Байланыс тұлғасының аты', en: 'Authorized Personnel Name', zh: '联系人姓名', ce: 'Контактан цIе', tt: 'Контакт кешесе исеме' },
    phoneLabel: { ru: 'Телефон для связи', be: 'Тэлефон для сувязі', kk: 'Байланыс телефоны', en: 'Communication Terminal (Phone)', zh: '联系电话', ce: 'Телефон', tt: 'Элемтә телефоны' },
    submit: { ru: 'Получить расчет и 3D-визуализацию', be: 'Атрымаць разлік і 3D-візуалізацыю', kk: 'Есеп пен 3D-визуалды алу', en: 'Generate Quote & 3D Visualization', zh: '生成报价与 3D 预览', ce: 'Расчет а 3D-визуализаци а йала', tt: 'Хисап һәм 3D-визуализация алу' },
    back: { ru: 'Предыдущий этап', be: 'Папярэдні этап', kk: 'Алдыңғы кезең', en: 'Previous Phase', zh: '上一步', ce: 'Хьалхара этап', tt: 'Алдагы этап' },
    success: { ru: 'Инициализация завершена', be: 'Ініцыялізацыя завершана', kk: 'Инициализация аяқталды', en: 'Initialization Complete', zh: '初始化完成', ce: 'Инициализаци чекхъяьлла', tt: 'Инициализация тәмамланды' },
    bonus: { ru: 'Бонус разблокирован:', be: 'Бонус адкрыты:', kk: 'Бонус ашылды:', en: 'Bonus Asset Unlocked:', zh: '奖励已解锁：', ce: 'Бонус дIакхоьллина:', tt: 'Бонус ачылды:' },
    whatsapp: { ru: 'Открыть WhatsApp', be: 'Адкрыць WhatsApp', kk: 'WhatsApp ашу', en: 'Launch Direct WhatsApp Channel', zh: '打开 WhatsApp', ce: 'WhatsApp дIаайаккха', tt: 'WhatsApp ачу' },
  } as const;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState({ phone: '', name: '', email: '' });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generatedOrderId, setGeneratedOrderId] = useState('');
  const [submittedTime, setSubmittedTime] = useState('');

  const handleOptionSelect = (option: string) => {
    setAnswers(prev => ({ ...prev, [currentStep]: option }));
    if (currentStep < QUIZ_QUESTIONS.length) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 250);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!turnstileToken) {
      setError('Please complete the security check');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...contactInfo,
          context: `Quiz Answers: ${JSON.stringify(answers)}`,
          source: 'Quiz',
          consent: true,
          turnstileToken
        }),
      });

      if (response.ok) {
        setGeneratedOrderId('EXP-' + Math.floor(10000000 + Math.random() * 90000000));
        setSubmittedTime(new Date().toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }));
        setIsSubmitted(true);
      } else {
        const err = await response.json();
        setError(err.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Quiz error:', err);
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="quiz" className="section-padding bg-background relative overflow-hidden border-y border-outline/30">
      <MeshBackground opacity={0.15} />
      
      {/* Subtle blueprint grid in background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.03)_1px,transparent_1px)] bg-[size:16px_28px] opacity-40 pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-variant/80 border border-outline/50 rounded-full verge-mono-label text-[#00aa6c] font-semibold mb-6 shadow-sm">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-mono tracking-widest uppercase">{t(locale, copy.badge)}</span>
          </div>
          <h2 className="geist-display-lg text-on-surface mb-6">
            {t(locale, copy.title)}<span className="text-[#00aa6c]">.</span>
          </h2>
          <p className="text-on-surface-variant text-lg leading-[28px] max-w-2xl mx-auto font-light">Параметрический расчет стоимости и 3D-моделирование объекта.</p>
        </div>

        <div className="bg-surface border border-outline/85 relative overflow-hidden rounded-2xl shadow-premium transition-all duration-500">
          {/* Premium Glow Effect */}
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-accent/[0.03] via-transparent to-transparent opacity-20 pointer-events-none" />
          
          {/* Tech Corner Accents */}
          <div className="absolute top-0 right-0 w-6 h-6 border-r border-t border-outline pointer-events-none rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-l border-b border-outline pointer-events-none rounded-bl-2xl" />
          
          {!isSubmitted ? (
            <div className="p-8 md:p-16 relative z-10">
              <div className="mb-12">
                <div className="flex justify-between verge-mono-label text-on-surface-variant mb-4 text-xs tracking-wider uppercase font-mono">
                  <span className="font-bold">{t(locale, copy.phase)} 0{currentStep + 1} / 0{QUIZ_QUESTIONS.length + 1}</span>
                  <span className="text-[#00aa6c] font-bold">{Math.round((currentStep / (QUIZ_QUESTIONS.length + 1)) * 100)}% {t(locale, copy.synced)}</span>
                </div>
                <div className="w-full bg-outline/40 h-2 rounded-full overflow-hidden relative border border-outline/65">
                  <motion.div 
                    className="bg-[linear-gradient(90deg,var(--accent),#00D285)] h-full rounded-full shadow-[0_0_10px_rgba(0,245,160,0.2)]"
                    animate={{ width: `${((currentStep) / (QUIZ_QUESTIONS.length + 1)) * 100}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                {currentStep < QUIZ_QUESTIONS.length ? (
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 className="geist-display-sm text-on-surface mb-8 tracking-tight font-medium">
                      {QUIZ_QUESTIONS[currentStep].question}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {QUIZ_QUESTIONS[currentStep].options.map((option, idx) => {
                        const isSelected = answers[currentStep] === option;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleOptionSelect(option)}
                            className={`text-left w-full p-6 border transition-all duration-500 group rounded-xl relative overflow-hidden flex items-center gap-4
                              ${isSelected 
                                ? 'border-accent bg-accent/[0.04] shadow-[0_0_25px_rgba(0,245,160,0.06)]' 
                                : 'border-outline hover:border-accent/40 bg-surface hover:bg-surface-variant/40'}`}
                          >
                            {isSelected && (
                               <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-accent" />
                            )}
                            <div className={`p-3 rounded-lg border transition-all duration-300 shrink-0
                              ${isSelected 
                                ? 'bg-accent/15 border-accent/30 text-[#00aa6c] font-bold' 
                                : 'bg-surface-variant border-outline text-on-surface-variant group-hover:border-accent/20 group-hover:text-[#00aa6c] group-hover:bg-accent/10'}`}
                            >
                              {getOptionIcon(currentStep, idx)}
                            </div>
                            <span className={`text-sm font-bold tracking-wide transition-colors duration-300 ${isSelected ? 'text-[#00aa6c]' : 'text-on-surface-variant group-hover:text-on-surface'}`}>
                              {option}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="geist-display-sm text-on-surface mb-4 tracking-tight font-medium">{t(locale, copy.finalData)}</h3>
                    <p className="text-on-surface-variant text-base font-light mb-10">Введите данные для формирования технического задания и 3D-макета.</p>
                    
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="md:col-span-2">
                        <label className="verge-mono-label text-on-surface-variant mb-3 block text-[10px] tracking-[0.2em] uppercase font-mono font-bold">{t(locale, copy.nameLabel)}</label>
                        <div className="relative group">
                          <span className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-on-surface-variant/80 group-focus-within:text-[#00aa6c] group-hover:text-on-surface transition-colors duration-300">
                            <User className="w-5 h-5" />
                          </span>
                          <input 
                            type="text" 
                            required
                            placeholder="Имя / Название компании"
                            className="w-full bg-surface border border-outline hover:border-outline-strong/40 focus:border-accent p-5 pl-14 focus:outline-none text-on-surface font-sans text-sm transition-all duration-300 rounded-xl placeholder:text-on-surface-variant/60 focus:shadow-[0_0_20px_rgba(0,245,160,0.06)] focus:bg-surface font-medium"
                            value={contactInfo.name}
                            onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                          />
                          {/* Inner Tech Corner Accent for Premium Cyberpunk Feel */}
                          <div className="absolute right-3 bottom-3 w-1.5 h-1.5 border-r border-b border-outline pointer-events-none group-focus-within:border-accent group-hover:border-outline-strong transition-colors duration-300" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="verge-mono-label text-on-surface-variant mb-3 block text-[10px] tracking-[0.2em] uppercase font-mono font-bold">{t(locale, copy.phoneLabel)}</label>
                        <div className="relative group">
                          <span className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-on-surface-variant/80 group-focus-within:text-[#00aa6c] group-hover:text-on-surface transition-colors duration-300">
                            <Phone className="w-5 h-5" />
                          </span>
                          <input 
                            type="tel" 
                            required
                            placeholder="+7 (999) 999-99-99"
                            className="w-full bg-surface border border-outline hover:border-outline-strong/40 focus:border-accent p-5 pl-14 focus:outline-none text-on-surface font-sans text-sm transition-all duration-300 rounded-xl placeholder:text-on-surface-variant/60 focus:shadow-[0_0_20px_rgba(0,245,160,0.06)] focus:bg-surface font-medium"
                            value={contactInfo.phone}
                            onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                          />
                          {/* Inner Tech Corner Accent for Premium Cyberpunk Feel */}
                          <div className="absolute right-3 bottom-3 w-1.5 h-1.5 border-r border-b border-outline pointer-events-none group-focus-within:border-accent group-hover:border-outline-strong transition-colors duration-300" />
                        </div>
                      </div>

                      <div>
                        <label className="verge-mono-label text-on-surface-variant mb-3 block text-[10px] tracking-[0.2em] uppercase font-mono font-bold">Email для сметы и макета</label>
                        <div className="relative group">
                          <span className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-on-surface-variant/80 group-focus-within:text-[#00aa6c] group-hover:text-on-surface transition-colors duration-300">
                            <Mail className="w-5 h-5" />
                          </span>
                          <input 
                            type="email" 
                            required
                            placeholder="your@email.com"
                            className="w-full bg-surface border border-outline hover:border-outline-strong/40 focus:border-accent p-5 pl-14 focus:outline-none text-on-surface font-sans text-sm transition-all duration-300 rounded-xl placeholder:text-on-surface-variant/60 focus:shadow-[0_0_20px_rgba(0,245,160,0.06)] focus:bg-surface font-medium"
                            value={contactInfo.email}
                            onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                          />
                          {/* Inner Tech Corner Accent for Premium Cyberpunk Feel */}
                          <div className="absolute right-3 bottom-3 w-1.5 h-1.5 border-r border-b border-outline pointer-events-none group-focus-within:border-accent group-hover:border-outline-strong transition-colors duration-300" />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <TurnstileWidget onVerify={setTurnstileToken} />
                      </div>

                      {error && (
                        <div className="md:col-span-2 p-4 bg-error/10 border border-error/20 text-error text-xs font-bold uppercase tracking-wider text-center rounded-xl">
                          ОШИБКА: {error}
                        </div>
                      )}

                      <div className="md:col-span-2">
                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-accent text-black font-bold uppercase tracking-widest text-xs px-8 py-5 rounded-full hover:bg-accent/90 hover:shadow-[0_0_25px_rgba(0,245,160,0.4)] hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 inline-flex items-center justify-center gap-4 group"
                        >
                          {isSubmitting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <>
                              {t(locale, copy.submit)}
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {currentStep > 0 && (
                <button 
                  onClick={handleBack}
                  className="mt-12 verge-mono-label text-on-surface-variant hover:text-[#00aa6c] flex items-center gap-2 transition-colors duration-300 text-xs tracking-wider uppercase font-mono font-bold animate-fade-in"
                >
                  <ArrowLeft className="w-4 h-4" /> {t(locale, copy.back)}
                </button>
              )}
            </div>
          ) : (
            <div className="p-6 sm:p-12 flex items-center justify-center min-h-[500px] relative z-10 w-full animate-fade-in">
          <OrderConfirmationCard
          orderId={generatedOrderId}
          paymentMethod={answers[0] || "Комплексный расчет"}
          dateTime={submittedTime}
          totalAmount="Бесплатный расчет"
          onGoToAccount={() => window.open("https://wa.me/74950000000", "_blank")}
          title="Расчет успешно запущен"
          buttonText="Активировать 3D-макет в WhatsApp"
          details={[
          { label: "Номер заявки", value: generatedOrderId },
          { label: "Тип конструкции", value: answers[0] || "Комплексное решение" },
           { label: "Дизайн и АХК", value: answers[1] || "Проверка на нормы" },
              { label: "Сроки проекта", value: answers[2] || "Стандартные" },
                 { label: "Статус расчета", value: "В разработке (15 мин)", isBold: true },
                ]}
                className="mx-auto border-outline bg-surface shadow-premium"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
