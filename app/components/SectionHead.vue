<script setup lang="ts">
defineProps<{ title: string; subtitle?: string }>()
</script>

<template>
  <div class="mb-10">
    <h2 class="text-[clamp(1.8rem,3.4vw,2.5rem)] font-extrabold tracking-[-0.03em]">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="mt-2.5 max-w-xl text-muted">{{ subtitle }}</p>
  </div>
</template>
