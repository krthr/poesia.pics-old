import { defineStore } from "pinia";
import { logEvent } from "@/utils/gtag";
import { AnnotateImage, GeneratePoem } from "@/composables/useApi";
import LogRocket from "logrocket";

interface Result extends GeneratePoem, AnnotateImage {
  preview: string;
}

export const useAppStore = defineStore("app", () => {
  const api = useApi();
  const route = useRoute();

  const loading = ref(false);
  const result = ref<Result | undefined>(undefined);

  async function generatePoem(file: File) {
    loading.value = true;
    result.value = undefined;

    try {
      const mode =
        typeof route.query.mode === "string" ? route.query.mode : undefined;

      const annotations = await api.annotateImage(file);
      const poem = await api.generatePoem(annotations.keywords, mode);

      result.value = {
        author: poem.author,
        colors: annotations.colors,
        generatedAt: poem.generatedAt,
        keywords: annotations.keywords,
        poem: poem.poem,
        preview: URL.createObjectURL(file),
      };

      logEvent("generate_poem", { keywords: annotations.keywords });
      LogRocket.track("generate_poem", { keywords: annotations.keywords });
    } catch (error: any) {
      alert(error.message);
    }

    loading.value = false;
  }

  return { loading, result, generatePoem };
});
