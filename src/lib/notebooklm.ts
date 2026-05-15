/**
 * NotebookLM Integration Stub
 * 
 * This module will handle querying the NotebookLM knowledge base.
 * Currently, it acts as a mock interface until the full API/CLI integration is wired.
 */

export interface QueryResponse {
  answer: string;
  sources: string[];
}

const KNOWLEDGE_BASE = [
  {
    keywords: ['цен', 'стоимост', 'прайс', 'price', 'cost'],
    answer: 'Наши цены начинаются от 35 000 ₽ за базовые конструкции. Точный расчет зависит от габаритов, материалов и сложности монтажа. Вы можете воспользоваться нашим онлайн-калькулятором для предварительной оценки.',
    sources: ['Pricing Guide 2026', 'Internal Rates Sheet']
  },
  {
    keywords: ['срок', 'время', 'когда', 'delivery', 'time', 'ready'],
    answer: 'Стандартный срок производства составляет 5-7 рабочих дней. Для сложных проектов с металлоконструкциями срок может быть увеличен до 15 дней. Мы предоставляем гарантию соблюдения сроков по договору.',
    sources: ['Production Standards', 'Client Contract Template']
  },
  {
    keywords: ['гарант', 'качество', 'warranty', 'quality'],
    answer: 'Мы предоставляем официальную гарантию 2 года на все конструкции и до 5 лет на светодиодные модули премиум-класса. Используем только сертифицированные материалы (акрил Plexiglas, ПВХ Kommerling).',
    sources: ['Quality Assurance Policy', 'Material Certifications']
  },
  {
    keywords: ['монтаж', 'установк', 'install'],
    answer: 'Монтажная служба Expoint ADV работает круглосуточно. Мы имеем все необходимые допуски СРО и лицензии для работы на высоте. Возможен монтаж в день готовности изделия.',
    sources: ['Safety Protocols', 'Installation Manual']
  }
];

export async function queryKnowledgeBase(
  query: string,
  context?: Record<string, unknown>
): Promise<QueryResponse> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const normalizedQuery = query.toLowerCase();
  const match = KNOWLEDGE_BASE.find(item => 
    item.keywords.some(keyword => normalizedQuery.includes(keyword))
  );

  if (match) {
    return {
      answer: match.answer,
      sources: match.sources
    };
  }
  
  return {
    answer: `К сожалению, в текущей базе знаний нет прямого ответа на запрос "${query}". Наш эксперт свяжется с вами для уточнения деталей. В целом, Expoint ADV специализируется на премиальном производстве наружной рекламы и навигационных систем.`,
    sources: ["General Company Profile"]
  };
}
