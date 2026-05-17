"use client";
import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';
import { MeshBackground } from '@/components/ui/MeshBackground';
import { TurnstileWidget } from '@/components/ui/TurnstileWidget';
import { Loader2 } from 'lucide-react';

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
  const [contactInfo, setContactInfo] = useState({ phone: '', name: '' });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
          turnstileToken
        }),
      });

      if (response.ok) {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-variant/80 border border-outline/50 rounded-full verge-mono-label text-accent mb-6 shadow-sm">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-mono tracking-widest uppercase">{t(locale, copy.badge)}</span>
          </div>
          <h2 className="geist-display-lg text-white mb-6">
            {t(locale, copy.title)}<span className="text-accent">.</span>
          </h2>
          <p className="text-neutral-400 text-lg leading-[28px] max-w-2xl mx-auto font-light">Параметрический расчет стоимости и 3D-моделирование объекта.</p>
        </div>

        <div className="bg-surface/10 backdrop-blur-md border border-outline/30 relative overflow-hidden rounded-2xl shadow-xl hover:shadow-[0_0_40px_rgba(0,245,160,0.03)] transition-all duration-700">
          {/* Premium Glow Effect */}
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-30 pointer-events-none" />
          
          {/* Tech Corner Accents */}
          <div className="absolute top-0 right-0 w-6 h-6 border-r border-t border-outline/30 pointer-events-none rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-l border-b border-outline/30 pointer-events-none rounded-bl-2xl" />
          
          {!isSubmitted ? (
            <div className="p-8 md:p-16 relative z-10">
              <div className="mb-12">
                <div className="flex justify-between verge-mono-label text-neutral-200 mb-4 text-xs tracking-wider uppercase font-mono">
                  <span className="font-bold">{t(locale, copy.phase)} 0{currentStep + 1} / 0{QUIZ_QUESTIONS.length + 1}</span>
                  <span className="text-accent font-bold">{Math.round((currentStep / (QUIZ_QUESTIONS.length + 1)) * 100)}% {t(locale, copy.synced)}</span>
                </div>
                <div className="w-full bg-outline/10 h-2 rounded-full overflow-hidden relative border border-outline/20">
                  <motion.div 
                    className="bg-accent h-full rounded-full shadow-[0_0_10px_rgba(0,245,160,0.5)]"
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
                    <h3 className="geist-display-sm text-white mb-8 tracking-tight font-medium">
                      {QUIZ_QUESTIONS[currentStep].question}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {QUIZ_QUESTIONS[currentStep].options.map((option, idx) => {
                        const isSelected = answers[currentStep] === option;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleOptionSelect(option)}
                            className={`text-left w-full p-6 border transition-all duration-500 group rounded-xl relative overflow-hidden
                              ${isSelected 
                                ? 'border-accent bg-accent/5 shadow-[0_0_20px_rgba(0,245,160,0.06)]' 
                                : 'border-outline/35 hover:border-accent/40 bg-surface/10 hover:bg-surface/20'}`}
                          >
                            {isSelected && (
                               <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-accent" />
                            )}
                            <span className={`text-sm font-bold tracking-wide transition-colors duration-300 ${isSelected ? 'text-accent' : 'text-neutral-300 group-hover:text-white'}`}>
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
                    <h3 className="geist-display-sm text-white mb-4 tracking-tight font-medium">{t(locale, copy.finalData)}</h3>
                    <p className="text-neutral-300 text-base font-light mb-10">Введите данные для формирования технического задания и 3D-макета.</p>
                    
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="verge-mono-label text-neutral-200 mb-2 block text-xs tracking-wider uppercase font-mono font-medium">{t(locale, copy.nameLabel)}</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Имя / Компания"
                          className="w-full bg-surface/10 border border-outline/35 focus:border-accent/60 p-5 focus:outline-none text-white font-sans text-sm transition-all duration-300 rounded-xl placeholder:text-neutral-400 focus:shadow-[0_0_20px_rgba(0,245,160,0.06)]"
                          value={contactInfo.name}
                          onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="verge-mono-label text-neutral-200 mb-2 block text-xs tracking-wider uppercase font-mono font-medium">{t(locale, copy.phoneLabel)}</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="+7 (___) ___-__-__"
                          className="w-full bg-surface/10 border border-outline/35 focus:border-accent/60 p-5 focus:outline-none text-white font-sans text-sm transition-all duration-300 rounded-xl placeholder:text-neutral-400 focus:shadow-[0_0_20px_rgba(0,245,160,0.06)]"
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <TurnstileWidget onVerify={setTurnstileToken} />
                      </div>

                      {error && (
                        <div className="md:col-span-2 p-4 bg-error/10 border border-error/20 text-error text-xs font-bold uppercase tracking-wider text-center rounded-xl">
                          {error}
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
                  className="mt-12 verge-mono-label text-neutral-400 hover:text-accent flex items-center gap-2 transition-colors duration-300 text-xs tracking-wider uppercase font-mono"
                >
                  <ArrowLeft className="w-4 h-4" /> {t(locale, copy.back)}
                </button>
              )}
            </div>
          ) : (
             <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-16 text-center flex flex-col items-center justify-center min-h-[500px] relative z-10"
             >
                <div className="w-20 h-20 bg-accent/5 border border-accent/20 rounded-2xl flex items-center justify-center mb-8 relative group-hover:scale-115 transition-all duration-500 shadow-[0_0_20px_rgba(0,245,160,0.1)]">
                  <CheckCircle2 className="w-9 h-9 text-accent" />
                </div>
                <h3 className="geist-display-md text-white mb-4 tracking-tight">{t(locale, copy.success)}</h3>
                <p className="text-neutral-400 text-lg font-light max-w-md mx-auto mb-12">
                  Инженерный отдел получил ваши данные. Предварительный расчет будет готов в течение 15 минут.
                </p>
                <div className="border border-outline/35 p-8 max-w-md mx-auto bg-surface/20 backdrop-blur-md rounded-2xl relative shadow-[0_0_30px_rgba(0,245,160,0.02)]">
                   <p className="verge-mono-label text-accent mb-4 text-xs tracking-wider uppercase font-mono font-bold">{t(locale, copy.bonus)}</p>
                   <p className="text-base font-light text-neutral-300 mb-8">Пришлите фото фасада в WhatsApp, и мы активируем приоритетное 3D-моделирование.</p>
                   <a
                     href="https://wa.me/74950000000"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="w-full bg-accent text-black font-bold uppercase tracking-widest text-xs px-8 py-5 rounded-full hover:bg-accent/90 hover:shadow-[0_0_25px_rgba(0,245,160,0.4)] hover:scale-[1.01] transition-all duration-300 inline-flex items-center justify-center"
                   >
                     {t(locale, copy.whatsapp)}
                   </a>
                </div>
             </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
