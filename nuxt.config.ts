// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "es",
        "data-theme": "pastel",
      },

      bodyAttrs: {
        class: "bg-base-200",
      },
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  runtimeConfig: {
    public: {
      apiBase: "/",
    },
  },
});
