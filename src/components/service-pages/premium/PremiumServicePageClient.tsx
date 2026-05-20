'use client';

import React, { type ReactNode } from 'react';
import PageShell from '@/components/framework/PageShell';
import PremiumHero from '@/components/service-pages/premium/PremiumHero';
import PremiumPricingCards from '@/components/service-pages/premium/PremiumPricingCards';
import PremiumSEOPlus from '@/components/service-pages/premium/PremiumSEOPlus';
import PremiumThematicComparison from '@/components/service-pages/premium/PremiumThematicComparison';
import PremiumThematicProcess from '@/components/service-pages/premium/PremiumThematicProcess';
import PremiumCases from '@/components/service-pages/premium/PremiumCases';
import PremiumIndividualCTA from '@/components/service-pages/premium/PremiumIndividualCTA';
import ServiceCalculatorShell from '@/components/service-pages/ServiceCalculatorShell';
import ServiceFAQ from '@/components/service-pages/ServiceFAQ';
import type { ServicePageData } from '@/lib/services/types';

interface PremiumServicePageClientProps {
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

export default function PremiumServicePageClient({
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
}: PremiumServicePageClientProps) {
  return (
    <PageShell
      headerVariant="immersive"
      breadcrumbs={[
        { label: 'Услуги', href: '/#services' },
        { label: breadcrumbLabel, href: `/services/${data.slug}` },
      ]}
      withMesh
    >
      {/* 1. Hero Секция */}
      <PremiumHero data={data.hero} />

      {/* 2. Карточки пакетов услуг */}
      <PremiumPricingCards
        packages={data.packages}
        title={packagesTitle}
        description={packagesDescription}
        modalContextLabel={`Пакет услуги ${breadcrumbLabel}`}
        modalSourcePrefix={`${data.slug.replace(/-/g, '_')}_package`}
      />

      {/* 3. SEO+ Регламенты и юридическое доверие */}
      {data.legal && (
        <PremiumSEOPlus
          title={data.legal.title}
          content={data.legal.content}
          bullets={data.legal.bullets}
        />
      )}

      {/* 4. Тематическая секция: Сравнение технологий */}
      {data.comparison && (
        <PremiumThematicComparison
          title={data.comparison.title}
          items={data.comparison.items}
          variant={data.comparison.variant}
        />
      )}

      {/* 5. Тематическая секция: Инженерный SLA процесс */}
      <PremiumThematicProcess data={data} />

      {/* 6. Интерактивный калькулятор/конфигуратор */}
      <ServiceCalculatorShell title={calculatorTitle} description={calculatorDescription}>
        {calculator}
      </ServiceCalculatorShell>

      {/* 7. B2B Кейсы */}
      <PremiumCases data={data} />

      {/* 8. Индивидуальный заказ */}
      <PremiumIndividualCTA
        title={data.finalCTA.title}
        description={data.finalCTA.description}
        buttonText={data.finalCTA.buttonText}
        modalContext={finalModalContext}
        modalSource={finalModalSource}
      />

      {/* FAQ для SEO-валидности */}
      {data.faq && data.faq.length > 0 && (
        <ServiceFAQ items={data.faq} title={faqTitle} />
      )}
    </PageShell>
  );
}
