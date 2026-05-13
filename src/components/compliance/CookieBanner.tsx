'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ChevronRight, X, Settings2, Check } from 'lucide-react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { useConsentStore } from '@/store/consentStore';

export const CookieBanner = () => {
  const { locale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { hasResponded, consents, setConsents, acceptAll } = useConsentStore();

  // Prevent flash on initial load
  useEffect(() => {
    if (!hasResponded) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [hasResponded]);

  if (hasResponded && !isOpen) return null;

  const handleAcceptAll = () => {
    acceptAll();
    setIsOpen(false);
  };

  const handleSaveSettings = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-lg z-100"
        >
          <div className="relative overflow-hidden rounded-xl border border-outline bg-surface shadow-2xl backdrop-blur-xl">
            {/* Industrial corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/50" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent/50" />

            <div className="p-6">
              {!showSettings ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-accent/10 text-accent">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-on-surface tracking-tight">
                        {locale === 'ru' ? 'Конфиденциальность и cookie' : locale === 'en' ? 'Privacy and Cookies' : 'Конфиденциальность и cookie'}
                      </h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed">
                        Мы используем файлы cookie для улучшения работы сайта и обеспечения безопасности в соответствии с 152-ФЗ.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={handleAcceptAll}
                      className="flex-1 px-4 py-2.5 bg-accent text-on-accent font-bold rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 group"
                    >
                        {locale === 'ru' ? 'Принять всё' : locale === 'en' ? 'Accept All' : 'Принять всё'}
                      <Check className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                      onClick={() => setShowSettings(true)}
                      className="px-4 py-2.5 bg-transparent border border-outline text-on-surface font-medium rounded-lg hover:bg-accent/5 transition-all flex items-center justify-center gap-2"
                    >
                      <Settings2 className="w-4 h-4" />
                      {locale === 'ru' ? 'Настроить' : locale === 'en' ? 'Customize' : 'Настроить'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-on-surface uppercase tracking-wider">
                      {locale === 'ru' ? 'Настройки приватности' : locale === 'en' ? 'Privacy Settings' : 'Настройки приватности'}
                    </h3>
                    <button 
                      onClick={() => setShowSettings(false)}
                      className="p-1 text-on-surface-variant hover:text-on-surface"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <CookieOption 
                      title="Необходимые"
                      description="Обеспечивают базовую функциональность и безопасность сайта."
                      checked={true}
                      disabled={true}
                    />
                    <CookieOption 
                      title="Аналитика"
                      description="Помогают нам понимать, как пользователи взаимодействуют с сайтом."
                      checked={consents.analytics}
                      onChange={(val) => setConsents({ analytics: val })}
                    />
                    <CookieOption 
                      title="Маркетинг"
                      description="Используются для персонализации рекламных предложений."
                      checked={consents.marketing}
                      onChange={(val) => setConsents({ marketing: val })}
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleSaveSettings}
                      className="w-full px-4 py-2.5 bg-accent text-on-accent font-bold rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
                    >
                      {locale === 'ru' ? 'Сохранить настройки' : locale === 'en' ? 'Save Settings' : 'Сохранить настройки'}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CookieOption = ({ 
  title, 
  description, 
  checked, 
  onChange, 
  disabled = false 
}: { 
  title: string, 
  description: string, 
  checked: boolean, 
  onChange?: (val: boolean) => void,
  disabled?: boolean 
}) => (
  <div className={`p-3 rounded-lg border ${checked ? 'border-accent/30 bg-accent/5' : 'border-outline'} transition-colors`}>
    <div className="flex items-center justify-between mb-1">
      <span className="font-bold text-sm text-on-surface">{title}</span>
      <input 
        type="checkbox" 
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="w-4 h-4 accent-accent cursor-pointer disabled:cursor-not-allowed"
      />
    </div>
    <p className="text-xs text-on-surface-variant leading-tight">
      {description}
    </p>
  </div>
);
