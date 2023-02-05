<template>
  <div class="w-full min-h-screen flex flex-col">
    <AppHero />

    <LazyAppPoem v-if="appStore.result.poem" />

    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/appStore";

const appStore = useAppStore();

const title = "poesía.pics - Una foto, un poema";
const description =
  "Convierte tus fotografías en poemas usando Inteligencia Artifical.";
const siteName = "poesia.pics";

useServerSeoMeta({
  ogSiteName: siteName,
  ogType: "website",
  ogLocale: "es",
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: "https://poesia.pics/icon.png",
  twitterCard: "summary_large_image",
  twitterCreator: "_krthr",
});
</script>
