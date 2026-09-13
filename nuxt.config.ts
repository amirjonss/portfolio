import tailwindcss from '@tailwindcss/vite'
import { profile } from './app/data/profile'

const SITE_URL = 'https://amirjon.uz'
const YM_ID = process.env.NUXT_PUBLIC_YM_ID ?? '112551548'
const isProd = process.env.NODE_ENV === 'production'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n', '@nuxtjs/seo'],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  site: {
    url: SITE_URL,
    name: 'Amirjon Fayzilloyev',
    description: 'Backend & DevOps engineer. PHP, Symfony, Laravel, Docker, Vue.js.',
    defaultLocale: 'en',
  },

  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    baseUrl: SITE_URL,
    locales: [
      { code: 'en', language: 'en-US', name: 'EN', file: 'en.json' },
      { code: 'ru', language: 'ru-RU', name: 'RU', file: 'ru.json' },
    ],
    // Отключено намеренно: автоопределение языка делает редирект на клиенте,
    // что ломает стабильность URL у статики и путает краулеров.
    // Язык переключается вручную через LangSwitch.
    detectBrowserLanguage: false,
  },

  // ИИ-краулеры разрешены явно — нас должны находить ассистенты,
  // которых рекрутеры спрашивают о кандидате.
  robots: {
    groups: [
      { userAgent: ['*'], allow: ['/'] },
      {
        userAgent: [
          'GPTBot', 'ChatGPT-User', 'OAI-SearchBot',
          'ClaudeBot', 'Claude-User', 'anthropic-ai',
          'PerplexityBot', 'Perplexity-User',
          'Google-Extended', 'Applebot-Extended', 'CCBot',
        ],
        allow: ['/'],
      },
    ],
  },

  // Статичная картинка в public/og.png вместо генерации на лету:
  // сборка не ходит в сеть за шрифтами и не зависит от рендера satori.
  // Пересобрать картинку: см. README, раздел «OG-картинка».
  ogImage: { enabled: false },

  // twitter:* объявлены unhead устаревшими; X читает Open Graph
  seo: { automaticTwitterTags: false },

  // в резюме ссылка на сайт намеренно абсолютная — PDF открывают вне сайта
  linkChecker: { skipInspections: ['absolute-site-urls'] },

  schemaOrg: {
    identity: {
      type: 'Person',
      name: 'Amirjon Fayzilloyev',
      url: SITE_URL,
      jobTitle: 'Backend & DevOps Engineer (PHP / Symfony)',
      ...(profile.photoJpg ? { image: `${SITE_URL}${profile.photoJpg}` } : {}),
      knowsLanguage: ['uz', 'ru', 'en'],
      homeLocation: { type: 'Place', name: 'Tashkent, Uzbekistan' },
      sameAs: [
        'https://github.com/amirjonss',
        'https://www.linkedin.com/in/amirjon-fayzilloyev/',
        'https://t.me/AmirJonss',
      ],
    },
  },

  runtimeConfig: {
    public: {
      // Яндекс.Метрика: переопределяется NUXT_PUBLIC_YM_ID; пусто — не грузится
      ymId: YM_ID,
      // Cloudflare Web Analytics: NUXT_PUBLIC_CF_BEACON_TOKEN в .env
      cfBeaconToken: '',
    },
  },

  app: {
    head: {
      // lang НЕ задаём: его выставляет i18n под каждую локаль
      // %s без суффикса: имя уже внутри заголовков страниц
      titleTemplate: '%s',
      link: [{ rel: 'icon', href: '/favicon.ico' }],
      // Загрузчик Метрики — в статичном HTML, как просит Яндекс. init и хиты — в
      // app/plugins/analytics.client.ts. В dev не подключается.
      ...(isProd && YM_ID
        ? {
            script: [
              { innerHTML: `window.ym=window.ym||function(){(window.ym.a=window.ym.a||[]).push(arguments)};window.ym.l=1*new Date();`, tagPosition: 'head' },
              { src: `https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}`, async: true, tagPosition: 'head' },
            ],
            noscript: [{ innerHTML: `<div><img src="https://mc.yandex.ru/watch/${YM_ID}" style="position:absolute;left:-9999px" alt=""></div>`, tagPosition: 'bodyOpen' }],
          }
        : {}),
      meta: [
        { name: 'theme-color', content: '#0d0d0f' },
        { property: 'og:image', content: `${SITE_URL}/og.png` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Amirjon Fayzilloyev — Backend & DevOps Engineer' },
      ],
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/ru', '/cv', '/ru/cv'],
    },
  },
})
