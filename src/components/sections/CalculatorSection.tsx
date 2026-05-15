"use client";

import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { CalculatorContainer } from '../calculator/CalculatorContainer';
import { t } from '@/i18n/site';
import { MeshBackground } from '@/components/ui/MeshBackground';

const copy = {
  eyebrow: { ru: 'Конфигурация в реальном времени', be: 'Канфігурацыя ў рэальным часе', kk: 'Нақты уақыттағы конфигурация', en: 'Real-time Configuration', zh: '实时配置', ce: 'ХIинццан конфигураци', tt: 'Реаль вакыт конфигурациясе' },
  titleTop: { ru: 'Соберите свою', be: 'Збярыце сваю', kk: 'Өзіңіздің', en: 'Build Your', zh: '构建您的', ce: 'Шайн', tt: 'Үзеңнең' },
  titleBottom: { ru: 'Айдентику', be: 'Айдэнтыку', kk: 'Айдентикаңызды', en: 'Identity', zh: '品牌识别', ce: 'Идентика', tt: 'Айдентикаңны' },
  body: { ru: 'Проектируйте свою вывеску в реальном времени. Наш 3D-движок мгновенно рассчитывает стоимость с учетом материалов, сложности монтажа и требований 902-ПП.', be: 'Праектуйце сваю шыльду ў рэальным часе. Наш 3D-рухавік імгненна разлічвае кошт з улікам матэрыялаў, складанасці мантажу і патрабаванняў 902-ПП.', kk: 'Маңдайшаңызды нақты уақытта жобалаңыз. Біздің 3D-қозғалтқыш материалдарды, монтаж күрделілігін және 902-ПП талаптарын ескеріп, құнын бірден есептейді.', en: 'Configure your sign in real time. Our 3D engine instantly estimates cost based on materials, installation complexity, and 902-PP requirements.', zh: '实时设计您的招牌。我们的 3D 引擎会根据材料、安装复杂度和 902-ПП 要求即时计算价格。', ce: 'Шайн маьнги хIинццан проект йе. Тхан 3D двигатель материалаш, монтажан чолхаш а 902-ПП тIехь дехарш а хьоьжуш, мах цуьнан сихха дийцар до.', tt: 'Маңгаегызны реаль вакытта проектлагыз. Безнең 3D-движок материалларны, монтаж катлаулыгын һәм 902-ПП таләпләрен исәпкә алып бәяне шунда ук саный.' },
} as const;

export default function CalculatorSection() {
  const { locale } = useLanguage();

  return (
    <section id="calculator" className="section-padding bg-background relative overflow-hidden">
      <MeshBackground opacity={0.08} />

      <div className="section-container relative z-10">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-primary" />
              <span className="text-primary verge-mono-label">{t(locale, copy.eyebrow)}</span>
            </motion.div>
            
            <motion.h2 
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="geist-display-2xl text-on-surface mb-8"
            >
              {t(locale, copy.titleTop)} <br />
              <span className="text-primary">{t(locale, copy.titleBottom)}</span>
            </motion.h2>
            
            <motion.p 
              initial={false}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-on-surface-variant text-[18px] md:text-[22px] max-w-xl leading-relaxed font-light"
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
          <div className="bg-surface border border-outline shadow-elevation-2 rounded-3xl relative overflow-hidden">
             <CalculatorContainer />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
