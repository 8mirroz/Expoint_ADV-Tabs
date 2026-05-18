"use client";

import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, Compass, DraftingCompass, FileCheck2, MessageCircle, Ruler, Send } from 'lucide-react';
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

const statCards = [
  {
    icon: DraftingCompass,
    value: '3D',
    suffix: '',
    label: { ru: 'Фотореалистичный макет', en: 'Photorealistic layout', be: 'Фотарэалістычны макет', kk: 'Фотореалистік макет', zh: '写实效果图', ce: 'Фотореалистични макет', tt: 'Фотореалистик макет' },
    desc: { ru: 'Показываем дневной и ночной сценарий до запуска в производство.', en: 'We preview day and night scenarios before fabrication.', be: 'Паказваем дзённы і начны сцэнар да запуску ў вытворчасць.', kk: 'Өндіріс басталғанға дейін күндізгі және түнгі сценарийді көрсетеміз.', zh: '生产前展示白天与夜间效果。', ce: 'Производство дIадолалехь денна а буьйсан а сценарий гойту.', tt: 'Җитештерүгә кадәр көндезге һәм төнге сценарийны күрсәтәбез.' },
  },
  {
    icon: Ruler,
    value: '24',
    suffix: 'ч',
    label: { ru: 'Первые эскизы', en: 'First concepts', be: 'Першыя эскізы', kk: 'Алғашқы эскиздер', zh: '首版草图', ce: 'Хьалхара эскизаш', tt: 'Беренче эскизлар' },
    desc: { ru: 'Делаем стартовый пакет после замера и брифа без затяжки по срокам.', en: 'Initial package after measurement and brief, without schedule drag.', be: 'Робім стартавы пакет пасля замеру і брыфа без зацягвання тэрмінаў.', kk: 'Өлшем мен брифтен кейін бастапқы пакетті кешіктірмей дайындаймыз.', zh: '测量和简报后快速给出首版方案。', ce: 'Замер а, бриф а йойлачу стартан пакет сихха йо.', tt: 'Үлчәү һәм брифтан соң старт пакеты тиз әзерләнә.' },
  },
  {
    icon: FileCheck2,
    value: '902',
    suffix: '-ПП',
    label: { ru: 'Городской контроль', en: 'Urban compliance', be: 'Гарадскі кантроль', kk: 'Қалалық тексеріс', zh: '城市合规', ce: 'Городан контроль', tt: 'Шәһәр контроле' },
    desc: { ru: 'Проверяем размер, вылет и риски демонтажа ещё на стадии дизайна.', en: 'We validate size, projection, and removal risks at the design stage.', be: 'Правяраем памер, вылет і рызыкі дэмантажу яшчэ на стадыі дызайну.', kk: 'Өлшемді, шығынды және демонтаж тәуекелдерін дизайн сатысында тексереміз.', zh: '在设计阶段就检查尺寸、出挑和拆除风险。', ce: 'Дизайна стадехь размер, вылет а, демонтажан риск а хьажо.', tt: 'Дизайн этабында ук үлчәмне, очышны һәм сүтү куркынычын тикшерәбез.' },
  },
] as const;

const featureLines = [
  { ru: 'Лазерные обмеры и точная фотопривязка', en: 'Laser measurements and exact photo placement', be: 'Лазерныя абмеры і дакладная фотапрывязка', kk: 'Лазерлік өлшеу және дәл фотоорналастыру', zh: '激光测量与精准贴图', ce: 'Лазерни замерш а, нийса фотопривязка а', tt: 'Лазер үлчәү һәм төгәл фотобәйләү' },
  { ru: 'Инженерный пакет КМ/КМД для производства', en: 'Engineering package for fabrication', be: 'Інжынерны пакет КМ/КМД для вытворчасці', kk: 'Өндіріс үшін КМ/КМД инженерлік пакеті', zh: '生产用工程图纸包', ce: 'Производствона инженерни пакет', tt: 'Җитештерү өчен инженер пакеты' },
  { ru: 'Свет, материалы и посадка под конкретный фасад', en: 'Light, materials, and fit tuned to the facade', be: 'Святло, матэрыялы і пасадка пад канкрэтны фасад', kk: 'Жарық, материал және нақты қасбетке бейімдеу', zh: '针对具体门面的灯光、材料与落位', ce: 'Конкретни фасаданна свет, материал а, посадка а', tt: 'Аерым фасад өчен яктылык, материаллар һәм урнашу' },
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
        start: 'top 82%',
        once: true,
      },
    });

    tl.from('.cta-kicker', { opacity: 0, y: 14, duration: 0.45 })
      .from('.cta-title-line', { opacity: 0, y: 36, stagger: 0.08, duration: 0.7 }, '-=0.2')
      .from('.cta-desc', { opacity: 0, y: 18, duration: 0.55 }, '-=0.3')
      .from('.cta-stat', { opacity: 0, y: 18, stagger: 0.06, duration: 0.45 }, '-=0.25')
      .from('.cta-panel', { opacity: 0, x: 28, duration: 0.65 }, '-=0.35')
      .from('.cta-actions', { opacity: 0, y: 14, duration: 0.5 }, '-=0.2');

    gsap.to('.cta-ambient', {
      opacity: 0.95,
      scale: 1.08,
      duration: 2.2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, { scope: rootRef });

  return (
    <div ref={rootRef}>
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden group rounded-3xl border border-white/10 bg-black shadow-[0_24px_70px_rgba(0,0,0,0.45)] transition-all duration-700 ${className}`}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/img/backgrounds/user-cta-bg.png" 
          alt="Industrial Background"
          className="w-full h-full object-cover opacity-78 group-hover:scale-[1.04] transition-transform duration-[3s] ease-out"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/92 via-black/58 to-black/26" />
        <div className="absolute inset-0 bg-linear-to-t from-black/72 via-black/30 to-black/18" />
        <div className="cta-ambient absolute inset-0 bg-[radial-gradient(circle_at_18%_42%,rgba(0,240,170,0.16),transparent_52%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,180,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,180,0.028)_1px,transparent_1px)] bg-[size:18px_18px] opacity-50" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 grid gap-8 p-8 md:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:p-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex min-h-full flex-col justify-between space-y-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="cta-kicker verge-mono-label text-primary tracking-[0.22em] font-medium">
                {t(locale, copy.customProduction).toUpperCase()}
              </span>
            </div>
            
            <h3
              className="mb-5 font-headline font-semibold text-[2.3rem] md:text-[3.2rem] lg:text-[4rem] leading-[0.88] tracking-[-0.03em] text-white"
            >
              {t(locale, copy.customQuestion).split('\n').map((line, i) => (
                <span key={i} className="cta-title-line block first-letter:text-accent/95">{line}</span>
              ))}
            </h3>
            
            <p className="cta-desc text-white/92 text-lg md:text-xl leading-[1.5] max-w-2xl font-normal tracking-[-0.01em]">
              {t(locale, copy.customDesc)}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {statCards.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label.ru}
                  className="cta-stat group relative overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,15,18,0.9),rgba(9,9,11,0.94))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:border-accent/30 hover:bg-[linear-gradient(180deg,rgba(15,18,18,0.94),rgba(8,10,10,0.96))]"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(0,245,160,0.08),transparent_56%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative z-10 mb-4 flex h-11 w-11 items-center justify-center rounded-[14px] border border-white/12 bg-white/[0.03] text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="relative z-10 flex items-baseline gap-0.5 text-[2.35rem] font-black leading-none tracking-[-0.05em] text-white">
                    <span>{item.value}</span>
                    {item.suffix ? <span className="text-[1rem] font-medium text-accent/88">{item.suffix}</span> : null}
                  </div>
                  <p className="relative z-10 mt-3 text-[10px] font-mono uppercase tracking-[0.18em] text-accent/88">
                    {t(locale, item.label)}
                  </p>
                  <p className="relative z-10 mt-2 text-[13px] leading-[1.55] text-white/68">
                    {t(locale, item.desc)}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="cta-actions flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-4 w-full max-w-3xl sm:justify-between">
            <motion.button 
              onClick={() => openModal({ context: 'Индивидуальный проект', source: 'services_cta' })}
              whileHover={{ scale: 1.01, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              className="geist-button-primary group w-full sm:w-auto sm:ml-auto h-[58px] px-10 text-base md:text-lg gap-3"
            >
              {t(locale, copy.contactUs)}
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
            
            <div className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2 py-3 px-5 rounded-xl bg-black/38 border border-white/14 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(0,245,160,0.65)]" />
              <p className="text-white/78 text-sm md:text-[0.95rem] font-medium tracking-[0.01em]">
                {t(locale, copy.freeEstimate)}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="cta-panel relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,8,10,0.82),rgba(5,5,7,0.92))] p-7 shadow-[0_22px_54px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.05)]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(0,245,160,0.08),transparent_40%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,255,180,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,180,0.018)_1px,transparent_1px)] bg-[size:16px_16px] opacity-45" />
          <div className="relative z-10 flex h-full flex-col justify-between gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-accent">
                  Individual Design Pack
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,245,160,0.7)]" />
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/30">
                  Premium Design Workflow
                </p>
                <h4 className="max-w-[12ch] text-[2rem] font-black leading-[0.94] tracking-[-0.04em] text-white sm:text-[2.45rem]">
                  Конструкторский
                  <br />
                  дизайн-пакет
                </h4>
                <p className="max-w-[34ch] text-[14px] leading-[1.6] text-white/68">
                  Полный комплект проектной документации, визуализации и фасадной логики до запуска в производство.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/34">Срок старта</p>
                  <p className="mt-2 text-[1.7rem] font-black leading-none tracking-[-0.04em] text-white">24ч</p>
                </div>
                <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/34">Формат</p>
                  <div className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    <Compass className="h-4 w-4" />
                    CAD + 3D
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {featureLines.map((item) => (
                  <div key={item.ru} className="flex items-start gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] px-3 py-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-[13px] font-medium leading-[1.55] text-white/82">
                      {t(locale, item)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5 border-t border-white/10 pt-5">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-accent/88">Связь напрямую</p>
                <a
                  href="tel:+74950000000"
                  className="mt-2 block text-[2.5rem] font-black leading-[0.92] tracking-[-0.05em] text-white transition-colors duration-300 hover:text-accent"
                >
                  +7 (495)
                  <br />
                  000-00-00
                </a>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://t.me/expoint_adv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 transition-all duration-300 hover:scale-105 hover:bg-sky-500/20"
                >
                  <Send className="h-4.5 w-4.5" />
                </a>
                <a
                  href="https://wa.me/74950000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 transition-all duration-300 hover:scale-105 hover:bg-emerald-500/20"
                >
                  <MessageCircle className="h-4.5 w-4.5" />
                </a>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[12px] font-medium text-white/62">
                  {t(locale, copy.freeEstimate)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
    </div>
  );
}
