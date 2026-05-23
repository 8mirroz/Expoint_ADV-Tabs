"use client";

import type { ChangeEvent } from 'react';
import { AlertTriangle, FileText, RotateCcw, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  CALCULATOR_HANDOFF_KIND_LABELS,
  CALCULATOR_HANDOFF_STATUS_LABELS,
  formatHandoffFileSize,
  getHandoffStatusLabel,
  type CalculatorHandoffAsset,
  type HandoffAssetKind,
  type HandoffRequirement,
  type HandoffStatus,
} from '@/components/calculator/calculator.types';

interface CalculatorHandoffPanelProps {
  selectedKind: HandoffAssetKind;
  assets: CalculatorHandoffAsset[];
  requirements: HandoffRequirement[];
  handoffStatus: HandoffStatus;
  error: string | null;
  onKindChange: (kind: HandoffAssetKind) => void;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onUploadAsset: (assetId: string) => Promise<void>;
  onRemoveAsset: (assetId: string) => void;
}

export function CalculatorHandoffPanel({
  selectedKind,
  assets,
  requirements,
  handoffStatus,
  error,
  onKindChange,
  onFileChange,
  onUploadAsset,
  onRemoveAsset,
}: CalculatorHandoffPanelProps) {
  const satisfiedCount = requirements.filter((item) => item.satisfied).length;

  return (
    <div className="rounded-[28px] border border-dashed border-outline bg-background p-6" data-testid="handoff-panel">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-outline bg-surface">
            <Upload className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="text-base font-black text-on-surface">Что нужно для финального подтверждения</h3>
            <p className="mt-1 max-w-xl text-sm text-on-surface-variant">
              Файлы фиксируются локально и сохраняются в quote setup. Без этого шага смета остается предварительной и требует операторского review.
            </p>
          </div>
        </div>
        <span className="verge-mono-label rounded-full border border-outline bg-surface px-3 py-1 text-on-surface-variant">
          {getHandoffStatusLabel(handoffStatus)}
        </span>
      </div>

      <div className="mt-5 grid gap-3 rounded-2xl border border-outline bg-surface p-4 sm:grid-cols-[1fr_auto]">
        <label className="block">
          <span className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">Тип материала</span>
          <select
            value={selectedKind}
            onChange={(event) => onKindChange(event.target.value as HandoffAssetKind)}
            className="w-full rounded-xl border border-outline bg-background px-3 py-2 text-sm text-on-surface"
            aria-label="Тип материала для handoff"
          >
            {(Object.keys(CALCULATOR_HANDOFF_KIND_LABELS) as HandoffAssetKind[]).map((kind) => (
              <option key={kind} value={kind}>
                {CALCULATOR_HANDOFF_KIND_LABELS[kind]}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-end">
          <label className="w-full cursor-pointer rounded-xl border border-outline bg-background px-4 py-2 text-center text-xs font-black uppercase tracking-wider text-on-surface transition-colors hover:border-accent sm:w-auto">
            Добавить файлы
            <input
              type="file"
              multiple
              className="hidden"
              onChange={onFileChange}
              aria-label="Добавить файлы для handoff"
            />
          </label>
        </div>
      </div>

      {error && (
        <div className="mt-3 flex items-start gap-2 rounded-2xl border border-rose-300 bg-rose-50 px-3 py-2 text-xs text-rose-800" role="alert">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="mt-5 rounded-2xl border border-outline bg-surface p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="verge-mono-label text-on-surface-variant">Checklist</p>
          <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            {satisfiedCount} / {requirements.length} закрыто
          </p>
        </div>
        <div className="space-y-2">
          {requirements.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-outline bg-background px-3 py-2">
              <p className="text-sm text-on-surface">{item.label}</p>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${item.satisfied ? 'text-emerald-600' : 'text-emerald-600'}`}>
                {item.satisfied ? 'OK' : item.required ? 'Нужно' : 'Опционально'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-2">
        {assets.length === 0 && (
          <div className="rounded-2xl border border-outline bg-surface px-4 py-3 text-sm text-on-surface-variant">
            Файлы пока не добавлены. Можно приложить фото фасада, логотип, эскиз или референсы.
          </div>
        )}
        {assets.map((asset) => (
          <div key={asset.id} className="rounded-2xl border border-outline bg-surface p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-accent" />
                  <p className="truncate text-sm font-bold text-on-surface">{asset.filename}</p>
                </div>
                <p className="mt-1 text-xs text-on-surface-variant">
                  {CALCULATOR_HANDOFF_KIND_LABELS[asset.kind]} · {formatHandoffFileSize(asset.sizeBytes)}
                </p>
                {asset.fileKey && (
                  <p className="mt-1 text-[11px] text-on-surface-variant">
                    {asset.fileKey}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-outline bg-background px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                  {CALCULATOR_HANDOFF_STATUS_LABELS[asset.status]}
                </span>
                {asset.status === 'failed' && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => void onUploadAsset(asset.id)}
                    aria-label={`Повторить загрузку ${asset.filename}`}
                  >
                    <RotateCcw className="mr-1 h-3.5 w-3.5" />
                    Повторить
                  </Button>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveAsset(asset.id)}
                  aria-label={`Удалить ${asset.filename}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            {asset.error && <p className="mt-2 text-xs text-rose-700">{asset.error}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
