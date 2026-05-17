import { z } from 'zod';

export const SCNProductTypeSchema = z.enum([
  'neon',
  'lightboxes',
  'wayfinding',
  'volumetric-letters',
  'setup'
]);

export type SCNProductType = z.infer<typeof SCNProductTypeSchema>;

export const SCNContextSchema = z.enum([
  'b2b',
  'retail',
  'premium',
  'urgent'
]);

export type SCNContext = z.infer<typeof SCNContextSchema>;

export const SCNSectionConfigSchema = z.object({
  type: z.literal('service-commerce-node'),
  nodeId: z.string(),
  productType: SCNProductTypeSchema,
  context: SCNContextSchema,
  calculatorVariant: z.enum([
    'compact',
    'full',
    'wizard',
    'package-first',
    'brief-first'
  ]),
  defaultPackage: z.enum(['start', 'business', 'premium']).optional(),
  complianceMode: z.enum(['disabled', 'soft-check', 'strict-check']).default('soft-check'),
  leadCaptureMode: z.enum(['inline', 'modal', 'stepper']).default('inline'),
  uploadEnabled: z.boolean().default(true),
  analyticsContext: z.object({
    pageSlug: z.string(),
    serviceSlug: z.string(),
    sourceBlock: z.string()
  })
});

export type SCNSectionConfig = z.infer<typeof SCNSectionConfigSchema>;
