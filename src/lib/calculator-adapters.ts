import type { CalculatorState } from '@/store/useCalculatorStore';
import type { CalculatorData, LeadPayloadData } from '@/lib/validators/quote';

type CalculatorSnapshot = Pick<
  CalculatorState,
  | 'productType'
  | 'text'
  | 'heightCm'
  | 'count'
  | 'complexity'
  | 'mounting'
  | 'urgency'
  | 'materialId'
  | 'lightingId'
  | 'faceColor'
  | 'sideColor'
  | 'priceRange'
>;

export function toCalculatorData(state: CalculatorSnapshot): CalculatorData {
  return {
    productType: state.productType,
    text: state.text,
    heightCm: state.heightCm,
    count: state.count,
    complexity: state.complexity,
    mounting: state.mounting,
    urgency: state.urgency,
    materialId: state.materialId,
    lightingId: state.lightingId,
    faceColor: state.faceColor,
    sideColor: state.sideColor,
    priceRange: state.priceRange,
  };
}

export function formatPriceRange(
  priceRange: CalculatorSnapshot['priceRange'],
  locale = 'ru-RU'
): string {
  if (!priceRange) {
    return 'расчет уточняется';
  }

  return `${priceRange.min.toLocaleString(locale)} - ${priceRange.max.toLocaleString(locale)} ${priceRange.currency}`;
}

export function toAssistantContext(state: CalculatorSnapshot): string {
  return [
    '[SYSTEM CONTEXT]',
    'Текущая страница: Calculator',
    'Стейт калькулятора:',
    `- Текст: ${state.text}`,
    `- Продукт: ${state.productType}`,
    `- Высота: ${state.heightCm} см`,
    `- Символов: ${state.count}`,
    `- Материал: ${state.materialId}`,
    `- Подсветка: ${state.lightingId}`,
    `- Монтаж: ${state.mounting}`,
    `- Срочность: ${state.urgency}`,
    `- Цвет лицевой части: ${state.faceColor}`,
    `- Цвет боковой части: ${state.sideColor}`,
    `- Предварительный бюджет: ${formatPriceRange(state.priceRange)}`,
  ].join('\n');
}

export function toLeadPayload(
  state: CalculatorSnapshot,
  contact: Pick<LeadPayloadData, 'name' | 'phone'>,
  source = 'Website'
): LeadPayloadData {
  return {
    ...contact,
    source,
    calculatorData: toCalculatorData(state),
  };
}
