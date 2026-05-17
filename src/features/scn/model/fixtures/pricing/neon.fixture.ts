import { PricingInput } from '../../schemas/pricing.schema';

export const simpleNeonInput: PricingInput = {
  productType: 'neon',
  dimensions: {
    widthMm: 600,
    heightMm: 200
  },
  text: 'OPEN',
  symbolCount: 4,
  fontComplexity: 'simple',
  lighting: 'none', // Статичное свечение в 1 цвет
  urgency: 'standard',
  mountingRequired: false,
  complianceRequired: false,
  region: 'moscow'
};

export const complexRgbNeonInput: PricingInput = {
  productType: 'neon',
  dimensions: {
    widthMm: 1500,
    heightMm: 400
  },
  text: 'VIBE ZONE',
  symbolCount: 9,
  fontComplexity: 'complex',
  lighting: 'rgb', // RGB-динамика с контроллером
  urgency: 'fast', // Срочное изготовление (24ч)
  mountingRequired: true,
  complianceRequired: true, // Требуется проверка витрины по 902-ПП
  region: 'moscow'
};

export const premiumSmartNeonInput: PricingInput = {
  productType: 'neon',
  dimensions: {
    widthMm: 3000,
    heightMm: 800
  },
  text: 'FLAGSHIP ACCENT',
  symbolCount: 15,
  fontComplexity: 'logo',
  lighting: 'dynamic', // Smart Neon с контроллером эффектов
  urgency: 'urgent',
  mountingRequired: true,
  complianceRequired: true,
  region: 'mo'
};
