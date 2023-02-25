<template>
  <p class="text-sm font-serif inline-flex items-center italic">
    <Icon class="w-5 h-5" icon="ph:heart" />
    <span class="ml-2">https://poesia.pics</span>
    <span class="mx-2 font-bold text-lg"> ⋅ </span>
    <span>
      {{ poem.generatedAtLabel }}
    </span>
  </p>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import type { GeneratedPoem } from "@/server/api/poems/generate.post";

defineProps<{ poem: GeneratedPoem }>();
</script>
