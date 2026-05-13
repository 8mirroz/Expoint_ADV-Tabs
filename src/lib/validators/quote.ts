import { z } from 'zod';

const PRODUCT_TYPES = ['volumetric-letters', 'flex-neon', 'lightbox', 'panel-bracket'] as const;
const COMPLEXITY_OPTIONS = ['standard', 'serif', 'script'] as const;
const MOUNTING_OPTIONS = ['wall_simple', 'frame', 'roof'] as const;
const URGENCY_OPTIONS = ['standard', 'express'] as const;

export const PriceRangeSchema = z.object({
  min: z.number().nonnegative(),
  max: z.number().nonnegative(),
  currency: z.string().min(1),
}).refine((value) => value.max >= value.min, {
  message: 'Неверный диапазон стоимости',
  path: ['max'],
});

export const CalculatorSchema = z.object({
  productType: z.enum(PRODUCT_TYPES),
  text: z.string().trim().min(1, 'Введите текст вывески').max(50, 'Слишком длинный текст'),
  heightCm: z.number().int().min(10, 'Минимальная высота 10 см').max(100, 'Максимальная высота 100 см'),
  count: z.number().int().min(1, 'Минимум 1 символ').max(100, 'Слишком много символов'),
  complexity: z.enum(COMPLEXITY_OPTIONS),
  mounting: z.enum(MOUNTING_OPTIONS),
  urgency: z.enum(URGENCY_OPTIONS),
  materialId: z.string().trim().min(1, 'Выберите материал'),
  lightingId: z.string().trim().min(1, 'Выберите тип подсветки'),
  faceColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Неверный формат лицевого цвета'),
  sideColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Неверный формат бокового цвета'),
  priceRange: PriceRangeSchema.nullable(),
});

export const LeadContactSchema = z.object({
  name: z.string().trim().min(2, 'Введите ваше имя'),
  phone: z.string().trim().regex(/^\+?[0-9\s\-()]{10,20}$/, 'Неверный формат телефона'),
  company: z.string().trim().min(2, 'Слишком короткое название компании').optional().or(z.literal('')),
});

export const LeadPayloadSchema = z.object({
  name: LeadContactSchema.shape.name,
  phone: LeadContactSchema.shape.phone,
  source: z.string().trim().min(1).optional(),
  calculatorData: CalculatorSchema.optional(),
});

export const QuoteRequestSchema = z.object({
  text: CalculatorSchema.shape.text,
  heightCm: CalculatorSchema.shape.heightCm,
  materialId: CalculatorSchema.shape.materialId,
  lightingId: CalculatorSchema.shape.lightingId,
  priceRange: PriceRangeSchema,
  consent: z.boolean().refine(val => val === true, 'Необходимо согласие на обработку данных'),
  contact: LeadContactSchema.pick({
    name: true,
    phone: true,
    company: true,
  }),
});

export type CalculatorData = z.infer<typeof CalculatorSchema>;
export type LeadContactData = z.infer<typeof LeadContactSchema>;
export type LeadPayloadData = z.infer<typeof LeadPayloadSchema>;
export type QuoteRequestData = z.infer<typeof QuoteRequestSchema>;
