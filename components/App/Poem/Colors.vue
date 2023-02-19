<template>
  <div class="flex rounded-lg w-full mt-4">
    <div
      v-for="({ color, pixelFraction }, index) in poem.colors"
      :key="index"
      :style="{
        width: (pixelFraction || 0) * 100 + '%',
        background: `rgb(${color?.red},${color?.green},${color?.blue})`,
      }"
      class="py-2"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import type { GeneratedPoem } from "@/server/api/poems/generate.post";

defineProps<{ poem: GeneratedPoem }>();
</script>
