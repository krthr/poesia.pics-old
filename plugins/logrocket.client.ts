import LogRocket from "logrocket";

export default defineNuxtPlugin(() => {
  if (process.env.NODE_ENV === "production") {
    LogRocket.init("poesiapics/poesiapics");
  }
});
