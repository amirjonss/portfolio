<script setup lang="ts">
import { profile, yearsOfExperience } from '~/data/profile'

const { locale } = useI18n()
const { goal } = useAnalytics()
const years = yearsOfExperience()
const cvPdf = computed(() => profile.cvPdf[locale.value] ?? profile.cvPdf.en)

const stats = [
  { value: 'statYears', label: 'statYearsLabel' },
  { value: 'statServices', label: 'statServicesLabel' },
  { value: 'statFocus', label: 'statFocusLabel' },
] as const
</script>

<template>
  <section
    class="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pt-10 pb-14 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-16"
  >
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(700px_480px_at_72%_28%,rgba(94,234,212,0.07),transparent_70%)]"
      aria-hidden="true"
    />

    <div>
      <!-- фото + имя + статус: то, что HR ищет в первую секунду -->
      <div class="flex items-center gap-4">
        <Avatar eager />
        <div class="min-w-0">
          <p class="truncate text-lg font-semibold tracking-tight">{{ profile.name }}</p>
          <a
            v-if="profile.openToWork"
            href="#contact"
            class="mt-1 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[13px] text-accent transition hover:bg-accent/15"
          >
            <span class="relative flex size-1.5">
              <span class="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span class="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            {{ $t('profile.openToWork') }}
            <span class="text-accent/70">· {{ $t('profile.availableNow') }}</span>
          </a>
        </div>
      </div>

      <h1
        class="mt-7 text-[clamp(2.6rem,7vw,4.6rem)] leading-[0.98] font-extrabold tracking-[-0.035em]"
      >
        {{ $t('hero.titleA') }}<br >
        {{ $t('hero.titleB') }}<br >
        <span class="text-accent">{{ $t('hero.titleC') }}</span>
      </h1>

      <p class="mt-6 max-w-md text-[1.06rem] leading-relaxed text-muted">
        {{ $t('hero.lead', { years }) }}
      </p>

      <div class="mt-8 flex flex-wrap gap-3">
        <a
          href="#projects"
          class="rounded-[10px] bg-accent px-6 py-3 font-medium text-[#07100e] transition hover:-translate-y-0.5 hover:bg-accent-hi"
        >
          {{ $t('hero.ctaProjects') }}
        </a>
        <a
          href="#contact"
          class="rounded-[10px] border border-line px-6 py-3 font-medium text-ink transition hover:border-dim hover:bg-panel"
        >
          {{ $t('hero.ctaContact') }}
        </a>
        <a
          :href="cvPdf"
          download
          @click="goal('cv_pdf', { place: 'hero' })"
          class="rounded-[10px] border border-line px-5 py-3 font-medium text-muted transition hover:border-dim hover:text-ink"
        >
          ↓ {{ $t('hero.ctaCv') }}
        </a>
      </div>

      <dl class="mt-10 flex flex-wrap gap-x-8 gap-y-5 border-t border-line pt-6">
        <div v-for="s in stats" :key="s.value">
          <dt class="text-[1.35rem] font-bold tracking-tight">{{ $t(`hero.${s.value}`, { years }) }}</dt>
          <dd class="max-w-[8.5rem] text-[12px] leading-snug text-dim">{{ $t(`hero.${s.label}`) }}</dd>
        </div>
      </dl>
    </div>

    <TerminalWindow />
  </section>
</template>
