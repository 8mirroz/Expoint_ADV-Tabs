"use client";

import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

import { useLanguage } from '@/components/i18n/LanguageProvider';
import { SegmentData } from '@/data/segments';
import { t } from '@/i18n/site';

const HeroSignScene = dynamic(() => import('@/components/three/HeroSignScene'), {
  ssr: false,
});

const copy = {
  subtitle: { ru: 'Московская инженерная студия наружной рекламы', be: 'Маскоўская інжынерная студыя вонкавай рэкламы', kk: 'Мәскеудегі сыртқы жарнама инженерлік студиясы', en: 'Moscow Engineering Signage Studio', zh: '莫斯科户外广告工程工作室', ce: 'Москван инженерни реклама студи', tt: 'Мәскәү инженерлык тышкы реклама студиясе' },
  titlePrimary: { ru: 'Собираем', be: 'Збіраем', kk: 'Жинаймыз', en: 'We Build', zh: '打造', ce: 'Долуш до', tt: 'Җыябыз' },
  titleAccent: { ru: 'видимость бренда', be: 'бачнасць брэнда', kk: 'бренд көрінімін', en: 'Brand Visibility', zh: '品牌可见度', ce: 'брендан гушйохьуш', tt: 'бренд күренешен' },
  description: { ru: 'Проектируем, производим и монтируем вывески, объемные буквы и световые конструкции как инженерный продукт: с расчетом, производственным контролем и реальной эксплуатационной логикой.', be: 'Праектуем, вырабляем і мантуем шыльды, аб’ёмныя літары і светлавыя канструкцыі як інжынерны прадукт: з разлікам, вытворчым кантролем і рэальнай логікай эксплуатацыі.', kk: 'Біз маңдайша, көлемді әріптер мен жарық конструкцияларын инженерлік өнім ретінде жобалаймыз, өндіреміз және орнатамыз: есептеумен, өндірістік бақылаумен және нақты пайдалану логикасымен.', en: 'We design, manufacture, and install signage, channel letters, and illuminated structures as engineered products with real production control and operational logic.', zh: '我们将招牌、立体字和发光结构作为工程产品来设计、生产和安装，并配套计算、生产控制和真实使用逻辑。', ce: 'Тхуна маьнги, тIехьйолуш элпаш а свет конструкцеш а инженерни продукт санна проект йо, кхолла а латта до: хьисапца, контролца а болх бара логикаца.', tt: 'Без элмә такталарны, күләмле хәрефләрне һәм утлы конструкцияләрне инженер продукт буларак проектлыйбыз, җитештерәбез һәм урнаштырабыз.' },
  projectMeta: { ru: '902-ПП • собственное производство • запуск от 3 рабочих дней', be: '902-ПП • уласная вытворчасць • запуск ад 3 рабочых дзён', kk: '902-ПП • өз өндірісіміз • іске қосу 3 жұмыс күнінен бастап', en: '902-PP • in-house production • launch from 3 business days', zh: '902-ПП • 自有生产 • 3个工作日起启动', ce: '902-ПП • шена кхоллам • 3 белхан дийнахь дуьйна', tt: '902-ПП • үз производство • 3 эш көненнән старт' },
  servicesAndPricing: { ru: 'Услуги и цены', be: 'Паслугі і цэны', kk: 'Қызметтер мен бағалар', en: 'Services & Pricing', zh: '服务与价格', ce: 'ГIуллакхаш а баьхнаш а', tt: 'Хезмәтләр һәм бәяләр' },
  downloadCatalog: { ru: 'Скачать каталог', be: 'Спампаваць каталог', kk: 'Каталогты жүктеу', en: 'Download Catalog', zh: '下载目录', ce: 'Каталог чуькхур', tt: 'Каталогны йөкләү' },
  metricOneLabel: { ru: '3D-макет', be: '3D-макет', kk: '3D-макет', en: '3D Mockup', zh: '3D模型', ce: '3D макет', tt: '3D-макет' },
  metricTwoLabel: { ru: 'Соответствие 902-ПП', be: 'Адпаведнасць 902-ПП', kk: '902-ПП сәйкестігі', en: '902-PP Compliance', zh: '902-ПП合规', ce: '902-ПП ларам', tt: '902-ПП туры килү' },
  metricThreeLabel: { ru: 'Гарантия и сервис', be: 'Гарантыя і сэрвіс', kk: 'Кепілдік пен сервис', en: 'Warranty & Service', zh: '质保与服务', ce: 'Гаранти а сервис а', tt: 'Гарантия һәм сервис' },
} as const;

const metrics = [
  { value: '24ч', labelKey: 'metricOneLabel' },
  { value: '100%', labelKey: 'metricTwoLabel' },
  { value: '2Y', labelKey: 'metricThreeLabel' },
] as const;

export default function Hero({ segment }: { segment?: SegmentData }) {
  const { locale } = useLanguage();
  const segmentTitle = segment ? t(locale, segment.title) : '';

  return (
    <section className="relative min-h-screen overflow-hidden bg-background text-on-surface border-b border-outline">
      {/* 3D Scene in the background */}
      <HeroSignScene />

      {/* Strict flat background mask instead of glowing gradients */}
      <div className="absolute inset-0 bg-background/80" />
      <div className="relative z-10 industrial-grid opacity-20" />
      <div className="absolute inset-y-0 left-0 w-[55vw] bg-background/95" />

      <div className="section-container relative z-10 flex min-h-screen items-center pb-16 pt-32 lg:pt-36">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-4xl"
          >
            <div className="verge-kicker text-primary mb-8">
              {segment ? t(locale, segment.subtitle) : t(locale, copy.subtitle)}
            </div>

            <h1 className="font-headline text-[60px] md:text-[80px] lg:text-[107px] uppercase leading-[0.80] text-on-surface tracking-normal break-words">
              {segment ? (
                <>
                  {segmentTitle.split(' ')[0]}<br />
                  <span className="text-primary">{segmentTitle.split(' ').slice(1).join(' ')}</span>
                </>
              ) : (
                <>
                  {t(locale, copy.titlePrimary)}<br />
                  <span className="text-primary">{t(locale, copy.titleAccent)}</span>
                </>
              )}
            </h1>

            <p className="mt-8 max-w-2xl text-[16px] md:text-[18px] leading-[1.6] text-on-surface-variant">
              {segment ? t(locale, segment.description) : t(locale, copy.description)}
            </p>

            <p className="mt-6 verge-mono-label text-primary">
              {t(locale, copy.projectMeta)}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary border border-primary text-on-primary rounded-[var(--radius-24)] h-[60px] px-10 flex items-center justify-center gap-3 font-mono font-medium uppercase tracking-[1.1px] text-[13px] hover:bg-white/20 hover:border-[#c2c2c2] hover:text-white transition-colors"
              >
                <span>{t(locale, copy.servicesAndPricing)}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="/catalog.pdf"
                download
                className="bg-transparent border border-outline text-on-surface rounded-[var(--radius-40)] h-[60px] px-10 flex items-center justify-center gap-3 font-mono font-medium uppercase tracking-[1.1px] text-[13px] hover:border-primary hover:text-primary transition-colors"
              >
                <span>{t(locale, copy.downloadCatalog)}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-16 grid grid-cols-3 border-t border-outline">
              {metrics.map((metric, index) => (
                <div key={metric.value} className={`py-8 px-4 ${index !== 2 ? 'border-r border-outline' : ''} bg-background group hover:bg-surface transition-colors`}>
                  <p className="font-headline text-[40px] md:text-[60px] leading-[0.8] text-on-surface">{metric.value}</p>
                  <p className="mt-4 verge-mono-label text-on-surface-variant">
                    {t(locale, copy[metric.labelKey])}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="relative hidden min-h-[540px] lg:block"
          >
            {/* Minimal flat badges instead of glassmorphism */}
            <div className="absolute right-[4%] top-[18%] border border-outline bg-background px-6 py-4 text-right">
              <p className="verge-mono-label text-primary">{t(locale, copy.metricTwoLabel)}</p>
              <p className="mt-2 text-2xl font-bold text-on-surface">902-ПП</p>
            </div>
            <div className="absolute bottom-[14%] left-[4%] border border-outline bg-background px-6 py-4">
              <p className="verge-mono-label text-primary">{t(locale, copy.metricOneLabel)}</p>
              <p className="mt-2 text-2xl font-bold text-on-surface">24ч</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
