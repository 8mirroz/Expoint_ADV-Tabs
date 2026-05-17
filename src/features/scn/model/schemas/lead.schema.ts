import { z } from 'zod';
import { SCNProductTypeSchema } from './contracts';
import { PricingInputSchema, PricingResultSchema } from './pricing.schema';

export const OfferPackageSchema = z.object({
  id: z.enum(['start', 'business', 'premium']),
  title: z.string(),
  priceFrom: z.number().nonnegative(),
  priceTo: z.number().nonnegative().optional(),
  isRecommended: z.boolean(),
  marginClass: z.enum(['low', 'normal', 'high']),
  included: z.array(z.string()),
  excluded: z.array(z.string()),
  riskNotes: z.array(z.string()),
  ctaLabel: z.string()
});

export type OfferPackage = z.infer<typeof OfferPackageSchema>;

export const LeadScoreSchema = z.object({
  total: z.number(),
  grade: z.enum(['cold', 'warm', 'hot', 'priority']),
  reasons: z.array(z.string()),
  salesPriority: z.enum(['low', 'normal', 'high', 'urgent'])
});

export type LeadScore = z.infer<typeof LeadScoreSchema>;

export const ComplianceRiskSchema = z.object({
  level: z.enum(['none', 'low', 'medium', 'high']),
  flags: z.array(z.string()),
  userMessage: z.string(),
  requiresEngineerReview: z.boolean()
});

export type ComplianceRisk = z.infer<typeof ComplianceRiskSchema>;

export const ServiceLeadPayloadSchema = z.object({
  schemaVersion: z.literal('10.2').default('10.2'),
  source: z.object({
    pageSlug: z.string(),
    serviceSlug: z.string(),
    nodeId: z.string(),
    productType: SCNProductTypeSchema,
    calculatorVariant: z.string()
  }),
  customer: z.object({
    name: z.string().optional(),
    company: z.string().optional(),
    contact: z.string().min(1, 'Контактная информация обязательна'),
    contactType: z.enum(['phone', 'telegram', 'whatsapp', 'email'])
  }),
  projectData: z.object({
    pricingInput: PricingInputSchema,
    pricingResult: PricingResultSchema,
    selectedPackage: OfferPackageSchema.optional(),
    complianceRisk: ComplianceRiskSchema.optional(),
    leadScore: LeadScoreSchema.optional()
  }),
  attachments: z.array(
    z.object({
      attachmentId: z.string(),
      filename: z.string(),
      mimeType: z.string(),
      sizeBytes: z.number().nonnegative(),
      scanStatus: z.enum(['pending', 'clean', 'blocked']).default('pending')
    })
  ).default([]),
  consent: z.object({
    personalDataAccepted: z.boolean().refine(v => v === true, {
      message: 'Необходимо согласие на обработку персональных данных'
    }),
    marketingAccepted: z.boolean().optional()
  })
});

export type ServiceLeadPayload = z.infer<typeof ServiceLeadPayloadSchema>;
