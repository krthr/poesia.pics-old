import LogRocket from "logrocket";
import { defineStore } from "pinia";

import type { Poem } from "~~/server/api/poems/generate.post";
import { logEvent } from "@/utils/gtag";

export const useAppStore = defineStore("app", () => {
  const route = useRoute();

  const loading = ref(false);
  const result = ref<Poem>();

  async function generatePoem(file: File) {
    loading.value = true;
    result.value = undefined;

    try {
      const mode = route.query.mode;

      const image = await toDataURL(file);
      const poem = await $fetch("/api/poems/generate", {
        method: "post",
        query: { mode },
        body: { image },
      });

      result.value = poem;

      logEvent("generate_poem", { keywords: poem.keywords });
      LogRocket.track("generate_poem", { keywords: poem.keywords });
    } catch (error: any) {
      alert(error.statusMessage);
    }

    loading.value = false;
  }

  return { loading, result, generatePoem };
});
