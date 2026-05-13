import { z } from "zod";

/**
 * Genesis v5 Signal Envelope
 * Canonical data structure for all analytics, validation, and reporting signals.
 * Designed for 152-FZ compliance (PII-free).
 */

export const SignalSourceSchema = z.enum(["ims", "ai-val", "system"]);
export const SignalTopicSchema = z.enum(["conversion", "error", "performance", "audit", "compliance"]);
export const SignalPrioritySchema = z.enum(["P0", "P1", "P2", "P3"]);
export const UserSegmentSchema = z.enum(["retail", "horeca", "corp", "unknown"]);

export const SignalEnvelopeSchema = z.object({
  signal_id: z.string().uuid(),
  timestamp: z.string().datetime(), // ISO8601
  source: SignalSourceSchema,
  topic: SignalTopicSchema,
  priority: SignalPrioritySchema,
  payload: z.record(z.string(), z.unknown()), // Flexible payload depending on topic
  metadata: z.object({
    session_id: z.string(),
    user_segment: UserSegmentSchema.default("unknown"),
    redacted: z.boolean().default(false),
    ip_hash: z.string().optional(), // Anonymized IP
    user_agent: z.string().optional(),
  }),
  signature: z.string().optional(), // HMAC SHA-256 (required for external LOG ingress)
});

export type SignalEnvelope = z.infer<typeof SignalEnvelopeSchema>;
export type SignalSource = z.infer<typeof SignalSourceSchema>;
export type SignalTopic = z.infer<typeof SignalTopicSchema>;
export type SignalPriority = z.infer<typeof SignalPrioritySchema>;
export type UserSegment = z.infer<typeof UserSegmentSchema>;

/**
 * Specialized Payload Schemas (Examples)
 */

export const ConversionPayloadSchema = z.object({
  step: z.string(),
  funnel_id: z.string(),
  value: z.number().optional(),
  action: z.string(),
});

export const ErrorPayloadSchema = z.object({
  code: z.string(),
  message: z.string(),
  stack: z.string().optional(),
  component: z.string().optional(),
});
