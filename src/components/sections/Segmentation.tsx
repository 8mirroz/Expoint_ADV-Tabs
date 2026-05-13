"use client";
import { Building2, Coffee, HeartPulse, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '@/components/i18n/LanguageProvider';

const SEGMENTS = [
  {
    icon: Coffee,
    title: {
      ru: 'Кафе / Ресторан',
      en: 'Cafe / Restaurant'
    },
    description: {
      ru: 'Яркий неон, световые короба, привлекательные менюборды.',
      en: 'Vibrant neon, lightboxes, and attractive menu boards.'
    }
  },
  {
    icon: HeartPulse,
    title: {
      ru: 'Клиника / Стоматология',
      en: 'Clinic / Dentistry'
    },
    description: {
      ru: 'Строгие стандарты, световые буквы, продуманная навигация.',
      en: 'Strict standards, channel letters, and intuitive navigation.'
    }
  },
  {
    icon: Sparkles,
    title: {
      ru: 'Салон / Магазин',
      en: 'Salon / Retail'
    },
    description: {
      ru: 'Привлекающая внимание вывеска, брендирование витрин.',
      en: 'Eye-catching signage and window branding.'
    }
  },
  {
    icon: Building2,
    title: {
      ru: 'Офис / Бизнес-центр',
      en: 'Office / Business Center'
    },
    description: {
      ru: 'Интерьерный логотип, навигация, стильный ресепшн.',
      en: 'Interior logos, navigation, and stylish reception areas.'
    }
  }
];

export default function Segmentation() {
  const { locale } = useLanguage();
  const isEn = locale === 'en';

  const title = {
    ru: 'Отраслевые решения',
    en: 'Industry Solutions'
  };
  
  const subtitle = {
    ru: 'Специфика вашего бизнеса — наш приоритет.',
    en: 'Your business specifics are our priority.'
  };

  return (
    <section className="py-32 bg-background border-b border-outline overflow-hidden">
      <div className="section-container">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl lg:text-7xl font-headline font-black uppercase tracking-tighter leading-[0.8] text-on-surface mb-6">
              {isEn ? title.en : title.ru}<span className="text-accent">.</span>
            </h2>
            <p className="text-on-surface-variant font-light text-lg">
              {isEn ? subtitle.en : subtitle.ru}
            </p>
          </div>
          <div className="h-px grow bg-outline mx-12 hidden md:block mb-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-outline">
          {SEGMENTS.map((segment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-10 border-r border-b border-outline hover:bg-surface transition-all duration-500 cursor-pointer relative overflow-hidden"
            >
              <div className="w-12 h-12 bg-accent/5 text-accent flex items-center justify-center mb-10 group-hover:bg-accent group-hover:text-on-accent transition-all duration-500">
                <segment.icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-headline font-black text-on-surface uppercase tracking-tight mb-4">
                {isEn ? segment.title.en : segment.title.ru}
              </h3>
              
              <p className="text-sm font-light text-on-surface-variant leading-relaxed mb-10">
                {isEn ? segment.description.en : segment.description.ru}
              </p>

              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-10px] group-hover:translate-x-0">
                {isEn ? 'View Solutions' : 'Смотреть решения'} <ArrowRight className="w-3 h-3" />
              </div>

              {/* Decorative background element */}
              <div className="absolute -bottom-4 -right-4 text-on-surface/2 font-headline font-black text-8xl group-hover:text-accent/5 transition-colors duration-500 pointer-events-none">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
