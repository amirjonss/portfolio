/**
 * Снимает скриншоты живых демо для карточек проектов.
 *   node scripts/capture-projects.mjs
 * Результат: public/projects/<id>-<n>.webp (1600px, ~100–200 КБ).
 * Требует playwright-core (есть в devDependencies), локальный Chrome и cwebp.
 */
import { chromium } from 'playwright-core'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const OUT = new URL('../public/projects/', import.meta.url).pathname
const tmp = mkdtempSync(join(tmpdir(), 'shots-'))

const browser = await chromium.launch({ executablePath: CHROME })
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  locale: 'ru-RU',
  colorScheme: 'dark',   // приложения с системной темой — в тёмной, под сайт
})

async function shot(page, name) {
  const png = join(tmp, `${name}.png`)
  await page.screenshot({ path: png })
  execFileSync('cwebp', ['-quiet', '-q', '82', '-resize', '1600', '0', png, '-o', join(OUT, `${name}.webp`)])
  console.log('✔', name)
}

// ---------- warehouse ----------
{
  const page = await ctx.newPage()
  await page.goto('https://portfolio.front.warehouse.amirjon.uz/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Админ', exact: true }).click()
  await page.waitForSelector('text=Продажи по дням', { timeout: 30000 })
  await page.waitForTimeout(2500)
  for (const b of await page.getByRole('button', { name: '30д' }).all()) await b.click()
  await page.waitForTimeout(2500)
  await shot(page, 'warehouse-1')

  await page.goto('https://portfolio.front.warehouse.amirjon.uz/reports/sales', { waitUntil: 'networkidle' })
  await page.waitForTimeout(2000)
  await page.getByRole('button', { name: 'По месяцам' }).click()
  await page.getByRole('button', { name: 'UZS', exact: true }).click()
  await page.waitForTimeout(3000)
  await shot(page, 'warehouse-2')
  await page.close()
}

// ---------- smm-crm ----------
{
  const page = await ctx.newPage()
  await page.goto('https://portfolio.front.smm-agency.amirjon.uz/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /Войти как Админ/ }).click()
  await page.waitForSelector('text=План на сегодня', { timeout: 30000 })
  await page.waitForTimeout(3500)
  await shot(page, 'smm-1')

  await page.goto('https://portfolio.front.smm-agency.amirjon.uz/boards', { waitUntil: 'networkidle' })
  await page.waitForTimeout(2000)
  await page.getByText('Board 1', { exact: true }).click()
  await page.waitForSelector('text=Добавить список', { timeout: 30000 })
  await page.waitForTimeout(2500)
  await shot(page, 'smm-2')

  await page.goto('https://portfolio.front.smm-agency.amirjon.uz/calendar', { waitUntil: 'networkidle' })
  await page.waitForTimeout(3500)
  await shot(page, 'smm-3')
  await page.close()
}

// ---------- blender ----------
{
  const page = await ctx.newPage()
  await page.goto('https://portfolio.front.blender.amirjon.uz/portfolio', { waitUntil: 'networkidle' })
  await page.waitForTimeout(4000)
  await shot(page, 'blender-1')
  await page.goto('https://portfolio.front.blender.amirjon.uz/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(3000)
  await shot(page, 'blender-2')
  await page.close()
}

// ---------- renthouse ----------
{
  const page = await ctx.newPage()
  await page.goto('https://portfolio.front.renthouse.amirjon.uz/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(4000)
  await shot(page, 'renthouse-1')
  await page.close()
}

await browser.close()
rmSync(tmp, { recursive: true, force: true })
