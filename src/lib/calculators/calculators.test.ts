import { describe, it, expect } from 'vitest';
import { calculateNeonPrice } from './neonCalculator';
import { calculateLightboxPrice } from './lightboxCalculator';

describe('Neon Calculator', () => {
  it('should calculate minimum price correctly', () => {
    const result = calculateNeonPrice({
      text: 'A',
      size: 'S',
      fontType: 'Print',
      isRGB: false,
      backing: 'none',
      urgency: 'standard',
    });
    expect(result.estimatedPriceMin).toBeGreaterThanOrEqual(9000); // 9500 * 0.95 = 9025
  });

  it('should recommend premium for RGB', () => {
    const result = calculateNeonPrice({
      text: 'NEON',
      size: 'L',
      fontType: 'Script',
      isRGB: true,
      backing: 'contour',
      urgency: 'standard',
    });
    expect(result.recommendedPackage).toBe('premium');
  });
});

describe('Lightbox Calculator', () => {
  it('should return 3 options with business recommended', () => {
    const results = calculateLightboxPrice({
      width: 2000,
      height: 1000,
      type: 'standard',
      sides: 1,
      location: 'outdoor',
      urgency: 'standard',
    });
    expect(results.start.recommendedPackage).toBe('start');
    expect(results.business.recommendedPackage).toBe('business');
    expect(results.premium.recommendedPackage).toBe('premium');
    expect(results.premium.estimatedPriceMin).toBeGreaterThan(results.start.estimatedPriceMin);
  });
});
