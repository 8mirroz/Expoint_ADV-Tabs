import React from 'react';
import { Metadata } from 'next';
import VolumetricLettersPageClient from './VolumetricLettersPageClient';
import { volumetricLettersData } from '@/data/service-pages/volumetric-letters';
import { generateServiceMetadata } from '@/lib/services/metadata';
import { generateServiceSchema, generateFAQSchema } from '@/lib/services/schemas';

export const metadata: Metadata = generateServiceMetadata(volumetricLettersData);

export default function VolumetricLettersServicePage() {
  const serviceSchema = generateServiceSchema(volumetricLettersData);
  const faqSchema = generateFAQSchema(volumetricLettersData);

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
      <VolumetricLettersPageClient />
    </>
  );
}
