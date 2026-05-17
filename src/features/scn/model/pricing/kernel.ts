import { PricingInput, PricingResult } from '../schemas/pricing.schema';
import { PricingInputSchema, PricingResultSchema } from '../schemas';
import { getLatestPricingRule } from './registry';
import { RuleNotFoundError, PricingValidationError } from './errors';

export class PricingKernel {
  /**
   * Выполняет детерминированный расчет цены на основе входных параметров.
   * Выбрасывает типизированные исключения при ошибках валидации или отсутствии правил.
   */
  public static calculate(input: PricingInput): PricingResult {
    // 1. Валидация входных данных через Zod-схему
    const parseResult = PricingInputSchema.safeParse(input);
    if (!parseResult.success) {
      const errorMessages = parseResult.error.issues.map(
        err => `${err.path.join('.')}: ${err.message}`
      );
      throw new PricingValidationError(errorMessages);
    }

    const validatedInput = parseResult.data;

    // 2. Поиск правила ценообразования в реестре
    const rule = getLatestPricingRule(validatedInput.productType);
    if (!rule) {
      throw new RuleNotFoundError(validatedInput.productType, 'latest');
    }

    // 3. Бизнес-валидация параметров конкретным правилом
    const businessValidation = rule.validateInput(validatedInput);
    if (!businessValidation.isValid) {
      throw new PricingValidationError(businessValidation.errors);
    }

    // 4. Вычисление стоимости по формуле правила
    const result = rule.calculate(validatedInput);

    // 5. Дополнительная валидация выходного результата для гарантии контрактной целостности
    return PricingResultSchema.parse(result);
  }
}
