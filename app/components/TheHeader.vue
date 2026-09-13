<script setup lang="ts">
import { education } from '~/data/education'

const localePath = useLocalePath()

const sections = [
  'projects', 'stack', 'about', 'path',
  ...(education.length ? (['education'] as const) : []),
  'contact',
] as const
// якоря строятся от корня, чтобы шапка работала и со страницы /cv
const anchor = (id: string) => `${localePath('/')}#${id}`.replace('//#', '/#')
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-line/60 bg-bg/80 backdrop-blur-md"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
      <NuxtLink :to="localePath('/')" class="font-mono text-sm tracking-tight">
        amirjon<span class="text-accent">.uz</span>
      </NuxtLink>

      <nav class="hidden items-center gap-7 md:flex">
        <a
          v-for="id in sections"
          :key="id"
          :href="anchor(id)"
          class="text-sm text-muted transition-colors hover:text-ink"
        >
          {{ $t(`nav.${id}`) }}
        </a>
      </nav>

      <div class="flex items-center gap-3">
        <NuxtLink
          :to="localePath('/cv')"
          class="hidden rounded-lg border border-line px-3 py-1.5 text-sm text-ink transition-colors hover:border-dim sm:block"
        >
          {{ $t('nav.cv') }}
        </NuxtLink>
        <LangSwitch />
      </div>
    </div>
  </header>
</template>
