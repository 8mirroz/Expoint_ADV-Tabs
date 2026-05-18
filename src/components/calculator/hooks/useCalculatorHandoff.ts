"use client";

import { useMemo, useRef, useState, type ChangeEvent } from 'react';
import { SCNEventBus } from '@/lib/analytics/scn-events';
import { useSalesEngineStore } from '@/store/useSalesEngineStore';
import {
  CALCULATOR_HANDOFF_ALLOWED_MIME_TYPES,
  CALCULATOR_HANDOFF_MAX_FILE_SIZE_BYTES,
  createHandoffAssetId,
  getCalculatorAnalyticsProductType,
  type CalculatorHandoffAsset,
  type HandoffAssetKind,
} from '@/components/calculator/calculator.types';

interface UploadPreSignResponse {
  success: boolean;
  uploadUrl: string;
  fileKey: string;
  method: 'PUT';
  expiresAt?: string;
}

interface UploadSinkResponse {
  success: boolean;
  fileKey: string;
  storedAt: string;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return 'Не удалось обработать файл для handoff.';
}

export function useCalculatorHandoff(surface: 'page' | 'section') {
  const draft = useSalesEngineStore((state) => state.draft);
  const [selectedKind, setSelectedKind] = useState<HandoffAssetKind>('facade_photo');
  const [error, setError] = useState<string | null>(null);
  const pendingFilesRef = useRef(new Map<string, File>());

  const analyticsPayload = useMemo(
    () => ({
      productType: getCalculatorAnalyticsProductType(draft.config.productType),
      pageSlug: surface === 'page' ? '/calculator' : '/',
    }),
    [draft.config.productType, surface]
  );

  const requestUpload = async (asset: CalculatorHandoffAsset, file: File) => {
    updateAsset(asset.id, { status: 'queued', error: undefined });
    SCNEventBus.track('scn_file_upload_started', {
      ...analyticsPayload,
      handoffKind: asset.kind,
      sizeBytes: asset.sizeBytes,
    });

    try {
      const preSignResponse = await fetch('/api/upload/pre-sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          size: file.size,
        }),
      });

      if (!preSignResponse.ok) {
        throw new Error('Не удалось подготовить локальную загрузку.');
      }

      const preSignData = (await preSignResponse.json()) as UploadPreSignResponse;
      if (!preSignData.uploadUrl || preSignData.method !== 'PUT') {
        throw new Error('Upload contract returned by the server is incomplete.');
      }

      const uploadResponse = await fetch(preSignData.uploadUrl, {
        method: preSignData.method,
        headers: { 'Content-Type': file.type },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error('Не удалось сохранить файл на локальном upload host.');
      }

      const uploadPayload = (await uploadResponse.json()) as UploadSinkResponse;

      updateAsset(asset.id, {
        status: 'uploaded',
        fileKey: uploadPayload.fileKey,
        uploadedAt: uploadPayload.storedAt,
        error: undefined,
      });
      pendingFilesRef.current.delete(asset.id);

      SCNEventBus.track('scn_file_upload_completed', {
        ...analyticsPayload,
        handoffKind: asset.kind,
        sizeBytes: asset.sizeBytes,
      });
    } catch (uploadError) {
      const message = getErrorMessage(uploadError);
      updateAsset(asset.id, { status: 'failed', error: message });
      setError(message);
    }
  };

  const addLocalAssets = async (files: File[]) => {
    const nextAssets: Array<{ asset: CalculatorHandoffAsset; file: File }> = [];

    for (const file of files) {
      if (!CALCULATOR_HANDOFF_ALLOWED_MIME_TYPES.includes(file.type as (typeof CALCULATOR_HANDOFF_ALLOWED_MIME_TYPES)[number])) {
        setError('Недопустимый формат файла. Поддерживаются JPG, PNG, WEBP, PDF, DWG и DXF.');
        continue;
      }

      if (file.size > CALCULATOR_HANDOFF_MAX_FILE_SIZE_BYTES) {
        setError('Файл превышает лимит 100 MB.');
        continue;
      }

      nextAssets.push({
        asset: {
          id: createHandoffAssetId(),
          kind: selectedKind,
          filename: file.name,
          mimeType: file.type,
          sizeBytes: file.size,
          status: 'local',
        },
        file,
      });
    }

    if (nextAssets.length > 0) {
      useSalesEngineStore.getState().addHandoffAssets(nextAssets.map((entry) => entry.asset));
      nextAssets.forEach((entry) => {
        pendingFilesRef.current.set(entry.asset.id, entry.file);
      });
      await Promise.all(nextAssets.map((entry) => requestUpload(entry.asset, entry.file)));
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    setError(null);
    void addLocalAssets(files);
    event.target.value = '';
  };

  const updateAsset = (assetId: string, patch: Partial<CalculatorHandoffAsset>) => {
    useSalesEngineStore.getState().updateHandoffAsset(assetId, patch);
  };

  const uploadAsset = async (assetId: string) => {
    const currentAsset = draft.handoffAssets.find((asset) => asset.id === assetId);
    const pendingFile = pendingFilesRef.current.get(assetId);
    if (!currentAsset || !pendingFile) {
      setError('Повторно выберите файл, чтобы перезапустить upload.');
      return;
    }
    setError(null);
    await requestUpload(currentAsset, pendingFile);
  };

  const removeAsset = (assetId: string) => {
    pendingFilesRef.current.delete(assetId);
    useSalesEngineStore.getState().removeHandoffAsset(assetId);
  };

  return {
    assets: draft.handoffAssets,
    requirements: draft.handoffRequirements,
    handoffStatus: draft.handoffStatus,
    selectedKind,
    setSelectedKind,
    error,
    setError,
    handleFileChange,
    uploadAsset,
    removeAsset,
  };
}
