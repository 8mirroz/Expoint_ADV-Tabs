"use client";

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';
import { useModalStore } from '@/store/useModalStore';

const copy = {
  customProduction: { ru: 'Индивидуальное производство', be: 'Індывідуальная вытворчасць', kk: 'Жеке өндіріс', en: 'Custom Production', zh: '定制生产', ce: 'Шена кхоллам', tt: 'Индивидуаль җитештерү' },
  customQuestion: { ru: 'Нужен \nИндивидуальный \nПроект?', be: 'Патрэбен \nІндывідуальны \nПраект?', kk: 'Сізге \nЖеке \nЖоба керек пе?', en: 'Need a \nCustom \nProject?', zh: '需要 \n定制 \n项目吗？', ce: 'Шуна \nШена \nПроект еза?', tt: 'Сезгә \nИндивидуаль \nПроект кирәкме?' },
  customDesc: { ru: 'Наши инженеры и дизайнеры разработают уникальное решение, которое выделит ваш бизнес и пройдет все согласования.', be: 'Нашы інжынеры і дызайнеры распрацуюць унікальнае рашэнне, якое вылучыць ваш бізнес і пройдзе ўсе ўзгадненні.', kk: 'Біздің инженерлер мен дизайнерлер бизнесіңізді ерекшелейтін және барлық келісімдерден өтетін бірегей шешім әзірлейді.', en: 'Our engineers and designers will create a bespoke concept that distinguishes your business and passes every approval stage.', zh: '我们的工程师和设计师将打造独特方案，让您的业务脱颖而出并通过全部审批。', ce: 'Тхан инженерша а дизайнерша а шун бизнес бахьа шийла йо, массо дIаяхьар дIадоьлур долу.', tt: 'Безнең инженерлар һәм дизайнерлар бизнесыгызны аерып күрсәтәчәк һәм барлык килештерүләрне үтәчәк уникаль карар әзерли.' },
  contactUs: { ru: 'Связаться с нами', be: 'Звязацца з намі', kk: 'Бізбен байланысу', en: 'Contact Us', zh: '联系我们', ce: 'Тхуна байланыс йе', tt: 'Безнең белән элемтәгә керү' },
  freeEstimate: { ru: 'Бесплатный расчет за 24 часа', be: 'Бясплатны разлік за 24 гадзіны', kk: '24 сағатта тегін есеп', en: 'Free estimate within 24 hours', zh: '24 小时内免费估算', ce: '24 сахьтехь бесплатни расчет', tt: '24 сәгатьтә бушлай исәп' },
} as const;

export default function PersonalOrderCTA({ className = '' }: { className?: string }) {
  const { locale } = useLanguage();
  const openModal = useModalStore((state) => state.openModal);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden group rounded-3xl border border-outline/50 bg-black shadow-2xl transition-all duration-700 ${className}`}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/img/backgrounds/user-cta-bg.png" 
          alt="Industrial Background"
          className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[3s] ease-out"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-8 md:p-10 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-20 items-center lg:items-center">
        {/* Left: Copy + CTA */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex-1 space-y-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="verge-mono-label text-primary tracking-[0.2em] font-medium">
                {t(locale, copy.customProduction).toUpperCase()}
              </span>
            </div>
            
            <h3 className="geist-display-lg md:text-[64px] lg:text-[84px] text-white mb-4 leading-[0.95] tracking-tight">
              {t(locale, copy.customQuestion).split('\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h3>
            
            <p className="text-white/90 text-xl leading-relaxed max-w-xl font-normal">
              {t(locale, copy.customDesc)}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full max-w-xl">
            <motion.button 
              onClick={() => openModal({ context: 'Индивидуальный проект', source: 'services_cta' })}
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              className="geist-button-primary w-full sm:w-auto px-12 h-[60px] text-lg gap-3 rounded-2xl shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)] transition-all"
            >
              {t(locale, copy.contactUs)}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <div className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <p className="text-white/60 text-sm font-medium tracking-wide">
                {t(locale, copy.freeEstimate)}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
