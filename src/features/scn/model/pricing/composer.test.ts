import { describe, it, expect } from 'vitest';
import { PricingKernel } from './kernel';
import { OfferComposer } from './composer';

describe('SCN OfferComposer - Package generation, Compliance & Scoring', () => {
  it('should generate three packages for neon with correct prices and options', () => {
    const input = {
      productType: 'neon' as const,
      dimensions: {
        widthMm: 1000,
        heightMm: 500
      },
      text: 'EXPOINT',
      symbolCount: 7,
      material: 'acrylic',
      fontComplexity: 'medium' as const,
      lighting: 'rgb' as const,
      urgency: 'standard' as const,
      mountingRequired: true,
      complianceRequired: false,
      region: 'moscow' as const
    };

    const pricingResult = PricingKernel.calculate(input);
    const payload = OfferComposer.compose(pricingResult, input, 'b2b');

    // Проверяем наличие всех трех пакетов
    expect(payload.packages.start).toBeDefined();
    expect(payload.packages.business).toBeDefined();
    expect(payload.packages.premium).toBeDefined();

    // Проверяем цены и пропорции
    const basePrice = pricingResult.basePrice;
    expect(payload.packages.business.priceFrom).toBe(basePrice);
    expect(payload.packages.start.priceFrom).toBe(Math.max(9500, Math.round((basePrice * 0.85) / 100) * 100));
    expect(payload.packages.premium.priceFrom).toBe(Math.round((basePrice * 1.45) / 100) * 100);

    // Проверяем флаги рекомендаций
    expect(payload.packages.business.isRecommended).toBe(true);
    expect(payload.packages.start.isRecommended).toBe(false);
    expect(payload.packages.premium.isRecommended).toBe(false);

    // Опции неона должны присутствовать
    expect(payload.packages.start.included).toContain('Базовая подложка (акрил)');
    expect(payload.packages.premium.included).toContain('Многоцветный Smart-контроллер с пультом управления');
  });

  it('should evaluate low compliance risk when compliance is not requested', () => {
    const input = {
      productType: 'lightboxes' as const,
      dimensions: {
        widthMm: 4000,
        heightMm: 2000 // area = 8 m2 (> 3m2)
      },
      lighting: 'front' as const,
      complianceRequired: false,
      region: 'moscow' as const,
      fontComplexity: 'simple' as const,
      urgency: 'standard' as const,
      mountingRequired: false
    };

    const pricingResult = PricingKernel.calculate(input);
    const payload = OfferComposer.compose(pricingResult, input, 'retail');

    expect(payload.complianceRisk.level).toBe('none');
    expect(payload.complianceRisk.requiresEngineerReview).toBe(false);
    expect(payload.complianceRisk.flags).toHaveLength(0);
  });

  it('should trigger high compliance risk and require engineer review for large facade lightbox', () => {
    const input = {
      productType: 'lightboxes' as const,
      dimensions: {
        widthMm: 4000,
        heightMm: 2000 // area = 8 m2 (> 3m2)
      },
      lighting: 'front' as const,
      complianceRequired: true,
      region: 'moscow' as const,
      fontComplexity: 'simple' as const,
      urgency: 'standard' as const,
      mountingRequired: false
    };

    const pricingResult = PricingKernel.calculate(input);
    const payload = OfferComposer.compose(pricingResult, input, 'b2b');

    expect(payload.complianceRisk.level).toBe('high');
    expect(payload.complianceRisk.flags).toContain('excessive-area');
    expect(payload.complianceRisk.flags).toContain('permit-required');
    expect(payload.complianceRisk.requiresEngineerReview).toBe(true);
    expect(payload.complianceRisk.userMessage).toContain('Площадь вывески превышает 3 м²');
  });

  it('should score lead appropriately for various contexts and parameters', () => {
    const input = {
      productType: 'neon' as const,
      dimensions: {
        widthMm: 2000,
        heightMm: 1000
      },
      text: 'HIGH END LEAD',
      symbolCount: 13,
      lighting: 'dynamic' as const,
      urgency: 'urgent' as const,
      mountingRequired: true,
      complianceRequired: false,
      region: 'moscow' as const,
      material: 'acrylic',
      fontComplexity: 'simple' as const
    };

    const pricingResult = PricingKernel.calculate(input);
    
    // Премиальный B2B запуск с монтажом и срочностью
    const payloadB2b = OfferComposer.compose(pricingResult, input, 'b2b');
    expect(payloadB2b.leadScore.total).toBeGreaterThanOrEqual(80);
    expect(payloadB2b.leadScore.grade).toBeTypeOf('string');
    expect(payloadB2b.leadScore.reasons).toContain('Приоритетный B2B клиент');
    expect(payloadB2b.leadScore.reasons).toContain('Повышенная срочность изготовления');

    // Розничный запуск без срочности
    const retailInput = { ...input, urgency: 'standard' as const, mountingRequired: false };
    const retailResult = PricingKernel.calculate(retailInput);
    const payloadRetail = OfferComposer.compose(retailResult, retailInput, 'retail');
    expect(payloadRetail.leadScore.total).toBeLessThan(payloadB2b.leadScore.total);
  });
});
