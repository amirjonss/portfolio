<script setup lang="ts">
import { projects, contacts, stackGroups } from '~/data/projects'
import { experience } from '~/data/experience'
import { profile, yearsOfExperience } from '~/data/profile'
import { education } from '~/data/education'

const localePath = useLocalePath()
const { t, tm, rt, locale } = useI18n()

useSeoMeta({
  title: () => t('meta.cvTitle'),
  description: () => t('meta.cvDescription'),
  ogTitle: () => t('meta.cvTitle'),
  ogDescription: () => t('meta.cvDescription'),
})

const list = (key: string) => (tm(key) as unknown[]).map((m) => rt(m as never))
const months = computed(() => list('path.months'))
const fmt = (ym: string) => { const [y, m] = ym.split('-').map(Number); return `${months.value[(m ?? 1) - 1]} ${y}` }
const period = (from: string, to: string | null) => `${fmt(from)} — ${to ? fmt(to) : t('path.present')}`
const bullets = (id: string) => list(`path.items.${id}.bullets`)
const jobs = [...experience].reverse()
const years = yearsOfExperience()
const { goal } = useAnalytics()
const cvPdf = computed(() => profile.cvPdf[locale.value] ?? profile.cvPdf.en)

const facts = computed(() => [
  [t('cv.factsLocation'), t('profile.location', { city: t('profile.city'), tz: profile.location.timezone })],
  [t('cv.factsFormat'), profile.workFormat.map((f) => t(`profile.workFormat.${f}`)).join(' · ')],
  [t('cv.factsAvailability'), t(`profile.availability.${profile.availability}`)],
  [t('profile.languages'), profile.languages.map((l) => `${t(`profile.lang.${l.code}`)} — ${t(`profile.level.${l.level}`)}`).join(', ')],
])

const links = [
  { label: 'Email', value: contacts.email, href: `mailto:${contacts.email}` },
  { label: 'GitHub', value: contacts.githubHandle, href: contacts.github },
  { label: 'Telegram', value: contacts.telegramHandle, href: contacts.telegram },
  { label: 'LinkedIn', value: contacts.linkedinHandle, href: contacts.linkedin },
  { label: 'Web', value: 'amirjon.uz', href: 'https://amirjon.uz' },
]
</script>

<template>
  <div class="cv mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
    <div class="no-print flex flex-wrap items-center justify-between gap-3">
      <NuxtLink :to="localePath('/')" class="text-sm text-muted transition-colors hover:text-ink">
        ← {{ $t('cv.back') }}
      </NuxtLink>
      <div class="flex items-center gap-2">
        <a
          :href="cvPdf"
          download
          @click="goal('cv_pdf', { place: 'cv' })"
          class="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-[#07100e] transition hover:bg-accent-hi"
        >
          ↓ {{ $t('profile.downloadPdf') }}
        </a>
        <button
          type="button"
          class="rounded-lg border border-line px-4 py-2 text-sm text-ink transition hover:border-dim"
          @click="typeof window !== 'undefined' && window.print()"
        >
          {{ $t('cv.print') }}
        </button>
      </div>
    </div>

    <header class="mt-8 flex items-start gap-5 border-b border-line pb-8">
      <Avatar size="md" eager />
      <div class="min-w-0">
        <h1 class="text-[clamp(1.8rem,5vw,2.6rem)] font-extrabold tracking-[-0.03em]">
          {{ profile.name }}
        </h1>
        <p class="mt-1.5 text-muted">{{ $t('profile.roleLine', { city: $t('profile.city') }) }}</p>
        <p class="mt-3 text-sm text-muted">
          <template v-for="(l, i) in links" :key="l.label">
            <span v-if="i" class="text-dim"> · </span>
            <a :href="l.href" class="text-ink hover:text-accent">{{ l.value }}</a>
          </template>
        </p>
      </div>
    </header>

    <section class="mt-8">
      <h2 class="cv-h2">{{ $t('cv.factsTitle') }}</h2>
      <dl class="mt-3 space-y-1.5">
        <div v-for="[k, v] in facts" :key="k" class="sm:flex sm:gap-4">
          <dt class="text-sm text-dim sm:w-44 sm:shrink-0">{{ k }}</dt>
          <dd class="text-sm text-ink">{{ v }}</dd>
        </div>
      </dl>
    </section>

    <section class="mt-8">
      <h2 class="cv-h2">{{ $t('cv.summaryTitle') }}</h2>
      <div class="mt-3 space-y-3 leading-relaxed text-muted">
        <p>{{ $t('hero.lead', { years }) }}</p>
        <p v-for="n in ['p1', 'p2', 'p3']" :key="n">{{ $t(`about.${n}`) }}</p>
      </div>
    </section>

    <section class="mt-8">
      <h2 class="cv-h2">{{ $t('cv.pathTitle') }}</h2>
      <div class="mt-3 space-y-5">
        <article v-for="job in jobs" :key="job.id" class="sm:flex sm:gap-4">
          <p class="font-mono text-sm text-accent sm:w-44 sm:shrink-0">{{ period(job.from, job.to) }}</p>
          <div>
            <p class="text-sm text-ink">
              {{ $t(`path.items.${job.id}.title`) }} · {{ job.company }}
              <span class="text-dim">— {{ $t(`path.type.${job.type}`) }}, {{ $t(`path.items.${job.id}.location`) }}</span>
            </p>
            <p class="mt-1 text-sm leading-relaxed text-muted">{{ $t(`path.items.${job.id}.summary`) }}</p>
            <ul class="mt-1.5 list-disc space-y-1 pl-4 text-sm leading-relaxed text-muted">
              <li v-for="(b, i) in bullets(job.id)" :key="i">{{ b }}</li>
            </ul>
            <p class="mt-1.5 font-mono text-xs text-dim">{{ job.tech.join(' · ') }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="mt-8">
      <h2 class="cv-h2">{{ $t('cv.projectsTitle') }}</h2>
      <div class="mt-3 space-y-4">
        <article v-for="project in projects" :key="project.id">
          <h3 class="text-sm font-semibold">
            {{ $t(`projects.items.${project.id}.name`) }}
            <span class="font-normal text-dim">· {{ project.period }}</span>
            <span v-if="project.links.demo" class="font-normal text-dim"> · </span>
            <a v-if="project.links.demo" :href="project.links.demo" class="font-mono text-xs font-normal text-accent">{{ project.links.demo.replace('https://', '') }}</a>
          </h3>
          <p class="mt-0.5 text-sm text-ink">{{ $t(`projects.items.${project.id}.tagline`) }}</p>
          <p class="mt-1 text-sm leading-relaxed text-muted">{{ $t(`projects.items.${project.id}.challenge`) }}</p>
          <p class="mt-1 font-mono text-xs text-dim">
            {{ [...(project.stack.backend ?? []), ...project.stack.frontend].join(' · ') }}
          </p>
        </article>
      </div>
    </section>

    <section class="mt-8">
      <h2 class="cv-h2">{{ $t('cv.stackTitle') }}</h2>
      <dl class="mt-3 space-y-2">
        <div v-for="group in stackGroups" :key="group.id" class="sm:flex sm:gap-4">
          <dt class="text-sm text-ink sm:w-44 sm:shrink-0">{{ $t(`stack.groups.${group.id}`) }}</dt>
          <dd class="text-sm text-muted">{{ group.items.join(' · ') }}</dd>
        </div>
      </dl>
    </section>

    <section v-if="education.length" class="mt-8">
      <h2 class="cv-h2">{{ $t('cv.educationTitle') }}</h2>
      <div class="mt-3 space-y-3">
        <div v-for="e in education" :key="e.id" class="sm:flex sm:gap-4">
          <p class="font-mono text-sm text-accent sm:w-44 sm:shrink-0">{{ period(e.from, e.to) }}</p>
          <div>
            <p class="text-sm text-ink">
              {{ e.title }} <span class="text-dim">— {{ e.issuer }}, {{ $t(`education.status.${e.status}`).toLowerCase() }}</span>
            </p>
            <p class="mt-1 text-sm leading-relaxed text-muted">{{ $t(`education.items.${e.id}.desc`) }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.cv .cv-h2 {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-dim);
}

/* Печать и PDF: светлый лист, одна колонка, без шапки сайта и кнопок.
   ATS-системы читают текст — никаких фонов, иконок и таблиц. */
@media print {
  :root {
    --color-bg: #fff;
    --color-panel: #fff;
    --color-line: #d4d4d8;
    --color-ink: #111;
    --color-muted: #333;
    --color-dim: #666;
    --color-accent: #0f766e;
  }
  html, body { background: #fff !important; color: #111 !important; }
  header.sticky, footer, .no-print { display: none !important; }
  .cv { max-width: none; padding: 0; font-size: 11pt; }
  .cv img { width: 56px; height: 56px; }
  .cv a { color: inherit; text-decoration: none; }
  .cv section { break-inside: avoid; margin-top: 14pt; }
  .cv article { break-inside: avoid; }
  @page { size: A4; margin: 14mm 16mm; }
}
</style>
