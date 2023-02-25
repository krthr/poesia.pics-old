<template>
  <div
    class="flex flex-col justify-center items-center max-w-md mx-auto pb-10 pt-4 md:px-1"
  >
    <div id="poem" class="w-full p-3">
      <img
        class="w-full h-auto rounded-md"
        :alt="poem.poem"
        :src="poem.image"
      />

      <p v-if="poem.keywords" class="text-sm mt-3 font-serif font-light italic">
        {{ poem.keywords.join(", ") }}
      </p>

      <p class="whitespace-pre-wrap font-serif my-5 text-lg">
        {{ poem.poem }}
      </p>

      <LazyAppPoemSignature :poem="poem" />
      <LazyAppPoemColors :poem="poem" />
    </div>

    <LazyAppPoemShare :poem="poem" />
  </div>
</template>

<script lang="ts" setup>
import type { GeneratedPoem } from "@/server/api/poems/generate.post";

defineProps<{ poem: GeneratedPoem }>();
</script>
