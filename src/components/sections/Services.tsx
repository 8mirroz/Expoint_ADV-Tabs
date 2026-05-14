"use client";

import { ArrowRight, Coffee, Store } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';
import { SERVICES } from '@/data/services';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { Timeline, TimelineItem } from '@/components/ui/Timeline';

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
            <h2 className="text-(--text-2xl) md:text-(--text-3xl) font-black uppercase leading-[0.9] tracking-tighter">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16">
          {SERVICES.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group/grid-item pt-4"
            >
              {/* MOD Label - Blueprint Style */}
              <div className="absolute top-0 left-8 z-30 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
                <span className="text-[10px] font-mono font-black text-on-surface-variant uppercase tracking-widest bg-surface px-2 py-0.5 border border-outline/10 rounded-sm">
                   MOD-{(idx + 1).toString().padStart(2, '0')}
                </span>
              </div>

              <ServiceCard 
                service={service} 
                variant="standard"
                className="w-full shadow-lg h-full"
              />
            </motion.div>
          ))}
        </div>

        {/* CTA Card - Redesigned as a Widescreen Technical Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 bento-card min-h-[320px] relative overflow-hidden group border-none shadow-2xl"
        >
            {/* Background Video - Blueprint Look */}
            <video
              src="/videos/signage/3d-letters-preview.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover opacity-40 grayscale brightness-50 transition-all duration-1000 group-hover:scale-105"
            />
            
            {/* Blueprint Grid & Technical Overlays */}
            <div className="absolute inset-0 z-10 opacity-30 bg-[url('/img/patterns/grid.svg')] bg-[length:40px_40px] mix-blend-screen pointer-events-none" />
            <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent z-10" />
            
            {/* Scanned Line Animation */}
            <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/20 shadow-[0_0_15px_var(--primary)] animate-[scan_4s_linear_infinite]" />
            </div>
            
            <style jsx>{`
              @keyframes scan {
                0% { transform: translateY(-100%); }
                100% { transform: translateY(1000%); }
              }
            `}</style>
            
            {/* Content Layer - Widescreen Layout */}
            <div className="relative z-20 h-full p-8 md:p-12 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-2xl flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
                  <span className="text-primary font-mono font-bold uppercase tracking-[0.4em] text-[9px]">
                    Engineering Bureau / Custom
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none text-white mb-4">
                  {t(locale, copy.customQuestion).replace(/\n/g, ' ')}
                </h3>
                
                <p className="text-white/40 font-light text-sm md:text-base max-w-xl leading-relaxed border-l-2 border-primary/20 pl-6">
                  {t(locale, copy.customDesc)}
                </p>
              </div>

              <div className="flex flex-col items-center md:items-end gap-6 shrink-0">
                <button className="relative overflow-hidden bg-primary text-on-primary px-12 py-5 font-black uppercase tracking-[0.2em] text-[11px] shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1 active:translate-y-0 group/cta">
                  <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover/cta:translate-x-0 transition-transform duration-500" />
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {t(locale, copy.contactUs)} 
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
                
                <div className="flex items-center gap-4 opacity-40">
                   <div className="flex -space-x-2">
                     {[1,2,3].map(i => (
                       <div key={i} className="w-6 h-6 rounded-full border border-background bg-surface-elevated" />
                     ))}
                   </div>
                   <p className="text-white text-[9px] uppercase tracking-widest font-mono">
                     5 Engineers Online
                   </p>
                </div>
              </div>
            </div>

            {/* Technical Corner Decals */}
            <div className="absolute top-4 right-4 text-[8px] font-mono text-white/10 select-none uppercase tracking-[0.5em] vertical-rl">
              Spec-V7.04
            </div>
        </motion.div>
      </div>
    </section>
  );
}
