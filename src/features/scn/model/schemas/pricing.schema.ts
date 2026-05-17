import { z } from 'zod';
import { SCNProductTypeSchema } from './contracts';

export const PricingInputSchema = z.object({
  productType: SCNProductTypeSchema,
  dimensions: z.object({
    widthMm: z.number().positive().optional(),
    heightMm: z.number().positive().optional(),
    areaM2: z.number().positive().optional()
  }),
  text: z.string().optional(),
  symbolCount: z.number().nonnegative().optional(),
  material: z.string().optional(),
  fontComplexity: z.enum(['simple', 'medium', 'complex', 'logo']).default('simple'),
  lighting: z.enum(['none', 'front', 'back', 'rgb', 'dynamic']).default('none'),
  urgency: z.enum(['standard', 'fast', 'urgent']).default('standard'),
  mountingRequired: z.boolean().default(false),
  complianceRequired: z.boolean().default(false),
  region: z.enum(['moscow', 'mo', 'other']).default('moscow')
});

export type PricingInput = z.input<typeof PricingInputSchema>;
export type ParsedPricingInput = z.output<typeof PricingInputSchema>;

export const PricingBreakdownItemSchema = z.object({
  code: z.string(),
  label: z.string(),
  value: z.number(),
  unit: z.string().optional(),
  formula: z.string().optional()
});

export type PricingBreakdownItem = z.infer<typeof PricingBreakdownItemSchema>;

export const PricingResultSchema = z.object({
  ruleVersion: z.string(),
  currency: z.literal('RUB').default('RUB'),
  basePrice: z.number().nonnegative(),
  minOrderApplied: z.boolean(),
  confidence: z.enum(['low', 'medium', 'high']),
  breakdown: z.array(PricingBreakdownItemSchema),
  warnings: z.array(z.string())
});

export type PricingResult = z.infer<typeof PricingResultSchema>;
