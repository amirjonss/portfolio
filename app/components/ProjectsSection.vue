<script setup lang="ts">
import { projects } from '~/data/projects'
</script>

<template>
  <section id="projects" class="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
    <SectionHead :title="$t('projects.title')" :subtitle="$t('projects.subtitle')" />

    <div class="space-y-6">
      <RevealOnScroll v-for="project in projects" :key="project.id">
        <ProjectCard :project="project" />
      </RevealOnScroll>
    </div>
  </section>
</template>
