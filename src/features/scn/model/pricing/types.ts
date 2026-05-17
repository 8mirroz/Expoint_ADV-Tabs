import { SCNProductType } from '../schemas/contracts';
import { PricingInput, PricingResult, ParsedPricingInput } from '../schemas/pricing.schema';

export interface PricingValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface PricingRuleSet {
  productType: SCNProductType;
  version: string;
  effectiveFrom: string;
  minOrderRub: number;
  calculate: (input: ParsedPricingInput) => PricingResult;
  validateInput: (input: PricingInput) => PricingValidationResult;
}
