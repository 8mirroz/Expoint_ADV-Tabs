import { Service, SERVICES } from '@/data/services';

export interface PricingParameters {
  size: 'small' | 'medium' | 'large';
  material?: 'standard' | 'premium' | 'exclusive';
  installation?: boolean;
  customModifications?: number; // Additional cost for custom work
}

export interface PriceBreakdown {
  base: number;
  materialMultiplier: number;
  installationFee: number;
  customModifications: number;
  total: number;
}

/**
 * Calculate price for a service based on parameters
 * @param serviceId - Service identifier
 * @param params - Pricing parameters
 * @returns Price breakdown with total
 */
export function calculatePrice(serviceId: string, params: PricingParameters): PriceBreakdown {
  const service = SERVICES.find(s => s.id === serviceId);
  if (!service) {
    throw new Error(`Service with id "${serviceId}" not found`);
  }

  // Base price from service configuration
  let basePrice = service.basePrice;

  // Apply size multiplier
  const sizeMultipliers = {
    small: 1,
    medium: 1.5,
    large: 2.2
  };

  const sizePrice = basePrice * sizeMultipliers[params.size];

  // Material multipliers
  const materialMultipliers = {
    standard: 1,
    premium: 1.3,
    exclusive: 1.7
  };

  const materialPrice = sizePrice * (materialMultipliers[params.material || 'standard'] - 1);

  // Installation fee (20% of total)
  const installationFee = params.installation ? (sizePrice + materialPrice) * 0.2 : 0;

  // Calculate totals
  const materialCost = materialPrice;
  const total = sizePrice + materialCost + installationFee + (params.customModifications || 0);

  return {
    base: basePrice,
    materialMultiplier: materialCost,
    installationFee,
    customModifications: params.customModifications || 0,
    total: Math.round(total)
  };
}

/**
 * Get price range for a service
 * @param serviceId - Service identifier
 * @returns Min and max price range
 */
export function getPriceRange(serviceId: string): { min: number; max: number } {
  const service = SERVICES.find(s => s.id === serviceId);
  if (!service) {
    throw new Error(`Service with id "${serviceId}" not found`);
  }

  // Min price: small size, standard material, no installation
  const minParams: PricingParameters = { size: 'small' };
  const minPrice = calculatePrice(serviceId, minParams).total;

  // Max price: large size, exclusive material, with installation
  const maxParams: PricingParameters = {
    size: 'large',
    material: 'exclusive',
    installation: true
  };
  const maxPrice = calculatePrice(serviceId, maxParams).total;

  return { min: minPrice, max: maxPrice };
}