import { describe, it, expect, vi } from 'vitest';
import {
  calculateConfiguratorEstimate,
  calculatePrice,
  getPriceRange,
  DEFAULT_CALCULATOR_CONFIG,
} from './pricingEngine';

vi.mock('@/data/services', () => ({
  SERVICES: [
    {
      id: 'test-service',
      title: 'Test Service',
      basePrice: 10000,
      priceUnit: '₽',
      shortDescription: 'Test service description',
      fullDescription: 'Full test service description',
      features: ['Feature 1', 'Feature 2'],
      segments: ['retail'],
    }
  ]
}));

describe('pricingEngine legacy API', () => {
  it('calculates legacy base price for small size', () => {
    const result = calculatePrice('test-service', { size: 'small' });
    expect(result.base).toBe(10000);
    expect(result.total).toBe(10000);
  });

  it('keeps legacy min/max price range behavior', () => {
    const range = getPriceRange('test-service');
    expect(range.min).toBe(10000);
    expect(range.max).toBeGreaterThan(range.min);
  });
});

describe('calculateConfiguratorEstimate', () => {
  it('calculates volumetric letters by height, symbol count, and complexity', () => {
    const standard = calculateConfiguratorEstimate({
      ...DEFAULT_CALCULATOR_CONFIG,
      productType: 'volumetric-letters',
      text: 'CAFE',
      quantity: 4,
      heightMm: 300,
      complexity: 'standard',
      materialTier: 'standard',
      lighting: 'internal',
      mounting: 'none',
      needs902Audit: false,
    });
    const serif = calculateConfiguratorEstimate({
      ...standard.config,
      complexity: 'serif',
    });

    expect(standard.breakdown.productSubtotal).toBe(12600);
    expect(serif.breakdown.total).toBeGreaterThan(standard.breakdown.total);
  });

  it('applies lightbox area thresholds and minimum order', () => {
    const small = calculateConfiguratorEstimate({
      ...DEFAULT_CALCULATOR_CONFIG,
      productType: 'lightbox',
      widthMm: 300,
      heightMm: 300,
      materialTier: 'standard',
      lighting: 'internal',
      mounting: 'none',
      needs902Audit: false,
    });
    const large = calculateConfiguratorEstimate({
      ...small.config,
      widthMm: 3000,
      heightMm: 2000,
    });

    expect(small.breakdown.productSubtotal).toBe(6500);
    expect(large.breakdown.total).toBeGreaterThan(small.breakdown.total);
    expect(large.breakdown.formula).toContain('м2');
  });

  it('calculates neon linear length and RGB modifier', () => {
    const standard = calculateConfiguratorEstimate({
      ...DEFAULT_CALCULATOR_CONFIG,
      productType: 'flex-neon',
      text: 'OPEN BAR',
      quantity: 7,
      heightMm: 600,
      materialTier: 'standard',
      lighting: 'internal',
      mounting: 'none',
      needs902Audit: false,
    });
    const rgb = calculateConfiguratorEstimate({
      ...standard.config,
      lighting: 'combined',
    });

    expect(standard.breakdown.formula).toContain('м.п.');
    expect(rgb.breakdown.total).toBeGreaterThan(standard.breakdown.total);
  });

  it('adds mounting, dismantling, urgency, high access, and 902-PP audit', () => {
    const base = calculateConfiguratorEstimate({
      ...DEFAULT_CALCULATOR_CONFIG,
      mounting: 'none',
      urgency: 'standard',
      needsDismantling: false,
      needs902Audit: false,
      highAccess: false,
    });
    const full = calculateConfiguratorEstimate({
      ...base.config,
      mounting: 'frame',
      urgency: 'express',
      needsDismantling: true,
      needs902Audit: true,
      highAccess: true,
    });

    expect(full.breakdown.mounting).toBeGreaterThan(base.breakdown.mounting);
    expect(full.breakdown.dismantling).toBeGreaterThan(0);
    expect(full.breakdown.urgency).toBeGreaterThan(0);
    expect(full.breakdown.compliance).toBeGreaterThanOrEqual(0);
    expect(full.breakdown.total).toBeGreaterThan(base.breakdown.total);
  });

  it('generates ordered Start, Business, and Premium packages', () => {
    const estimate = calculateConfiguratorEstimate(DEFAULT_CALCULATOR_CONFIG);
    const [start, business, premium] = estimate.packages;

    expect(start.id).toBe('start');
    expect(business.id).toBe('business');
    expect(business.recommended).toBe(true);
    expect(premium.id).toBe('premium');
    expect(start.price).toBeLessThan(business.price);
    expect(business.price).toBeLessThan(premium.price);
  });
});
