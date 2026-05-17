"use client";

import { motion } from 'motion/react';
import { Camera, Clock, ArrowUpRight, Play, LayoutGrid } from 'lucide-react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';
import Image from 'next/image';

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

  const dailyImages = [
    '091a5e86.jpg', '09ba4e73.jpg', '0cf2d2b5.jpg', '1e89eea1.jpg',
    '1fabb426.jpg', '2f550d03.jpg', '3479be55.jpg', '45e3d6f6.jpg',
    '499ba8a1.jpg', '5cb11fe2.jpg', '650acc77.jpg', '6943801d.jpg',
    '6f7ae1f8.jpg', '813b92d9.jpg', '8222c284.jpg', 'af402a9f.jpg'
  ];

  return (
    <section id="daily" className="section-padding bg-background relative overflow-hidden border-t border-outline">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.02] bg-[url('/img/patterns/grid.svg')] bg-[length:40px_40px] pointer-events-none" />
      
      <div className="section-container relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-mono font-bold uppercase tracking-[0.4em] text-xs">
                {t(locale, copy.eyebrow)}
              </span>
            </div>
            
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-8">
              {t(locale, copy.titleTop)} <br/>
              <span className="text-on-surface-variant/30">{t(locale, copy.titleBottom)}</span>
            </h2>
            
            <div className="flex items-center gap-6 border-l-2 border-primary/20 pl-8">
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-widest text-on-surface-variant mb-1">{t(locale, copy.implemented)}</span>
                <span className="text-3xl font-headline text-on-surface">540+</span>
              </div>
              <div className="w-px h-10 bg-outline/10" />
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-widest text-on-surface-variant mb-1">{t(locale, copy.liveNow)}</span>
                <span className="text-3xl font-headline text-primary">12</span>
              </div>
            </div>
          </div>


        </div>

        {/* Live Archive Gallery Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {dailyImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ delay: (idx % 4) * 0.1, duration: 0.6 }}
              className="relative w-full break-inside-avoid bg-surface group overflow-hidden border border-outline/10 hover:border-primary/30 transition-all duration-500 rounded-sm"
            >
               {/* Background Media */}
               <div className="relative w-full overflow-hidden" style={{ minHeight: '200px' }}>
                 <Image 
                   src={`/img/daily/${img}`} 
                   alt={`Production log ${idx}`}
                   width={600}
                   height={800}
                   className="w-full h-auto object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
               </div>

               {/* Meta Tag */}
               <div className="absolute top-4 left-4 z-20 flex flex-col gap-1">
                 <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-sm border border-white/5">
                   <Clock className="w-3 h-3 text-primary" />
                   <span className="text-[8px] font-mono font-bold text-white uppercase tracking-tighter">Log_{idx + 22}</span>
                 </div>
               </div>

               {/* Blueprint HUD Overlay (On Hover) */}
               <div className="absolute inset-0 z-15 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-primary/40" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-primary/40" />
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
