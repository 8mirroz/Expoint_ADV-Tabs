import React from 'react';
import { Metadata } from 'next';
import LightboxesPageClient from './LightboxesPageClient';
import { lightboxesData } from '@/data/service-pages/lightboxes';
import { generateServiceMetadata } from '@/lib/services/metadata';
import { generateServiceSchema, generateFAQSchema } from '@/lib/services/schemas';

export const metadata: Metadata = generateServiceMetadata(lightboxesData);

export default function LightboxesServicePage() {
  const serviceSchema = generateServiceSchema(lightboxesData);
  const faqSchema = generateFAQSchema(lightboxesData);

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
      <LightboxesPageClient />
    </>
  );
}
