export interface NeonPricingParams {
  size: 'S' | 'M' | 'L'; // S ~ 30cm, M ~ 50cm, L ~ 80cm per character
  text: string;
  fontType: 'Print' | 'Serif' | 'Script';
  isRGB: boolean;
}

export interface NeonCalculationResult {
  neonLength: number; // in cm
  baseKitCost: number;
  neonCost: number;
  assemblyCost: number;
  backingCost: number;
  totalEstimatedCost: number;
}

const NEON_CONSTANTS = {
  BASE_KIT: 2000,
  COST_PER_CM: 45,
  ASSEMBLY_PER_CHAR: 187,
  BACKING_COST_PER_SQ_CM: 0.4,
  MIN_ORDER_VALUE: 9500,
};

const SIZE_MULTIPLIERS = {
  S: 30,
  M: 50,
  L: 80,
};

const FONT_MULTIPLIERS = {
  Print: 1.0,
  Serif: 1.15,
  Script: 1.25,
};

const COLOR_MULTIPLIERS = {
  Standard: 1.0,
  RGB: 1.5,
};

export function calculateNeonPrice(params: NeonPricingParams): NeonCalculationResult {
  const charCount = params.text.replace(/\s+/g, '').length || 1;
  const rawTextLength = params.text.length || 1;
  
  // 1. Calculate Neon Length
  const neonLength = charCount * SIZE_MULTIPLIERS[params.size];
  
  // 2. Neon Cost
  const kFont = FONT_MULTIPLIERS[params.fontType];
  const kColor = params.isRGB ? COLOR_MULTIPLIERS.RGB : COLOR_MULTIPLIERS.Standard;
  const neonCost = neonLength * NEON_CONSTANTS.COST_PER_CM * kFont * kColor;
  
  // 3. Assembly
  const assemblyCost = charCount * NEON_CONSTANTS.ASSEMBLY_PER_CHAR;
  
  // 4. Backing Cost (Approximate area based on size and text length)
  // Height approx: S=15cm, M=25cm, L=40cm
  // Width approx: charCount * (Height * 0.8)
  const heightApprox = params.size === 'S' ? 15 : params.size === 'M' ? 25 : 40;
  const widthApprox = rawTextLength * (heightApprox * 0.8);
  const areaSqCm = widthApprox * heightApprox;
  const backingCost = areaSqCm * NEON_CONSTANTS.BACKING_COST_PER_SQ_CM;
  
  // 5. Total
  let totalEstimatedCost = NEON_CONSTANTS.BASE_KIT + neonCost + assemblyCost + backingCost;
  
  // Minimum Order Value Enforced
  if (totalEstimatedCost < NEON_CONSTANTS.MIN_ORDER_VALUE) {
    totalEstimatedCost = NEON_CONSTANTS.MIN_ORDER_VALUE;
  }
  
  return {
    neonLength,
    baseKitCost: NEON_CONSTANTS.BASE_KIT,
    neonCost: Math.round(neonCost),
    assemblyCost: Math.round(assemblyCost),
    backingCost: Math.round(backingCost),
    totalEstimatedCost: Math.round(totalEstimatedCost),
  };
}
