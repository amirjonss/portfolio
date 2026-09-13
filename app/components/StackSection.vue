<script setup lang="ts">
import { stackGroups } from '~/data/projects'
</script>

<template>
  <section id="stack" class="border-t border-line/60">
    <div class="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
      <SectionHead :title="$t('stack.title')" :subtitle="$t('stack.subtitle')" />

      <RevealOnScroll>
        <dl class="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="group in stackGroups" :key="group.id">
            <dt class="font-mono text-[11px] tracking-wide text-dim uppercase">
              {{ $t(`stack.groups.${group.id}`) }}
            </dt>
            <dd class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="item in group.items"
                :key="item"
                class="rounded-md border border-line bg-panel px-2.5 py-1 font-mono text-[12px] text-muted"
              >
                {{ item }}
              </span>
            </dd>
          </div>
        </dl>
      </RevealOnScroll>
    </div>
  </section>
</template>
