<script setup lang="ts">
/**
 * Плавное появление блока при скролле.
 *
 * Блок «взводится» (прячется) только если при монтировании он ещё ниже
 * первого экрана. Поэтому: без JS контент виден, у верхних секций нет
 * мигания, а при prefers-reduced-motion анимации нет вовсе.
 */
const el = ref<HTMLElement | null>(null)
const armed = ref(false)
const shown = ref(false)

onMounted(() => {
  if (
    !el.value ||
    !('IntersectionObserver' in window) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) return

  if (el.value.getBoundingClientRect().top < window.innerHeight) return

  armed.value = true

  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        shown.value = true
        io.disconnect()
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  )
  io.observe(el.value)
  onBeforeUnmount(() => io.disconnect())
})
</script>

<template>
  <div ref="el" :class="[armed && 'armed', shown && 'shown']">
    <slot />
  </div>
</template>

<style scoped>
.armed {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 380ms ease-out, transform 380ms ease-out;
}

.armed.shown {
  opacity: 1;
  transform: none;
}
</style>
