export type PackageId = 'start' | 'business' | 'premium';

export interface CalculationResult {
  estimatedPriceMin: number;
  estimatedPriceMax: number;
  recommendedPackage: PackageId;
  assumptions: string[];
  requiredClarifications: string[];
}

export interface DetailedNeonResult extends CalculationResult {
  baseKitCost: number;
  neonCost: number;
  assemblyCost: number;
  neonLength: number;
}

export interface DetailedLightboxResult extends CalculationResult {
  area: number;
  unitPrice: number;
}
