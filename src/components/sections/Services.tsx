"use client";

import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';
import { SERVICES } from '@/data/services';
import { CatalogProductCard } from '@/components/ui/CatalogProductCard';

const SERVICE_IMAGES: Record<string, string> = {
  'volumetric-letters': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop',
  'lightbox': 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2034&auto=format&fit=crop',
  'flex-neon': 'https://images.unsplash.com/photo-1544415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop',
  'metal-letters': 'https://images.unsplash.com/photo-1544415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop',
  'pylon-signs': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
  'roof-installations': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
};

const SERVICE_ACCENTS: Record<string, string> = {
  'volumetric-letters': '#FF2D55',
  'lightbox': '#007AFF',
  'flex-neon': '#FF9500',
  'metal-letters': '#FFFFFF',
  'pylon-signs': '#FFCC00',
  'roof-installations': '#5856D6',
};

const SERVICE_MODELS: Record<string, string> = {
  'volumetric-letters': 'MOD-01',
  'lightbox': 'MOD-02',
  'flex-neon': 'MOD-03',
  'metal-letters': 'MOD-04',
  'pylon-signs': 'MOD-05',
  'roof-installations': 'MOD-06',
};

const copy = {
  eyebrow: { ru: 'Производственные блоки', be: 'Вытворчыя блокі', kk: 'Өндіріс блоктары', en: 'Production Units', zh: '生产单元', ce: 'Кхолламан блокаш', tt: 'Җитештерү блоклары' },
  titleTop: { ru: 'Аппаратные', be: 'Апаратныя', kk: 'Аппараттық', en: 'Hardware', zh: '硬件', ce: 'Аппаратан', tt: 'Аппарат' },
  titleBottom: { ru: 'Решения', be: 'Рашэнні', kk: 'Шешімдер', en: 'Solutions', zh: '方案', ce: 'Шийлараш', tt: 'Чишелешләр' },
  intro: { ru: 'Мы проектируем конструкции, которые выдерживают климат Москвы и требования 902-ПП, сохраняя премиальный вид годами.', be: 'Мы праектуем канструкцыі, якія вытрымліваюць клімат Масквы і патрабаванні 902-ПП, захоўваючы прэміяльны выгляд гадамі.', kk: 'Біз Мәскеу климаты мен 902-ПП талаптарына төтеп беретін, жылдар бойы премиум көрінісін сақтайтын конструкциялар жобалаймыз.', en: 'We engineer structures that withstand Moscow weather and 902-PP requirements while preserving a premium look for years.', zh: '我们设计的结构能够适应莫斯科气候和 902-ПП 要求，同时多年保持高端外观。', ce: 'Тхуна Москван климата а 902-ПП а даьлла хилар дIаяхьар долу конструкцеш проект йо, дехарехь премиум куц дуьхьало.', tt: 'Без Мәскәү климатына һәм 902-ПП таләпләренә чыдый торган, еллар буе премиум күренешен саклаучы конструкциялар проектлыйбыз.' },
  customProduction: { ru: 'Индивидуальное производство', be: 'Індывідуальная вытворчасць', kk: 'Жеке өндіріс', en: 'Custom Production', zh: '定制生产', ce: 'Шена кхоллам', tt: 'Индивидуаль җитештерү' },
  customQuestion: { ru: 'Нужен \nИндивидуальный \nПроект?', be: 'Патрэбен \nІндывідуальны \nПраект?', kk: 'Сізге \nЖеке \nЖоба керек пе?', en: 'Need a \nCustom \nProject?', zh: '需要 \n定制 \n项目吗？', ce: 'Шуна \nШена \nПроект еза?', tt: 'Сезгә \nИндивидуаль \nПроект кирәкме?' },
  customDesc: { ru: 'Наши инженеры и дизайнеры разработают уникальное решение, которое выделит ваш бизнес и пройдет все согласования.', be: 'Нашы інжынеры і дызайнеры распрацуюць унікальнае рашэнне, якое вылучыць ваш бізнес і пройдзе ўсе ўзгадненні.', kk: 'Біздің инженерлер мен дизайнерлер бизнесіңізді ерекшелейтін және барлық келісімдерден өтетін бірегей шешім әзірлейді.', en: 'Our engineers and designers will create a bespoke concept that distinguishes your business and passes every approval stage.', zh: '我们的工程师和设计师将打造独特方案，让您的业务脱颖而出并通过全部审批。', ce: 'Тхан инженерша а дизайнерша а шун бизнес бахьа шийла йо, массо дIаяхьар дIадоьлур долу.', tt: 'Безнең инженерлар һәм дизайнерлар бизнесыгызны аерып күрсәтәчәк һәм барлык килештерүләрне үтәчәк уникаль карар әзерли.' },
  details: { ru: 'Детали', be: 'Дэталі', kk: 'Детальдар', en: 'Details', zh: '详情', ce: 'Деталаш', tt: 'Детальләр' },
  inquiry: { ru: 'Запрос', be: 'Запыт', kk: 'Сұрау', en: 'Inquiry', zh: '咨询', ce: 'Хаттар', tt: 'Сорау' },
  contactUs: { ru: 'Связаться с нами', be: 'Звязацца з намі', kk: 'Бізбен байланысу', en: 'Contact Us', zh: '联系我们', ce: 'Тхуна байланыс йе', tt: 'Безнең белән элемтәгә керү' },
  freeEstimate: { ru: 'Бесплатный расчет за 24 часа', be: 'Бясплатны разлік за 24 гадзіны', kk: '24 сағатта тегін есеп', en: 'Free estimate within 24 hours', zh: '24 小时内免费估算', ce: '24 сахьтехь бесплатни расчет', tt: '24 сәгатьтә бушлай исәп' },
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
              {t(locale, copy.titleTop)} <br /> 
              <span className="text-on-surface-variant/40">{t(locale, copy.titleBottom)}.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
             <p className="text-on-surface-variant text-[18px] leading-relaxed border-l-2 border-primary/10 pl-8 py-2">
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
                title={service.title}
                category={service.segments[0].toUpperCase()}
                description={service.shortDescription}
                price={service.basePrice}
                priceUnit={service.priceUnit}
                image={SERVICE_IMAGES[service.id] || 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop'}
                previewVideo={service.previewVideo}
                specs={service.technicalSpecs || []}
                href={`/services/${service.id}`}
                isNew={idx === 0}
                accentColor={SERVICE_ACCENTS[service.id]}
                modelId={SERVICE_MODELS[service.id]}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA Card — Premium Gradient Mesh */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 relative overflow-hidden group rounded-2xl border border-outline/50 bg-surface shadow-lg hover:shadow-xl transition-all duration-700"
        >
            {/* Atmospheric Gradient Mesh */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-accent/8 blur-[120px] transition-transform duration-[2s] group-hover:translate-x-[-40px]" />
              <div className="absolute -bottom-1/3 -left-1/4 w-[500px] h-[500px] rounded-full bg-[#7928ca]/6 blur-[100px] transition-transform duration-[2s] group-hover:translate-y-[-30px]" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 p-10 md:p-14 lg:p-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: Copy */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-6 w-6 rounded-lg bg-accent/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <span className="verge-mono-label text-accent tracking-[0.15em]">
                    {t(locale, copy.customProduction)}
                  </span>
                </div>
                
                <h3 className="geist-display-lg md:text-[44px] lg:text-[52px] text-on-surface mb-6 leading-[1.1]">
                  {t(locale, copy.customQuestion).replace(/\\n/g, ' ')}
                </h3>
                
                <p className="text-on-surface-variant text-[16px] md:text-[17px] leading-relaxed max-w-lg">
                  {t(locale, copy.customDesc)}
                </p>
              </div>

              {/* Right: CTA + Meta */}
              <div className="flex flex-col items-start lg:items-end gap-8">
                <div className="flex flex-col gap-4 w-full lg:max-w-xs">
                  <button className="geist-button-primary w-full gap-3 rounded-xl">
                    {t(locale, copy.contactUs)}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-center text-on-surface-variant/60 text-[13px]">
                    {t(locale, copy.freeEstimate)}
                  </p>
                </div>

                {/* Trust signals */}
                <div className="flex items-center gap-4 opacity-60">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-7 h-7 rounded-full border-2 border-surface bg-surface-variant" />
                    ))}
                  </div>
                  <p className="text-on-surface-variant text-[12px] font-medium">
                    5 {locale === 'en' ? 'engineers online' : 'инженеров онлайн'}
                  </p>
                </div>
              </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}
