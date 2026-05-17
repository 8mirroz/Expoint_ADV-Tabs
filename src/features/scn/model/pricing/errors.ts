export class PricingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PricingError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class UnsupportedProductError extends PricingError {
  constructor(productType: string) {
    super(`Продукт типа "${productType}" не поддерживается калькулятором.`);
    this.name = 'UnsupportedProductError';
  }
}

export class PricingValidationError extends PricingError {
  public errors: string[];

  constructor(errors: string[]) {
    super(`Ошибка валидации входных параметров: ${errors.join(', ')}`);
    this.name = 'PricingValidationError';
    this.errors = errors;
  }
}

export class RuleNotFoundError extends PricingError {
  constructor(productType: string, version: string) {
    super(`Формула расчета для "${productType}" версии "${version}" не найдена в реестре.`);
    this.name = 'RuleNotFoundError';
  }
}
