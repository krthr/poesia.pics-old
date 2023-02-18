const isProd = process.env.NODE_ENV === "production";
const es = require('./lang/es');
const en = require('./lang/en');

const googleAnalyticsHtml = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-K40DJ3THNZ');
`;

const SCRIPTS: any[] = [];

if (isProd) {
  SCRIPTS.push(
    {
      tagPosition: "bodyClose",
      async: true,
      src: "https://www.googletagmanager.com/gtag/js?id=G-K40DJ3THNZ",
    },
    {
      tagPosition: "bodyClose",
      innerHTML: googleAnalyticsHtml,
    }
  );
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "poesía.pics - Una foto, un poema",

      htmlAttrs: {
        lang: "es",
        "data-theme": "pastel",
      },

      bodyAttrs: {
        class: "bg-base-200",
      },

      script: [...SCRIPTS],
    },
  },

  modules: [
    "@nuxtjs/device",
    "@kevinmarrec/nuxt-pwa",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    '@nuxtjs/i18n',
  ],

  i18n: {
    locales: ['en', 'es'], // used in URL path prefix
    defaultLocale: 'es', 
    vueI18n: {
      legacy: false,
      locale: 'es',
      messages: {
        en: en,
        es: es
      }
    }
  },

  runtimeConfig: {
    openaiApiKey: "",
    openaiModel: "text-curie-001",

    googleApplicationCredentialsJson: "",

    public: {
      apiBase: "/",
    },
  },

  pwa: {
    manifest: {
      name: "poesía.pics",
      short_name: "poesía.pics",
      description:
        "Convierte tus fotografías en poemas usando Google Cloud Vision + GPT-3",
      theme_color: "#dd2d44",
      lang: "es",
    },

    meta: {
      author: false,
      name: undefined,
      ogTitle: false,
      ogDescription: false,
      ogImage: false,
      ogType: false,
      ogSiteName: false,
      twitterCard: false,
    },
  },

  typescript: {
    strict: true,
  },
});
