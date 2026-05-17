import { describe, expect, it } from 'vitest';

import {
  SERVICE_PAGES,
  getMissingProductionFields,
  getMissingRequiredFields,
  isProductionReadyServicePage,
} from '@/data/service-pages';

describe('SERVICE_PAGES catalog', () => {
  it('keeps evidence-backed metadata on every service page entry', () => {
    for (const page of SERVICE_PAGES) {
      expect(getMissingRequiredFields(page)).toEqual([]);
      expect(page.contentMeta.source_doc_ids.length).toBeGreaterThan(0);
      expect(page.contentMeta.coverage_doc_ids?.length).toBeGreaterThan(0);
      expect(page.contentMeta.target_routes?.length).toBeGreaterThan(0);
      expect(page.contentMeta.last_verified_at).toBeTruthy();
      expect(page.contentMeta.owner).toBeTruthy();
      expect(page.contentMeta.quality_status).toBeTruthy();
    }
  });

  it('allows only production-ready pages to claim production quality status', () => {
    const productionPages = SERVICE_PAGES.filter(
      (page) => page.contentMeta.quality_status === 'production'
    );

    expect(productionPages.length).toBeGreaterThan(0);

    for (const page of productionPages) {
      expect(getMissingProductionFields(page)).toEqual([]);
      expect(isProductionReadyServicePage(page)).toBe(true);
    }
  });

  it('keeps the dedicated growth routes in the service page catalog', () => {
    expect(SERVICE_PAGES.map((page) => page.slug)).toEqual([
      'neon',
      'lightboxes',
      'volumetric-letters',
      'setup',
      'wayfinding',
    ]);
  });
});
