'use client';

import React from 'react';
import RichServicePageClient from '@/components/service-pages/RichServicePageClient';
import { WayfindingBriefForm } from '@/components/service-pages/WayfindingBriefForm';
import { wayfindingData } from '@/data/service-pages/wayfinding';

export default function WayfindingPageClient() {
  return (
    <RichServicePageClient
      data={wayfindingData}
      breadcrumbLabel="Навигация"
      calculatorTitle="Оценка проекта и бриф"
      calculatorDescription="Для навигации важны не только таблички, но и логика маршрутов, архитектура пространства, материалы, rollout и монтаж. Бриф сразу отсеивает слабые сценарии и помогает собрать рабочее КП."
      calculator={<WayfindingBriefForm />}
      segmentDescription="Системы навигации решают разные задачи: разгружают ресепшн, ускоряют поток посетителей, снижают хаос на объекте и поднимают ощущение класса пространства."
      packagesTitle="Пакеты под масштаб и сложность объекта."
      packagesDescription="Для wayfinding пакет определяет глубину проектирования, материалы, монтажный контур и управляемость roll-out, а не только набор табличек."
      faqTitle="Вопросы по навигации и roll-out"
      finalModalContext="Запрос на проект навигации"
      finalModalSource="service_wayfinding_final_cta"
    />
  );
}
