<template>
  <div class="w-full min-h-screen py-10 px-2">
    <div class="hero">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">FotoPoema</h1>
          <p class="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button
            :class="{
              'btn btn-primary': true,
              loading: loading,
            }"
            :disabled="loading"
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
            @change="onFileInput()"
          />
        </div>
      </div>
    </div>

    <div
      v-if="result.poem"
      class="flex flex-col justify-center items-center max-w-md mx-auto"
    >
      <div class="divider"></div>

      <div class="w-full">
        <img
          class="w-full rounded-md aspect-square object-cover"
          :alt="result.poem"
          :src="result.preview"
        />

        <p v-if="result.labels?.length" class="text-sm mt-3 mb-5">
          {{ result.labels.join(", ") }}
        </p>

        <p class="whitespace-pre-wrap">{{ result.poem }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Result {
  poem: string;
  preview: string;
  labels: string[];
}

const config = useRuntimeConfig();
const loading = ref(false);

const result = reactive<Result>({ poem: "", preview: "", labels: [] });
const fileInput = ref<HTMLInputElement>();

console.log(config.public.apiBase);

function selectFile() {
  result.labels = [];
  result.poem = "";
  result.preview = "";

  fileInput.value?.click();
}

async function onFileInput() {
  if (!fileInput.value?.files?.length) {
    return;
  }

  loading.value = true;

  const file = fileInput.value.files[0];
  try {
    const form = new FormData();
    form.append("image", file);

    const response = await fetch(config.public.apiBase + "/poems", {
      method: "post",
      body: form,
    });

    const json = await response.json();
    console.log(json);

    result.poem = json.poem;
    result.labels = json.labels;
    result.preview = URL.createObjectURL(file);
  } catch (error) {
    console.error(error);
  }

  loading.value = false;
}
</script>
