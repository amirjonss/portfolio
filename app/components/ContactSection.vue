<script setup lang="ts">
import { contacts } from '~/data/projects'
import { profile } from '~/data/profile'

const localePath = useLocalePath()
const { locale } = useI18n()
const { goal, trackSection } = useAnalytics()
const root = ref<HTMLElement | null>(null)
onMounted(() => trackSection(root.value, 'scroll_contact'))
const cvPdf = computed(() => profile.cvPdf[locale.value] ?? profile.cvPdf.en)

const links = [
  { id: 'GitHub', href: contacts.github, handle: contacts.githubHandle },
  { id: 'Telegram', href: contacts.telegram, handle: contacts.telegramHandle },
  { id: 'LinkedIn', href: contacts.linkedin, handle: contacts.linkedinHandle },
]
</script>

<template>
  <section id="contact" ref="root" class="border-t border-line/60">
    <div class="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHead :title="$t('contact.title')" :subtitle="$t('contact.lead')" />

      <RevealOnScroll>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a
            :href="`mailto:${contacts.email}`"
            @click="goal('contact_click', { channel: 'email' })"
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
            @click="goal('contact_click', { channel: link.id.toLowerCase() })"
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

        <div class="mt-8 flex flex-wrap items-center gap-3">
          <a
            :href="cvPdf"
            download
            @click="goal('cv_pdf', { place: 'contact' })"
            class="inline-block rounded-[10px] bg-accent px-6 py-3 font-medium text-[#07100e] transition hover:-translate-y-0.5 hover:bg-accent-hi"
          >
            ↓ {{ $t('profile.downloadPdf') }}
          </a>
          <NuxtLink
            :to="localePath('/cv')"
            class="inline-block rounded-[10px] border border-line px-6 py-3 font-medium text-ink transition hover:border-dim"
          >
            {{ $t('contact.downloadCv') }}
          </NuxtLink>
          <span class="font-mono text-[11px] text-dim">{{ $t('profile.pdfHint') }}</span>
        </div>
      </RevealOnScroll>
    </div>
  </section>
</template>
