"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ArrowRight,
  Send,
  Check,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { t } from "@/i18n/site";
import { useCartStore } from "@/store/useCartStore";
import gsap, { useGSAP } from "@/lib/gsap";

const copy = {
  eyebrow: { ru: "// DESIGN PROJECT", be: "// DESIGN PROJECT", kk: "// DESIGN PROJECT", en: "// DESIGN PROJECT", ko: "// DESIGN PROJECT", zh: "// DESIGN PROJECT", hi: "// DESIGN PROJECT", ce: "// DESIGN PROJECT", tt: "// DESIGN PROJECT" },
  title: { ru: "Закажите дизайн-проект вывески.", be: "Замоўце дызайн-праект шыльды.", kk: "Маңдайшаға арналған дизайн-жобаны тапсырыңыз.", en: "Order a sign design project.", ko: "사인 디자인 프로젝트를 주문하세요.", zh: "订购招牌设计方案。", hi: "साइन डिज़ाइन प्रोजेक्ट ऑर्डर करें।", ce: "ТIаьххьара дизайн-проект дехка.", tt: "Ишегегез өчен дизайн-проектка заказ бирегез." },
  desc: {
    ru: "Соберем несколько рабочих сценариев, проверим фасад и 902-ПП, подготовим конструкторские файлы для производства.",
    be: "Збяром некалькі працоўных сцэнарыяў, праверым фасад і 902-ПП, падрыхтуем канструктарскія файлы для вытворчасці.",
    kk: "Бірнеше жұмыс сценарийін жинаймыз, қасбет пен 902-ПП-ны тексереміз, өндіріс үшін конструкторлық файлдарды дайындаймыз.",
    en: "We provide several workable scenarios, validate facade and 902-PP, and prepare engineering files for production.",
    ko: "실행 가능한 여러 시나리오를 제안하고, 파사드와 902-PP를 검토한 뒤 제작용 엔지니어링 파일을 준비합니다.",
    zh: "我们会整理多个可行方案，审核门头和902-ПП，并准备生产用工程文件。",
    hi: "हम कई व्यावहारिक विकल्प तैयार करते हैं, फैसाड और 902-ПП की जाँच करते हैं, और उत्पादन के लिए इंजीनियरिंग फ़ाइलें तैयार करते हैं।",
    ce: "Тхуна цхьацца болх сцена бан, фасад а 902-ПП а тешна, кхолламехь инженерни файлш хьая.",
    tt: "Берничә эш сценарие җыябыз, фасадны һәм 902-ППны тикшерәбез, җитештерү өчен инженер файлларын әзерлибез.",
  },
  ctaPrimary: { ru: "Добавить в заказ", be: "Дадаць у заказ", kk: "Тапсырысқа қосу", en: "Add to order", ko: "주문에 추가", zh: "加入订单", hi: "ऑर्डर में जोड़ें", ce: "Заказе юкъада", tt: "Заказга өстәү" },
  ctaSecondary: { ru: "Обсудить с дизайнером", be: "Абмеркаваць з дызайнерам", kk: "Дизайнермен талқылау", en: "Discuss with designer", ko: "디자이너와 상의", zh: "与设计师沟通", hi: "डिज़ाइनर से चर्चा करें", ce: "Дизайнерца хьоьцухь", tt: "Дизайнер белән сөйләшү" },
  note: { ru: "первый разбор за 24 часа", be: "першы разбор за 24 гадзіны", kk: "алғашқы талдау 24 сағатта", en: "first review within 24 hours", ko: "24시간 내 1차 검토", zh: "24小时内首次审核", hi: "24 घंटे में पहला रिव्यू", ce: "перви разбор 24 сахьтан юкъара", tt: "24 сәгать эчендә беренче карау" },
  packName: { ru: "Дизайн проект", be: "Дызайн-праект", kk: "Дизайн жоба", en: "Design project", ko: "디자인 프로젝트", zh: "设计方案", hi: "डिज़ाइन प्रोजेक्ट", ce: "Дизайн-проект", tt: "Дизайн проекты" },
  packDescription: { ru: "Полный проект вывески под ключ", be: "Поўны праект шыльды пад ключ", kk: "Маңдайшаның толық дайын жобасы", en: "Full sign project", ko: "간판 전체 프로젝트", zh: "完整招牌项目", hi: "पूर्ण साइन प्रोजेक्ट", ce: "Шуьйд цхьа проект, кхача кхачалц", tt: "Тулы вывеска проекты" },
  workflowTitle: { ru: "Конструкторский дизайн-пакет", be: "Канструктарскі дызайн-пакет", kk: "Конструкторлық дизайн-пакет", en: "Engineering design package", ko: "엔지니어링 디자인 패키지", zh: "工程设计包", hi: "इंजीनियरिंग डिज़ाइन पैकेज", ce: "Конструкторски дизайн-пакет", tt: "Конструкторлык дизайн-пакет" },
  workflowBadge: { ru: "Премиум-процесс", be: "Прэміум-працэс", kk: "Премиум үдеріс", en: "Premium workflow", ko: "프리미엄 워크플로", zh: "高级工作流", hi: "प्रीमियम वर्कफ़्लो", ce: "Премиум процесс", tt: "Премиум эш барышы" },
} as const;

const featureLines = [
  { ru: "Лазерные обмеры и фотопривязка", be: "Лазерныя замеры і фотапрывязка", kk: "Лазерлік өлшеу және фотобайланыстыру", en: "Laser measurements and photo placement", ko: "레이저 실측과 포토 매핑", zh: "激光测量和照片绑定", hi: "लेज़र माप और फोटो प्लेसमेंट", ce: "Лазерни замерш а фотопривязка", tt: "Лазер үлчәүләр һәм фотобәйләү" },
  { ru: "Инженерный пакет КМ/КМД", be: "Інжынерны пакет КМ/КМД", kk: "КМ/КМД инженерлік пакеті", en: "Engineering package for fabrication", ko: "제작용 엔지니어링 패키지", zh: "工程图包（KM/KMD）", hi: "KM/KMD इंजीनियरिंग पैकेज", ce: "КМ/КМД инженерни пакет", tt: "КМ/КМД инженерлык пакеты" },
  { ru: "Свет и посадка под фасад", be: "Святло і пасадка пад фасад", kk: "Жарық пен фасадқа бейімдеу", en: "Light and fit tuned to the facade", ko: "파사드에 맞춘 조명과 배치", zh: "针对门头优化灯光和贴合度", hi: "फैसाड के अनुरूप लाइट और फिट", ce: "Сий а фасадан юкъе посадка", tt: "Яктылык һәм фасадка туры китерү" },
] as const;

export default function DesignProjectCTA({ className = "" }: { className?: string }) {
  const { locale } = useLanguage();
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true },
    });

    tl.from(".dp-copy", { opacity: 0, y: 18, duration: 0.45 })
      .from(".dp-card", { opacity: 0, y: 16, stagger: 0.08, duration: 0.4 }, "-=0.2");
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-section="design-project-cta"
      className={`relative overflow-hidden border-y border-white/[0.08] bg-[#070807] py-14 sm:py-16 lg:py-20 ${className}`}
    >
      <div className="absolute inset-0">
        <Image src="/img/backgrounds/design-project-bg.png" alt="" fill sizes="100vw" className="object-cover opacity-[0.15]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,7,0.98),rgba(7,8,7,0.9)_52%,rgba(7,8,7,0.72))]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,160,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,160,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="section-container relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12 xl:px-16">
        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="pointer-events-none absolute inset-y-[-34px] -right-[8%] hidden w-[74%] overflow-hidden lg:block">
            <Image
              src="/img/adv/design-project-right-bg.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 74vw, 0vw"
              className="object-cover object-[72%_center] opacity-95"
            />
          </div>

          {/* Left Text Content */}
          <div className="dp-copy relative z-10 max-w-xl">
            <p className="verge-mono-label text-[10px] uppercase tracking-[0.22em] text-accent">
              {t(locale, copy.eyebrow)}
            </p>

            <h2 className="mt-5 font-headline text-[2.2rem] font-black leading-[1.05] text-white sm:text-[2.8rem] lg:text-[3.2rem]">
              {t(locale, copy.title)}
            </h2>
            <p className="mt-4 text-[15px] leading-[1.7] text-neutral-300/80 sm:text-[16px]">
              {t(locale, copy.desc)}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <motion.button
                onClick={() => {
                addItem({
                  id: "design-project",
                  type: "pack",
                    name: t(locale, copy.packName),
                    price: 0,
                    description: t(locale, copy.packDescription),
                  });
                  router.push("/calculator?cartItem=design-project");
                }}
                whileHover={{ scale: 1.015, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 420, damping: 20 }}
                className="group relative inline-flex h-[54px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#00f5a0] px-7 text-[13px] font-black uppercase tracking-[0.08em] text-black shadow-[0_10px_28px_rgba(0,245,160,0.28)] transition-all duration-300 hover:shadow-[0_14px_36px_rgba(0,245,160,0.4)] sm:w-auto"
              >
                <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[linear-gradient(120deg,rgba(255,255,255,0.22),rgba(255,255,255,0.02)_42%)]" />
                {t(locale, copy.ctaPrimary)}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                onClick={() => {
                  window.open("https://t.me/adv_tabs", "_blank");
                }}
                whileHover={{ scale: 1.015, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 420, damping: 20 }}
                className="group inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-full border border-[#0088CC]/35 bg-[#0088CC]/14 px-6 text-[13px] font-semibold text-[#cfeeff] shadow-[0_0_0_1px_rgba(0,136,204,0.1)_inset] transition-all duration-300 hover:border-[#00a2ff]/65 hover:bg-[#0088CC]/24 hover:text-white hover:shadow-[0_10px_30px_rgba(0,136,204,0.28)] sm:w-auto"
              >
                <Send className="h-4 w-4 text-[#5ec5ff] transition-colors duration-300 group-hover:text-[#9fe0ff]" />
                {t(locale, copy.ctaSecondary)}
              </motion.button>
            </div>

            <div className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/28 px-4 py-2 text-xs font-medium text-white/60 sm:mt-0 sm:justify-start">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,245,160,0.7)]" />
              {t(locale, copy.note)}
            </div>
          </div>

          <div className="hidden lg:block lg:w-[58%]" />
        </div>

        {/* Bottom: Design Pack & Pricing */}
        <div className="dp-card mt-12 lg:mt-16 rounded-[24px] border border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent p-6 md:p-8 flex flex-col lg:flex-row gap-8 lg:gap-16">

          {/* Left side of bottom panel */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">{t(locale, copy.workflowBadge)}</p>
              <h4 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                {t(locale, copy.workflowTitle)}
              </h4>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {featureLines.map((item) => (
                <div key={item.ru} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/10 border border-accent/20">
                    <Check className="h-2.5 w-2.5 text-accent" />
                  </div>
                  <span className="text-xs text-white/70 leading-snug">
                    {t(locale, item)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Pricing Matrix */}
          <div className="flex-[1.2] lg:border-l lg:border-white/10 lg:pl-10 flex flex-col justify-center">
            <div className="space-y-4 font-mono">
              <div className="group/row">
                <div className="flex items-end justify-between text-xs font-semibold mb-1">
                  <span className="text-white/80 transition-colors group-hover/row:text-white">
                    {t(locale, { ru: "1. Проект + Производство", be: "1. Праект + вытворчасць", kk: "1. Жоба + өндіріс", en: "1. Project + Fabrication", ko: "1. 프로젝트 + 제작", zh: "1. 方案 + 制作", hi: "1. प्रोजेक्ट + निर्माण", ce: "1. Проект + кхоллам", tt: "1. Проект + җитештерү" })}
                  </span>
                  <span className="flex-grow border-b border-dotted border-white/15 mx-3 relative -top-1 transition-colors group-hover/row:border-white/30" />
                  <span className="text-accent font-bold">0 ₽</span>
                </div>
                <p className="text-[10px] text-white/40 leading-snug">
                  {t(locale, { ru: "Компенсация стоимости проектирования при заказе вывески", be: "Кошт праектавання кампенсуецца пры замове шыльды", kk: "Маңдайшаға тапсырыс бергенде жобалау құны қайтарылады", en: "Design cost is 100% refunded when you order signage", ko: "사인을 주문하면 설계 비용을 100% 환급합니다", zh: "订购招牌时可返还设计费用", hi: "साइन ऑर्डर करने पर डिज़ाइन लागत 100% वापस की जाती है", ce: "Шуьйдан заказ дехь проектан хьажар хьалгIат", tt: "Вывеска заказ иткәндә проект бәясе кире кайтарыла" })}
                </p>
              </div>

              <div className="group/row">
                <div className="flex items-end justify-between text-xs font-semibold mb-1">
                  <span className="text-white/80 transition-colors group-hover/row:text-white">
                    {t(locale, { ru: "2. Чертежи КМ/КМД", be: "2. Чарцяжы КМ/КМД", kk: "2. КМ/КМД сызбалары", en: "2. Engineering DWG bundle", ko: "2. KM/KMD 도면 세트", zh: "2. KM/KMD 工程图集", hi: "2. KM/KMD ड्रॉइंग्स", ce: "2. КМ/КМД чертежаш", tt: "2. КМ/КМД сызмалары" })}
                  </span>
                  <span className="flex-grow border-b border-dotted border-white/15 mx-3 relative -top-1 transition-colors group-hover/row:border-white/30" />
                  <span className="text-white font-bold">9 900 ₽</span>
                </div>
                <p className="text-[10px] text-white/40 leading-snug">
                  {t(locale, { ru: "Ветровые нагрузки, крепления и файлы для ЧПУ", be: "Ветравая нагрузка, мацаванні і файлы для ЧПУ", kk: "Жел жүктемесі, бекітулер және ЧПУ файлдары", en: "CNC cutting paths, structural stress analysis", ko: "풍하중, 고정 방식, CNC 파일", zh: "风载荷、固定件和CNC文件", hi: "विंड लोड, फिक्सिंग और CNC फ़ाइलें", ce: "ХIоршан нагрузкаш, креплени а ЧПУ файлш", tt: "Җил йөкләнеше, беркетмәләр һәм CNC файллары" })}
                </p>
              </div>

              <div className="group/row">
                <div className="flex items-end justify-between text-xs font-semibold mb-1">
                  <span className="text-white/80 transition-colors group-hover/row:text-white">
                    {t(locale, { ru: "3. Согласование 902-ПП", be: "3. Узгадненне 902-ПП", kk: "3. 902-ПП келісімі", en: "3. 902-PP Permit Approval", ko: "3. 902-PP 승인", zh: "3. 902-ПП 审批", hi: "3. 902-PP स्वीकृति", ce: "3. 902-ПП узгадар", tt: "3. 902-ПП килештерү" })}
                  </span>
                  <span className="flex-grow border-b border-dotted border-white/15 mx-3 relative -top-1 transition-colors group-hover/row:border-white/30" />
                  <span className="text-white font-bold">{t(locale, { ru: "от 15 000 ₽", be: "ад 15 000 ₽", kk: "15 000 ₽-ден бастап", en: "from 15 000 ₽", ko: "15,000 ₽부터", zh: "15,000 ₽ 起", hi: "15,000 ₽ से", ce: "15 000 ₽ хьалха", tt: "15 000 ₽ дән башлап" })}</span>
                </div>
                <p className="text-[10px] text-white/40 leading-snug">
                  {t(locale, { ru: "Официальное оформление под ключ", be: "Афіцыйнае афармленне пад ключ", kk: "Ресми рәсімдеу толықтай", en: "Full state paperwork preparation & filing", ko: "공식 서류 처리 일괄 지원", zh: "官方手续一站式办理", hi: "आधिकारिक दस्तावेज़ीकरण की पूरी तैयारी", ce: "Къизгалхош а, кхаччалца оформление", tt: "Рәсми рәсмиләштерү тулысынча" })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
