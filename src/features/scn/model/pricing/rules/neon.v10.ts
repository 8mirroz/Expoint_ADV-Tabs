import { PricingRuleSet, PricingValidationResult } from '../types';
import { PricingInput, PricingResult, ParsedPricingInput } from '../../schemas/pricing.schema';

const CONSTANTS = {
  BASE_KIT: 2500,
  NEON_RATE: 45, // per cm
  K_FONT: {
    simple: 1.0,
    medium: 1.15,
    complex: 1.25,
    logo: 1.50
  },
  K_COLOR: {
    none: 1.0,
    front: 1.15,
    back: 1.15,
    rgb: 1.5,
    dynamic: 2.0
  },
  ASSEMBLY_PER_CHAR: 187,
  MIN_PRICE: 9500,
  K_BACKING: {
    none: 0,
    acrylic: 1500,
    contour: 2500,
    box: 4000
  },
  K_URGENCY: {
    standard: 1.0,
    fast: 1.4,
    urgent: 1.6
  },
  MOUNTING_COST: 3500 // Базовая стоимость монтажа
};

export const neonV10Rule: PricingRuleSet = {
  productType: 'neon',
  version: '10.0',
  effectiveFrom: '2026-04-09',
  minOrderRub: CONSTANTS.MIN_PRICE,

  validateInput(input: PricingInput): PricingValidationResult {
    const errors: string[] = [];
    
    if (input.productType !== 'neon') {
      errors.push(`Ожидается тип продукта "neon", получено "${input.productType}"`);
    }
    
    const textLength = input.text?.replace(/\s+/g, '').length || input.symbolCount || 0;
    if (textLength === 0 && (!input.dimensions.widthMm || !input.dimensions.heightMm)) {
      errors.push('Необходимо указать либо текст (или количество символов), либо габаритные размеры (ширину и высоту)');
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

    const textLength = input.text?.replace(/\s+/g, '').length || input.symbolCount || 1;
    const widthMm = input.dimensions.widthMm || 600;
    const heightMm = input.dimensions.heightMm || 200;
    const heightInCm = heightMm / 10;

    // Расчет длины неона в см
    let estimatedNeonLength = 0;
    let lengthPerCharacter = 50; // По умолчанию (размер M)
    
    if (heightInCm <= 15) lengthPerCharacter = 30;
    else if (heightInCm <= 25) lengthPerCharacter = 50;
    else lengthPerCharacter = 80;

    estimatedNeonLength = textLength * lengthPerCharacter;

    const fontMultiplier = CONSTANTS.K_FONT[input.fontComplexity] || 1.0;
    const colorMultiplier = CONSTANTS.K_COLOR[input.lighting] || 1.0;

    const neonCost = estimatedNeonLength * CONSTANTS.NEON_RATE * fontMultiplier * colorMultiplier;
    const assemblyCost = textLength * CONSTANTS.ASSEMBLY_PER_CHAR;

    // Материал/подложка
    let backingType: 'none' | 'acrylic' | 'contour' | 'box' = 'contour';
    if (input.material === 'none' || input.material === 'acrylic' || input.material === 'contour' || input.material === 'box') {
      backingType = input.material;
    }
    const backingCost = CONSTANTS.K_BACKING[backingType];

    let subtotal = CONSTANTS.BASE_KIT + neonCost + assemblyCost + backingCost;

    // Учет срочности
    const urgencyMultiplier = CONSTANTS.K_URGENCY[input.urgency] || 1.0;
    subtotal *= urgencyMultiplier;

    // Добавляем монтаж
    let mountingCost = 0;
    if (input.mountingRequired) {
      mountingCost = CONSTANTS.MOUNTING_COST;
      subtotal += mountingCost;
    }

    // Защита минимальной стоимости заказа
    let finalPrice = subtotal;
    let minOrderApplied = false;
    if (finalPrice < CONSTANTS.MIN_PRICE) {
      finalPrice = CONSTANTS.MIN_PRICE;
      minOrderApplied = true;
    }

    const breakdown = [
      { code: 'BASE_KIT', label: 'Базовый комплект коммутации и крепежа', value: CONSTANTS.BASE_KIT, unit: 'шт' },
      { code: 'NEON_TUBE', label: 'Гибкий неон', value: Math.round(neonCost), unit: 'см', formula: `${estimatedNeonLength} см * ${CONSTANTS.NEON_RATE} руб/см * K_font(${fontMultiplier}) * K_light(${colorMultiplier})` },
      { code: 'ASSEMBLY', label: 'Сборка и распайка элементов', value: Math.round(assemblyCost), unit: 'симв', formula: `${textLength} симв * ${CONSTANTS.ASSEMBLY_PER_CHAR} руб/симв` },
      { code: 'BACKING', label: `Акриловая подложка (${backingType})`, value: backingCost, unit: 'шт' }
    ];

    if (input.mountingRequired) {
      breakdown.push({
        code: 'MOUNTING',
        label: 'Профессиональный монтаж',
        value: mountingCost,
        unit: 'услуга'
      });
    }

    const warnings: string[] = [];
    if (!input.dimensions.widthMm || !input.dimensions.heightMm) {
      warnings.push('Размеры не указаны явно. Расчет произведен по текстовым аппроксимациям.');
    }
    if (input.lighting === 'rgb' || input.lighting === 'dynamic') {
      warnings.push('Для RGB-динамики требуется контроллер управления (включен в стоимость).');
    }

    return {
      ruleVersion: this.version,
      currency: 'RUB',
      basePrice: Math.round(finalPrice),
      minOrderApplied,
      confidence: input.text ? 'high' : 'medium',
      breakdown,
      warnings
    };
  }
};
