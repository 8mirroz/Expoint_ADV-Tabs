"use client";

import Image from 'next/image';
import { motion } from 'motion/react';
import { useLanguage } from '@/components/i18n/LanguageProvider';

const ITEMS = [
  { id: 1, src: '/portfolio/1.jpeg', alt: 'Industrial Concept', span: 'col-span-1 lg:col-span-2 row-span-2' },
  { id: 2, src: '/portfolio/2.jpeg', alt: 'Minimalist Sign', span: 'col-span-1 row-span-1' },
  { id: 3, src: '/portfolio/3.jpeg', alt: 'Facade Logo', span: 'col-span-1 row-span-1' },
  { id: 4, src: '/portfolio/4.jpeg', alt: 'Neon Install', span: 'col-span-1 row-span-1' },
  { id: 5, src: '/portfolio/5.jpeg', alt: 'Metal Letters', span: 'col-span-1 row-span-1' },
  { id: 6, src: '/portfolio/6.jpeg', alt: 'Roof Construction', span: 'col-span-1 lg:col-span-2 row-span-1' },
];

export default function PortfolioMini() {
  const { locale } = useLanguage();

  return (
    <section className="section-padding bg-background border-y border-outline relative overflow-hidden">
      {/* Mesh Background for atmosphere */}
      <div className="absolute top-0 right-0 w-[40%] h-[60%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="section-container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface border border-outline rounded-full verge-mono-label mb-6">
              <span>{locale === 'ru' ? 'Избранные проекты' : locale === 'en' ? 'Selected Projects' : 'Избранные проекты'}</span>
            </div>
            <h2 className="geist-display-lg mb-4 text-on-surface">
              {locale === 'ru' ? 'Лучшие' : locale === 'en' ? 'Featured' : 'Лучшие'} <span className="text-primary">{locale === 'ru' ? 'Работы' : locale === 'en' ? 'Works' : 'Работы'}</span>
            </h2>
            <p className="text-on-surface-variant text-[18px] leading-[28px]">
              Галерея реализованных проектов. Каждая вывеска — результат точного инженерного расчета и премиального дизайна.
            </p>
          </div>
          <button className="geist-button-secondary">
            {locale === 'ru' ? 'Смотреть все проекты' : locale === 'en' ? 'View All Projects' : 'Смотреть все проекты'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[250px]">
          {ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`relative group overflow-hidden bg-surface border border-outline shadow-sm hover:shadow-premium ${item.span}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-white font-bold uppercase tracking-widest text-xs">{item.alt}</p>
                <div className="w-6 h-0.5 bg-primary mt-2" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
