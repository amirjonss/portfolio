<script setup lang="ts">
import { profile } from '~/data/profile'

const { t } = useI18n()

/** факты для HR в одну строку — данные из profile.ts, подписи из i18n */
const facts = computed(() => [
  t('profile.location', { city: t('profile.city'), tz: profile.location.timezone }),
  ...profile.workFormat.map((f) => t(`profile.workFormat.${f}`)),
  t('profile.english', { level: profile.english }),
  t(`profile.availability.${profile.availability}`),
  profile.languages.map((l) => l.code.toUpperCase()).join(' · '),
])
</script>

<template>
  <div class="border-y border-line/60 bg-panel/40">
    <ul
      class="mx-auto flex max-w-6xl flex-wrap items-center gap-x-2 gap-y-2 px-5 py-4 text-sm text-muted sm:px-8"
      :aria-label="$t('cv.factsTitle')"
    >
      <li v-for="(fact, i) in facts" :key="i" class="flex items-center gap-2">
        <span v-if="i" class="text-dim" aria-hidden="true">·</span>
        <span :class="i === 3 || i === 4 ? 'text-ink' : ''">{{ fact }}</span>
      </li>
    </ul>
  </div>
</template>
