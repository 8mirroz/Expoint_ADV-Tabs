"use client";
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
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

interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
  items?: FAQItem[];
  titleText?: string;
  introText?: string;
}

export default function FAQ({ items = FAQS, titleText, introText }: FAQProps) {
  const { locale } = useLanguage();
  const title = {
    ru: 'Часто Задаваемые Вопросы',
    be: 'Пытанні',
    kk: 'Сұрақтар',
    en: 'Questions',
    zh: '问题',
    ce: 'Хаттар',
    tt: 'Сораулар',
  } as const;
  const intro = {
    ru: 'Инженерные регламенты, юридические согласования, сроки службы изделий и спецификации материалов.',
    be: 'Тэхнічныя падрабязнасці і рэгламенты вытворчасці.',
    kk: 'Техникалық мәліметтер мен өндіріс регламенттері.',
    en: 'Technical details and production regulations.',
    zh: '技术细节与生产规范。',
    ce: 'Техникан деталаш а кхолламан регламентанаш а.',
    tt: 'Техник нечкәлекләр һәм җитештерү регламентлары.',
  } as const;
  
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="section-padding bg-black relative border-t border-white/5">
      <div className="section-container max-w-4xl px-6">
        <div className="space-y-12">
          
          <div className="text-center space-y-4">
            <span className="verge-kicker text-accent">FAQS & COMPLIANCE</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl text-white font-black uppercase tracking-tight text-balance leading-tight title-hover-group">
              <span className="title-hover-gradient">{titleText ?? t(locale, title)}</span>
            </h2>
            <p className="text-sm md:text-base text-neutral-500 max-w-2xl mx-auto leading-relaxed">
              {introText ?? t(locale, intro)}
            </p>
          </div>

          <div className="space-y-4">
            {items.map((faq, index) => {
              const isOpen = openIdx === index;
              return (
                <div 
                  key={index}
                  className="group/faq border border-white/5 bg-white/[0.01] rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent/30 hover:bg-white/[0.02]"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : index)}
                    className="w-full text-left p-6 md:p-8 flex justify-between items-center gap-6 cursor-pointer focus:outline-none"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">
                        SYS // FAQ_0{index + 1}
                      </span>
                      <h3 className="text-lg md:text-xl font-bold text-white/95 leading-snug group-hover/faq:text-accent transition-colors duration-300">
                        {faq.q}
                      </h3>
                    </div>
                    <div className="shrink-0 w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white transition-all duration-300 group-hover/faq:border-accent/30 group-hover/faq:shadow-[0_0_15px_rgba(0,255,163,0.15)] group-hover/faq:bg-accent/5">
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent' : ''}`} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-6 md:px-8 pb-8 pt-2 border-t border-white/5 text-base text-neutral-400 leading-relaxed font-light">
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
      </div>
      
      {/* Background ambient grids */}
      <div className="absolute inset-0 z-0 industrial-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(0,255,163,0.02),transparent_70%)] pointer-events-none" />
    </section>
  );
}
