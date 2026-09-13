/**
 * Cloudflare Web Analytics — без кук, без баннера согласия.
 * Токен берётся из NUXT_PUBLIC_CF_BEACON_TOKEN; пока он пуст,
 * скрипт не подключается вовсе. В dev не грузится никогда.
 */
export default defineNuxtPlugin(() => {
  if (import.meta.dev) return

  const token = useRuntimeConfig().public.cfBeaconToken
  if (!token) return

  useHead({
    script: [
      {
        src: 'https://static.cloudflareinsights.com/beacon.min.js',
        defer: true,
        'data-cf-beacon': JSON.stringify({ token }),
      },
    ],
  })
})
