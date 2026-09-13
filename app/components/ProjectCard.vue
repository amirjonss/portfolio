<script setup lang="ts">
import type { Project } from '~/data/projects'

const props = defineProps<{ project: Project }>()
const { goal } = useAnalytics()
const openDemo = () => goal('demo_open', { project: props.project.id })

const base = computed(() => `projects.items.${props.project.id}`)
const active = ref(0)
const current = computed(() => props.project.images[active.value] ?? props.project.images[0])

const stackGroups = computed(() =>
  (['backend', 'frontend', 'infra'] as const)
    .map((key) => ({ key, items: props.project.stack[key] ?? [] }))
    .filter((g) => g.items.length),
)

const links = computed(() => {
  const l = props.project.links
  return [
    { key: 'api', href: l.api, primary: false },
    { key: 'codeApi', href: l.repoApi, primary: false },
    { key: 'codeFront', href: l.repoFront, primary: false },
  ].filter((x) => x.href)
})
</script>

<template>
  <article
    class="grid gap-6 rounded-2xl border border-line bg-panel p-5 sm:p-7 lg:grid-cols-[1.05fr_1fr] lg:gap-9"
  >
    <!-- скриншоты -->
    <div>
      <a
        :href="project.links.demo ?? undefined"
        target="_blank"
        rel="noopener"
        @click="openDemo"
        class="group relative block aspect-[16/10] overflow-hidden rounded-xl border border-line bg-bg"
      >
        <Transition name="fade" mode="out-in">
          <img
            :key="current"
            :src="current"
            :alt="project.imageAlt"
            width="1600"
            height="1000"
            loading="lazy"
            decoding="async"
            class="size-full object-cover object-top"
          >
        </Transition>
        <span
          v-if="project.links.demo"
          class="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-end gap-2 bg-gradient-to-t from-bg/90 to-transparent px-4 pt-10 pb-3 text-sm text-ink opacity-0 transition-opacity group-hover:opacity-100"
        >
          {{ $t('projects.demo') }} ↗
        </span>
      </a>

      <div v-if="project.images.length > 1" class="mt-3 flex gap-2">
        <button
          v-for="(img, i) in project.images"
          :key="img"
          type="button"
          class="relative aspect-[16/10] w-20 overflow-hidden rounded-md border transition sm:w-24"
          :class="i === active ? 'border-accent' : 'border-line opacity-60 hover:opacity-100'"
          :aria-label="$t('projects.shot', { n: i + 1, total: project.images.length })"
          :aria-pressed="i === active"
          @click="active = i"
        >
          <img :src="img" alt="" width="160" height="100" loading="lazy" decoding="async" class="size-full object-cover object-top">
        </button>
      </div>
    </div>

    <!-- описание -->
    <div class="min-w-0">
      <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 class="text-xl font-semibold tracking-tight">{{ $t(`${base}.name`) }}</h3>
        <span class="font-mono text-xs text-dim">{{ project.period }}</span>
        <span
          v-if="!project.links.api"
          class="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] tracking-wide text-dim uppercase"
        >
          {{ $t('projects.frontOnly') }}
        </span>
      </div>

      <p class="mt-1.5 text-[1.02rem] text-ink">{{ $t(`${base}.tagline`) }}</p>

      <dl class="mt-5 space-y-3.5 text-sm leading-relaxed">
        <div v-for="field in ['problem', 'role', 'challenge']" :key="field">
          <dt class="font-mono text-[11px] tracking-wide text-dim uppercase">
            {{ $t(`projects.${field}`) }}
          </dt>
          <dd class="mt-1 text-muted">{{ $t(`${base}.${field}`) }}</dd>
        </div>
      </dl>

      <dl class="mt-5 space-y-2.5">
        <div v-for="group in stackGroups" :key="group.key" class="flex items-start gap-3">
          <dt class="w-16 shrink-0 pt-1 font-mono text-[10px] tracking-wide text-dim uppercase">
            {{ $t(`projects.${group.key}`) }}
          </dt>
          <dd class="flex flex-wrap gap-1.5">
            <span
              v-for="tech in group.items"
              :key="tech"
              class="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {{ tech }}
            </span>
          </dd>
        </div>
      </dl>

      <div class="mt-6 flex flex-wrap items-center gap-2.5">
        <a
          v-if="project.links.demo"
          :href="project.links.demo"
          target="_blank"
          rel="noopener"
          @click="openDemo"
          class="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-[#07100e] transition hover:bg-accent-hi"
        >
          {{ $t('projects.demo') }} ↗
        </a>
        <a
          v-for="link in links"
          :key="link.key"
          :href="link.href!"
          target="_blank"
          rel="noopener"
          class="rounded-lg border border-line px-4 py-2 text-sm text-ink transition hover:border-dim"
        >
          {{ $t(`projects.${link.key}`) }} ↗
        </a>
      </div>

      <p v-if="project.quickLogin" class="mt-3 font-mono text-[11px] text-dim">
        ● {{ $t('projects.quickLogin') }}
      </p>
    </div>
  </article>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 180ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
