import type { LocalizedText } from '@/i18n/site';

/**
 * Company data for About page and shared sections.
 */

export interface CompanyValue {
  icon: string;
  title: LocalizedText;
  description: LocalizedText;
}

export interface CompanyStat {
  value: string;
  label: LocalizedText;
}

export const COMPANY_INFO = {
  name: 'Expoint ADV',
  foundedYear: 2018,
  address: {
    ru: 'Москва, ул. Промышленная, д. 12, стр. 3',
    en: 'Moscow, Promyshlennaya st., 12, bldg. 3',
  } as LocalizedText,
  phone: '+7 (495) 000-00-00',
  email: 'info@expoint-adv.ru',
  telegram: '@expoint_adv',
  whatsapp: '+74950000000',
  workingHours: {
    ru: 'Пн–Пт: 9:00–19:00, Сб: 10:00–16:00',
    en: 'Mon–Fri: 9:00–19:00, Sat: 10:00–16:00',
  } as LocalizedText,
  mapCoordinates: { lat: 55.746061, lng: 37.799706 },
  requisites: {
    inn: '7712345678',
    ogrn: '1187746123456',
    kpp: '771201001',
    legalAddress: '111394, г. Москва, ул. Полимерная, д. 8',
    bank: 'ПАО СБЕРБАНК',
    rs: '40702810038000012345',
    ks: '30101810400000000225',
    bik: '044525225',
  },
};

export const COMPANY_STATS: CompanyStat[] = [
  {
    value: '7+',
    label: { ru: 'Лет на рынке', en: 'Years in market', kk: 'Жыл нарықта', be: 'Гадоў на рынку', zh: '年市场经验', ce: 'Шо базарехь', tt: 'Ел базарда' },
  },
  {
    value: '850+',
    label: { ru: 'Проектов реализовано', en: 'Projects completed', kk: 'Жоба аяқталды', be: 'Праектаў рэалізавана', zh: '已完成项目', ce: 'Проект кхочушдина', tt: 'Проект тормышка ашырылды' },
  },
  {
    value: '200+',
    label: { ru: 'Постоянных клиентов', en: 'Regular clients', kk: 'Тұрақты клиенттер', be: 'Пастаянных кліентаў', zh: '固定客户', ce: 'Хьалхара клиенташ', tt: 'Даими клиентлар' },
  },
  {
    value: '2500 м²',
    label: { ru: 'Производственная площадь', en: 'Production area', kk: 'Өндірістік аумақ', be: 'Вытворчая плошча', zh: '生产面积', ce: 'Кхолламан площадь', tt: 'Җитештерү мәйданы' },
  },
];

export const COMPANY_VALUES: CompanyValue[] = [
  {
    icon: 'precision_manufacturing',
    title: { ru: 'Инженерный подход', en: 'Engineering Approach', kk: 'Инженерлік тәсіл', be: 'Інжынерны падыход', zh: '工程方法', ce: 'Инженерни подход', tt: 'Инженер карашы' },
    description: { ru: 'Каждый проект — от лазерной резки до монтажа — основан на расчётах, чертежах и контроле качества.', en: 'Every project — from laser cutting to installation — is based on calculations, drawings, and quality control.', kk: 'Әр жоба — лазерлік кесуден монтажға дейін — есептеулер, сызбалар және сапа бақылауына негізделген.', be: 'Кожны праект — ад лазернай рэзкі да мантажу — заснаваны на разліках, чарцяжах і кантролі якасці.', zh: '每个项目——从激光切割到安装——都基于计算、图纸和质量控制。', ce: 'Лазерни хесиршра дуьйна монтаж тIехьа — кхидолу проект хьисапашца, чертежашца а качество контролаца а вуьйлу ву.', tt: 'Һәр проект — лазер кисүдән монтажга кадәр — исәпләр, чертежлар һәм сыйфат контроле нигезендә.' },
  },
  {
    icon: 'verified',
    title: { ru: 'Соответствие нормам', en: 'Regulatory Compliance', kk: 'Нормаларға сәйкестік', be: 'Адпаведнасць нормам', zh: '合规性', ce: 'Нормашна дог1а дала', tt: 'Нормаларга туры килү' },
    description: { ru: '100% соответствие постановлению 902-ПП Москвы. Бесплатная проверка вашего проекта на соответствие.', en: '100% compliance with Moscow regulation 902-PP. Free project compliance check.', kk: '902-ПП Мәскеу қаулысына 100% сәйкестік. Жобаңызды тегін тексеру.', be: '100% адпаведнасць пастанове 902-ПП Масквы. Бясплатная праверка вашага праекта.', zh: '100%符合莫斯科第902-ПП号法规。免费项目合规检查。', ce: 'Москван 902-ПП постановленишна 100% дог1а дахьар. Хьан проект бесплатно хьажар.', tt: 'Мәскәү 902-ПП карарына 100% туры килү. Сезнең проектны бушлай тикшерү.' },
  },
  {
    icon: 'factory',
    title: { ru: 'Собственное производство', en: 'In-house Production', kk: 'Өз өндірісіміз', be: 'Уласная вытворчасць', zh: '自有生产', ce: 'Шен кхоллам', tt: 'Үз җитештерү' },
    description: { ru: 'Полный цикл: от дизайна до монтажа. 2500 м² цехов с ЧПУ-станками, лазерной резкой и покрасочной камерой.', en: 'Full cycle: from design to installation. 2500 m² workshop with CNC machines, laser cutting, and paint booth.', kk: 'Толық цикл: дизайннан монтажға дейін. ЧПУ станоктары, лазерлік кесу және бояу камерасы бар 2500 м² цех.', be: 'Поўны цыкл: ад дызайну да мантажу. 2500 м² цэхаў з ЧПУ-станкамі, лазернай рэзкай і фарбавальнай камерай.', zh: '全周期：从设计到安装。2500平方米车间配备CNC机床、激光切割和喷漆室。', ce: 'Дерриг цикл: дизайнера дуьйна монтаж тIехьа. 2500 м² цех ЧПУ-станокашца, лазерни хесиршца а боьха камераца.', tt: 'Тулы цикл: дизайннан монтажга кадәр. ЧПУ-станоклар, лазер кисү һәм буяу камерасы белән 2500 м² цех.' },
  },
  {
    icon: 'schedule',
    title: { ru: 'Сроки от 3 дней', en: 'From 3 Days Delivery', kk: '3 күннен бастап', be: 'Тэрміны ад 3 дзён', zh: '最快3天交付', ce: '3 дийнахь дуьйна', tt: '3 көннән башлап' },
    description: { ru: 'Стандартные заказы — от 3 рабочих дней. Срочные проекты — с экспресс-графиком и гарантией дедлайна.', en: 'Standard orders from 3 business days. Rush projects with express schedule and deadline guarantee.', kk: 'Стандартты тапсырыстар — 3 жұмыс күнінен бастап. Шұғыл жобалар — экспресс-кестемен.', be: 'Стандартныя заказы — ад 3 рабочых дзён. Тэрміновыя праекты — з экспрэс-графікам.', zh: '标准订单最快3个工作日。紧急项目提供快速排程和截止日期保证。', ce: 'Стандартни заказаш — 3 белхан дийнахь дуьйна. ТIехьоьжу проекташ — экспресс-графикца.', tt: 'Стандарт заказлар — 3 эш көненнән башлап. Ашыгыч проектлар — экспресс-график белән.' },
  },
];

export const COMPANY_MISSION = {
  title: {
    ru: 'Наша миссия',
    en: 'Our Mission',
  } as LocalizedText,
  description: {
    ru: 'Мы превращаем наружную рекламу из ремесленного заказа в инженерный продукт — с предсказуемым качеством, точными сроками и полным техническим сопровождением.',
    en: 'We transform outdoor advertising from a craft order into an engineered product — with predictable quality, precise timelines, and full technical support.',
  } as LocalizedText,
};
