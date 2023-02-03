<template>
  <div class="flex hero pt-5 md:pt-10 flex-1 justify-center">
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
          id="file"
          type="file"
          accept="image/jpg,image/png,image/webp,image/jpeg"
          hidden
          @click="onInputClick"
          @change="onFileChanged($event)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/appStore";

const appStore = useAppStore();

function selectFile() {
  const input = document.querySelector<HTMLInputElement>("#file")!;
  input.click();
}

function onInputClick(event: any) {
  event.target.value = null;
}

async function onFileChanged($event: Event) {
  const target = $event.target as HTMLInputElement;

  if (target && target.files) {
    await appStore.generatePoem(target.files[0]);
  }

  return false;
}
</script>
