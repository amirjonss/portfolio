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
```

## Что где лежит

| Путь | Что это |
|---|---|
| `app/data/projects.ts` | **Единственный** источник данных о проектах, контактах и стеке |
| `i18n/locales/{en,ru}.json` | Весь текст сайта. В коде текста нет |
| `app/data/terminal.ts` | Сценарий терминала в hero |
| `app/composables/useTerminalPlayer.ts` | Движок печати: пауза за экраном, reduced-motion |
| `public/llms.txt` | Выжимка о сайте для языковых моделей |
| `scripts/og-card.html` | Шаблон картинки превью |

## Заменить проекты-заглушки на реальные

Сейчас на сайте три вымышленных проекта (`placeholder: true` в
`app/data/projects.ts`). Чтобы поставить настоящие, править нужно
**в четырёх местах**:

1. `app/data/projects.ts` — id, стек, ссылки на репозиторий и демо, год
2. `i18n/locales/en.json` и `ru.json` — ключи `projects.items.<id>`:
   название, подзаголовок, задача, роль, сложность
3. `public/llms.txt` — раздел `## Projects`
4. `app/data/terminal.ts` — имена контейнеров в сцене `ps`, чтобы терминал
   и карточки не расходились

Скриншоты проектов положить в `public/` и подставить в `ProjectCard.vue`
вместо заглушки с именем контейнера.

## Правда в цифрах

Метрики в терминале (`186 tests`, `Up 12 days`, `99.98%`) — декорация под
вымышленные проекты. Заменить на реальные до публикации: цифры, которые
нельзя защитить на собеседовании, стоят дороже, чем ничего.

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
