const isProd = process.env.NODE_ENV === "production";

const googleAnalyticsHtml = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-K40DJ3THNZ');
`;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "poesía.pics - Una foto, un poema",

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

      script: isProd
        ? [
            {
              tagPosition: "bodyClose",
              async: true,
              src: "https://www.googletagmanager.com/gtag/js?id=G-K40DJ3THNZ",
            },
            {
              tagPosition: "bodyClose",
              innerHTML: googleAnalyticsHtml,
            },
          ]
        : [],
    },
  },

  modules: [
    "@nuxtjs/device",
    "@kevinmarrec/nuxt-pwa",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
  ],

  runtimeConfig: {
    public: {
      apiBase: "/",
    },
  },

  // @ts-ignore
  pwa: {
    manifest: {
      name: "poesía.pics",
      short_name: "poesía.pics",
      description:
        "Convierte tus fotografías en poemas usando Google Cloud Vision + GPT-3",
      theme_color: "#dd2d44",
      lang: "es",
    },
  },
});
