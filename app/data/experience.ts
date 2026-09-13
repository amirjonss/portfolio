/**
 * Опыт работы — структура. Тексты (должность, описание, пункты) —
 * в i18n/locales/{en,ru}.json под ключом `path.items.<id>`.
 * Источник: профиль LinkedIn. Порядок здесь — хронологический;
 * страница /cv показывает его в обратном порядке.
 */

export interface Experience {
  id: string
  company: string
  companyUrl: string | null
  from: string
  /** null = по настоящее время */
  to: string | null
  /** ключ для i18n: fulltime | parttime | contract */
  type: 'fulltime' | 'parttime' | 'contract'
  remote: boolean
  tech: string[]
}

export const experience: Experience[] = [
  {
    id: 'kadirov-group',
    company: 'The Kadirov Group',
    companyUrl: 'https://boshqar.com',
    from: '2022-01',
    to: '2024-07',
    type: 'fulltime',
    remote: true,
    tech: ['PHP', 'Symfony', 'API Platform', 'Vue.js', 'Redis', 'Elasticsearch', 'MySQL'],
  },
  {
    id: 'kadirov-academy',
    company: 'KadirovDev IT Academy',
    companyUrl: 'https://kadirov.dev',
    from: '2022-01',
    to: '2024-07',
    type: 'parttime',
    remote: true,
    tech: ['PHP', 'JavaScript', 'Symfony', 'API Platform', 'Vue.js', 'MySQL', 'Git', 'Linux'],
  },
  {
    id: 'joolpay',
    company: 'JooL Pay',
    companyUrl: 'https://joolpay.com',
    from: '2024-10',
    to: '2025-04',
    type: 'fulltime',
    remote: true,
    tech: ['PHP', 'Docker', 'PHPUnit', 'Payments API'],
  },
  {
    id: 'kh-agency',
    company: 'KH Agency',
    companyUrl: 'https://portfolio.front.smm-agency.amirjon.uz',
    from: '2025-10',
    to: null,
    type: 'contract',
    remote: true,
    tech: ['Symfony 7', 'API Platform', 'Messenger', 'Redis', 'Vue.js', 'Docker', 'GitLab CI', 'Ubuntu'],
  },
]
