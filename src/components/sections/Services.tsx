"use client";

import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';
import { SERVICES } from '@/data/services';
import { CatalogProductCard } from '@/components/ui/CatalogProductCard';
import { getServiceHref } from '@/lib/utils';
import PersonalOrderCTA from '@/components/sections/PersonalOrderCTA';


const SERVICE_IMAGES: Record<string, string> = {
  'volumetric-letters': '/img/adv/volumetric-letters.png',
  'lightbox': '/img/adv/lightbox.png',
  'flex-neon': '/img/adv/flexible-neon.png',
  'metal-letters': '/img/adv/installation.png',
  'pylon-signs': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
  'roof-installations': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
};

const SERVICE_ACCENTS: Record<string, string> = {
  'volumetric-letters': 'var(--category-volumetric)',
  'lightbox': 'var(--category-lightbox)',
  'flex-neon': 'var(--category-neon)',
  'metal-letters': 'var(--category-metal)',
  'pylon-signs': 'var(--category-pylon)',
  'roof-installations': 'var(--category-roof)',
};

const SERVICE_TITLES: Record<string, string> = {
  'volumetric-letters': 'Объемные\nбуквы',
  'flex-neon': 'Гибкий\nнеон',
  lightbox: 'Световые\nкороба',
  'pylon-signs': 'Элементы\nнавигации',
  'roof-installations': 'Крышные\nустановки',
  'metal-letters': 'Монтаж и\nзапуск',
};

const copy = {
  eyebrow: { ru: 'Производственные блоки', be: 'Вытворчыя блокі', kk: 'Өндіріс блоктары', en: 'Production Units', zh: '生产单元', ce: 'Кхолламан блокаш', tt: 'Җитештерү блоклары' },
  titleTop: { ru: 'Производство', be: 'Вытворчасць', kk: 'Өндіріс', en: 'Production', zh: '生产', ce: 'Кхоллам', tt: 'Җитештерү' },
  titleBottom: { ru: '', be: '', kk: '', en: '', zh: '', ce: '', tt: '' },
  intro: { ru: 'Проектируем и производим технологичные конструкции высокого качества', be: 'Праектуем і вырабляем тэхналагічныя канструкцыі высокай якасці', kk: 'Жоғары сапалы технологиялық конструкцияларды жобалаймыз және өндіреміз.', en: 'We design and manufacture high-quality technological structures.', zh: '我们设计和生产高质量的技术结构。', ce: 'Тхуна лакхара йолу технологин кхоллам йо.', tt: 'Югары сыйфатлы технологияле конструкцияләр проектлыйбыз һәм җитештерәбез.' },
} as const;

export default function Services() {
  const { locale } = useLanguage();

  const featuredService = SERVICES.find(s => s.id === 'volumetric-letters');
  const neonService = SERVICES.find(s => s.id === 'flex-neon');
  const lightboxService = SERVICES.find(s => s.id === 'lightbox');

  return (
    <section id="services" className="scroll-mt-28 section-padding overflow-hidden bg-canvas-soft">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-24 px-6">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-6">
              <span className="verge-mono-label text-primary tracking-[0.2em]">
                {t(locale, copy.eyebrow)}
              </span>
              <div className="h-px flex-1 bg-outline" />
            </div>
            <h2 className="geist-display-lg md:text-[56px] lg:text-[72px] text-on-surface">
              {t(locale, copy.titleTop)}
              {t(locale, copy.titleBottom) && (
                <>
                  <br />
                  <span className="text-on-surface-variant/40">{t(locale, copy.titleBottom)}</span>
                </>
              )}
            </h2>
          </div>
          <div className="lg:col-span-5">
             <p className="text-white/90 text-xl leading-relaxed border-l-2 border-[var(--accent-color)] pl-8 py-2">
               {t(locale, copy.intro)}
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {SERVICES.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ 
                duration: 0.8, 
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <CatalogProductCard 
                title={SERVICE_TITLES[service.id] || service.title}
                price={service.basePrice}
                priceUnit={service.priceUnit}
                image={SERVICE_IMAGES[service.id] || 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop'}
                previewVideo={service.previewVideo}
                specs={service.technicalSpecs || []}
                href={getServiceHref(service.id)}
                accentColor={SERVICE_ACCENTS[service.id]}
                index={idx}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA Card — Premium Industrial Design */}
        <PersonalOrderCTA className="mt-20" />
      </div>
    </section>
  );
}
