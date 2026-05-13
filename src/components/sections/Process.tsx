"use client";
import { Send, Image as ImageIcon, Calculator, Factory, Wrench } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';

const PROCESS_STEPS = [
  {
    icon: Send,
    title: 'Заявка',
    description: 'Анализ фото фасада, брендбука и первичных требований.'
  },
  {
    icon: ImageIcon,
    title: '3D-макет (24ч)',
    description: 'Бесплатная визуализация конструкций на вашем объекте.'
  },
  {
    icon: Calculator,
    title: 'Смета',
    description: 'Прозрачный расчет материалов, электрики и монтажных работ.'
  },
  {
    icon: Factory,
    title: 'Производство',
    description: 'Изготовление в собственном цеху с контролем качества.'
  },
  {
    icon: Wrench,
    title: 'Монтаж',
    description: 'Чистая инсталляция и пусконаладка электрической части.'
  }
];

export default function Process() {
  const { locale } = useLanguage();
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
    <section id="process" className="py-32 bg-background relative border-b border-outline">
      <div className="section-container">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl lg:text-7xl font-headline font-black uppercase tracking-tighter leading-none text-on-surface mb-6">{t(locale, title)}<span className="text-accent">.</span></h2>
            <p className="text-on-surface-variant font-light text-lg">{t(locale, intro)}</p>
          </div>
          <div className="h-0.5 grow bg-outline mx-12 hidden md:block mb-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border border-outline">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div 
              key={index}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-10 border-r border-b border-outline hover:bg-secondary transition-colors group relative overflow-hidden"
            >
              <div className="text-6xl font-headline font-black text-on-surface/5 absolute top-4 right-6 group-hover:text-accent/10 transition-colors pointer-events-none">
                0{index + 1}
              </div>
              <div className="w-12 h-12 bg-accent/10 text-accent flex items-center justify-center mb-10 group-hover:bg-accent group-hover:text-on-accent transition-all">
                <step.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-headline font-black text-on-surface uppercase tracking-tight mb-4">{step.title}</h3>
              <p className="text-sm font-light text-on-surface-variant leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
