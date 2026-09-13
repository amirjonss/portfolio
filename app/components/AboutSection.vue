<template>
  <section id="about" class="border-t border-line/60">
    <div class="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
      <div class="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <SectionHead :title="$t('about.title')" class="mb-0" />

        <RevealOnScroll>
          <div class="space-y-5 text-[1.06rem] leading-relaxed text-muted">
            <p v-for="n in ['p1', 'p2', 'p3']" :key="n">{{ $t(`about.${n}`) }}</p>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  </section>
</template>
