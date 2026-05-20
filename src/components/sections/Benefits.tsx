"use client";

"use client";

import { motion } from 'motion/react';
import { FileCheck, Hammer, Palette, Ruler, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { SegmentData } from '@/data/segments';
import { t } from '@/i18n/site';

const STEPS = [
  {
    icon: Ruler,
    title: 'Заявка',
    text: 'Вы присылаете фото фасада или брендбук.',
    tag: '01 INPUT'
  },
  {
    icon: Palette,
    title: 'AI предпросмотр',
    text: 'Делаем фотопривязку вывески на вашем объекте за 24 часа бесплатно.',
    tag: '02 VISION'
  },
  {
    icon: FileCheck,
    title: 'Смета',
    text: 'Даем прозрачный расчет (материалы + электрика + монтаж).',
    tag: '03 MATH'
  },
  {
    icon: Hammer,
    title: 'Производство',
    text: 'Собственный цех в Москве, контроль на каждом этапе.',
    tag: '04 BUILD'
  },
  {
    icon: ShieldCheck,
    title: 'Монтаж',
    text: 'Устанавливаем, подключаем, убираем мусор.',
    tag: '05 DEPLOY'
  }
];

export default function BenefitsAndWorkflow({ segment }: { segment?: SegmentData }) {
  const { locale } = useLanguage();

  return (
    <>
      <section className="section-padding bg-secondary relative overflow-hidden border-y border-outline">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 transform -skew-x-12 translate-x-32 pointer-events-none"></div>
        <div className="section-container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-5xl lg:text-7xl font-headline font-black uppercase tracking-tighter leading-none mb-10 text-on-surface">
              Согласование <br/><span className="text-on-surface-variant/60">без компромиссов.</span>
            </h2>
            <p className="text-xl font-light text-on-surface-variant leading-relaxed mb-12 max-w-xl">
              В Москве действуют жесткие регламенты 902-ПП. Мы проводим предварительный аудит вашего фасада, гарантируя соответствие архитектурному коду города до начала производства.
            </p>
            <Button size="lg" className="group bg-on-surface text-surface hover:bg-accent hover:text-on-accent border-none shadow-premium">
              <ShieldCheck className="w-5 h-5 mr-3 group-hover:scale-110 group-hover:translate-x-[-1px] transition-transform" />
              {locale === 'ru' ? 'Проверить объект на соответствие' : locale === 'en' ? 'Check Property Compliance' : 'Проверить объект на соответствие'}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {segment ? segment.benefits.map((benefit, i) => (
              <Card key={i} className="p-10 bg-surface border-outline shadow-premium">
                <div className="flex gap-8 items-start">
                   <div className="w-14 h-14 border border-accent/20 flex items-center justify-center shrink-0">
                      <div className="w-3 h-3 bg-accent shadow-neon"></div>
                   </div>
                     <div>
                       <p className="font-headline font-black text-on-surface uppercase tracking-wider text-base mb-3">{t(locale, benefit.title)}</p>
                     <p className="text-on-surface-variant text-sm font-light leading-relaxed">{t(locale, benefit.description)}</p>
                     </div>
                  </div>
                </Card>
            )) : (
              <>
                <Card className="p-10 bg-surface border-outline shadow-premium">
                  <div className="flex gap-8 items-start">
                     <div className="w-14 h-14 border border-accent/20 flex items-center justify-center shrink-0">
                       <div className="w-3 h-3 bg-accent shadow-neon"></div>
                     </div>
                     <div>
                       <p className="font-headline font-black text-on-surface uppercase tracking-wider text-base mb-3">{locale === 'ru' ? 'Снижение правовых рисков' : locale === 'en' ? 'Legal Risk Mitigation' : 'Снижение правовых рисков'}</p>
                       <p className="text-on-surface-variant text-sm font-light leading-relaxed">Исключаем штрафы до 500 000 ₽ через точное соблюдение архитектурных границ и дизайн-кода.</p>
                     </div>
                  </div>
                </Card>

                <Card className="p-10 bg-surface/50 border-outline shadow-sm">
                  <div className="flex gap-8 items-start">
                     <div className="w-14 h-14 border border-outline flex items-center justify-center shrink-0">
                       <div className="w-3 h-3 bg-on-surface/20"></div>
                     </div>
                     <div>
                       <p className="font-headline font-black text-on-surface uppercase tracking-wider text-base mb-3">{locale === 'ru' ? 'Архитектурная целостность' : locale === 'en' ? 'Architectural Integrity' : 'Архитектурная целостность'}</p>
                       <p className="text-on-surface-variant text-sm font-light leading-relaxed">Сохраняем эстетику здания, интегрируя рекламные конструкции как часть фасадного решения.</p>
                     </div>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface relative border-b border-outline">
        <div className="section-container">
          <div className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-2xl">
              <h2 className="text-5xl lg:text-8xl font-headline font-black uppercase tracking-tighter leading-none text-on-surface mb-8">{locale === 'ru' ? 'Процесс' : locale === 'en' ? 'Workflow' : 'Процесс'}<span className="text-accent">.</span></h2>
              <p className="text-on-surface-variant font-light text-xl tracking-tight">{locale === 'ru' ? 'От концепции до инсталляции — 5 этапов безупречного исполнения.' : locale === 'en' ? 'From concept to installation: five stages of flawless execution.' : 'От концепции до инсталляции — 5 этапов безупречного исполнения.'}</p>
            </div>
            <div className="h-px grow bg-outline mx-12 hidden md:block mb-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border-l border-t border-outline">
            {STEPS.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-10 border-r border-b border-outline hover:bg-accent/5 transition-all group relative overflow-hidden"
              >
                <div className="text-8xl font-headline font-black text-on-surface/3 absolute -bottom-4 -right-4 group-hover:text-accent/10 transition-colors select-none">
                  0{index + 1}
                </div>
                <div className="w-14 h-14 bg-secondary text-on-surface flex items-center justify-center mb-10 group-hover:bg-accent group-hover:text-on-accent transition-all shadow-md">
                  <step.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-headline font-black text-on-surface uppercase tracking-tight mb-4 group-hover:translate-x-1 transition-transform">{step.title}</h3>
                <p className="text-sm font-light text-on-surface-variant leading-relaxed max-w-[200px]">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
