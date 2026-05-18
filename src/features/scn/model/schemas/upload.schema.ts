import { z } from 'zod';

export const ALLOWED_EXTENSIONS = [
  'pdf',
  'dwg',
  'dxf',
  'png',
  'jpg',
  'jpeg',
  'webp',
  'svg',
  'zip'
] as const;

export const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024; // 100MB

export const UploadAttachmentSchema = z.object({
  attachmentId: z.string().uuid(),
  filename: z.string()
    .min(1, 'Имя файла не может быть пустым')
    .refine((name) => {
      const parts = name.split('.');
      if (parts.length < 2) return false;
      const ext = parts.pop()?.toLowerCase();
      return ext ? (ALLOWED_EXTENSIONS as readonly string[]).includes(ext) : false;
    }, {
      message: `Недопустимый тип файла. Разрешены: ${ALLOWED_EXTENSIONS.join(', ')}`
    }),
  mimeType: z.string().refine((mime) => {
    const allowedMimePrefixes = [
      'image/',
      'application/pdf',
      'application/x-zip',
      'application/zip',
      'application/octet-stream' // Часто используется для DWG/DXF
    ];
    return allowedMimePrefixes.some(p => mime.startsWith(p)) || mime === 'image/svg+xml';
  }, {
    message: 'Недопустимый MIME-тип файла'
  }),
  sizeBytes: z.number()
    .nonnegative()
    .max(MAX_FILE_SIZE_BYTES, `Размер файла превышает лимит в 100 МБ`),
  scanStatus: z.enum(['pending', 'clean', 'blocked']).default('pending'),
  uploadedAt: z.date().default(() => new Date()),
  expiresAt: z.date().optional()
});

export type UploadAttachment = z.infer<typeof UploadAttachmentSchema>;
