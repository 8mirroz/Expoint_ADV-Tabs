"use client";

import { motion } from 'motion/react';
import { Camera, Clock, ArrowUpRight, Play, LayoutGrid } from 'lucide-react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';
import { CASE_STUDIES } from '@/data/cases';
import Link from 'next/link';

const copy = {
  eyebrow: { ru: 'Инженерный дневник', be: 'Інжынерны дзённік', kk: 'Инженерлік күнделік', en: 'Engineering Journal', zh: '工程日志', ce: 'Инженерни дневник', tt: 'Инженерлык көндәлеге' },
  titleTop: { ru: 'Будни', be: 'Будні', kk: 'Жұмыс күндері', en: 'Daily', zh: '日常', ce: 'Будни', tt: 'Эш көннәре' },
  titleBottom: { ru: 'Производства', be: 'Вытворчасці', kk: 'Өндіріс', en: 'Production', zh: '生产', ce: 'Кхолламан', tt: 'Җитештерү' },
  archiveTitle: { ru: 'Архив кейсов', be: 'Архіў кейсаў', kk: 'Кейстер мұрағаты', en: 'Case Archive', zh: '案例归档', ce: 'Кейсаш архив', tt: 'Кейслар архивы' },
  implemented: { ru: 'Реализованные проекты', be: 'Рэалізаваныя праекты', kk: 'Іске асырылған жобалар', en: 'Implemented Projects', zh: '已完成项目', ce: 'Кхолламан проекташ', tt: 'Тормышка ашырылган проектлар' },
  viewFull: { ru: 'Открыть полный архив', be: 'Адкрыць поўны архіў', kk: 'Толық мұрағатты ашу', en: 'Open Full Archive', zh: '查看完整档案', ce: 'Архив дIаделло', tt: 'Тулы архивны ачу' },
  liveNow: { ru: 'Сейчас в цеху', be: 'Зараз у цэху', kk: 'Қазір цехта', en: 'Live in Workshop', zh: '车间实况', ce: 'Цехехь ду', tt: 'Хәзер цехта' }
};

export default function ProductionDaily() {
  const { locale } = useLanguage();

  // We'll treat some cases as "Daily log entries"
  const dailyEntries = CASE_STUDIES.slice(0, 6);

  return (
    <section id="daily" className="py-24 lg:py-40 bg-background relative overflow-hidden border-t border-outline">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.02] bg-[url('/img/patterns/grid.svg')] bg-[length:40px_40px] pointer-events-none" />
      
      <div className="section-container relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-mono font-bold uppercase tracking-[0.4em] text-[10px]">
                {t(locale, copy.eyebrow)}
              </span>
            </div>
            
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-8">
              {t(locale, copy.titleTop)} <br/>
              <span className="text-on-surface-variant/30">{t(locale, copy.titleBottom)}</span>
            </h2>
            
            <div className="flex items-center gap-6 border-l-2 border-primary/20 pl-8">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-1">{t(locale, copy.implemented)}</span>
                <span className="text-3xl font-headline text-on-surface">540+</span>
              </div>
              <div className="w-px h-10 bg-outline/10" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-1">{t(locale, copy.liveNow)}</span>
                <span className="text-3xl font-headline text-primary">12</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-6">
             <div className="text-right hidden md:block">
               <p className="text-on-surface-variant text-sm font-light max-w-[280px] leading-relaxed">
                 Ежедневный поток задач: от резки акрила до финальных испытаний светотехники.
               </p>
             </div>
             <Link 
               href="/cases"
               className="group flex items-center gap-4 bg-surface border border-outline px-8 py-5 text-[10px] font-black uppercase tracking-widest text-on-surface hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-500 shadow-xl"
             >
               <LayoutGrid className="w-4 h-4" />
               {t(locale, copy.viewFull)}
               <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
             </Link>
          </div>
        </div>

        {/* Live Archive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {dailyEntries.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="relative aspect-square md:aspect-[4/5] bg-surface group overflow-hidden border border-outline/10 hover:border-primary/30 transition-all duration-700"
            >
               {/* Background Media */}
               <div className="absolute inset-0 z-0 grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105">
                 {item.videoUrl ? (
                   <video src={item.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40 group-hover:opacity-80" />
                 ) : (
                   <div className={`w-full h-full ${item.imageBg} opacity-20 group-hover:opacity-40`} />
                 )}
                 <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-60" />
               </div>

               {/* Meta Tag */}
               <div className="absolute top-4 left-4 z-20 flex flex-col gap-1">
                 <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-sm border border-white/5">
                   <Clock className="w-3 h-3 text-primary" />
                   <span className="text-[8px] font-mono font-bold text-white uppercase tracking-tighter">Log_{idx + 22} / 14:20</span>
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-accent drop-shadow-lg">{item.clientName}</span>
               </div>

               {/* Content */}
               <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-4 leading-none">
                    {item.title}
                  </h3>
                  <div className="h-px w-0 group-hover:w-full bg-primary transition-all duration-700 mb-4" />
                  <p className="text-white/40 text-xs font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">{item.term}</span>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      {item.videoUrl ? <Play className="w-3 h-3 text-white fill-white" /> : <Camera className="w-3 h-3 text-white" />}
                    </div>
                  </div>
               </div>

               {/* Blueprint HUD Overlay (On Hover) */}
               <div className="absolute inset-0 z-15 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-0 right-0 w-20 h-20 border-r border-t border-primary/20" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 border-l border-b border-primary/20" />
                  <div className="absolute top-1/2 left-4 w-12 h-px bg-primary/20" />
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
