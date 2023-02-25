<template>
  <div class="flex hero pt-5 md:pt-10 flex-1 justify-center">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">
          <span class="font-serif inline-flex">
            {{ $t("poes") }}
            <span class="italic">{{ $t("i") }}</span>
            {{ $t("a") }}.
          </span>
          <span class="font-light text-lg">{{ $t("pics") }}</span>
        </h1>
        <p class="py-6">
          {{ $t("convert_pictures") }}
          <span
            class="tooltip tooltip-top tooltip-accent"
            :data-tip="$t('do_not_store')"
          >
            <span class="underline decoration-dotted">
              {{ $t("respect_your_privacy") }}
            </span>
          </span>
          {{ $t("exclamation") }}
        </p>

        <div class="w-full">
          <p class="pt-6">{{ $t("select_mood") }}</p>

          <div class="space-x-1 space-y-1">
            <button
              v-for="{ color, icon, key } in MOODS"
              :key="key"
              :class="{
                'btn btn-sm btn-outline gap-2': true,
                [`text-${color} border-${color} hover:bg-${color} hover:border-${color}`]: true,
                [`fond-bold text-white bg-${color}`]: selectedMood === key,
                [`border-${color} text-${color}`]: selectedMood !== key,
              }"
              @click="selectedMood = key"
            >
              <span>{{ $t(`moods.${key}`) }}</span>
              <span>
                <Icon
                  class="w-4 h-4"
                  :icon="icon + (selectedMood === key ? '-fill' : '-bold')"
                />
              </span>
            </button>
          </div>
        </div>

        <button
          :class="{
            'btn btn-lg btn-primary my-5 mt-10 gap-3': true,
            loading: appStore.loading,
          }"
          :disabled="appStore.loading"
          @click="selectFile()"
        >
          <span>{{ $t("upload_picture") }}</span>
          <Icon class="w-6 h-6" icon="ph:upload" />
        </button>

        <p class="my-3 text-xs italic max-w-sm mx-auto">
          {{ $t("better_results") }}
        </p>

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
import { Icon } from "@iconify/vue";

import { useAppStore } from "@/stores/appStore";
import { Mood, MOODS } from "@/constants/moods";

const { locale } = useI18n();
const appStore = useAppStore();

const selectedMood = ref<Mood>("default");

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
    await appStore.generatePoem(
      target.files[0],
      locale.value,
      selectedMood.value
    );
  }

  return false;
}
</script>
