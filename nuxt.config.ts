const isProd = process.env.NODE_ENV === "production";

const googleAnalyticsHtml = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-K40DJ3THNZ');
`;

const SCRIPTS: any[] = [
  {
    "data-name": "BMC-Widget",
    "data-cfasync": "false",
    "data-id": "wilsontovar",
    "data-description": "Support me on Buy me a coffee!",
    "data-message":
      "¡Gracias por visitar! Con tu aporte podemos seguir llenando este mundo de poemas",
    "data-color": "#FF5F5F",
    "data-position": "Right",
    "data-x_margin": "18",
    "data-y_margin": "18",
    src: "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js",
    tagPosition: "bodyClose",
  },
  {
    async: true,
    src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7162418263936911",
    crossorigin: "anonymous",
    tagPosition: "bodyClose",
  },
];

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
  ],

  runtimeConfig: {
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
});
