'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_INFO } from '@/data/company';
import { Copy, Check } from 'lucide-react';

const WordIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M8 12l1.5 4.5 1-3 1 3 1.5-4.5" stroke="#185abd" strokeWidth="2.5" />
  </svg>
);

const PdfIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M8 12v3.5M8 12h1.2a0.9 0.9 0 0 1 0 1.8H8" stroke="#f40f02" strokeWidth="2.2" />
    <path d="M11.5 12v3.5M11.5 12h0.8a1.2 1.2 0 0 1 0 2.4h-0.8" stroke="#f40f02" strokeWidth="2.2" />
    <path d="M15 12h2M15 13.2h1.5M15 12v3.5" stroke="#f40f02" strokeWidth="2.2" />
  </svg>
);

export default function B2BRequisitesSection() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
      setCopiedField(null);
    }, 2000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleCopy = (text: string, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setToastMessage(`«${label}» скопирован в буфер`);
  };

  const downloadDocRequisites = () => {
    const content = `
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <title>Реквизиты ООО БУКВА СВЕТ</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; padding: 30px; }
    h2 { color: #111827; font-size: 18pt; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 20px; font-weight: bold; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th { text-align: left; padding: 10px 12px; border-bottom: 1px solid #e5e7eb; background-color: #f9fafb; color: #4b5563; font-size: 10.5pt; width: 35%; }
    td { padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-size: 10.5pt; color: #111827; font-weight: bold; }
    .footer { margin-top: 40px; font-size: 8.5pt; color: #9ca3af; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 10px; }
  </style>
</head>
<body>
  <h2>Реквизиты компании ООО "БУКВА СВЕТ"</h2>
  <table>
    <tr><th>Полное наименование</th><td>Общество с ограниченной ответственностью "БУКВА СВЕТ"</td></tr>
    <tr><th>ИНН</th><td>${COMPANY_INFO.requisites?.inn || '—'}</td></tr>
    <tr><th>КПП</th><td>${COMPANY_INFO.requisites?.kpp || '—'}</td></tr>
    <tr><th>ОГРН</th><td>${COMPANY_INFO.requisites?.ogrn || '—'}</td></tr>
    <tr><th>Банк</th><td>${COMPANY_INFO.requisites?.bank || '—'}</td></tr>
    <tr><th>БИК</th><td>${COMPANY_INFO.requisites?.bik || '—'}</td></tr>
    <tr><th>Расчетный счет</th><td>${COMPANY_INFO.requisites?.rs || '—'}</td></tr>
    <tr><th>Корр. счет</th><td>${COMPANY_INFO.requisites?.ks || '—'}</td></tr>
    <tr><th>Юридический адрес</th><td>${COMPANY_INFO.requisites?.legalAddress || '—'}</td></tr>
  </table>
  <div class="footer" style="font-size: 8pt;">Документ сформирован автоматически на сайте БУКВА СВЕТ Инжиниринг</div>
</body>
</html>
    `.trim();
    
    const blob = new Blob(['\ufeff' + content], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'requisites_bukva_svet.doc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setCopiedField('doc');
    setToastMessage('Реквизиты скачаны в формате DOC');
  };

  const downloadPdfRequisites = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      setToastMessage('Не удалось открыть окно печати. Разрешите всплывающие окна.');
      return;
    }
    
    const content = `
<html>
<head>
  <meta charset="utf-8">
  <title>Реквизиты ООО БУКВА СВЕТ</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1f2937; padding: 40px; }
    .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #00f5a0; padding-bottom: 15px; margin-bottom: 30px; }
    .logo { font-size: 20pt; font-weight: 800; color: #111827; letter-spacing: -1px; text-decoration: none; font-family: sans-serif; }
    .logo span { color: #10b981; }
    .title { font-size: 14pt; color: #4b5563; font-weight: 600; text-transform: uppercase; font-family: sans-serif; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th { text-align: left; padding: 12px 14px; border-bottom: 1px solid #e5e7eb; background-color: #f9fafb; color: #4b5563; font-size: 10pt; width: 35%; text-transform: uppercase; letter-spacing: 0.5px; }
    td { padding: 12px 14px; border-bottom: 1px solid #e5e7eb; font-size: 10.5pt; color: #111827; font-family: monospace; font-weight: bold; }
    .footer { margin-top: 50px; font-size: 8.5pt; color: #9ca3af; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 15px; font-family: sans-serif; }
    @media print {
      body { padding: 20px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">Буква<span>Свет</span></div>
    <div class="title">Карточка реквизитов</div>
  </div>
  <table>
    <tr><th>Полное наименование</th><td>Общество с ограниченной ответственностью "БУКВА СВЕТ"</td></tr>
    <tr><th>ИНН</th><td>${COMPANY_INFO.requisites?.inn || '—'}</td></tr>
    <tr><th>КПП</th><td>${COMPANY_INFO.requisites?.kpp || '—'}</td></tr>
    <tr><th>ОГРН</th><td>${COMPANY_INFO.requisites?.ogrn || '—'}</td></tr>
    <tr><th>Банк</th><td>${COMPANY_INFO.requisites?.bank || '—'}</td></tr>
    <tr><th>БИК</th><td>${COMPANY_INFO.requisites?.bik || '—'}</td></tr>
    <tr><th>Расчетный счет</th><td>${COMPANY_INFO.requisites?.rs || '—'}</td></tr>
    <tr><th>Корр. счет</th><td>${COMPANY_INFO.requisites?.ks || '—'}</td></tr>
    <tr><th>Юридический адрес</th><td>${COMPANY_INFO.requisites?.legalAddress || '—'}</td></tr>
  </table>
  <div class="footer">Документ сформирован автоматически на сайте БУКВА СВЕТ Инжиниринг — bukva-svet.ru</div>
  <script>
    window.onload = function() {
      window.print();
      setTimeout(function() {
        window.close();
      }, 500);
    };
  </script>
</body>
</html>
    `.trim();
    
    printWindow.document.write(content);
    printWindow.document.close();
    setCopiedField('pdf');
    setToastMessage('Открытие документа для сохранения в PDF...');
  };

  const fields = [
    { label: 'ИНН', value: COMPANY_INFO.requisites?.inn, colSpan: 'col-span-1' },
    { label: 'КПП', value: COMPANY_INFO.requisites?.kpp, colSpan: 'col-span-1' },
    { label: 'ОГРН', value: COMPANY_INFO.requisites?.ogrn, colSpan: 'col-span-1' },
    { label: 'Банк', value: COMPANY_INFO.requisites?.bank, colSpan: 'col-span-1' },
    { label: 'БИК', value: COMPANY_INFO.requisites?.bik, colSpan: 'col-span-1' },
    { label: 'Расчетный счет', value: COMPANY_INFO.requisites?.rs, colSpan: 'col-span-1' },
    { label: 'Корр. счет', value: COMPANY_INFO.requisites?.ks, colSpan: 'col-span-1' },
    { label: 'Юридический адрес', value: COMPANY_INFO.requisites?.legalAddress, colSpan: 'col-span-1', isWide: true },
  ];

  return (
    <section className="py-8 md:py-10 border-y border-outline/60 bg-background/50 relative overflow-hidden">
      <div className="section-container relative z-10">
        
        {/* Header with copy-all action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4 mb-5 md:mb-6">
          <div>
            <h2 className="geist-display-sm uppercase text-on-surface tracking-tight">
              Реквизиты компании
            </h2>
            <p className="text-on-surface-variant text-xs sm:text-sm mt-0.5">
              Нажмите на любую карточку для быстрого копирования значения
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
             {/* Download in DOC */}
             <button
               onClick={downloadDocRequisites}
               className="group flex items-center justify-center gap-2 h-9 px-4 bg-surface/50 border border-blue-500/40 hover:border-blue-500/80 hover:shadow-[0_0_16px_rgba(59,130,246,0.2)] rounded-full text-[11px] font-semibold uppercase tracking-[1px] font-mono text-on-surface hover:text-blue-400 transition-all duration-300 active:scale-[0.98]"
             >
               {copiedField === 'doc' ? (
                 <Check className="w-3 h-3 text-blue-400 animate-scale" />
               ) : (
                 <WordIcon className="w-3 h-3 text-neutral-400 group-hover:scale-110 transition-all duration-300" />
               )}
               <span>Скачать в DOC</span>
             </button>
 
             {/* Download in PDF */}
             <button
               onClick={downloadPdfRequisites}
               className="group flex items-center justify-center gap-2 h-9 px-4 bg-surface/50 border border-red-500/40 hover:border-red-500/80 hover:shadow-[0_0_16px_rgba(239,68,68,0.2)] rounded-full text-[11px] font-semibold uppercase tracking-[1px] font-mono text-on-surface hover:text-red-400 transition-all duration-300 active:scale-[0.98]"
             >
               {copiedField === 'pdf' ? (
                 <Check className="w-3 h-3 text-red-400 animate-scale" />
               ) : (
                 <PdfIcon className="w-3 h-3 text-neutral-400 group-hover:scale-110 transition-all duration-300" />
               )}
               <span>Скачать в PDF</span>
             </button>
          </div>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
          {fields.map((field, idx) => (
            <motion.div
              key={field.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.03, duration: 0.4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCopy(field.value || '', field.label)}
              className={`${field.colSpan} group relative flex flex-col justify-between p-3.5 md:p-4 bg-surface/40 hover:bg-surface border border-outline-strong/20 hover:border-[var(--accent)]/40 rounded-[var(--radius-12)] shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 min-h-[82px] md:min-h-[88px] overflow-hidden`}
            >
              {/* Soft mint ambient glow on card hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/0 to-[var(--accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="flex items-center justify-between mb-1.5">
                <span className="verge-mono-label text-on-surface-variant/60 font-semibold uppercase tracking-[0.05em] text-[9px] md:text-[10px]">
                  {field.label}
                </span>
                
                {/* Micro Copy Indicator */}
                <div className="text-on-surface-variant/70 group-hover:text-[var(--accent)] transition-colors duration-300">
                  {copiedField === field.label ? (
                    <Check className="w-3 h-3 text-[var(--accent)]" />
                  ) : (
                    <Copy className="w-3 h-3 opacity-90 group-hover:opacity-100 transition-all duration-300" />
                  )}
                </div>
              </div>

              <p className={`font-mono text-[13px] md:text-sm font-semibold tracking-tight leading-snug text-on-surface break-all md:break-normal ${field.isWide ? 'break-words' : ''}`}>
                {field.value ?? '—'}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Global Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-surface/90 backdrop-blur-md border border-[var(--accent)]/40 px-5 py-3 rounded-full shadow-[0_10px_30px_rgba(0,245,160,0.15)]"
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--accent)]/15 text-[var(--accent)]">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-on-surface font-sans leading-none">
              {toastMessage}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
