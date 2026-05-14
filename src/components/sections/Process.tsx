"use client";
import { Send, Image as ImageIcon, Calculator, Factory, Wrench } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';
import { useRef } from 'react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';

const PROCESS_STEPS = [
  {
    icon: Send,
    time: '01',
    title: 'Заявка & Анализ',
    description: 'Анализ фото фасада, брендбука и первичных требований. Устанавливаем изначальные рамки проекта.'
  },
  {
    icon: ImageIcon,
    time: '02',
    title: '3D-макет & Рендеринг',
    description: 'Бесплатная визуализация конструкций на вашем объекте с учетом требований 902-ПП.'
  },
  {
    icon: Calculator,
    time: '03',
    title: 'Прозрачная Смета',
    description: 'Точный расчет материалов, электрики и монтажных работ. Никаких скрытых платежей.'
  },
  {
    icon: Factory,
    time: '04',
    title: 'Производство',
    description: 'Изготовление в собственном цеху с многоступенчатым контролем качества и тестированием электроники.'
  },
  {
    icon: Wrench,
    time: '05',
    title: 'Монтаж & Запуск',
    description: 'Чистая инсталляция и пусконаладка. Сдача объекта с гарантией и закрывающими документами.'
  }
];

export default function Process() {
  const { locale } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const title = {
    ru: 'Процесс',
    be: 'Працэс',
    kk: 'Процесс',
    en: 'Workflow',
    zh: '流程',
    ce: 'Процесс',
    tt: 'Процесс',
  } as const;

  const intro = {
    ru: 'От концепции до монтажа — 5 этапов безупречного исполнения.',
    be: 'Ад канцэпцыі да мантажу — 5 этапаў бездакорнага выканання.',
    kk: 'Тұжырымдамадан монтажға дейін мінсіз орындалатын 5 кезең.',
    en: 'From concept to installation: five stages of flawless execution.',
    zh: '从概念到安装，五个阶段，执行无误。',
    ce: 'Концепцехь монтаж кхаччалца бекхаман 5 этап.',
    tt: 'Концепциядән монтажга кадәр биш төгәл этап.',
  } as const;

  return (
    <section 
      id="process" 
      ref={containerRef}
      className="py-32 bg-background border-b border-outline relative overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container max-w-[1200px] mx-auto relative z-10 px-6">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-outline/30 pb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-headline text-[60px] md:text-[100px] leading-[0.8] uppercase text-on-surface m-0"
          >
            {t(locale, title)}<span className="text-primary">.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-on-surface-variant font-sans text-xl md:text-2xl max-w-md leading-snug"
          >
            {t(locale, intro)}
          </motion.p>
        </header>

        <div className="relative">
          {/* Vertical Progress Line */}
          <div className="absolute left-0 md:left-12 top-0 bottom-0 w-px bg-outline/20" />
          <motion.div 
            style={{ scaleY }}
            className="absolute left-0 md:left-12 top-0 bottom-0 w-[2px] bg-primary origin-top shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
          />

          <div className="space-y-4">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="group relative grid grid-cols-1 md:grid-cols-[100px_1fr_400px] items-start gap-8 py-16 md:pl-0 pl-8 border-b border-outline/10 last:border-0 hover:bg-primary/[0.01] transition-colors duration-500 rounded-lg"
              >
                {/* Step Number */}
                <div className="flex flex-col items-center justify-start pt-1">
                  <span className="verge-mono-label text-4xl md:text-5xl text-on-surface-variant/20 group-hover:text-primary transition-colors duration-500">
                    {step.time}
                  </span>
                </div>

                {/* Step Content */}
                <div className="space-y-6">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 border border-outline/50 flex items-center justify-center text-on-surface group-hover:border-primary/50 group-hover:bg-primary/5 group-hover:text-primary transition-all duration-500">
                      <step.icon size={24} />
                    </div>
                    <h3 className="font-headline text-3xl md:text-5xl uppercase leading-[0.9] text-on-surface group-hover:translate-x-2 transition-transform duration-500">
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <div className="md:pt-2">
                  <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Decorative glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
