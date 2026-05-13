"use client";

import { ArrowRight, Coffee, Store } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';
import { SERVICES } from '@/data/services';
import { ServiceCard } from '@/components/ui/ServiceCard';

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
    <section id="services" className="scroll-mt-28 py-24 lg:py-48 overflow-hidden bg-surface">
      <div className="section-container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-20">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-accent shadow-neon" />
              <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs">
                {t(locale, copy.eyebrow)}
              </span>
            </div>
            <h2 className="text-[42px] md:text-[72px] font-black uppercase leading-[0.9] tracking-tighter">
              {t(locale, copy.titleTop)} <br /> 
              <span className="text-on-surface-variant/40">{t(locale, copy.titleBottom)}</span>
            </h2>
          </div>
          <div className="lg:col-span-4">
             <p className="text-on-surface-variant font-light leading-relaxed border-l border-accent/20 pl-6 py-2">
               {t(locale, copy.intro)}
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[360px] md:auto-rows-[420px] items-stretch">
          {/* Large Featured Card */}
          {featuredService && (
            <ServiceCard 
              service={featuredService} 
              variant="featured"
              className="md:col-span-8 row-span-1 md:row-span-2 shadow-2xl"
            />
          )}

          {/* Medium Card 1 */}
          {neonService && (
            <ServiceCard 
              service={neonService} 
              variant="standard"
              icon={<Coffee className="w-6 h-6 text-accent" />}
              className="md:col-span-4"
            />
          )}

          {/* Medium Card 2 */}
          {lightboxService && (
            <ServiceCard 
              service={lightboxService} 
              variant="standard"
              icon={<Store className="w-6 h-6 text-accent" />}
              className="md:col-span-4"
            />
          )}
        </div>

        {/* CTA Card - Redesigned with Cinematic Video and Blueprint Aesthetic */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 bento-card min-h-[560px] relative overflow-hidden group border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)]"
        >
            {/* Background Video for CTA */}
            <video
              src="/videos/signage/3d-letters-preview.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover opacity-60 grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
            />
            
            {/* Blueprint Grid Overlay */}
            <div className="absolute inset-0 z-10 opacity-20 bg-[url('/img/patterns/grid.svg')] bg-repeat mix-blend-overlay" />
            
            {/* Sophisticated Gradients */}
            <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent z-10" />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-black/40 z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,77,0,0.15),transparent_50%)] z-10" />
            
            {/* Content Layer */}
            <div className="relative z-20 h-full p-10 md:p-24 flex flex-col justify-between">
              <div className="max-w-4xl">
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-px w-16 bg-accent shadow-neon animate-pulse" />
                  <span className="text-accent font-bold uppercase tracking-[0.5em] text-[10px] drop-shadow-sm">
                    {t(locale, copy.customProduction)}
                  </span>
                </div>
                
                <h3 className="text-6xl md:text-[110px] font-black uppercase tracking-tighter leading-[0.8] text-white">
                  {t(locale, copy.customQuestion).split('\n')[0]} <br/> 
                  <span className="text-accent inline-block mt-4">{t(locale, copy.customQuestion).split('\n')[1]}</span> <br/> 
                  <span className="inline-block mt-4">{t(locale, copy.customQuestion).split('\n')[2]}</span>
                </h3>
                
                <p className="mt-12 text-white/50 font-light text-2xl max-w-xl leading-relaxed border-l-4 border-accent/30 pl-8 transition-colors group-hover:text-white/80">
                  {t(locale, copy.customDesc)}
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-end justify-between gap-16 mt-16">
                {/* Technical Specs Visualization (Blueprint Style) */}
                <div className="hidden lg:flex items-center gap-12 border-t border-white/10 pt-8 w-full mr-20">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Precision</span>
                    <span className="text-xl font-mono text-white/80">0.01mm</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Reliability</span>
                    <span className="text-xl font-mono text-white/80">5Y+ WARN</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Standards</span>
                    <span className="text-xl font-mono text-white/80">902-PP OK</span>
                  </div>
                </div>

                {/* Main Call to Action Wrapper */}
                <div className="flex flex-col items-center md:items-end gap-8 w-full md:w-auto shrink-0">
                  <button className="relative overflow-hidden bg-accent text-white px-20 py-10 font-bold uppercase tracking-[0.3em] text-base shadow-[0_20px_50px_rgba(255,77,0,0.3)] transition-all duration-500 hover:scale-105 active:scale-95 group/cta w-full md:w-auto">
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/cta:translate-y-0 transition-transform duration-500" />
                    <span className="relative z-10 flex items-center justify-center gap-4">
                      {t(locale, copy.contactUs)} 
                      <ArrowRight className="w-6 h-6 group-hover/cta:translate-x-3 transition-transform duration-500" />
                    </span>
                  </button>
                  
                  <div className="flex items-center gap-4 opacity-30 group-hover:opacity-60 transition-opacity">
                    <div className="h-px w-8 bg-white" />
                    <p className="text-white text-[10px] uppercase tracking-[0.4em] font-medium">
                      {t(locale, copy.freeEstimate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Corner Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-white/5 z-0" />
            <div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-white/5 z-0" />
        </motion.div>
      </div>
    </section>
  );
}
