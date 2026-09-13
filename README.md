# amirjon.uz — портфолио

Статический двуязычный сайт на Nuxt 4. Собирается в обычные HTML-файлы
и кладётся на nginx рядом с демо проектов.

- Английский — `/`, русский — `/ru/`
- Hero с автономным терминалом (6 сцен по кругу)
- SEO: sitemap, hreflang, JSON-LD, `llms.txt`, доступ для ИИ-краулеров

## Команды

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # статика в .output/public
npx serve .output/public   # посмотреть собранное
npm run og         # пересобрать картинку превью public/og.png
npm run shots      # переснять скриншоты демо в public/projects/
npm run cv:pdf     # собрать PDF-резюме из /cv (нужна готовая .output)
npm run build:all  # generate → cv:pdf → generate — полная сборка к выкладке
```

## Что где лежит

| Путь | Что это |
|---|---|
| `app/data/profile.ts` | Факты для HR: локация, формат, английский, выход, языки, фото, PDF |
| `app/data/experience.ts` | Опыт работы (структура), тексты в локалях `path.items.*` |
| `app/data/education.ts` | Образование и сертификаты; секция появляется, когда массив непуст |
| `app/data/projects.ts` | **Единственный** источник данных о проектах, контактах и стеке |
| `public/projects/` | Скриншоты демо (WebP), см. `npm run shots` |
| `i18n/locales/{en,ru}.json` | Весь текст сайта. В коде текста нет |
| `app/data/terminal.ts` | Сценарий терминала в hero |
| `app/composables/useTerminalPlayer.ts` | Движок печати: пауза за экраном, reduced-motion |
| `public/llms.txt` | Выжимка о сайте для языковых моделей |
| `scripts/og-card.html` | Шаблон картинки превью |

## Проекты

Четыре реальных проекта, развёрнутых на поддоменах `portfolio.*.amirjon.uz`.
Добавить или изменить проект — править в трёх местах:

1. `app/data/projects.ts` — id, период, стек по группам, ссылки (демо, API, репозитории), кадры
2. `i18n/locales/en.json` и `ru.json` — ключи `projects.items.<id>`:
   название, подзаголовок, задача, роль, сложность
3. `public/llms.txt` — раздел `## Projects`

Имена контейнеров в сцене `docker ps` (`app/data/terminal.ts`) должны совпадать
с полем `containers`.

### Скриншоты

```bash
npm run shots
```

`scripts/capture-projects.mjs` заходит на живые демо (через кнопку быстрого входа,
пароль не вводится), снимает 1440×900 в 2x и кладёт WebP до 1600px в
`public/projects/`. Нужны локальный Chrome и `cwebp` (`brew install webp`).
Какие экраны снимать — прописано в скрипте; при изменении интерфейса демо
поправить селекторы там.

## Фото

Оригинал — `src-assets/me.png` (в git и сборку не идёт). На сайте:
`public/me.webp` (480px, hero и /cv) и `public/me.jpg` (320px — JSON-LD и
OG-карточка). Пути включены в `app/data/profile.ts`; поставить `null` —
вернутся инициалы.

Заменить фото: положить новый оригинал в `src-assets/`, обрезать в квадрат
по лицу и пересобрать:

```bash
sips --cropOffset <сверху> 0 -c <сторона> <сторона> src-assets/me.png --out /tmp/me-sq.png
cwebp -q 85 -resize 480 480 /tmp/me-sq.png -o public/me.webp
sips -Z 320 -s format jpeg /tmp/me-sq.png --out public/me.jpg
npm run og && npm run build:all
```

## PDF-резюме

`public/cv-{en,ru}.pdf` собираются из страницы `/cv` в print-режиме
(`@media print` в `app/pages/cv.vue`): одна колонка, светлый лист, без
шапки и кнопок — так их читают ATS. После любой правки текста резюме или
опыта — `npm run build:all`, иначе PDF отстанет от сайта.

## Образование

`app/data/education.ts`: `title`, `issuer`, `from`/`to` (YYYY-MM, `to: null` = в
процессе), `status`, `url`. Описание — в локалях `education.items.<id>.desc`.
Сейчас: School 21, Самарканд, с августа 2024, в процессе. Когда закончишь —
поставить `to` и `status: 'completed'`; сертификат добавить отдельной записью.

## Правда в цифрах

Метрики в сцене `metrics` терминала (`p95 42ms`, `99.98%`) — декорация.
Не выдавать за замеры. Имена контейнеров и команда в сцене `commit` — настоящие.

## Безопасность содержимого терминала

`app/data/terminal.ts` попадает в клиентский бандл и читается любым через
DevTools. Туда **нельзя** писать настоящие IP, хостнеймы, порты, пути к
конфигам, адреса реестра и бакетов, токены. Всё вымышленное:
`amirjon@srv-01`, `registry.local`, `s3://backups`.

То же правило для скриншотов проектов: проверить, что в кадр не попала
адресная строка с внутренним доменом.

## Аналитика

Cloudflare Web Analytics — без кук, баннер согласия не нужен.

1. Cloudflare → Analytics → Web Analytics → Add a site → `amirjon.uz`
2. Из выданного сниппета скопировать `token`
3. Положить в `.env`:

```
NUXT_PUBLIC_CF_BEACON_TOKEN=ваш_токен
```

Пока переменная пуста, скрипт аналитики не подключается вовсе.
В dev не грузится никогда.

Дальше по плану — свой сервис аналитики на Symfony и страница `/stats`,
которая берёт данные из него. Точка подключения: `app/plugins/analytics.client.ts`.

## Выкладка на свой сервер

```bash
npm run generate
rsync -avz --delete .output/public/ amirjon@СЕРВЕР:/var/www/amirjon.uz/
```

nginx:

```nginx
server {
    listen 443 ssl http2;
    server_name amirjon.uz www.amirjon.uz;

    root /var/www/amirjon.uz;
    index index.html;

    # Nuxt отдаёт /ru/index.html, /cv/index.html и 404.html
    location / {
        try_files $uri $uri/index.html $uri.html /404.html;
    }

    # хешированные ассеты можно кэшировать вечно
    location /_nuxt/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
}
```

Сертификат:

```bash
sudo certbot --nginx -d amirjon.uz -d www.amirjon.uz
```

### Демо проектов на поддоменах

Каждый проект — свой контейнер на своём порту, nginx проксирует:

```nginx
server {
    listen 443 ssl http2;
    server_name billing-api.amirjon.uz;

    location / {
        proxy_pass http://127.0.0.1:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Ссылку на поддомен положить в `demo` соответствующего проекта в
`app/data/projects.ts` — карточка сама заменит «Demo coming soon» на кнопку.

Для демо с авторизацией показывать тестовый логин и пароль прямо на
странице проекта.
