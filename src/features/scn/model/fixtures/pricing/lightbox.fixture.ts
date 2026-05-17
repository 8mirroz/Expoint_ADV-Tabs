import { PricingInput } from '../../schemas/pricing.schema';

export const standardLightboxInput: PricingInput = {
  productType: 'lightboxes',
  dimensions: {
    widthMm: 1200,
    heightMm: 500,
    areaM2: 0.6
  },
  material: 'profile-plastic',
  fontComplexity: 'simple',
  lighting: 'front', // Односторонний световой короб
  urgency: 'standard',
  mountingRequired: true,
  complianceRequired: false,
  region: 'moscow'
};

export const doubleSidedConsoleInput: PricingInput = {
  productType: 'lightboxes',
  dimensions: {
    widthMm: 600,
    heightMm: 600,
    areaM2: 0.36
  },
  material: 'metal-composite',
  fontComplexity: 'medium',
  lighting: 'back', // Будем трактовать как двустороннюю консоль (или боковое свечение)
  urgency: 'fast',
  mountingRequired: true,
  complianceRequired: true,
  region: 'moscow'
};

export const largeFormatFacadeInput: PricingInput = {
  productType: 'lightboxes',
  dimensions: {
    widthMm: 4000,
    heightMm: 1200,
    areaM2: 4.8 // Большой формат (>3м2)
  },
  material: 'premium-wood-finish',
  fontComplexity: 'logo',
  lighting: 'front',
  urgency: 'standard',
  mountingRequired: true,
  complianceRequired: true,
  region: 'mo'
};
