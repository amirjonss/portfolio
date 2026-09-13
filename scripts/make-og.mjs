/**
 * Пересобирает public/og.png — картинку для превью ссылки в соцсетях
 * и мессенджерах. Шаблон: scripts/og-card.html.
 *
 *   npm run og
 *
 * Рендерит локальным Chrome, поэтому сборка сайта в сеть не ходит.
 */
import { chromium } from 'playwright-core'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { existsSync } from 'node:fs'

const here = dirname(fileURLToPath(import.meta.url))
const template = resolve(here, 'og-card.html')
const output = resolve(here, '..', 'public', 'og.png')

const CHROME_CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
]

const executablePath = CHROME_CANDIDATES.find((p) => existsSync(p))
if (!executablePath) {
  console.error('Chrome не найден. Укажите путь в CHROME_CANDIDATES.')
  process.exit(1)
}

const browser = await chromium.launch({ executablePath })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.goto(`file://${template}`, { waitUntil: 'load' })
await page.screenshot({ path: output })
await browser.close()

console.log(`✔ ${output}`)
