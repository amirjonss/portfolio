/**
 * Аналитика. Только в продакшене — в dev не грузится ничего.
 *
 * Яндекс.Метрика (NUXT_PUBLIC_YM_ID, по умолчанию счётчик сайта). Загрузчик
 * tag.js стоит в <head> через nuxt.config; здесь:
 *  - init с вебвизором и картой кликов;
 *  - хит на каждую смену маршрута — иначе в статическом SPA Метрика
 *    засчитает только первую страницу, а переходы / → /cv → /ru потеряет;
 *  - цели вызываются через useAnalytics().goal().
 *
 * Cloudflare Web Analytics (NUXT_PUBLIC_CF_BEACON_TOKEN) — без cookies,
 * страхует цифры, если Метрику блокируют. Пока токен пуст — не подключается.
 */
declare global {
  interface Window { ym?: (...args: unknown[]) => void }
}

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.dev) return

  const { ymId, cfBeaconToken } = useRuntimeConfig().public
  const router = useRouter()

  if (ymId) {
    const id = Number(ymId)
    // стаб-очередь и tag.js уже в <head> (nuxt.config); здесь только init и хиты
    if (!window.ym) return

    window.ym(id, 'init', {
      ssr: true,
      webvisor: true,
      clickmap: true,
      accurateTrackBounce: true,
      trackLinks: true,
      referrer: document.referrer,
      url: location.href,
    })

    // хит при каждом переходе внутри SPA. Первую загрузку не считаем —
    // её Метрика отправляет сама в init (from.matched пуст = стартовая навигация)
    router.afterEach((to, from) => {
      if (!from.matched.length || to.fullPath === from.fullPath) return
      nuxtApp.hooks.hookOnce('page:finish', () => {
        window.ym?.(id, 'hit', location.href, {
          title: document.title,
          referer: location.origin + from.fullPath,
        })
      })
    })
  }

  if (cfBeaconToken) {
    useHead({
      script: [{
        src: 'https://static.cloudflareinsights.com/beacon.min.js',
        defer: true,
        'data-cf-beacon': JSON.stringify({ token: cfBeaconToken }),
      }],
    })
  }
})
