<script setup lang="ts">
import { contacts } from '~/data/projects'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-line/60">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-dim sm:flex-row sm:items-center sm:justify-between sm:px-8"
    >
      <p>© {{ year }} Amirjon Fayzilloyev · {{ $t('footer.built') }}</p>
      <a
        :href="contacts.github"
        target="_blank"
        rel="noopener"
        class="transition-colors hover:text-ink"
      >
        {{ $t('footer.source') }} ↗
      </a>
    </div>
  </footer>
</template>
