<script setup lang="ts">
import { profile } from '~/data/profile'

withDefaults(defineProps<{ size?: 'md' | 'lg'; eager?: boolean }>(), { size: 'lg', eager: false })

const sizes = { md: 'size-16 text-lg', lg: 'size-16 text-lg sm:size-[88px] sm:text-2xl' }
</script>

<template>
  <!-- фото, если файл есть; иначе инициалы — ничего не ломается без картинки -->
  <img
    v-if="profile.photo"
    :src="profile.photo"
    :alt="$t('profile.photoAlt')"
    width="176"
    height="176"
    :loading="eager ? 'eager' : 'lazy'"
    :fetchpriority="eager ? 'high' : undefined"
    decoding="async"
    class="shrink-0 rounded-full border border-line object-cover"
    :class="sizes[size]"
  >
  <span
    v-else
    class="flex shrink-0 items-center justify-center rounded-full bg-accent font-bold tracking-tight text-[#07100e]"
    :class="sizes[size]"
    aria-hidden="true"
  >{{ profile.initials }}</span>
</template>
