import nodemailer from 'nodemailer';
import type { LeadPayload } from './telegram'; // Import shared type

interface SCNCalculatorData {
  productType?: string;
  pricingInput: {
    dimensions: {
      widthMm?: number;
      heightMm?: number;
    };
    text?: string;
    material?: string;
    lighting?: string;
  };
  selectedPackage?: {
    title?: string;
    priceFrom: number;
  };
  complianceRisk?: {
    level?: string;
  };
  leadScore?: {
    grade?: string;
  };
  pricingResult: {
    basePrice: number;
  };
}

interface LegacyCalculatorData {
  text?: string;
  heightCm?: number;
  materialId?: string;
  lightingId?: string;
  priceRange?: {
    min: number;
    max: number;
    currency: string;
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isSCNCalculatorData(value: unknown): value is SCNCalculatorData {
  return isRecord(value) && isRecord(value.pricingInput) && isRecord(value.pricingResult);
}

function isLegacyCalculatorData(value: unknown): value is LegacyCalculatorData {
  return isRecord(value);
}

export const sendToEmail = async (lead: LeadPayload): Promise<boolean> => {
  const SMTP_HOST = process.env.SMTP_HOST;
  const SMTP_PORT = process.env.SMTP_PORT;
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;
  const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL; // Where to send

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !NOTIFICATION_EMAIL) {
    console.warn('[Email] SMTP credentials not fully configured. Skipping.');
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 465,
    secure: Number(SMTP_PORT) === 465, 
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const htmlContent = `
    <h2>Новая заявка БУКВА СВЕТ</h2>
    <p><strong>Имя:</strong> ${lead.name}</p>
    <p><strong>Телефон:</strong> ${lead.phone}</p>
    <p><strong>Email:</strong> ${lead.email || 'Не указан'}</p>
    <p><strong>Источник:</strong> ${lead.source || 'Сайт'}</p>
    
    ${(() => {
      if (!lead.calculatorData) return '';
      if (isSCNCalculatorData(lead.calculatorData)) {
        const calc = lead.calculatorData;
        const input = calc.pricingInput;
        const pkg = calc.selectedPackage;
        return `
          <h3>B2B SCN Расчет:</h3>
          <ul>
            <li><strong>Продукт:</strong> ${calc.productType}</li>
            <li><strong>Размеры:</strong> ${input.dimensions.widthMm || 0}x${input.dimensions.heightMm || 0} мм</li>
            <li><strong>Текст:</strong> ${input.text || '-'}</li>
            <li><strong>Материал:</strong> ${input.material || '-'}</li>
            <li><strong>Подсветка:</strong> ${input.lighting || 'none'}</li>
            <li><strong>Выбранный пакет:</strong> ${pkg?.title || 'Стандарт'}</li>
            <li><strong>Комплаенс (902-ПП):</strong> ${calc.complianceRisk?.level?.toUpperCase?.() || 'NONE'}</li>
            <li><strong>Скоринг лида:</strong> Grade ${calc.leadScore?.grade?.toUpperCase?.() || 'N/A'}</li>
            <li><b>Бюджет: ${(pkg ? pkg.priceFrom : calc.pricingResult.basePrice).toLocaleString('ru-RU')} RUB</b></li>
          </ul>
        `;
      }

      if (isLegacyCalculatorData(lead.calculatorData)) {
        const calc = lead.calculatorData;
        const priceRange = calc.priceRange;
        return `
          <h3>Данные конфигуратора:</h3>
          <ul>
            <li>Текст: ${calc.text}</li>
            <li>Высота: ${calc.heightCm} см</li>
            <li>Материал: ${calc.materialId}</li>
            <li>Подсветка: ${calc.lightingId}</li>
            <li><b>Бюджет: ${priceRange ? `${priceRange.min.toLocaleString('ru-RU')} - ${priceRange.max.toLocaleString('ru-RU')} ${priceRange.currency}` : 'Не указан'}</b></li>
          </ul>
        `;
      }

      return '';
    })()}
  `;

  try {
    await transporter.sendMail({
      from: `"БУКВА СВЕТ Robot" <${SMTP_USER}>`,
      to: NOTIFICATION_EMAIL,
      subject: `Новый лид с сайта: ${lead.name}`,
      html: htmlContent,
    });
    return true;
  } catch (error) {
    console.error('[Email Error]', error);
    return false;
  }
};

export const sendConfirmationToLead = async (email: string, name: string): Promise<boolean> => {
  const SMTP_HOST = process.env.SMTP_HOST;
  const SMTP_PORT = process.env.SMTP_PORT;
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !email) {
    console.warn('[Email Confirmation] SMTP credentials or lead email missing. Skipping.');
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 465,
    secure: Number(SMTP_PORT) === 465, 
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff; color: #1f2937;">
      <div style="text-align: center; margin-bottom: 24px; border-bottom: 2px solid #f3f4f6; padding-bottom: 20px;">
        <h2 style="color: #0d0d0d; font-family: monospace; font-size: 24px; font-weight: bold; margin: 0; letter-spacing: 0.1em; text-transform: uppercase;">
          БУКВА <span style="color: #00f5a0;">СВЕТ</span>
        </h2>
        <p style="font-size: 14px; color: #6b7280; margin: 8px 0 0 0;">Инженерные рекламные конструкции</p>
      </div>

      <p style="font-size: 16px; line-height: 1.6; margin-top: 0;">Здравствуйте, <strong>${name}</strong>!</p>
      
      <p style="font-size: 15px; line-height: 1.6; color: #4b5563;">
        Спасибо за прохождение инженерного квиза на нашем сайте. Мы успешно получили ваши параметры для расчета рекламной конструкции.
      </p>

      <div style="background-color: #0d0d0d; color: #ffffff; padding: 20px; border-radius: 8px; margin: 24px 0; border-left: 4px solid #00f5a0;">
        <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #00f5a0; margin-bottom: 8px;">ТЕКУЩИЙ СТАТУС ЗАЯВКИ</h3>
        <p style="margin: 0; font-size: 16px; font-weight: bold;">✓ ПРИНЯТО В РАБОТУ</p>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #9ca3af;">Запущено формирование предварительной сметы и разработка 3D-макета.</p>
      </div>

      <p style="font-size: 15px; line-height: 1.6; color: #4b5563;">
        Наш инженерный отдел свяжется с вами в течение <b>15–30 минут</b> (в рабочее время) для уточнения деталей и презентации 3D-визуализации.
      </p>

      <p style="font-size: 15px; line-height: 1.6; color: #4b5563; margin-bottom: 0;">
        Если у вас есть чертежи, брендбук или фотографии места монтажа, просто пришлите их ответным письмом на этот адрес.
      </p>

      <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; text-align: center; line-height: 1.5;">
        <p style="margin: 0 0 4px 0;">Производственная компания полного цикла БУКВА СВЕТ</p>
        <p style="margin: 0 0 12px 0;">г. Москва, ул. Производственная, д. 15, стр. 2</p>
        <p style="margin: 0;">
          <a href="mailto:hello@deushare.ru" style="color: #00f5a0; text-decoration: none;">hello@deushare.ru</a> | 
          <a href="tel:+74950000000" style="color: #9ca3af; text-decoration: none; margin-left: 8px;">+7 (495) 000-00-00</a>
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"БУКВА СВЕТ" <${SMTP_USER}>`,
      to: email,
      subject: `Ваша заявка принята в работу — БУКВА СВЕТ`,
      html: htmlContent,
    });
    return true;
  } catch (error) {
    console.error('[Email Confirmation Error]', error);
    return false;
  }
};
