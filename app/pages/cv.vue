<script setup lang="ts">
import { projects, contacts, stackGroups } from '~/data/projects'

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('meta.cvTitle'),
  description: () => t('meta.cvDescription'),
  ogTitle: () => t('meta.cvTitle'),
  ogDescription: () => t('meta.cvDescription'),
})

const pathItems = ['now', 'symfony', 'laravel', 'start'] as const
const links = [
  { label: 'Email', value: contacts.email, href: `mailto:${contacts.email}` },
  { label: 'GitHub', value: contacts.githubHandle, href: contacts.github },
  { label: 'Telegram', value: contacts.telegramHandle, href: contacts.telegram },
  { label: 'LinkedIn', value: contacts.linkedinHandle, href: contacts.linkedin },
]
</script>

<template>
  <div class="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
    <NuxtLink :to="localePath('/')" class="text-sm text-muted transition-colors hover:text-ink">
      ← {{ $t('cv.back') }}
    </NuxtLink>

    <header class="mt-8 border-b border-line pb-8">
      <h1 class="text-[clamp(2rem,5vw,3rem)] font-extrabold tracking-[-0.03em]">
        {{ $t('cv.title') }}
      </h1>
      <p class="mt-2 text-muted">{{ $t('cv.role') }}</p>
    </header>

    <section class="mt-10">
      <h2 class="font-mono text-[11px] tracking-wide text-dim uppercase">
        {{ $t('cv.summaryTitle') }}
      </h2>
      <div class="mt-3 space-y-4 leading-relaxed text-muted">
        <p v-for="n in ['p1', 'p2', 'p3']" :key="n">{{ $t(`about.${n}`) }}</p>
      </div>
    </section>

    <section class="mt-10">
      <h2 class="font-mono text-[11px] tracking-wide text-dim uppercase">
        {{ $t('cv.stackTitle') }}
      </h2>
      <dl class="mt-3 space-y-3">
        <div v-for="group in stackGroups" :key="group.id" class="sm:flex sm:gap-4">
          <dt class="text-sm text-ink sm:w-44 sm:shrink-0">
            {{ $t(`stack.groups.${group.id}`) }}
          </dt>
          <dd class="text-sm text-muted">{{ group.items.join(' · ') }}</dd>
        </div>
      </dl>
    </section>

    <section class="mt-10">
      <h2 class="font-mono text-[11px] tracking-wide text-dim uppercase">
        {{ $t('cv.projectsTitle') }}
      </h2>
      <div class="mt-3 space-y-6">
        <article v-for="project in projects" :key="project.id">
          <h3 class="font-mono text-base font-semibold">
            {{ $t(`projects.items.${project.id}.name`) }}
            <span class="font-sans text-sm font-normal text-dim">· {{ project.year }}</span>
          </h3>
          <p class="mt-1 text-sm text-ink">{{ $t(`projects.items.${project.id}.tagline`) }}</p>
          <p class="mt-1.5 text-sm leading-relaxed text-muted">
            {{ $t(`projects.items.${project.id}.challenge`) }}
          </p>
          <p class="mt-1.5 font-mono text-xs text-dim">{{ project.stack.join(' · ') }}</p>
        </article>
      </div>
    </section>

    <section class="mt-10">
      <h2 class="font-mono text-[11px] tracking-wide text-dim uppercase">
        {{ $t('cv.pathTitle') }}
      </h2>
      <div class="mt-3 space-y-4">
        <div v-for="id in pathItems" :key="id" class="sm:flex sm:gap-4">
          <p class="font-mono text-sm text-accent sm:w-44 sm:shrink-0">
            {{ $t(`path.items.${id}.year`) }}
          </p>
          <div>
            <p class="text-sm text-ink">{{ $t(`path.items.${id}.title`) }}</p>
            <p class="mt-1 text-sm leading-relaxed text-muted">
              {{ $t(`path.items.${id}.text`) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-10 border-t border-line pt-8">
      <h2 class="font-mono text-[11px] tracking-wide text-dim uppercase">
        {{ $t('cv.contactTitle') }}
      </h2>
      <dl class="mt-3 space-y-2">
        <div v-for="link in links" :key="link.label" class="sm:flex sm:gap-4">
          <dt class="text-sm text-dim sm:w-44 sm:shrink-0">{{ link.label }}</dt>
          <dd>
            <a :href="link.href" class="text-sm text-ink transition-colors hover:text-accent">
              {{ link.value }}
            </a>
          </dd>
        </div>
      </dl>
    </section>
  </div>
</template>
