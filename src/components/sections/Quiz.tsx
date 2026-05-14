"use client";
import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';

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
  const [contactInfo, setContactInfo] = useState({ phone: '', name: '' });

  const handleOptionSelect = (option: string) => {
    setAnswers(prev => ({ ...prev, [currentStep]: option }));
    if (currentStep < QUIZ_QUESTIONS.length) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 250);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="quiz" className="py-32 bg-secondary relative overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 industrial-grid opacity-5 pointer-events-none" />
      
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span>{t(locale, copy.badge)}</span>
          </div>
          <h2 className="text-4xl lg:text-7xl font-headline font-black uppercase tracking-tighter leading-[0.8] text-white mb-6">
            {t(locale, copy.title)}<span className="text-accent">.</span>
          </h2>
          <p className="text-on-surface-variant font-light text-lg">Параметрический расчет стоимости и 3D-моделирование объекта.</p>
        </div>

        <div className="glass-panel border border-white/10 overflow-hidden shadow-premium">
          {!isSubmitted ? (
            <div className="p-8 md:p-16">
              <div className="mb-12">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-4">
                  <span className="text-slate-500">{t(locale, copy.phase)} 0{currentStep + 1} / 0{QUIZ_QUESTIONS.length + 1}</span>
                  <span className="text-accent">{Math.round((currentStep / (QUIZ_QUESTIONS.length + 1)) * 100)}% {t(locale, copy.synced)}</span>
                </div>
                <div className="w-full bg-white/5 h-1 overflow-hidden">
                  <motion.div 
                    className="bg-accent h-full shadow-[0_0_10px_rgba(255,102,0,0.8)]"
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
                    <h3 className="text-2xl font-headline font-black text-white uppercase tracking-tight mb-8">
                      {QUIZ_QUESTIONS[currentStep].question}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {QUIZ_QUESTIONS[currentStep].options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(option)}
                          className={`text-left w-full p-6 border transition-all duration-300 group
                            ${answers[currentStep] === option 
                              ? 'border-accent bg-accent/10' 
                              : 'border-white/5 hover:border-white/20 bg-white/2'}`}
                        >
                          <span className={`text-sm font-light transition-colors ${answers[currentStep] === option ? 'text-white' : 'text-on-surface-variant'}`}>{option}</span>
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
                    <h3 className="text-2xl font-headline font-black text-white uppercase tracking-tight mb-4">{t(locale, copy.finalData)}</h3>
                    <p className="text-on-surface-variant text-sm font-light mb-10">Введите данные для формирования технического задания и 3D-макета.</p>
                    
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">{t(locale, copy.nameLabel)}</label>
                        <input 
                          type="text" 
                          required
                          placeholder="IDENTIFY YOURSELF"
                          className="w-full bg-white/3 border border-white/10 p-5 focus:outline-none focus:border-accent text-white font-mono text-sm transition-all"
                          value={contactInfo.name}
                          onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">{t(locale, copy.phoneLabel)}</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="+7 (___) ___-__-__"
                          className="w-full bg-white/3 border border-white/10 p-5 focus:outline-none focus:border-accent text-white font-mono text-sm transition-all"
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <button 
                          type="submit"
                          className="w-full bg-accent hover:bg-white text-white hover:text-secondary font-black uppercase tracking-widest text-xs p-6 transition-all shadow-premium flex justify-center items-center gap-4"
                        >
                          {t(locale, copy.submit)}
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {currentStep > 0 && (
                <button 
                  onClick={handleBack}
                  className="mt-12 text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:text-accent flex items-center gap-2 transition-colors"
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
                <div className="w-20 h-20 bg-accent/10 border border-accent/20 flex items-center justify-center mb-8">
                  <CheckCircle2 className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-4xl font-headline font-black text-white uppercase tracking-tighter mb-4">{t(locale, copy.success)}</h3>
                <p className="text-on-surface-variant text-base font-light max-w-md mx-auto mb-12">
                  Инженерный отдел получил ваши данные. Предварительный расчет будет готов в течение 15 минут.
                </p>
                <div className="border border-white/5 p-8 max-w-md mx-auto bg-white/1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-4">{t(locale, copy.bonus)}</p>
                   <p className="text-sm font-light text-on-surface-variant mb-8">Пришлите фото фасада в WhatsApp, и мы активируем приоритетное 3D-моделирование.</p>
                   <a
                     href="https://wa.me/74950000000"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="w-full bg-white text-secondary hover:bg-accent hover:text-white font-black uppercase tracking-widest text-[10px] py-5 px-8 transition-all block"
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
