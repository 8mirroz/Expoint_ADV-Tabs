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
  NEON_RATE: 45, // per cm, aligned with current custom-market anchor
  K_FONT: {
    Print: 1.0,
    Serif: 1.15,
    Script: 1.25,
  },
  K_COLOR: {
    static: 1.0,
    RGB: 1.5,
  },
  ASSEMBLY_PER_CHAR: 187,
  MIN_PRICE: 9500,
  K_BACKING: {
    none: 0,
    acrylic: 1500,
    contour: 2500,
    box: 4000,
  },
  K_URGENCY: 1.4,
};

export function calculateNeonPrice(inputs: NeonInputs): DetailedNeonResult {
  const textLength = inputs.text.replace(/\s+/g, '').length || 1;
  
  // Estimate neon length in cm based on size and text length
  const heightInCm = inputs.size === 'S' ? 15 : inputs.size === 'M' ? 25 : 40;
  const lengthPerCharacter = inputs.size === 'S' ? 30 : inputs.size === 'M' ? 50 : 80;
  const estimatedNeonLength = textLength * lengthPerCharacter;
  
  const fontMultiplier = CONSTANTS.K_FONT[inputs.fontType];
  const colorMultiplier = inputs.isRGB ? CONSTANTS.K_COLOR.RGB : CONSTANTS.K_COLOR.static;
  
  const neonCost = estimatedNeonLength * CONSTANTS.NEON_RATE * fontMultiplier * colorMultiplier;
  const assemblyCost = textLength * CONSTANTS.ASSEMBLY_PER_CHAR;
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
    estimatedPriceMin: Math.round(finalPrice),
    estimatedPriceMax: Math.ceil(finalPrice * 1.1),
    recommendedPackage,
    baseKitCost: CONSTANTS.BASE_KIT,
    neonCost: Math.round(neonCost),
    assemblyCost: Math.round(assemblyCost),
    neonLength: Math.round(estimatedNeonLength),
    assumptions: [
      `Расчет для текста из ${textLength} симв.`,
      `Высота символов ~${heightInCm} см`,
      inputs.urgency === 'fast' ? 'Срочность добавляет +40% к расчету' : 'Стандартный срок 3-5 рабочих дней',
    ],
    requiredClarifications: [
      'Точная длина неона зависит от выбранного шрифта',
      'Стоимость может измениться после отрисовки макета',
    ],
  };
}
