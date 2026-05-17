import { DetailedNeonResult, PackageId } from './pricingTypes';

export interface NeonInputs {
  text: string;
  size: 'S' | 'M' | 'L';
  fontType: 'Print' | 'Serif' | 'Script';
  isRGB: boolean;
  backing: 'none' | 'acrylic' | 'contour' | 'box';
  urgency: 'standard' | 'fast';
}

const CONSTANTS = {
  BASE_KIT: 2500,
  NEON_RATE: 12, // per cm
  K_FONT: {
    Print: 1.0,
    Serif: 1.2,
    Script: 1.5,
  },
  K_COLOR: {
    static: 1.0,
    RGB: 1.8,
  },
  ASSEMBLY_RATE: 0.3, // 30% of material cost
  MIN_PRICE: 9500,
  K_BACKING: {
    none: 0,
    acrylic: 1500,
    contour: 2500,
    box: 4000,
  },
  K_URGENCY: 1.2,
};

export function calculateNeonPrice(inputs: NeonInputs): DetailedNeonResult {
  const textLength = inputs.text.length || 1;
  
  // Estimate neon length in cm based on size and text length
  const heightInCm = inputs.size === 'S' ? 15 : inputs.size === 'M' ? 25 : 40;
  const estimatedNeonLength = textLength * heightInCm * 1.5; // multiplier for curves
  
  const fontMultiplier = CONSTANTS.K_FONT[inputs.fontType];
  const colorMultiplier = inputs.isRGB ? CONSTANTS.K_COLOR.RGB : CONSTANTS.K_COLOR.static;
  
  const neonCost = estimatedNeonLength * CONSTANTS.NEON_RATE * fontMultiplier * colorMultiplier;
  const assemblyCost = neonCost * CONSTANTS.ASSEMBLY_RATE;
  const backingCost = CONSTANTS.K_BACKING[inputs.backing];
  
  let total = CONSTANTS.BASE_KIT + neonCost + assemblyCost + backingCost;
  
  if (inputs.urgency === 'fast') {
    total *= CONSTANTS.K_URGENCY;
  }
  
  const finalPrice = Math.max(total, CONSTANTS.MIN_PRICE);
  
  // Logic for recommended package
  let recommendedPackage: PackageId = 'start';
  if (inputs.isRGB || inputs.backing === 'contour' || finalPrice > 25000) {
    recommendedPackage = 'premium';
  } else if (finalPrice > 15000) {
    recommendedPackage = 'business';
  }

  return {
    estimatedPriceMin: Math.floor(finalPrice * 0.95),
    estimatedPriceMax: Math.ceil(finalPrice * 1.1),
    recommendedPackage,
    baseKitCost: CONSTANTS.BASE_KIT,
    neonCost: Math.round(neonCost),
    assemblyCost: Math.round(assemblyCost),
    neonLength: Math.round(estimatedNeonLength),
    assumptions: [
      `Расчет для текста из ${textLength} симв.`,
      `Высота символов ~${heightInCm} см`,
    ],
    requiredClarifications: [
      'Точная длина неона зависит от выбранного шрифта',
      'Стоимость может измениться после отрисовки макета',
    ],
  };
}
