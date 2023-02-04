import { defineStore } from "pinia";

interface Result {
  poem: string;
  metadata: {
    keywords: string[];
  };
  author: string;
  preview: string;
}

const Modes: Record<string, "erotic" | "romantic"> = {
  erotic: "erotic",
  romantic: "romantic",
};

const defaultResultState: Result = {
  poem: "",
  preview: "",
  metadata: {
    keywords: [],
  },
  author: "",
};

export const useAppStore = defineStore("app", () => {
  const config = useRuntimeConfig();
  const route = useRoute();

  const loading = ref(false);
  const result = reactive<Result>({ ...defaultResultState });

  async function generatePoem(file: File) {
    loading.value = true;

    Object.assign(result, { ...defaultResultState });

    const form = new FormData();
    form.append("image", file);

    let json;

    try {
      const _mode = route.query.mode;
      const url = new URL(config.public.apiBase + "/poems");

      if (typeof _mode === "string") {
        const mode = Modes[_mode];
        url.searchParams.append("mode", mode);
      }

      const response = await fetch(url.toString(), {
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

      Object.assign(result, {
        poem: json.poem,
        metadata: {
          keywords: json.metadata.keywords,
        },
        author: json.author,
        preview: URL.createObjectURL(file),
      });
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
