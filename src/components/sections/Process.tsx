'use client';

import { motion } from 'motion/react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';
import { useModalStore } from '@/store/useModalStore';

const PROCESS_STEPS = [
  {
    id: '01',
    title: {
      ru: 'Заявка & Анализ',
      en: 'Application & Analysis',
      be: 'Заяўка & Аналіз',
      kk: 'Өтініш & Талдау',
      zh: '申请与分析',
      ce: 'Декхар а, анализ а',
      tt: 'Заявка һәм анализ',
    },
    description: {
      ru: 'Анализ фасада и брендбука. Определение рамок проекта.',
      en: 'Façade and brand book analysis. Project scope definition.',
      be: 'Аналіз фасада і брэндбука. Визначэнне рамак праекта.',
      kk: 'Қасбет пен брендбукты талдау. Жоба шеңберін анықтау.',
      zh: '门面与品牌手册分析。确定项目范围。',
      ce: 'Фасадан а, брендбукан а анализ. Проектан гураш билгалдахар.',
      tt: 'Фасад һәм брендбук анализы. Проект чикләрен билгеләү.',
    }
  },
  {
    id: '02',
    title: {
      ru: 'AI предпросмотр',
      en: 'AI Preview',
      be: 'AI прадвыгляд',
      kk: 'AI алдын ала қарау',
      zh: 'AI 预览',
      ce: 'AI предпросмотр',
      tt: 'AI алдын ала карау',
    },
    description: {
      ru: 'Фотопривязка вывески на вашем объекте по нормам 902-ПП. Входит в стоимость.',
      en: 'Photo alignment of the sign on your facade according to 902-PP. Included in cost.',
      be: 'Фотапрывязка шыльды на вашым аб\'екце па нормах 902-ПП. Уваходзіць у кошт.',
      kk: '902-ПП нормалары бойынша сіздің нысандағы маңдайшаны фотобайланыстыру. Құнына кіреді.',
      zh: '根据902-PP标准在您的现场进行招牌照片绑定。包含在费用中。',
      ce: '902-ПП нормашца объектехь вывескан фотопривязка. Махна юкъа йоьду.',
      tt: '902-ПП нормалары буенча сезнең объектта маңгайлыкны фотобәйләү. Бәягә керә.',
    }
  },
  {
    id: '03',
    title: {
      ru: 'Честная Смета',
      en: 'Honest Estimate',
      be: 'Сумленная Смета',
      kk: 'Әділ Смета',
      zh: '诚实估算',
      ce: 'ЦӀена смета',
      tt: 'Намуслы смета',
    },
    description: {
      ru: 'Точный расчет материалов и работ без скрытых платежей.',
      en: 'Precise calculation of materials and labor with no hidden fees.',
      be: 'Дакладны разлік матэрыялаў і работ без схаваных плацяжоў.',
      kk: 'Жасырын төлемдерсіз материалдар мен жұмыстарды дәл есептеу.',
      zh: '精确计算材料和人工，无隐藏费用。',
      ce: 'Материалийн а, белхийн а нийса ларар, къайлаха төлемаш доцуш.',
      tt: 'Яшерен түләүләрсез материаллар һәм эшләрне төгәл исәпләү.',
    }
  },
  {
    id: '04',
    title: {
      ru: 'Производство',
      en: 'Production',
      be: 'Вытворчасць',
      kk: 'Өндіріс',
      zh: '生产',
      ce: 'Производство',
      tt: 'Производство',
    },
    description: {
      ru: 'Собственный цех с контролем качества электроники.',
      en: 'In-house workshop with electronics quality control.',
      be: 'Уласная майстэрня з кантролем якасці электронікі.',
      kk: 'Электроника сапасын бақылайтын жеке цех.',
      zh: '拥有电子质量控制的内部车间。',
      ce: 'Электронике тергош йолу шен цех.',
      tt: 'Электроника сыйфатын тикшерү белән үз цехыбыз.',
    }
  },
  {
    id: '05',
    title: {
      ru: 'Монтаж & Запуск',
      en: 'Installation & Launch',
      be: 'Мантаж & Запуск',
      kk: 'Монтаж & Іске қосу',
      zh: '安装与启动',
      ce: 'Монтаж а, дӀадолор а',
      tt: 'Монтаж һәм эшкәртү',
    },
    description: {
      ru: 'Чистый монтаж, пусконаладка и гарантийные документы.',
      en: 'Clean installation, commissioning, and warranty documents.',
      be: 'Чысты мантаж, пусканаладка і гарантыйныя дакументы.',
      kk: 'Таза монтаждау, іске қосу-реттеу және кепілдік құжаттар.',
      zh: '干净的安装、调试和保修文件。',
      ce: 'ЦӀена монтаж, дӀахӀоттор а, гарантин документаш а.',
      tt: 'Чиста монтаж, көйләү һәм гарантия документлары.',
    }
  }
];


const STEP_THEME = {
  gradient: 'from-[#00FFA3] to-[#00C8FF]',
  accentBg: 'bg-gradient-to-r from-[#00FFA3] to-[#00C8FF]',
  numberVariants: {
    initial: { opacity: 0, y: 0, scale: 1, filter: 'drop-shadow(0 0 0px rgba(0,250,163,0))' },
    hover: { 
      opacity: 1, 
      y: -6, 
      scale: 1.05, 
      filter: 'drop-shadow(0 4px 15px rgba(0, 250, 163, 0.5))',
      transition: { type: 'spring' as const, stiffness: 300, damping: 15 } 
    }
  },
  baseNumberVariants: {
    initial: { opacity: 0.2, scale: 1 },
    hover: { 
      opacity: 0, 
      scale: 1.05, 
      transition: { duration: 0.3 } 
    }
  }
};

const STEP_THEMES = [
  STEP_THEME,
  STEP_THEME,
  STEP_THEME,
  STEP_THEME,
  STEP_THEME
];

const getCardVariants = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, delay }
  },
  hover: {}
});

export default function Process() {
  const { locale } = useLanguage();
  const openModal = useModalStore((state) => state.openModal);

  const bgTitle = {
    ru: 'ПРОЦЕСС',
    en: 'PROCESS',
    be: 'ПРАЦЭС',
    kk: 'ПРОЦЕСС',
    zh: '流程',
    ce: 'ПРОЦЕСС',
    tt: 'ПРОЦЕСС',
  } as const;

  const mainHeading = {
    ru: 'От концепции до монтажа',
    en: 'From concept to installation',
    be: 'Ад канцэпцыі да мантажу',
    kk: 'Тұжырымдамадан монтажға дейін',
    zh: '从概念到安装',
    ce: 'Концепцехь монтаж кхаччалца',
    tt: 'Концепциядән монтажга кадәр',
  } as const;

  const subHeading = {
    ru: '5 этапов безупречного исполнения',
    en: '5 steps of flawless execution',
    be: '5 этапаў бездакорнага выканання',
    kk: 'Мінсіз орындалатын 5 кезең',
    zh: '执行无误的5个阶段',
    ce: 'Бекхаман 5 этап',
    tt: 'Биш төгәл этап',
  } as const;


  return (
    <section 
      id="process" 
      className="section-padding bg-background border-b border-outline relative overflow-hidden"
    >
      {/* Cinematic Background Text - Safer size */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none opacity-[0.03]">
        <h2 className="text-[8vw] font-black tracking-tighter leading-none m-0 text-on-surface whitespace-nowrap">
          {t(locale, bgTitle)}
        </h2>
      </div>

      <div className="section-container max-w-7xl mx-auto relative z-10">
        <header className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="geist-display-xl text-on-surface"
          >
            <span>{t(locale, mainHeading)}</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="h-px w-24 bg-primary mx-auto my-8 origin-center"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-on-surface-variant text-sm tracking-widest uppercase"
          >
            {t(locale, subHeading)}
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8 border-t border-outline/30 pt-16">
          {PROCESS_STEPS.map((step, index) => {
            const theme = STEP_THEMES[index];
            const cardVariants = getCardVariants(index * 0.1);
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="initial"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className="flex flex-col gap-6 group cursor-default relative"
              >
                {/* Animated Top Accent Line */}
                <div className="absolute -top-16 left-0 w-full h-[1px]">
                  <div className={`h-[2px] w-0 ${theme.accentBg} group-hover:w-full transition-all duration-700 ease-out`} />
                </div>

                {/* Number */}
                <div className="relative h-20 md:h-24 select-none mb-2 md:mb-3">
                  <motion.span 
                    variants={theme.baseNumberVariants}
                    className="absolute left-0 top-0 text-8xl md:text-9xl font-headline font-black tracking-tighter text-on-surface/20 origin-left leading-none pr-6"
                    style={{ fontFamily: "var(--font-header)" }}
                  >
                    {step.id}
                  </motion.span>
                  <motion.span 
                    variants={theme.numberVariants}
                    className={`absolute left-0 top-0 text-8xl md:text-9xl font-headline font-black tracking-tighter bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent origin-left leading-none pr-6`}
                    style={{ fontFamily: "var(--font-header)" }}
                  >
                    {step.id}
                  </motion.span>
                </div>

                <div className="space-y-4">
                  <h3 
                    className="geist-display-sm !text-lg md:!text-[1.25rem] font-headline font-black tracking-[-0.03em] text-on-surface transition-colors duration-500"
                    style={{ fontFamily: "var(--font-header)" }}
                  >
                    {t(locale, step.title)}
                  </h3>

                  <p className="text-on-surface-variant/82 text-[13.5px] leading-[1.6]">
                    {t(locale, step.description)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

