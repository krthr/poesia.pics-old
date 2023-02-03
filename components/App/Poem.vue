<template>
  <div class="divider"></div>

  <div
    class="flex flex-col justify-center items-center max-w-md mx-auto pb-10 pt-4 px-4 md:px-1"
  >
    <div class="w-full">
      <img
        class="w-full rounded-md aspect-square object-cover"
        :alt="appStore.result.poem"
        :src="appStore.result.preview"
      />

      <p
        v-if="appStore.result.labels?.length"
        class="text-sm mt-3 mb-5 font-serif font-light"
      >
        {{ appStore.result.labels.join(", ") }}
      </p>

      <p class="whitespace-pre-wrap font-serif">{{ appStore.result.poem }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/appStore";

const appStore = useAppStore();
</script>
