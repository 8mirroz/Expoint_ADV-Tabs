import { z } from 'zod';

export const LeadIntakeSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().regex(/^\+?[\d\s-]{10,20}$/, "Некорректный формат телефона"),
  email: z.string().email("Некорректный email").optional().or(z.literal("")),
  company: z.string().optional(),
  projectType: z.enum(['neon', 'lightbox', 'wayfinding', 'other']),
  package: z.enum(['start', 'business', 'premium', 'custom']).optional(),
  priceEstimate: z.number().optional(),
  details: z.string().optional(),
  uploadedFiles: z.array(z.string()).optional(),
});

export type LeadIntakePayload = z.infer<typeof LeadIntakeSchema>;

export const UploadPreSignSchema = z.object({
  filename: z.string().min(1),
  contentType: z.string().regex(/^(image\/(jpeg|png|webp)|application\/(pdf|x-autocad|dxf))$/, "Неподдерживаемый тип файла"),
  size: z.number().max(100 * 1024 * 1024, "Файл не должен превышать 100 МБ"),
});

export type UploadPreSignPayload = z.infer<typeof UploadPreSignSchema>;
