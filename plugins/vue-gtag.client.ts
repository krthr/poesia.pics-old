import VueGtag, { trackRouter } from "vue-gtag-next";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: "G-K40DJ3THNZ",
    },
  });

  trackRouter(useRouter());
});
