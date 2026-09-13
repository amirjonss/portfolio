/**
 * Единственный источник данных о проектах.
 * Отсюда рендерятся карточки, разметка Schema.org (CreativeWork) и llms.txt.
 * Дублировать список где-либо ещё не нужно.
 *
 * Тексты (название, задача, роль, сложность) лежат в i18n/locales/{en,ru}.json
 * под ключом `projects.items.<id>` — здесь только структура и ссылки.
 *
 * ЗАГЛУШКИ: все три проекта временные (placeholder: true). При замене на
 * реальные — обновить этот файл, оба файла локалей, public/llms.txt
 * и имена контейнеров в сцене 'ps' файла app/data/terminal.ts.
 */

export interface Project {
  id: string
  /** имя контейнера — должно совпадать со сценой `docker ps` в терминале */
  container: string
  year: string
  stack: string[]
  repo: string | null
  demo: string | null
  status: 'live' | 'wip'
  placeholder: boolean
}

export const projects: Project[] = [
  {
    id: 'billing-api',
    container: 'billing-api',
    year: '2024',
    stack: ['PHP 8.4', 'Symfony', 'PostgreSQL', 'Docker', 'RabbitMQ'],
    repo: 'https://github.com/amirjonss',
    demo: null,
    status: 'live',
    placeholder: true,
  },
  {
    id: 'crm-lite',
    container: 'crm-lite',
    year: '2023',
    stack: ['PHP 8.3', 'Laravel', 'Vue 3', 'MySQL', 'Docker'],
    repo: 'https://github.com/amirjonss',
    demo: null,
    status: 'live',
    placeholder: true,
  },
  {
    id: 'tg-notifier',
    container: 'tg-notifier',
    year: '2023',
    stack: ['PHP 8.3', 'Symfony', 'RabbitMQ', 'Redis', 'Docker'],
    repo: 'https://github.com/amirjonss',
    demo: null,
    status: 'live',
    placeholder: true,
  },
]

export const contacts = {
  email: 'fayzullayev.amir@gmail.com',
  github: 'https://github.com/amirjonss',
  githubHandle: 'amirjonss',
  telegram: 'https://t.me/AmirJonss',
  telegramHandle: '@AmirJonss',
  linkedin: 'https://www.linkedin.com/in/amirjon-fayzilloyev/',
  linkedinHandle: 'amirjon-fayzilloyev',
} as const

export const stackGroups = [
  { id: 'lang', items: ['PHP 8.4', 'JavaScript', 'TypeScript', 'SQL', 'Bash'] },
  { id: 'frameworks', items: ['Symfony', 'Laravel', 'Vue 3', 'Nuxt'] },
  { id: 'data', items: ['PostgreSQL', 'MySQL', 'Redis', 'RabbitMQ'] },
  { id: 'ops', items: ['Docker', 'Docker Compose', 'Nginx', 'GitLab CI', 'GitHub Actions', 'Linux'] },
  { id: 'quality', items: ['PHPUnit', 'PHPStan', 'PHP CS Fixer', 'Xdebug'] },
] as const
