<template>
  <div class="divider"></div>

  <div
    class="flex flex-col justify-center items-center max-w-md mx-auto pb-10 pt-4 md:px-1"
  >
    <div id="poem" class="w-full p-3">
      <img
        class="w-full rounded-md aspect-square object-cover"
        :alt="appStore.result!.poem"
        :src="appStore.result!.preview"
      />

      <p
        v-if="appStore.result!.keywords.length"
        class="text-sm mt-3 font-serif font-light italic"
      >
        {{ appStore.result!.keywords.join(", ") }}
      </p>

      <p class="whitespace-pre-wrap font-serif my-5 text-lg">
        {{ appStore.result!.poem }}
      </p>

      <LazyAppPoemSignature />
      <LazyAppPoemColors />
    </div>

    <LazyAppPoemShare />
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/appStore";

const appStore = useAppStore();
</script>
