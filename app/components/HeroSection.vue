<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <section
    class="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pt-12 pb-20 sm:px-8 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pt-0 lg:pb-24"
  >
    <!-- мягкое свечение за терминалом -->
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(700px_480px_at_72%_28%,rgba(94,234,212,0.07),transparent_70%)]"
      aria-hidden="true"
    />

    <div>
      <a
        href="#projects"
        class="inline-flex items-center gap-2.5 rounded-full border border-line bg-panel px-4 py-1.5 text-sm text-muted transition hover:-translate-y-px hover:border-dim"
      >
        <span class="relative flex size-1.5">
          <span class="absolute inline-flex size-full rounded-full bg-accent opacity-60" />
          <span class="relative inline-flex size-1.5 rounded-full bg-accent ring-4 ring-accent/15" />
        </span>
        <span class="text-ink">{{ $t('hero.badge') }}</span>
        <span class="text-dim">›</span>
      </a>

      <h1
        class="mt-6 text-[clamp(2.6rem,7vw,4.6rem)] leading-[0.98] font-extrabold tracking-[-0.035em]"
      >
        {{ $t('hero.titleA') }}<br >
        {{ $t('hero.titleB') }}<br >
        <span class="text-accent">{{ $t('hero.titleC') }}</span>
      </h1>

      <p class="mt-6 max-w-md text-[1.06rem] leading-relaxed text-muted">
        {{ $t('hero.lead') }}
      </p>

      <div class="mt-8 flex flex-wrap gap-3.5">
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
      </div>

      <dl class="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-line pt-7">
        <div v-for="key in ['Years', 'Services', 'Focus']" :key="key">
          <dt class="text-[1.35rem] font-bold tracking-tight">
            {{ $t(`hero.stat${key}`) }}
          </dt>
          <dd class="text-[13px] text-dim">{{ $t(`hero.stat${key}Label`) }}</dd>
        </div>
      </dl>
    </div>

    <TerminalWindow />
  </section>
</template>
