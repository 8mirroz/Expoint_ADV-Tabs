"use client";

import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import CalculatorContainer from '../calculator/CalculatorContainer';
import { t } from '@/i18n/site';

const copy = {
  eyebrow: { ru: 'Конфигурация в реальном времени', be: 'Канфігурацыя ў рэальным часе', kk: 'Нақты уақыттағы конфигурация', en: 'Real-time Configuration', zh: '实时配置', ce: 'ХIинццан конфигураци', tt: 'Реаль вакыт конфигурациясе' },
  titleTop: { ru: 'Соберите свою', be: 'Збярыце сваю', kk: 'Өзіңіздің', en: 'Build Your', zh: '构建您的', ce: 'Шайн', tt: 'Үзеңнең' },
  titleBottom: { ru: 'Айдентику', be: 'Айдэнтыку', kk: 'Айдентикаңызды', en: 'Identity', zh: '品牌识别', ce: 'Идентика', tt: 'Айдентикаңны' },
  body: { ru: 'Проектируйте свою вывеску в реальном времени. Наш 3D-движок мгновенно рассчитывает стоимость с учетом материалов, сложности монтажа и требований 902-ПП.', be: 'Праектуйце сваю шыльду ў рэальным часе. Наш 3D-рухавік імгненна разлічвае кошт з улікам матэрыялаў, складанасці мантажу і патрабаванняў 902-ПП.', kk: 'Маңдайшаңызды нақты уақытта жобалаңыз. Біздің 3D-қозғалтқыш материалдарды, монтаж күрделілігін және 902-ПП талаптарын ескеріп, құнын бірден есептейді.', en: 'Configure your sign in real time. Our 3D engine instantly estimates cost based on materials, installation complexity, and 902-PP requirements.', zh: '实时设计您的招牌。我们的 3D 引擎会根据材料、安装复杂度和 902-ПП 要求即时计算价格。', ce: 'Шайн маьнги хIинццан проект йе. Тхан 3D двигатель материалаш, монтажан чолхаш а 902-ПП тIехь дехарш а хьоьжуш, мах цуьнан сихха дийцар до.', tt: 'Маңгаегызны реаль вакытта проектлагыз. Безнең 3D-движок материалларны, монтаж катлаулыгын һәм 902-ПП таләпләрен исәпкә алып бәяне шунда ук саный.' },
} as const;

export default function CalculatorSection() {
  const { locale } = useLanguage();

  return (
    <section id="calculator" className="py-32 bg-background relative overflow-hidden transition-colors duration-500">
      {/* Industrial Background Pattern */}
      <div className="absolute inset-0 opacity-3 dark:opacity-10 pointer-events-none">
        <div className="absolute inset-0 industrial-grid" />
      </div>

      <div className="section-container relative z-10">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-accent" />
              <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs">{t(locale, copy.eyebrow)}</span>
            </motion.div>
            
            <motion.h2 
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl lg:text-8xl font-headline font-black uppercase tracking-tighter leading-[0.85] text-on-surface mb-8"
            >
              {t(locale, copy.titleTop)} <br />
              <span className="text-accent">{t(locale, copy.titleBottom)}</span>
            </motion.h2>
            
            <motion.p 
              initial={false}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-on-surface-variant font-light text-lg lg:text-xl max-w-xl leading-relaxed"
            >
              {t(locale, copy.body)}
            </motion.p>
          </div>
          
          <div className="hidden md:block mb-4 h-px grow bg-outline mx-12" />
        </div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Decorative Corner Accents */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-accent/30 z-20 pointer-events-none" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-accent/30 z-20 pointer-events-none" />
          
          <div className="bg-surface backdrop-blur-sm border border-outline shadow-premium relative overflow-hidden">
             <CalculatorContainer />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
