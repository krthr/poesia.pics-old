<template>
  <div class="flex rounded-lg w-full mt-4">
    <div
      v-for="(color, index) in appStore.result!.colors"
      :key="index"
      :style="{
        width: color.fraction,
        background: color.color,
      }"
      class="py-2"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/appStore";

const appStore = useAppStore();
</script>
