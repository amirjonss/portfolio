<script setup lang="ts">
const items = ['start', 'laravel', 'symfony', 'now'] as const
</script>

<template>
  <section id="path" class="border-t border-line/60">
    <div class="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
      <SectionHead :title="$t('path.title')" :subtitle="$t('path.subtitle')" />

      <ol class="relative border-l border-line pl-7 sm:pl-9">
        <RevealOnScroll v-for="id in items" :key="id">
          <li class="relative pb-10 last:pb-0">
            <span
              class="absolute top-1.5 -left-[35px] size-2.5 rounded-full border-2 border-bg bg-accent sm:-left-[43px]"
              aria-hidden="true"
            />
            <p class="font-mono text-xs text-accent">{{ $t(`path.items.${id}.year`) }}</p>
            <h3 class="mt-1 text-lg font-semibold tracking-tight">
              {{ $t(`path.items.${id}.title`) }}
            </h3>
            <p class="mt-2 max-w-2xl leading-relaxed text-muted">
              {{ $t(`path.items.${id}.text`) }}
            </p>
          </li>
        </RevealOnScroll>
      </ol>
    </div>
  </section>
</template>
