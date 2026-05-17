'use client';

import React from 'react';
import RichServicePageClient from '@/components/service-pages/RichServicePageClient';
import { InstallationBriefForm } from '@/components/service-pages/InstallationBriefForm';
import { setupData } from '@/data/service-pages/setup';

export default function SetupPageClient() {
  return (
    <RichServicePageClient
      data={setupData}
      breadcrumbLabel="Монтаж и демонтаж"
      calculatorTitle="Бриф для расчета монтажа"
      calculatorDescription="Для монтажа решают не только размеры вывески. Критичны фото фасада, этажность, доступ, демонтаж старой конструкции, окно работ и наличие точки питания."
      calculator={<InstallationBriefForm />}
      segmentDescription="Монтаж может быть типовым, ночным, высотным или сетевым. Ошибка в классификации сценария почти всегда превращается в перерасход бюджета уже на объекте."
      packagesTitle="Пакеты по уровню монтажного риска."
      packagesDescription="Чем сложнее доступ, выше фасад и жестче окно работ, тем сильнее важны отдельный расчет спецтехники, демонтажа и координации выезда."
      faqTitle="Вопросы по монтажу и демонтажу"
      finalModalContext="Запрос на расчет монтажа"
      finalModalSource="service_setup_final_cta"
    />
  );
}
