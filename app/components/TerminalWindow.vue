<script setup lang="ts">
const { lines, partial, viewport } = useTerminalPlayer()

const kindClass: Record<string, string> = {
  cmd: 'text-ink',
  out: 'text-muted',
  note: 'text-dim',
  ok: 'text-accent',
  name: 'text-amber',
  gap: '',
}
</script>

<template>
  <div
    class="overflow-hidden rounded-xl border border-line bg-panel shadow-[0_28px_70px_-18px_rgba(0,0,0,0.75)]"
  >
    <!-- шапка окна -->
    <div class="flex items-center gap-2 border-b border-line bg-panel-top px-4 py-3">
      <span class="block size-3 rounded-full bg-[#ff5f57]" />
      <span class="block size-3 rounded-full bg-[#febc2e]" />
      <span class="block size-3 rounded-full bg-[#28c840]" />
      <span class="mr-11 flex-1 text-center font-mono text-xs text-dim">
        amirjon@srv-01 — zsh
      </span>
    </div>

    <!-- экран. Декоративный: содержимое постоянно меняется,
         скринридеру его читать не нужно — весь смысл продублирован текстом слева -->
    <div class="relative" aria-hidden="true">
      <!-- затемнение уходящих вверх строк -->
      <div
        class="pointer-events-none absolute inset-x-0 top-0 z-10 h-14 bg-gradient-to-b from-panel to-transparent"
      />

      <div
        ref="viewport"
        class="h-[320px] overflow-hidden px-5 py-5 font-mono text-[12px] leading-[1.85] sm:h-[430px] sm:text-[13px]"
      >
        <p
          v-for="(line, i) in lines"
          :key="i"
          class="break-words whitespace-pre-wrap"
          :class="kindClass[line.kind]"
        >
          <template v-if="line.kind === 'cmd'">
            <span class="text-accent">$</span> {{ line.text }}
          </template>
          <template v-else-if="line.kind === 'gap'">&nbsp;</template>
          <template v-else>{{ line.text }}</template>
        </p>

        <!-- строка, которая печатается прямо сейчас -->
        <p v-if="partial !== null" class="break-words whitespace-pre-wrap text-ink">
          <span class="text-accent">$</span> {{ partial }}<span class="caret" />
        </p>
        <p v-else class="break-words whitespace-pre-wrap"><span class="caret" /></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.caret {
  display: inline-block;
  width: 8px;
  height: 15px;
  vertical-align: -2px;
  background-color: var(--color-accent);
  animation: blink 1.05s steps(1) infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .caret { animation: none; }
}
</style>
