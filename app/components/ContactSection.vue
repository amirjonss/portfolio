<script setup lang="ts">
import { contacts } from '~/data/projects'

const localePath = useLocalePath()

const links = [
  { id: 'GitHub', href: contacts.github, handle: contacts.githubHandle },
  { id: 'Telegram', href: contacts.telegram, handle: contacts.telegramHandle },
  { id: 'LinkedIn', href: contacts.linkedin, handle: contacts.linkedinHandle },
]
</script>

<template>
  <section id="contact" class="border-t border-line/60">
    <div class="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHead :title="$t('contact.title')" :subtitle="$t('contact.lead')" />

      <RevealOnScroll>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a
            :href="`mailto:${contacts.email}`"
            class="group rounded-xl border border-line bg-panel p-5 transition hover:-translate-y-0.5 hover:border-dim"
          >
            <p class="font-mono text-[11px] tracking-wide text-dim uppercase">
              {{ $t('contact.email') }}
            </p>
            <p class="mt-2 truncate text-sm text-ink group-hover:text-accent">
              {{ contacts.email }}
            </p>
          </a>

          <a
            v-for="link in links"
            :key="link.id"
            :href="link.href"
            target="_blank"
            rel="noopener"
            class="group rounded-xl border border-line bg-panel p-5 transition hover:-translate-y-0.5 hover:border-dim"
          >
            <p class="font-mono text-[11px] tracking-wide text-dim uppercase">
              {{ link.id }}
            </p>
            <p class="mt-2 truncate text-sm text-ink group-hover:text-accent">
              {{ link.handle }} ↗
            </p>
          </a>
        </div>

        <NuxtLink
          :to="localePath('/cv')"
          class="mt-8 inline-block rounded-[10px] bg-accent px-6 py-3 font-medium text-[#07100e] transition hover:-translate-y-0.5 hover:bg-accent-hi"
        >
          {{ $t('contact.downloadCv') }}
        </NuxtLink>
      </RevealOnScroll>
    </div>
  </section>
</template>
