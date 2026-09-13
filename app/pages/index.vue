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
      '@type': 'SoftwareApplication',
      name: t(`projects.items.${project.id}.name`),
      description: t(`projects.items.${project.id}.tagline`),
      abstract: t(`projects.items.${project.id}.problem`),
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: project.links.demo ?? undefined,
      screenshot: project.images.map((img) => `https://amirjon.uz${img}`),
      programmingLanguage: [
        ...(project.stack.backend ?? []),
        ...project.stack.frontend,
      ],
      codeRepository: [project.links.repoApi, project.links.repoFront].filter(Boolean),
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
    <FactsBar />
    <ProjectsSection />
    <StackSection />
    <AboutSection />
    <PathSection />
    <EducationSection />
    <ContactSection />
  </div>
</template>
