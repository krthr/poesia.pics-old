<template>
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
      <span>Descargar o compartir poema</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { useAppStore } from "@/stores/appStore";
import { mdiDownload } from "@mdi/js";
import { logEvent } from "@/utils/gtag";

const appStore = useAppStore();
const downloading = ref(false);

async function downloadImage() {
  downloading.value = true;

  try {
    const { generateAndDownloadImage } = await import("@/utils/image");
    const element = document.querySelector("#poem")! as HTMLElement;
    await generateAndDownloadImage(element, appStore.result.poem);

    logEvent("share");
  } catch (error) {
    console.error(error);
  }

  downloading.value = false;
}
</script>
