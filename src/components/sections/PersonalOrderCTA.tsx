"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Check,
  Compass,
  MessageCircle,
  Ruler,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';
import { useModalStore } from '@/store/useModalStore';
import gsap, { useGSAP } from '@/lib/gsap';

const copy = {
  customProduction: { ru: 'Индивидуальное производство', be: 'Індывідуальная вытворчасць', kk: 'Жеке өндіріс', en: 'Custom Production', zh: '定制生产', ce: 'Шена кхоллам', tt: 'Индивидуаль җитештерү' },
  customQuestion: { ru: 'Нужен \nИндивидуальный \nПроект?', be: 'Патрэбен \nІндывідуальны \nПраект?', kk: 'Сізге \nЖеке \nЖоба керек пе?', en: 'Need a \nCustom \nProject?', zh: '需要 \n定制 \n项目吗？', ce: 'Шуна \nШена \nПроект еза?', tt: 'Сезгә \nИндивидуаль \nПроект кирәкме?' },
  customDesc: { ru: 'Наши инженеры и дизайнеры разработают уникальное решение, которое выделит ваш бизнес и пройдет все согласования.', be: 'Нашы інжынеры і дызайнеры распрацуюць унікальнае рашэнне, якое вылучыць ваш бізнес і пройдзе ўсе ўзгадненні.', kk: 'Біздің инженерлер мен дизайнерлер бизнесіңізді ерекшелейтін және барлық келісімдерден өтетін бірегей шешім әзірлейді.', en: 'Our engineers and designers will create a bespoke concept that distinguishes your business and passes every approval stage.', zh: '我们的工程师和设计师将打造独特方案，让您的业务脱颖而出并通过全部审批。', ce: 'Тхан инженерша а дизайнерша а шун бизнес бахьа шийла йо, массо дIаяхьар дIадоьлур долу.', tt: 'Безнең инженерлар һәм дизайнерлар бизнесыгызны аерып күрсәтәчәк һәм барлык килештерүләрне үтәчәк уникаль карар әзерли.' },
  contactUs: { ru: 'Связаться с нами', be: 'Звязацца з намі', kk: 'Бізбен байланысу', en: 'Contact Us', zh: '联系我们', ce: 'Тхуна байланыс йе', tt: 'Безнең белән элемтәгә керү' },
  freeEstimate: { ru: 'Бесплатный расчет за 24 часа', be: 'Бясплатны разлік за 24 гадзіны', kk: '24 сағатта тегін есеп', en: 'Free estimate within 24 hours', zh: '24 小时内免费估算', ce: '24 сахьтехь бесплатни расчет', tt: '24 сәгатьтә бушлай исәп' },
} as const;

const featureLines = [
  { ru: 'Проверка фасада и 902-ПП до запуска в цех', en: 'Facade and 902-PP review before production' },
  { ru: 'Инженерные чертежи КМ/КМД и спецификация', en: 'Engineering drawings and specification' },
  { ru: 'Сценарии под разный бюджет и сроки', en: 'Scenarios for different budgets and timelines' },
] as const;

const chips = [
  { icon: Sparkles, value: '3', label: { ru: 'сценария', en: 'scenarios' } },
  { icon: Ruler, value: '24ч', label: { ru: 'старт', en: 'start' } },
  { icon: ShieldCheck, value: '902-ПП', label: { ru: 'проверка', en: 'review' } },
] as const;

const directions = [
  { label: { ru: 'Фасады', en: 'Facades' }, value: { ru: 'буквы / короба / неон', en: 'letters / boxes / neon' } },
  { label: { ru: 'Интерьеры', en: 'Interiors' }, value: { ru: 'навигация / витрины', en: 'wayfinding / windows' } },
  { label: { ru: 'Сети', en: 'Chains' }, value: { ru: 'rollout по точкам', en: 'multi-site rollout' } },
] as const;

export default function PersonalOrderCTA({ className = '' }: { className?: string }) {
  const { locale } = useLanguage();
  const openModal = useModalStore((state) => state.openModal);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
    });

    tl.from('.po-copy', { opacity: 0, y: 18, duration: 0.45 })
      .from('.po-chip', { opacity: 0, y: 12, stagger: 0.04, duration: 0.25 }, '-=0.2')
      .from('.po-panel', { opacity: 0, x: 16, duration: 0.45 }, '-=0.15');
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-section="personal-order-cta"
      className={`relative overflow-hidden border-y border-white/[0.08] bg-[#070807] py-10 sm:py-12 lg:py-14 ${className}`}
    >
      <div className="absolute inset-0">
        <Image src="/img/backgrounds/design-project-bg.png" alt="" fill sizes="100vw" className="object-cover opacity-[0.16]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,7,0.98),rgba(7,8,7,0.9)_52%,rgba(7,8,7,0.72))]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,160,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,160,0.028)_1px,transparent_1px)] bg-[size:18px_18px]" />
      </div>

      <div className="section-container relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-8">
          <div className="po-copy lg:col-span-7">
            <p className="verge-mono-label text-[10px] uppercase tracking-[0.22em] text-accent">
              {t(locale, copy.customProduction)}
            </p>
            <h2 className="mt-5 font-headline text-[2.2rem] font-black leading-[1] text-white sm:text-[2.8rem] lg:text-[3.4rem] whitespace-pre-line">
              {t(locale, copy.customQuestion)}
            </h2>
            <p className="mt-3 max-w-[56ch] text-[14px] leading-[1.7] text-neutral-300/82 sm:text-[15px]">
              {t(locale, copy.customDesc)}
            </p>

            <div className="mt-5 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {chips.map((chip) => {
                const Icon = chip.icon;
                return (
                  <div key={chip.value} className="po-chip shrink-0 rounded-full border border-white/10 bg-black/38 px-3 py-2 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-accent/22 bg-accent/10 text-accent">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-black text-white">{chip.value}</span>
                      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">
                        {t(locale, chip.label)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {directions.map((item) => (
                <div key={item.label.ru} className="rounded-lg border border-white/8 bg-white/[0.025] p-4">
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/38">{t(locale, item.label)}</p>
                  <p className="mt-2 text-sm font-semibold leading-snug text-neutral-100">{t(locale, item.value)}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <motion.button
                onClick={() => openModal({ context: 'Индивидуальный проект', source: 'personal_order_cta' })}
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="geist-button-primary group h-[52px] w-full gap-3 px-7 text-sm sm:w-auto"
              >
                {t(locale, copy.contactUs)}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>

              <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/28 px-4 py-2 text-xs font-medium text-white/62 sm:justify-start">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,245,160,0.7)]" />
                {t(locale, copy.freeEstimate)}
              </div>
            </div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.45 }}
            className="po-panel relative overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(8,10,9,0.9),rgba(3,4,4,0.96))] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] lg:col-span-5"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,245,160,0.65),transparent)]" />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-accent">
                    <Compass className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/34">PACK</p>
                    <p className="truncate text-sm font-semibold text-white">Конструкторский дизайн-пакет</p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[9px] font-mono uppercase tracking-[0.18em] text-white/55">
                  CAD / 3D
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {featureLines.map((item) => (
                  <div key={item.ru} className="flex items-start gap-3 rounded-lg border border-white/8 bg-black/28 px-3 py-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[13px] leading-[1.55] text-neutral-200/84">{t(locale, item)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <a
                  href="https://t.me/expoint_adv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 transition-all duration-300 hover:scale-105 hover:border-sky-500/50"
                  aria-label="Telegram"
                >
                  <Send className="h-5 w-5" />
                </a>
                <a
                  href="https://wa.me/74950000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 transition-all duration-300 hover:scale-105 hover:border-emerald-500/50"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a
                  href="tel:+74950000000"
                  className="ml-auto inline-flex h-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-4 text-sm font-semibold text-white transition-colors duration-300 hover:border-accent/35 hover:bg-accent/8"
                >
                  +7 (495) 000-00-00
                </a>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
