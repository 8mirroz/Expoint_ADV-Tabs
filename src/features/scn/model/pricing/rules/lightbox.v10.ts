import { PricingRuleSet, PricingValidationResult } from '../types';
import { PricingInput, PricingResult, ParsedPricingInput, PricingBreakdownItem } from '../../schemas/pricing.schema';

const CONSTANTS = {
  BASE_RATE: 4500, // per m2
  K_TYPE: {
    standard: 1.0,
    composite: 1.8,
    fabric: 1.3,
    'ultra-thin': 2.2,
    'profile-plastic': 1.0,
    'metal-composite': 1.8,
    'premium-wood-finish': 2.0
  },
  K_REGION: {
    moscow: 1.0,
    mo: 1.15,
    other: 1.25
  },
  K_URGENCY: {
    standard: 1.0,
    fast: 1.2,
    urgent: 1.4
  },
  MIN_PRICE: 12500, // Минимальный световой короб с диодами и блоком питания
  BASE_MOUNTING: 4000 // Базовый монтаж светового короба
};

export const lightboxV10Rule: PricingRuleSet = {
  productType: 'lightboxes',
  version: '10.0',
  effectiveFrom: '2026-04-09',
  minOrderRub: CONSTANTS.MIN_PRICE,

  validateInput(input: PricingInput): PricingValidationResult {
    const errors: string[] = [];
    
    if (input.productType !== 'lightboxes') {
      errors.push(`Ожидается тип продукта "lightboxes", получено "${input.productType}"`);
    }

    const hasArea = input.dimensions.areaM2 !== undefined;
    const hasDimensions = input.dimensions.widthMm !== undefined && input.dimensions.heightMm !== undefined;

    if (!hasArea && !hasDimensions) {
      errors.push('Необходимо указать либо площадь изделия (areaM2), либо ширину и высоту (widthMm, heightMm)');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  calculate(input: ParsedPricingInput): PricingResult {
    const validation = this.validateInput(input);
    if (!validation.isValid) {
      return {
        ruleVersion: this.version,
        currency: 'RUB',
        basePrice: 0,
        minOrderApplied: false,
        confidence: 'low',
        breakdown: [],
        warnings: validation.errors
      };
    }

    // Вычисляем площадь в м2
    let areaM2 = 0.5; // Значение по умолчанию (средний короб)
    if (input.dimensions.areaM2) {
      areaM2 = input.dimensions.areaM2;
    } else if (input.dimensions.widthMm && input.dimensions.heightMm) {
      areaM2 = (input.dimensions.widthMm * input.dimensions.heightMm) / 1000000;
    }

    // Коэффициент материала/типа короба
    let materialKey: keyof typeof CONSTANTS.K_TYPE = 'standard';
    if (input.material && input.material in CONSTANTS.K_TYPE) {
      materialKey = input.material as keyof typeof CONSTANTS.K_TYPE;
    }
    const typeMultiplier = CONSTANTS.K_TYPE[materialKey];

    // Коэффициент двусторонности / свечения
    let sidesMultiplier = 1.0;
    if (input.lighting === 'back' || input.lighting === 'rgb' || input.lighting === 'dynamic') {
      sidesMultiplier = 1.8; // Двусторонний или сложный короб
    }

    // Коэффициент региона монтажа/доставки
    const regionMultiplier = CONSTANTS.K_REGION[input.region] || 1.0;

    let subtotal = areaM2 * CONSTANTS.BASE_RATE * typeMultiplier * sidesMultiplier * regionMultiplier;

    // Учет срочности
    const urgencyMultiplier = CONSTANTS.K_URGENCY[input.urgency] || 1.0;
    subtotal *= urgencyMultiplier;

    // Учет монтажа
    let mountingCost = 0;
    if (input.mountingRequired) {
      // Монтаж растет пропорционально площади
      mountingCost = CONSTANTS.BASE_MOUNTING + Math.round(areaM2 * 1500);
      subtotal += mountingCost;
    }

    // Защита минимальной стоимости заказа
    let finalPrice = subtotal;
    let minOrderApplied = false;
    if (finalPrice < CONSTANTS.MIN_PRICE) {
      finalPrice = CONSTANTS.MIN_PRICE;
      minOrderApplied = true;
    }

    const breakdown: PricingBreakdownItem[] = [
      {
        code: 'BOX_PRODUCTION',
        label: `Световой короб (${materialKey})`,
        value: Math.round(areaM2 * CONSTANTS.BASE_RATE * typeMultiplier),
        unit: 'м2',
        formula: `${areaM2.toFixed(2)} м2 * ${CONSTANTS.BASE_RATE} руб/м2 * K_type(${typeMultiplier})`
      }
    ];

    if (sidesMultiplier > 1.0) {
      breakdown.push({
        code: 'COMPLEX_LIGHT',
        label: 'Двусторонняя конструкция / динамическая подсветка',
        value: Math.round(areaM2 * CONSTANTS.BASE_RATE * typeMultiplier * (sidesMultiplier - 1.0)),
        unit: 'услуга',
        formula: 'Наценка за сложность'
      });
    }

    if (input.mountingRequired) {
      breakdown.push({
        code: 'MOUNTING',
        label: 'Монтажные работы (с учетом площади)',
        value: mountingCost,
        unit: 'услуга',
        formula: `${CONSTANTS.BASE_MOUNTING} руб + ${areaM2.toFixed(2)} м2 * 1500 руб/м2`
      });
    }

    const warnings: string[] = [];
    if (areaM2 > 3.0) {
      warnings.push('Внимание: Площадь короба превышает 3 м². Может потребоваться усиленный металлический каркас и согласование по 902-ПП.');
    }
    if (input.region === 'other') {
      warnings.push('Внимание: Доставка за пределы МО рассчитывается индивидуально.');
    }

    return {
      ruleVersion: this.version,
      currency: 'RUB',
      basePrice: Math.round(finalPrice),
      minOrderApplied,
      confidence: 'high',
      breakdown,
      warnings
    };
  }
};
