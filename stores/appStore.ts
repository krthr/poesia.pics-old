import type { InternalApi } from "nitropack";
import LogRocket from "logrocket";
import { defineStore } from "pinia";
import { logEvent } from "@/utils/gtag";

export const useAppStore = defineStore("app", () => {
  const route = useRoute();

  const loading = ref(false);
  const saving = ref(false);
  const result = ref<InternalApi["/api/poems/generate"]["post"]>();

  async function generatePoem(file: File, locale: String) {
    loading.value = true;
    result.value = undefined;

    try {
      const mode = route.query.mode;

      const image = await toDataURL(file);
      const poem = await $fetch("/api/poems/generate", {
        method: "post",
        query: { mode, locale },
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

  async function storePoem() {
    if (!result.value) {
      return;
    }

    saving.value = true;

    try {
      const poem = await $fetch("/api/poems", {
        method: "post",
        body: { ...result.value },
      });

      console.log(poem);
    } catch (error: any) {
      alert(error.statusMessage);
    }

    saving.value = false;
  }

  return { loading, result, saving, generatePoem, storePoem };
});
