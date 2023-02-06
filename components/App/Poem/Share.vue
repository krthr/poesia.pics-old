<template>
  <div class="mt-10 text-center w-full flex justify-between">
    <button
      :class="{
        'btn btn-ghost btn-outline gap-2': true,
        loading: downloading,
      }"
      :disabled="downloading"
      @click="downloadImage()"
    >
      <SvgIcon :path="mdiDownload" type="mdi" class="w-5 h-5" />
      <span>Descargar poema</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiDownload } from "@mdi/js";

import { useAppStore } from "@/stores/appStore";
import { logEvent } from "@/utils/gtag";
import LogRocket from "logrocket";

const appStore = useAppStore();
const downloading = ref(false);

async function downloadImage() {
  downloading.value = true;

  try {
    const { generateAndDownloadImage } = await import("@/utils/image");
    const element = document.querySelector("#poem")! as HTMLElement;
    await generateAndDownloadImage(element, appStore.result!.poem);

    logEvent("share");
    LogRocket.track("share");
  } catch (error: any) {
    LogRocket.captureException(error);
  }

  downloading.value = false;
}
</script>
