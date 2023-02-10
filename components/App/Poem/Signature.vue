<template>
  <p class="text-sm font-serif inline-flex items-center italic">
    <SvgIcon :path="mdiRobotLoveOutline" type="mdi" class="w-4 h-4" />
    <span class="ml-2">poesía.pics</span>
    <span class="mx-2 font-bold text-lg"> ⋅ </span>
    <span>
      {{ appStore.result!.generatedAtLabel }}
    </span>
  </p>
</template>

<script lang="ts" setup>
// @ts-ignore
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiRobotLoveOutline } from "@mdi/js";
import { useAppStore } from "@/stores/appStore";

const appStore = useAppStore();
</script>
