/**
 * Pricing Matrix derived from NotebookLM research on Russian signage manufacturing (Reklamastroy standards).
 * Prices are in RUB and based on letter height (cm).
 */

export interface HeightPriceRate {
  minHeightCm: number;
  maxHeightCm: number;
  ratePerCm: number; // Base rate per 1cm of height
}

export const BASE_HEIGHT_RATES: HeightPriceRate[] = [
  { minHeightCm: 10, maxHeightCm: 25, ratePerCm: 95 },
  { minHeightCm: 26, maxHeightCm: 50, ratePerCm: 120 },
  { minHeightCm: 51, maxHeightCm: 100, ratePerCm: 180 },
];

export interface PricingModifiers {
  complexity: {
    standard: number;
    serif: number;
    script: number;
  };
  mounting: {
    wall_simple: number;
    frame: number;
    roof: number;
  };
  urgency: {
    standard: number; // 7-10 days
    express: number;  // 3-5 days
  };
}

export const PRICING_MODIFIERS: PricingModifiers = {
  complexity: {
    standard: 1.0,
    serif: 1.2,
    script: 1.5,
  },
  mounting: {
    wall_simple: 5000, // Fixed cost base
    frame: 12000,
    roof: 45000,
  },
  urgency: {
    standard: 1.0,
    express: 1.3,
  },
};

export function calculateEstimatedPriceRange(params: {
  heightCm: number;
  count: number;
  complexity: keyof PricingModifiers['complexity'];
  mounting: keyof PricingModifiers['mounting'];
  urgency: keyof PricingModifiers['urgency'];
  materialModifier: number;
  lightingModifier: number;
}) {
  const rateObj = BASE_HEIGHT_RATES.find(
    r => params.heightCm >= r.minHeightCm && params.heightCm <= r.maxHeightCm
  ) || BASE_HEIGHT_RATES[0];

  const baseTotal = rateObj.ratePerCm * params.heightCm * params.count;
  
  const modifiedTotal = baseTotal 
    * PRICING_MODIFIERS.complexity[params.complexity]
    * PRICING_MODIFIERS.urgency[params.urgency]
    * params.materialModifier
    * params.lightingModifier;

  const finalWithMounting = modifiedTotal + PRICING_MODIFIERS.mounting[params.mounting];

  return {
    min: Math.round(finalWithMounting * 0.9),
    max: Math.round(finalWithMounting * 1.15),
    currency: 'RUB'
  };
}
