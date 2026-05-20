import { describe, expect, it } from 'vitest';

import { PRICES_PAGE } from '@/data/pages/prices';
import { SERVICES } from '@/data/services';

describe('PRICES_PAGE blueprint', () => {
  it('renders the expected section order for the rebuilt pricing route', () => {
    expect(PRICES_PAGE.sections.map((section) => section.type)).toEqual([
      'hero-generic',
      'pricing-explainer',
      'service-rates',
      'pricing',
      'pricing-compliance',
      'stats',
      'faq',
    ]);
  });

  it('keeps evidence-backed pricing metadata on every service card source', () => {
    for (const service of SERVICES) {
      expect(service.expertNotes?.source_doc_ids.length).toBeGreaterThan(0);
      expect(service.expertNotes?.pricingDrivers?.length).toBeGreaterThan(0);
      expect(service.expertNotes?.claims?.length).toBeGreaterThan(0);
      expect(service.expertNotes?.last_verified_at).toBeTruthy();
      expect(service.expertNotes?.owner).toBeTruthy();
    }
  });
});
