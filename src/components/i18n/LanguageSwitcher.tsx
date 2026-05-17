"use client";

import { useMemo, useState, useEffect, useRef } from 'react';
import { Check, Globe, ChevronDown } from 'lucide-react';
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
        className={`relative h-9 flex items-center justify-between gap-1.5 rounded-full border border-[color:rgba(138,138,138,0.18)] bg-transparent px-3 text-[color:rgba(38,38,38,0.72)] transition-all duration-300 hover:bg-[rgba(0,0,0,0.04)] hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95 group ${
          isOpen ? 'bg-[rgba(0,0,0,0.04)] ring-2 ring-accent/20' : ''
        }`}
        aria-expanded={isOpen}
        aria-label={t(locale, uiCopy.languageLabel)}
        title={t(locale, uiCopy.languageLabel)}
      >
        <div className="flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 opacity-60 group-hover:text-primary group-hover:opacity-100 transition-all" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ fontFamily: 'var(--font-mono)' }}>{activeLanguage.shortLabel}</span>
        </div>
        <ChevronDown className={`w-3 h-3 opacity-40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-outline bg-surface-elevated/95 backdrop-blur-2xl shadow-premium z-50 p-2"
          >
            <div className="px-3 py-2 text-xs font-black uppercase tracking-[0.2em] text-on-surface/40 mb-2">
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
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isActive ? 'bg-accent text-white' : 'bg-surface-variant text-on-surface/70'
                      }`}>
                        {item.shortLabel}
                      </div>
                      <div className="flex flex-col items-start leading-tight">
                        <span className="text-xs font-black uppercase tracking-widest opacity-40">{item.shortLabel}</span>
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
