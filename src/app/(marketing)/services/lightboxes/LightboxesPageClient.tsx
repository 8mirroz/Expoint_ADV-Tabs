'use client';

import React from 'react';
import PageShell from '@/components/framework/PageShell';
import ServiceHero from '@/components/service-pages/ServiceHero';
import B2BSegmentTabs from '@/components/service-pages/B2BSegmentTabs';
import ServiceCalculatorShell from '@/components/service-pages/ServiceCalculatorShell';
import { LightboxCalculator } from '@/components/calculator/LightboxCalculator';
import PricingPackages from '@/components/service-pages/PricingPackages';
import TechnologyComparison from '@/components/service-pages/TechnologyComparison';
import ServiceFAQ from '@/components/service-pages/ServiceFAQ';
import FinalCTA from '@/components/service-pages/FinalCTA';
import { lightboxesData } from '@/data/service-pages/lightboxes';

export default function LightboxesPageClient() {
  return (
    <PageShell headerVariant="immersive" breadcrumbs={[
      { label: 'Услуги', href: '/#services' },
      { label: 'Световые короба', href: '/services/lightboxes' },
    ]}>
      <ServiceHero data={lightboxesData.hero} />
      <B2BSegmentTabs segments={lightboxesData.segments} />
      <ServiceCalculatorShell 
        title="Онлайн калькулятор" 
        description="Рассчитайте стоимость вашего светового короба в трех вариантах исполнения"
      >
        <LightboxCalculator />
      </ServiceCalculatorShell>
      <PricingPackages packages={lightboxesData.packages} />
      {lightboxesData.comparison && <TechnologyComparison title={lightboxesData.comparison.title} items={lightboxesData.comparison.items} />}
      <ServiceFAQ items={lightboxesData.faq} />
      <FinalCTA title={lightboxesData.finalCTA.title} description={lightboxesData.finalCTA.description} buttonText={lightboxesData.finalCTA.buttonText} />
    </PageShell>
  );
}
