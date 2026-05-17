import type { ServicePageData } from '@/lib/services/types';
import { lightboxesData } from './lightboxes';
import { neonData } from './neon';
import { setupData } from './setup';
import { volumetricLettersData } from './volumetric-letters';
import { wayfindingData } from './wayfinding';

export const SERVICE_PAGES: ServicePageData[] = [
  neonData,
  lightboxesData,
  volumetricLettersData,
  setupData,
  wayfindingData,
];

export const REQUIRED_SERVICE_PAGE_FIELDS = [
  'hero',
  'segments',
  'packages',
  'faq',
  'finalCTA',
  'contentMeta',
] as const;

export const REQUIRED_PRODUCTION_SERVICE_PAGE_FIELDS = [
  'proofStats',
  'process',
  'leadMagnets',
  'legal',
  'caseCards',
] as const;

export function getServicePageBySlug(slug: string): ServicePageData | undefined {
  return SERVICE_PAGES.find((page) => page.slug === slug);
}

export function getMissingRequiredFields(page: ServicePageData): string[] {
  return REQUIRED_SERVICE_PAGE_FIELDS.filter((field) => {
    const value = page[field];

    if (Array.isArray(value)) {
      return value.length === 0;
    }

    return !value;
  });
}

export function getMissingProductionFields(page: ServicePageData): string[] {
  return REQUIRED_PRODUCTION_SERVICE_PAGE_FIELDS.filter((field) => {
    const value = page[field];

    if (Array.isArray(value)) {
      return value.length === 0;
    }

    return !value;
  });
}

export function isProductionReadyServicePage(page: ServicePageData): boolean {
  return getMissingRequiredFields(page).length === 0 && getMissingProductionFields(page).length === 0;
}
