'use client';

import React from 'react';
import RichServicePageClient from '@/components/service-pages/RichServicePageClient';
import { LightboxCalculator } from '@/components/calculator/LightboxCalculator';
import { lightboxesData } from '@/data/service-pages/lightboxes';

export default function LightboxesPageClient() {
  return (
    <RichServicePageClient
      data={lightboxesData}
      breadcrumbLabel="Световые короба"
      calculatorTitle="Онлайн ориентир стоимости"
      calculatorDescription="Считаем площадь, тип исполнения, срочность и условия размещения. Показываем 3 рабочих сценария вместо одной вводящей в заблуждение цифры."
      calculator={<LightboxCalculator />}
      segmentDescription="Лайтбокс может быть разным продуктом: быстрый короб для ПВЗ, рабочая фасадная конструкция для стрит-ритейла или композитный премиальный фасад с нормальным монтажом и сервисом."
      packagesTitle="Пакеты под формат фасада."
      packagesDescription="Разница между пакетами не декоративная. Меняются материалы, ресурс подсветки, сервис, допуски по монтажу и уверенность в согласовании."
      faqTitle="Вопросы по коробам и монтажу"
      finalModalContext="Расчет светового короба"
      finalModalSource="service_lightboxes_final_cta"
    />
  );
}
