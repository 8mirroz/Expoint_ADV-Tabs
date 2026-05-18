/**
 * Shared Sales Engine types.
 * Single source of truth for capability/stage types used across stores and components.
 */

export type CapabilityStage = 'capture' | 'configured' | 'quoted' | 'carted' | 'submitted';
export type HonestCapability = 'pdf_proposal' | 'ai_visualization' | 'lead_scoring' | 'follow_up';
export type HonestCapabilityStatus = 'coming-next' | 'active' | 'operator-reviewed' | 'queued-manual-assist';

export interface CapabilityState {
  id: HonestCapability;
  title: string;
  status: HonestCapabilityStatus;
  description: string;
  /** URL для скачивания сгенерированной PDF-сметы */
  pdfUrl?: string;
  /** ID задачи AI-визуализации */
  visualizationId?: string;
}

/** Маппинг статусов на русские метки */
export const CAPABILITY_STATUS_LABELS: Record<HonestCapabilityStatus, string> = {
  'coming-next': 'В очереди',
  'active': 'Активен',
  'operator-reviewed': 'На проверке',
  'queued-manual-assist': 'Очередь AI',
};

/** Получить русскую метку для статуса */
export function getCapabilityStatusLabel(status: HonestCapabilityStatus): string {
  return CAPABILITY_STATUS_LABELS[status] ?? status;
}
