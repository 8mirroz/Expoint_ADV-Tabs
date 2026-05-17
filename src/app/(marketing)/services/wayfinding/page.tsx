import React from 'react';
import { Metadata } from 'next';
import WayfindingPageClient from './WayfindingPageClient';
import { wayfindingData } from '@/data/service-pages/wayfinding';
import { generateServiceMetadata } from '@/lib/services/metadata';
import { generateServiceSchema, generateFAQSchema } from '@/lib/services/schemas';

export const metadata: Metadata = generateServiceMetadata(wayfindingData);

export default function WayfindingServicePage() {
  const serviceSchema = generateServiceSchema(wayfindingData);
  const faqSchema = generateFAQSchema(wayfindingData);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <WayfindingPageClient />
    </>
  );
}
