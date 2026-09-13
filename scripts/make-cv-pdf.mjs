/**
 * Собирает PDF-резюме из страницы /cv (оба языка) в print-режиме.
 *   npm run generate && npm run cv:pdf && npm run generate
 * PDF кладётся в public/, поэтому нужна повторная сборка. Есть `npm run build:all`.
 */
import { chromium } from 'playwright-core'
import { spawn } from 'node:child_process'
import { existsSync, statSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = resolve(root, '.output/public')
if (!existsSync(resolve(out, 'cv/index.html'))) {
  console.error('Нет .output/public/cv — сначала npm run generate'); process.exit(1)
}

const PORT = 4179
const server = spawn('npx', ['--yes', 'serve', out, '-l', String(PORT)], { stdio: 'ignore' })
const wait = async () => {
  for (let i = 0; i < 40; i++) {
    try { if ((await fetch(`http://localhost:${PORT}/cv`)).ok) return } catch {}
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error('serve не поднялся')
}

const CHROME = ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(existsSync)

try {
  await wait()
  const browser = await chromium.launch({ executablePath: CHROME })
  for (const [lang, path] of [['en', '/cv'], ['ru', '/ru/cv']]) {
    const page = await browser.newPage()
    await page.goto(`http://localhost:${PORT}${path}`, { waitUntil: 'networkidle' })
    await page.emulateMedia({ media: 'print' })
    const file = resolve(root, `public/cv-${lang}.pdf`)
    await page.pdf({ path: file, format: 'A4', printBackground: false, preferCSSPageSize: true })
    console.log(`✔ cv-${lang}.pdf  ${Math.round(statSync(file).size / 1024)} КБ`)
    await page.close()
  }
  await browser.close()
} finally {
  server.kill()
}
