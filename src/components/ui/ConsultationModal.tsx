"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { useModalStore } from '@/store/useModalStore';
import { leadSchema, type LeadFormData } from '@/lib/validators/lead';
import { TurnstileWidget } from './TurnstileWidget';

export default function ConsultationModal() {
  const { locale } = useLanguage();
  const { isOpen, closeModal, context, source } = useModalStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  // Keep turnstileToken synced with react-hook-form
  useEffect(() => {
    if (turnstileToken) {
      setValue('turnstileToken', turnstileToken);
    }
  }, [turnstileToken, setValue]);

  const onSubmit = async (data: LeadFormData) => {
    if (!data.turnstileToken) {
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Log Consent (152-FZ)
      await fetch('/api/compliance/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formId: `consultation_${source || 'general'}`,
          purposes: ['personal_data'],
          policyVersion: '1.0.0',
        }),
      });

      // 2. Submit Lead
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, context, source }),
      });
      
      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          closeModal();
          reset();
        }, 3000);
      } else {
        console.error('Failed to submit lead');
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal panel — theme-aware via CSS variables */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg rounded-2xl bg-surface-elevated border border-outline p-8 shadow-premium overflow-hidden"
          >
            {/* Industrial accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
            
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-on-surface mb-2">
                  {locale === 'ru' ? 'Заявка принята' : locale === 'en' ? 'Request Received' : 'Заявка принята'}
                </h3>
                <p className="text-on-surface-variant">
                  {locale === 'ru' ? 'Наш инженер свяжется с вами в ближайшее время.' : locale === 'en' ? 'Our engineer will contact you shortly.' : 'Наш инженер свяжется с вами в ближайшее время.'}
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-headline font-bold text-on-surface mb-2">
                  {locale === 'ru' ? 'Оставить заявку' : locale === 'en' ? 'Send Request' : 'Оставить заявку'}
                </h2>
                <p className="text-on-surface-variant mb-8">
                  {context ? `${locale === 'ru' ? 'Вы запросили' : 'Requested'}: ${context}. ` : ''}
                  {locale === 'ru' ? 'Оставьте контакты для связи с экспертом.' : locale === 'en' ? 'Leave your contact details to speak with an expert.' : 'Оставьте контакты для связи с экспертом.'}
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-2">Имя</label>
                    <input
                      {...register('name')}
                      className="w-full rounded-xl bg-surface border border-outline p-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-accent transition-colors"
                      placeholder="Иван Иванов"
                    />
                    {errors.name && <p className="text-error text-sm mt-1">{errors.name.message}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-2">Телефон</label>
                    <input
                      {...register('phone')}
                      className="w-full rounded-xl bg-surface border border-outline p-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-accent transition-colors"
                      placeholder="+7 (999) 000-00-00"
                    />
                    {errors.phone && <p className="text-error text-sm mt-1">{errors.phone.message}</p>}
                  </div>

                  {/* Consent checkbox */}
                  <div>
                    <label className="group flex items-start gap-3 cursor-pointer">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          {...register('consent')}
                          className="peer sr-only"
                        />
                        <div className="w-5 h-5 rounded-sm border border-outline bg-surface peer-checked:bg-accent peer-checked:border-accent transition-all flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-on-accent opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <span className="text-xs text-on-surface-variant leading-tight uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                        Я согласен на обработку персональных данных в соответствии с{' '}
                        <a href="/privacy" className="text-accent underline hover:no-underline">
                          политикой конфиденциальности
                        </a>{' '}
                        (152-ФЗ)
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="text-error text-xs mt-1 uppercase font-bold">
                        {errors.consent.message}
                      </p>
                    )}
                  </div>

                  {/* Security Check */}
                  <div className="py-2">
                    <TurnstileWidget onVerify={setTurnstileToken} />
                    {errors.turnstileToken && (
                      <p className="text-error text-xs mt-1 uppercase font-bold">
                        {errors.turnstileToken.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                  className="w-full rounded-xl bg-primary hover:bg-accent text-on-primary hover:text-on-accent p-4 font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-neon active:scale-[0.98]"
                >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Отправить запрос
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
