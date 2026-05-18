"use client";

import { useState, useMemo, useCallback } from 'react';
import { 
  SCNSectionConfig,
  PricingInput,
  PricingInputSchema,
  PricingResult,
  OfferPackage
} from '../model/schemas';
import { OfferComposer, type OfferPayload } from '../model/pricing/composer';
import { PricingKernel } from '../model/pricing/kernel';
import { submitSCNLead } from '../api/actions';

export interface SCNFileAttachment {
  attachmentId: string;
  file: File;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  scanStatus: 'pending' | 'clean' | 'blocked';
}

export interface UseSCNCalculatorOptions {
  config: SCNSectionConfig;
  defaultValues?: Partial<PricingInput>;
}

export function useSCNCalculator({ config, defaultValues }: UseSCNCalculatorOptions) {
  // 1. Определение начальных значений на основе продукта и дефолтов
  const initialInput = useMemo<PricingInput>(() => {
    return {
      productType: config.productType,
      dimensions: {
        widthMm: defaultValues?.dimensions?.widthMm ?? 1000,
        heightMm: defaultValues?.dimensions?.heightMm ?? 500,
        areaM2: defaultValues?.dimensions?.areaM2
      },
      text: defaultValues?.text ?? '',
      symbolCount: defaultValues?.symbolCount ?? (defaultValues?.text ? defaultValues.text.length : 0),
      material: defaultValues?.material ?? 'acrylic',
      fontComplexity: defaultValues?.fontComplexity ?? 'simple',
      lighting: defaultValues?.lighting ?? (config.productType === 'neon' ? 'front' : 'none'),
      urgency: defaultValues?.urgency ?? 'standard',
      mountingRequired: defaultValues?.mountingRequired ?? false,
      complianceRequired: defaultValues?.complianceRequired ?? (config.complianceMode !== 'disabled'),
      region: defaultValues?.region ?? 'moscow'
    };
  }, [config.productType, config.complianceMode, defaultValues]);

  // 2. Реактивные переменные состояния
  const [pricingInput, setPricingInput] = useState<PricingInput>(initialInput);
  const [selectedPackageId, setSelectedPackageId] = useState<'start' | 'business' | 'premium'>(
    config.defaultPackage ?? 'business'
  );
  const [attachments, setAttachments] = useState<SCNFileAttachment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    message?: string;
    error?: string;
  } | null>(null);

  // 3. Обновление полей ввода
  const updateField = useCallback((updater: (prev: PricingInput) => PricingInput) => {
    setPricingInput(updater);
  }, []);

  const updateSimpleField = useCallback(<K extends keyof PricingInput>(key: K, value: PricingInput[K]) => {
    setPricingInput(prev => {
      const next = { ...prev, [key]: value };
      
      // Автоматический подсчет символов для неона при изменении текста
      if (key === 'text' && prev.productType === 'neon' && typeof value === 'string') {
        next.symbolCount = value.replace(/\s+/g, '').length;
      }
      
      return next;
    });
  }, []);

  // 4. Сброс к дефолтным значениям
  const resetToDefaults = useCallback(() => {
    setPricingInput(initialInput);
    setSelectedPackageId(config.defaultPackage ?? 'business');
    setAttachments([]);
    setSubmissionResult(null);
  }, [initialInput, config.defaultPackage]);

  // 5. Выбор пакета предложений
  const selectPackage = useCallback((packageId: 'start' | 'business' | 'premium') => {
    setSelectedPackageId(packageId);
  }, []);

  // 6. Управление вложениями (максимум 3 файла, до 15 МБ каждый)
  const addAttachment = useCallback((file: File) => {
    if (attachments.length >= 3) {
      alert('Максимальное количество вложений — 3 файла');
      return;
    }
    
    const MAX_SIZE_MB = 15;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(`Размер файла превышает лимит ${MAX_SIZE_MB} МБ`);
      return;
    }

    const newAttachment: SCNFileAttachment = {
      attachmentId: Math.random().toString(36).substring(2, 9),
      file,
      filename: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
      scanStatus: 'pending'
    };

    setAttachments(prev => [...prev, newAttachment]);
  }, [attachments]);

  const removeAttachment = useCallback((attachmentId: string) => {
    setAttachments(prev => prev.filter(att => att.attachmentId !== attachmentId));
  }, []);

  // 7. Мемоизированный расчет ядра (PricingKernel) и сборщика предложений (OfferComposer)
  const calculation = useMemo(() => {
    try {
      // Парсинг/валидация входных данных через Zod
      const parsedInput = PricingInputSchema.parse(pricingInput);
      
      // Расчет стоимости ядром
      const pricingResult = PricingKernel.calculate(parsedInput);
      
      // Сборка предложений, рисков и скоринга лида
      const offerPayload = OfferComposer.compose(pricingResult, parsedInput, config.context);
      
      return {
        parsedInput,
        pricingResult,
        offerPayload,
        validationErrors: null
      };
    } catch (error: any) {
      return {
        parsedInput: null,
        pricingResult: null,
        offerPayload: null,
        validationErrors: error.flatten ? error.flatten().fieldErrors : error.message
      };
    }
  }, [pricingInput, config.context]);

  // 8. Выбранный пакет предложений
  const selectedPackage = useMemo<OfferPackage | null>(() => {
    if (!calculation.offerPayload) return null;
    return calculation.offerPayload.packages[selectedPackageId];
  }, [calculation.offerPayload, selectedPackageId]);

  // 9. Асинхронная отправка лида в CRM / Телеграм / Email
  const submitLead = useCallback(async (
    customer: {
      name?: string;
      company?: string;
      contact: string;
      contactType: 'phone' | 'telegram' | 'whatsapp' | 'email';
    },
    personalDataAccepted: boolean,
    marketingAccepted?: boolean
  ) => {
    if (!calculation.parsedInput || !calculation.pricingResult || !calculation.offerPayload) {
      setSubmissionResult({
        success: false,
        error: 'Невозможно отправить заявку: не все параметры расчитаны корректно.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      const payload = {
        schemaVersion: '10.2' as const,
        source: {
          pageSlug: config.analyticsContext.pageSlug,
          serviceSlug: config.analyticsContext.serviceSlug,
          nodeId: config.nodeId,
          productType: config.productType,
          calculatorVariant: config.calculatorVariant
        },
        customer,
        projectData: {
          pricingInput: calculation.parsedInput,
          pricingResult: calculation.pricingResult,
          selectedPackage: selectedPackage ?? undefined,
          complianceRisk: calculation.offerPayload.complianceRisk,
          leadScore: calculation.offerPayload.leadScore
        },
        attachments: attachments.map(({ attachmentId, filename, mimeType, sizeBytes, scanStatus }) => ({
          attachmentId,
          filename,
          mimeType,
          sizeBytes,
          scanStatus
        })),
        consent: {
          personalDataAccepted,
          marketingAccepted
        }
      };

      const result = await submitSCNLead(payload);
      
      if (result.success) {
        setSubmissionResult({ success: true, message: result.message });
      } else {
        setSubmissionResult({ success: false, error: result.error });
      }
    } catch (error: any) {
      console.error('[useSCNCalculator] Submission error:', error);
      setSubmissionResult({
        success: false,
        error: error.message || 'Произошла ошибка при отправке данных лида.'
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [calculation, config, selectedPackage, attachments]);

  return {
    // Ввод и параметры состояния
    pricingInput,
    selectedPackageId,
    attachments,
    isSubmitting,
    submissionResult,
    
    // Мемоизированные расчеты
    pricingResult: calculation.pricingResult,
    offerPayload: calculation.offerPayload,
    validationErrors: calculation.validationErrors,
    selectedPackage,
    
    // Функции обновления и управления
    updateField,
    updateSimpleField,
    resetToDefaults,
    selectPackage,
    addAttachment,
    removeAttachment,
    submitLead
  };
}
