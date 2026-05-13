import nodemailer from 'nodemailer';
import type { LeadPayload } from './telegram'; // Import shared type

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
    <h2>Новая заявка Expoint ADV</h2>
    <p><strong>Имя:</strong> ${lead.name}</p>
    <p><strong>Телефон:</strong> ${lead.phone}</p>
    <p><strong>Источник:</strong> ${lead.source || 'Сайт'}</p>
    
    ${lead.calculatorData ? `
      <h3>Данные конфигуратора:</h3>
      <ul>
        <li>Текст: ${lead.calculatorData.text}</li>
        <li>Тип: ${lead.calculatorData.type}</li>
        <li>Размер: ${lead.calculatorData.size}</li>
        <li>Цвет: ${lead.calculatorData.glowColor}</li>
        <li>Монтаж: ${lead.calculatorData.hasInstallation ? 'Да' : 'Нет'}</li>
        <li><b>Сумма: ~${lead.calculatorData.totalPrice?.toLocaleString('ru-RU')} ₽</b></li>
      </ul>
    ` : ''}
  `;

  try {
    await transporter.sendMail({
      from: `"Expoint ADV Robot" <${SMTP_USER}>`,
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
