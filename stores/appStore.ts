import { defineStore } from "pinia";

interface Result {
  poem: string;
  preview: string;
  labels: string[];
}

export const useAppStore = defineStore("app", () => {
  const config = useRuntimeConfig();
  const loading = ref(false);
  const result = reactive<Result>({ poem: "", preview: "", labels: [] });

  async function generatePoem(file: File) {
    loading.value = true;

    result.labels = [];
    result.poem = "";
    result.preview = "";

    const form = new FormData();
    form.append("image", file);

    let json;

    try {
      const response = await fetch(config.public.apiBase + "/poems", {
        method: "post",
        body: form,
      });

      json = await response.json();

      if (!response.ok) {
        if (json.errors?.at(0)?.message) {
          throw new Error(json.errors.at(0).message);
        } else {
          throw new Error(
            "Un error inesperado ha ocurrido. Inténtalo más tarde."
          );
        }
      }

      const { poem, labels } = json;
      result.poem = poem;
      result.labels = labels;
      result.preview = URL.createObjectURL(file);
    } catch (error: any) {
      console.error({ error });

      if (error instanceof SyntaxError) {
        alert("Un error inesperado ha ocurrido. Inténtalo más tarde.");
      } else {
        alert(error.message);
      }
    }

    loading.value = false;
  }

  return { loading, result, generatePoem };
});
