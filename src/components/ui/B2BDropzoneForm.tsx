'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/i18n/LanguageProvider';

export function B2BDropzoneForm() {
  const { locale } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-surface border border-outline rounded-3xl p-8 md:p-12 shadow-2xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">
          {locale === 'ru' ? 'Отправьте проект на расчет' : 'Send Project for Estimation'}
        </h2>
        <p className="text-on-surface-variant max-w-xl mx-auto">
          {locale === 'ru' 
            ? 'Прикрепите файлы (PDF, DWG, CDR), и наш инженер свяжется с вами для обсуждения деталей.' 
            : 'Attach files (PDF, DWG, CDR), and our engineer will contact you to discuss details.'}
        </p>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-on-surface-variant">
              {locale === 'ru' ? 'Имя и Должность' : 'Name & Position'}
            </label>
            <input 
              type="text" 
              className="w-full bg-background border border-outline-strong/40 rounded-lg px-4 py-3.5 text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200"
              placeholder={locale === 'ru' ? 'Александр, ГАП' : 'John, Lead Architect'}
            />
          </div>
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-on-surface-variant">
              {locale === 'ru' ? 'Телефон / Мессенджер' : 'Phone / Messenger'}
            </label>
            <input 
              type="text" 
              required
              className="w-full bg-background border border-outline-strong/40 rounded-lg px-4 py-3.5 text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200"
              placeholder="+7 (999) 000-00-00"
            />
          </div>
        </div>

        {/* Dropzone */}
        <div 
          className={`mt-8 border-2 border-dashed rounded-2xl p-10 text-center transition-colors ${
            isDragging ? 'border-accent bg-accent/5' : 'border-outline/50 bg-background hover:border-accent/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-4xl mb-4">📁</div>
          {file ? (
            <div>
              <p className="font-bold text-accent">{file.name}</p>
              <p className="text-sm text-on-surface-variant">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              <button 
                type="button"
                onClick={() => setFile(null)}
                className="mt-4 text-xs text-red-500 uppercase font-bold"
              >
                {locale === 'ru' ? 'Удалить файл' : 'Remove file'}
              </button>
            </div>
          ) : (
            <div>
              <p className="font-bold mb-2">
                {locale === 'ru' ? 'Перетащите ТЗ или чертежи сюда' : 'Drag & Drop brief or drawings here'}
              </p>
              <p className="text-sm text-on-surface-variant mb-4">
                {locale === 'ru' ? 'Поддерживаются PDF, DWG, CDR (до 100 МБ)' : 'Supported: PDF, DWG, CDR (up to 100 MB)'}
              </p>
              <label className="inline-block px-6 py-2 bg-on-surface text-surface rounded-full cursor-pointer text-sm font-bold uppercase hover:bg-accent transition-colors">
                {locale === 'ru' ? 'Выбрать файл' : 'Select File'}
                <input type="file" className="hidden" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
              </label>
            </div>
          )}
        </div>

        <button className="w-full py-4 mt-8 bg-accent text-background font-black uppercase tracking-widest rounded-full hover:bg-accent/90 transition-colors">
          {locale === 'ru' ? 'Отправить на расчет' : 'Submit for Estimation'}
        </button>

        <p className="text-xs text-center text-on-surface-variant mt-4">
          {locale === 'ru' 
            ? 'За 1 рабочий день изучим проект и дадим вилку стоимости. Мы соблюдаем NDA и 152-ФЗ.' 
            : 'We will study the project in 1 business day. We comply with NDA.'}
        </p>
      </form>
    </div>
  );
}
