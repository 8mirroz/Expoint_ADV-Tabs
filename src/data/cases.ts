import type { KnowledgeContentMeta } from '@/lib/knowledge/types';

export interface CaseStudy {
  id: string;
  title: string;
  clientName: string;
  segment: 'horeca' | 'retail' | 'clinics' | 'corporate' | 'franchise' | string;
  description: string;
  solution: string;
  budget: string;
  term: string;
  imageBg: string;
  videoUrl?: string;
  imageUrl?: string;
  metrics: {
    label: string;
    value: string;
  }[];
  contentMeta: KnowledgeContentMeta;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'stitch-neon',
    segment: 'retail',
    clientName: 'Stitch',
    title: 'Stitch - Neon Branding',
    description: 'Комплексное оформление витрины гибким неоном для премиального бренда одежды.',
    solution: 'Производство и монтаж сложного неонового паттерна по макетам заказчика.',
    budget: '120 000 ₽',
    term: '10 дней',
    imageBg: 'bg-slate-900',
    videoUrl: '/videos/signage/3d-letters-preview.mp4',
    metrics: [
      { label: 'Рост входящего потока', value: '+18% за 30 дней' },
      { label: 'Срок запуска', value: '10 дней под ключ' },
      { label: 'Рекламации', value: '0 за 6 месяцев' },
    ],
    contentMeta: {
      source_doc_ids: ['NB-011', 'NB-012', 'NB-017'],
      claims: [
        {
          source_doc_id: 'NB-011',
          claim: 'Для fashion-ритейла световой контур повышает заметность входной зоны.',
          evidence_snippet: 'Neon storefront pattern improves wayfinding and social sharing in evening hours.',
        },
        {
          source_doc_id: 'NB-012',
          claim: 'Быстрый запуск без компромисса по качеству критичен для сезонных коллекций.',
          evidence_snippet: 'Campaign window value declines after 2 weeks; SLA under 14 days is recommended.',
        },
      ],
      last_verified_at: '2026-05-12',
      owner: 'content-team',
    },
  },
  {
    id: 'coffee-house',
    segment: 'horeca',
    clientName: 'Зерно',
    title: "Кофейня 'Зерно'",
    description: 'Привлечь поток в кофейню с низкой видимостью, согласовать с ТЦ.',
    solution: 'Объемные буквы с контражурной подсветкой, разработка дизайн-проекта для УК.',
    budget: '54 000 ₽',
    term: '8 дней',
    imageBg: 'bg-slate-800',
    metrics: [
      { label: 'Рост трафика в часы пик', value: '+12%' },
      { label: 'Срок согласования ТЦ', value: '4 рабочих дня' },
      { label: 'Снижение энергопотребления', value: '-21%' },
    ],
    contentMeta: {
      source_doc_ids: ['NB-010', 'NB-011', 'NB-016'],
      claims: [
        {
          source_doc_id: 'NB-010',
          claim: 'HoReCa сегмент лучше реагирует на мягкий контражур и теплую температуру света.',
          evidence_snippet: 'Warm halo-lit letters increase evening dwell time and brand recall for cafes.',
        },
        {
          source_doc_id: 'NB-016',
          claim: 'Согласование через управляющую компанию ускоряется при готовом техпакете.',
          evidence_snippet: 'Pre-compiled engineering documentation reduces approval cycle in malls.',
        },
      ],
      last_verified_at: '2026-05-12',
      owner: 'content-team',
    },
  },
  {
    id: 'smile-clinic',
    segment: 'clinics',
    clientName: 'Смайл',
    title: "Стоматология 'Смайл'",
    description: 'Заменить устаревшую вывеску на фасаде жилого дома без жалоб жильцов.',
    solution: 'Светодиодные пиксели с комфортной яркостью в ночное время, монтаж на подконструкции без повреждения фасада.',
    budget: '115 000 ₽',
    term: '14 дней',
    imageBg: 'bg-neutral-800',
    metrics: [
      { label: 'Жалобы жителей', value: '0 после запуска' },
      { label: 'Срок ночного монтажа', value: '1 смена' },
      { label: 'Срок службы системы', value: '50 000 часов' },
    ],
    contentMeta: {
      source_doc_ids: ['NB-006', 'NB-008', 'NB-018'],
      claims: [
        {
          source_doc_id: 'NB-006',
          claim: 'Для жилого фасада критичны ограничения яркости и габаритов по 902-ПП.',
          evidence_snippet: 'Residential facade signage must avoid excessive luminance and invasive placement.',
        },
        {
          source_doc_id: 'NB-018',
          claim: 'Соблюдение требований снижает риск штрафов и предписаний.',
          evidence_snippet: 'Legal risk map indicates highest penalty risk for window overlap and balcony placement.',
        },
      ],
      last_verified_at: '2026-05-12',
      owner: 'legal-team',
    },
  },
  {
    id: 'premium-office',
    segment: 'corporate',
    clientName: 'TechHub',
    title: 'TechHub - Digital Office',
    description: 'Создание футуристичной навигации и брендинга для IT-коворкинга.',
    solution: 'Световые панели с RGB-подсветкой, гравировка на акриле с торцевым свечением.',
    budget: '280 000 ₽',
    term: '21 день',
    imageBg: 'bg-blue-900/20',
    videoUrl: '/videos/signage/lightbox-preview.mp4',
    metrics: [
      { label: 'Скорость навигации посетителей', value: '+27%' },
      { label: 'Срок комплексного запуска', value: '21 день' },
      { label: 'NPS офисной среды', value: '+14 пунктов' },
    ],
    contentMeta: {
      source_doc_ids: ['NB-002', 'NB-009', 'NB-017'],
      claims: [
        {
          source_doc_id: 'NB-009',
          claim: 'Для корпоративной среды эффективны контрастные wayfinding-сценарии.',
          evidence_snippet: 'Directional lighting and zone coding reduce orientation time in multi-floor offices.',
        },
        {
          source_doc_id: 'NB-017',
          claim: 'Модульная сборка снижает downtime при обновлении навигации.',
          evidence_snippet: 'Modular panel architecture minimizes disruption during phased deployment.',
        },
      ],
      last_verified_at: '2026-05-12',
      owner: 'operations-team',
    },
  },
  {
    id: 'franchise-point',
    segment: 'franchise',
    clientName: 'Point-G',
    title: "Франшиза 'Point-G'",
    description: 'Масштабируемое решение для сети магазинов подарков.',
    solution: 'Типовые лайтбоксы и объемные буквы из композита, оптимизированные для быстрой логистики.',
    budget: '45 000 ₽ за точку',
    term: '5 дней',
    imageBg: 'bg-purple-900/20',
    metrics: [
      { label: 'Скорость roll-out', value: 'до 6 точек/месяц' },
      { label: 'Снижение CAPEX на точку', value: '-15%' },
      { label: 'Единообразие бренд-стандарта', value: '100% по чек-листу' },
    ],
    contentMeta: {
      source_doc_ids: ['NB-002', 'NB-010', 'NB-019'],
      claims: [
        {
          source_doc_id: 'NB-019',
          claim: 'Для франшиз приоритетом является тиражируемость и скорость запуска.',
          evidence_snippet: 'Template-based signage kits produce fastest growth with stable quality control.',
        },
        {
          source_doc_id: 'NB-002',
          claim: 'Стабильность визуального стандарта напрямую влияет на доверие к сети.',
          evidence_snippet: 'Multi-location consistency is a leading factor for franchise brand perception.',
        },
      ],
      last_verified_at: '2026-05-12',
      owner: 'growth-team',
    },
  },
];
