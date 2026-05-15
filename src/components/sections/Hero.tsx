"use client";

import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, Box, ShieldCheck, Clock } from 'lucide-react';
import { MeshBackground } from '@/components/ui/MeshBackground';
import { TechnicalGrid } from '@/components/ui/TechnicalGrid';

import { useLanguage } from '@/components/i18n/LanguageProvider';
import { SegmentData } from '@/data/segments';
import { t } from '@/i18n/site';

const copy = {
  subtitle: { ru: 'Инженерное бюро наружной рекламы', be: 'Інжынернае бюро вонкавай рэкламы', kk: 'Сыртқы жарнама инженерлік бюросы', en: 'Signage Engineering Bureau', zh: '户外广告工程局', ce: 'Инженерни реклама бюро', tt: 'Инженерлык тышкы реклама бюросы' },
  titlePrimary: { ru: 'Проектируем', be: 'Праектуем', kk: 'Жобалаймыз', en: 'We Engineer', zh: '设计', ce: 'Проект йо', tt: 'Проектлыйбыз' },
  titleAccent: { ru: 'стандарты качества', be: 'стандарты якасці', kk: 'сапа стандарттарын', en: 'Quality Standards', zh: '质量标准', ce: 'качество стандарташ', tt: 'сыйфат стандартларын' },
  description: { ru: 'Производство премиальных вывесок и систем навигации как инженерный продукт. От лазерной резки до монтажа с гарантией соответствия 902-ПП.', be: 'Вытворчасць прэміяльных шыльд і сістэм навігацыі як інжынерны прадукт. Ад лазернай рэзкі да мантажу з гарантыяй адпаведнасці 902-ПП.', kk: 'Премиалды маңдайшалар мен навигация жүйелерін инженерлік өнім ретінде өндіру. Лазерлік кесуден монтаждауға дейін 902-ПП сәйкестік кепілдігімен.', en: 'Production of premium signage and navigation systems as an engineered product. From laser cutting to installation with 902-PP compliance guarantee.', zh: '作为工程产品生产优质招牌和导航系统。从激光切割到安装，并保证符合902-ПП。', ce: 'Премиум маьнги кхоллам а навигаци системи а инженерни продукт санна. Лазерни хесиршра дуьйна монтаж тIехьа 902-ПП ларамца.', tt: 'Премиум элмә такталарны һәм навигация системаларын инженер продукт буларак җитештерү.' },
  projectMeta: { ru: 'Собственное производство в Москве • Запуск от 3 дней', en: 'In-house production in Moscow • 3-day launch' },
  servicesAndPricing: { ru: 'Каталог решений', en: 'Solutions Catalog' },
  downloadCatalog: { ru: 'Рассчитать проект', en: 'Request Quote' },
} as const;

const features = [
  { icon: <Box className="w-5 h-5" />, label: { ru: '3D-проектирование', en: '3D Engineering' } },
  { icon: <ShieldCheck className="w-5 h-5" />, label: { ru: '902-ПП Гарантия', en: '902-PP Shield' } },
  { icon: <Clock className="w-5 h-5" />, label: { ru: 'Сроки от 3 дней', en: '3-Day Turnaround' } },
];

export default function Hero({ segment }: { segment?: SegmentData }) {
  const { locale } = useLanguage();
  const segmentTitle = segment ? t(locale, segment.title) : '';

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background pt-20">
      {/* Engineering Background Layer */}
      <TechnicalGrid opacity={0.1} spacing={50} />
      <MeshBackground opacity={0.12} />
      
      <div className="section-container relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Typography & Logic */}
          <div className="max-w-3xl relative z-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-px w-8 bg-primary" />
              <span className="verge-kicker text-primary">
                {segment ? t(locale, segment.subtitle) : t(locale, copy.subtitle)}
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="geist-display-xl md:geist-display-2xl text-on-surface mb-10 leading-[1.1] md:leading-[1.0] tracking-tight"
            >
              {t(locale, copy.titlePrimary)} <br/>
              <span className="text-on-surface-variant">{t(locale, copy.titleAccent)}</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-on-surface-variant text-[18px] md:text-[21px] leading-relaxed max-w-xl mb-12 font-light"
            >
              {segment ? t(locale, segment.description) : t(locale, copy.description)}
            </motion.p>

            {/* Feature Badges */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-6 mb-12"
            >
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-primary/40">{f.icon}</div>
                  <span className="verge-mono-label !text-[11px] uppercase tracking-widest">{t(locale, f.label)}</span>
                </div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-5"
            >
              <button className="geist-button-primary w-full sm:w-auto group">
                <span>{t(locale, copy.servicesAndPricing)}</span>
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="geist-button-secondary w-full sm:w-auto">
                <span>{t(locale, copy.downloadCatalog)}</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Visual Precision */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square lg:aspect-auto lg:h-[600px] group"
          >
            <div className="absolute inset-0 bg-primary/5 rounded-2xl -rotate-2 group-hover:rotate-0 transition-transform duration-700" />
            <div className="absolute inset-0 border border-primary/10 rounded-2xl rotate-1 group-hover:rotate-0 transition-transform duration-700 delay-75" />
            
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-outline bg-surface-variant shadow-2xl">
              <Image 
                src="/img/hero/hero-precision.png"
                alt="Precision Engineering Mockup"
                fill
                className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Overlay Metadata */}
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end text-white">
                <div className="space-y-1">
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-60">Production_Unit</p>
                  <p className="text-xl font-bold tracking-tight">EXP-V8 Precision</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-60">Status</p>
                  <p className="text-xs font-bold uppercase text-primary">Verified // 100%</p>
                </div>
              </div>
            </div>

            {/* Floating Technical Detail */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 p-6 bg-surface border border-outline shadow-xl rounded-xl hidden xl:block z-20"
            >
              <div className="flex flex-col gap-2">
                <div className="h-1 w-12 bg-primary" />
                <p className="verge-mono-label !text-[10px] uppercase tracking-widest">Calibration_OK</p>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-1 bg-primary/20" />)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer Label */}
      <div className="absolute bottom-10 left-10 hidden md:block">
        <p className="verge-mono-label !text-[9px] uppercase tracking-[0.8em] opacity-20">
          Expoint ADV // Engineering Excellence // Moscow 2026
        </p>
      </div>
    </section>
  );
}
