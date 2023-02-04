<template>
  <div class="divider"></div>

  <div
    class="flex flex-col justify-center items-center max-w-md mx-auto pb-10 pt-4 md:px-1"
  >
    <div id="poem" class="w-full p-3">
      <img
        class="w-full rounded-md aspect-square object-cover"
        :alt="appStore.result.poem"
        :src="appStore.result.preview"
      />

      <p
        v-if="appStore.result.metadata.keywords.length"
        class="text-sm mt-3 font-serif font-light"
      >
        {{ appStore.result.metadata.keywords.join(", ") }}
      </p>

      <p class="whitespace-pre-wrap font-serif my-5 text-lg">
        {{ appStore.result.poem }}
      </p>

      <p class="text-sm font-serif inline-flex items-center">
        <SvgIcon :path="mdiRobotLoveOutline" type="mdi" class="w-4 h-4" />
        <span class="ml-2">poesía.pics</span>
        <span v-if="appStore.result.generatedAt" class="mx-2 font-bold text-lg">⋅</span>
        <span v-if="appStore.result.generatedAt">
          {{ appStore.result.generatedAt }}
        </span>
      </p>
    </div>

    <div class="mt-10 text-center w-full">
      <button
        :class="{
          'btn btn-sm btn-ghost btn-outline gap-2': true,
          loading: downloading,
        }"
        :disabled="downloading"
        @click="downloadImage()"
      >
        <SvgIcon :path="mdiDownload" type="mdi" class="w-4 h-4" />
        <span>Descargar imagen</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiDownload, mdiRobotLoveOutline } from "@mdi/js";
import { useAppStore } from "@/stores/appStore";

const appStore = useAppStore();
const downloading = ref(false);

async function downloadImage() {
  downloading.value = true;

  try {
    const { generateAndDownloadImage } = await import("@/utils/image");
    const element = document.querySelector("#poem")! as HTMLElement;
    await generateAndDownloadImage(element, appStore.result.poem);
  } catch (error) {
    console.error(error);
  }

  downloading.value = false;
}
</script>
