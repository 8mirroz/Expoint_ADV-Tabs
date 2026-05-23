"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronRight, Shield, Sparkles } from "lucide-react";
import { useModalStore } from "@/store/useModalStore";
import { TurnstileWidget } from "@/components/ui/TurnstileWidget";
import { SegmentData } from "@/data/segments";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { t } from "@/i18n/site";
import { createExpointSalesEngine, type SalesQuizInput } from "@/lib/salesEngine";



// ─── Hero stat chips ──────────────────────────────────────────────────────
const stats = [
  { value: "500+", label: { ru: "Проектов", be: "Праектаў", kk: "Жобалар", en: "Projects", ko: "프로젝트", zh: "项目", hi: "प्रोजेक्ट", ce: "Проектанаш", tt: "Проектлар" } },
  { value: "12", label: { ru: "Лет опыта", be: "Гадоў досведу", kk: "Тәжірибе жылдары", en: "Years of experience", ko: "년 경력", zh: "年经验", hi: "साल का अनुभव", ce: "Шарш дош", tt: "Тәҗрибә еллары" } },
];

// ─── Hero section tags ────────────────────────────────────────────────────
const tags = [
  { id: "volumetric-letters", label: { ru: "Объёмные буквы", be: "Аб’ёмныя літары", kk: "Көлемді әріптер", en: "Channel letters", ko: "입체 문자", zh: "立体字", hi: "वॉल्यूमेट्रिक अक्षर", ce: "Комуьгли бухкъ", tt: "Өлкле хәрефләр" } },
  { id: "lightboxes", label: { ru: "Световые короба", be: "Святлавыя каробкі", kk: "Жарық қораптар", en: "Light boxes", ko: "라이트박스", zh: "灯箱", hi: "लाइट बॉक्स", ce: "Сийла каробкаш", tt: "Якты короблар" } },
  { id: "flex-neon", label: { ru: "Гибкий неон", be: "Гнуткі неон", kk: "Икемді неон", en: "Flexible neon", ko: "플렉스 네온", zh: "柔性霓虹", hi: "फ्लेक्स नियॉन", ce: "Говрта неон", tt: "Эластик неон" } },
  { id: "roof-installations", label: { ru: "Крышные установки", be: "Дахавыя канструкцыі", kk: "Шатырлық орнатулар", en: "Roof installations", ko: "옥상 설치물", zh: "屋顶装置", hi: "रूफ इंस्टॉलेशन्स", ce: "КIовлан установкаш", tt: "Түбә урнаштырулар" } },
  { id: "installation", label: { ru: "Монтаж", be: "Мантаж", kk: "Монтаж", en: "Installation", ko: "설치", zh: "安装", hi: "इंस्टॉलेशन", ce: "Монтаж", tt: "Монтаж" } },
];

// ─── Tag color mapper ─────────────────────────────────────────────────────
const getTagStyles = (tag: string) => {
  switch (tag) {
    case "volumetric-letters":
      return {
        borderColor: "rgba(255, 45, 85, 0.25)",
        bgColor: "rgba(255, 45, 85, 0.06)",
        textColor: "#ff4f73",
        glowColor: "rgba(255, 45, 85, 0.2)"
      };
    case "lightboxes":
      return {
        borderColor: "rgba(0, 122, 255, 0.25)",
        bgColor: "rgba(0, 122, 255, 0.06)",
        textColor: "#3395ff",
        glowColor: "rgba(0, 122, 255, 0.2)"
      };
    case "flex-neon":
      return {
        borderColor: "rgba(255, 149, 0, 0.25)",
        bgColor: "rgba(255, 149, 0, 0.06)",
        textColor: "#ffb033",
        glowColor: "rgba(255, 149, 0, 0.2)"
      };
    case "roof-installations":
      return {
        borderColor: "rgba(88, 86, 214, 0.25)",
        bgColor: "rgba(88, 86, 214, 0.06)",
        textColor: "#8c8be6",
        glowColor: "rgba(88, 86, 214, 0.2)"
      };
    case "installation":
      return {
        borderColor: "rgba(16, 185, 129, 0.25)",
        bgColor: "rgba(16, 185, 129, 0.06)",
        textColor: "#34d399",
        glowColor: "rgba(16, 185, 129, 0.2)"
      };
    case "панель-кронштейны":
      return {
        borderColor: "rgba(217, 70, 239, 0.25)",
        bgColor: "rgba(217, 70, 239, 0.06)",
        textColor: "#e879f9",
        glowColor: "rgba(217, 70, 239, 0.2)"
      };
    case "ретро-буквы":
      return {
        borderColor: "rgba(245, 158, 11, 0.25)",
        bgColor: "rgba(245, 158, 11, 0.06)",
        textColor: "#fbbf24",
        glowColor: "rgba(245, 158, 11, 0.2)"
      };
    case "интерьерные логотипы":
      return {
        borderColor: "rgba(16, 185, 129, 0.25)",
        bgColor: "rgba(16, 185, 129, 0.06)",
        textColor: "#34d399",
        glowColor: "rgba(16, 185, 129, 0.2)"
      };
    case "навигационные стелы":
    case "стелы":
      return {
        borderColor: "rgba(6, 182, 212, 0.25)",
        bgColor: "rgba(6, 182, 212, 0.06)",
        textColor: "#22d3ee",
        glowColor: "rgba(6, 182, 212, 0.2)"
      };
    case "зонирование":
      return {
        borderColor: "rgba(139, 92, 246, 0.25)",
        bgColor: "rgba(139, 92, 246, 0.06)",
        textColor: "#a78bfa",
        glowColor: "rgba(139, 92, 246, 0.2)"
      };
    default:
      return {
        borderColor: "rgba(255, 255, 255, 0.15)",
        bgColor: "rgba(255, 255, 255, 0.06)",
        textColor: "rgba(255, 255, 255, 0.8)",
        glowColor: "rgba(255, 255, 255, 0.1)"
      };
  }
};

const heroCopy = {
  securityPrompt: { ru: "Подтвердите проверку безопасности", be: "Пацвердзіце праверку бяспекі", kk: "Қауіпсіздік тексерісін растаңыз", en: "Confirm the security check", ko: "보안 확인을 완료해 주세요", zh: "请完成安全验证", hi: "कृपया सुरक्षा जांच पूरी करें", ce: "Хавфсызан тешкато хьаж", tt: "Куркынычсызлык тикшерүен раслагыз" },
  consentRequired: { ru: "Нужно согласие на обработку данных", be: "Патрэбна згода на апрацоўку даных", kk: "Деректерді өңдеуге келісім қажет", en: "Consent is required for data processing", ko: "데이터 처리 동의가 필요합니다", zh: "需要同意数据处理", hi: "डेटा प्रोसेसिंग के लिए सहमति आवश्यक है", ce: "Данан чулу дIахьа згода хила хьаж", tt: "Мәгълүмат эшкәртүгә ризалык кирәк" },
  submitError: { ru: "Ошибка отправки", be: "Памылка адпраўкі", kk: "Жіберу қатесі", en: "Submission failed", ko: "전송 오류", zh: "提交失败", hi: "भेजने में त्रुटि", ce: "ДIахьа ошибка", tt: "Җибәрү хатасы" },
  networkError: { ru: "Сбой сети, попробуйте снова", be: "Збой сеткі, паспрабуйце зноў", kk: "Желі қатесі, қайта көріңіз", en: "Network error, please try again", ko: "네트워크 오류입니다. 다시 시도해 주세요", zh: "网络错误，请重试", hi: "नेटवर्क त्रुटि, फिर से प्रयास करें", ce: "Сетан бурухь, цхьа йиша хаьркаш", tt: "Челтәр хатаcы, яңадан карагыз" },
  quizEnabled: { ru: "Квиз включен", be: "Квіз уключаны", kk: "Викторина қосылды", en: "Quiz enabled", ko: "퀴즈 활성화", zh: "问卷已开启", hi: "क्विज़ चालू", ce: "Квиз цхьаьнала", tt: "Квиз кушылган" },
  extraOptions: { ru: "Дополнительно", be: "Дадаткова", kk: "Қосымша", en: "More options", ko: "추가 옵션", zh: "更多选项", hi: "अतिरिक्त विकल्प", ce: "Йовкъаран", tt: "Өстәмә" },
  requestSent: { ru: "Заявка отправлена", be: "Заяўка адпраўлена", kk: "Өтініш жіберілді", en: "Request sent", ko: "요청이 전송되었습니다", zh: "申请已发送", hi: "अनुरोध भेज दिया गया", ce: "Декхар дIахьа", tt: "Заявка җибәрелде" },
  leadCaptured: { ru: "Лид зафиксирован. Переводим вас в configurator.", be: "Лід зафіксаваны. Перанакіроўваем у configurator.", kk: "Лид тіркелді. Сізді configurator-ға жібереміз.", en: "Lead captured. Redirecting you to the configurator.", ko: "리드가 저장되었습니다. 구성기로 이동합니다.", zh: "线索已记录，正在跳转至配置器。", hi: "लीड दर्ज हो गई है। आपको कॉन्फिगरेटर पर भेजा जा रहा है।", ce: "Лид д1ахьара. Конфигураторехь дIахьа ю.", tt: "Лид теркәлде. Сезне configuratorга җибәрәбез." },
  namePlaceholder: { ru: "Имя", be: "Імя", kk: "Аты", en: "Name", ko: "이름", zh: "姓名", hi: "नाम", ce: "Ц1е", tt: "Исем" },
  emailPlaceholder: { ru: "Email (опционально)", be: "Email (неабавязкова)", kk: "Email (міндетті емес)", en: "Email (optional)", ko: "이메일 (선택)", zh: "邮箱（可选）", hi: "ईमेल (वैकल्पिक)", ce: "Email (лелин ахь)", tt: "Email (ихтыяри)" },
  projectType: { ru: "Тип проекта", be: "Тып праекта", kk: "Жоба түрі", en: "Project type", ko: "프로젝트 유형", zh: "项目类型", hi: "प्रोजेक्ट प्रकार", ce: "Проектан тIип", tt: "Проект төре" },
  timeline: { ru: "Срок", be: "Тэрмін", kk: "Мерзім", en: "Timeline", ko: "일정", zh: "周期", hi: "समयसीमा", ce: "Срок", tt: "Срок" },
  facadePhoto: { ru: "Фото фасада", be: "Фота фасада", kk: "Фасад фотосы", en: "Facade photo", ko: "파사드 사진", zh: "门头照片", hi: "फैसाड फोटो", ce: "Фасадан фоточ", tt: "Фасад фотосы" },
  consent: { ru: "Согласие на обработку персональных данных и связь по проекту.", be: "Згода на апрацоўку персанальных даных і сувязь па праекце.", kk: "Жеке деректерді өңдеуге және жоба бойынша байланысқа келісім.", en: "Consent to personal data processing and project communication.", ko: "개인정보 처리 및 프로젝트 연락에 동의합니다.", zh: "同意个人数据处理及项目沟通。", hi: "व्यक्तिगत डेटा प्रोसेसिंग और प्रोजेक्ट संपर्क के लिए सहमति।", ce: "Персонални данаш а проектца байланышца згода.", tt: "Шәхси мәгълүматны эшкәртүгә һәм проект буенча элемтәгә ризалык." },
  sending: { ru: "Отправка...", be: "Адпраўка...", kk: "Жіберілуде...", en: "Sending...", ko: "전송 중...", zh: "发送中...", hi: "भेजा जा रहा है...", ce: "ДIахьа...", tt: "Җибәрелә..." },
  submit: { ru: "Оставить заявку", be: "Пакінуць заяўку", kk: "Өтініш қалдыру", en: "Submit request", ko: "문의 남기기", zh: "提交申请", hi: "अनुरोध भेजें", ce: "Декхар дIахьа", tt: "Заявка калдыру" },
  guaranteeTitle: { ru: "Гарантия 5 лет", be: "Гарантыя 5 гадоў", kk: "5 жыл кепілдік", en: "5-year warranty", ko: "5년 보증", zh: "5年质保", hi: "5 साल की गारंटी", ce: "5 шар гаранти", tt: "5 ел гарантия" },
  guaranteeDesc: { ru: "Полная гарантия на конструкцию и светодиоды", be: "Поўная гарантыя на канструкцыю і святлодыёды", kk: "Құрылым мен LED-ке толық кепілдік", en: "Full warranty on the structure and LEDs", ko: "구조물과 LED에 대한 전체 보증", zh: "结构与LED全保修", hi: "संरचना और LED पर पूर्ण गारंटी", ce: "Кхоллам а LED-гларш а дерриг гаранти", tt: "Конструкция һәм LED өчен тулы гарантия" },
  reliableBadge: { ru: "Надежно", be: "Надзейна", kk: "Сенімді", en: "Reliable", ko: "신뢰 가능", zh: "可靠", hi: "विश्वसनीय", ce: "Надёжно", tt: "Ышанычлы" },
  previewTitle: { ru: "AI предпросмотр", be: "AI-папярэдні прагляд", kk: "AI алдын ала қарау", en: "AI preview", ko: "AI 미리보기", zh: "AI预览", hi: "AI प्रीव्यू", ce: "AI предпросмотр", tt: "AI алдан карау" },
  previewDesc: { ru: "Фотопривязка вывески на вашем фасаде бесплатно", be: "Фотапрывязка шыльды на вашым фасадзе бясплатна", kk: "Маңдайшаны фасадқа фотобайланыстыру тегін", en: "Free photo placement of signage on your facade", ko: "파사드 위 사인 포토 매핑을 무료로 제공합니다", zh: "免费为您的门头进行招牌贴图预览", hi: "आपके फैसाड पर साइन की फोटो प्लेसमेंट मुफ्त", ce: "Шуьйдан фотопривязка цу фасадехь безплатно", tt: "Вывесканы фасадка фотобәйләү бушлай" },
  includedBadge: { ru: "Включено", be: "Уключана", kk: "Қамтылған", en: "Included", ko: "포함", zh: "已包含", hi: "शामिल", ce: "Дохьу", tt: "Кергән" },
  heroAria: { ru: "Главный экран БУКВА СВЕТ", be: "Галоўны экран БУКВА СВЕТ", kk: "БУКВА СВЕТ басты экраны", en: "BUKVA SVET main screen", ko: "БУКВА СВЕТ 메인 화면", zh: "БУКВА СВЕТ 主屏", hi: "БУКВА СВЕТ मुख्य स्क्रीन", ce: "БУКВА СВЕТан гIалгIа", tt: "БУКВА СВЕТ баш экраны" },
  eyebrow: { ru: "Производство рекламных конструкций · Москва", be: "Вытворчасць рэкламных канструкцый · Масква", kk: "Жарнама конструкцияларын өндіру · Мәскеу", en: "Signage production · Moscow", ko: "사인 구조물 제작 · 모스크바", zh: "广告结构制作 · 莫斯科", hi: "साइन प्रोडक्शन · मॉस्को", ce: "Реклама кхолламаш · Москва", tt: "Реклама конструкцияләре җитештерү · Мәскәү" },
  headlineTop: { ru: "Вывески,", be: "Шыльды,", kk: "Маңдайшалар,", en: "Signage,", ko: "사인,", zh: "招牌，", hi: "साइन,", ce: "Шуьйдаш,", tt: "Вывескалар," },
  headlineAccent: { ru: "которые", be: "якія", kk: "олар", en: "that", ko: "브랜드를", zh: "为您", hi: "जो", ce: "цхьа", tt: "которые" },
  headlineBottom: { ru: "работают", be: "працуць", kk: "жұмыс істейді", en: "work", ko: "위해 일하는", zh: "创造价值", hi: "काम करती हैं", ce: "кхоллай", tt: "эшли" },
  headlineTail: { ru: "на вас", be: "на вас", kk: "сіз үшін", en: "for you", ko: "솔루션", zh: "的方案", hi: "आपके लिए", ce: "шун тIехь", tt: "сезнең өчен" },
  description: { ru: "Проектируем и производим объёмные буквы, световые короба, неон и крышные конструкции. Под ключ — от согласования до монтажа.", be: "Праектуем і вырабляем аб’ёмныя літары, светлавыя каробкі, неон і дахавыя канструкцыі. Пад ключ — ад узгаднення да мантажу.", kk: "Көлемді әріптерді, жарық қораптарды, неонды және шатырлық конструкцияларды жобалап, өндіреміз. Келісуден монтажға дейін толық қызмет.", en: "We design and produce channel letters, lightboxes, neon, and roof installations. Turnkey delivery from approvals to installation.", ko: "입체 문자, 라이트박스, 네온, 옥상 구조물을 설계하고 제작합니다. 승인부터 설치까지 턴키로 진행합니다.", zh: "我们设计并生产立体字、灯箱、霓虹和屋顶结构。从审批到安装提供交钥匙服务。", hi: "हम वॉल्यूमेट्रिक अक्षर, लाइटबॉक्स, नियॉन और रूफ इंस्टॉलेशन डिज़ाइन व निर्मित करते हैं। अनुमोदन से इंस्टॉलेशन तक टर्नकी सेवा देते हैं।", ce: "Тхуна аб’ёмни бухкъ, сийла каробкаш, неон а кIовлан кхолламаш а проект а кхоллам а деш ду. Узгадар дIахьа монтаж кхаччалца.", tt: "Өлкле хәрефләр, якты короблар, неон һәм түбә конструкцияләрен проектлыйбыз һәм җитештерәбез. Килештерүдән монтажга кадәр тулы цикл." },
  primaryCta: { ru: "Услуги и цены", be: "Паслугі і кошты", kk: "Қызметтер мен бағалар", en: "Services & pricing", ko: "서비스와 가격", zh: "服务与价格", hi: "सेवाएं और कीमतें", ce: "ГIуллакхаш а баьхнаш", tt: "Хезмәтләр һәм бәяләр" },
  secondaryCta: { ru: "Скачать каталог", be: "Спампаваць каталог", kk: "Каталогты жүктеу", en: "Download catalog", ko: "카탈로그 받기", zh: "下载目录", hi: "कैटलॉग डाउनलोड करें", ce: "Каталог дIахьа", tt: "Каталогны йөкләү" },
} as const;

const quizOptions = {
  type: [
    { value: "Объемные буквы", label: { ru: "Объемные буквы", be: "Аб’ёмныя літары", kk: "Көлемді әріптер", en: "Channel letters", ko: "입체 문자", zh: "立体字", hi: "वॉल्यूमेट्रिक अक्षर", ce: "Комуьгли бухкъ", tt: "Өлкле хәрефләр" } },
    { value: "Лайтбокс", label: { ru: "Лайтбокс", be: "Лайтбокс", kk: "Лайтбокс", en: "Lightbox", ko: "라이트박스", zh: "灯箱", hi: "लाइटबॉक्स", ce: "Лайтбокс", tt: "Лайтбокс" } },
    { value: "Гибкий неон", label: { ru: "Гибкий неон", be: "Гнуткі неон", kk: "Икемді неон", en: "Flexible neon", ko: "플렉스 네온", zh: "柔性霓虹", hi: "फ्लेक्स नियॉन", ce: "Говрта неон", tt: "Эластик неон" } },
  ],
  timeline: [
    { value: "Critical (7-10 дней)", label: { ru: "Critical (7-10 дней)", be: "Critical (7-10 дзён)", kk: "Жедел (7-10 күн)", en: "Critical (7-10 days)", ko: "긴급 (7-10일)", zh: "紧急（7-10天）", hi: "Critical (7-10 दिन)", ce: "Critical (7-10 ден)", tt: "Critical (7-10 көн)" } },
    { value: "Standard (до 21 дня)", label: { ru: "Standard (до 21 дня)", be: "Standard (да 21 дня)", kk: "Standard (21 күнге дейін)", en: "Standard (up to 21 days)", ko: "표준 (최대 21일)", zh: "标准（最多21天）", hi: "Standard (21 दिन तक)", ce: "Standard (21 деьга хьалха)", tt: "Standard (21 көнгә кадәр)" } },
    { value: "Планирование", label: { ru: "Планирование", be: "Планаванне", kk: "Жоспарлау", en: "Planning", ko: "계획 단계", zh: "规划阶段", hi: "प्लानिंग", ce: "Планировкан", tt: "Планлаштыру" } },
  ],
  hasFacade: [
    { value: "Нет, нужна фотопривязка", label: { ru: "Нет, нужна фотопривязка", be: "Не, патрэбна фотапрывязка", kk: "Жоқ, фотобайланыстыру керек", en: "No, I need photo placement", ko: "없음, 포토 매핑 필요", zh: "没有，需要贴图预览", hi: "नहीं, फोटो प्लेसमेंट चाहिए", ce: "Хаь, фотопривязка хьаж", tt: "Юк, фотобәйләү кирәк" } },
    { value: "Есть, пришлю в WhatsApp", label: { ru: "Есть, пришлю в WhatsApp", be: "Ёсць, дашлю ў WhatsApp", kk: "Бар, WhatsApp арқылы жіберемін", en: "Yes, I will send it via WhatsApp", ko: "있음, WhatsApp으로 보내겠습니다", zh: "有，会通过WhatsApp发送", hi: "है, WhatsApp पर भेजूंगा", ce: "Хила, WhatsApp ахь дIахьа", tt: "Бар, WhatsApp аша җибәрәм" } },
    { value: "Есть макет и фасад", label: { ru: "Есть макет и фасад", be: "Ёсць макет і фасад", kk: "Макет пен фасад бар", en: "I have both layout and facade", ko: "레이아웃과 파사드 모두 있음", zh: "已有版式和门头照片", hi: "लेआउट और फैसाड दोनों हैं", ce: "Макет а фасад а хила", tt: "Макет һәм фасад бар" } },
  ],
} as const;


// ─── Animated particle dot ───────────────────────────────────────────────
function Dot({
  style,
}: {
  style: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className="absolute rounded-full opacity-30"
      style={style}
    />
  );
}

// ─── Grid overlay ────────────────────────────────────────────────────────
function GridOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }}
    />
  );
}

// ─── Ambient glow orbs ───────────────────────────────────────────────────
function AmbientOrbs() {
  return (
    <>
      {/* Primary accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[20%] left-[10%] h-[700px] w-[700px] rounded-full opacity-20 blur-[130px]"
        style={{ background: "radial-gradient(circle, #00ffa3 0%, transparent 70%)" }}
      />
      {/* Purple secondary glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[5%] right-[5%] h-[500px] w-[500px] rounded-full opacity-15 blur-[120px]"
        style={{ background: "radial-gradient(circle, #7928ca 0%, transparent 70%)" }}
      />
      {/* Warm deep glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[10%] left-[30%] h-[600px] w-[600px] rounded-full opacity-10 blur-[160px]"
        style={{ background: "radial-gradient(circle, #00ffa3 0%, transparent 70%)" }}
      />
    </>
  );
}

// ─── Scroll-animated preview card ────────────────────────────────────────
function PreviewCard() {
  const router = useRouter();
  const { locale } = useLanguage();
  const [quizEnabled, setQuizEnabled] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leadData, setLeadData] = useState({ name: "", phone: "", email: "", consent: false });
  const [quiz, setQuiz] = useState({
    type: quizOptions.type[0].value,
    timeline: quizOptions.timeline[1].value,
    hasFacade: quizOptions.hasFacade[0].value,
  });
  const salesEngine = createExpointSalesEngine();


  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!turnstileToken) {
      setError(t(locale, heroCopy.securityPrompt));
      return;
    }
    if (!leadData.consent) {
      setError(t(locale, heroCopy.consentRequired));
      return;
    }

    setSending(true);
    try {
      const response = await salesEngine.start({
        name: leadData.name,
        phone: leadData.phone,
        email: leadData.email,
        consent: leadData.consent,
        turnstileToken,
        source: "Hero Premium Form",
        quiz: quizEnabled ? quiz as SalesQuizInput : undefined,
      });

      if (!response.success) {
        throw new Error(response.message || t(locale, heroCopy.submitError));
      }
      setSuccess(true);
      window.setTimeout(() => {
        router.push("/calculator");
      }, 700);
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : t(locale, heroCopy.networkError);
      setError(message);
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-10 lg:mt-0 w-full max-w-xl mx-auto"
    >
      {/* Premium frame */}
      <div className="relative w-full max-w-full overflow-hidden rounded-[2rem] border border-white/[0.08] shadow-[0_40px_120px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)]">
        {/* Inner glow top accent */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="relative overflow-hidden bg-[#090b14] p-5 md:p-6">
          <div className="mb-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setQuizEnabled((prev) => !prev)}
              className={`rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] transition-all ${quizEnabled
                ? "border-[#00ffa3]/40 bg-[#00ffa3]/12 text-[#00ffa3]"
                : "border-[#00ffa3]/20 bg-[#00ffa3]/8 text-white/80 hover:border-[#00ffa3]/40 hover:text-[#00ffa3]"
                }`}
            >
              {quizEnabled ? t(locale, heroCopy.quizEnabled) : t(locale, heroCopy.extraOptions)}
            </button>
          </div>

          {success ? (
            <div className="rounded-2xl border border-[#00ffa3]/20 bg-[#00ffa3]/8 p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#00ffa3]">{t(locale, heroCopy.requestSent)}</p>
              <p className="mt-2 text-sm text-white/75">{t(locale, heroCopy.leadCaptured)}</p>
            </div>
          ) : (
            <form onSubmit={submitLead} className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  value={leadData.name}
                  onChange={(e) => setLeadData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder={t(locale, heroCopy.namePlaceholder)}
                  required
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#00ffa3]/40"
                />
                <input
                  value={leadData.phone}
                  onChange={(e) => setLeadData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="+7 (___) ___-__-__"
                  required
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#00ffa3]/40"
                />
              </div>

              <input
                value={leadData.email}
                onChange={(e) => setLeadData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder={t(locale, heroCopy.emailPlaceholder)}
                className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#00ffa3]/40"
              />

              <AnimatePresence initial={false}>
                {quizEnabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid gap-3 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-4"
                  >
                    {[
                      { key: "type", label: heroCopy.projectType, options: quizOptions.type },
                      { key: "timeline", label: heroCopy.timeline, options: quizOptions.timeline },
                      { key: "hasFacade", label: heroCopy.facadePhoto, options: quizOptions.hasFacade },
                    ].map((field) => (
                      <div key={field.key}>
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">{t(locale, field.label)}</p>
                        <div className="grid gap-2 sm:grid-cols-3">
                          {field.options.map((option) => {
                            const active = quiz[field.key as keyof typeof quiz] === option.value;
                            return (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => setQuiz((prev) => ({ ...prev, [field.key]: option.value }))}
                                className={`rounded-lg border px-2.5 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] transition ${active
                                  ? "border-[#00ffa3]/35 bg-[#00ffa3]/12 text-[#00ffa3]"
                                  : "border-white/12 bg-white/5 text-white/60 hover:text-white"
                                  }`}
                              >
                                {t(locale, option.label)}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <label className="flex items-start gap-3 text-xs md:text-sm text-white/70 hover:text-white cursor-pointer transition-colors select-none">
                <input
                  type="checkbox"
                  checked={leadData.consent}
                  onChange={(e) => setLeadData((prev) => ({ ...prev, consent: e.target.checked }))}
                  className="mt-0.5 h-4.5 w-4.5 cursor-pointer rounded border-white/20 bg-white/5 text-[#00ffa3] focus:ring-1 focus:ring-[#00ffa3] focus:ring-offset-0 transition"
                />
                <span className="leading-tight">
                  {t(locale, heroCopy.consent)}
                </span>
              </label>

              <div className="min-h-[65px]">
                <TurnstileWidget onVerify={setTurnstileToken} />
              </div>

              {error && (
                <p className="rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs text-red-200">{error}</p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="btn-premium-glow group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-5 text-[11px] font-black uppercase tracking-[0.16em] text-black transition-all disabled:opacity-60"
              >
                {sending ? t(locale, heroCopy.sending) : t(locale, heroCopy.submit)}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 text-black" />
              </button>
            </form>
          )}

          <div className="mt-6 flex flex-col gap-3">
            {[
              { 
                icon: Shield, 
                title: t(locale, heroCopy.guaranteeTitle),
                desc: t(locale, heroCopy.guaranteeDesc),
                badge: t(locale, heroCopy.reliableBadge)
              },
              { 
                icon: Sparkles, 
                title: t(locale, heroCopy.previewTitle),
                desc: t(locale, heroCopy.previewDesc),
                badge: t(locale, heroCopy.includedBadge)
              },
            ].map((feature, i) => (
              <div 
                key={i} 
                className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.06] bg-[#090b14]/40 p-4 backdrop-blur-md transition-all duration-300 hover:border-white/15 hover:bg-white/[0.02] hover:-translate-y-0.5 shadow-lg animate-fade-in"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#00ffa3]/20 bg-[#00ffa3]/5 text-[#00ffa3] shadow-[0_0_15px_rgba(0,255,163,0.05)] transition-all duration-300 group-hover:border-[#00ffa3]/40 group-hover:bg-[#00ffa3]/10 group-hover:shadow-[0_0_20px_rgba(0,255,163,0.15)]">
                    <feature.icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-black uppercase tracking-wider text-white leading-tight transition-colors group-hover:text-[#00ffa3]">
                      {feature.title}
                    </p>
                    <p className="text-[11px] sm:text-xs text-white/50 mt-1 leading-normal">
                      {feature.desc}
                    </p>
                  </div>
                </div>
                <div className="shrink-0">
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white/70 transition-colors group-hover:border-[#00ffa3]/30 group-hover:bg-[#00ffa3]/10 group-hover:text-[#00ffa3]">
                    {feature.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </motion.div>
  );
}

interface HeroProps {
  segment?: SegmentData;
}

// Generate stable dots (avoid hydration mismatch)
const STABLE_DOTS = Array.from({ length: 24 }, (_, i) => ({
  left: `${((i * 37 + 11) % 97)}%`,
  top: `${((i * 53 + 7) % 93)}%`,
  size: 2 + (i % 4),
  delay: (i * 0.4) % 6,
  duration: 12 + (i % 10),
}));

// ─── Main HeroSection ─────────────────────────────────────────────────────
const HeroSection = ({ segment }: HeroProps) => {
  const openModal = useModalStore((s) => s.openModal);
  const heroRef = useRef<HTMLDivElement>(null);
  const { locale } = useLanguage();

  const segmentTitle = segment ? t(locale, segment.title) : "";

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#050508] pt-[var(--header-height,5.5rem)] pb-12 lg:min-h-[90vh] lg:py-24"
      aria-label={t(locale, heroCopy.heroAria)}
    >
      {/* ── Background layer ───────────────────────────────────────────── */}
      <AmbientOrbs />
      <GridOverlay />

      {/* Floating particles */}
      {STABLE_DOTS.map((dot, i) => (
        <Dot
          key={i}
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            background: i % 3 === 0 ? "#00ffa3" : i % 3 === 1 ? "#7928ca" : "#ffffff",
            animationDelay: `${dot.delay}s`,
            animationDuration: `${dot.duration}s`,
            animation: `float-particle ${dot.duration}s ease-in-out ${dot.delay}s infinite`,
          }}
        />
      ))}

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 w-full mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8"
      >
        <div className="grid w-full items-center gap-12 lg:gap-16 lg:grid-cols-[1.1fr_0.9fr] xl:gap-24">

          {/* ── Left column: text ───────────────────────────────────────── */}
          <div className="flex flex-col min-w-0 max-w-[680px]">

            {/* Eyebrow badge */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00ffa3]" />
              <span
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {segment ? t(locale, segment.subtitle) : t(locale, heroCopy.eyebrow)}
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[1.05] tracking-[-0.02em] text-white"
              style={{ fontFamily: "var(--font-header)" }}
            >
              {segment ? (
                <>
                  {segmentTitle.split(" ")[0]}{" "}
                  <span
                    className="relative inline pr-1"
                    style={{
                      background: "linear-gradient(135deg, #00ffa3 0%, #00c8ff 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {segmentTitle.split(" ").slice(1).join(" ")}
                  </span>
                </>
              ) : (
                <>
                  {t(locale, heroCopy.headlineTop)}{" "}
                  <span
                    className="relative inline pr-1"
                    style={{
                      background: "linear-gradient(135deg, #00ffa3 0%, #00c8ff 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {t(locale, heroCopy.headlineAccent)}
                  </span>
                  <br />
                  {t(locale, heroCopy.headlineBottom)}{" "}
                  <span className="text-white/60">{t(locale, heroCopy.headlineTail)}</span>
                </>
              )}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-[1.1rem] leading-[1.6] text-white/70"
            >
              {segment ? t(locale, segment.description) : t(locale, heroCopy.description)}
            </motion.p>

            {/* Tags strip */}
            <motion.div
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 flex flex-wrap gap-2.5"
            >
              {(segment ? segment.features : tags).map((tag) => {
                const tagKey = typeof tag === "string" ? tag : tag.id;
                const tagLabel = typeof tag === "string" ? tag : t(locale, tag.label);
                const styles = getTagStyles(tagKey);
                return (
                  <span
                    key={tagKey}
                    className="premium-category-tag rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] cursor-default select-none"
                    style={{
                      fontFamily: "var(--font-mono)",
                      "--tag-border": styles.borderColor,
                      "--tag-bg": styles.bgColor,
                      "--tag-bg-hover": styles.bgColor.replace("0.06", "0.15"),
                      "--tag-text": styles.textColor,
                      "--tag-glow": styles.glowColor,
                    } as React.CSSProperties}
                  >
                    {tagLabel}
                  </span>
                );
              })}
            </motion.div>

            {/* CTA row */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              {/* Primary CTA */}
              <Link
                id="hero-cta-primary"
                href="/services"
                className="group relative flex h-14 items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#00ffa3] px-8 text-[13px] font-black uppercase tracking-[0.12em] text-black shadow-[0_0_30px_rgba(0,255,163,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00ffa3]/90 hover:shadow-[0_0_50px_rgba(0,255,163,0.5)] active:scale-[0.97] sm:min-w-[200px]"
              >
                <span className="relative z-10">{t(locale, heroCopy.primaryCta)}</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 text-black" />
              </Link>

              {/* Secondary CTA */}
              <button
                id="hero-cta-secondary"
                onClick={() => openModal({ context: "Скачать каталог", source: "hero_catalog" })}
                className="group flex h-14 items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-7 text-[13px] font-semibold tracking-[-0.01em] text-white/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.08] hover:text-white active:scale-[0.97] sm:min-w-[160px]"
              >
                <span>{t(locale, heroCopy.secondaryCta)}</span>
                <ChevronRight className="h-4 w-4 opacity-60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </button>
            </motion.div>

            {/* Stat chips */}
            <motion.div
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 flex items-center gap-px"
            >
              {stats.map((stat, i) => (
                <React.Fragment key={stat.value}>
                  {i > 0 && (
                    <div className="mx-5 h-8 w-px bg-white/[0.08]" />
                  )}
                  <div className="flex flex-col">
                    <span
                      className="text-[1.5rem] font-black leading-none tracking-[-0.04em] text-white"
                      style={{ fontFamily: "var(--font-header)" }}
                    >
                      {stat.value}
                    </span>
                    <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">
                      {t(locale, stat.label)}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          </div>

          {/* ── Right column: preview card ──────────────────────────────── */}
          <div className="w-full min-w-0 max-w-[500px] lg:max-w-none justify-self-center lg:justify-self-end">
            <PreviewCard />
          </div>
        </div>
      </div>

      {/* Floating particle and premium glow button animation styles */}
      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); }
          33%       { transform: translateY(-18px) translateX(12px); }
          66%       { transform: translateY(14px) translateX(-10px); }
        }
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .btn-premium-glow {
          background: linear-gradient(135deg, #00ffa3 0%, #00f5a0 25%, #05c3de 50%, #7928ca 100%);
          background-size: 200% 200%;
          animation: gradient-move 4s ease infinite;
          box-shadow: 0 0 20px rgba(0, 255, 163, 0.25), 0 0 40px rgba(121, 40, 202, 0.15);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-premium-glow:hover {
          background-position: 100% 50%;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 0 30px rgba(0, 255, 163, 0.45), 0 0 60px rgba(121, 40, 202, 0.35);
        }
        .btn-premium-glow:active {
          transform: translateY(0) scale(0.98);
        }
        .premium-category-tag {
          border-color: var(--tag-border);
          background-color: var(--tag-bg);
          color: var(--tag-text);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .premium-category-tag:hover {
          border-color: var(--tag-text) !important;
          background-color: var(--tag-bg-hover) !important;
          color: var(--tag-text) !important;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5), 0 0 14px var(--tag-glow) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
};

export { HeroSection };
export default HeroSection;
