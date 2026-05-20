"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  DraftingCompass, 
  FileCheck2, 
  Ruler 
} from 'lucide-react';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { t } from '@/i18n/site';
import { useModalStore } from '@/store/useModalStore';
import gsap, { useGSAP } from '@/lib/gsap';

const copy = {
  customProduction: { ru: 'Индивидуальное производство', be: 'Індывідуальная вытворчасць', kk: 'Жеке өндіріс', en: 'Custom Production', zh: '定制生产', ce: 'Шена кхоллам', tt: 'Индивидуаль җитештерү' },
  customQuestion: { ru: 'Нужен Индивидуальный Проект?', be: 'Патрэбен Індывідуальны Праект?', kk: 'Сізге Жеке Жоба керек пе?', en: 'Need a Custom Project?', zh: '需要定制项目吗？', ce: 'Шуна Шена Проект еза?', tt: 'Сезгә Индивидуаль Проект кирәкме?' },
  customDesc: { ru: 'Наши инженеры и дизайнеры разработают уникальное решение, которое выделит ваш бизнес и пройдет все согласования.', be: 'Нашы інжынеры і дызайнеры распрацуюць унікальнае рашэнне, якое вылучыць ваш бізнес і пройдзе ўсе ўзгадненні.', kk: 'Біздің инженерлер мен дизайнерлер бизнесіңізді ерекшелейтін және барлық келісімдерден өтетін бірегей шешім әзірлейді.', en: 'Our engineers and designers will create a bespoke concept that distinguishes your business and passes every approval stage.', zh: '我们的工程师和设计师将打造独特方案，让您的业务脱颖而出并通过全部审批。', ce: 'Тхан инженерша а дизайнерша а шун бизнес бахьа шийла йо, массо дIаяхьар дIадоьлур долу.', tt: 'Безнең инженерлар һәм дизайнерлар бизнесыгызны аерып күрсәтәчәк һәм барлык килештерүләрне үтәчәк уникаль карар әзерли.' },
  contactUs: { ru: 'Связаться с нами', be: 'Звязацца з намі', kk: 'Бізбен байланысу', en: 'Contact Us', zh: '联系我们', ce: 'Тхуна байланыс йе', tt: 'Безнең белән элемтәгә керү' },
  freeEstimate: { ru: 'Расчет за 24 часа', be: 'Разлік за 24 гадзіны', kk: '24 сағатта есеп', en: 'Estimate in 24h', zh: '24 小时内估算', ce: '24 сахьтехь расчет', tt: '24 сәгатьтә исәп' },
} as const;

const statCards = [
  {
    icon: DraftingCompass,
    value: '3D',
    suffix: '',
    label: { ru: 'Фотореализм', en: 'Photorealism', be: 'Фотарэалізм', kk: 'Фотореализм', zh: '写实效果', ce: 'Фотореализм', tt: 'Фотореализм' },
  },
  {
    icon: Ruler,
    value: '24',
    suffix: 'ч',
    label: { ru: 'Эскизы', en: 'First concepts', be: 'Эскізы', kk: 'Эскиздер', zh: '首版草图', ce: 'Эскизаш', tt: 'Эскизлар' },
  },
  {
    icon: FileCheck2,
    value: '902',
    suffix: '-ПП',
    label: { ru: 'Контроль', en: 'Compliance', be: 'Кантроль', kk: 'Тексеріс', zh: '城市合规', ce: 'Контроль', tt: 'Контроль' },
  },
] as const;


export default function PersonalOrderCTA({ className = '' }: { className?: string }) {
  const { locale } = useLanguage();
  const openModal = useModalStore((state) => state.openModal);
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: rootRef.current,
        start: 'top 85%',
        once: true,
      },
    });

    tl.from('.cta-bento-item', { opacity: 0, y: 20, stagger: 0.1, duration: 0.7 })
      .from('.cta-content-item', { opacity: 0, y: 10, stagger: 0.05, duration: 0.5 }, '-=0.4');

    gsap.to('.cta-ambient', {
      opacity: 0.8,
      scale: 1.05,
      duration: 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, { scope: rootRef });

  return (
    <div ref={rootRef} className={`px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
      <div className="relative max-w-[1440px] mx-auto rounded-[32px] bg-[#050505] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.6)] border border-white/5">
        
        {/* Subtle global background ambient */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[32px] pointer-events-none">
           <div className="cta-ambient absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,163,0.06),transparent_60%)] blur-[60px]" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-2">
          
          {/* Top Left: Main Intro */}
          <motion.div className="cta-bento-item lg:col-span-7 flex flex-col justify-between rounded-[24px] border border-white/[0.06] bg-white/[0.015] p-8 lg:p-10 relative overflow-hidden group">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.03),transparent_50%)]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 space-y-6">
              <div className="cta-content-item flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,255,163,0.6)]" />
                <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-accent font-medium uppercase">
                  {t(locale, copy.customProduction)}
                </span>
              </div>
              
              <h3 className="cta-content-item font-headline font-semibold text-[2rem] md:text-[2.75rem] leading-[1.05] tracking-[-0.03em] text-white">
                {t(locale, copy.customQuestion).replace(/\n/g, ' ')}
              </h3>
              
              <p className="cta-content-item text-white/60 text-sm md:text-base leading-[1.6] max-w-lg tracking-[-0.01em]">
                {t(locale, copy.customDesc)}
              </p>
            </div>

            <div className="cta-content-item mt-10 flex flex-wrap items-center gap-4 relative z-10">
              <button 
                onClick={() => openModal({ context: 'Индивидуальный проект', source: 'services_cta' })}
                className="group relative inline-flex h-12 items-center justify-center gap-3 overflow-hidden rounded-xl bg-accent px-6 text-sm font-semibold text-black transition-transform hover:scale-[1.02] active:scale-95"
              >
                <span className="relative z-10">{t(locale, copy.contactUs)}</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
              </button>
              
              <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-5 h-12 backdrop-blur-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-accent/80 animate-pulse" />
                <span className="text-white/70 text-sm font-medium tracking-[0.01em]">
                  {t(locale, copy.freeEstimate)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Top Right: Blueprint & Stats */}
          <motion.div className="cta-bento-item lg:col-span-5 rounded-[24px] border border-white/[0.06] bg-[#0a0a0c] relative overflow-hidden flex flex-col group p-2">
            <div className="relative w-full h-[180px] md:h-[220px] rounded-[18px] overflow-hidden bg-black/50 border border-white/5">
              <Image 
                src="/img/adv/blueprint-graphics.png" 
                alt="Blueprint Design" 
                fill
                className="object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent" />
              <p className="absolute bottom-3 right-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                DWG v1.0
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-2">
              {statCards.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label.ru} className="cta-content-item flex flex-col items-center justify-center rounded-[18px] bg-white/[0.02] border border-white/5 p-4 text-center transition-colors hover:bg-white/[0.04]">
                    <Icon className="h-4 w-4 text-accent/80 mb-2" />
                    <div className="flex items-baseline text-xl font-bold text-white tracking-tight">
                      {item.value}<span className="text-sm text-white/50">{item.suffix}</span>
                    </div>
                    <div className="mt-1 text-[9px] font-mono uppercase tracking-[0.1em] text-white/40">
                      {t(locale, item.label)}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>


        </div>
      </div>
    </div>
  );
}
