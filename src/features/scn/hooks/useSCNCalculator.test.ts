import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSCNCalculator } from './useSCNCalculator';
import { SCNSectionConfig } from '../model/schemas';

// Мокаем Server Action, чтобы не делать реальных сетевых/БД запросов
vi.mock('../api/actions', () => ({
  submitSCNLead: vi.fn().mockResolvedValue({
    success: true,
    message: 'Успешно отправлено'
  })
}));

import { submitSCNLead } from '../api/actions';

describe('useSCNCalculator React Hook', () => {
  const mockConfig: SCNSectionConfig = {
    type: 'service-commerce-node',
    nodeId: 'node-neon-test',
    productType: 'neon',
    context: 'b2b',
    calculatorVariant: 'full',
    defaultPackage: 'business',
    complianceMode: 'soft-check',
    leadCaptureMode: 'inline',
    uploadEnabled: true,
    analyticsContext: {
      pageSlug: 'neon-page',
      serviceSlug: 'neon-signs',
      sourceBlock: 'hero'
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with correct default values matching config', () => {
    const { result } = renderHook(() => useSCNCalculator({ config: mockConfig }));

    expect(result.current.pricingInput.productType).toBe('neon');
    expect(result.current.pricingInput.fontComplexity).toBe('simple');
    expect(result.current.pricingInput.dimensions.widthMm).toBe(1000);
    expect(result.current.pricingInput.dimensions.heightMm).toBe(500);
    
    // Результаты мемоизированных расчетов ядра должны быть заполнены
    expect(result.current.pricingResult).toBeDefined();
    expect(result.current.pricingResult?.basePrice).toBeGreaterThan(0);
    expect(result.current.offerPayload).toBeDefined();
    expect(result.current.selectedPackageId).toBe('business');
    expect(result.current.selectedPackage?.id).toBe('business');
  });

  it('should update field and automatically calculate symbol counts for neon text', () => {
    const { result } = renderHook(() => useSCNCalculator({ config: mockConfig }));

    act(() => {
      result.current.updateSimpleField('text', 'EXPOINT PREMIUM');
    });

    expect(result.current.pricingInput.text).toBe('EXPOINT PREMIUM');
    // Символы без пробелов: EXPOINTPREMIUM = 14
    expect(result.current.pricingInput.symbolCount).toBe(14);
  });

  it('should manage and limit file attachments to maximum 3 files', () => {
    const { result } = renderHook(() => useSCNCalculator({ config: mockConfig }));

    const dummyFile1 = new File(['foo'], 'file1.png', { type: 'image/png' });
    const dummyFile2 = new File(['bar'], 'file2.jpg', { type: 'image/jpeg' });
    const dummyFile3 = new File(['baz'], 'file3.pdf', { type: 'application/pdf' });
    const dummyFile4 = new File(['qux'], 'file4.png', { type: 'image/png' });

    // Добавляем 3 файла
    act(() => { result.current.addAttachment(dummyFile1); });
    act(() => { result.current.addAttachment(dummyFile2); });
    act(() => { result.current.addAttachment(dummyFile3); });

    expect(result.current.attachments).toHaveLength(3);
    expect(result.current.attachments[0].filename).toBe('file1.png');

    // Перехватываем alert при добавлении 4-го файла
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    act(() => { result.current.addAttachment(dummyFile4); });
    expect(alertSpy).toHaveBeenCalledWith('Максимальное количество вложений — 3 файла');
    expect(result.current.attachments).toHaveLength(3);

    // Удаление вложения
    const targetId = result.current.attachments[0].attachmentId;
    act(() => { result.current.removeAttachment(targetId); });
    expect(result.current.attachments).toHaveLength(2);
    expect(result.current.attachments.find(a => a.attachmentId === targetId)).toBeUndefined();
  });

  it('should trigger Server Action submitSCNLead and handle success response', async () => {
    const { result } = renderHook(() => useSCNCalculator({ config: mockConfig }));

    const customerInput = {
      name: 'Алексей',
      company: 'ООО Вектор',
      contact: '+79998887766',
      contactType: 'phone' as const
    };

    await act(async () => {
      await result.current.submitLead(customerInput, true);
    });

    expect(submitSCNLead).toHaveBeenCalledOnce();
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.submissionResult?.success).toBe(true);
    expect(result.current.submissionResult?.message).toBe('Успешно отправлено');
  });
});
