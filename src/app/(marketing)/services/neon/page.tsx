import React from 'react';
import { Metadata } from 'next';
import NeonPageClient from './NeonPageClient';
import { neonData } from '@/data/service-pages/neon';
import { generateServiceMetadata } from '@/lib/services/metadata';
import { generateServiceSchema, generateFAQSchema } from '@/lib/services/schemas';

export const metadata: Metadata = generateServiceMetadata(neonData);

export default function NeonServicePage() {
  const serviceSchema = generateServiceSchema(neonData);
  const faqSchema = generateFAQSchema(neonData);

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
      <NeonPageClient />
    </>
  );
}
