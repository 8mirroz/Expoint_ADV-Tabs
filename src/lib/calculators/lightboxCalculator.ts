import { DetailedLightboxResult, PackageId } from './pricingTypes';

export interface LightboxInputs {
  width: number; // in mm
  height: number; // in mm
  type: 'standard' | 'composite' | 'fabric' | 'ultra-thin';
  sides: 1 | 2;
  location: 'indoor' | 'outdoor';
  urgency: 'standard' | 'fast';
}

const RATES = {
  BASE: 4500, // per m2
  K_TYPE: {
    standard: 1.0,
    composite: 1.8,
    fabric: 1.3,
    'ultra-thin': 2.2,
  },
  K_LOCATION: {
    indoor: 1.0,
    outdoor: 1.25,
  },
  K_URGENCY: 1.2,
};

export interface LightboxMultiResult {
  start: DetailedLightboxResult;
  business: DetailedLightboxResult;
  premium: DetailedLightboxResult;
}

export function calculateLightboxPrice(inputs: LightboxInputs): LightboxMultiResult {
  const area = (inputs.width * inputs.height) / 1000000; // m2
  const basePrice = area * RATES.BASE * inputs.sides * RATES.K_LOCATION[inputs.location];
  
  const calculateForType = (type: LightboxInputs['type'], packageId: PackageId): DetailedLightboxResult => {
    let price = basePrice * RATES.K_TYPE[type];
    if (inputs.urgency === 'fast') price *= RATES.K_URGENCY;
    
    return {
      estimatedPriceMin: Math.floor(price * 0.9),
      estimatedPriceMax: Math.ceil(price * 1.15),
      recommendedPackage: packageId,
      area,
      unitPrice: Math.round(price / area),
      assumptions: [
        `Площадь изделия: ${area.toFixed(2)} м²`,
        `Тип: ${type}`,
      ],
      requiredClarifications: [
        'Цена не включает монтажные работы',
        'Требуется проверка возможности крепления на фасаде',
      ],
    };
  };

  return {
    start: calculateForType('standard', 'start'),
    business: calculateForType('fabric', 'business'), // Decoy: suggest slightly better than standard
    premium: calculateForType('composite', 'premium'),
  };
}
