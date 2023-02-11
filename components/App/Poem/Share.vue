<template>
  <div class="mt-8 text-center w-full flex flex-col justify-between">
    <div class="mb-6">
      <h2 class="text-xl">
        Comparte tu poema usando el hashtag
        <span class="font-bold">#PoesiaPics</span>
      </h2>
    </div>

    <div>
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
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiDownload } from "@mdi/js";

import { logEvent } from "@/utils/gtag";
import LogRocket from "logrocket";

const downloading = ref(false);

async function downloadImage() {
  downloading.value = true;

  try {
    const { generateAndDownloadImage } = await import("@/utils/image");
    const element = document.querySelector("#poem")! as HTMLElement;
    await generateAndDownloadImage(element);

    logEvent("share");
    LogRocket.track("share");
  } catch (error: any) {
    LogRocket.captureException(error);
  }

  downloading.value = false;
}
</script>
