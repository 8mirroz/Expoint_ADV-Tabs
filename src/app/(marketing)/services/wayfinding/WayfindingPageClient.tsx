'use client';

import React from 'react';
import PageShell from '@/components/framework/PageShell';
import ServiceHero from '@/components/service-pages/ServiceHero';
import B2BSegmentTabs from '@/components/service-pages/B2BSegmentTabs';
import ServiceCalculatorShell from '@/components/service-pages/ServiceCalculatorShell';
import { WayfindingBriefForm } from '@/components/service-pages/WayfindingBriefForm';
import PricingPackages from '@/components/service-pages/PricingPackages';
import MaterialSlider from '@/components/service-pages/MaterialSlider';
import ServiceFAQ from '@/components/service-pages/ServiceFAQ';
import FinalCTA from '@/components/service-pages/FinalCTA';
import { wayfindingData } from '@/data/service-pages/wayfinding';

export default function WayfindingPageClient() {
  return (
    <PageShell headerVariant="immersive" breadcrumbs={[
      { label: 'Услуги', href: '/#services' },
      { label: 'Навигация', href: '/services/wayfinding' },
    ]}>
      <ServiceHero data={wayfindingData.hero} />
      <B2BSegmentTabs segments={wayfindingData.segments} />
      <ServiceCalculatorShell 
        title="Оценка проекта" 
        description="Заполните бриф и загрузите проектную документацию для получения коммерческого предложения"
      >
        <WayfindingBriefForm />
      </ServiceCalculatorShell>
      <PricingPackages packages={wayfindingData.packages} />
      {wayfindingData.materials && <MaterialSlider title={wayfindingData.materials.title} options={wayfindingData.materials.options} />}
      <ServiceFAQ items={wayfindingData.faq} />
      <FinalCTA title={wayfindingData.finalCTA.title} description={wayfindingData.finalCTA.description} buttonText={wayfindingData.finalCTA.buttonText} />
    </PageShell>
  );
}
