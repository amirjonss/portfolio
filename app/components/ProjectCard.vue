<script setup lang="ts">
import type { Project } from '~/data/projects'

const props = defineProps<{ project: Project }>()

const base = computed(() => `projects.items.${props.project.id}`)
</script>

<template>
  <article
    class="group grid gap-6 rounded-2xl border border-line bg-panel p-6 transition-colors hover:border-line-soft sm:p-8 lg:grid-cols-[1fr_1.3fr] lg:gap-10"
  >
    <!-- место под скриншот. TODO: заменить на реальный кадр проекта -->
    <div
      class="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl border border-line bg-bg"
      aria-hidden="true"
    >
      <div
        class="absolute inset-0 bg-[radial-gradient(420px_260px_at_50%_20%,rgba(94,234,212,0.08),transparent_70%)]"
      />
      <span class="relative font-mono text-sm text-dim">{{ project.container }}</span>
    </div>

    <div>
      <div class="flex flex-wrap items-center gap-3">
        <h3 class="font-mono text-xl font-semibold tracking-tight">
          {{ $t(`${base}.name`) }}
        </h3>
        <span
          class="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted"
        >
          <span class="size-1.5 rounded-full bg-accent" />
          {{ $t(`projects.status.${project.status}`) }}
        </span>
        <span class="font-mono text-xs text-dim">{{ project.year }}</span>
      </div>

      <p class="mt-2 text-[1.02rem] text-ink">{{ $t(`${base}.tagline`) }}</p>

      <dl class="mt-5 space-y-3.5 text-sm leading-relaxed">
        <div v-for="field in ['problem', 'role', 'challenge']" :key="field">
          <dt class="font-mono text-[11px] tracking-wide text-dim uppercase">
            {{ $t(`projects.${field}`) }}
          </dt>
          <dd class="mt-1 text-muted">{{ $t(`${base}.${field}`) }}</dd>
        </div>
      </dl>

      <ul class="mt-5 flex flex-wrap gap-2">
        <li
          v-for="tech in project.stack"
          :key="tech"
          class="rounded-md border border-line px-2.5 py-1 font-mono text-[11px] text-muted"
        >
          {{ tech }}
        </li>
      </ul>

      <div class="mt-6 flex flex-wrap items-center gap-3">
        <a
          v-if="project.demo"
          :href="project.demo"
          target="_blank"
          rel="noopener"
          class="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-[#07100e] transition hover:bg-accent-hi"
        >
          {{ $t('projects.demo') }} ↗
        </a>
        <span
          v-else
          class="rounded-lg border border-dashed border-line px-4 py-2 text-sm text-dim"
        >
          {{ $t('projects.soon') }}
        </span>

        <a
          v-if="project.repo"
          :href="project.repo"
          target="_blank"
          rel="noopener"
          class="rounded-lg border border-line px-4 py-2 text-sm text-ink transition hover:border-dim"
        >
          {{ $t('projects.code') }} ↗
        </a>
      </div>
    </div>
  </article>
</template>
