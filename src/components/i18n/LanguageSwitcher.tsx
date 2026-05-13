"use client";

import { useMemo, useState, useEffect, useRef } from 'react';
import { Check, Languages, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { useLanguage } from '@/components/i18n/LanguageProvider';
import { LANGUAGE_OPTIONS, t, uiCopy } from '@/i18n/site';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeLanguage = useMemo(
    () => LANGUAGE_OPTIONS.find((item) => item.code === locale) ?? LANGUAGE_OPTIONS[0],
    [locale]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className={`relative h-11 min-w-[90px] flex items-center justify-between gap-2 rounded-xl bg-secondary/50 px-4 text-on-surface hover:bg-secondary transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95 group ${
          isOpen ? 'bg-secondary ring-2 ring-accent/20' : ''
        }`}
        aria-expanded={isOpen}
        aria-label={t(locale, uiCopy.languageLabel)}
        title={t(locale, uiCopy.languageLabel)}
      >
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-accent" />
          <span className="text-[11px] font-black uppercase tracking-[0.1em]">{activeLanguage.shortLabel}</span>
        </div>
        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-outline bg-surface/95 backdrop-blur-2xl shadow-premium z-50 p-2"
          >
            <div className="px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/40 mb-2">
              {t(locale, uiCopy.languageLabel)}
            </div>

            <div className="space-y-1">
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
                    className={`flex w-full items-center justify-between px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-accent/10 text-accent ring-1 ring-accent/20' 
                        : 'text-on-surface hover:bg-secondary hover:translate-x-1'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10px] ${
                        isActive ? 'bg-accent text-white' : 'bg-secondary/50 text-on-surface/70'
                      }`}>
                        {item.shortLabel}
                      </div>
                      <div className="flex flex-col items-start leading-tight">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{item.shortLabel}</span>
                        <span className="text-sm font-bold tracking-tight">{item.nativeLabel}</span>
                      </div>
                    </div>

                    {isActive ? (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <Check className="w-4 h-4" />
                      </motion.div>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
