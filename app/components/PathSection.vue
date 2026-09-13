<script setup lang="ts">
import { experience, type Experience } from '~/data/experience'

const { t, tm, rt } = useI18n()

// tm() отдаёт массив скомпилированных сообщений, а не строк —
// каждый элемент нужно развернуть через rt(), иначе в dev падает SSR.
const list = (key: string) => (tm(key) as unknown[]).map((m) => rt(m as never))
const months = computed(() => list('path.months'))

const period = (item: Experience) => {
  const fmt = (ym: string) => {
    const [y, m] = ym.split('-').map(Number)
    return `${months.value[(m ?? 1) - 1]} ${y}`
  }
  return `${fmt(item.from)} — ${item.to ? fmt(item.to) : t('path.present')}`
}

const bullets = (id: string) => list(`path.items.${id}.bullets`)
</script>

<template>
  <section id="path" class="border-t border-line/60">
    <div class="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
      <SectionHead :title="$t('path.title')" :subtitle="$t('path.subtitle')" />

      <ol class="relative space-y-12 border-l border-line pl-7 sm:pl-9">
        <RevealOnScroll v-for="item in experience" :key="item.id">
          <li class="relative">
            <span
              class="absolute top-1.5 -left-[35px] size-2.5 rounded-full border-2 border-bg sm:-left-[43px]"
              :class="item.to ? 'bg-dim' : 'bg-accent'"
              aria-hidden="true"
            />

            <p class="font-mono text-xs" :class="item.to ? 'text-dim' : 'text-accent'">
              {{ period(item) }}
            </p>

            <h3 class="mt-1.5 text-lg font-semibold tracking-tight">
              {{ $t(`path.items.${item.id}.title`) }}
              <span class="mx-1.5 font-normal text-dim">·</span>
              <a
                v-if="item.companyUrl"
                :href="item.companyUrl"
                target="_blank"
                rel="noopener"
                class="font-normal text-ink underline decoration-line underline-offset-4 transition hover:decoration-accent"
              >{{ item.company }}</a>
              <span v-else class="font-normal text-ink">{{ item.company }}</span>
            </h3>

            <p class="mt-1 font-mono text-[11px] text-dim">
              {{ $t(`path.type.${item.type}`) }} · {{ $t(`path.items.${item.id}.location`) }}<template v-if="item.remote"> · {{ $t('path.remote') }}</template>
            </p>

            <p class="mt-3 max-w-2xl leading-relaxed text-muted">
              {{ $t(`path.items.${item.id}.summary`) }}
            </p>

            <ul class="mt-3 max-w-2xl space-y-1.5 text-sm leading-relaxed text-muted">
              <li v-for="(b, i) in bullets(item.id)" :key="i" class="flex gap-2.5">
                <span class="mt-[9px] size-1 shrink-0 rounded-full bg-dim" aria-hidden="true" />
                <span>{{ b }}</span>
              </li>
            </ul>

            <ul class="mt-4 flex flex-wrap gap-1.5">
              <li
                v-for="tech in item.tech"
                :key="tech"
                class="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
              >
                {{ tech }}
              </li>
            </ul>
          </li>
        </RevealOnScroll>
      </ol>
    </div>
  </section>
</template>
