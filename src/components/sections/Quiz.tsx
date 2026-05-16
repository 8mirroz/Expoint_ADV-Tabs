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
    <section id="quiz" className="section-padding bg-background relative overflow-hidden border-y border-outline">
      <MeshBackground opacity={0.1} />
      
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface border border-outline rounded-full verge-mono-label text-primary mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span>{t(locale, copy.badge)}</span>
          </div>
          <h2 className="geist-display-lg text-on-surface mb-6">
            {t(locale, copy.title)}<span className="text-primary">.</span>
          </h2>
          <p className="text-on-surface-variant text-lg leading-[28px] max-w-2xl mx-auto">Параметрический расчет стоимости и 3D-моделирование объекта.</p>
        </div>

        <div className="bg-surface border border-outline overflow-hidden rounded-2xl shadow-elevation-1">
          {!isSubmitted ? (
            <div className="p-8 md:p-16">
              <div className="mb-12">
                <div className="flex justify-between verge-mono-label text-on-surface-variant mb-4">
                  <span className="font-bold">{t(locale, copy.phase)} 0{currentStep + 1} / 0{QUIZ_QUESTIONS.length + 1}</span>
                  <span className="text-primary">{Math.round((currentStep / (QUIZ_QUESTIONS.length + 1)) * 100)}% {t(locale, copy.synced)}</span>
                </div>
                <div className="w-full bg-outline h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    className="bg-primary h-full"
                    animate={{ width: `${((currentStep) / (QUIZ_QUESTIONS.length + 1)) * 100}%` }}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                {currentStep < QUIZ_QUESTIONS.length ? (
                  <motion.div
                    key={currentStep}
                    initial={false}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 className="geist-display-sm text-on-surface mb-8">
                      {QUIZ_QUESTIONS[currentStep].question}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {QUIZ_QUESTIONS[currentStep].options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(option)}
                          className={`text-left w-full p-6 border transition-all duration-300 group rounded-xl
                            ${answers[currentStep] === option 
                              ? 'border-primary bg-primary/5 shadow-sm' 
                              : 'border-outline hover:border-primary/20 bg-surface'}`}
                        >
                          <span className={`text-base font-medium transition-colors ${answers[currentStep] === option ? 'text-primary' : 'text-on-surface-variant'}`}>{option}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="contact"
                    initial={false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="geist-display-sm text-on-surface mb-4">{t(locale, copy.finalData)}</h3>
                    <p className="text-on-surface-variant text-base font-light mb-10">Введите данные для формирования технического задания и 3D-макета.</p>
                    
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="verge-mono-label text-on-surface-variant mb-2 block">{t(locale, copy.nameLabel)}</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Имя / Компания"
                          className="w-full bg-surface border border-outline p-5 focus:outline-none focus:border-primary text-on-surface font-sans text-base transition-all rounded-xl"
                          value={contactInfo.name}
                          onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="verge-mono-label text-on-surface-variant mb-2 block">{t(locale, copy.phoneLabel)}</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="+7 (___) ___-__-__"
                          className="w-full bg-surface border border-outline p-5 focus:outline-none focus:border-primary text-on-surface font-sans text-base transition-all rounded-xl"
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
                          className="geist-button-primary w-full justify-center gap-4 group disabled:opacity-50"
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
                  className="mt-12 verge-mono-label text-on-surface-variant hover:text-primary flex items-center gap-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> {t(locale, copy.back)}
                </button>
              )}
            </div>
          ) : (
             <motion.div
                initial={false}
                animate={{ opacity: 1, scale: 1 }}
                className="p-16 text-center flex flex-col items-center justify-center min-h-[500px]"
             >
                <div className="w-20 h-20 bg-primary/5 border border-primary/20 rounded-full flex items-center justify-center mb-8">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="geist-display-md text-on-surface mb-4">{t(locale, copy.success)}</h3>
                <p className="text-on-surface-variant text-lg font-light max-w-md mx-auto mb-12">
                  Инженерный отдел получил ваши данные. Предварительный расчет будет готов в течение 15 минут.
                </p>
                <div className="border border-outline p-8 max-w-md mx-auto bg-surface rounded-2xl">
                   <p className="verge-mono-label text-primary mb-4">{t(locale, copy.bonus)}</p>
                   <p className="text-base font-light text-on-surface-variant mb-8">Пришлите фото фасада в WhatsApp, и мы активируем приоритетное 3D-моделирование.</p>
                   <a
                     href="https://wa.me/74950000000"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="geist-button-primary w-full justify-center"
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
