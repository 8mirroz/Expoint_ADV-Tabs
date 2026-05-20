import { SERVICES } from '@/data/services';
import { CALCULATOR_PRICING_SNAPSHOT } from '@/data/calculator-pricing-snapshot';

export type CalculatorProductType =
  | 'volumetric-letters'
  | 'metal-letters'
  | 'lightbox'
  | 'flex-neon'
  | 'pylon-signs'
  | 'roof-installations';

export type BusinessSegment = 'retail' | 'horeca' | 'clinic' | 'corporate' | 'franchise';
export type CalculatorComplexity = 'standard' | 'serif' | 'script';
export type CalculatorMaterialTier = 'standard' | 'premium' | 'exclusive';
export type CalculatorLighting = 'none' | 'internal' | 'halo' | 'combined' | 'open_neon';
export type CalculatorMounting = 'none' | 'wall_simple' | 'frame' | 'roof';
export type CalculatorUrgency = 'standard' | 'express';
export type QuotePackageId = 'start' | 'business' | 'premium';

export interface CalculatorConfig {
  productType: CalculatorProductType;
  businessSegment: BusinessSegment;
  text: string;
  widthMm: number;
  heightMm: number;
  depthMm: number;
  quantity: number;
  complexity: CalculatorComplexity;
  materialTier: CalculatorMaterialTier;
  lighting: CalculatorLighting;
  mounting: CalculatorMounting;
  urgency: CalculatorUrgency;
  needsDismantling: boolean;
  needs902Audit: boolean;
  highAccess: boolean;
}

export interface PriceBreakdown {
  productSubtotal: number;
  materialModifier: number;
  lightingModifier: number;
  mounting: number;
  dismantling: number;
  urgency: number;
  compliance: number;
  powerSupply: number;
  total: number;
  formula: string;
  sourceSnapshot: {
    version: string;
    verifiedAt: string;
    sources: typeof CALCULATOR_PRICING_SNAPSHOT.sources;
  };
}

export interface QuotePackage {
  id: QuotePackageId;
  title: string;
  price: number;
  included: string[];
  risks: string[];
  recommended?: boolean;
}

export interface ConfiguratorEstimate {
  config: CalculatorConfig;
  breakdown: PriceBreakdown;
  packages: QuotePackage[];
}

export const DEFAULT_CALCULATOR_CONFIG: CalculatorConfig = {
  productType: 'volumetric-letters',
  businessSegment: 'retail',
  text: 'БУКВА',
  widthMm: 1800,
  heightMm: 420,
  depthMm: 80,
  quantity: 7,
  complexity: 'standard',
  materialTier: 'premium',
  lighting: 'internal',
  mounting: 'wall_simple',
  urgency: 'standard',
  needsDismantling: false,
  needs902Audit: true,
  highAccess: false,
};

export interface PricingParameters {
  size: 'small' | 'medium' | 'large';
  material?: 'standard' | 'premium' | 'exclusive';
  installation?: boolean;
  customModifications?: number;
}

export interface PriceBreakdownLegacy {
  base: number;
  materialMultiplier: number;
  installationFee: number;
  customModifications: number;
  total: number;
}

const snapshot = CALCULATOR_PRICING_SNAPSHOT;

function roundToHundreds(value: number): number {
  return Math.max(0, Math.round(value / 100) * 100);
}

function clampPositive(value: number, fallback: number): number {
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function getAreaM2(config: CalculatorConfig): number {
  const widthM = clampPositive(config.widthMm, DEFAULT_CALCULATOR_CONFIG.widthMm) / 1000;
  const heightM = clampPositive(config.heightMm, DEFAULT_CALCULATOR_CONFIG.heightMm) / 1000;
  return Math.max(0.05, widthM * heightM);
}

function getLetterCount(config: CalculatorConfig): number {
  const textCount = config.text.replace(/\s/g, '').length;
  return Math.max(1, config.quantity || textCount || 1);
}

function calculateProductSubtotal(config: CalculatorConfig): { subtotal: number; formula: string; powerSupply: number } {
  const heightCm = clampPositive(config.heightMm, DEFAULT_CALCULATOR_CONFIG.heightMm) / 10;
  const count = getLetterCount(config);
  const areaM2 = getAreaM2(config);
  const complexity = snapshot.complexityMultipliers[config.complexity];

  if (config.productType === 'lightbox') {
    const tier = snapshot.lightbox.ratePerM2.find((item) => areaM2 <= item.maxAreaM2)
      ?? snapshot.lightbox.ratePerM2[snapshot.lightbox.ratePerM2.length - 1];
    const subtotal = Math.max(snapshot.lightbox.minOrder, areaM2 * tier.rate * snapshot.lightbox.shapeMultipliers[config.complexity]);
    return {
      subtotal,
      formula: `max(${snapshot.lightbox.minOrder}, ${areaM2.toFixed(2)} м2 x ${tier.rate} ₽/м2 x K_shape)`,
      powerSupply: config.lighting === 'none' ? 0 : snapshot.addOns.powerSupply.standard,
    };
  }

  if (config.productType === 'flex-neon') {
    const sizeKey = heightCm < 25 ? 'small' : heightCm < 55 ? 'medium' : 'large';
    const estimatedMeters = count * snapshot.neon.averageMetersBySize[sizeKey];
    const rgbModifier = config.lighting === 'combined' || config.lighting === 'open_neon'
      ? snapshot.neon.rgbMultiplier
      : 1;
    const backing = areaM2 * snapshot.neon.acrylicBackingPerM2;
    const assembly = count * snapshot.neon.contactAssembly;
    const subtotal = Math.max(
      snapshot.neon.minOrder,
      estimatedMeters * snapshot.neon.basePerMeter * complexity * rgbModifier + backing + assembly
    );
    return {
      subtotal,
      formula: `max(${snapshot.neon.minOrder}, ${estimatedMeters.toFixed(1)} м.п. x ${snapshot.neon.basePerMeter} ₽ x K_font x K_color + подложка)`,
      powerSupply: snapshot.addOns.powerSupply.standard,
    };
  }

  if (config.productType === 'pylon-signs' || config.productType === 'roof-installations') {
    const base = config.productType === 'pylon-signs'
      ? snapshot.project.pylonBase
      : snapshot.project.roofBase;
    const scale = Math.max(1, areaM2 / 4);
    return {
      subtotal: base * scale,
      formula: `${base} ₽ проектная база x ${scale.toFixed(2)} scale`,
      powerSupply: snapshot.addOns.powerSupply.premium,
    };
  }

  const letterRate = config.productType === 'metal-letters'
    ? 200
    : snapshot.letters.ratesPerHeightCm[config.lighting];
  const subtotal = Math.max(
    snapshot.letters.minOrder,
    heightCm * count * letterRate * complexity
  );

  return {
    subtotal,
    formula: `max(${snapshot.letters.minOrder}, ${heightCm.toFixed(0)} см x ${count} симв. x ${letterRate} ₽/см x K_font)`,
    powerSupply: config.lighting === 'none' ? 0 : snapshot.addOns.powerSupply.standard,
  };
}

export function normalizeCalculatorConfig(config: Partial<CalculatorConfig>): CalculatorConfig {
  const merged = { ...DEFAULT_CALCULATOR_CONFIG, ...config };
  const quantity = Math.max(1, merged.quantity || merged.text.replace(/\s/g, '').length || 1);

  return {
    ...merged,
    text: merged.text.trim() || DEFAULT_CALCULATOR_CONFIG.text,
    widthMm: Math.round(clampPositive(merged.widthMm, DEFAULT_CALCULATOR_CONFIG.widthMm)),
    heightMm: Math.round(clampPositive(merged.heightMm, DEFAULT_CALCULATOR_CONFIG.heightMm)),
    depthMm: Math.round(clampPositive(merged.depthMm, DEFAULT_CALCULATOR_CONFIG.depthMm)),
    quantity,
  };
}

export function calculateConfiguratorEstimate(input: Partial<CalculatorConfig>): ConfiguratorEstimate {
  const config = normalizeCalculatorConfig(input);
  const product = calculateProductSubtotal(config);
  const materialMultiplier = snapshot.letters.materialMultipliers[config.materialTier];
  const materializedSubtotal = product.subtotal * materialMultiplier;
  const mountingBase = snapshot.addOns.mounting[config.mounting] + (config.highAccess ? snapshot.addOns.highAccess : 0);
  const dismantling = config.needsDismantling
    ? Math.max(snapshot.addOns.dismantlingMin, getAreaM2(config) * snapshot.addOns.dismantlingPerM2)
    : 0;
  const compliance = config.needs902Audit ? snapshot.addOns.compliance902Audit : 0;
  const preUrgency = materializedSubtotal + product.powerSupply;
  const urgency = preUrgency * (snapshot.urgencyMultipliers[config.urgency] - 1);
  const total = roundToHundreds(preUrgency + urgency + mountingBase + dismantling + compliance);

  const breakdown: PriceBreakdown = {
    productSubtotal: roundToHundreds(product.subtotal),
    materialModifier: roundToHundreds(materializedSubtotal - product.subtotal),
    lightingModifier: product.powerSupply,
    mounting: roundToHundreds(mountingBase),
    dismantling: roundToHundreds(dismantling),
    urgency: roundToHundreds(urgency),
    compliance,
    powerSupply: product.powerSupply,
    total,
    formula: product.formula,
    sourceSnapshot: {
      version: snapshot.version,
      verifiedAt: snapshot.verifiedAt,
      sources: snapshot.sources,
    },
  };

  return {
    config,
    breakdown,
    packages: buildQuotePackages(breakdown),
  };
}

export function buildQuotePackages(breakdown: PriceBreakdown): QuotePackage[] {
  return [
    {
      id: 'start',
      title: 'Start',
      price: roundToHundreds(breakdown.total * 0.85),
      included: ['Базовые материалы', 'Производство', 'Гарантия 12 месяцев', 'Инженерная проверка сметы'],
      risks: ['Монтаж и 902-ПП могут потребовать уточнения после фото фасада'],
    },
    {
      id: 'business',
      title: 'Business',
      price: breakdown.total,
      included: ['Премиальные материалы', 'Оптимальная подсветка', 'Монтаж под ключ', 'Гарантия до 3 лет'],
      risks: ['Финальный бюджет подтверждается после замера'],
      recommended: true,
    },
    {
      id: 'premium',
      title: 'Premium',
      price: roundToHundreds(breakdown.total * 1.3),
      included: ['Расширенные материалы', 'Сложная подсветка', '902-ПП сопровождение', 'Сервисный резерв'],
      risks: ['Требуется инженерная проверка узлов крепления'],
    },
  ];
}

export function calculatePrice(serviceId: string, params: PricingParameters): PriceBreakdownLegacy {
  const service = SERVICES.find(s => s.id === serviceId);
  if (!service) {
    throw new Error(`Service with id "${serviceId}" not found`);
  }

  const sizeMultipliers = {
    small: 1,
    medium: 1.5,
    large: 2.2,
  };
  const materialMultipliers = {
    standard: 1,
    premium: 1.3,
    exclusive: 1.7,
  };

  const sizePrice = service.basePrice * sizeMultipliers[params.size];
  const materialCost = sizePrice * (materialMultipliers[params.material || 'standard'] - 1);
  const installationFee = params.installation ? (sizePrice + materialCost) * 0.2 : 0;
  const total = sizePrice + materialCost + installationFee + (params.customModifications || 0);

  return {
    base: service.basePrice,
    materialMultiplier: materialCost,
    installationFee,
    customModifications: params.customModifications || 0,
    total: Math.round(total),
  };
}

export function getPriceRange(serviceId: string): { min: number; max: number } {
  const minPrice = calculatePrice(serviceId, { size: 'small' }).total;
  const maxPrice = calculatePrice(serviceId, {
    size: 'large',
    material: 'exclusive',
    installation: true,
  }).total;

  return { min: minPrice, max: maxPrice };
}
