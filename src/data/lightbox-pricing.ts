export interface LightboxParams {
  width: number; // in cm
  height: number; // in cm
  type: 'Standard' | 'Shape' | 'Composite' | 'Fabric';
  sides: 'One' | 'Two';
  mounting: 'None' | 'Standard' | 'High';
  isUrgent: boolean;
}

export interface LightboxPackages {
  start: number;
  business: number;
  premium: number;
}

const CONSTANTS = {
  MIN_PRICE: 6500,
  BASE_RATE_SMALL: 8000, // 1 to 5 sq.m
  BASE_RATE_MED: 7500,   // 5 to 10 sq.m
  BASE_RATE_LARGE: 7000, // 10 to 20 sq.m
  MOUNTING_MIN: 4500,
  MOUNTING_PER_SQM: 800,
  MOUNTING_HIGH_LIFT: 18000,
};

const K_TYPE = {
  Standard: 1.0,
  Shape: 1.25,
  Composite: 1.4,
  Fabric: 1.3,
};

const K_SIDES = {
  One: 1.0,
  Two: 1.6,
};

export function calculateLightboxPackages(params: LightboxParams): LightboxPackages {
  // 1. Calculate Area in Sq.M
  const area = (params.width * params.height) / 10000;
  
  // 2. Base Rate
  let baseRate = 0;
  let rawCost = 0;

  if (area < 0.25) {
    rawCost = CONSTANTS.MIN_PRICE;
  } else {
    if (area < 5) baseRate = CONSTANTS.BASE_RATE_SMALL;
    else if (area < 10) baseRate = CONSTANTS.BASE_RATE_MED;
    else baseRate = CONSTANTS.BASE_RATE_LARGE;
    
    rawCost = (area * baseRate) * K_TYPE[params.type] * K_SIDES[params.sides];
  }

  // 3. Mounting Cost
  let mountingCost = 0;
  if (params.mounting === 'Standard') {
    mountingCost = Math.max(CONSTANTS.MOUNTING_MIN, area * CONSTANTS.MOUNTING_PER_SQM);
  } else if (params.mounting === 'High') {
    mountingCost = Math.max(CONSTANTS.MOUNTING_MIN, area * CONSTANTS.MOUNTING_PER_SQM) + CONSTANTS.MOUNTING_HIGH_LIFT;
  }

  // 4. Urgency
  const urgencyMultiplier = params.isUrgent ? 1.4 : 1.0;
  
  // Base Production Cost
  const productionCost = Math.round(rawCost * urgencyMultiplier);

  // Decoy Packages Strategy
  // Start: Only production cost (pickup)
  const startCost = productionCost;
  
  // Business: Production + Mounting + Premium LEDs (approx + 20% to base)
  const premiumLedAddon = Math.round(productionCost * 0.2);
  const businessCost = productionCost + mountingCost + premiumLedAddon;
  
  // Premium: Business + Anti-vandal face (Composite/Inlay) + 902-PP Docs (approx + 35% to base)
  const premiumMaterialAddon = Math.round(productionCost * 0.35);
  const premiumCost = businessCost + premiumMaterialAddon + 3000; // 3000 for docs

  return {
    start: startCost,
    business: businessCost,
    premium: premiumCost,
  };
}
