<template>
  <div class="w-full min-h-screen flex flex-col">
    <AppHero />

    <AppPoem v-if="appStore.result.poem" />

    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/appStore";

const appStore = useAppStore();
</script>
