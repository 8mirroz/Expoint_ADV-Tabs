import { SCNProductType } from '../schemas/contracts';
import { PricingRuleSet } from './types';
import { neonV10Rule } from './rules/neon.v10';
import { lightboxV10Rule } from './rules/lightbox.v10';

export const PricingRegistry: Record<SCNProductType, PricingRuleSet[]> = {
  neon: [neonV10Rule],
  lightboxes: [lightboxV10Rule],
  wayfinding: [],
  'volumetric-letters': [],
  setup: []
};

/**
 * Возвращает правило для указанного типа продукта и версии.
 */
export function getPricingRule(productType: SCNProductType, version: string = '10.0'): PricingRuleSet | undefined {
  const rules = PricingRegistry[productType];
  if (!rules) return undefined;
  return rules.find(r => r.version === version);
}

/**
 * Возвращает самую свежую версию правила для указанного типа продукта.
 */
export function getLatestPricingRule(productType: SCNProductType): PricingRuleSet | undefined {
  const rules = PricingRegistry[productType];
  if (!rules || rules.length === 0) return undefined;
  return [...rules].sort((a, b) => b.version.localeCompare(a.version))[0];
}
