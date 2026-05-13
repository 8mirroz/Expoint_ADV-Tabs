"use client";

import { useMemo, useState } from 'react';
import { Check, Languages } from 'lucide-react';

import { useLanguage } from '@/components/i18n/LanguageProvider';
import { LANGUAGE_OPTIONS, t, uiCopy } from '@/i18n/site';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const activeLanguage = useMemo(
    () => LANGUAGE_OPTIONS.find((item) => item.code === locale) ?? LANGUAGE_OPTIONS[0],
    [locale]
  );

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="relative h-10 min-w-[88px] flex items-center justify-center gap-2 border border-outline bg-surface px-3 text-on-surface hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors duration-300"
        aria-expanded={isOpen}
        aria-label={t(locale, uiCopy.languageLabel)}
        title={t(locale, uiCopy.languageLabel)}
      >
        <Languages className="w-4 h-4 text-accent" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{activeLanguage.shortLabel}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 overflow-hidden border border-outline/80 bg-background/95 backdrop-blur-xl shadow-premium z-50">
          <div className="border-b border-outline/60 px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
            {t(locale, uiCopy.languageLabel)}
          </div>

          <div className="p-2">
            {LANGUAGE_OPTIONS.map((item) => {
              const isActive = item.code === locale;

              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setLocale(item.code);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-3 py-3 text-left transition-colors ${
                    isActive ? 'bg-accent/10 text-accent' : 'text-on-surface hover:bg-secondary'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.shortLabel}</span>
                    <span className="text-sm">{item.nativeLabel}</span>
                  </div>

                  {isActive ? <Check className="w-4 h-4" /> : null}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
