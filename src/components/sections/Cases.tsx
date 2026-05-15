"use client";

import { ArrowRight, Camera } from 'lucide-react';
import { motion } from 'motion/react';
import { CASE_STUDIES } from '../../data/cases';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';

const copy = {
  eyebrow: { ru: 'Реализованные проекты', be: 'Рэалізаваныя праекты', kk: 'Іске асырылған жобалар', en: 'Completed Projects', zh: '已完成项目', ce: 'Кхолламан проекташ', tt: 'Тормышка ашырылган проектлар' },
  titleTop: { ru: 'Архив', be: 'Архіў', kk: 'Мұрағат', en: 'The Archive', zh: '档案', ce: 'Архив', tt: 'Архив' },
  titleBottom: { ru: 'Кейсов', be: 'Кейсаў', kk: 'Кейстер', en: 'Case Studies', zh: '案例研究', ce: 'Кейсаш', tt: 'Кейслар' },
  intro: { ru: 'Мы создаем не просто вывески, а технологичные решения, которые становятся частью архитектуры города и драйвером вашего бизнеса.', be: 'Мы ствараем не проста вывескі, а тэхналагічныя рашэнні, якія становяцца часткай архітэктуры горада і драйверам вашага бізнесу.', kk: 'Біз жай ғана маңдайшалар емес, қала архитектурасының бөлігіне айналатын және бизнесіңіздің драйвері болатын технологиялық шешімдер жасаймыз.', en: 'We create more than just signage—we build technological solutions that become part of the city’s architecture and a driver for your business.', zh: '我们不仅创造招牌，还打造能够成为城市建筑一部分并推动业务发展的技术方案。', ce: 'Тхуна просто вывескаш ца йо, а технологически шийлараш до, ша гIалин архитектурин дакъа а, шун бизнесан драйвер а хуьлу.', tt: 'Без гади вывескалар гына түгел, шәһәр архитектурасының бер өлеше һәм бизнесыгызның драйверы булып торган технологик карарлар тудырабыз.' },
  viewAll: { ru: 'Все проекты', be: 'Усе праекты', kk: 'Барлық жобалар', en: 'View All Projects', zh: '查看所有项目', ce: 'Массо проекташ', tt: 'Барлык проектлар' },
  challenge: { ru: 'Задача', be: 'Задача', kk: 'Міндет', en: 'Challenge', zh: '任务', ce: 'Терго', tt: 'Бурыч' },
  solution: { ru: 'Решение', be: 'Рашэнне', kk: 'Шешім', en: 'Solution', zh: '方案', ce: 'Шийла', tt: 'Чишелеш' },
  budget: { ru: 'Бюджет', be: 'Бюджэт', kk: 'Бюджет', en: 'Budget', zh: '预算', ce: 'Бюджет', tt: 'Бюджет' },
  term: { ru: 'Срок', be: 'Тэрмін', kk: 'Мерзім', en: 'Timeline', zh: '周期', ce: 'Муда', tt: 'Срок' },
} as const;

export default function Cases() {
  const { locale } = useLanguage();

  return (
    <section id="cases" className="scroll-mt-28 section-padding bg-background relative overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[url('/img/patterns/grid.svg')] bg-size-[40px_40px] pointer-events-none" />
      
      <div className="section-container px-4 relative z-10">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-24">
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
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-8">
             <p className="text-on-surface-variant font-light leading-relaxed border-l border-accent/20 pl-6 py-2 text-left">
               {t(locale, copy.intro)}
             </p>
             <button className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-on-surface border border-outline px-10 py-5 bg-surface/50 backdrop-blur-md hover:bg-accent hover:text-white hover:border-accent transition-all duration-500">
               {t(locale, copy.viewAll)}
               <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
             </button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[400px] md:auto-rows-[480px]">
          {CASE_STUDIES.map((item, idx) => {
            const isFeatured = idx === 0;
            const isWide = idx === 3;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "group relative overflow-hidden bg-surface border border-outline hover:border-accent/30 transition-all duration-700 shadow-sm hover:shadow-premium",
                  isFeatured ? "md:col-span-8 md:row-span-2" : isWide ? "md:col-span-8" : "md:col-span-4"
                )}
              >
                {/* Background Layer */}
                <div className="absolute inset-0 z-0">
                  {item.videoUrl ? (
                    <video
                      src={item.videoUrl}
                      autoPlay loop muted playsInline
                      className="h-full w-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0 opacity-40 group-hover:opacity-60"
                    />
                  ) : (
                    <div className={cn("h-full w-full opacity-10 group-hover:opacity-20 transition-opacity", item.imageBg)} />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
                </div>

                {/* Content Layer */}
                <div className="relative z-10 h-full p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                       <span className="text-[10px] font-black uppercase tracking-widest text-accent border-b border-accent/30 pb-1">
                         {item.segment}
                       </span>
                       <div className="w-10 h-10 border border-white/10 flex items-center justify-center bg-black/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500">
                         <Camera className="w-4 h-4 text-accent" />
                       </div>
                    </div>
                    
                    <h3 className={cn(
                      "font-black uppercase tracking-tight leading-[0.9] mb-6 group-hover:text-accent transition-colors",
                      isFeatured ? "text-4xl md:text-6xl" : "text-2xl"
                    )}>
                      {item.title}
                    </h3>
                    
                    <p className={cn(
                      "text-on-surface-variant font-light leading-relaxed max-w-sm",
                      isFeatured ? "text-lg" : "text-sm"
                    )}>
                      {item.description}
                    </p>
                  </div>

                  {/* Technical Meta Footer */}
                  <div className="grid grid-cols-2 gap-4 pt-8 border-t border-outline/50 mt-auto">
                    <div className="flex flex-col gap-1">
                       <span className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant/40">{t(locale, copy.budget)}</span>
                       <span className="text-sm font-mono font-bold text-accent">{item.budget}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                       <span className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant/40">{t(locale, copy.term)}</span>
                       <span className="text-sm font-mono font-bold text-on-surface">{item.term}</span>
                    </div>
                  </div>
                </div>

                {/* Hover Reveal Blueprint Overlay */}
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-5">
                   <div className="absolute top-0 right-0 w-24 h-24 border-r border-t border-accent/20" />
                   <div className="absolute bottom-0 left-0 w-24 h-24 border-l border-b border-accent/20" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Helper for class merging if not globally available
function cn(...inputs: (string | boolean | undefined | null)[]) {
  return inputs.filter(Boolean).join(' ');
}
