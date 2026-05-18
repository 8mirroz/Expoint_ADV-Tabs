'use client';

import React, { type ReactNode } from 'react';
import PageShell from '@/components/framework/PageShell';
import ServiceHero from '@/components/service-pages/ServiceHero';
import B2BSegmentTabs from '@/components/service-pages/B2BSegmentTabs';
import ServiceCalculatorShell from '@/components/service-pages/ServiceCalculatorShell';
import PricingPackages from '@/components/service-pages/PricingPackages';
import TechnologyComparison from '@/components/service-pages/TechnologyComparison';
import LegalTrustBlock from '@/components/service-pages/LegalTrustBlock';
import ServiceFAQ from '@/components/service-pages/ServiceFAQ';
import FinalCTA from '@/components/service-pages/FinalCTA';
import MaterialSlider from '@/components/service-pages/MaterialSlider';
import type { ServicePageData } from '@/lib/services/types';
import {
  ServiceCaseCards,
  ServiceLeadMagnets,
  ServiceProcessTimeline,
  ServiceProofStats,
} from '@/components/service-pages/RichServiceSections';

interface RichServicePageClientProps {
  data: ServicePageData;
  breadcrumbLabel: string;
  calculatorTitle: string;
  calculatorDescription: string;
  calculator: ReactNode;
  segmentDescription: string;
  packagesTitle: string;
  packagesDescription: string;
  faqTitle?: string;
  finalModalContext: string;
  finalModalSource: string;
}

export default function RichServicePageClient({
  data,
  breadcrumbLabel,
  calculatorTitle,
  calculatorDescription,
  calculator,
  segmentDescription,
  packagesTitle,
  packagesDescription,
  faqTitle,
  finalModalContext,
  finalModalSource,
}: RichServicePageClientProps) {
  return (
    <PageShell
      headerVariant="immersive"
      breadcrumbs={[
        { label: 'Услуги', href: '/#services' },
        { label: breadcrumbLabel, href: `/services/${data.slug}` },
      ]}
      withMesh
    >
      <ServiceHero data={data.hero} />
      <ServiceProofStats data={data} />
      <B2BSegmentTabs
        segments={data.segments}
        description={segmentDescription}
      />
      <ServiceCalculatorShell title={calculatorTitle} description={calculatorDescription}>
        {calculator}
      </ServiceCalculatorShell>
      <PricingPackages
        packages={data.packages}
        title={packagesTitle}
        description={packagesDescription}
        modalContextLabel={`Пакет услуги ${breadcrumbLabel}`}
        modalSourcePrefix={`${data.slug.replace(/-/g, '_')}_package`}
      />
      <ServiceCaseCards data={data} />
      {data.comparison && (
        <TechnologyComparison
          title={data.comparison.title}
          items={data.comparison.items}
          variant={data.comparison.variant}
        />
      )}
      {data.materials && <MaterialSlider title={data.materials.title} options={data.materials.options} />}
      {data.legal && (
        <LegalTrustBlock title={data.legal.title} content={data.legal.content} bullets={data.legal.bullets} />
      )}
      <ServiceProcessTimeline data={data} />
      <ServiceLeadMagnets data={data} />
      <ServiceFAQ items={data.faq} title={faqTitle} />
      <FinalCTA
        title={data.finalCTA.title}
        description={data.finalCTA.description}
        buttonText={data.finalCTA.buttonText}
        modalContext={finalModalContext}
        modalSource={finalModalSource}
      />
    </PageShell>
  );
}
