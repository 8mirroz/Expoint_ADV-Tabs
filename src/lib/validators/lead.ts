import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(2, 'Имя слишком короткое').max(100),
  phone: z.string().min(10, 'Введите корректный номер телефона').max(20),
  consent: z.boolean().refine(val => val === true, 'Необходимо согласие на обработку данных'),
  segment: z.string().optional(),
  source: z.string().optional(),
  context: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadSchema>;
