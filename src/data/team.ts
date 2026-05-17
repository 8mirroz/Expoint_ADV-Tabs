import type { LocalizedText } from '@/i18n/site';

export interface TeamMember {
  id: string;
  name: LocalizedText;
  role: LocalizedText;
  description: LocalizedText;
  imageUrl?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'director',
    name: { ru: 'Алексей Петров', en: 'Alexey Petrov' },
    role: { ru: 'Генеральный директор', en: 'CEO' },
    description: { ru: '15 лет в отрасли наружной рекламы. Руководит стратегическим развитием и крупными проектами.', en: '15 years in outdoor advertising. Leads strategic development and major projects.' },
    imageUrl: '/img/team/team_alexey_1779023742436.png',
  },
  {
    id: 'chief-engineer',
    name: { ru: 'Марина Козлова', en: 'Marina Kozlova' },
    role: { ru: 'Главный инженер', en: 'Chief Engineer' },
    description: { ru: 'Отвечает за техническое проектирование, расчёт нагрузок и контроль производства.', en: 'Responsible for technical design, load calculations, and production control.' },
    imageUrl: '/img/team/team_marina_1779023758743.png',
  },
  {
    id: 'designer',
    name: { ru: 'Дарья Волкова', en: 'Daria Volkova' },
    role: { ru: 'Арт-директор', en: 'Art Director' },
    description: { ru: 'Создаёт визуальные концепции и 3D-макеты. Обеспечивает соответствие брендбуку клиента.', en: 'Creates visual concepts and 3D mockups. Ensures brand book compliance.' },
    imageUrl: '/img/team/team_daria_1779029443616.png',
  },
  {
    id: 'production',
    name: { ru: 'Сергей Николаев', en: 'Sergey Nikolaev' },
    role: { ru: 'Начальник производства', en: 'Production Manager' },
    description: { ru: 'Управляет цехом: ЧПУ-фрезеровка, лазерная резка, сборка и покраска.', en: 'Manages the workshop: CNC milling, laser cutting, assembly, and painting.' },
    imageUrl: '/img/team/team_sergey_1779027280572.png',
  },
];
