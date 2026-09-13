<script setup lang="ts">
import { education } from '~/data/education'

const { t, tm, rt } = useI18n()
const months = computed(() => (tm('path.months') as unknown[]).map((m) => rt(m as never)))
const fmt = (ym: string) => { const [y, m] = ym.split('-').map(Number); return `${months.value[(m ?? 1) - 1]} ${y}` }
const period = (from: string, to: string | null) => `${fmt(from)} — ${to ? fmt(to) : t('education.present')}`
</script>

<template>
  <!-- секция есть только когда есть что показать -->
  <section v-if="education.length" id="education" class="border-t border-line/60">
    <div class="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
      <SectionHead :title="$t('education.title')" :subtitle="$t('education.subtitle')" />

      <RevealOnScroll>
        <ul class="grid gap-4 sm:grid-cols-2">
          <li
            v-for="item in education"
            :key="item.id"
            class="flex flex-col rounded-xl border border-line bg-panel p-5 sm:p-6"
          >
            <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p class="font-mono text-xs" :class="item.to ? 'text-dim' : 'text-accent'">
                {{ period(item.from, item.to) }}
              </p>
              <span
                class="rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-wide uppercase"
                :class="item.status === 'in-progress' ? 'border-accent/30 text-accent' : 'border-line text-dim'"
              >
                {{ $t(`education.status.${item.status}`) }}
              </span>
            </div>
            <h3 class="mt-2 text-lg font-semibold tracking-tight">{{ item.title }}</h3>
            <p class="text-sm text-muted">{{ item.issuer }}</p>
            <p class="mt-3 text-sm leading-relaxed text-muted">{{ $t(`education.items.${item.id}.desc`) }}</p>
            <a
              v-if="item.url"
              :href="item.url"
              target="_blank"
              rel="noopener"
              class="mt-auto pt-4 text-sm text-ink transition-colors hover:text-accent"
            >
              {{ $t('education.view') }} ↗
            </a>
          </li>
        </ul>
      </RevealOnScroll>
    </div>
  </section>
</template>
