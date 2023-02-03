// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "FotoPoema - Una foto, un poema",

      meta: [
        {
          name: "description",
          content:
            "Convierte tus fotografías en poemas usando Google Cloud Vision + GPT-3",
        },
      ],

      htmlAttrs: {
        lang: "es",
        "data-theme": "pastel",
      },

      bodyAttrs: {
        class: "bg-base-200",
      },

      script: [
        {
          async: true,
          src: "https://www.googletagmanager.com/gtag/js?id=G-K40DJ3THNZ",
        },
        {
          innerHTML: `
          window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-K40DJ3THNZ');
          `,
        },
      ],
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  runtimeConfig: {
    public: {
      apiBase: "/",
    },
  },
});
