export type SignType = 'channel-letters' | 'flexible-neon' | 'lightbox';
export type SizeMultiplier = 'small' | 'medium' | 'large';

export interface PricingParams {
  type: SignType;
  size: SizeMultiplier;
  textLength: number;
  hasInstallation: boolean;
}

const BASE_RATES: Record<SignType, number> = {
  'channel-letters': 1500, // per letter base
  'flexible-neon': 800, // per character base
  'lightbox': 15000, // flat base
};

const SIZE_MULTIPLIERS: Record<SizeMultiplier, number> = {
  small: 1,
  medium: 1.5,
  large: 2.2,
};

export function calculatePrice(params: PricingParams): number {
  const { type, size, textLength, hasInstallation } = params;
  
  let basePrice = 0;
  if (type === 'lightbox') {
    basePrice = BASE_RATES[type] * SIZE_MULTIPLIERS[size];
  } else {
    basePrice = (BASE_RATES[type] * Math.max(1, textLength)) * SIZE_MULTIPLIERS[size];
  }

  // Installation is roughly 20% of the price or minimum 5000
  const installCost = hasInstallation ? Math.max(5000, basePrice * 0.2) : 0;
  
  return Math.round(basePrice + installCost);
}
