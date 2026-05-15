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
      ru: '3D-Рендеринг',
      en: '3D Rendering',
      be: '3D-Рэндэрынг',
      kk: '3D-Рендеринг',
      zh: '3D渲染',
      ce: '3D-рендеринг',
      tt: '3D-рендеринг',
    },
    description: {
      ru: 'Визуализация конструкций на объекте по нормам 902-ПП.',
      en: 'Visualization of structures at the site according to 902-PP standards.',
      be: 'Візуалізацыя канструкцый на аб\'екце по нормам 902-ПП.',
      kk: '902-ПП нормаларына сәйкес нысандағы құрылымдарды визуализациялау.',
      zh: '根据902-PP标准在现场进行结构可视化。',
      ce: '902-ПП нормашца объектехь конструкцийн визуализаци.',
      tt: '902-ПП нормалары буенча объектта конструкцияләрне визуализацияләү.',
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
      {/* Cinematic Background Text */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none opacity-[0.03]">
        <h2 className="text-[15vw] font-black tracking-tighter leading-none m-0 text-on-surface whitespace-nowrap">
          {t(locale, bgTitle)}
        </h2>
      </div>

      <div className="section-container max-w-7xl mx-auto relative z-10 px-6">
        <header className="mb-32 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="geist-display-lg text-on-surface"
          >
            {t(locale, mainHeading)}
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
            className="text-on-surface-variant verge-mono-label"
          >
            {t(locale, subHeading)}
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 border-t border-outline/30 pt-12">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col gap-6 group cursor-default relative"
            >
              {/* Animated Top Accent Line */}
              <div className="absolute -top-12 left-0 w-full h-[1px]">
                <div className="h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-700 ease-out" />
              </div>

              {/* Number */}
              <div>
                <span className="text-6xl font-bold tracking-tighter text-on-surface/30 group-hover:text-primary transition-colors duration-500 inline-block">
                  {step.id}
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="geist-display-sm !text-lg text-on-surface group-hover:text-primary transition-colors duration-500">
                  {t(locale, step.title)}
                </h3>

                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {t(locale, step.description)}
                </p>

              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
