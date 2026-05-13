import type { ContentEvidenceClaim } from '@/lib/knowledge/types';

export interface Rule902PP {
  id: string;
  category: 'dimensions' | 'location' | 'placement' | 'materials';
  title: string;
  description: string;
  isAllowed: boolean;
  maxDimensions?: {
    height?: number; // meters
    length?: number; // meters
  };
  evidence: ContentEvidenceClaim & {
    last_verified_at: string;
    owner: string;
  };
}

export const rules902PP: Rule902PP[] = [
  {
    id: 'rule-height-limit',
    category: 'dimensions',
    title: 'Ограничение по высоте',
    description: 'Высота информационного поля настенной конструкции (вывески) не должна превышать 0,5 м.',
    isAllowed: true,
    maxDimensions: { height: 0.5 },
    evidence: {
      source_doc_id: 'NB-006',
      claim: 'Высота настенной вывески ограничивается 0,5 м в базовом сценарии.',
      evidence_snippet: 'Wall-mounted information signage height limit: 0.5 m in standard urban context.',
      last_verified_at: '2026-05-12',
      owner: 'legal-team',
    },
  },
  {
    id: 'rule-length-limit',
    category: 'dimensions',
    title: 'Ограничение по длине',
    description: 'Длина вывески не должна превышать 70% от длины фасада (максимум 15 м).',
    isAllowed: true,
    maxDimensions: { length: 15 },
    evidence: {
      source_doc_id: 'NB-006',
      claim: 'Длина вывески ограничена 70% фасада и 15 метрами для единичной конструкции.',
      evidence_snippet: 'Signage length must be within 70% facade width with 15m absolute cap.',
      last_verified_at: '2026-05-12',
      owner: 'legal-team',
    },
  },
  {
    id: 'rule-historic-center',
    category: 'location',
    title: 'Исторический центр',
    description: 'Запрещены световые короба (лайтбоксы). Разрешены только отдельно стоящие объемные буквы без подложки.',
    isAllowed: false,
    evidence: {
      source_doc_id: 'NB-007',
      claim: 'В историческом центре требуется более строгий формат конструкции без глухой подложки.',
      evidence_snippet: 'Historic district signage excludes solid lightboxes; channel letters preferred.',
      last_verified_at: '2026-05-12',
      owner: 'legal-team',
    },
  },
  {
    id: 'rule-balcony-placement',
    category: 'placement',
    title: 'Размещение на балконах',
    description: 'Полностью запрещено размещение информационных конструкций на балконах, лоджиях и эркерах.',
    isAllowed: false,
    evidence: {
      source_doc_id: 'NB-008',
      claim: 'Балконы и архитектурные элементы исключены из разрешенных зон размещения.',
      evidence_snippet: 'Balconies, loggias, and bay windows are prohibited signage locations.',
      last_verified_at: '2026-05-12',
      owner: 'legal-team',
    },
  },
  {
    id: 'rule-overlap-windows',
    category: 'placement',
    title: 'Перекрытие окон',
    description: 'Запрещено перекрытие оконных проемов, витражей и витрин вывесками.',
    isAllowed: false,
    evidence: {
      source_doc_id: 'NB-018',
      claim: 'Перекрытие окон относится к высокому юридическому риску и штрафным кейсам.',
      evidence_snippet: 'Window overlap violations are in the high-penalty compliance cluster.',
      last_verified_at: '2026-05-12',
      owner: 'legal-team',
    },
  },
];
