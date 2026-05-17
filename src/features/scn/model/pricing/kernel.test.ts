import { describe, it, expect } from 'vitest';
import { PricingKernel } from './kernel';
import { simpleNeonInput, complexRgbNeonInput, premiumSmartNeonInput } from '../fixtures/pricing/neon.fixture';
import { standardLightboxInput, doubleSidedConsoleInput, largeFormatFacadeInput } from '../fixtures/pricing/lightbox.fixture';
import { PricingValidationError } from './errors';

describe('SCN PricingKernel - Neon calculations', () => {
  it('should calculate base price correctly for simple neon', () => {
    const result = PricingKernel.calculate(simpleNeonInput);
    
    expect(result.ruleVersion).toBe('10.0');
    expect(result.currency).toBe('RUB');
    expect(result.basePrice).toBe(14748);
    expect(result.minOrderApplied).toBe(false);
    expect(result.confidence).toBe('high');
    expect(result.breakdown.some(item => item.code === 'BASE_KIT')).toBe(true);
  });

  it('should apply minimum order price for single letter small neon', () => {
    const result = PricingKernel.calculate({
      productType: 'neon',
      dimensions: {
        widthMm: 100,
        heightMm: 100
      },
      text: 'I',
      symbolCount: 1,
      fontComplexity: 'simple',
      lighting: 'none',
      urgency: 'standard',
      mountingRequired: false,
      region: 'moscow'
    });
    
    expect(result.basePrice).toBe(9500); // Срабатывает минимальный заказ
    expect(result.minOrderApplied).toBe(true);
  });

  it('should calculate price correctly for complex RGB neon', () => {
    const result = PricingKernel.calculate(complexRgbNeonInput);
    
    expect(result.basePrice).toBeGreaterThan(9500);
    expect(result.minOrderApplied).toBe(false);
    expect(result.breakdown.some(item => item.code === 'MOUNTING')).toBe(true);
    
    // Проверим, что предупреждение о RGB контроллере присутствует
    expect(result.warnings.some(w => w.includes('RGB'))).toBe(true);
  });

  it('should apply high premium pricing for smart neon', () => {
    const result = PricingKernel.calculate(premiumSmartNeonInput);
    
    expect(result.basePrice).toBeGreaterThan(15000);
    expect(result.confidence).toBe('high');
  });
});

describe('SCN PricingKernel - Lightbox calculations', () => {
  it('should calculate standard single-sided lightbox correctly', () => {
    const result = PricingKernel.calculate(standardLightboxInput);
    
    expect(result.ruleVersion).toBe('10.0');
    expect(result.minOrderApplied).toBe(true); // Площадь 0.6м2 * 4500 = 2700, + монтаж 4900 = 7600 < 12500
    expect(result.basePrice).toBe(12500);
  });

  it('should calculate double-sided console lightbox', () => {
    const result = PricingKernel.calculate(doubleSidedConsoleInput);
    
    expect(result.basePrice).toBeGreaterThanOrEqual(12500);
    expect(result.breakdown.some(item => item.code === 'COMPLEX_LIGHT')).toBe(true);
  });

  it('should calculate large format facade lightbox and emit warning', () => {
    const result = PricingKernel.calculate(largeFormatFacadeInput);
    
    expect(result.basePrice).toBeGreaterThan(20000);
    // Проверим предупреждение о площади >3м2
    expect(result.warnings.some(w => w.includes('превышает 3 м²'))).toBe(true);
  });
});

describe('SCN PricingKernel - Input validation & error boundaries', () => {
  it('should throw PricingValidationError on negative dimensions', () => {
    expect(() => {
      PricingKernel.calculate({
        productType: 'neon',
        dimensions: {
          widthMm: -100, // Некорректно
          heightMm: 200
        },
        text: 'ERROR'
      });
    }).toThrow(PricingValidationError);
  });

  it('should throw PricingValidationError on missing text and dimensions', () => {
    expect(() => {
      PricingKernel.calculate({
        productType: 'neon',
        dimensions: {},
        text: ''
      });
    }).toThrow(PricingValidationError);
  });
});
