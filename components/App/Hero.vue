<template>
  <div class="hero pt-10 min-h-full flex-1">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">FotoPoema</h1>
        <p class="py-6">
          Convierte tus fotografías en poemas usando Google Cloud Vision +
          GPT-3. ¡Es gratis y
          <span
            class="tooltip tooltip-top tooltip-accent"
            data-tip="No almacenamos tus fotografías ;)"
          >
            <span class="underline decoration-dotted">
              respetamos tu privacidad
            </span>
          </span>
          !
        </p>
        <button
          :class="{
            'btn btn-primary': true,
            loading: appStore.loading,
          }"
          :disabled="appStore.loading"
          @click="selectFile()"
        >
          Subir foto
        </button>

        <input
          type="file"
          accept="image/jpg,image/png,image/webp,image/jpeg"
          hidden
          ref="fileInput"
          capture="environment"
          @change="onFileChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/appStore";

const appStore = useAppStore();
const fileInput = ref<HTMLInputElement>();

function selectFile() {
  fileInput.value!.click();
}

async function onFileChange() {
  if (!fileInput.value?.files?.length) {
    return;
  }

  await appStore.generatePoem(fileInput.value.files[0]);
}
</script>
