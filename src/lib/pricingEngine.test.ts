import { describe, it, expect, vi } from 'vitest';
import { calculatePrice, getPriceRange } from './pricingEngine';

// Mock the services data module
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

describe('pricingEngine', () => {
  describe('calculatePrice', () => {
    it('should calculate base price for small size', () => {
      const result = calculatePrice('test-service', { size: 'small' });
      expect(result.base).toBe(10000);
      expect(result.total).toBe(10000); // small * 1.0, no material, no install
    });

    it('should apply size multipliers', () => {
      const mediumResult = calculatePrice('test-service', { size: 'medium' });
      expect(mediumResult.total).toBe(15000); // 10000 * 1.5

      const largeResult = calculatePrice('test-service', { size: 'large' });
      expect(largeResult.total).toBe(22000); // 10000 * 2.2
    });

    it('should apply material multipliers', () => {
      const premiumResult = calculatePrice('test-service', {
        size: 'small',
        material: 'premium',
      });
      // sizePrice=10000, materialPrice=10000*(1.3-1)=3000, total=13000
      expect(premiumResult.total).toBe(13000);

      const exclusiveResult = calculatePrice('test-service', {
        size: 'small',
        material: 'exclusive',
      });
      // sizePrice=10000, materialPrice=10000*(1.7-1)=7000, total=17000
      expect(exclusiveResult.total).toBe(17000);
    });

    it('should apply installation fee (20%)', () => {
      const result = calculatePrice('test-service', {
        size: 'small',
        installation: true,
      });
      // sizePrice=10000, no material, installFee=10000*0.2=2000, total=12000
      expect(result.installationFee).toBe(2000);
      expect(result.total).toBe(12000);
    });

    it('should include custom modifications cost', () => {
      const result = calculatePrice('test-service', {
        size: 'small',
        customModifications: 5000,
      });
      expect(result.customModifications).toBe(5000);
      expect(result.total).toBe(15000);
    });

    it('should throw for unknown service', () => {
      expect(() => calculatePrice('nonexistent', { size: 'small' })).toThrow('not found');
    });
  });

  describe('getPriceRange', () => {
    it('should return min and max price range', () => {
      const range = getPriceRange('test-service');
      expect(range.min).toBeLessThan(range.max);
      expect(range.min).toBe(10000); // small, standard, no install
      // large * 2.2 = 22000, exclusive 22000 * 0.7 = 15400, total 22000+15400 = 37400, install 37400*0.2=7480 => 44880
      expect(range.max).toBeGreaterThan(range.min);
    });

    it('should throw for unknown service', () => {
      expect(() => getPriceRange('nonexistent')).toThrow('not found');
    });
  });
});
