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
    <section className="relative min-h-screen overflow-hidden bg-background text-on-surface">
      <HeroSignScene />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(var(--accent-rgb),0.12),transparent_30%),radial-gradient(circle_at_82%_32%,rgba(var(--accent-rgb),0.08),transparent_28%)]" />
      <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-b from-background/40 via-transparent to-background" />
      <div className="relative z-10 industrial-grid opacity-5 dark:opacity-10" />
      <div className="absolute inset-y-0 left-0 w-[45vw] bg-linear-to-r from-background via-background/90 to-transparent" />

      <div className="section-container relative z-10 flex min-h-screen items-center pb-18 pt-32 lg:pt-36">
        <div className="grid w-full gap-10 px-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-3 border border-accent/20 bg-accent/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-accent backdrop-blur-md">
              <span className="h-px w-8 bg-accent/50" />
              {segment ? t(locale, segment.subtitle) : t(locale, copy.subtitle)}
            </div>

            <h1 className="mt-8 max-w-4xl text-[46px] font-bold uppercase leading-[0.85] tracking-tighter text-on-surface md:text-[72px] lg:text-[92px]">
              {segment ? (
                <>
                  {segmentTitle.split(' ')[0]}
                  <br />
                  <span className="text-accent">{segmentTitle.split(' ').slice(1).join(' ')}</span>
                </>
              ) : (
                <>
                  {t(locale, copy.titlePrimary)}
                  <br />
                  <span className="text-accent">{t(locale, copy.titleAccent)}</span>
                </>
              )}
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
              {segment ? t(locale, segment.description) : t(locale, copy.description)}
            </p>

            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.26em] text-accent/80">
              {t(locale, copy.projectMeta)}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex h-16 items-center justify-center gap-3 bg-primary px-10 text-[10px] font-bold uppercase tracking-[0.2em] text-on-primary transition-all duration-300 hover:bg-accent hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span>{t(locale, copy.servicesAndPricing)}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <a
                href="/catalog.pdf"
                download
                className="group inline-flex h-16 items-center justify-center gap-3 border border-outline bg-surface/50 px-10 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span>{t(locale, copy.downloadCatalog)}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            <div className="mt-12 grid gap-4 border-t border-outline pt-8 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.value} className="border border-outline bg-surface/50 px-6 py-6 backdrop-blur-sm group hover:border-accent/30 transition-colors">
                  <p className="text-4xl font-bold tracking-tighter text-on-surface">{metric.value}</p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                    {t(locale, copy[metric.labelKey])}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.95, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden min-h-[540px] lg:block"
          >
            <div className="absolute inset-x-[8%] top-[12%] h-px bg-linear-to-r from-transparent via-accent/30 to-transparent" />
            <div className="absolute right-[4%] top-[18%] border border-outline bg-surface px-6 py-4 text-right backdrop-blur-md shadow-premium">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">{t(locale, copy.metricTwoLabel)}</p>
              <p className="mt-2 text-2xl font-bold text-on-surface">902-ПП</p>
            </div>
            <div className="absolute bottom-[14%] left-[4%] border border-outline bg-surface px-6 py-4 backdrop-blur-md shadow-premium">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">{t(locale, copy.metricOneLabel)}</p>
              <p className="mt-2 text-2xl font-bold text-on-surface">24ч</p>
            </div>
            <div className="absolute bottom-[8%] right-[8%] border border-accent/20 bg-accent/5 px-6 py-5 backdrop-blur-md shadow-premium">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">{t(locale, copy.metricThreeLabel)}</p>
              <p className="mt-2 text-3xl font-bold text-on-surface">2Y</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
