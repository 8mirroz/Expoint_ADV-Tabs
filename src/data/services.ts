import type { ContentEvidenceClaim } from '@/lib/knowledge/types';

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  basePrice: number;
  priceUnit: string;
  segments: string[];
  technicalSpecs?: {
    label: string;
    value: string;
  }[];
  faq?: {
    question: string;
    answer: string;
  }[];
  processSteps?: {
    title: string;
    description: string;
  }[];
  previewVideo?: string;
  expertNotes?: {
    source_doc_ids: string[];
    materials: string;
    constraints: string;
    assumptions: string;
    pricingDrivers?: string[];
    claims?: ContentEvidenceClaim[];
    last_verified_at?: string;
    owner?: string;
  };
}

export const SERVICES: Service[] = [
  {
    id: 'volumetric-letters',
    title: 'Объемные световые буквы',
    shortDescription: 'Самый популярный вид фасадной и интерьерной рекламы.',
    fullDescription: 'Изготовление букв любой сложности: от стандартного ПВХ до премиальной нержавеющей стали. Мы используем только высокоэффективные светодиоды с гарантией до 5 лет.',
    features: [
      'Яркая равномерная подсветка',
      'Любые шрифты и размеры',
      'Устойчивость к УФ и осадкам',
      'Соответствие 902-ПП'
    ],
    basePrice: 85,
    priceUnit: '₽/см',
    segments: ['horeca', 'retail', 'clinics', 'corporate'],
    technicalSpecs: [
      { label: 'Материал лицевой части', value: 'Акрил 3-5мм (Altuglas)' },
      { label: 'Материал бортов', value: 'ПВХ / Алюминий / Сталь' },
      { label: 'Подсветка', value: 'LED модули Samsung / Elf' },
      { label: 'Срок службы', value: 'до 50 000 часов' }
    ],
    faq: [
      { 
        question: 'Нужно ли согласование для букв?', 
        answer: 'В Москве, если вывеска соответствует постановлению 902-ПП, регистрация не требуется. Мы бесплатно проверим ваш проект на соответствие нормам.' 
      },
      { 
        question: 'Как быстро выгорают диоды?', 
        answer: 'Мы используем премиальные модули с коэффициентом падения яркости не более 10% за 3 года.' 
      }
    ],
    processSteps: [
      { title: 'Замер и фотопривязка', description: 'Выезд инженера и создание визуализации на вашем фасаде.' },
      { title: 'Дизайн и макет', description: 'Подготовка чертежей с учетом технических ограничений.' },
      { title: 'Производство', description: 'Лазерная резка, сборка и тестирование электроники.' },
      { title: 'Монтаж', description: 'Установка нашими альпинистами с гарантией на работы.' }
    ],
    previewVideo: '/videos/signage/3d-letters-premium.mp4',
    expertNotes: {
      source_doc_ids: ['NB-003', 'NB-004', 'NB-006'],
      materials: 'Акрил Altuglas, борта ПВХ/алюминий/нержавеющая сталь, LED модули Samsung/Elf.',
      constraints: 'Для фасадов в Москве учитываются габаритные ограничения по 902-ПП и условия монтажного доступа.',
      assumptions: 'Финальный бюджет подтверждается после замера, фотофиксации и проверки электроподключения.',
      pricingDrivers: [
        'Высота букв и количество символов формируют базовую смету.',
        'Материал борта и сценарий подсветки меняют срок службы и внешний вид.',
        'Доступ к фасаду и ночной монтаж влияют на итоговый бюджет проекта.',
      ],
      claims: [
        {
          source_doc_id: 'NB-003',
          claim: 'Высота и количество символов дают базовый ценовой ориентир по буквам.',
          evidence_snippet: 'Rate per cm multiplied by letter count is the primary baseline estimator.',
        },
        {
          source_doc_id: 'NB-017',
          claim: 'Сценарий доступа и монтажные условия материально влияют на смету.',
          evidence_snippet: 'Access complexity and night works materially affect final project budget.',
        },
      ],
      last_verified_at: '2026-05-12',
      owner: 'growth-team',
    }
  },
  {
    id: 'lightbox',
    title: 'Световые короба (Лайтбоксы)',
    shortDescription: 'Эффективное решение для навигации и брендинга.',
    fullDescription: 'Тонкие и классические короба с возможностью быстрой замены изображения.',
    features: [
      'Экономичное энергопотребление',
      'Сверхтонкие профили (от 20мм)',
      'Удобство обслуживания'
    ],
    basePrice: 4500,
    priceUnit: '₽/м²',
    segments: ['retail', 'franchise'],
    technicalSpecs: [
      { label: 'Профиль', value: 'Алюминиевый 90/130мм' },
      { label: 'Лицевая панель', value: 'Акрил / Сотовый поликарбонат' },
      { label: 'Изображение', value: 'УФ-печать / Пленка Oracal' },
      { label: 'Глубина', value: 'от 60 до 150 мм' }
    ],
    faq: [
      { question: 'Что лучше: баннер или акрил?', answer: 'Акрил выглядит премиальнее и лучше рассеивает свет, но ограничен размером листа (3х2м). Для больших коробов мы используем транслюцентный баннер.' },
      { question: 'Можно ли заменить изображение?', answer: 'Да, в наших коробах предусмотрена система быстрого доступа для замены лицевой панели или переклейки изображения.' }
    ],
    processSteps: [
      { title: 'Замер', description: 'Определяем место крепления и подводку питания.' },
      { title: 'Макет', description: 'Подготовка файла для печати и расчет яркости подсветки.' },
      { title: 'Сборка', description: 'Изготовление каркаса и установка LED-кластеров.' },
      { title: 'Монтаж', description: 'Установка и подключение к сети 220В.' }
    ],
    previewVideo: '/videos/signage/lightbox-premium.mp4',
    expertNotes: {
      source_doc_ids: ['NB-003', 'NB-005', 'NB-007'],
      materials: 'Алюминиевый профиль, акрил/поликарбонат, транслюцентная пленка/УФ-печать.',
      constraints: 'Световые короба в историческом центре требуют отдельной проверки допустимости.',
      assumptions: 'Цена зависит от площади, глубины, типа печати и сценария обслуживания.',
      pricingDrivers: [
        'Площадь и глубина короба задают базовую стоимость производства.',
        'Тип лицевой панели влияет на яркость, сервис и ресурс.',
        'Исторический центр требует отдельной проверки допустимого формата.',
      ],
      claims: [
        {
          source_doc_id: 'NB-005',
          claim: 'Световой сценарий и материал лицевой панели меняют качество видимости.',
          evidence_snippet: 'Lightbox format is effective for broad-visibility wayfinding tasks.',
        },
        {
          source_doc_id: 'NB-007',
          claim: 'Лайтбоксы подходят не для каждой городской зоны и требуют ранней проверки.',
          evidence_snippet: 'Historic district signage excludes solid lightboxes; channel letters preferred.',
        },
      ],
      last_verified_at: '2026-05-12',
      owner: 'engineering-team',
    }
  },
  {
    id: 'flex-neon',
    title: 'Гибкий неон',
    shortDescription: 'Интерьерные и фасадные сценарии с выразительным световым контуром.',
    fullDescription: 'Производим вывески и декоративные композиции из гибкого неона для HoReCa, салонов, шоурумов и офисов.',
    features: [
      'Чистый равномерный контур',
      'Высокая визуальная заметность',
      'Подходит для интерьерных инсталляций'
    ],
    basePrice: 3900,
    priceUnit: '₽/м.п.',
    segments: ['horeca', 'retail', 'corporate'],
    technicalSpecs: [
      { label: 'Тип неона', value: 'Силиконовый 2-го поколения (6х12 / 8x16)' },
      { label: 'Основание', value: 'Прозрачный акрил 5-8мм' },
      { label: 'Кратность реза', value: '10-25 мм' },
      { label: 'Питание', value: '12В (блок питания в комплекте)' }
    ],
    faq: [
      { question: 'Насколько это безопасно?', answer: 'Гибкий неон работает от 12 вольт, он не нагревается и не содержит стекла или газа, что делает его идеальным для помещений.' },
      { question: 'Можно ли сделать диммирование?', answer: 'Да, мы можем установить контроллер для управления яркостью и создания динамических эффектов.' }
    ],
    processSteps: [
      { title: 'Векторный файл', description: 'Разработка траектории укладки неона.' },
      { title: 'Фрезеровка', description: 'Создание пазов в акриле на ЧПУ-станке.' },
      { title: 'Монтаж неона', description: 'Ручная укладка и пайка соединений.' },
      { title: 'Проверка', description: 'Тестирование на стабильность свечения в течение 24 часов.' }
    ],
    previewVideo: '/videos/signage/flex-neon-preview.mp4',
    expertNotes: {
      source_doc_ids: ['NB-004', 'NB-005', 'NB-010'],
      materials: 'Силиконовый гибкий неон 6x12/8x16, акрил 5-8мм, блоки 12В.',
      constraints: 'Учитываются требования к яркости, зоне размещения и безопасности подключения.',
      assumptions: 'Итоговая стоимость рассчитывается от длины контура, количества стыков и режима свечения.',
      pricingDrivers: [
        'Длина контура и количество стыков определяют основной бюджет.',
        'Тип основания влияет на визуальную чистоту и монтаж.',
        'Сценарий яркости и зона размещения меняют требования к питанию.',
      ],
      claims: [
        {
          source_doc_id: 'NB-004',
          claim: 'Материал основания напрямую влияет на визуальный ресурс конструкции.',
          evidence_snippet: 'Material-lighting coupling directly affects luminance stability and service life.',
        },
        {
          source_doc_id: 'NB-010',
          claim: 'Для HoReCa и retail гибкий неон решает разные задачи заметности и атмосферы.',
          evidence_snippet: 'Retail prioritizes visibility; HoReCa ambiance; corporate compliance and consistency.',
        },
      ],
      last_verified_at: '2026-05-12',
      owner: 'content-team',
    }
  },
  {
    id: 'metal-letters',
    title: 'Нержавеющие буквы без подсветки',
    shortDescription: 'Статусные фасадные и интерьерные решения для премиальных брендов.',
    fullDescription: 'Изготавливаем строгие буквенные логотипы из шлифованной, зеркальной и окрашенной нержавеющей стали.',
    features: [
      'Премиальный внешний вид',
      'Высокая устойчивость к погоде',
      'Точное соответствие брендбуку'
    ],
    basePrice: 110,
    priceUnit: '₽/см',
    segments: ['corporate', 'horeca', 'retail'],
    technicalSpecs: [
      { label: 'Сталь', value: 'AISI 304 (пищевая нержавейка)' },
      { label: 'Толщина', value: '0.8 - 1.5 мм' },
      { label: 'Тип обработки', value: 'Зеркало / Шлиф / Булат' },
      { label: 'Метод сборки', value: 'Лазерная микросварка' }
    ],
    faq: [
      { question: 'Будут ли буквы ржаветь?', answer: 'Мы используем сталь AISI 304, которая устойчива к коррозии в условиях городской среды. Для морского климата предлагаем AISI 316.' },
      { question: 'Как они крепятся?', answer: 'Обычно на дистанционные держатели или скрытые шпильки, что создает эффект "парения" над стеной.' }
    ],
    processSteps: [
      { title: 'Лазерная резка', description: 'Раскрой металла с идеальной точностью.' },
      { title: 'Сварка бортов', description: 'Соединение деталей невидимым швом.' },
      { title: 'Полировка', description: 'Финишная обработка до нужной текстуры.' },
      { title: 'Трафарет', description: 'Подготовка шаблона для точного позиционирования при монтаже.' }
    ],
    previewVideo: '/videos/signage/installation-and-launch.mp4',
    expertNotes: {
      source_doc_ids: ['NB-004', 'NB-011', 'NB-017'],
      materials: 'Нержавеющая сталь AISI 304/316, лазерная микросварка, шлиф/зеркало.',
      constraints: 'Критичны точная фотопривязка, крепеж и расчет нагрузки на фасад.',
      assumptions: 'Бюджет зависит от сложности формы, толщины металла и типа финишной обработки.',
      pricingDrivers: [
        'Толщина стали и тип финишной обработки меняют себестоимость.',
        'Сложная геометрия повышает трудоемкость сварки и полировки.',
        'Крепеж и точность фотопривязки влияют на монтажный этап.',
      ],
      claims: [
        {
          source_doc_id: 'NB-004',
          claim: 'Материал и финишная обработка определяют долговечность и статусный вид.',
          evidence_snippet: 'AISI304 maintains corrosion resistance and premium finish in urban exposure.',
        },
        {
          source_doc_id: 'NB-017',
          claim: 'Монтажный доступ и точность инженерной подготовки влияют на бюджет проекта.',
          evidence_snippet: 'Access complexity and night works materially affect final project budget.',
        },
      ],
      last_verified_at: '2026-05-12',
      owner: 'engineering-team',
    }
  },
  {
    id: 'pylon-signs',
    title: 'Стелы и элементы навигации',
    shortDescription: 'Навигация для бизнес-центров, АЗС, ТЦ и крупных территорий.',
    fullDescription: 'Проектируем и производим навигационные стелы с учетом ветровой нагрузки, фундамента и схемы подключения.',
    features: [
      'Индивидуальная инженерия',
      'Работа с фундаментом и металлокаркасом',
      'Подходит для крупных объектов'
    ],
    basePrice: 180000,
    priceUnit: '₽/изделие',
    segments: ['corporate', 'franchise', 'retail'],
    technicalSpecs: [
      { label: 'Каркас', value: 'Профильная стальная труба' },
      { label: 'Облицовка', value: 'Композит (АКП) / Алюминий' },
      { label: 'Фундамент', value: 'Армированный бетон с анкерной группой' },
      { label: 'Вес конструкции', value: 'от 150 до 1500 кг' }
    ],
    faq: [
      { question: 'Нужен ли проект фундамента?', answer: 'Да, мы обязательно рассчитываем нагрузки и готовим проект закладных деталей для обеспечения устойчивости.' },
      { question: 'Как согласовать стелу?', answer: 'Стелы выше 6 метров требуют прохождения экспертизы и получения отдельного разрешения.' }
    ],
    previewVideo: '/videos/signage/navigation-elements.mp4',
    processSteps: [
      { title: 'Геодезия', description: 'Проверка грунта и поиск скрытых коммуникаций.' },
      { title: 'Инженерия', description: 'Расчет ветровых нагрузок и создание КМ/КМД.' },
      { title: 'Производство', description: 'Сварка ферм и облицовка панелями.' },
      { title: 'Бетонирование', description: 'Подготовка основания и установка конструкции краном.' }
    ],
    expertNotes: {
      source_doc_ids: ['NB-003', 'NB-011', 'NB-017'],
      materials: 'Профильная сталь, АКП/алюминий, фундамент с анкерной группой.',
      constraints: 'Обязательны расчеты ветровой нагрузки, сценарий фундамента и электроподвод.',
      assumptions: 'Срок и стоимость уточняются после инженерного обследования площадки.',
      pricingDrivers: [
        'Металлокаркас и фундамент формируют основной CAPEX стелы.',
        'Высота и ветровая нагрузка влияют на инженерный объем работ.',
        'Подвод питания и техника для монтажа меняют срок и смету.',
      ],
      claims: [
        {
          source_doc_id: 'NB-011',
          claim: 'Навигационные конструкции нужно считать не только по внешнему виду, но и по инженерной схеме.',
          evidence_snippet: 'Comprehensive ROI includes CAPEX, downtime risk, and maintenance load.',
        },
        {
          source_doc_id: 'NB-017',
          claim: 'Инженерное обследование площадки влияет на сроки и подтверждение бюджета.',
          evidence_snippet: 'Access complexity and night works materially affect final project budget.',
        },
      ],
      last_verified_at: '2026-05-12',
      owner: 'operations-team',
    }
  },
  {
    id: 'roof-installations',
    title: 'Крышные установки',
    shortDescription: 'Крупноформатные конструкции для максимальной видимости бренда.',
    fullDescription: 'Берем на себя обследование, проектирование, производство, согласование и монтаж крышных рекламных конструкций любой сложности.',
    features: [
      'Инженерное обследование',
      'Силовой металлокаркас',
      'Сопровождение согласований',
      'Масштабируемость до 50 метров'
    ],
    basePrice: 350000,
    priceUnit: '₽/проект',
    segments: ['corporate', 'franchise'],
    technicalSpecs: [
      { label: 'Тип конструкции', value: 'Световые буквы / Панно' },
      { label: 'Каркас', value: 'Горячекатаная сталь с антикором' },
      { label: 'Ветровая нагрузка', value: 'Расчет по СНиП (I-V районы)' },
      { label: 'Питание', value: '380В с системой автоматики' }
    ],
    faq: [
      { 
        question: 'Как долго длится согласование?', 
        answer: 'В среднем от 1.5 до 3 месяцев, включая экспертизу крыши и получение разрешения в Департаменте СМИ и рекламы.' 
      },
      { 
        question: 'Нужен ли проект?', 
        answer: 'Да, для крышных установок обязателен проект КМ/КМД и электропроект, а также заключение о несущей способности кровли.' 
      }
    ],
    previewVideo: '/videos/signage/roof-installations.mp4',
    processSteps: [
      { title: 'Экспертиза кровли', description: 'Обследование здания для определения допустимых нагрузок.' },
      { title: 'Проектирование', description: 'Разработка конструкторской документации и расчет ветровых нагрузок.' },
      { title: 'Согласование', description: 'Подача документов в профильные ведомства.' },
      { title: 'Монтаж спецтехникой', description: 'Сборка конструкции с применением башенных кранов и промышленных альпинистов.' }
    ],
    expertNotes: {
      source_doc_ids: ['NB-006', 'NB-008', 'NB-018'],
      materials: 'Силовой металлокаркас, горячекатаная сталь с антикором, система 380В.',
      constraints: 'Обязательны КМ/КМД, экспертиза несущей способности и согласование.',
      assumptions: 'Финальный график и бюджет зависят от обследования кровли и проектной стадии.',
      pricingDrivers: [
        'Проектирование КМ/КМД и обследование кровли обязательны до производства.',
        'Размер конструкции и силовой каркас формируют основную смету.',
        'Согласование и монтаж спецтехникой влияют на сроки и бюджет.',
      ],
      claims: [
        {
          source_doc_id: 'NB-018',
          claim: 'Раннее раскрытие юридических ограничений снижает риск сорванного проекта.',
          evidence_snippet: 'Penalty exposure framing improves acceptance of compliant design alternatives.',
        },
        {
          source_doc_id: 'NB-006',
          claim: 'Крышные сценарии требуют строгой проверки допустимых размеров и схемы размещения.',
          evidence_snippet: 'Signage length must be within 70% facade width with 15m absolute cap.',
        },
      ],
      last_verified_at: '2026-05-12',
      owner: 'legal-team',
    }
  }
];

export interface ProductPack {
  id: string;
  name: string;
  description: string;
  target: string;
  priceStart: string;
  features: string[];
  isPopular?: boolean;
  gallery?: {
    id: string | number;
    title: string;
    imageUrl: string;
  }[];
}

export const PRODUCT_PACKS: ProductPack[] = [
  {
    id: 'start',
    name: 'Старт (базовый B2B)',
    description: 'Надежное решение для малого бизнеса.',
    target: 'Кофейни, небольшие магазины, ПВЗ.',
    priceStart: '25 000 ₽',
    features: [
      'ПВХ + Акрил 3мм',
      'Стандартные диоды',
      'Гарантия 1 год'
    ],
    gallery: [
      { id: 1, title: 'ПВХ Буквы', imageUrl: 'https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?q=80&w=1974&auto=format&fit=crop' },
      { id: 2, title: 'Акрил', imageUrl: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop' },
      { id: 3, title: 'Монтаж', imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1974&auto=format&fit=crop' }
    ]
  },
  {
    id: 'business',
    name: 'Бизнес (премиальный выбор)',
    description: 'Золотой стандарт качества и долговечности.',
    target: 'Рестораны, клиники, бутики.',
    priceStart: '65 000 ₽',
    features: [
      'AISI 304 Металл',
      'Samsung LEDs',
      'Гарантия 3 года'
    ],
    isPopular: true,
    gallery: [
      { id: 1, title: 'AISI 304', imageUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop' },
      { id: 2, title: 'Samsung LED', imageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2090&auto=format&fit=crop' },
      { id: 3, title: 'Premium Finish', imageUrl: 'https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?q=80&w=1974&auto=format&fit=crop' }
    ]
  }
];
