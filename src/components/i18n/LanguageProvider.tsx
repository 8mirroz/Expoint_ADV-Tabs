"use client";

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { DEFAULT_LOCALE, LANGUAGE_STORAGE_KEY, SiteLocale } from '@/i18n/site';

interface LanguageContextValue {
  locale: SiteLocale;
  setLocale: (locale: SiteLocale) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<SiteLocale>(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_LOCALE;
    }

    return (window.localStorage.getItem(LANGUAGE_STORAGE_KEY) as SiteLocale | null) ?? DEFAULT_LOCALE;
  });

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale: setLocaleState,
    }),
    [locale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }

  return context;
}
