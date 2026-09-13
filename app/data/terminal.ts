/**
 * Сценарий терминала в hero.
 *
 * ВАЖНО: этот файл попадает в клиентский бандл и читается любым через DevTools.
 * Здесь не должно быть ничего настоящего из инфраструктуры — реальных IP,
 * хостнеймов, портов, путей к конфигам, адресов реестра и бакетов.
 * Всё вымышленное: srv-01, registry.local, s3://backups.
 *
 * TODO: цифры в сценах 3-4 — заглушки. Заменить на реальные, когда проекты
 * будут развёрнуты. Ложные метрики проверяются на собеседовании одним вопросом.
 */

export type LineKind =
  | 'cmd'   // команда — печатается посимвольно
  | 'out'   // обычный вывод
  | 'note'  // комментарий шага, приглушённый
  | 'ok'    // успешный результат, акцентный цвет
  | 'name'  // имена контейнеров/сервисов
  | 'gap'   // пустая строка

export interface TerminalLine {
  kind: LineKind
  text?: string
  /** пауза после строки, мс (для 'cmd' не используется) */
  pause?: number
}

export interface TerminalScene {
  id: string
  lines: TerminalLine[]
}

const gap = (pause = 90): TerminalLine => ({ kind: 'gap', pause })

export const scenes: TerminalScene[] = [
  {
    id: 'whoami',
    lines: [
      { kind: 'cmd', text: 'systemctl status amirjon.service' },
      gap(60),
      { kind: 'ok', text: '● amirjon.service — Backend & DevOps Engineer', pause: 420 },
      { kind: 'out', text: '     Loaded: loaded (/home/amirjon/career.service; enabled)', pause: 260 },
      { kind: 'out', text: '     Active: active (running) since 2022; 4 years', pause: 260 },
      { kind: 'out', text: '   Main PID: 2022 (php-fpm, symfony)', pause: 260 },
      { kind: 'name', text: '      Tasks: 3 services in production', pause: 300 },
      { kind: 'out', text: '     CGroup: └─ PHP · Symfony · Laravel · Docker · Vue.js', pause: 300 },
      gap(),
      { kind: 'ok', text: '  amirjon[2022]: status — open to offers', pause: 900 },
      gap(),
    ],
  },
  {
    id: 'deploy',
    lines: [
      { kind: 'cmd', text: 'make deploy' },
      { kind: 'note', text: '// composer install --no-dev --optimize-autoloader', pause: 420 },
      { kind: 'ok', text: '  [OK] 214 packages, autoloader optimized', pause: 460 },
      gap(),
      { kind: 'note', text: '// vendor/bin/phpunit', pause: 420 },
      { kind: 'ok', text: '  [OK] 186 tests, 402 assertions — 0 failures   (4.1s)', pause: 520 },
      gap(),
      { kind: 'note', text: '// docker build -t billing-api:v2.4.1', pause: 420 },
      { kind: 'ok', text: '  [OK] image 92 MB — multi-stage, php:8.4-fpm-alpine', pause: 500 },
      gap(),
      { kind: 'note', text: '// rolling update, zero downtime', pause: 380 },
      { kind: 'out', text: '  replica 1/3  healthy', pause: 300 },
      { kind: 'out', text: '  replica 2/3  healthy', pause: 300 },
      { kind: 'out', text: '  replica 3/3  healthy', pause: 340 },
      { kind: 'ok', text: '  [OK] deployed in 41s', pause: 900 },
      gap(),
    ],
  },
  {
    id: 'ps',
    lines: [
      { kind: 'cmd', text: 'docker ps --format "table {{.Names}}\\t{{.Status}}"' },
      { kind: 'out', text: 'NAMES           STATUS', pause: 240 },
      { kind: 'name', text: 'billing-api     Up 12 days (healthy)', pause: 260 },
      { kind: 'name', text: 'crm-lite        Up 31 days (healthy)', pause: 260 },
      { kind: 'name', text: 'tg-notifier     Up 7 days (healthy)', pause: 900 },
      gap(),
    ],
  },
  {
    id: 'metrics',
    lines: [
      { kind: 'cmd', text: 'curl -s srv-01:9090/metrics | grep -E "p95|error|uptime"' },
      { kind: 'out', text: '  http_request_duration_p95     42ms', pause: 320 },
      { kind: 'out', text: '  php_fpm_active_workers        6 / 32', pause: 320 },
      { kind: 'ok', text: '  error_rate_5m                 0.00%', pause: 360 },
      { kind: 'ok', text: '  uptime_30d                    99.98%', pause: 900 },
      gap(),
    ],
  },
  {
    id: 'commit',
    lines: [
      { kind: 'cmd', text: 'git commit -m "fix(billing): release pool on webhook retry"' },
      { kind: 'out', text: '[main 7f3a91c] 2 files changed, 31 insertions(+), 8 deletions(-)', pause: 420 },
      gap(),
      { kind: 'cmd', text: 'git push origin main' },
      { kind: 'note', text: '  → pipeline started: lint → phpstan → tests → build', pause: 480 },
      { kind: 'ok', text: '  [OK] all stages green', pause: 900 },
      gap(),
    ],
  },
  {
    id: 'cron',
    lines: [
      { kind: 'cmd', text: 'crontab -l' },
      { kind: 'out', text: '0 3 * * *   /opt/scripts/pg_backup.sh --encrypt --s3', pause: 420 },
      gap(),
      { kind: 'cmd', text: 'tail -n 2 /var/log/backup.log' },
      { kind: 'out', text: '[03:00:07] pg_dump 2.4 GB → s3://backups/ ok', pause: 340 },
      { kind: 'ok', text: '[03:00:12] checksum verified · retention 30d', pause: 1000 },
      gap(),
    ],
  },
]
