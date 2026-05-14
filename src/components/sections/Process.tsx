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
    description: 'Анализ фасада и брендбука. Определение рамок проекта.'
  },
  {
    icon: ImageIcon,
    time: '02',
    title: '3D-Рендеринг',
    description: 'Визуализация конструкций на объекте по нормам 902-ПП.'
  },
  {
    icon: Calculator,
    time: '03',
    title: 'Честная Смета',
    description: 'Точный расчет материалов и работ без скрытых платежей.'
  },
  {
    icon: Factory,
    time: '04',
    title: 'Производство',
    description: 'Собственный цех с контролем качества электроники.'
  },
  {
    icon: Wrench,
    time: '05',
    title: 'Монтаж & Запуск',
    description: 'Чистый монтаж, пусконаладка и гарантийные документы.'
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
      className="py-24 bg-background border-b border-outline relative overflow-hidden"
    >
      {/* Background accents - more subtle */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container max-w-[1100px] mx-auto relative z-10 px-6">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-outline/20 pb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-headline text-5xl md:text-7xl leading-[0.9] uppercase text-on-surface m-0"
          >
            {t(locale, title)}<span className="text-primary">.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-on-surface-variant font-sans text-lg md:text-xl max-w-md leading-snug md:text-right"
          >
            {t(locale, intro)}
          </motion.p>
        </header>

        <div className="relative">
          {/* Vertical Progress Line - more subtle */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-outline/15" />
          <motion.div 
            style={{ scaleY }}
            className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-primary origin-top shadow-[0_0_8px_rgba(var(--primary-rgb),0.3)]"
          />

          <div className="space-y-0">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative grid grid-cols-1 md:grid-cols-[60px_1fr_300px] items-center gap-4 py-8 md:pl-0 pl-8 border-b border-outline/5 last:border-0 hover:bg-white/[0.02] transition-all duration-300"
              >
                {/* Step Number */}
                <div className="hidden md:flex justify-start">
                  <span className="font-mono text-xl text-on-surface-variant/20 group-hover:text-primary/40 transition-colors duration-300">
                    {step.time}
                  </span>
                </div>

                {/* Step Title & Icon */}
                <div className="flex items-center gap-4">
                  <step.icon size={20} className="text-primary/60 group-hover:text-primary transition-colors duration-300 shrink-0" />
                  <h3 className="font-headline text-xl md:text-2xl uppercase tracking-tight text-on-surface group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="md:border-l md:border-outline/10 md:pl-6">
                  <p className="text-on-surface-variant/70 text-sm md:text-base leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>

  );
}
