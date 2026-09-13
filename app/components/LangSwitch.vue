<script setup lang="ts">
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()
const { goal } = useAnalytics()

const options = computed(() =>
  (locales.value as { code: string; name?: string }[]).map((l) => ({
    code: l.code,
    name: l.name ?? l.code.toUpperCase(),
  })),
)

// сохраняем текущий якорь при переключении языка
const pathFor = (code: string) => `${switchLocalePath(code)}${route.hash}`
</script>

<template>
  <div
    class="flex items-center gap-1 rounded-lg border border-line p-0.5"
    :aria-label="t('nav.switchLang')"
  >
    <NuxtLink
      v-for="option in options"
      :key="option.code"
      :to="pathFor(option.code)"
      @click="option.code !== locale && goal('lang_switch', { to: option.code })"
      class="rounded-md px-2 py-1 font-mono text-xs transition-colors"
      :class="
        option.code === locale
          ? 'bg-line-soft text-ink'
          : 'text-dim hover:text-ink'
      "
      :aria-current="option.code === locale ? 'true' : undefined"
    >
      {{ option.name }}
    </NuxtLink>
  </div>
</template>
