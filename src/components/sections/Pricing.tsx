"use client";
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PRODUCT_PACKS } from '../../data/services';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';

const copy = {
  title: { ru: 'Реализация', be: 'Рэалізацыя', kk: 'Іске асыру', en: 'Execution', zh: '实施', ce: 'Кхочушдар', tt: 'Гамәлгә ашыру' },
  intro: { ru: 'Выбор промышленного стандарта под масштаб вашего бизнеса.', be: 'Выбар прамысловага стандарту пад маштаб вашага бізнесу.', kk: 'Бизнес ауқымына сай өнеркәсіптік стандартты таңдау.', en: 'Choose the production standard that matches your business scale.', zh: '按您的业务规模选择工业级标准。', ce: 'Шун бизнесан масштабна нийса промышленни стандарт харжа.', tt: 'Бизнес масштабына туры килгән индустриаль стандартны сайлау.' },
  recommended: { ru: 'Рекомендуем рынку', be: 'Рэкамендуем рынку', kk: 'Нарыққа ұсыныс', en: 'Market Recommended', zh: '市场推荐', ce: 'Базарна дика', tt: 'Базар киңәше' },
  tier: { ru: 'Сегмент', be: 'Сегмент', kk: 'Сегмент', en: 'Tier', zh: '层级', ce: 'Даража', tt: 'Сегмент' },
  entryPrice: { ru: 'Стартовая цена', be: 'Стартавая цана', kk: 'Бастапқы баға', en: 'Entry Price Point', zh: '起始价格', ce: 'Юьхьанцара мах', tt: 'Старт бәясе' },
  initialize: { ru: 'Выбрать', be: 'Выбраць', kk: 'Таңдау', en: 'Initialize', zh: '选择', ce: 'Харжа', tt: 'Сайлау' },
} as const;

export default function Pricing() {
  const { locale } = useLanguage();

  return (
    <section id="pricing" className="py-32 bg-surface relative border-t border-outline">
      <div className="section-container">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl lg:text-7xl font-headline font-black uppercase tracking-tighter leading-[0.8] text-on-surface mb-6">{t(locale, copy.title)}<span className="text-accent">.</span></h2>
            <p className="text-on-surface-variant font-light text-lg">{t(locale, copy.intro)}</p>
          </div>
          <div className="h-px grow bg-outline mx-12 hidden md:block mb-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCT_PACKS.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-10 flex flex-col relative transition-all duration-500 border shadow-premium ${
                pkg.isPopular 
                  ? 'bg-secondary border-accent' 
                  : 'bg-surface border-outline hover:border-accent/40'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-4 left-10 bg-accent text-on-accent text-[10px] font-black px-4 py-2 uppercase tracking-widest shadow-neon">
                  {t(locale, copy.recommended)}
                </div>
              )}
              
              <div className="mb-12">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant mb-4 block">
                  {pkg.target} • {t(locale, copy.tier)}
                </span>
                <h3 className="text-3xl font-headline font-black text-on-surface uppercase tracking-tight mb-4">
                  {pkg.name}
                </h3>
                <p className="text-sm font-light text-on-surface-variant leading-relaxed">
                  {pkg.description}
                </p>
              </div>

              <div className="mb-12">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-on-surface-variant/60">{t(locale, copy.entryPrice)}</p>
                <p className="text-4xl font-headline font-black text-on-surface">{pkg.priceStart}</p>
              </div>

              <div className="flex-1 mb-12">
                <ul className="space-y-4">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-4">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-accent" />
                      <span className="text-sm font-light text-on-surface-variant leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`w-full py-5 font-black uppercase tracking-widest text-[10px] transition-all flex justify-center items-center gap-4 shadow-sm hover:shadow-premium ${
                pkg.isPopular 
                  ? 'bg-accent text-on-accent hover:bg-on-surface hover:text-surface' 
                  : 'bg-on-surface text-surface hover:bg-accent hover:text-on-accent'
              }`}>
                {t(locale, copy.initialize)} {pkg.name}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
