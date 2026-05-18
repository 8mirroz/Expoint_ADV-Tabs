import {
  PricingResult,
  ParsedPricingInput,
  SCNContext,
  OfferPackage,
  ComplianceRisk,
  LeadScore
} from '../schemas';

export interface OfferPayload {
  packages: {
    start: OfferPackage;
    business: OfferPackage;
    premium: OfferPackage;
  };
  complianceRisk: ComplianceRisk;
  leadScore: LeadScore;
}

export class OfferComposer {
  /**
   * Генерирует полное коммерческое предложение, включая 3 пакета (Decoy Pricing),
   * оценку рисков комплаенса и скоринг лида для CRM.
   */
  public static compose(
    result: PricingResult,
    input: ParsedPricingInput,
    context: SCNContext
  ): OfferPayload {
    const basePrice = result.basePrice;

    // 1. Расчет стоимости пакетов с округлением до сотен
    const startPrice = Math.max(9500, Math.round((basePrice * 0.85) / 100) * 100);
    const businessPrice = basePrice;
    const premiumPrice = Math.round((basePrice * 1.45) / 100) * 100;

    // 2. Списки включенных/исключенных опций в зависимости от продукта
    const isNeon = input.productType === 'neon';
    
    const startPackage: OfferPackage = {
      id: 'start',
      title: 'Стартовый',
      priceFrom: startPrice,
      isRecommended: false,
      marginClass: 'low',
      included: [
        'Производство рекламной конструкции',
        'Стандартные комплектующие',
        'Базовая гарантия 12 месяцев',
        isNeon ? 'Базовая подложка (акрил)' : 'Стандартный светодиодный модуль'
      ],
      excluded: [
        'Доставка и монтаж конструкции',
        'Премиальные герметичные блоки питания',
        'Ускоренное производство (за 24 часа)',
        isNeon ? 'Управление яркостью (диммер с пультом)' : 'Двустороннее свечение / консольный кронштейн'
      ],
      riskNotes: [
        'Не включает профессиональный монтаж — самостоятельная установка аннулирует расширенную гарантию',
        'Используются базовые блоки питания со стандартным сроком службы'
      ],
      ctaLabel: 'Выбрать Start'
    };

    const businessPackage: OfferPackage = {
      id: 'business',
      title: 'Оптимальный',
      priceFrom: businessPrice,
      isRecommended: true,
      marginClass: 'normal',
      included: [
        'Производство конструкции по точным параметрам',
        'Герметичные блоки питания повышенной надежности (IP67)',
        'Расширенная гарантия 24 месяца',
        'Комплект для настенного монтажа',
        input.mountingRequired ? 'Монтажные и пусконаладочные работы' : 'Подробный макет-трафарет для установки'
      ],
      excluded: [
        'Удлиненная VIP-гарантия 36 месяцев',
        'Срочная доставка спецтранспортом',
        isNeon ? 'RGB-контроллер с динамическими сценариями' : 'Усиленный силовой каркас повышенной прочности'
      ],
      riskNotes: [],
      ctaLabel: 'Выбрать Business'
    };

    const premiumPackage: OfferPackage = {
      id: 'premium',
      title: 'Премиум',
      priceFrom: premiumPrice,
      isRecommended: false,
      marginClass: 'high',
      included: [
        'Производство премиальной версии рекламной конструкции',
        'Премиум комплектующие от ведущих брендов (MeanWell, NeoNeon)',
        'Полная VIP-гарантия 36 месяцев с выездом мастера',
        'Приоритетная доставка спецтранспортом',
        'Монтаж "под ключ" с усиленным крепежом',
        isNeon ? 'Многоцветный Smart-контроллер с пультом управления' : 'Двустороннее свечение и усиленный кронштейн'
      ],
      excluded: [],
      riskNotes: [],
      ctaLabel: 'Выбрать Premium'
    };

    // 3. Расчет комплаенс-риска (ComplianceRisk)
    let riskLevel: 'none' | 'low' | 'medium' | 'high' = 'none';
    const flags: string[] = [];
    let userMessage = 'Конструкция соответствует стандартным требованиям размещения.';
    let requiresEngineerReview = false;

    if (input.complianceRequired) {
      const widthMm = input.dimensions.widthMm ?? 0;
      const heightMm = input.dimensions.heightMm ?? 0;
      const areaM2 = input.dimensions.areaM2 ?? (widthMm * heightMm) / 1000000;

      const hasExcessiveArea = input.productType === 'lightboxes' && areaM2 > 3;
      const hasWarnings = result.warnings.length > 0;

      if (hasExcessiveArea) {
        riskLevel = 'high';
        flags.push('excessive-area', 'permit-required');
        userMessage = 'Внимание: Площадь вывески превышает 3 м². Потребуется обязательное индивидуальное согласование Москомархитектуры (Постановление 902-ПП).';
        requiresEngineerReview = true;
      } else if (hasWarnings) {
        riskLevel = 'medium';
        flags.push('technical-limits-warning');
        userMessage = 'Обнаружены технические ограничения конструкции. Рекомендуется технический аудит инженером.';
        requiresEngineerReview = true;
      } else {
        riskLevel = 'low';
        userMessage = 'Параметры конструкции соответствуют базовому регламенту Постановления 902-ПП.';
      }
    } else {
      userMessage = 'Проверка соответствия Постановлению 902-ПП не запрашивалась.';
    }

    const complianceRisk: ComplianceRisk = {
      level: riskLevel,
      flags,
      userMessage,
      requiresEngineerReview
    };

    // 4. Интеллектуальный скоринг лида (LeadScore)
    let scoreTotal = 50;
    const reasons: string[] = [];

    // Контекст запуска
    if (context === 'b2b') {
      scoreTotal += 20;
      reasons.push('Приоритетный B2B клиент');
    } else if (context === 'premium') {
      scoreTotal += 25;
      reasons.push('Премиальный сегмент SCN');
    } else if (context === 'urgent') {
      scoreTotal += 15;
      reasons.push('Срочная B2B сессия');
    }

    // Срочность
    if (input.urgency === 'fast' || input.urgency === 'urgent') {
      scoreTotal += 10;
      reasons.push('Повышенная срочность изготовления');
    }

    // Дополнительные услуги
    if (input.mountingRequired) {
      scoreTotal += 10;
      reasons.push('Запрос профессионального монтажа');
    }

    // Размер сделки
    if (basePrice > 150000) {
      scoreTotal += 30;
      reasons.push('Высокий чек сделки (>150k RUB)');
    } else if (basePrice > 50000) {
      scoreTotal += 15;
      reasons.push('Средний чек сделки (>50k RUB)');
    }

    // Категория лида
    let grade: 'cold' | 'warm' | 'hot' | 'priority' = 'warm';
    let salesPriority: 'low' | 'normal' | 'high' | 'urgent' = 'normal';

    if (scoreTotal >= 90) {
      grade = 'priority';
      salesPriority = 'urgent';
    } else if (scoreTotal >= 70) {
      grade = 'hot';
      salesPriority = 'high';
    } else if (scoreTotal >= 50) {
      grade = 'warm';
      salesPriority = 'normal';
    } else {
      grade = 'cold';
      salesPriority = 'low';
    }

    const leadScore: LeadScore = {
      total: scoreTotal,
      grade,
      reasons,
      salesPriority
    };

    return {
      packages: {
        start: startPackage,
        business: businessPackage,
        premium: premiumPackage
      },
      complianceRisk,
      leadScore
    };
  }
}
