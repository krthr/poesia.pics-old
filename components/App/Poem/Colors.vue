<template>
  <div
    v-if="parsedColors && parsedColors.length"
    class="flex rounded-lg w-full mt-4"
  >
    <div
      v-for="(color, index) in parsedColors"
      :key="index"
      :style="{
        width: color.fraction * 100 + '%',
        background: color.color,
      }"
      class="py-2"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/appStore";

const appStore = useAppStore();

const parsedColors = computed(() => {
  const colors = appStore.result.metadata?.colors;
  if (!colors?.length) {
    return [];
  }

  const total = colors.reduce((total, c) => total + c.pixelFraction, 0);

  return colors.map((color) => {
    const { red, green, blue } = color.color;
    return {
      fraction: color.pixelFraction / total,
      color: `rgb(${red}, ${green}, ${blue})`,
    };
  });
});
</script>
