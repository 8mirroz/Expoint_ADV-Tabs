'use client';

import React from 'react';
import PageShell from '@/components/framework/PageShell';
import ServiceHero from '@/components/service-pages/ServiceHero';
import B2BSegmentTabs from '@/components/service-pages/B2BSegmentTabs';
import ServiceCalculatorShell from '@/components/service-pages/ServiceCalculatorShell';
import { NeonCalculatorV10 } from '@/components/calculator/NeonCalculatorV10';
import PricingPackages from '@/components/service-pages/PricingPackages';
import TechnologyComparison from '@/components/service-pages/TechnologyComparison';
import LegalTrustBlock from '@/components/service-pages/LegalTrustBlock';
import ServiceFAQ from '@/components/service-pages/ServiceFAQ';
import FinalCTA from '@/components/service-pages/FinalCTA';
import { neonData } from '@/data/service-pages/neon';

export default function NeonPageClient() {
  return (
    <PageShell headerVariant="immersive" breadcrumbs={[
      { label: 'Услуги', href: '/#services' },
      { label: 'Гибкий Неон', href: '/services/neon' },
    ]}>
      <ServiceHero data={neonData.hero} />
      <B2BSegmentTabs segments={neonData.segments} />
      <ServiceCalculatorShell 
        title="Конструктор стоимости" 
        description="Создайте свою вывеску и получите моментальный расчет стоимости производства"
      >
        <NeonCalculatorV10 />
      </ServiceCalculatorShell>
      <PricingPackages packages={neonData.packages} />
      {neonData.comparison && <TechnologyComparison title={neonData.comparison.title} items={neonData.comparison.items} />}
      {neonData.legal && <LegalTrustBlock title={neonData.legal.title} content={neonData.legal.content} bullets={neonData.legal.bullets} />}
      <ServiceFAQ items={neonData.faq} />
      <FinalCTA title={neonData.finalCTA.title} description={neonData.finalCTA.description} buttonText={neonData.finalCTA.buttonText} />
    </PageShell>
  );
}
