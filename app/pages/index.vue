<script setup lang="ts">
import { projects, contacts } from '~/data/projects'

const { t, locale } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
  ogTitle: () => t('meta.title'),
  ogDescription: () => t('meta.description'),
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

/**
 * Разметка проектов для машин. Person / WebSite / WebPage генерирует
 * nuxt-schema-org из identity в nuxt.config — здесь добавляем только
 * список работ, собранный из того же app/data/projects.ts.
 */
const projectsLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: t('projects.title'),
  itemListElement: projects.map((project, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'SoftwareSourceCode',
      name: t(`projects.items.${project.id}.name`),
      description: t(`projects.items.${project.id}.tagline`),
      abstract: t(`projects.items.${project.id}.problem`),
      programmingLanguage: project.stack,
      codeRepository: project.repo ?? undefined,
      dateCreated: project.year,
      author: { '@type': 'Person', name: 'Amirjon Fayzilloyev', url: 'https://amirjon.uz' },
    },
  })),
}))

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify(projectsLd.value),
    },
  ],
})
</script>

<template>
  <div>
    <HeroSection />
    <ProjectsSection />
    <StackSection />
    <AboutSection />
    <PathSection />
    <ContactSection />
  </div>
</template>
