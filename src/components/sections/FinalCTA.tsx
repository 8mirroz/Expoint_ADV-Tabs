'use client';

import CTASection from './CTASection';
import { useModalStore } from '@/store/useModalStore';
import { useLanguage } from '@/components/i18n/LanguageProvider';

export default function FinalCTA() {
  const { openModal } = useModalStore();
  const { locale } = useLanguage();

  return (
    <CTASection
      title={locale === 'ru' ? 'Готовы обсудить проект?' : 'Ready to discuss your project?'}
      description={locale === 'ru' ? 'Оставьте заявку, и наш инженер свяжется с вами для расчета стоимости и консультации.' : 'Leave a request, and our engineer will contact you for a quote and consultation.'}
      buttonText={locale === 'ru' ? 'Получить расчет' : 'Get a quote'}
      onClick={() => openModal({ context: 'Финальный CTA на главной', source: 'homepage_bottom' })}
      variant="primary"
    />
  );
}
