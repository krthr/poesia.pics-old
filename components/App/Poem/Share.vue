<template>
  <div class="mt-8 text-center w-full flex flex-col justify-between">
    <div class="mb-6">
      <h2 class="text-xl">
        Comparte tu poema usando el hashtag
        <span class="font-bold">#PoesiaPics</span>
      </h2>
    </div>

    <div class="flex flex-wrap items-center justify-between px-3">
      <button
        :class="{
          'btn btn-ghost btn-outline gap-2': true,
          loading: appStore.saving,
        }"
        :disabled="appStore.saving"
        @click="appStore.storePoem()"
      >
        <SvgIcon :path="mdiShare" type="mdi" class="w-5 h-5" />
        <span>Publicar</span>
      </button>

      <button
        :class="{
          'btn btn-ghost btn-outline gap-2': true,
          loading: downloading,
        }"
        :disabled="downloading"
        @click="downloadImage()"
      >
        <SvgIcon :path="mdiDownload" type="mdi" class="w-5 h-5" />
        <span>Descargar Imagen</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiDownload, mdiShare } from "@mdi/js";

import { logEvent } from "@/utils/gtag";
import LogRocket from "logrocket";
import { useAppStore } from "~~/stores/appStore";

const appStore = useAppStore();
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
