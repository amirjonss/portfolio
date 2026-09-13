/**
 * Единственный источник данных о проектах.
 * Отсюда рендерятся карточки, разметка Schema.org и терминал в hero.
 *
 * Тексты (название, задача, роль, сложность) — в i18n/locales/{en,ru}.json
 * под ключом `projects.items.<id>`; здесь только структура, ссылки и стек.
 * public/llms.txt дублирует этот список для языковых моделей — при
 * изменениях править и его.
 */

export interface ProjectLinks {
  /** живой фронт — открывается в новой вкладке */
  demo: string | null
  /** корень API (JSON-LD / Hydra) */
  api: string | null
  repoFront: string | null
  repoApi: string | null
}

export interface Project {
  id: string
  /** имена контейнеров — совпадают со сценой `docker ps` в терминале */
  containers: string[]
  period: string
  /** кадры из public/projects, первый — главный */
  images: string[]
  /** для alt-текста и превью */
  imageAlt: string
  stack: {
    backend?: string[]
    frontend: string[]
    infra?: string[]
  }
  links: ProjectLinks
  /** в демо есть кнопка входа одним кликом — пароль не нужен */
  quickLogin: boolean
}

const GH = 'https://github.com/amirjonss'

export const projects: Project[] = [
  {
    id: 'warehouse',
    containers: ['warehouse-api', 'warehouse-front'],
    period: '2026',
    images: ['/projects/warehouse-1.webp', '/projects/warehouse-2.webp'],
    imageAlt: 'Wirehouse dashboard: stock, client debt, cash on hand, sales and expenses per day',
    stack: {
      backend: ['PHP 8.3', 'Symfony 7.3', 'API Platform 4', 'Doctrine ORM 3', 'PostgreSQL 15', 'JWT', 'PHPUnit'],
      frontend: ['Vue 3', 'Pinia', 'Tailwind 4', 'Vite', 'Capacitor', 'Electron', 'ESC/POS'],
      infra: ['Docker', 'Nginx'],
    },
    links: {
      demo: 'https://portfolio.front.warehouse.amirjon.uz',
      api: 'https://portfolio.api.warehouse.amirjon.uz/api',
      repoFront: `${GH}/warehouse-front`,
      repoApi: `${GH}/warehouse-api`,
    },
    quickLogin: true,
  },
  {
    id: 'smm-crm',
    containers: ['smm-crm-api', 'smm-crm-front', 'mercure', 'redis'],
    period: '2025 — 2026',
    images: ['/projects/smm-2.webp', '/projects/smm-3.webp', '/projects/smm-1.webp'],
    imageAlt: 'KH Agency CRM: kanban board with four lists and cards assigned to executors',
    stack: {
      backend: ['PHP 8.2', 'Symfony 7.4', 'API Platform 4', 'MariaDB 11', 'Redis 7', 'Mercure', 'Messenger', 'JWT'],
      frontend: ['Vue 3', 'Quasar 2', 'Pinia', 'vue-i18n', 'vuedraggable', 'jsPDF'],
      infra: ['Docker', 'Nginx', 'Telegram Bot API'],
    },
    links: {
      demo: 'https://portfolio.front.smm-agency.amirjon.uz',
      api: 'https://portfolio.api.smm-agency.amirjon.uz/api',
      repoFront: `${GH}/smm-crm-front`,
      repoApi: `${GH}/smm-crm-api`,
    },
    quickLogin: true,
  },
  {
    id: 'blender-course',
    containers: ['blender-front'],
    period: '2022 — 2024',
    images: ['/projects/blender-1.webp', '/projects/blender-2.webp'],
    imageAlt: 'Blender course site: portfolio gallery of 3D scenes with YouTube previews',
    stack: {
      frontend: ['Vue 3', 'Quasar 2', 'Pinia', 'vue-i18n', 'Swiper'],
      infra: ['Docker', 'Nginx'],
    },
    links: {
      demo: 'https://portfolio.front.blender.amirjon.uz',
      api: null,
      repoFront: `${GH}/blender-course-front`,
      repoApi: null,
    },
    quickLogin: false,
  },
  {
    id: 'renthouse',
    containers: ['renthouse-front'],
    period: '2022',
    images: ['/projects/renthouse-1.webp'],
    imageAlt: 'Renthouse: full-screen cottage photo with a price card, catalogue below',
    stack: {
      frontend: ['Vue 3', 'Quasar 2', 'Pinia', 'vue-i18n', 'Google Maps'],
      infra: ['Docker', 'Nginx'],
    },
    links: {
      demo: 'https://portfolio.front.renthouse.amirjon.uz',
      api: null,
      repoFront: `${GH}/renthouse-front`,
      repoApi: null,
    },
    quickLogin: false,
  },
]

export const contacts = {
  email: 'fayzullayev.amir@gmail.com',
  github: GH,
  githubHandle: 'amirjonss',
  telegram: 'https://t.me/AmirJonss',
  telegramHandle: '@AmirJonss',
  linkedin: 'https://www.linkedin.com/in/amirjon-fayzilloyev/',
  linkedinHandle: 'amirjon-fayzilloyev',
} as const

export const stackGroups = [
  { id: 'lang', items: ['PHP 8.x', 'JavaScript', 'TypeScript', 'SQL', 'Bash'] },
  { id: 'backend', items: ['Symfony 7', 'API Platform 4', 'Doctrine ORM', 'Laravel', 'Messenger', 'Mercure', 'JWT'] },
  { id: 'frontend', items: ['Vue 3', 'Quasar 2', 'Nuxt 4', 'Pinia', 'Tailwind 4', 'Vite', 'Capacitor', 'Electron'] },
  { id: 'data', items: ['PostgreSQL', 'MariaDB / MySQL', 'Redis', 'RabbitMQ'] },
  { id: 'ops', items: ['Docker Compose', 'Nginx', 'Linux', 'GitLab CI', 'GitHub Actions', 'Telegram Bot API'] },
  { id: 'quality', items: ['PHPUnit', 'PHPStan', 'PHP CS Fixer', 'ESLint', 'Prettier'] },
] as const
