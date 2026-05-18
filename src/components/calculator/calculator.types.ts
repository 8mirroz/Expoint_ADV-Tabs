import type { CalculatorConfig } from '@/lib/pricingEngine';

export type HandoffAssetKind =
  | 'facade_photo'
  | 'logo'
  | 'sketch'
  | 'reference'
  | 'other';

export type HandoffAssetStatus = 'local' | 'queued' | 'uploaded' | 'failed';
export type HandoffStatus = 'missing' | 'collecting' | 'ready';

export interface CalculatorHandoffAsset {
  id: string;
  kind: HandoffAssetKind;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  status: HandoffAssetStatus;
  fileKey?: string;
  uploadedAt?: string;
  error?: string;
}

export interface HandoffRequirement {
  id: string;
  label: string;
  required: boolean;
  satisfied: boolean;
}

export const CALCULATOR_HANDOFF_ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
  'application/x-autocad',
  'application/dxf',
] as const;

export const CALCULATOR_HANDOFF_MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024;

export const CALCULATOR_HANDOFF_KIND_LABELS: Record<HandoffAssetKind, string> = {
  facade_photo: 'Фото фасада',
  logo: 'Логотип',
  sketch: 'Эскиз',
  reference: 'Референс',
  other: 'Другое',
};

export const CALCULATOR_HANDOFF_STATUS_LABELS: Record<HandoffAssetStatus, string> = {
  local: 'Локально',
  queued: 'Загружается',
  uploaded: 'Загружено',
  failed: 'Ошибка',
};

const EVIDENCE_REQUIREMENT_LABELS = {
  facade: 'Фото фасада / места установки',
  logo: 'Логотип или текст вывески',
  dimensions: 'Примерный размер',
  facadeType: 'Адрес или тип фасада',
  dismantling: 'Нужен ли демонтаж',
  compliance: 'Нужна ли проверка 902-ПП',
} as const;

export function createHandoffAssetId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `handoff-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function formatHandoffFileSize(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export function getHandoffStatusLabel(status: HandoffStatus): string {
  if (status === 'ready') return 'Готово к review';
  if (status === 'collecting') return 'Собираем материалы';
  return 'Не хватает материалов';
}

export function getCalculatorAnalyticsProductType(
  productType: CalculatorConfig['productType']
): 'neon' | 'lightbox' | 'wayfinding' | 'general' {
  if (productType === 'flex-neon') return 'neon';
  if (productType === 'lightbox') return 'lightbox';
  if (productType === 'pylon-signs' || productType === 'roof-installations') return 'wayfinding';
  return 'general';
}

export function buildHandoffRequirements(
  config: CalculatorConfig,
  assets: CalculatorHandoffAsset[]
): HandoffRequirement[] {
  const validAssets = assets.filter((asset) => asset.status !== 'failed');
  const facadePhotoProvided = validAssets.some((asset) => asset.kind === 'facade_photo');
  const logoProvided = validAssets.some((asset) => asset.kind === 'logo');
  const dimensionsProvided = config.widthMm > 0 && config.heightMm > 0 && config.depthMm > 0;
  const facadeTypeProvided = config.mounting !== 'none';

  return [
    {
      id: 'facade-photo',
      label: EVIDENCE_REQUIREMENT_LABELS.facade,
      required: true,
      satisfied: facadePhotoProvided,
    },
    {
      id: 'logo-or-text',
      label: EVIDENCE_REQUIREMENT_LABELS.logo,
      required: true,
      satisfied: Boolean(config.text.trim()) || logoProvided,
    },
    {
      id: 'dimensions',
      label: EVIDENCE_REQUIREMENT_LABELS.dimensions,
      required: true,
      satisfied: dimensionsProvided,
    },
    {
      id: 'address-or-facade',
      label: EVIDENCE_REQUIREMENT_LABELS.facadeType,
      required: true,
      satisfied: facadeTypeProvided,
    },
    {
      id: 'dismantling',
      label: EVIDENCE_REQUIREMENT_LABELS.dismantling,
      required: true,
      satisfied: true,
    },
    {
      id: 'compliance',
      label: EVIDENCE_REQUIREMENT_LABELS.compliance,
      required: true,
      satisfied: true,
    },
  ];
}

export function deriveHandoffStatus(
  requirements: HandoffRequirement[],
  assets: CalculatorHandoffAsset[]
): HandoffStatus {
  const requiredReady = requirements.filter((item) => item.required).every((item) => item.satisfied);
  if (requiredReady) return 'ready';

  const hasCollectedEvidence = assets.some((asset) => asset.status !== 'failed');
  return hasCollectedEvidence ? 'collecting' : 'missing';
}
