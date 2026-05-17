import React from 'react';
import { Metadata } from 'next';
import SetupPageClient from './SetupPageClient';
import { setupData } from '@/data/service-pages/setup';
import { generateServiceMetadata } from '@/lib/services/metadata';
import { generateServiceSchema, generateFAQSchema } from '@/lib/services/schemas';

export const metadata: Metadata = generateServiceMetadata(setupData);

export default function SetupServicePage() {
  const serviceSchema = generateServiceSchema(setupData);
  const faqSchema = generateFAQSchema(setupData);

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
      <SetupPageClient />
    </>
  );
}
