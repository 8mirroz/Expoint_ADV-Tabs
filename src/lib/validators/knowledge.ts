import { z } from 'zod';

export const KnowledgeQueryRequestSchema = z.object({
  query: z.string().trim().min(2, 'Запрос слишком короткий').max(1000, 'Запрос слишком длинный'),
  context: z.string().trim().max(5000).optional(),
  session_meta: z.object({
    locale: z.string().trim().max(10).optional(),
    session_id: z.string().trim().max(120).optional(),
    path: z.string().trim().max(200).optional(),
  }).optional(),
});

export type KnowledgeQueryRequestInput = z.infer<typeof KnowledgeQueryRequestSchema>;
