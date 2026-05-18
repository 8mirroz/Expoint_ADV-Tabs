'use client';

import React, { Suspense } from 'react';
import RichServicePageClient from '@/components/service-pages/RichServicePageClient';
import { CalculatorContainer } from '@/components/calculator/CalculatorContainer';
import { volumetricLettersData } from '@/data/service-pages/volumetric-letters';

export default function VolumetricLettersPageClient() {
  return (
    <RichServicePageClient
      data={volumetricLettersData}
      breadcrumbLabel="Объемные буквы"
      calculatorTitle="Ориентир по смете"
      calculatorDescription="Это не финальный конфигуратор, а быстрый ориентир по габаритам и типу конструкции. Рабочую смету подтверждаем после фасада, типа подсветки и монтажного доступа."
      calculator={(
        <Suspense fallback={<div className="rounded-3xl border border-outline bg-surface p-8 text-on-surface">Загрузка калькулятора...</div>}>
          <CalculatorContainer serviceId="volumetric-letters" />
        </Suspense>
      )}
      segmentDescription="Объемные буквы нужны там, где бренд не хочет выглядеть дешево: читаемость, архитектурная аккуратность и шанс на согласование здесь важнее, чем просто “ярко и подешевле”."
      packagesTitle="Пакеты под уровень фасада."
      packagesDescription="В буквах пакет определяет не только материалы, но и тип света, монтажную схему, compliance-контроль и уровень брендового эффекта."
      faqTitle="Вопросы по буквам и подсветке"
      finalModalContext="Расчет объемных букв"
      finalModalSource="service_volumetric_letters_final_cta"
    />
  );
}
