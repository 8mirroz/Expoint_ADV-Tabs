"use client";
import React, { useState } from 'react';
import { PlusSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';

const FAQS = [
  {
    q: 'А что если вывеску не разрешат?',
    a: 'Мы проводим аудит вашего фасада на соответствие 902-ПП (или дизайн-коду Московской области) еще до начала производства. Если есть риск отказа, мы сразу предлагаем альтернативные варианты, которые 100% пройдут согласование.'
  },
  {
    q: 'Есть ли гарантия на электрику?',
    a: 'Да. Мы используем только проверенные светодиодные модули и герметичные блоки питания (IP67). На электрику по тарифу Business даем гарантию 3 года. Если перегорит буква — приедем и заменим бесплатно.'
  },
  {
    q: 'Сколько времени занимает производство?',
    a: 'Стандартный срок производства лайтбокса или объемных букв — 7 рабочих дней с момента согласования макета. Сложные конструкции могут занимать до 14 дней. Неон изготавливаем за 3-5 дней.'
  },
  {
    q: 'Делаете ли вы монтаж на высоте (автовышка)?',
    a: 'Да, у нас есть собственные монтажные бригады и доступ к спецтехнике (автовышки, леса). Мы осуществляем монтаж любой сложности, включая крышные установки и работы альпинистов.'
  }
];

export default function FAQ() {
  const { locale } = useLanguage();
  const title = {
    ru: 'Вопросы',
    be: 'Пытанні',
    kk: 'Сұрақтар',
    en: 'Questions',
    zh: '问题',
    ce: 'Хаттар',
    tt: 'Сораулар',
  } as const;
  const intro = {
    ru: 'Технические подробности и регламенты производства.',
    be: 'Тэхнічныя падрабязнасці і рэгламенты вытворчасці.',
    kk: 'Техникалық мәліметтер мен өндіріс регламенттері.',
    en: 'Technical details and production regulations.',
    zh: '技术细节与生产规范。',
    ce: 'Техникан деталаш а кхолламан регламентанаш а.',
    tt: 'Техник нечкәлекләр һәм җитештерү регламентлары.',
  } as const;
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="section-padding bg-secondary relative border-t border-outline">
      <div className="section-container">
        <div className="mb-24">
          <h2 className="text-4xl lg:text-7xl font-headline font-black uppercase tracking-tighter leading-[0.8] text-on-surface">{t(locale, title)}<span className="text-accent">.</span></h2>
          <p className="text-on-surface-variant font-light text-lg mt-6">{t(locale, intro)}</p>
        </div>

        <div className="space-y-0 border-t border-outline">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className={`border-b border-outline transition-all duration-500 overflow-hidden ${isOpen ? 'bg-surface shadow-premium z-10 relative' : ''}`}
              >
                <button
                  className="w-full px-0 py-8 text-left flex justify-between items-center focus:outline-none group"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                >
                  <span className={`font-headline font-black text-xl md:text-2xl uppercase tracking-tight transition-colors px-4 ${isOpen ? 'text-accent' : 'text-on-surface group-hover:text-accent'}`}>
                    {faq.q}
                  </span>
                  <div className={`w-10 h-10 border flex items-center justify-center transition-all duration-500 mr-4 ${isOpen ? 'border-accent bg-accent text-on-accent rotate-45' : 'border-outline text-on-surface'}`}>
                    <PlusSquare className="w-5 h-5" />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="pb-10 px-4 text-on-surface-variant text-base font-light leading-relaxed max-w-3xl">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
