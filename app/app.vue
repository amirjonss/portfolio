<script setup lang="ts">
const head = useLocaleHead()
</script>

<template>
  <Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir">
    <Head>
      <template v-for="link in head.link" :key="link.id ?? link.href">
        <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
      </template>
      <template v-for="meta in head.meta" :key="meta.id ?? meta.property">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>
    </Head>
    <Body>
      <div class="flex min-h-screen flex-col">
        <NuxtRouteAnnouncer />
        <TheHeader />
        <main class="flex-1">
          <NuxtPage />
        </main>
        <TheFooter />
      </div>
    </Body>
  </Html>
</template>
